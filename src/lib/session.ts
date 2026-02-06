import { cookies } from 'next/headers';
import { db } from './db';
import { sessions } from '../db/schema';
import { eq } from 'drizzle-orm';

const SESSION_COOKIE = 'll_session';
const COOKIE_MAX_AGE = 30 * 24 * 60 * 60; // 30 days

export async function getSessionId() {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE)?.value;
}

export async function createSession(data: {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  referrer?: string;
  deviceType?: string;
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

  const cookieStore = await cookies();
  cookieStore.set({
    name: SESSION_COOKIE,
    value: id,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  });

  return id;
}

export async function getOrCreateSession(data: {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  referrer?: string;
  deviceType?: string;
}) {
  const existing = await getSessionId();

  if (existing) {
    await db
      .update(sessions)
      .set({ lastSeen: new Date() })
      .where(eq(sessions.id, existing));
    return existing;
  }

  return await createSession(data);
}
