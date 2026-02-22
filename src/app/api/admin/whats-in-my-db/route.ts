import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { events } from '@/db/schema';
import { desc } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  try {
    // Get all unique event types using raw SQL
    const eventTypesResult = await db.execute(`
      SELECT event_type, COUNT(*) as count
      FROM events
      GROUP BY event_type
      ORDER BY count DESC
    `);

    // Get a sample of recent events using Drizzle
    const sampleEvents = await db
      .select()
      .from(events)
      .orderBy(desc(events.createdAt))
      .limit(10);

    return NextResponse.json({
      eventTypes: eventTypesResult.rows || [],
      sampleEvents: sampleEvents.map((row: any) => ({
        id: row.id,
        eventType: row.eventType,
        createdAt: row.createdAt,
        eventDataKeys: row.eventData ? Object.keys(row.eventData) : [],
      })),
    });
  } catch (error) {
    return NextResponse.json(
      { error: String(error), details: error instanceof Error ? error.message : undefined },
      { status: 500 }
    );
  }
}
