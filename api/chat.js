import { createClient } from "@supabase/supabase-js";

const ANTHROPIC_KEY = process.env.ANTHROPIC_KEY;
const SUPABASE_URL  = process.env.VITE_SUPABASE_URL;
const SERVICE_KEY   = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Limits: [hourly, daily]
const LIMITS = {
  user: { hourly: 10, daily: 30 },
  ip:   { hourly: 5,  daily: 15 },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!ANTHROPIC_KEY) return res.status(500).json({ error: "ANTHROPIC_KEY is not set" });
  if (!SUPABASE_URL)  return res.status(500).json({ error: "VITE_SUPABASE_URL is not set" });
  if (!SERVICE_KEY)   return res.status(500).json({ error: "SUPABASE_SERVICE_ROLE_KEY is not set" });

  const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
    auth: { persistSession: false },
  });

  // ── Identify caller ───────────────────────────────────────────────────────
  let identifier;
  let identifierType;

  const authHeader = req.headers["authorization"];
  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.slice(7);
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (!error && user) {
      identifier     = user.id;
      identifierType = "user";
    }
  }

  if (!identifier) {
    const ip = req.headers["x-forwarded-for"]?.split(",")[0]?.trim()
      || req.headers["x-real-ip"]
      || "unknown";
    identifier     = ip;
    identifierType = "ip";
  }

  const limits = LIMITS[identifierType];
  const now    = new Date();
  const hourAgo = new Date(now - 60 * 60 * 1000).toISOString();
  const dayAgo  = new Date(now - 24 * 60 * 60 * 1000).toISOString();

  // ── Count recent requests ─────────────────────────────────────────────────
  const [{ count: hourCount }, { count: dayCount }] = await Promise.all([
    supabase
      .from("rate_limits")
      .select("*", { count: "exact", head: true })
      .eq("identifier", identifier)
      .gte("created_at", hourAgo),
    supabase
      .from("rate_limits")
      .select("*", { count: "exact", head: true })
      .eq("identifier", identifier)
      .gte("created_at", dayAgo),
  ]);

  if (hourCount >= limits.hourly) {
    // seconds until oldest hourly row falls out of window
    const { data: oldest } = await supabase
      .from("rate_limits")
      .select("created_at")
      .eq("identifier", identifier)
      .gte("created_at", hourAgo)
      .order("created_at", { ascending: true })
      .limit(1)
      .single();
    const retryAfter = oldest
      ? Math.ceil((new Date(oldest.created_at).getTime() + 3600000 - now) / 1000)
      : 3600;
    return res.status(429).json({ error: "Rate limit exceeded", limit: "hourly", retryAfter });
  }

  if (dayCount >= limits.daily) {
    const { data: oldest } = await supabase
      .from("rate_limits")
      .select("created_at")
      .eq("identifier", identifier)
      .gte("created_at", dayAgo)
      .order("created_at", { ascending: true })
      .limit(1)
      .single();
    const retryAfter = oldest
      ? Math.ceil((new Date(oldest.created_at).getTime() + 86400000 - now) / 1000)
      : 86400;
    return res.status(429).json({ error: "Rate limit exceeded", limit: "daily", retryAfter });
  }

  // ── Record this request + clean up old rows (fire-and-forget) ─────────────
  supabase.from("rate_limits").insert({ identifier, identifier_type: identifierType })
    .then(() =>
      supabase
        .from("rate_limits")
        .delete()
        .eq("identifier", identifier)
        .lt("created_at", new Date(now - 48 * 60 * 60 * 1000).toISOString())
    );

  // ── Anthropic call (unchanged) ────────────────────────────────────────────
  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (err) {
    return res.status(500).json({ error: "Failed to contact Anthropic API", detail: err.message });
  }
}
