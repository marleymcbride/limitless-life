import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { events } from '@/db/schema';
import { sql, desc } from 'drizzle-orm';
import { env } from '@/env.mjs';

/**
 * DEBUG: Check what events exist in the database
 */
export async function GET(req: NextRequest) {
  try {
    const apiKey = req.headers.get('x-admin-api-key');
    if (apiKey !== env.ADMIN_API_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get recent events with email_submit or application_complete
    const result = await db.execute(sql`
      SELECT
        event_type,
        COUNT(*) as count,
        MAX(created_at) as last_seen
      FROM events
      WHERE event_type IN ('email_submit', 'application_complete', 'fillout_webhook')
      GROUP BY event_type
      ORDER BY count DESC
    `);

    // Also get sample of recent events
    const sampleEvents = await db.execute(sql`
      SELECT
        id,
        user_id,
        event_type,
        created_at,
        event_data
      FROM events
      ORDER BY created_at DESC
      LIMIT 5
    `);

    // Count users with emails
    const userCount = await db.execute(sql`
      SELECT COUNT(*) as count FROM users WHERE email IS NOT NULL
    `);

    return NextResponse.json({
      eventTypes: result.rows || [],
      sampleEvents: (sampleEvents.rows || []).map((row: any) => ({
        ...row,
        eventDataKeys: row.event_data ? Object.keys(row.event_data) : [],
      })),
      usersWithEmail: userCount.rows?.[0]?.count || 0,
    });
  } catch (error) {
    console.error('[Debug] Error:', error);
    return NextResponse.json(
      { error: String(error), stack: error instanceof Error ? error.stack : undefined },
      { status: 500 }
    );
  }
}
