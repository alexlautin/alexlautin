import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createResumeUrl, isValidResumeToken } from '@/lib/resume-link';

const tokenFrom = (url: string) => new URL(url, 'http://localhost').searchParams.get('t');

describe('resume link tokens', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-01-01T00:00:00Z'));
  });
  afterEach(() => vi.useRealTimers());

  it('accepts a freshly created token', () => {
    expect(isValidResumeToken(tokenFrom(createResumeUrl()))).toBe(true);
  });

  it('rejects an expired token', () => {
    const token = tokenFrom(createResumeUrl());
    vi.advanceTimersByTime(61 * 60 * 1000);
    expect(isValidResumeToken(token)).toBe(false);
  });

  it('rejects a tampered signature', () => {
    const [exp, sig] = tokenFrom(createResumeUrl())!.split('.');
    const flipped = sig.slice(0, -1) + (sig.endsWith('A') ? 'B' : 'A');
    expect(isValidResumeToken(`${exp}.${flipped}`)).toBe(false);
  });

  it('rejects an extended expiry with the original signature', () => {
    const [exp, sig] = tokenFrom(createResumeUrl())!.split('.');
    expect(isValidResumeToken(`${Number(exp) + 86400}.${sig}`)).toBe(false);
  });

  it.each([null, '', 'garbage', '123', '.', '123.', '.abc'])('rejects malformed token %j', (t) => {
    expect(isValidResumeToken(t)).toBe(false);
  });
});
