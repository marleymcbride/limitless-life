import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/admin-auth';
import { db } from '@/lib/db';
import { users, sessions, events, payments } from '@/db/schema';
import { eq, and, gte, lte, sql, isNull, or, desc } from 'drizzle-orm';

interface AbandonedLead {
  email: string;
  firstName?: string;
  tierInterest?: string;
  leadScore: number;
  temperature: 'Hot' | 'Warm' | 'Cold';
  utmSource?: string;
  utmCampaign?: string;
  tierClickTime?: string;
  lastSeen: string;
}

export async function GET(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const searchParams = request.nextUrl.searchParams;
    const startDateParam = searchParams.get('startDate');
    const endDateParam = searchParams.get('endDate');

    // Default to last 30 days if not provided
    const endDate = endDateParam ? new Date(endDateParam) : new Date();
    const startDate = startDateParam
      ? new Date(startDateParam)
      : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    // Get all users who have tier_interest set
    const usersWithInterest = await db
      .select()
      .from(users)
      .where(
        and(
          sql`${users.tierInterest} IS NOT NULL`,
          gte(users.createdAt, startDate),
          lte(users.createdAt, endDate)
        )
      );

    // Get all payment user IDs to exclude converted users
    const paymentsResult = await db
      .select({ userId: payments.userId })
      .from(payments)
      .where(
        and(
          eq(payments.status, 'succeeded'),
          gte(payments.createdAt, startDate),
          lte(payments.createdAt, endDate)
        )
      );
    const convertedUserIds = new Set(paymentsResult.map((p) => p.userId));

    // Get tier_click events for timing
    const tierClickEvents = await db
      .select()
      .from(events)
      .where(
        and(
          eq(events.eventType, 'tier_click'),
          gte(events.createdAt, startDate),
          lte(events.createdAt, endDate)
        )
      )
      .orderBy(desc(events.createdAt));

    // Map sessionId -> tier click time
    const tierClickTimeMap = new Map<string, Date>();
    for (const event of tierClickEvents) {
      if (!tierClickTimeMap.has(event.sessionId)) {
        tierClickTimeMap.set(event.sessionId, event.createdAt);
      }
    }

    // Build abandoned leads list
    const abandonedLeads: AbandonedLead[] = [];

    for (const user of usersWithInterest) {
      // Skip if converted
      if (convertedUserIds.has(user.id)) continue;

      // Determine temperature
      let temperature: 'Hot' | 'Warm' | 'Cold' = 'Cold';
      if (user.leadScore >= 70) temperature = 'Hot';
      else if (user.leadScore >= 40) temperature = 'Warm';

      // Get UTM from latest session
      const userSessions = await db
        .select()
        .from(sessions)
        .where(eq(sessions.userId, user.id))
        .orderBy(desc(sessions.lastSeen))
        .limit(1);

      const latestSession = userSessions[0];
      const tierClickTime = latestSession
        ? tierClickTimeMap.get(latestSession.id)
        : undefined;

      abandonedLeads.push({
        email: user.email,
        firstName: user.firstName || undefined,
        tierInterest: user.tierInterest || undefined,
        leadScore: user.leadScore || 0,
        temperature,
        utmSource: latestSession?.utmSource || undefined,
        utmCampaign: latestSession?.utmCampaign || undefined,
        tierClickTime: tierClickTime?.toISOString(),
        lastSeen: user.lastSeen?.toISOString() || new Date().toISOString(),
      });
    }

    // Sort by lead score descending (hot leads first)
    abandonedLeads.sort((a, b) => b.leadScore - a.leadScore);

    return NextResponse.json(abandonedLeads);
  } catch (error) {
    console.error('Error fetching abandoned funnel analytics:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch abandoned funnel analytics',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
