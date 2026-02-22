import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users, events, payments } from '@/db/schema';
import { sql, desc } from 'drizzle-orm';
import { env } from '@/env.mjs';

/**
 * GET /api/admin/applications
 *
 * Get leads who submitted Fillout forms with full journey data.
 * Shows 3-box choice, pricing plan selection, checkout status, purchase status.
 *
 * Headers:
 * - x-admin-api-key: Required for authentication
 *
 * Query params:
 * - temperature: filter by lead temperature (hot/warm/cold)
 * - interestType: filter by 3-box choice (coaching/course/tire_kicker)
 * - purchased: filter by purchase status (true/false)
 * - checkoutInitiated: filter by checkout initiation (true/false)
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

    const url = new URL(req.url);
    const temperature = url.searchParams.get('temperature');
    const purchased = url.searchParams.get('purchased');
    const checkoutInitiated = url.searchParams.get('checkoutInitiated');

    // Build complex query with subqueries for journey data
    const query = sql`
      SELECT
        u.id,
        u.email,
        u.first_name as "firstName",
        u.last_name as "lastName",
        u.lead_score as "leadScore",
        u.lead_temperature as "leadTemperature",
        u.tier_interest as "tierInterest",
        u.last_seen as "lastSeen",
        u.created_at as "createdAt",

        -- VSL data
        COALESCE(
          MAX(
            CASE WHEN e.event_type = 'vsl_milestone'
              THEN CAST(e.event_data->>'percent' AS INTEGER)
              ELSE 0
            END
          ),
          0
        ) as "vslCompletionPercent",

        EXISTS(
          SELECT 1 FROM events e2
          WHERE e2.user_id = u.id AND e2.event_type = 'vsl_start'
        ) as "vslWatched",

        -- Interest type from 3-box choice
        (
          SELECT e3.event_data->>'interestType'
          FROM events e3
          WHERE e3.user_id = u.id
            AND e3.event_type IN ('coaching_interest', 'course_interest', 'tire_kicker_interest')
          ORDER BY e3.created_at DESC
          LIMIT 1
        ) as "interestType",

        -- Pricing plan selected
        (
          SELECT e4.event_data->>'plan'
          FROM events e4
          WHERE e4.user_id = u.id AND e4.event_type = 'pricing_plan_selected'
          ORDER BY e4.created_at DESC
          LIMIT 1
        ) as "pricingPlanSelected",

        -- Checkout initiated
        EXISTS(
          SELECT 1 FROM events e5
          WHERE e5.user_id = u.id AND e5.event_type = 'checkout_initiated'
        ) as "checkoutInitiated",

        -- Purchased
        EXISTS(
          SELECT 1 FROM payments p
          WHERE p.user_id = u.id AND p.status = 'succeeded'
        ) as "purchased",

        -- Fillout data
        (
          SELECT e6.event_data
          FROM events e6
          WHERE e6.user_id = u.id
            AND e6.event_type IN ('email_submit', 'application_complete')
          ORDER BY e6.created_at DESC
          LIMIT 1
        ) as "filloutData"

      FROM users u
      LEFT JOIN events e ON e.user_id = u.id
      WHERE u.email IS NOT NULL
        AND EXISTS (
          SELECT 1 FROM events e7
          WHERE e7.user_id = u.id
            AND e7.event_type IN ('email_submit', 'application_complete')
        )
        ${temperature ? sql`AND u.lead_temperature = ${temperature}` : sql``}
        ${purchased === 'true' ? sql`AND EXISTS (SELECT 1 FROM payments p2 WHERE p2.user_id = u.id AND p2.status = 'succeeded')` : sql``}
        ${purchased === 'false' ? sql`AND NOT EXISTS (SELECT 1 FROM payments p3 WHERE p3.user_id = u.id AND p3.status = 'succeeded')` : sql``}
        ${checkoutInitiated === 'true' ? sql`AND EXISTS (SELECT 1 FROM events e8 WHERE e8.user_id = u.id AND e8.event_type = 'checkout_initiated')` : sql``}
      GROUP BY u.id, u.email, u.first_name, u.last_name, u.lead_score, u.lead_temperature, u.tier_interest, u.last_seen, u.created_at
      ORDER BY u.lead_score DESC
      LIMIT 100
    `;

    const result = await db.execute(query);

    // Transform results
    const applications = (result.rows || []).map((row: any) => {
      const filloutData = row.filloutData || {};

      // Map interest type to display value
      let interestDisplay = null;
      if (row.interestType) {
        switch (row.interestType) {
          case 'coaching':
            interestDisplay = 'Coaching';
            break;
          case 'course':
            interestDisplay = 'Course';
            break;
          case 'tire_kicker':
            interestDisplay = 'Self-paced';
            break;
          default:
            interestDisplay = row.interestType;
        }
      }

      return {
        id: row.id,
        email: row.email,
        firstName: row.firstName,
        lastName: row.lastName,
        leadScore: row.leadScore,
        leadTemperature: row.leadTemperature,
        tierInterest: row.tierInterest,
        vslWatched: row.vslWatched,
        vslCompletionPercent: row.vslCompletionPercent,
        interestType: interestDisplay,
        pricingPlanSelected: row.pricingPlanSelected,
        checkoutInitiated: row.checkoutInitiated,
        purchased: row.purchased,
        problemsToSolve: filloutData.problemsToSolve || null,
        desiredResult: filloutData.desiredResult || null,
        lastSeen: row.lastSeen,
        createdAt: row.createdAt,
      };
    });

    return NextResponse.json({
      success: true,
      applications,
    });
  } catch (error) {
    console.error('[Applications] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch applications' },
      { status: 500 }
    );
  }
}
