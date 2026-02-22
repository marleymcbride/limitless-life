import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users, events } from '@/db/schema';
import { eq, desc, sql } from 'drizzle-orm';
import { env } from '@/env.mjs';

/**
 * GET /api/admin/form-submissions
 *
 * Get all Fillout form submissions as spreadsheet-style data.
 * One row per email (most recent submission only).
 *
 * Headers:
 * - x-admin-api-key: Required for authentication
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

    // Parse query params for pagination
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const pageSize = parseInt(url.searchParams.get('pageSize') || '50');
    const offset = (page - 1) * pageSize;

    // Get users who have submitted Fillout forms
    const allSubmissions = await db.execute(sql`
      SELECT
        u.id,
        u.email,
        u.first_name as "firstName",
        u.last_name as "lastName",
        u.lead_score as "leadScore",
        u.tier_interest as "tierInterest",
        (
          SELECT MAX(created_at)
          FROM events
          WHERE user_id = u.id
            AND event_type IN ('email_submit', 'application_complete')
        ) as "submittedAt",
        (
          SELECT event_data
          FROM events
          WHERE user_id = u.id
            AND event_type IN ('email_submit', 'application_complete')
          ORDER BY created_at DESC
          LIMIT 1
        ) as "filloutData"
      FROM users u
      WHERE u.email IS NOT NULL
        AND EXISTS (
          SELECT 1
          FROM events
          WHERE user_id = u.id
            AND event_type IN ('email_submit', 'application_complete')
        )
      ORDER BY "submittedAt" DESC NULLS LAST
      LIMIT ${pageSize}
      OFFSET ${offset}
    `);

    // Get total count
    const countResult = await db.execute(sql`
      SELECT COUNT(DISTINCT u.id) as count
      FROM users u
      WHERE u.email IS NOT NULL
        AND EXISTS (
          SELECT 1
          FROM events
          WHERE user_id = u.id
            AND event_type IN ('email_submit', 'application_complete')
        )
    `);

    // Handle empty count results
    const total = countResult.rows && countResult.rows[0]
      ? parseInt(countResult.rows[0].count || '0')
      : 0;

    // Transform results
    const submissions = (allSubmissions.rows || []).map((row: any) => {
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
