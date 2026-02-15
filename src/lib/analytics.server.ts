import { db } from './db';
import { events } from '../db/schema';
import { type EventType } from '../types';

export async function trackEvent(data: {
  sessionId: string;
  userId?: string;
  eventType: EventType;
  eventData?: any;
}) {
  await db.insert(events).values({
    id: crypto.randomUUID(),
    sessionId: data.sessionId,
    userId: data.userId,
    eventType: data.eventType,
    eventData: data.eventData || {},
  });
}
