import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';
import { users, sessions, events } from '@/db/schema';
import { sql, and, gte, lte, eq } from 'drizzle-orm';
import { env } from '@/env.mjs';

const schema = z.object({
  userId: z.string().optional(),
  aggregate: z.boolean().optional(),
  limit: z.string().optional(),
});

/**
 * GET /api/analytics/journey
 *
 * Get customer journey events and timeline
 *
 * Headers:
 * - x-admin-api-key: Required for authentication
 *
 * Query Params:
 * - userId: Filter by specific user ID
 * - aggregate: If true, return aggregated stats instead of individual events
 * - limit: Maximum number of events to return (default 20)
 */
export async function GET(req: NextRequest) {
  try {
    // Verify admin API key
    const apiKey = req.headers.get('x-admin-api-key');
    if (apiKey !== env.ADMIN_API_KEY) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = req.nextUrl;
    const userId = searchParams.get('userId');
    const aggregate = searchParams.get('aggregate') === 'true';
    const limit = parseInt(searchParams.get('limit') || '20', 10);

    if (aggregate) {
      // Return aggregated journey stats for multiple users
      const query = db
        .select({
          userId: users.id,
          email: users.email,
          totalEvents: sql<number>`COUNT(${events.id})`,
          firstSeen: sql<string>`MIN(${events.createdAt})`,
          lastSeen: sql<string>`MAX(${events.createdAt})`,
        })
        .from(users)
        .innerJoin(sessions, eq(users.id, sessions.userId))
        .innerJoin(events, eq(users.id, events.userId))
        .groupBy(users.id)
        .orderBy(sql`COUNT(${events.id}) DESC`)
        .limit(limit);

      const results = await query;

      return NextResponse.json({
        success: true,
        journeys: results.map(r => ({
          ...r,
          period: {
            start: r.firstSeen,
            end: r.lastSeen,
          },
        })),
      });
    }

    // Single user journey
    if (!userId) {
      return NextResponse.json(
        { error: 'userId required when not aggregating' },
        { status: 400 }
      );
    }

    // Get user info
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Get user's events
    const userEvents = await db
      .select()
      .from(events)
      .where(eq(events.userId, userId))
      .orderBy(events.createdAt)
      .limit(limit);

    return NextResponse.json({
      success: true,
      userId: user.id,
      email: user.email,
      events: userEvents,
      totalEvents: userEvents.length,
      period: {
        start: userEvents[0]?.createdAt || null,
        end: userEvents[userEvents.length - 1]?.createdAt || null,
      },
    });
  } catch (error) {
    console.error('Error fetching journey data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch journey data', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
