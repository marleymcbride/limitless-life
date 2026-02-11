import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

/**
 * GET /api/test/events-schema
 *
 * Check if events.session_id column allows NULL or requires valid UUID
 */
export async function GET() {
  try {
    // Check events table schema
    const result = await db.execute(`
      SELECT
        column_name,
        is_nullable,
        data_type
      FROM information_schema.columns
      WHERE table_name = 'events'
        AND column_name = 'session_id'
    `);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
