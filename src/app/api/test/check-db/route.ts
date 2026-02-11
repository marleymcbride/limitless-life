import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

/**
 * GET /api/test/check-db
 *
 * Check database extensions and configuration
 */
export async function GET() {
  try {
    // Check if pgcrypto extension exists
    const result = await db.execute(
      "SELECT extname, default_version FROM pg_extension WHERE extname = 'pgcrypto'"
    );

    return NextResponse.json({
      pgcrypto: result,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to check database',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
