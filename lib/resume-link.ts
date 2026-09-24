import { createHmac, timingSafeEqual } from 'crypto';

// Signed résumé links are handed out only after a Turnstile check passes,
// so the PDF never has a stable public URL for crawlers to find.
const TTL_SECONDS = 60 * 60;

function secret() {
  return process.env.TURNSTILE_SECRET_KEY || 'dev-only-secret';
}

function sign(exp: string) {
  return createHmac('sha256', secret()).update(`resume:${exp}`).digest('base64url');
}

export function createResumeUrl() {
  const exp = String(Math.floor(Date.now() / 1000) + TTL_SECONDS);
  return `/api/resume?t=${exp}.${sign(exp)}`;
}

export function isValidResumeToken(token: string | null) {
  if (!token) return false;
  const [exp, sig] = token.split('.');
  if (!exp || !sig || Number(exp) < Date.now() / 1000) return false;
  const expected = Buffer.from(sign(exp));
  const given = Buffer.from(sig);
  return expected.length === given.length && timingSafeEqual(expected, given);
}
