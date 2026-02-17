import { NextRequest, NextResponse } from 'next/server';
import { createSession } from '@/lib/session';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, name } = body;

    // Create session
    const sessionId = await createSession({});

    // Set session cookie
    const cookieStore = cookies();
    cookieStore.set('ll_session', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60, // 30 days
    });

    return NextResponse.json({ sessionId });
  } catch (error) {
    console.error('Failed to create session:', error);
    return NextResponse.json(
      { error: 'Failed to create session' },
      { status: 500 }
    );
  }
}
