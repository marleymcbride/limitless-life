import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { events } from '@/db/schema';
import { sql, desc } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  try {
    // Get all unique event types
    const eventTypes = await db.execute(sql`
      SELECT event_type, COUNT(*) as count
      FROM events
      GROUP BY event_type
      ORDER BY count DESC
    `);

    // Get a sample of recent events with their data
    const sampleEvents = await db.execute(sql`
      SELECT
        id,
        event_type,
        created_at,
        event_data
      FROM events
      ORDER BY created_at DESC
      LIMIT 10
    `);

    return NextResponse.json({
      eventTypes: eventTypes.rows,
      sampleEvents: sampleEvents.rows.map((row: any) => ({
        eventType: row.event_type,
        createdAt: row.created_at,
        eventDataKeys: row.event_data ? Object.keys(row.event_data) : [],
      })),
    });
  } catch (error) {
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    );
  }
}
