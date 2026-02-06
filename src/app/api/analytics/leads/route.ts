import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users } from '@/db/schema';
import { sql, or, and } from 'drizzle-orm';
import { env } from '@/env.mjs';

/**
 * GET /api/analytics/leads
 *
 * Get all leads segmented by temperature (hot/warm/cold).
 *
 * Headers:
 * - x-admin-api-key: Required for authentication
 *
 * Returns:
 * - hot: leads with score >= 70
 * - warm: leads with score >= 40 and < 70
 * - cold: leads with score < 40
 */
export async function GET(req: NextRequest) {
  try {
    // Verify admin API key
    const apiKey = req.headers.get('x-admin-api-key');
    if (apiKey !== env.ADMIN_API_KEY) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get hot leads (>= 70)
    const hotLeads = await db
      .select()
      .from(users)
      .where(and(
        sql`${users.leadScore} >= 70`,
        sql`${users.email} IS NOT NULL`
      ))
      .orderBy(sql`${users.leadScore} DESC`)
      .limit(100);

    // Get warm leads (>= 40 and < 70)
    const warmLeads = await db
      .select()
      .from(users)
      .where(and(
        sql`${users.leadScore} >= 40`,
        sql`${users.leadScore} < 70`,
        sql`${users.email} IS NOT NULL`
      ))
      .orderBy(sql`${users.leadScore} DESC`)
      .limit(100);

    // Get cold leads (< 40)
    const coldLeads = await db
      .select()
      .from(users)
      .where(and(
        sql`${users.leadScore} < 40`,
        sql`${users.email} IS NOT NULL`
      ))
      .orderBy(sql`${users.leadScore} DESC`)
      .limit(100);

    return NextResponse.json({
      success: true,
      hot: hotLeads,
      warm: warmLeads,
      cold: coldLeads,
    });
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch leads' },
      { status: 500 }
    );
  }
}
