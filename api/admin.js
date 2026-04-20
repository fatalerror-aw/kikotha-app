// api/admin.js
import { createClient } from '@supabase/supabase-js';
import { createHmac, timingSafeEqual, randomBytes } from 'crypto';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const BRUTE_WINDOW_MS  = 15 * 60 * 1000;
const MAX_FAILED       = 5;
const SESSION_TTL_MS   = 4 * 60 * 60 * 1000;

// ── TOTP (RFC 6238) — zero dependencies ──────────────────────────────────────
function base32Decode(str) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  const s = str.replace(/=+$/, '').toUpperCase();
  let bits = 0, value = 0;
  const out = [];
  for (const ch of s) {
    const idx = alphabet.indexOf(ch);
    if (idx < 0) continue;
    value = (value << 5) | idx;
    bits += 5;
    if (bits >= 8) { out.push((value >>> (bits - 8)) & 0xff); bits -= 8; }
  }
  return Buffer.from(out);
}

function hotp(secretBuf, counter) {
  const msg = Buffer.alloc(8);
  // Write 64-bit big-endian counter
  const hi = Math.floor(counter / 0x100000000);
  const lo = counter >>> 0;
  msg.writeUInt32BE(hi, 0);
  msg.writeUInt32BE(lo, 4);
  const hmac = createHmac('sha1', secretBuf).update(msg).digest();
  const offset = hmac[19] & 0xf;
  const code = ((hmac[offset] & 0x7f) << 24)
    | (hmac[offset + 1] << 16)
    | (hmac[offset + 2] << 8)
    | hmac[offset + 3];
  return String(code % 1_000_000).padStart(6, '0');
}

function verifyTotp(token, secret, window = 1) {
  const secretBuf = base32Decode(secret);
  const counter   = Math.floor(Date.now() / 1000 / 30);
  for (let i = -window; i <= window; i++) {
    if (hotp(secretBuf, counter + i) === token) return true;
  }
  return false;
}

// ── HMAC session token ────────────────────────────────────────────────────────
function signAdminToken(userId) {
  const payload = `${userId}:${Date.now()}`;
  const sig = createHmac('sha256', process.env.ADMIN_SECRET).update(payload).digest('hex');
  return Buffer.from(`${payload}:${sig}`).toString('base64');
}

function verifyAdminToken(token) {
  try {
    const decoded = Buffer.from(token, 'base64').toString();
    const lastColon = decoded.lastIndexOf(':');
    const payload   = decoded.slice(0, lastColon);
    const sig        = decoded.slice(lastColon + 1);
    const colonIdx   = payload.indexOf(':');
    const userId     = payload.slice(0, colonIdx);
    const timestamp  = parseInt(payload.slice(colonIdx + 1), 10);
    const expected   = createHmac('sha256', process.env.ADMIN_SECRET).update(payload).digest('hex');
    const sBuf = Buffer.from(sig);
    const eBuf = Buffer.from(expected);
    if (sBuf.length !== eBuf.length || !timingSafeEqual(sBuf, eBuf)) return null;
    if (Date.now() - timestamp > SESSION_TTL_MS) return null;
    return userId;
  } catch { return null; }
}

// ── Brute-force helpers ───────────────────────────────────────────────────────
async function isBruteForced(ip) {
  const since = new Date(Date.now() - BRUTE_WINDOW_MS).toISOString();
  const { count } = await supabase.from('admin_login_attempts')
    .select('*', { count: 'exact', head: true })
    .eq('ip', ip).eq('success', false).gte('attempted_at', since);
  return (count ?? 0) >= MAX_FAILED;
}

function recordAttempt(ip, success) {
  supabase.from('admin_login_attempts').insert({ ip, success })
    .then(() => supabase.from('admin_login_attempts')
      .delete().lt('attempted_at', new Date(Date.now() - 86400000).toISOString()));
}

// ── Verify Supabase JWT + is_admin ────────────────────────────────────────────
async function verifyAdminUser(authHeader) {
  if (!authHeader?.startsWith('Bearer ')) return null;
  const { data: { user }, error } = await supabase.auth.getUser(authHeader.slice(7));
  if (error || !user) return null;
  const { data: profile } = await supabase.from('profiles')
    .select('is_admin').eq('id', user.id).single();
  if (!profile?.is_admin) return null;
  return user;
}

