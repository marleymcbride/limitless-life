import { NextRequest, NextResponse } from 'next/server';
import { trackEvent } from '@/lib/analytics.server';
import { updateUserLeadScore } from '@/lib/scoring';

// Simple UUID validation regex
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function getCorsHeaders(origin: string | null): HeadersInit {
  const allowedOrigins = [
    'https://fillout.com',
    'https://forms.fillout.com',
    'https://www.limitless-life.co',
    'https://limitless-life.co',
  ];

  // Allow any Fillout subdomain
  if (origin && (
    allowedOrigins.includes(origin) ||
    origin.endsWith('.fillout.com') ||
    origin.endsWith('.fillout.dev')
  )) {
    return {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
      'Vary': 'Origin',
    };
  }

  // Log unexpected origins for debugging
  if (origin) {
    console.log('[CORS] Unexpected origin:', origin);
  }

  // Only use wildcard in development mode
  if (process.env.NODE_ENV === 'development') {
    return {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };
  }

  // Production: return permissive headers for now to debug
  // TODO: Restrict to specific origins once we identify what Fillout is sending
  return {
    'Access-Control-Allow-Origin': origin || '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin',
  };
}

export async function OPTIONS(request: Request) {
  const origin = request.headers.get('origin');
  const headers = getCorsHeaders(origin);

  return new Response(null, { status: 204, headers });
}

export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  const corsHeaders = getCorsHeaders(origin);

  try {
    const body = await request.json();
    console.log('[Analytics Events] Received body:', JSON.stringify(body, null, 2));

    // Manual validation
    const { sessionId, userId, eventType, eventData } = body;

    if (!sessionId || typeof sessionId !== 'string') {
      return NextResponse.json(
        { success: false, error: 'sessionId is required' },
        { status: 400, headers: corsHeaders }
      );
    }

    if (!UUID_REGEX.test(sessionId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid sessionId format' },
        { status: 400, headers: corsHeaders }
      );
    }

    if (userId && typeof userId === 'string' && !UUID_REGEX.test(userId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid userId format' },
        { status: 400, headers: corsHeaders }
      );
    }

    if (!eventType || typeof eventType !== 'string') {
      return NextResponse.json(
        { success: false, error: 'eventType is required' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Validate eventData: must be a plain object, not null, not an array
    if (eventData !== undefined && eventData !== null) {
      if (typeof eventData !== 'object' || Array.isArray(eventData)) {
        return NextResponse.json(
          { success: false, error: 'eventData must be a plain object' },
          { status: 400, headers: corsHeaders }
        );
      }
      // Optionally limit the size of eventData to prevent abuse
      const eventDataSize = JSON.stringify(eventData).length;
      if (eventDataSize > 100000) { // 100KB limit
        return NextResponse.json(
          { success: false, error: 'eventData exceeds maximum size limit' },
          { status: 400, headers: corsHeaders }
        );
      }
    }

    console.log('[Analytics Events] Validation passed');

    // Track the event
    await trackEvent({ sessionId, userId, eventType: eventType as any, eventData });

    console.log('[Analytics Events] Event tracked successfully');

    // Automatically update lead score if this event is associated with a user
    if (userId) {
      // Fire and forget - don't wait for score update to complete
      updateUserLeadScore(userId).catch((error) => {
        console.error('Failed to update lead score:', error);
      });
    }

    return NextResponse.json(
      { success: true },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error('[Analytics Events] Error:', error);
    console.error('[Analytics Events] Error name:', error instanceof Error ? error.name : 'unknown');
    console.error('[Analytics Events] Error message:', error instanceof Error ? error.message : 'unknown');
    if (error instanceof Error) {
      console.error('[Analytics Events] Error stack:', error.stack);
    }
    return NextResponse.json(
      { success: false, error: 'Invalid request', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 400, headers: corsHeaders }
    );
  }
}
