import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users, payments, events, sessions } from '@/db/schema';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import { gte, sql, and, desc, eq, lte, inArray, notInArray, isNull } from 'drizzle-orm';

/**
 * GET /api/admin/stats
 * Fetch dashboard metrics segmented by funnel stage:
 * - New customers: people who entered the funnel (email submit or user created)
 * - Ready to join: paid deposit (concierge_deposit_paid)
 * - New clients: paid in full (payment_complete)
 * - Hot leads: score >= 70, haven't paid yet
 */
export async function GET(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    // Helper: get user IDs that have a specific event type
    const usersWithEvent = async (eventType: string) => {
      const rows = await db
        .select({ userId: events.userId })
        .from(events)
        .where(eq(events.eventType, eventType as any))
        .groupBy(events.userId);
      return new Set(rows.map(r => r.userId));
    };

    const [depositUserIds, paymentUserIds, allUserIdsSet] = await Promise.all([
      usersWithEvent('concierge_deposit_paid'),
      usersWithEvent('payment_complete'),
      usersWithEvent('email_submit'),
    ]);

    // Also get all users who were created (even without events)
    const allDbUsers = await db
      .select({ id: users.id, email: users.email })
      .from(users)
      .where(sql`${users.email} IS NOT NULL`);

    // === 1. NEW CUSTOMERS (entered funnel, not deposit, not full payment) ===
    const newCustomerUsers = allDbUsers.filter(u =>
      !depositUserIds.has(u.id) && !paymentUserIds.has(u.id)
    );

    // === 2. READY TO JOIN (paid deposit, not full payment) ===
    const readyToJoinUsers = allDbUsers.filter(u =>
      depositUserIds.has(u.id) && !paymentUserIds.has(u.id)
    );

    // === 3. NEW CLIENTS (paid in full) ===
    const newClientUsers = allDbUsers.filter(u =>
      paymentUserIds.has(u.id)
    );

    // === 4. HOT LEADS (score >= 70, not paid anything) ===
    const paidIds = new Set([...depositUserIds, ...paymentUserIds]);
    const hotLeadRows = await db
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
      .where(and(
        sql`${users.leadScore} >= 70`,
        sql`${users.email} IS NOT NULL`,
        notInArray(users.id, [...paidIds])
      ))
      .orderBy(desc(users.leadScore))
      .limit(10);

    // Get latest events for hot leads
    const hotLeadIds = hotLeadRows.map(l => l.id);
    let hotLeadEvents: { userId: string; eventType: string; createdAt: Date }[] = [];
    if (hotLeadIds.length > 0) {
      const relevantTypes = ['pricing_plan_selected', 'checkout_initiated', 'stripe_checkout_initiated', 'pricing_view'];
      hotLeadEvents = await db
        .select({
          userId: events.userId,
          eventType: events.eventType,
          createdAt: events.createdAt,
        })
        .from(events)
        .where(and(
          inArray(events.userId, hotLeadIds),
          inArray(events.eventType, relevantTypes as any),
        ))
        .orderBy(desc(events.createdAt));
    }

    // Get latest event per hot lead
    const latestEventPerLead = new Map<string, { eventType: string; createdAt: Date }>();
    for (const e of hotLeadEvents) {
      if (!latestEventPerLead.has(e.userId)) {
        latestEventPerLead.set(e.userId, { eventType: e.eventType, createdAt: e.createdAt });
      }
    }

    const enrichedHotLeads = hotLeadRows.map(lead => {
      const latest = latestEventPerLead.get(lead.id);
      return {
        ...lead,
        latestEvent: latest?.eventType || null,
        latestEventAt: latest?.createdAt?.toISOString() || null,
      };
    });

    // Revenue
    const [revenueMonth, revenueToday] = await Promise.all([
      db.select({ value: sql<number>`COALESCE(SUM(${payments.amount}), 0)` }).from(payments).where(and(eq(payments.status, 'succeeded'), gte(payments.createdAt, startOfMonth))),
      db.select({ value: sql<number>`COALESCE(SUM(${payments.amount}), 0)` }).from(payments).where(and(eq(payments.status, 'succeeded'), gte(payments.createdAt, startOfToday))),
    ]);

    return NextResponse.json({
      revenue: {
        month: Math.round((revenueMonth[0]?.value || 0)),
        today: Math.round((revenueToday[0]?.value || 0)),
      },
      counts: {
        newCustomers: newCustomerUsers.length,
        readyToJoin: readyToJoinUsers.length,
        newClients: newClientUsers.length,
        hotLeads: enrichedHotLeads.length,
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
