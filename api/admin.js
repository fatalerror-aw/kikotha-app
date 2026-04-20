// api/admin.js
// All admin actions: login verification + data operations.
// Every request re-validates the HMAC admin session token + Supabase JWT + is_admin.
// The login action additionally checks the low-privilege ADMIN_LOGIN_KEY header.
import { createClient } from '@supabase/supabase-js';
import { authenticator } from 'otplib';
import { createHmac, timingSafeEqual } from 'crypto';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const BRUTE_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_FAILED_ATTEMPTS = 5;
const SESSION_TTL_MS = 4 * 60 * 60 * 1000; // 4 hours

// ── Brute force helpers ───────────────────────────────────────────────────────
async function isBruteForced(ip) {
  const windowStart = new Date(Date.now() - BRUTE_WINDOW_MS).toISOString();
  const { count } = await supabase
    .from('admin_login_attempts')
    .select('*', { count: 'exact', head: true })
    .eq('ip', ip)
    .eq('success', false)
    .gte('attempted_at', windowStart);
  return (count ?? 0) >= MAX_FAILED_ATTEMPTS;
}

async function recordAttempt(ip, success) {
  // Fire-and-forget; also prune rows older than 24h to keep table lean
  supabase.from('admin_login_attempts')
    .insert({ ip, success })
    .then(() =>
      supabase.from('admin_login_attempts')
        .delete()
        .lt('attempted_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
    );
}

// ── HMAC session token helpers ────────────────────────────────────────────────
function signAdminToken(userId) {
  const payload = `${userId}:${Date.now()}`;
  const sig = createHmac('sha256', process.env.ADMIN_SECRET)
    .update(payload)
    .digest('hex');
  return Buffer.from(`${payload}:${sig}`).toString('base64');
}

function verifyAdminToken(token) {
  try {
    const decoded = Buffer.from(token, 'base64').toString();
    const lastColon = decoded.lastIndexOf(':');
    const payload = decoded.slice(0, lastColon);
    const sig = decoded.slice(lastColon + 1);
    const colonIdx = payload.indexOf(':');
    const userId = payload.slice(0, colonIdx);
    const timestamp = parseInt(payload.slice(colonIdx + 1), 10);

    const expectedSig = createHmac('sha256', process.env.ADMIN_SECRET)
      .update(payload)
      .digest('hex');

    // Constant-time comparison to prevent timing attacks
    const sigBuf = Buffer.from(sig);
    const expBuf = Buffer.from(expectedSig);
    if (sigBuf.length !== expBuf.length || !timingSafeEqual(sigBuf, expBuf)) {
      return null;
    }
    if (Date.now() - timestamp > SESSION_TTL_MS) return null;
    return userId;
  } catch {
    return null;
  }
}

// ── Verify Supabase JWT + is_admin ────────────────────────────────────────────
async function verifyAdminUser(authHeader) {
  if (!authHeader?.startsWith('Bearer ')) return null;
  const token = authHeader.slice(7);
  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error || !user) return null;
  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin, banned_at')
    .eq('id', user.id)
    .single();
  if (!profile?.is_admin) return null;
  return user;
}

