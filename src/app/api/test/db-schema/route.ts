import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users, sessions, events, payments, application_submissions, webhook_queue, lead_alerts } from '@/db/schema';

/**
 * GET /api/test/db-schema
 *
 * Shows the exact Railway database table structure
 * and sample data to understand what's being stored where
 */
export async function GET(request: NextRequest) {
  try {
    console.log('=== [DB SCHEMA] Fetching database structure ===');

    // Get table structure with sample data
    const [usersData, sessionsData, eventsData, paymentsData] = await Promise.all([
      db.select().from(users).limit(1),
      db.select().from(sessions).limit(1),
      db.select().from(events).limit(1),
      db.select().from(payments).limit(1),
    ]);

    // Get column info from schema
    const schemaInfo = {
      database: {
        url: process.env.DATABASE_URL?.replace(/:[^:@]+@/, ':****@'), // Hide password
        dialect: 'postgresql',
      },

      tables: {
        users: {
          description: 'User records (prospects, leads, customers)',
          columns: {
            id: 'uuid (primary key)',
            email: 'text (unique, required)',
            firstName: 'text (optional)',
            lastName: 'text (optional)',
            leadScore: 'integer (default: 0)',
            leadTemperature: 'text (cold | warm | hot)',
            status: 'text (prospect | lead | customer)',
            tierInterest: 'text (access | plus | premium | elite)',
            firstSeen: 'timestamp',
            lastSeen: 'timestamp',
            createdAt: 'timestamp',
          },
          sampleData: usersData.length > 0 ? usersData[0] : null,
          rowCount: usersData.length,
        },

        sessions: {
          description: 'Visitor sessions with UTM tracking',
          columns: {
            id: 'uuid (primary key)',
            userId: 'uuid (foreign key → users.id)',
            firstSeen: 'timestamp',
            lastSeen: 'timestamp',
            utmSource: 'text (campaign source)',
            utmMedium: 'text (campaign medium)',
            utmCampaign: 'text (campaign name)',
            referrer: 'text (HTTP referrer)',
            deviceType: 'text (mobile | tablet | desktop)',
          },
          sampleData: sessionsData.length > 0 ? sessionsData[0] : null,
          rowCount: sessionsData.length,
        },

        events: {
          description: 'Analytics events (page views, VSL, applications, payments)',
          columns: {
            id: 'uuid (primary key)',
            sessionId: 'uuid (foreign key → sessions.id)',
            userId: 'uuid (foreign key → users.id)',
            eventType: 'text (vsl_start, email_submit, payment_complete, etc.)',
            eventData: 'jsonb (flexible event data)',
            createdAt: 'timestamp',
          },
          sampleData: eventsData.length > 0 ? eventsData[0] : null,
          rowCount: eventsData.length,
        },

        payments: {
          description: 'Stripe payment records',
          columns: {
            id: 'uuid (primary key)',
            userId: 'uuid (foreign key → users.id)',
            stripePaymentIntentId: 'text (unique, from Stripe)',
            amount: 'integer (in cents)',
            currency: 'text (usd, etc.)',
            status: 'text (succeeded, failed, pending)',
            paymentDate: 'timestamp',
            createdAt: 'timestamp',
          },
          sampleData: paymentsData.length > 0 ? paymentsData[0] : null,
          rowCount: paymentsData.length,
        },

        application_submissions: {
          description: 'Application form submissions',
          columns: {
            id: 'uuid (primary key)',
            userId: 'uuid (foreign key → users.id)',
            submissionData: 'jsonb (form answers)',
            currentStep: 'integer (which step they\'re on)',
            isComplete: 'boolean',
            createdAt: 'timestamp',
            updatedAt: 'timestamp',
          },
        },

        webhook_queue: {
          description: 'Queue for failed webhooks (retry mechanism)',
          columns: {
            id: 'uuid (primary key)',
            payload: 'jsonb (webhook data)',
            targetUrl: 'text (where to send)',
            attemptCount: 'integer',
            maxAttempts: 'integer (default: 3)',
            status: 'text (pending | sent | failed)',
            lastAttemptAt: 'timestamp',
            nextAttemptAt: 'timestamp',
            deliveredAt: 'timestamp',
            errorMessage: 'text',
            createdAt: 'timestamp',
          },
        },

        lead_alerts: {
          description: 'Hot lead notifications (score ≥ 70)',
          columns: {
            id: 'uuid (primary key)',
            userId: 'uuid (foreign key → users.id)',
            alertType: 'text (hot_lead, etc.)',
            sentAt: 'timestamp',
            firstContactAt: 'timestamp',
            responseTimeSeconds: 'integer',
          },
        },
      },

      dataFlow: {
        emailPopup: {
          endpoint: '/api/analytics/tier-interest',
          flow: [
            '1. User submits email in popup',
            '2. POST /api/analytics/tier-interest',
            '3. Check if user exists by email',
            '4. If not: Create user in users table (status=prospect, score=15)',
            '5. Track event in events table (eventType=tier_click)',
            '6. Update user.tierInterest',
          ],
        },
        stripePayment: {
          endpoint: '/api/webhooks/stripe',
          flow: [
            '1. User completes Stripe checkout',
            '2. Stripe sends webhook to /api/webhooks/stripe',
            '3. Find or create user by email',
            '4. Create payment in payments table',
            '5. Update user.status = customer',
            '6. Track event in events table (eventType=payment_complete)',
            '7. Trigger n8n webhook (fire-and-forget)',
          ],
        },
      },
    };

    console.log('[DB SCHEMA] Structure fetched successfully');
    return NextResponse.json(schemaInfo);

  } catch (error) {
    console.error('[DB SCHEMA] Error:', error);
    return NextResponse.json({
      error: 'Failed to fetch schema',
      message: error instanceof Error ? error.message : 'Unknown error',
      details: error instanceof Error ? error.stack : undefined,
    }, { status: 500 });
  }
}
