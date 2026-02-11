import { db } from './db';
import { sessions } from '../db/schema';
import { eq } from 'drizzle-orm';

const SESSION_COOKIE = 'll_session';
const COOKIE_MAX_AGE = 30 * 24 * 60 * 60; // 30 days

export async function getSessionId(cookieStore: any) {
  return cookieStore?.get(SESSION_COOKIE)?.value;
}

export async function createSession(data: {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  referrer?: string;
  deviceType?: 'mobile' | 'tablet' | 'desktop';
}) {
  const id = crypto.randomUUID();

  await db.insert(sessions).values({
    id,
    firstSeen: new Date(),
    lastSeen: new Date(),
    utmSource: data.utmSource,
    utmMedium: data.utmMedium,
    utmCampaign: data.utmCampaign,
    referrer: data.referrer,
    deviceType: data.deviceType,
  });

  // Return session ID - caller must set cookie
  return id;
}

export async function getOrCreateSession(data: {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  referrer?: string;
  deviceType?: 'mobile' | 'tablet' | 'desktop';
}, cookieStore: any) {
  const existing = await getSessionId(cookieStore);

  if (existing) {
    await db
      .update(sessions)
      .set({ lastSeen: new Date() })
      .where(eq(sessions.id, existing));

    // Return session with userId for frontend tracking
    const session = await db
      .select()
      .from(sessions)
      .where(eq(sessions.id, existing))
      .limit(1);

    return { id: existing, userId: session[0]?.userId };
  }

  const newSessionId = await createSession(data);
  return { id: newSessionId, userId: null };
}