// ── Handler ───────────────────────────────────────────────────────────────────
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', process.env.VITE_APP_URL || 'https://kikotha.com');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Admin-Secret, X-Admin-Token');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const ip = (req.headers['x-forwarded-for']?.split(',')[0] ?? '').trim()
    || req.socket?.remoteAddress || 'unknown';
  const { action, payload } = req.body ?? {};

  // ── LOGIN ─────────────────────────────────────────────────────────────────
  if (action === 'login') {
    if (await isBruteForced(ip))
      return res.status(429).json({ error: 'Too many attempts. Try again in 15 minutes.' });

    const loginKey = req.headers['x-admin-secret'];
    if (!loginKey || loginKey !== process.env.ADMIN_LOGIN_KEY) {
      recordAttempt(ip, false);
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const adminUser = await verifyAdminUser(req.headers['authorization']);
    if (!adminUser) { recordAttempt(ip, false); return res.status(403).json({ error: 'Not an admin account' }); }

    const { totpCode } = payload ?? {};
    if (!totpCode || !/^\d{6}$/.test(totpCode)) {
      recordAttempt(ip, false);
      return res.status(401).json({ error: 'Valid 6-digit TOTP code required' });
    }

    if (!process.env.ADMIN_TOTP_SECRET)
      return res.status(503).json({ error: 'TOTP not configured — run setup first' });

    if (!verifyTotp(totpCode, process.env.ADMIN_TOTP_SECRET)) {
      recordAttempt(ip, false);
      return res.status(401).json({ error: 'Invalid TOTP code' });
    }

    recordAttempt(ip, true);
    return res.status(200).json({ adminToken: signAdminToken(adminUser.id) });
  }

  // ── ALL OTHER ACTIONS — re-verify token + session on every call ───────────
  const rawToken = req.headers['x-admin-token'];
  if (!rawToken) return res.status(401).json({ error: 'No admin token' });
  const tokenUserId = verifyAdminToken(rawToken);
  if (!tokenUserId) return res.status(401).json({ error: 'Invalid or expired admin token' });

  const adminUser = await verifyAdminUser(req.headers['authorization']);
  if (!adminUser) return res.status(403).json({ error: 'Not an admin account' });
  if (adminUser.id !== tokenUserId) return res.status(403).json({ error: 'Token/session mismatch' });

  // ── STATS ──────────────────────────────────────────────────────────────────
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
      users: users.count, posts: posts.count, comments: comments.count,
      flaggedPosts: flaggedPosts.count, flaggedComments: flaggedComments.count,
      banned: banned.count,
    });
  }

  // ── MOD QUEUE ─────────────────────────────────────────────────────────────
  if (action === 'getFlagged') {
    const [{ data: flaggedPosts }, { data: flaggedComments }] = await Promise.all([
      supabase.from('posts').select('id, title, body, kotha_id, created_at, profiles(username)')
        .eq('flagged', true).order('created_at', { ascending: false }).limit(50),
      supabase.from('comments').select('id, body, post_id, created_at, profiles(username)')
        .eq('flagged', true).order('created_at', { ascending: false }).limit(50),
    ]);
    return res.status(200).json({ flaggedPosts: flaggedPosts ?? [], flaggedComments: flaggedComments ?? [] });
  }

  // ── POSTS ──────────────────────────────────────────────────────────────────
  if (action === 'getPosts') {
    const { page = 0 } = payload ?? {};
    const { data: posts } = await supabase.from('posts')
      .select('id, title, kotha_id, created_at, flagged, profiles(username)')
      .order('created_at', { ascending: false }).range(page * 30, page * 30 + 29);
    return res.status(200).json({ posts: posts ?? [] });
  }

  if (action === 'deletePost') {
    await supabase.from('comments').delete().eq('post_id', payload?.postId);
    await supabase.from('posts').delete().eq('id', payload?.postId);
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

  // ── USERS ──────────────────────────────────────────────────────────────────
  if (action === 'getUsers') {
    const { page = 0, search = '' } = payload ?? {};
    let q = supabase.from('profiles')
      .select('id, username, display_name, karma, posts_count, created_at, banned_at, ban_reason, is_admin')
      .order('created_at', { ascending: false }).range(page * 30, page * 30 + 29);
    if (search) q = q.ilike('username', `%${search}%`);
    const { data: users } = await q;
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
    await supabase.from('profiles').update({ banned_at: null, ban_reason: null }).eq('id', payload?.userId);
    return res.status(200).json({ ok: true });
  }

  if (action === 'deleteUser') {
    const { userId } = payload ?? {};
    await supabase.from('memberships').delete().eq('user_id', userId);
    await supabase.from('comments').delete().eq('author_id', userId);
    await supabase.from('posts').delete().eq('user_id', userId);
    await supabase.from('profiles').delete().eq('id', userId);
    return res.status(200).json({ ok: true });
  }

  return res.status(400).json({ error: `Unknown action: ${action}` });
}
