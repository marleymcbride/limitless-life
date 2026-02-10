import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin-auth";
import { db } from "@/lib/db";
import { payments, users, events } from "@/db/schema";
import { eq, and, gte, lte, desc, sql } from "drizzle-orm";

/**
 * GET /api/admin/analytics/payments?startDate=&endDate=&limit=&offset=
 * Returns all payments with customer details and revenue metrics
 */
export async function GET(request: NextRequest) {
  // Check admin authentication
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const searchParams = request.nextUrl.searchParams;
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    // Input validation: limit and offset with reasonable bounds
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '50')));
    const offset = Math.max(0, parseInt(searchParams.get('offset') || '0'));

    // Build date filter with validation
    let dateFilter = undefined;
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      // Validate dates are valid
      if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
        dateFilter = and(
          gte(payments.createdAt, start),
          lte(payments.createdAt, end)
        );
      }
    }

    // Get payments with user details
    const paymentsData = await db
      .select({
        id: payments.id,
        userId: payments.userId,
        stripePaymentIntentId: payments.stripePaymentIntentId,
        amount: payments.amount,
        currency: payments.currency,
        status: payments.status,
        paymentDate: payments.createdAt,
        userEmail: users.email,
        userFirstName: users.firstName,
        userLastName: users.lastName,
        userLeadScore: users.leadScore,
      })
      .from(payments)
      .leftJoin(users, eq(payments.userId, users.id))
      .where(dateFilter)
      .orderBy(desc(payments.createdAt))
      .limit(limit)
      .offset(offset);

    // Get tier information from events (payment_complete events contain tier data)
    // Only fetch for the actual user IDs from our payments to avoid unnecessary data
    const userIds = [...new Set(paymentsData.map((p) => p.userId))];

    const tierData = userIds.length > 0 ? await db
      .select({
        paymentUserId: events.userId,
        eventData: events.eventData,
        createdAt: events.createdAt,
      })
      .from(events)
      .where(
        and(
          eq(events.eventType, 'payment_complete'),
          dateFilter ?
            and(
              eq(events.eventType, 'payment_complete'),
              gte(events.createdAt, new Date(startDate as string)),
              lte(events.createdAt, new Date(endDate as string))
            ) :
            undefined
        )
      )
      .orderBy(desc(events.createdAt)) : [];

    // Map tier data to payments by userId (closest timestamp match)
    const tierMap = new Map<string, string>();
    for (const payment of paymentsData) {
      if (payment.userId) {
        // Find the closest payment_complete event for this user
        const matchingEvent = tierData.find(
          (event) => event.paymentUserId === payment.userId
        );
        if (matchingEvent?.eventData?.tier) {
          tierMap.set(payment.id, matchingEvent.eventData.tier);
        }
      }
    }

    // Enrich payments with tier information
    const enrichedPayments = paymentsData.map((payment) => {
      return {
        ...payment,
        tier: tierMap.get(payment.id) || null,
      };
    });

    // Get total revenue, payment count, and unique customer count using SQL aggregation
    const summaryResult = await db
      .select({
        totalRevenue: sql<number>`COALESCE(sum(${payments.amount}), 0)`,
        totalPayments: sql<number>`count(*)`,
        uniqueCustomers: sql<number>`count(distinct ${payments.userId})`,
      })
      .from(payments)
      .where(
        and(
          eq(payments.status, 'succeeded'),
          dateFilter
        )
      );

    const { totalRevenue, totalPayments, uniqueCustomers } = summaryResult[0] || {
      totalRevenue: 0,
      totalPayments: 0,
      uniqueCustomers: 0,
    };

    // Calculate revenue by tier from our enriched payments
    const revenueByTier: Record<string, { count: number; revenue: number }> = {};
    for (const payment of enrichedPayments) {
      if (payment.status === 'succeeded') {
        const tier = payment.tier || 'Unknown';
        if (!revenueByTier[tier]) {
          revenueByTier[tier] = { count: 0, revenue: 0 };
        }
        revenueByTier[tier].count += 1;
        revenueByTier[tier].revenue += payment.amount || 0;
      }
    }

    // Get total count for pagination using SQL aggregation
    const countResult = await db
      .select({ totalCount: sql<number>`count(*)` })
      .from(payments)
      .where(dateFilter);

    const totalCount = countResult[0]?.totalCount || 0;

    return NextResponse.json({
      success: true,
      payments: enrichedPayments,
      summary: {
        totalRevenue,
        totalPayments,
        uniqueCustomers,
        revenueByTier,
        currency: 'USD',
      },
      pagination: {
        total: totalCount,
        limit,
        offset,
        hasMore: offset + limit < totalCount,
      },
    });

  } catch (error) {
    console.error("Payments analytics error:", error);
    return NextResponse.json(
      { error: "Failed to fetch payments data" },
      { status: 500 }
    );
  }
}
