import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users, payments, sessions } from '@/db/schema';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import { desc, eq, sql, and } from 'drizzle-orm';

/**
 * GET /api/admin/traffic-sources
 *
 * Get traffic source breakdown with conversion metrics
 *
 * Headers:
 * - Authentication: Required via JWT cookie
 *
 * Returns:
 * - Array of traffic sources with visitor, session, and conversion metrics
 */
export async function GET(request: NextRequest) {
  // Verify admin authentication
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    // Get all sessions with UTM data
    const allSessions = await db
      .select({
        userId: sessions.userId,
        utmSource: sessions.utmSource,
        utmCampaign: sessions.utmCampaign,
      })
      .from(sessions)
      .where(sql`${sessions.utmSource} IS NOT NULL`);

    // Get all payments to count conversions
    const allPayments = await db
      .select({
        userId: payments.userId,
      })
      .from(payments)
      .where(eq(payments.status, 'succeeded'));

    const payingUserIds = new Set(allPayments.map(p => p.userId));

    // Group by source
    const sourceMap = new Map<string, {
      source: string;
      visitors: number;
      sessions: number;
      uniqueVisitors: number;
      conversions: number;
      conversionRate: number;
    }>();

    allSessions.forEach((session) => {
      const source = session.utmSource || '(none)';
      const campaign = session.utmCampaign || '(none)';

      if (!sourceMap.has(source)) {
        sourceMap.set(source, {
          source,
          visitors: 0,
          sessions: 0,
          uniqueVisitors: 0,
          conversions: 0,
          conversionRate: 0,
        });
      }

      const stats = sourceMap.get(source)!;
      stats.sessions++;
      stats.uniqueVisitors++; // Each session is a unique visitor in this context

      // Check if this user converted
      if (payingUserIds.has(session.userId)) {
        stats.conversions++;
      }
    });

    // Calculate totals and conversion rates
    sourceMap.forEach((stats) => {
      // Count total visitors from users table
      stats.visitors = stats.uniqueVisitors;
      stats.conversionRate = stats.uniqueVisitors > 0
        ? Math.round((stats.conversions / stats.uniqueVisitors) * 100)
        : 0;
    });

    // Convert to array and sort by conversion rate descending
    const stats = Array.from(sourceMap.values())
      .sort((a, b) => b.conversionRate - a.conversionRate);

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching traffic sources:', error);
    return NextResponse.json(
      { error: 'Failed to fetch traffic sources', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
