import { cookies } from 'next/headers';
import { db } from '@/lib/db';
import { sessions } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { airtable } from '@/lib/airtable';
import { fetchCampaigns } from '@/lib/airtable';

interface SessionData {
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

interface Session {
  id: string;
  userId?: string | null;
  createdAt: Date;
  data: SessionData;
}

// Simple in-memory session store (for development)
// In production, you'd want to use a database like Redis or PostgreSQL
const sessionStore = new Map<string, Session>();

// Track pending session creation requests to prevent race conditions
const pendingSessionCreations = new Map<string, Promise<Session>>();

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

  // Validate UUID format before querying database
  const isValidUUID = (id: string) => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id);
  };

  if (existingSessionCookie?.value) {
    // Skip invalid session IDs (old format)
    if (!isValidUUID(existingSessionCookie.value)) {
      console.log('[SESSION] Invalid session ID format in cookie, creating new session');
    } else {
      // First check in-memory store (fast path)
      const existingSession = sessionStore.get(existingSessionCookie.value);
      if (existingSession) {
        // Check if UTM campaign matches - if not, create new session for new campaign
        if (existingSession.data.utmCampaign !== data.utmCampaign) {
          console.log('[SESSION] Existing session has different UTM campaign:', {
            existing: existingSession.data.utmCampaign,
            new: data.utmCampaign,
            sessionId: existingSession.id
          });
          // Don't return existing session - fall through to create new one
        } else {
          console.log('[SESSION] Found existing session in memory with matching UTM:', existingSession.id);
          return existingSession;
        }
      }

      // If not in memory, check database (handles server restarts)
      try {
        const dbSession = await db.select().from(sessions).where(eq(sessions.id, existingSessionCookie.value)).limit(1);

        if (dbSession && dbSession.length > 0) {
          const dbUtmCampaign = dbSession[0].utmCampaign || undefined;

          // Check if UTM campaign matches
          if (dbUtmCampaign !== data.utmCampaign) {
            console.log('[SESSION] DB session has different UTM campaign:', {
              existing: dbUtmCampaign,
              new: data.utmCampaign,
              sessionId: dbSession[0].id
            });
            // Don't reuse - fall through to create new session for new campaign
          } else {
            console.log('[SESSION] Found existing session in database with matching UTM:', dbSession[0].id);
            // Cache in memory for future requests
            const session: Session = {
              id: dbSession[0].id,
              userId: dbSession[0].userId,
              createdAt: dbSession[0].firstSeen,
              data: {
                utmSource: dbSession[0].utmSource || undefined,
                utmMedium: dbSession[0].utmMedium || undefined,
                utmCampaign: dbSession[0].utmCampaign || undefined,
                utmContent: dbSession[0].utmContent || undefined,
                utmTerm: dbSession[0].utmTerm || undefined,
                referrer: dbSession[0].referrer || undefined,
                deviceType: dbSession[0].deviceType || undefined,
                browser: dbSession[0].browser || undefined,
                ipAddress: dbSession[0].ipAddress,
                countryCode: dbSession[0].countryCode,
              }
            };
            sessionStore.set(dbSession[0].id, session);
            return session;
          }
        }
      } catch (error) {
        console.error('[SESSION] Error checking database for existing session:', error);
        // Continue to create new session
      }
    }
  }

  // Create a unique key for this request based on IP + user agent (to detect duplicate simultaneous requests)
  const requestKey = `${data.ipAddress || 'unknown'}-${data.deviceType || 'unknown'}-${data.utmCampaign || 'none'}`;

  console.log('[SESSION] Request key:', requestKey);
  console.log('[SESSION] Pending creations:', Array.from(pendingSessionCreations.keys()));

  // Check if there's already a pending session creation for this request
  const pendingCreation = pendingSessionCreations.get(requestKey);
  if (pendingCreation) {
    console.log('[SESSION] Waiting for existing session creation:', requestKey);
    return pendingCreation;
  }

  // Check database for sessions created in the last 10 seconds with same campaign (to catch race conditions)
  try {
    const recentSessions = await db.select().from(sessions)
      .where(eq(sessions.ipAddress, data.ipAddress || ''))
      .orderBy(desc(sessions.firstSeen))
      .limit(3);

    const veryRecentSession = recentSessions.find(s =>
      s.utmCampaign === (data.utmCampaign || null) &&
      s.firstSeen &&
      new Date(s.firstSeen).getTime() > Date.now() - 10000 // Last 10 seconds
    );

    if (veryRecentSession) {
      console.log('[SESSION] Found very recent session in DB, reusing:', veryRecentSession.id);
      const session: Session = {
        id: veryRecentSession.id,
        userId: veryRecentSession.userId,
        createdAt: veryRecentSession.firstSeen,
        data: {
          utmSource: veryRecentSession.utmSource || undefined,
          utmMedium: veryRecentSession.utmMedium || undefined,
          utmCampaign: veryRecentSession.utmCampaign || undefined,
          utmContent: veryRecentSession.utmContent || undefined,
          utmTerm: veryRecentSession.utmTerm || undefined,
          referrer: veryRecentSession.referrer || undefined,
          deviceType: veryRecentSession.deviceType || undefined,
          browser: veryRecentSession.browser || undefined,
          ipAddress: veryRecentSession.ipAddress,
          countryCode: veryRecentSession.countryCode,
        }
      };
      sessionStore.set(veryRecentSession.id, session);
      return session;
    }
  } catch (error) {
    console.error('[SESSION] Error checking for recent sessions:', error);
    // Continue to create new session
  }

  // Create the session creation promise
  const sessionCreationPromise = (async () => {
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

      // Update Airtable click count in real-time
      if (data.utmCampaign) {
        try {
          console.log('[SESSION AIRTABLE] Fetching campaigns to find match for:', data.utmCampaign);
          const campaigns = await fetchCampaigns();
          const matchingCampaign = campaigns.find(c => c.utmCampaign === data.utmCampaign);

          if (matchingCampaign) {
            // Get current total sessions for this campaign
            const sessionCountResult = await db.execute(`
              SELECT COUNT(*) as total_sessions
              FROM sessions
              WHERE utm_campaign = '${data.utmCampaign}'
            `);
            const totalSessions = parseInt(sessionCountResult?.rows?.[0]?.total_sessions || sessionCountResult?.[0]?.total_sessions || '0');

            console.log(`[SESSION AIRTABLE] Updating campaign ${matchingCampaign.name} (${data.utmCampaign}) with ${totalSessions} clicks`);
            await airtable.campaigns.updateMetrics(matchingCampaign.id, { clicks: totalSessions });
            console.log('[SESSION AIRTABLE] Successfully updated Airtable');
          } else {
            console.log('[SESSION AIRTABLE] No matching campaign found for:', data.utmCampaign);
          }
        } catch (error) {
          console.error('[SESSION AIRTABLE] Failed to update Airtable:', error);
          // Don't fail the session creation if Airtable update fails
        }
      }
    } catch (error) {
      console.error('[SESSION DB] Failed to persist session:', error);
      // Continue anyway - session still exists in memory
    }

    // Clean up pending map after creation
    setTimeout(() => {
      pendingSessionCreations.delete(requestKey);
    }, 1000); // Remove after 1 second to allow other simultaneous requests to complete

    return newSession;
  })();

  // Store the promise so other simultaneous requests can wait for it
  pendingSessionCreations.set(requestKey, sessionCreationPromise);

  return sessionCreationPromise;
}

// Internal helper functions (not exported - only used internally)
function getSession(sessionId: string): Session | undefined {
  return sessionStore.get(sessionId);
}

function updateSession(sessionId: string, data: Partial<SessionData>): Session | undefined {
  const session = sessionStore.get(sessionId);
  if (session) {
    session.data = { ...session.data, ...data };
    sessionStore.set(sessionId, session);
    return session;
  }
  return undefined;
}

function deleteSession(sessionId: string): void {
  sessionStore.delete(sessionId);
}

// Clean up old sessions (call this periodically in production)
function cleanupOldSessions(maxAge: number = 30 * 24 * 60 * 60 * 1000): void {
  const now = Date.now();
  for (const [id, session] of sessionStore.entries()) {
    const sessionAge = now - session.createdAt.getTime();
    if (sessionAge > maxAge) {
      sessionStore.delete(id);
    }
  }
}
