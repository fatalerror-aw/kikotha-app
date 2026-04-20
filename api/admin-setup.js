// api/admin-setup.js
// ONE-TIME setup endpoint — DELETE this file after scanning the QR code.
import { authenticator } from 'otplib';
import QRCode from 'qrcode';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  // Gate: must present the ADMIN_LOGIN_KEY to reach this endpoint
  const secret = req.headers['x-admin-secret'];
  if (!secret || secret !== process.env.ADMIN_LOGIN_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Generate a fresh TOTP secret
  const totpSecret = authenticator.generateSecret();
  const otpauth = authenticator.keyuri('admin@kikotha.com', 'Ki Kotha Admin', totpSecret);
  const qrDataUrl = await QRCode.toDataURL(otpauth);

  return res.status(200).json({
    totpSecret,
    qrDataUrl,
    instruction: [
      '1. Scan the QR code in Google Authenticator or Authy.',
      `2. Add ADMIN_TOTP_SECRET=${totpSecret} to Vercel env vars (no VITE_ prefix).`,
      '3. Delete api/admin-setup.js immediately after.',
    ].join(' ')
  });
}
