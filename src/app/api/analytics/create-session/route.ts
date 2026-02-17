import { NextRequest, NextResponse } from 'next/server';
import { createSession } from '@/lib/session';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, name } = body;

    // Create session
    const sessionId = await createSession({});

    // Set session cookie (await cookies() in Next.js 15+)
    const cookieStore = await cookies();
    cookieStore.set('ll_session', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60, // 30 days
    });

    return NextResponse.json({ sessionId });
  } catch (error) {
    console.error('[Create Session] Error:', error);
    console.error('[Create Session] Error name:', error instanceof Error ? error.name : 'unknown');
    console.error('[Create Session] Error message:', error instanceof Error ? error.message : 'unknown');
    if (error instanceof Error) {
      console.error('[Create Session] Error stack:', error.stack);
    }
    return NextResponse.json(
      { error: 'Failed to create session', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
