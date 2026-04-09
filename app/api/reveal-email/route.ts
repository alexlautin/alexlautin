import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { token } = await request.json();

  if (!token) {
    return NextResponse.json({ error: 'Missing token' }, { status: 400 });
  }

  // Skip verification in development — Turnstile tokens are invalid on localhost
  if (process.env.NODE_ENV !== 'production') {
    return NextResponse.json({ email: process.env.CONTACT_EMAIL });
  }

  const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: new URLSearchParams({
      secret: process.env.TURNSTILE_SECRET_KEY!,
      response: token,
    }),
  });

  const data = await verifyRes.json();

  if (!data.success) {
    return NextResponse.json({ error: 'Verification failed' }, { status: 403 });
  }

  return NextResponse.json({ email: process.env.CONTACT_EMAIL });
}
