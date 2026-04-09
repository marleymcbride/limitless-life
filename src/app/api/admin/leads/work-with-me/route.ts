import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { isAdminAuthenticated } from '@/lib/admin-auth';

/**
 * GET /api/admin/leads/work-with-me
 *
 * Get leads with lead_action = 'work-with-me'
 * These are the hottest prospects who clicked "Work With Me" button
 *
 * Headers:
 * - Authentication: Required via JWT cookie
 *
 * Returns:
 * - leads: array of work-with-me leads sorted by created_at DESC
 */
export async function GET(req: NextRequest) {
  try {
    // Verify admin authentication
    if (!(await isAdminAuthenticated())) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get work-with-me leads
    const leads = await db
      .select({
        id: users.id,
        email: users.email,
        firstName: users.firstName,
        lastName: users.lastName,
        sourceSite: users.sourceSite,
        leadAction: users.leadAction,
        leadTemperature: users.leadTemperature,
        firstTouchDate: users.firstTouchDate,
        lastSeen: users.lastSeen,
        createdAt: users.createdAt,
      })
      .from(users)
      .where(eq(users.leadAction, 'work-with-me'))
      .orderBy(desc(users.createdAt))
      .limit(100);

    return NextResponse.json({
      success: true,
      leads,
    });
  } catch (error) {
    console.error('Error fetching work-with-me leads:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch leads' },
      { status: 500 }
    );
  }
}
