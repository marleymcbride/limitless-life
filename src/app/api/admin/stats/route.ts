import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users, payments, events, sessions } from '@/db/schema';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import { gte, sql, and, desc, eq, lte, inArray } from 'drizzle-orm';

/**
 * GET /api/admin/stats
 * Fetch dashboard summary metrics
 */
export async function GET(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    // Run queries in parallel
    const [
      totalUsers,
      hotLeadsCount,
      warmLeadsCount,
      paymentsThisMonth,
      paymentsToday,
      visitors7d,
      visitorsToday,
      events7d,
      eventsToday,
      totalSessions,
    ] = await Promise.all([
      db.select({ count: sql<number>`count(*)` }).from(users),
      db.select({ count: sql<number>`count(*)` }).from(users).where(sql`${users.leadScore} >= 70`),
      db.select({ count: sql<number>`count(*)` }).from(users).where(and(sql`${users.leadScore} >= 40`, sql`${users.leadScore} < 70`)),
      db.select({ value: sql<number>`COALESCE(SUM(${payments.amount}), 0)` }).from(payments).where(and(eq(payments.status, 'succeeded'), gte(payments.createdAt, startOfMonth))),
      db.select({ value: sql<number>`COALESCE(SUM(${payments.amount}), 0)` }).from(payments).where(and(eq(payments.status, 'succeeded'), gte(payments.createdAt, startOfToday))),
      db.select({ count: sql<number>`count(distinct ${sessions.id})` }).from(sessions).where(gte(sessions.firstSeen, sevenDaysAgo)),
      db.select({ count: sql<number>`count(distinct ${sessions.id})` }).from(sessions).where(gte(sessions.firstSeen, startOfToday)),
      db.select({ count: sql<number>`count(*)` }).from(events).where(gte(events.createdAt, sevenDaysAgo)),
      db.select({ count: sql<number>`count(*)` }).from(events).where(gte(events.createdAt, startOfToday)),
      db.select({ count: sql<number>`count(*)` }).from(sessions),
    ]);

    // Recent hot leads (last 10, with their latest event)
    const hotLeads = await db
      .select({
        id: users.id,
        email: users.email,
        firstName: users.firstName,
        lastName: users.lastName,
        leadScore: users.leadScore,
        leadTemperature: users.leadTemperature,
        tierInterest: users.tierInterest,
        lastSeen: users.lastSeen,
      })
      .from(users)
      .where(and(sql`${users.leadScore} >= 70`, sql`${users.email} IS NOT NULL`))
      .orderBy(desc(users.leadScore))
      .limit(10);

    // Get latest event for each hot lead (find most recent event by userId)
    const hotLeadIds = hotLeads.map(l => l.id);
    let hotLeadEvents: { userId: string; eventType: string; createdAt: Date }[] = [];
    if (hotLeadIds.length > 0) {
      hotLeadEvents = await db
        .select({
          userId: events.userId,
          eventType: events.eventType,
          createdAt: events.createdAt,
        })
        .from(events)
        .where(and(
          inArray(events.userId, hotLeadIds),
          eq(events.eventType, 'concierge_deposit_paid'),
          gte(events.createdAt, sevenDaysAgo),
        ))
        .orderBy(desc(events.createdAt));
    }

    const enrichedHotLeads = hotLeads.map(lead => {
      const latest = hotLeadEvents.find(e => e.userId === lead.id);
      return {
        ...lead,
        latestEvent: latest?.eventType || null,
        latestEventAt: latest?.createdAt?.toISOString() || null,
      };
    });

    return NextResponse.json({
      revenue: {
        month: Math.round((paymentsThisMonth[0]?.value || 0)),
        today: Math.round((paymentsToday[0]?.value || 0)),
      },
      visitors: {
        total: totalSessions[0]?.count || 0,
        today: visitorsToday[0]?.count || 0,
        last7Days: visitors7d[0]?.count || 0,
      },
      leads: {
        total: totalUsers[0]?.count || 0,
        hot: hotLeadsCount[0]?.count || 0,
        warm: warmLeadsCount[0]?.count || 0,
      },
      events: {
        last7Days: events7d[0]?.count || 0,
        today: eventsToday[0]?.count || 0,
      },
      hotLeads: enrichedHotLeads,
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
