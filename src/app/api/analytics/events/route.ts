import { NextRequest, NextResponse } from 'next/server';
import { trackEvent } from '@/lib/analytics.server';
import { updateUserLeadScore } from '@/lib/scoring';

// Simple UUID validation regex
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('[Analytics Events] Received body:', JSON.stringify(body, null, 2));

    // Manual validation
    const { sessionId, userId, eventType, eventData } = body;

    if (!sessionId || typeof sessionId !== 'string') {
      return NextResponse.json({ success: false, error: 'sessionId is required' }, { status: 400 });
    }

    if (!UUID_REGEX.test(sessionId)) {
      return NextResponse.json({ success: false, error: 'Invalid sessionId format' }, { status: 400 });
    }

    if (userId && typeof userId === 'string' && !UUID_REGEX.test(userId)) {
      return NextResponse.json({ success: false, error: 'Invalid userId format' }, { status: 400 });
    }

    if (!eventType || typeof eventType !== 'string') {
      return NextResponse.json({ success: false, error: 'eventType is required' }, { status: 400 });
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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Analytics Events] Error:', error);
    console.error('[Analytics Events] Error name:', error instanceof Error ? error.name : 'unknown');
    console.error('[Analytics Events] Error message:', error instanceof Error ? error.message : 'unknown');
    if (error instanceof Error) {
      console.error('[Analytics Events] Error stack:', error.stack);
    }
    return NextResponse.json({ success: false, error: 'Invalid request', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 400 });
  }
}
