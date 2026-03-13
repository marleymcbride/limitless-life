import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { waitlistSignups } from '@/db/schema';
import { env } from '@/env.mjs';
import { desc, eq, and, sql } from 'drizzle-orm';

/**
 * GET /api/admin/waitlist
 * Fetch all waitlist signups with optional filtering
 * Query params:
 *   - choice: yes|maybe|no (filter by choice)
 *   - status: waitlist|applied|accepted|rejected|withdrawn (filter by status)
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
    const { searchParams } = new URL(request.url);
    const choiceFilter = searchParams.get('choice');
    const statusFilter = searchParams.get('status');

    // Build query conditions
    const conditions = [];

    if (choiceFilter && ['yes', 'maybe', 'no'].includes(choiceFilter)) {
      conditions.push(eq(waitlistSignups.choice, choiceFilter as 'yes' | 'maybe' | 'no'));
    }

    if (statusFilter) {
      conditions.push(eq(waitlistSignups.status, statusFilter));
    }

    // Fetch waitlist signups
    const query = db
      .select()
      .from(waitlistSignups)
      .orderBy(desc(waitlistSignups.createdAt));

    const signups = conditions.length > 0
      ? await query.where(and(...conditions))
      : await query;

    // Get counts for metrics
    const totalResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(waitlistSignups);

    const total = totalResult[0]?.count || 0;

    // Get filtered count
    const filteredResult = conditions.length > 0
      ? await db
          .select({ count: sql<number>`count(*)` })
          .from(waitlistSignups)
          .where(and(...conditions))
      : totalResult;

    const filtered = filteredResult[0]?.count || 0;

    return NextResponse.json({
      signups,
      total,
      filtered,
    });
  } catch (error) {
    console.error('[API] Error fetching waitlist signups:', error);
    return NextResponse.json(
      { error: 'Failed to fetch waitlist signups' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/waitlist
 * Delete all waitlist signups (useful for test data cleanup)
 * Query params:
 *   - email: optional - delete only specific email
 */
export async function DELETE(request: NextRequest) {
  // Verify admin authentication using API key
  const apiKey = request.headers.get('x-admin-api-key');
  if (apiKey !== env.ADMIN_API_KEY) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (email) {
      // Delete specific signup
      await db
        .delete(waitlistSignups)
        .where(eq(waitlistSignups.email, email));

      return NextResponse.json({
        success: true,
        message: `Deleted waitlist signup for ${email}`,
      });
    } else {
      // Delete all signups (use with caution)
      await db.delete(waitlistSignups);

      return NextResponse.json({
        success: true,
        message: 'Deleted all waitlist signups',
      });
    }
  } catch (error) {
    console.error('[API] Error deleting waitlist signups:', error);
    return NextResponse.json(
      { error: 'Failed to delete waitlist signups' },
      { status: 500 }
    );
  }
}
