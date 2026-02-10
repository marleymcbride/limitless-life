import { NextRequest, NextResponse } from 'next/server';
import { trackEvent } from '@/lib/analytics';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, userId, depth } = body;

    if (!sessionId) {
      return NextResponse.json({ error: 'sessionId is required' }, { status: 400 });
    }

    await trackEvent({
      sessionId,
      userId,
      eventType: 'scroll_depth',
      eventData: { depth },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error tracking scroll:', error);
    return NextResponse.json(
      { error: 'Failed to track scroll', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
