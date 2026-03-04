import { NextRequest, NextResponse } from 'next/server';
import { getOrCreateSession } from '@/lib/session';
import { cookies } from 'next/headers';

function getCorsHeaders(origin: string | null): HeadersInit {
  // Allow requests from same origin and development
  const allowedOrigins = [
    'https://www.limitless-life.co',
    'https://limitless-life.co',
  ];

  if (origin && allowedOrigins.includes(origin)) {
    return {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
      'Vary': 'Origin',
    };
  }

  // Development mode: allow all origins
  if (process.env.NODE_ENV === 'development') {
    return {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };
  }

  // Production: allow same-origin requests
  return {
    'Access-Control-Allow-Origin': origin || '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin',
  };
}

export async function OPTIONS(request: Request) {
  const origin = request.headers.get('origin');
  const headers = getCorsHeaders(origin);

  return new Response(null, { status: 204, headers });
}

export async function POST(req: NextRequest) {
  const origin = req.headers.get('origin');
  const corsHeaders = getCorsHeaders(origin);

  try {
    const body = await req.json();
    const { email, name } = body;

    // Create session
    const cookieStore = await cookies();
    const session = await getOrCreateSession({}, cookieStore);
    const sessionId = session.id;

    // Set session cookie
    cookieStore.set('ll_session', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60, // 30 days
    });

    return NextResponse.json({ sessionId }, { headers: corsHeaders });
  } catch (error) {
    console.error('[Create Session] Error:', error);
    console.error('[Create Session] Error name:', error instanceof Error ? error.name : 'unknown');
    console.error('[Create Session] Error message:', error instanceof Error ? error.message : 'unknown');
    if (error instanceof Error) {
      console.error('[Create Session] Error stack:', error.stack);
    }
    return NextResponse.json(
      { error: 'Failed to create session', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500, headers: corsHeaders }
    );
  }
}
