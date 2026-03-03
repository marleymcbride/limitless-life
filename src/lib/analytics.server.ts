import { type EventType } from '../types/analytics';

// Server-side trackEvent - would write to database
// For now, this is a stub that logs events
export async function trackEvent(data: {
  sessionId: string;
  userId?: string;
  eventType: EventType;
  eventData?: any;
}): Promise<void> {
  // In production, this would write to PostgreSQL/Railway
  // For now, just log the event
  console.log('[analytics.server] Tracking event:', {
    sessionId: data.sessionId,
    userId: data.userId,
    eventType: data.eventType,
    eventData: data.eventData,
    timestamp: new Date().toISOString(),
  });

  // TODO: Implement database write
  // Example:
  // await db.event.create({
  //   data: {
  //     sessionId: data.sessionId,
  //     userId: data.userId,
  //     eventType: data.eventType,
  //     eventData: data.eventData,
  //     timestamp: new Date(),
  //   },
  // });
}
