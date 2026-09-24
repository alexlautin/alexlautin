import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';
import { isValidResumeToken } from '@/lib/resume-link';

export async function GET(request: NextRequest) {
  if (!isValidResumeToken(request.nextUrl.searchParams.get('t'))) {
    return NextResponse.json({ error: 'Link expired' }, { status: 403 });
  }

  const pdf = await readFile(path.join(process.cwd(), 'private', 'resume.pdf'));

  return new NextResponse(new Uint8Array(pdf), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename="Alex-Lautin-Resume.pdf"',
      'X-Robots-Tag': 'noindex, nofollow, noarchive',
      'Cache-Control': 'private, no-store',
    },
  });
}
