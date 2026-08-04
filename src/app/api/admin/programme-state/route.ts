import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { sql } from 'drizzle-orm';
import { isAdminAuthenticated } from '@/lib/admin-auth';

// Read/write the flag live — never cache, so the toggle reflects the DB
// immediately on refresh.
export const dynamic = 'force-dynamic';

const SETTING_KEYS = ['programme_live', 'programme_live_concierge'] as const;
type SettingKey = (typeof SETTING_KEYS)[number];

function parseKey(raw: unknown): SettingKey | null {
  if (typeof raw === 'string' && (SETTING_KEYS as readonly string[]).includes(raw)) {
    return raw as SettingKey;
  }
  return null;
}

/**
 * GET /api/admin/programme-state?key=programme_live
 * Returns the current live state: { live: boolean }
 */
export async function GET(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const key = parseKey(request.nextUrl.searchParams.get('key')) || 'programme_live';

  try {
    const result = await db.execute(sql`SELECT value FROM app_settings WHERE key = ${key} LIMIT 1`);
    const value = result.rows?.[0]?.value as string | undefined;
    return NextResponse.json({ live: value !== 'false', key });
  } catch (error) {
    console.error('[programme-state] GET failed:', error);
    return NextResponse.json({ error: 'Failed to read programme state' }, { status: 500 });
  }
}

/**
 * POST /api/admin/programme-state
 * Body: { live: boolean, key?: string }
 * Upserts the programme flag.
 */
export async function POST(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { live } = body;
    const key = parseKey(body.key) || 'programme_live';

    if (typeof live !== 'boolean') {
      return NextResponse.json({ error: 'live must be a boolean' }, { status: 400 });
    }

    const value = live ? 'true' : 'false';

    // Upsert via raw query to avoid Drizzle conflict syntax issues
    await db.execute(
      sql`INSERT INTO app_settings (key, value, updated_at)
          VALUES (${key}, ${value}, now())
          ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now()`
    );

    return NextResponse.json({ success: true, live, key });
  } catch (error) {
    console.error('[programme-state] POST failed:', error);
    return NextResponse.json({ error: 'Failed to update programme state' }, { status: 500 });
  }
}
