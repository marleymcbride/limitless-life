import { type EventType } from '../types/analytics';
import { db } from '@/lib/db';
import { events } from '@/db/schema';
import { randomUUID } from 'crypto';

// Server-side trackEvent - writes to PostgreSQL via Drizzle
export async function trackEvent(data: {
  sessionId: string;
  userId?: string;
  eventType: EventType;
  eventData?: any;
}): Promise<void> {
  try {
    await db.insert(events).values({
      id: randomUUID(),
      sessionId: data.sessionId,
      userId: data.userId || null,
      eventType: data.eventType,
      eventData: data.eventData || null,
      createdAt: new Date(),
    });
  } catch (error) {
    console.error('[analytics.server] Failed to write event:', error);
    // Don't throw — event tracking should never break the app
  }
}
