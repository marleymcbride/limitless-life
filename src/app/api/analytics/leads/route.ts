import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users, events } from '@/db/schema';
import { sql, and, desc } from 'drizzle-orm';
import { isAdminAuthenticated } from '@/lib/admin-auth';

/**
 * GET /api/analytics/leads
 *
 * Get all leads segmented by temperature (hot/warm/cold).
 *
 * Authentication: Uses secure JWT cookie authentication
 * (No API key needed - client components can call this directly after logging in)
 *
 * Returns:
 * - hot: leads with score >= 70
 * - warm: leads with score >= 40 and < 70
 * - cold: leads with score < 40
 */
export async function GET(req: NextRequest) {
  // Verify admin authentication using JWT cookie
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    // Get hot leads (>= 70)
    const hotLeads = await db
      .select()
      .from(users)
      .where(and(
        sql`${users.leadScore} >= 70`,
        sql`${users.email} IS NOT NULL`
      ))
      .orderBy(desc(users.leadScore))
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
      .orderBy(desc(users.leadScore))
      .limit(100);

    // Get cold leads (< 40)
    const coldLeads = await db
      .select()
      .from(users)
      .where(and(
        sql`${users.leadScore} < 40`,
        sql`${users.email} IS NOT NULL`
      ))
      .orderBy(desc(users.leadScore))
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
