import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users, events } from '@/db/schema';
import { sql, or, and, eq, desc } from 'drizzle-orm';
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

    // Fetch most recent Fillout event for each hot lead
    const hotLeadsWithEvents = await Promise.all(
      hotLeads.map(async (lead) => {
        const recentEvents = await db
          .select()
          .from(events)
          .where(
            and(
              eq(events.userId, lead.id),
              sql`${events.eventType} IN ('email_submit', 'application_complete')`
            )
          )
          .orderBy(desc(events.createdAt))
          .limit(1);

        const latestEvent = recentEvents[0];
        return {
          ...lead,
          filloutData: latestEvent?.eventData || null,
        };
      })
    );

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

    // Fetch most recent Fillout event for warm and cold leads
    const [warmLeadsWithEvents, coldLeadsWithEvents] = await Promise.all([
      Promise.all(
        warmLeads.map(async (lead) => {
          const recentEvents = await db
            .select()
            .from(events)
            .where(
              and(
                eq(events.userId, lead.id),
                sql`${events.eventType} IN ('email_submit', 'application_complete')`
              )
            )
            .orderBy(desc(events.createdAt))
            .limit(1);

          const latestEvent = recentEvents[0];
          return {
            ...lead,
            filloutData: latestEvent?.eventData || null,
          };
        })
      ),
      Promise.all(
        coldLeads.map(async (lead) => {
          const recentEvents = await db
            .select()
            .from(events)
            .where(
              and(
                eq(events.userId, lead.id),
                sql`${events.eventType} IN ('email_submit', 'application_complete')`
              )
            )
            .orderBy(desc(events.createdAt))
            .limit(1);

          const latestEvent = recentEvents[0];
          return {
            ...lead,
            filloutData: latestEvent?.eventData || null,
          };
        })
      ),
    ]);

    return NextResponse.json({
      success: true,
      hot: hotLeadsWithEvents,
      warm: warmLeadsWithEvents,
      cold: coldLeadsWithEvents,
    });
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch leads' },
      { status: 500 }
    );
  }
}
