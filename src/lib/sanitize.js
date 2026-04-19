// ── sanitize.js ───────────────────────────────────────────────────────────────
// Layered input sanitization for Ki Kotha.
// React JSX already escapes text content — this is defense-in-depth for:
//   • Stored content (HTML strip, length enforcement)
//   • AI pipeline (prompt injection removal — stored text is NEVER modified)
//   • Future mod queue (profanity flagging — silent, users see original text)
//
// When markdown rendering is added later, replace stripHTML with a
// markdown → safe-HTML sanitizer (e.g. DOMPurify + marked) on the render path.

// ── Limits ────────────────────────────────────────────────────────────────────
export const LIMITS = {
  title:   200,
  body:    5000,
  comment: 2000,
};

// ── HTML stripping ─────────────────────────────────────────────────────────────
// Handles: tags, HTML entities, javascript:/data: URLs, unicode tricks.
// No DOMParser dependency — works in both browser and Node.
const HTML_ENTITIES = {
  "&amp;": "&", "&lt;": "<", "&gt;": ">",
  "&quot;": '"', "&#39;": "'", "&apos;": "'",
  "&nbsp;": " ",
};

function decodeEntities(str) {
  // Named entities
  let s = str.replace(/&[a-z]+;/gi, m => HTML_ENTITIES[m.toLowerCase()] ?? m);
  // Decimal &#NNN;
  s = s.replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
  // Hex &#xNN;
  s = s.replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCharCode(parseInt(h, 16)));
  return s;
}

export function stripHTML(str) {
  if (typeof str !== "string") return "";
  let s = str;
  // Decode entities first so encoded tags become visible
  s = decodeEntities(s);
  // Remove style and script blocks including their content
  s = s.replace(/<(script|style|iframe|object|embed|form)[^>]*>[\s\S]*?<\/\1>/gi, " ");
  // Strip all remaining tags
  s = s.replace(/<[^>]+>/g, " ");
  // Strip javascript:/data: URL schemes (e.g. leftover from attributes)
  s = s.replace(/\b(javascript|data|vbscript):/gi, "");
  // Collapse whitespace and trim
  s = s.replace(/\s+/g, " ").trim();
  return s;
}

// ── Profanity wordlist ─────────────────────────────────────────────────────────
// STARTER LIST — expand via admin panel. Context matters; these flag for review,
// never auto-block. Bangla words are transliterated (Roman script common in chat).
// EN ~20 common explicit/slur words; BN ~15 common transliterated terms.
const PROFANITY = [
  // English
  "fuck", "fucking", "fucker", "fucks",
  "shit", "shits", "shitting",
  "bitch", "bitches",
  "asshole", "assholes",
  "bastard", "bastards",
  "cunt", "cunts",
  "dick", "dicks",
  "pussy", "pussies",
  "nigger", "niggers",
  "faggot", "faggots",
  "whore", "whores",
  "slut", "sluts",
  // Bangla (transliterated — common in diaspora chat)
  "chodu", "choda", "chodi",
  "madarchod", "madarchoda",
  "banchod", "banchoda",
  "harami", "haramjada",
  "shala", "shalar",
  "khanki", "khankir",
  "chhagol",
  "bokachoda",
  "gaandu", "gandu",
];

// Word-boundary check — avoids Scunthorpe problem (no substring matching).
// Handles both Latin word boundaries and spaces (for transliterated Bangla).
const PROFANITY_RE = new RegExp(
  "(?:^|\\s|[^\\w])" +
  "(" + PROFANITY.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|") + ")" +
  "(?:$|\\s|[^\\w])",
  "i"
);

export function checkProfanity(str) {
  if (typeof str !== "string") return false;
  return PROFANITY_RE.test(str.toLowerCase());
}

// ── Prompt injection patterns ──────────────────────────────────────────────────
// Applied ONLY to text sent to Claude — never modifies stored content.
export const INJECTION_PATTERNS = [
  /ignore\s+(all\s+|previous\s+|above\s+|prior\s+)?(instructions?|rules?|prompts?)/gi,
  /system:?\s*(prompt|message|instruction)/gi,
  /you\s+are\s+(now\s+|actually\s+)?[a-z]+/gi,
  /\[?(INST|SYSTEM|ASSISTANT)\]?/g,
  /<\|.*?\|>/g,
  /pretend\s+(you|to\s+be)/gi,
  /disregard\s+(the\s+|your\s+)?(above|previous|prior|rules)/gi,
  /act\s+as\s+(if\s+)?(you\s+are\s+)?[a-z]+/gi,
  /new\s+(prompt|instructions?|rules?):/gi,
  /---+\s*(system|user|assistant)\s*---+/gi,
];

// Returns a cleaned copy — original string is NOT modified.
export function sanitizeForAI(str) {
  if (typeof str !== "string") return "";
  let s = str;
  for (const re of INJECTION_PATTERNS) {
    // Reset lastIndex for global regexes
    re.lastIndex = 0;
    s = s.replace(re, "[removed]");
  }
  return s;
}

// ── sanitizePost ───────────────────────────────────────────────────────────────
// Returns { title, body, flagged, errors }
// errors: array of { field, en, bn } — display in UI using lang
export function sanitizePost({ title, body }) {
  const errors = [];

  const cleanTitle = stripHTML(title ?? "");
  const cleanBody  = stripHTML(body  ?? "");

  if (!cleanTitle) {
    errors.push({ field: "title", en: "Title is required", bn: "শিরোনাম প্রয়োজন" });
  } else if (cleanTitle.length > LIMITS.title) {
    errors.push({ field: "title", en: `Title too long (max ${LIMITS.title})`, bn: `শিরোনাম খুব বড় (সর্বোচ্চ ${LIMITS.title})` });
  }

  if (cleanBody.length > LIMITS.body) {
    errors.push({ field: "body", en: `Post too long (max ${LIMITS.body})`, bn: `পোস্ট খুব বড় (সর্বোচ্চ ${LIMITS.body})` });
  }

  const flagged = checkProfanity(cleanTitle + " " + cleanBody);

  return { title: cleanTitle, body: cleanBody, flagged, errors };
}

// ── sanitizeComment ────────────────────────────────────────────────────────────
// Returns { body, flagged, errors }
export function sanitizeComment(body) {
  const errors = [];
  const clean = stripHTML(body ?? "");

  if (!clean) {
    errors.push({ field: "body", en: "Comment can't be empty", bn: "মন্তব্য খালি রাখা যাবে না" });
  } else if (clean.length > LIMITS.comment) {
    errors.push({ field: "body", en: `Comment too long (max ${LIMITS.comment})`, bn: `মন্তব্য খুব বড় (সর্বোচ্চ ${LIMITS.comment})` });
  }

  const flagged = checkProfanity(clean);
  return { body: clean, flagged, errors };
}
