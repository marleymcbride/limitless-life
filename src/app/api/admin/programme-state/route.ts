import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { sql } from 'drizzle-orm';
import { isAdminAuthenticated } from '@/lib/admin-auth';

/**
 * GET /api/admin/programme-state
 * Returns the current programme live state: { live: boolean }
 */
export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const result = await db.execute(sql`SELECT value FROM app_settings WHERE key = 'programme_live' LIMIT 1`);
    const value = result.rows?.[0]?.value as string | undefined;
    return NextResponse.json({ live: value !== 'false' });
  } catch (error) {
    console.error('[programme-state] GET failed:', error);
    return NextResponse.json({ error: 'Failed to read programme state' }, { status: 500 });
  }
}

/**
 * POST /api/admin/programme-state
 * Body: { live: boolean }
 * Upserts the programme_live flag.
 */
export async function POST(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { live } = await request.json();
    if (typeof live !== 'boolean') {
      return NextResponse.json({ error: 'live must be a boolean' }, { status: 400 });
    }

    const value = live ? 'true' : 'false';

    // Upsert via raw query to avoid Drizzle conflict syntax issues
    await db.execute(
      sql`INSERT INTO app_settings (key, value, updated_at)
          VALUES ('programme_live', ${value}, now())
          ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now()`
    );

    return NextResponse.json({ success: true, live });
  } catch (error) {
    console.error('[programme-state] POST failed:', error);
    return NextResponse.json({ error: 'Failed to update programme state' }, { status: 500 });
  }
}
