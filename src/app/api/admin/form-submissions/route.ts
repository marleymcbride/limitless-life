import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users, events } from '@/db/schema';
import { eq, desc, sql, and } from 'drizzle-orm';
import { isAdminAuthenticated } from '@/lib/admin-auth';

/**
 * GET /api/admin/form-submissions
 *
 * Get all Fillout form submissions as spreadsheet-style data.
 * One row per email (most recent submission only).
 *
 * Headers:
 * - Authentication: Required via JWT cookie
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

    // Parse query params for pagination
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const pageSize = parseInt(url.searchParams.get('pageSize') || '50');
    const offset = (page - 1) * pageSize;

    // Get users who have submitted Fillout forms
    const allUsers = await db
      .select()
      .from(users)
      .where(sql`${users.email} IS NOT NULL`)
      .orderBy(desc(users.createdAt))
      .limit(1000);

    // Fetch events for each user and filter those with form submissions
    const usersWithSubmissions = await Promise.all(
      allUsers.map(async (user) => {
        const userEvents = await db
          .select()
          .from(events)
          .where(
            and(
              eq(events.userId, user.id),
              sql`${events.eventType} IN ('email_submit', 'application_complete')`
            )
          )
          .orderBy(desc(events.createdAt))
          .limit(1);

        if (userEvents.length === 0) {
          return null;
        }

        const latestEvent = userEvents[0];
        return {
          ...user,
          submittedAt: latestEvent.createdAt,
          filloutData: latestEvent.eventData || {},
        };
      })
    );

    // Filter out nulls and sort by submitted date
    const submissions = usersWithSubmissions
      .filter((u): u is NonNullable<typeof u> => u !== null)
      .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
      .slice(offset, offset + pageSize)
      .map((row) => {
        const filloutData = row.filloutData || {};
        return {
          id: row.id,
          email: row.email,
          firstName: row.firstName,
          lastName: row.lastName,
          leadScore: row.leadScore,
          tierInterest: row.tierInterest,
          submittedAt: row.submittedAt,
          fullName: filloutData.fullName || '',
          lookingFor: filloutData.lookingFor || null,
          howToGetHere: filloutData.howToGetHere || null,
          currentSituation: filloutData.currentSituation || null,
          problemsToSolve: filloutData.problemsToSolve || null,
          whatWellInstall: filloutData.whatWellInstall || null,
          desiredResult: filloutData.desiredResult || null,
          filloutScore: filloutData.filloutScore || null,
        };
      });

    // Get total count
    const total = usersWithSubmissions.filter((u) => u !== null).length;

    return NextResponse.json({
      success: true,
      submissions,
      pagination: {
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
    });
  } catch (error) {
    console.error('[Form Submissions] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch submissions' },
      { status: 500 }
    );
  }
}
