import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users, payments, events, sessions } from '@/db/schema';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import { gte, sql, and, desc, eq, inArray, notInArray } from 'drizzle-orm';
import { fetchCampaigns } from '@/lib/airtable';

interface LeadRow {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  leadScore: number;
  leadTemperature: string | null;
  tierInterest: string | null;
  lastSeen: Date | null;
}

export async function GET(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    // Revenue + visitors
    const [revenueMonth, revenueToday, visitorsTodayCount, visitorsWeekCount] = await Promise.all([
      db.select({ value: sql<number>`COALESCE(SUM(${payments.amount}), 0)` }).from(payments).where(and(eq(payments.status, 'succeeded'), gte(payments.createdAt, startOfMonth))),
      db.select({ value: sql<number>`COALESCE(SUM(${payments.amount}), 0)` }).from(payments).where(and(eq(payments.status, 'succeeded'), gte(payments.createdAt, startOfToday))),
      db.select({ count: sql<number>`count(distinct ${sessions.id})` }).from(sessions).where(gte(sessions.firstSeen, startOfToday)),
      db.select({ count: sql<number>`count(distinct ${sessions.id})` }).from(sessions).where(gte(sessions.firstSeen, sevenDaysAgo)),
    ]);

    // Fetch marketing data from Airtable (YouTube campaigns)
    let ytViews = 0;
    let ytClicks = 0;
    try {
      const campaigns = await fetchCampaigns();
      const videoCampaigns = campaigns.filter((c: any) => c.category === 'video');
      ytViews = videoCampaigns.reduce((sum: number, c: any) => sum + (c.views || 0), 0);
      ytClicks = videoCampaigns.reduce((sum: number, c: any) => sum + (c.clicks || 0), 0);
    } catch (err) {
      console.error('[stats] Failed to fetch campaign data:', err);
    }

    // Get user IDs by event type + payment tier
    const usersWithEvent = async (eventType: string) => {
      const rows = await db
        .select({ userId: events.userId })
        .from(events)
        .where(eq(events.eventType, eventType as any))
        .groupBy(events.userId);
      return new Set(rows.map(r => r.userId));
    };

    const usersWithPaymentTier = async (tier: string) => {
      const rows = await db
        .select({ userId: payments.userId })
        .from(payments)
        .where(and(eq(payments.tier, tier as any), eq(payments.status, 'succeeded')))
        .groupBy(payments.userId);
      return new Set(rows.map(r => r.userId));
    };

    const [depositUserIds, coachingUserIds, lowerTierUserIds] = await Promise.all([
      usersWithEvent('concierge_deposit_paid'),
      usersWithPaymentTier('concierge'),        // full coaching programme
      usersWithPaymentTier('course'),           // standalone course / event ticket (future)
    ]);

    const paidIds = new Set([...depositUserIds, ...coachingUserIds, ...lowerTierUserIds]);

    // Get all users with email
    const allUsers = await db
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
      .where(sql`${users.email} IS NOT NULL`)
      .orderBy(desc(users.createdAt));

    // Partition users into 4 groups
    const leadUsers = allUsers.filter(u => !paidIds.has(u.id));
    const readyToJoinUsers = allUsers.filter(u => depositUserIds.has(u.id) && !coachingUserIds.has(u.id) && !lowerTierUserIds.has(u.id));
    const clientUsers = allUsers.filter(u => coachingUserIds.has(u.id));
    const customerUsers = allUsers.filter(u => lowerTierUserIds.has(u.id));
    const hotLeadUsers = allUsers.filter(u => u.leadScore >= 70 && !paidIds.has(u.id)).slice(0, 10);

    // Batch-fetch latest event for all users in all groups
    const allGroupIds = [...new Set([
      ...leadUsers.map(u => u.id),
      ...readyToJoinUsers.map(u => u.id),
      ...clientUsers.map(u => u.id),
      ...customerUsers.map(u => u.id),
      ...hotLeadUsers.map(u => u.id),
    ])];

    const latestEvents: { userId: string; eventType: string; createdAt: Date }[] = [];
    if (allGroupIds.length > 0) {
      const raw = await db
        .select({
          userId: events.userId,
          eventType: events.eventType,
          createdAt: events.createdAt,
        })
        .from(events)
        .where(inArray(events.userId, allGroupIds))
        .orderBy(desc(events.createdAt));

      // Take only the first event per user (most recent)
      const seen = new Set<string>();
      for (const row of raw) {
        if (row.userId && !seen.has(row.userId)) {
          seen.add(row.userId);
          latestEvents.push({
            userId: row.userId,
            eventType: row.eventType,
            createdAt: row.createdAt instanceof Date ? row.createdAt : new Date(row.createdAt),
          });
        }
      }
    }

    const latestEventMap = new Map<string, { eventType: string; createdAt: Date }>();
    for (const e of latestEvents) {
      if (!latestEventMap.has(e.userId)) {
        latestEventMap.set(e.userId, { eventType: e.eventType, createdAt: e.createdAt });
      }
    }

    const enrich = (u: LeadRow) => {
      const latest = latestEventMap.get(u.id);
      const eventDate = latest?.createdAt;
      return {
        id: u.id,
        email: u.email,
        firstName: u.firstName,
        lastName: u.lastName,
        leadScore: u.leadScore,
        leadTemperature: u.leadTemperature,
        tierInterest: u.tierInterest,
        latestEvent: latest?.eventType || null,
        latestEventAt: eventDate ? new Date(eventDate).toISOString() : null,
      };
    };

    return NextResponse.json({
      revenue: {
        month: Math.round((revenueMonth[0]?.value || 0)),
        today: Math.round((revenueToday[0]?.value || 0)),
      },
      visitors: {
        today: visitorsTodayCount[0]?.count || 0,
        last7Days: visitorsWeekCount[0]?.count || 0,
      },
      marketing: {
        ytViews,
        ytClicks,
        cvr: ytViews > 0 ? Math.round((ytClicks / ytViews) * 100) : 0,
      },
      counts: {
        newLeads: leadUsers.length,
        newCustomers: customerUsers.length,
        readyToJoin: readyToJoinUsers.length,
        newClients: clientUsers.length,
        hotLeads: hotLeadUsers.length,
      },
      groups: {
        newLeads: leadUsers.slice(0, 10).map(enrich),
        readyToJoin: readyToJoinUsers.slice(0, 10).map(enrich),
        newClients: clientUsers.slice(0, 10).map(enrich),
        newCustomers: customerUsers.slice(0, 10).map(enrich),
        hotLeads: hotLeadUsers.map(enrich),
      },
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
