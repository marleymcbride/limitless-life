import { cache } from 'react';
import { db } from '@/lib/db';
import { appSettings } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * Programme live state — server-side, cached per request.
 *
 * Reads the `programme_live` flag from app_settings. Defaults to LIVE (true)
 * so a DB hiccup never kills the sales page, and so nothing changes until
 * the flag is explicitly flipped to 'false' in the admin dashboard.
 */
export const isProgrammeLive = cache(async (): Promise<boolean> => {
  try {
    const [row] = await db
      .select({ value: appSettings.value })
      .from(appSettings)
      .where(eq(appSettings.key, 'programme_live'))
      .limit(1);

    return row?.value !== 'false';
  } catch (error) {
    console.error('[programme-state] Failed to read programme_live, defaulting to live:', error);
    return true;
  }
});
