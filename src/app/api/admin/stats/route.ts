import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users, payments, events, sessions, campaignMetrics, campaigns, dismissedLeads } from '@/db/schema';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import { gte, sql, and, desc, eq, inArray, notInArray, max, min } from 'drizzle-orm';

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
      db.select({ value: sql<number>`COALESCE(SUM(${payments.amount}), 0)` }).from(payments).where(and(eq(payments.status, 'succeeded'), gte(payments.paymentDate, startOfMonth))),
      db.select({ value: sql<number>`COALESCE(SUM(${payments.amount}), 0)` }).from(payments).where(and(eq(payments.status, 'succeeded'), gte(payments.paymentDate, startOfToday))),
      db.select({ count: sql<number>`count(distinct ${sessions.id})` }).from(sessions).where(gte(sessions.firstSeen, startOfToday)),
      db.select({ count: sql<number>`count(distinct ${sessions.id})` }).from(sessions).where(gte(sessions.firstSeen, sevenDaysAgo)),
    ]);

    // Fetch YouTube campaign metrics — monthly delta from campaign_metrics
    let ytViews = 0;
    let ytClicks = 0;
    try {
      const rows = await db
        .select({
          minViews: min(campaignMetrics.views),
          maxViews: max(campaignMetrics.views),
          minClicks: min(campaignMetrics.clicks),
          maxClicks: max(campaignMetrics.clicks),
        })
        .from(campaignMetrics)
        .innerJoin(campaigns, eq(campaignMetrics.campaignId, campaigns.id))
        .where(and(
          gte(campaignMetrics.metricDate, startOfMonth),
          sql`${campaigns.utmCampaign} != 'test-campaign-123'`,
          eq(campaigns.category, 'video'),
        ))
        .groupBy(campaignMetrics.campaignId);

      for (const row of rows) {
        ytViews += (row.maxViews || 0) - (row.minViews || 0);
        ytClicks += (row.maxClicks || 0) - (row.minClicks || 0);
      }
    } catch (err) {
      console.error('[stats] Failed to fetch campaign metrics:', err);
    }

    // Sales page events this month
    const countEventType = async (eventType: string) => {
      const [row] = await db
        .select({ count: sql<number>`count(distinct ${events.sessionId})` })
        .from(events)
        .where(and(
          eq(events.eventType, eventType as any),
          gte(events.createdAt, startOfMonth),
        ));
      return row?.count || 0;
    };

    const [uniqueVisitors, offerDocViews, emailsCaptured, newLeadsThisMonth] = await Promise.all([
      countEventType('page_view'),
      countEventType('pricing_view'),
      countEventType('email_submit'),
      // Count users with email created this month
      db.select({ count: sql<number>`count(*)` }).from(users).where(and(sql`${users.email} IS NOT NULL`, gte(users.createdAt, startOfMonth))),
    ]);

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

    const [depositUserIds, coachingUserIds, lowerTierUserIds, allPaidUserIds] = await Promise.all([
      usersWithEvent('concierge_deposit_paid'),
      usersWithPaymentTier('concierge'),        // full coaching programme
      usersWithPaymentTier('course'),           // standalone course / event ticket (future)
      // Any user with a successful payment (catches manual entries like "Built Different Legacy")
      db.select({ userId: payments.userId }).from(payments).where(eq(payments.status, 'succeeded')).groupBy(payments.userId).then(rows => new Set(rows.map(r => r.userId))),
    ]);

    // Paid check: anyone with any successful payment
    const paidIds = allPaidUserIds;

    // Legacy manual-entry tiers — treat as clients if they match a known legacy name
    const legacyClientIds = new Set(
      Array.from(allPaidUserIds).filter(id => !depositUserIds.has(id) && !coachingUserIds.has(id) && !lowerTierUserIds.has(id))
    );

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

    // Get dismissed lead IDs and filter them out client/lead groups
    const dismissedIds = await db.select({ userId: dismissedLeads.userId }).from(dismissedLeads).then(rows => new Set(rows.map(r => r.userId)));

    // Partition users into 4 groups (excluding dismissed)
    const leadUsers = allUsers.filter(u => !paidIds.has(u.id) && !dismissedIds.has(u.id));
    const readyToJoinUsers = allUsers.filter(u => depositUserIds.has(u.id) && !coachingUserIds.has(u.id) && !lowerTierUserIds.has(u.id) && !dismissedIds.has(u.id));
    const clientUsers = allUsers.filter(u => (coachingUserIds.has(u.id) || legacyClientIds.has(u.id)) && !dismissedIds.has(u.id));
    const clientIds = new Set(clientUsers.map(u => u.id));
    const customerUsers = allUsers.filter(u => lowerTierUserIds.has(u.id) && !clientIds.has(u.id) && !dismissedIds.has(u.id));
    const hotLeadUsers = allUsers.filter(u => u.leadScore >= 70 && !paidIds.has(u.id) && !dismissedIds.has(u.id)).slice(0, 10);

    // Batch-fetch latest event and payment tier for all users
    const allGroupIds = [...new Set([
      ...leadUsers.map(u => u.id),
      ...readyToJoinUsers.map(u => u.id),
      ...clientUsers.map(u => u.id),
      ...customerUsers.map(u => u.id),
      ...hotLeadUsers.map(u => u.id),
    ])];

    const latestEvents: { userId: string; eventType: string; createdAt: Date }[] = [];
    const paymentTiers: Map<string, string> = new Map();
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

      // Get payment tier per user (most recent payment)
      const paymentRows = await db
        .select({ userId: payments.userId, tier: payments.tier })
        .from(payments)
        .where(and(inArray(payments.userId, allGroupIds), eq(payments.status, 'succeeded')))
        .orderBy(desc(payments.paymentDate));
      for (const p of paymentRows) {
        if (p.userId && p.tier && !paymentTiers.has(p.userId)) {
          paymentTiers.set(p.userId, p.tier);
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
        tier: paymentTiers.get(u.id) || null,
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
        cvr: ytViews > 0 ? Math.round((ytClicks / ytViews) * 1000) / 10 : 0,
      },
      salesPage: {
        uniqueVisitors,
        offerDocViews,
        emailsCaptured,
      },
      counts: {
        newLeads: leadUsers.length,
        newLeadsThisMonth: newLeadsThisMonth[0]?.count || 0,
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
