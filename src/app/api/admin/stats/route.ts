import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users, payments, analytics } from '@/db/schema';
import { env } from '@/env.mjs';
import { gte, sql, eq } from 'drizzle-orm';

/**
 * GET /api/admin/stats
 * Fetch dashboard metrics from Railway (source of truth)
 */
export async function GET(request: NextRequest) {
  // Verify admin authentication using API key
  const apiKey = request.headers.get('x-admin-api-key');
  if (apiKey !== env.ADMIN_API_KEY) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const today = new Date();
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    // Get total visitors (all users)
    const visitorsResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(users);
    const totalVisitors = visitorsResult[0]?.count || 0;

    // Get hot leads count (score >= 70)
    const hotLeadsResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(users)
      .where(sql`${users.leadScore} >= 70`);
    const hotLeadsCount = hotLeadsResult[0]?.count || 0;

    // Get total payments for current month
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const paymentsResult = await db
      .select({ amount: payments.amount })
      .from(payments)
      .where(
        gte(payments.paymentDate, startOfMonth)
      );

    const totalPaymentsThisMonth = paymentsResult.reduce(
      (sum, p) => sum + (p.amount || 0),
      0
    );

    // Calculate conversion rate (hot leads / total visitors * 100)
    const conversionRate = totalVisitors > 0
      ? Math.round((hotLeadsCount / totalVisitors) * 100)
      : 0;

    return NextResponse.json({
      totalVisitors,
      hotLeadsCount,
      totalPaymentsThisMonth: Math.round(totalPaymentsThisMonth),
      conversionRate,
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
