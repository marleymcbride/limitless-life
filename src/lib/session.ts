import { cookies } from 'next/headers';
import { db } from '@/lib/db';
import { sessions } from '@/db/schema';

export interface SessionData {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  referrer?: string;
  deviceType?: 'desktop' | 'mobile' | 'tablet';
  browser?: string;
  ipAddress?: string | null;
  countryCode?: string;
}

export interface Session {
  id: string;
  userId?: string | null;
  createdAt: Date;
  data: SessionData;
}

// Simple in-memory session store (for development)
// In production, you'd want to use a database like Redis or PostgreSQL
const sessionStore = new Map<string, Session>();

function generateSessionId(): string {
  // Generate a proper UUID v4
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export async function getOrCreateSession(
  data: SessionData,
  cookieStore: Awaited<ReturnType<typeof cookies>>
): Promise<Session> {
  // Check if session already exists in cookie
  const existingSessionCookie = cookieStore.get('ll_session');

  if (existingSessionCookie?.value) {
    const existingSession = sessionStore.get(existingSessionCookie.value);
    if (existingSession) {
      console.log('[SESSION] Found existing session:', existingSession.id);
      return existingSession;
    }
  }

  // Create new session
  const sessionId = generateSessionId();
  const newSession: Session = {
    id: sessionId,
    userId: null,
    createdAt: new Date(),
    data,
  };

  // Store session
  sessionStore.set(sessionId, newSession);

  console.log('[SESSION] Created new session:', sessionId);

  // Persist session to database
  try {
    const insertData = {
      id: sessionId,
      utmSource: data.utmSource || null,
      utmMedium: data.utmMedium || null,
      utmCampaign: data.utmCampaign || null,
      utmContent: data.utmContent || null,
      utmTerm: data.utmTerm || null,
      referrer: data.referrer || null,
      deviceType: data.deviceType || null,
      browser: data.browser || null,
      ipAddress: data.ipAddress || null,
      countryCode: data.countryCode || null,
      firstSeen: new Date(),
      lastSeen: new Date(),
    };

    console.log('[SESSION DB] Inserting session with data:', JSON.stringify(insertData, null, 2));

    await db.insert(sessions).values(insertData);

    console.log('[SESSION DB] Persisted session to database:', sessionId);
  } catch (error) {
    console.error('[SESSION DB] Failed to persist session:', error);
    // Continue anyway - session still exists in memory
  }

  return newSession;
}

export function getSession(sessionId: string): Session | undefined {
  return sessionStore.get(sessionId);
}

export function updateSession(sessionId: string, data: Partial<SessionData>): Session | undefined {
  const session = sessionStore.get(sessionId);
  if (session) {
    session.data = { ...session.data, ...data };
    sessionStore.set(sessionId, session);
    return session;
  }
  return undefined;
}

export function deleteSession(sessionId: string): void {
  sessionStore.delete(sessionId);
}

// Clean up old sessions (call this periodically in production)
export function cleanupOldSessions(maxAge: number = 30 * 24 * 60 * 60 * 1000): void {
  const now = Date.now();
  for (const [id, session] of sessionStore.entries()) {
    const sessionAge = now - session.createdAt.getTime();
    if (sessionAge > maxAge) {
      sessionStore.delete(id);
    }
  }
}
