import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users, payments, events, sessions } from '@/db/schema';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import { gte, sql, and, desc, eq, inArray, notInArray } from 'drizzle-orm';

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

    // Revenue
    const [revenueMonth, revenueToday] = await Promise.all([
      db.select({ value: sql<number>`COALESCE(SUM(${payments.amount}), 0)` }).from(payments).where(and(eq(payments.status, 'succeeded'), gte(payments.createdAt, startOfMonth))),
      db.select({ value: sql<number>`COALESCE(SUM(${payments.amount}), 0)` }).from(payments).where(and(eq(payments.status, 'succeeded'), gte(payments.createdAt, startOfToday))),
    ]);

    // Get user IDs by event type
    const usersWithEvent = async (eventType: string) => {
      const rows = await db
        .select({ userId: events.userId })
        .from(events)
        .where(eq(events.eventType, eventType as any))
        .groupBy(events.userId);
      return new Set(rows.map(r => r.userId));
    };

    const [depositUserIds, paymentUserIds] = await Promise.all([
      usersWithEvent('concierge_deposit_paid'),
      usersWithEvent('payment_complete'),
    ]);

    const paidIds = new Set([...depositUserIds, ...paymentUserIds]);

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
    const readyToJoinUsers = allUsers.filter(u => depositUserIds.has(u.id) && !paymentUserIds.has(u.id));
    const clientUsers = allUsers.filter(u => paymentUserIds.has(u.id));
    const hotLeadUsers = allUsers.filter(u => u.leadScore >= 70 && !paidIds.has(u.id)).slice(0, 10);

    // Batch-fetch latest event for all users in all groups
    const allGroupIds = [...new Set([
      ...leadUsers.map(u => u.id),
      ...readyToJoinUsers.map(u => u.id),
      ...clientUsers.map(u => u.id),
      ...hotLeadUsers.map(u => u.id),
    ])];

    const latestEvents: { userId: string; eventType: string; createdAt: Date }[] = [];
    if (allGroupIds.length > 0) {
      // Subquery: get max created_at per user
      const subquery = db
        .select({
          userId: events.userId,
          maxCreated: sql<Date>`MAX(${events.createdAt})`.as('max_created'),
        })
        .from(events)
        .where(inArray(events.userId, allGroupIds))
        .groupBy(events.userId)
        .as('sub');

      const rows = await db
        .select({
          userId: events.userId,
          eventType: events.eventType,
          createdAt: events.createdAt,
        })
        .from(events)
        .innerJoin(subquery, and(
          eq(events.userId, subquery.userId),
          eq(events.createdAt, subquery.maxCreated),
        ))
        .where(inArray(events.userId, allGroupIds));

      latestEvents.push(...rows);
    }

    const latestEventMap = new Map<string, { eventType: string; createdAt: Date }>();
    for (const e of latestEvents) {
      if (!latestEventMap.has(e.userId)) {
        latestEventMap.set(e.userId, { eventType: e.eventType, createdAt: e.createdAt });
      }
    }

    const enrich = (u: LeadRow) => ({
      id: u.id,
      email: u.email,
      firstName: u.firstName,
      lastName: u.lastName,
      leadScore: u.leadScore,
      leadTemperature: u.leadTemperature,
      tierInterest: u.tierInterest,
      latestEvent: latestEventMap.get(u.id)?.eventType || null,
      latestEventAt: latestEventMap.get(u.id)?.createdAt?.toISOString() || null,
    });

    return NextResponse.json({
      revenue: {
        month: Math.round((revenueMonth[0]?.value || 0)),
        today: Math.round((revenueToday[0]?.value || 0)),
      },
      counts: {
        newLeads: leadUsers.length,
        newCustomers: readyToJoinUsers.length + clientUsers.length,
        readyToJoin: readyToJoinUsers.length,
        newClients: clientUsers.length,
        hotLeads: hotLeadUsers.length,
      },
      groups: {
        newLeads: leadUsers.slice(0, 10).map(enrich),
        readyToJoin: readyToJoinUsers.slice(0, 10).map(enrich),
        newClients: clientUsers.slice(0, 10).map(enrich),
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
