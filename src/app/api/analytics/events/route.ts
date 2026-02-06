import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { trackEvent } from '@/lib/analytics';
import { updateUserLeadScore } from '@/lib/scoring';

const schema = z.object({
  sessionId: z.string().uuid(),
  userId: z.string().uuid().optional(),
  eventType: z.string(),
  eventData: z.object({}).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId, userId, eventType, eventData } = schema.parse(body);

    // Track the event
    await trackEvent({ sessionId, userId, eventType: eventType as any, eventData });

    // Automatically update lead score if this event is associated with a user
    if (userId) {
      // Fire and forget - don't wait for score update to complete
      updateUserLeadScore(userId).catch((error) => {
        console.error('Failed to update lead score:', error);
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 });
  }
}
