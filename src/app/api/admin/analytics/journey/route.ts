import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/admin-auth';
import { db } from '@/lib/db';
import { events, sessions, users } from '@/db/schema';
import { eq, and, gte, lte, desc, sql } from 'drizzle-orm';

interface JourneyEvent {
  type: string;
  timestamp: string;
  data?: any;
}

interface UserJourney {
  userId?: string;
  email?: string;
  events: JourneyEvent[];
  outcome: 'converted' | 'abandoned' | 'active';
  tierInterest?: string;
}

interface AggregateJourney {
  source: string;
  totalUsers: number;
  avgEvents: number;
  conversionRate: number;
  commonPath: string[];
}

export async function GET(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const searchParams = request.nextUrl.searchParams;
    const startDateParam = searchParams.get('startDate');
    const endDateParam = searchParams.get('endDate');
    const aggregate = searchParams.get('aggregate') === 'true';

    // Default to last 30 days if not provided
    const endDate = endDateParam ? new Date(endDateParam) : new Date();
    const startDate = startDateParam
      ? new Date(startDateParam)
      : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    if (aggregate) {
      // Return aggregate journey stats by traffic source
      return await getAggregateJourneys(startDate, endDate);
    } else {
      // Return individual user journeys
      return await getIndividualJourneys(startDate, endDate, searchParams);
    }
  } catch (error) {
    console.error('Error fetching customer journey analytics:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch customer journey analytics',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

async function getIndividualJourneys(
  startDate: Date,
  endDate: Date,
  searchParams: URLSearchParams
): Promise<NextResponse> {
  const limit = parseInt(searchParams.get('limit') || '50');
  const outcomeFilter = searchParams.get('outcome') as 'converted' | 'abandoned' | 'active' | null;

  // Get all events in date range
  const allEvents = await db
    .select()
    .from(events)
    .where(and(gte(events.createdAt, startDate), lte(events.createdAt, endDate)))
    .orderBy(desc(events.createdAt));

  // Get sessions for UTM data
  const allSessions = await db
    .select()
    .from(sessions)
    .where(and(gte(sessions.firstSeen, startDate), lte(sessions.firstSeen, endDate)));

  // Get users for tier interest
  const allUsers = await db
    .select()
    .from(users)
    .where(and(gte(users.createdAt, startDate), lte(users.createdAt, endDate)));

  // Map sessionId -> userId
  const sessionToUser = new Map<string, string>();
  for (const session of allSessions) {
    if (session.userId) {
      sessionToUser.set(session.id, session.userId);
    }
  }

  // Map userId -> user data
  const userMap = new Map<string, typeof allUsers[0]>();
  for (const user of allUsers) {
    userMap.set(user.id, user);
  }

  // Group events by user
  const eventsByUser = new Map<string, typeof allEvents>();
  for (const event of allEvents) {
    const userId = event.userId || sessionToUser.get(event.sessionId);
    if (!userId) continue;

    if (!eventsByUser.has(userId)) {
      eventsByUser.set(userId, []);
    }
    eventsByUser.get(userId)!.push(event);
  }

  // Build journey for each user
  const journeys: UserJourney[] = [];
  for (const [userId, userEvents] of eventsByUser.entries()) {
    const userData = userMap.get(userId);

    // Determine outcome
    let outcome: 'converted' | 'abandoned' | 'active' = 'active';
    const hasPayment = userEvents.some((e) => e.eventType === 'payment_complete');
    const hasTierClick = userEvents.some((e) => e.eventType === 'tier_click');

    if (hasPayment) {
      outcome = 'converted';
    } else if (hasTierClick) {
      outcome = 'abandoned';
    }

    // Filter by outcome if specified
    if (outcomeFilter && outcome !== outcomeFilter) continue;

    // Sort events by time
    userEvents.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

    journeys.push({
      userId,
      email: userData?.email,
      events: userEvents.map((e) => ({
        type: e.eventType,
        timestamp: e.createdAt.toISOString(),
        data: e.eventData,
      })),
      outcome,
      tierInterest: userData?.tierInterest || undefined,
    });

    if (journeys.length >= limit) break;
  }

  return NextResponse.json(journeys);
}

async function getAggregateJourneys(
  startDate: Date,
  endDate: Date
): Promise<NextResponse> {
  // Get all sessions with UTM
  const allSessions = await db
    .select()
    .from(sessions)
    .where(
      and(
        gte(sessions.firstSeen, startDate),
        lte(sessions.firstSeen, endDate)
      )
    );

  // Group by UTM source
  const sourceGroups = new Map<string, { sessionIds: string[]; userIds: Set<string> }>();

  for (const session of allSessions) {
    const source = session.utmSource || 'Direct';
    if (!sourceGroups.has(source)) {
      sourceGroups.set(source, { sessionIds: [], userIds: new Set() });
    }
    const group = sourceGroups.get(source)!;
    group.sessionIds.push(session.id);
    if (session.userId) {
      group.userIds.add(session.userId);
    }
  }

  // Calculate stats for each source
  const journeys: AggregateJourney[] = [];

  for (const [source, group] of sourceGroups.entries()) {
    // Count unique users
    const totalUsers = group.sessionIds.length;

    // Get avg events per user
    const eventCounts = await db
      .select({ count: sql<number>`count(*)` })
      .from(events)
      .where(sql`${events.sessionId} = ANY(${group.sessionIds})`);

    const avgEvents = eventCounts[0]?.count
      ? Math.round(eventCounts[0].count / totalUsers)
      : 0;

    // Get conversions
    const conversionResult = await db
      .select({ count: sql<number>`count(distinct ${events.userId})` })
      .from(events)
      .where(
        and(
          eq(events.eventType, 'payment_complete'),
          sql`${events.sessionId} = ANY(${group.sessionIds})`
        )
      );

    const conversions = conversionResult[0]?.count || 0;
    const conversionRate = totalUsers > 0 ? Math.round((conversions / totalUsers) * 100) : 0;

    // Get most common event path (simplified - just top 5 event types)
    const commonPathResult = await db
      .select({ type: events.eventType, count: sql<number>`count(*)` })
      .from(events)
      .where(sql`${events.sessionId} = ANY(${group.sessionIds})`)
      .groupBy(events.eventType)
      .orderBy(desc(sql`count(*)`))
      .limit(5);

    const commonPath = commonPathResult.map((r) => r.type);

    journeys.push({
      source,
      totalUsers,
      avgEvents,
      conversionRate,
      commonPath,
    });
  }

  // Sort by conversion rate descending
  journeys.sort((a, b) => b.conversionRate - a.conversionRate);

  return NextResponse.json(journeys);
}
