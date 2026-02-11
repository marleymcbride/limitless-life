import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { events, users } from '@/db/schema';
import { desc, eq, isNull, isNotNull } from 'drizzle-orm';

/**
 * GET /api/test/check-events
 *
 * Check if recent events have userId
 */
export async function GET() {
  try {
    // Get most recent events
    const recentEvents = await db
      .select({
        eventType: events.eventType,
        userId: events.userId,
        createdAt: events.createdAt,
      })
      .from(events)
      .orderBy(desc(events.createdAt))
      .limit(10);

    // Count events with and without userId
    const [eventsWithUser] = await db
      .select({ count: events.userId })
      .from(events)
      .where(isNotNull(events.userId));

    const [eventsWithoutUser] = await db
      .select({ count: events.userId })
      .from(events)
      .where(isNull(events.userId));

    return NextResponse.json({
      recentEvents,
      counts: {
        total: recentEvents.length,
        withUserId: eventsWithUser.count,
        withoutUserId: eventsWithoutUser.count,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to check events',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
