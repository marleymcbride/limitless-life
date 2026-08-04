import { cache } from 'react';
import { db } from '@/lib/db';
import { appSettings } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * Read a boolean programme flag from app_settings.
 *
 * Defaults to LIVE (true) so a DB hiccup never kills the sales page, and so
 * nothing changes until the flag is explicitly flipped to 'false' in the
 * admin dashboard.
 */
async function readProgrammeFlag(key: string): Promise<boolean> {
  try {
    const [row] = await db
      .select({ value: appSettings.value })
      .from(appSettings)
      .where(eq(appSettings.key, key))
      .limit(1);

    return row?.value !== 'false';
  } catch (error) {
    console.error(`[programme-state] Failed to read ${key}, defaulting to live:`, error);
    return true;
  }
}

/** Lifestyle Athlete Cohort (offer docs) — is the programme live? */
export const isProgrammeLive = cache(async (): Promise<boolean> =>
  readProgrammeFlag('programme_live')
);

/** Limitless Concierge — is the programme live? */
export const isConciergeLive = cache(async (): Promise<boolean> =>
  readProgrammeFlag('programme_live_concierge')
);
