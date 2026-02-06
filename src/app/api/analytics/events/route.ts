import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { trackEvent } from '@/lib/analytics';

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

    await trackEvent({ sessionId, userId, eventType: eventType as any, eventData });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 });
  }
}
