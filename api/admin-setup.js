// api/admin-setup.js
// ONE-TIME setup endpoint — DELETE this file after scanning the otpauth URL.
import { randomBytes } from 'crypto';

// RFC 4648 Base32 encode (no padding)
function base32Encode(buf) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  let bits = 0, value = 0, output = '';
  for (const byte of buf) {
    value = (value << 8) | byte;
    bits += 8;
    while (bits >= 5) {
      output += alphabet[(value >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }
  if (bits > 0) output += alphabet[(value << (5 - bits)) & 31];
  return output;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const key = req.headers['x-admin-secret'];
  if (!key || key !== process.env.ADMIN_LOGIN_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const secret = base32Encode(randomBytes(20)); // 160-bit secret
  const issuer  = encodeURIComponent('Ki Kotha Admin');
  const account = encodeURIComponent('adam@kikotha.com');
  const otpauth = `otpauth://totp/${issuer}:${account}?secret=${secret}&issuer=${issuer}&algorithm=SHA1&digits=6&period=30`;

  return res.status(200).json({
    totpSecret: secret,
    otpauthUrl: otpauth,
    qrUrl: `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(otpauth)}`,
    instruction: [
      `1. Open this URL in a browser to see the QR code: https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(otpauth)}`,
      `   Or scan the otpauthUrl directly with Authy / Google Authenticator.`,
      `2. Add to Vercel env vars (no VITE_ prefix): ADMIN_TOTP_SECRET=${secret}`,
      `3. Delete api/admin-setup.js immediately after.`,
    ].join('\n'),
  });
}
