import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { env } from '@/env.mjs';

/**
 * GET /api/admin/leads/work-with-me
 *
 * Get leads with lead_action = 'work-with-me'
 * These are the hottest prospects who clicked "Work With Me" button
 *
 * Headers:
 * - x-admin-api-key: Required for authentication
 *
 * Returns:
 * - leads: array of work-with-me leads sorted by created_at DESC
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
