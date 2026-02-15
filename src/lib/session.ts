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
  utmContent?: string;
  utmTerm?: string;
  referrer?: string;
  deviceType?: 'mobile' | 'tablet' | 'desktop';
  browser?: string;
  ipAddress?: string;
  countryCode?: string;
}) {
  const id = crypto.randomUUID();

  await db.insert(sessions).values({
    id,
    firstSeen: new Date(),
    lastSeen: new Date(),
    utmSource: data.utmSource,
    utmMedium: data.utmMedium,
    utmCampaign: data.utmCampaign,
    utmContent: data.utmContent,
    utmTerm: data.utmTerm,
    referrer: data.referrer,
    deviceType: data.deviceType,
    browser: data.browser,
    ipAddress: data.ipAddress,
    countryCode: data.countryCode,
  });

  // Return session ID - caller must set cookie
  return id;
}

export async function getOrCreateSession(data: {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  referrer?: string;
  deviceType?: 'mobile' | 'tablet' | 'desktop';
  browser?: string;
  ipAddress?: string;
  countryCode?: string;
}, cookieStore: any) {
  const existing = await getSessionId(cookieStore);

  if (existing) {
    // Check if we have new UTM data to update
    const updateData: any = { lastSeen: new Date() };

    // Only update UTM fields if they're not already set AND new values are provided
    const session = await db
      .select()
      .from(sessions)
      .where(eq(sessions.id, existing))
      .limit(1);

    if (session.length > 0) {
      const s = session[0];
      if (!s.utmSource && data.utmSource) updateData.utmSource = data.utmSource;
      if (!s.utmMedium && data.utmMedium) updateData.utmMedium = data.utmMedium;
      if (!s.utmCampaign && data.utmCampaign) updateData.utmCampaign = data.utmCampaign;
      if (!s.utmContent && data.utmContent) updateData.utmContent = data.utmContent;
      if (!s.utmTerm && data.utmTerm) updateData.utmTerm = data.utmTerm;
      if (!s.referrer && data.referrer) updateData.referrer = data.referrer;
      if (!s.browser && data.browser) updateData.browser = data.browser;
      if (!s.ipAddress && data.ipAddress) updateData.ipAddress = data.ipAddress;
      if (!s.countryCode && data.countryCode) updateData.countryCode = data.countryCode;
    }

    await db
      .update(sessions)
      .set(updateData)
      .where(eq(sessions.id, existing));

    return { id: existing, userId: session[0]?.userId };
  }

  const newSessionId = await createSession(data);
  return { id: newSessionId, userId: null };
}