// ── Main handler ──────────────────────────────────────────────────────────────
export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', process.env.VITE_APP_URL || 'https://kikotha.com');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Admin-Secret, X-Admin-Token');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const ip = (req.headers['x-forwarded-for']?.split(',')[0] ?? '').trim()
    || req.socket?.remoteAddress
    || 'unknown';

  const { action, payload } = req.body ?? {};

  // ── LOGIN ─────────────────────────────────────────────────────────────────
  // Gates: brute-force check → ADMIN_LOGIN_KEY header → Supabase JWT + is_admin → TOTP
  if (action === 'login') {
    // Gate 4: brute force
    if (await isBruteForced(ip)) {
      return res.status(429).json({ error: 'Too many attempts. Try again in 15 minutes.' });
    }

    // Gate 2: low-privilege login key (VITE_ADMIN_LOGIN_KEY on client)
    const loginKey = req.headers['x-admin-secret'];
    if (!loginKey || loginKey !== process.env.ADMIN_LOGIN_KEY) {
      await recordAttempt(ip, false);
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Gate 3: Supabase JWT + is_admin
    const adminUser = await verifyAdminUser(req.headers['authorization']);
    if (!adminUser) {
      await recordAttempt(ip, false);
      return res.status(403).json({ error: 'Not an admin account' });
    }

    // Gate 1: TOTP
    const { totpCode } = payload ?? {};
    if (!totpCode || !/^\d{6}$/.test(totpCode)) {
      await recordAttempt(ip, false);
      return res.status(401).json({ error: 'Valid 6-digit TOTP code required' });
    }

    if (!process.env.ADMIN_TOTP_SECRET) {
      return res.status(503).json({ error: 'TOTP not configured — run setup first' });
    }

    authenticator.options = { window: 1 }; // ±30s clock drift tolerance
    const valid = authenticator.verify({
      token: totpCode,
      secret: process.env.ADMIN_TOTP_SECRET,
    });

    if (!valid) {
      await recordAttempt(ip, false);
      return res.status(401).json({ error: 'Invalid TOTP code' });
    }

    await recordAttempt(ip, true);
    return res.status(200).json({ adminToken: signAdminToken(adminUser.id) });
  }

  // ── ALL OTHER ACTIONS ─────────────────────────────────────────────────────
  // Gates: HMAC admin token → Supabase JWT + is_admin (re-verified on every call)

  // Gate 1: validate HMAC session token
  const rawToken = req.headers['x-admin-token'];
  if (!rawToken) return res.status(401).json({ error: 'No admin token' });
  const tokenUserId = verifyAdminToken(rawToken);
  if (!tokenUserId) return res.status(401).json({ error: 'Invalid or expired admin token' });

  // Gate 3: re-verify Supabase JWT + is_admin on every call
  const adminUser = await verifyAdminUser(req.headers['authorization']);
  if (!adminUser) return res.status(403).json({ error: 'Not an admin account' });
  if (adminUser.id !== tokenUserId) return res.status(403).json({ error: 'Token/session mismatch' });

  // ── STATS ─────────────────────────────────────────────────────────────────
  if (action === 'getStats') {
    const [users, posts, comments, flaggedPosts, flaggedComments, banned] = await Promise.all([
      supabase.from('profiles').select('*', { count: 'exact', head: true }),
      supabase.from('posts').select('*', { count: 'exact', head: true }),
      supabase.from('comments').select('*', { count: 'exact', head: true }),
      supabase.from('posts').select('*', { count: 'exact', head: true }).eq('flagged', true),
      supabase.from('comments').select('*', { count: 'exact', head: true }).eq('flagged', true),
      supabase.from('profiles').select('*', { count: 'exact', head: true }).not('banned_at', 'is', null),
    ]);
    return res.status(200).json({
      users: users.count,
      posts: posts.count,
      comments: comments.count,
      flaggedPosts: flaggedPosts.count,
      flaggedComments: flaggedComments.count,
      banned: banned.count,
    });
  }

  // ── MOD QUEUE ─────────────────────────────────────────────────────────────
  if (action === 'getFlagged') {
    const [{ data: flaggedPosts }, { data: flaggedComments }] = await Promise.all([
      supabase.from('posts')
        .select('id, title, body, kotha_id, created_at, profiles(username)')
        .eq('flagged', true)
        .order('created_at', { ascending: false })
        .limit(50),
      supabase.from('comments')
        .select('id, body, post_id, created_at, profiles(username)')
        .eq('flagged', true)
        .order('created_at', { ascending: false })
        .limit(50),
    ]);
    return res.status(200).json({
      flaggedPosts: flaggedPosts ?? [],
      flaggedComments: flaggedComments ?? [],
    });
  }

  // ── POSTS ─────────────────────────────────────────────────────────────────
  if (action === 'getPosts') {
    const { page = 0 } = payload ?? {};
    const { data: posts } = await supabase.from('posts')
      .select('id, title, kotha_id, created_at, flagged, profiles(username)')
      .order('created_at', { ascending: false })
      .range(page * 30, page * 30 + 29);
    return res.status(200).json({ posts: posts ?? [] });
  }

  if (action === 'deletePost') {
    const { postId } = payload ?? {};
    await supabase.from('comments').delete().eq('post_id', postId);
    await supabase.from('posts').delete().eq('id', postId);
    return res.status(200).json({ ok: true });
  }

  if (action === 'dismissPostFlag') {
    await supabase.from('posts').update({ flagged: false }).eq('id', payload?.postId);
    return res.status(200).json({ ok: true });
  }

  // ── COMMENTS ──────────────────────────────────────────────────────────────
  if (action === 'deleteComment') {
    await supabase.from('comments').delete().eq('id', payload?.commentId);
    return res.status(200).json({ ok: true });
  }

  if (action === 'dismissCommentFlag') {
    await supabase.from('comments').update({ flagged: false }).eq('id', payload?.commentId);
    return res.status(200).json({ ok: true });
  }

  // ── USERS ─────────────────────────────────────────────────────────────────
  if (action === 'getUsers') {
    const { page = 0, search = '' } = payload ?? {};
    let query = supabase.from('profiles')
      .select('id, username, display_name, karma, posts_count, created_at, banned_at, ban_reason, is_admin')
      .order('created_at', { ascending: false })
      .range(page * 30, page * 30 + 29);
    if (search) query = query.ilike('username', `%${search}%`);
    const { data: users } = await query;
    return res.status(200).json({ users: users ?? [] });
  }

  if (action === 'banUser') {
    const { userId, reason } = payload ?? {};
    await supabase.from('profiles')
      .update({ banned_at: new Date().toISOString(), ban_reason: reason || 'Banned by admin' })
      .eq('id', userId);
    return res.status(200).json({ ok: true });
  }

  if (action === 'unbanUser') {
    await supabase.from('profiles')
      .update({ banned_at: null, ban_reason: null })
      .eq('id', payload?.userId);
    return res.status(200).json({ ok: true });
  }

  if (action === 'deleteUser') {
    const { userId } = payload ?? {};
    // Delete content first, then profile (auth.users row stays — service role
    // cannot delete auth users without a separate admin API call)
    await supabase.from('memberships').delete().eq('user_id', userId);
    await supabase.from('comments').delete().eq('author_id', userId);
    await supabase.from('posts').delete().eq('user_id', userId);
    await supabase.from('profiles').delete().eq('id', userId);
    return res.status(200).json({ ok: true });
  }

  return res.status(400).json({ error: `Unknown action: ${action}` });
}
