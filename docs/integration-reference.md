# Data Management System - Integration Reference

**Purpose:** Complete technical reference for all system integrations (n8n, Airtable, Stripe, Railway, Systeme.io)

**Last Updated:** 2026-02-08

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Airtable Configuration](#airtable-configuration)
3. [n8n Webhook Integration](#n8n-webhook-integration)
4. [Stripe Webhook Handler](#stripe-webhook-handler)
5. [Railway PostgreSQL Schema](#railway-postgresql-schema)
6. [Admin Dashboard](#admin-dashboard)
7. [Environment Variables](#environment-variables)
8. [Testing Checklist](#testing-checklist)

---

## Architecture Overview

```
┌─────────────────┐
│ Next.js App     │
│ (Railway)       │
└────────┬────────┘
         │
         ├─→ Stripe Checkout ──→ Stripe Webhook ──→ Railway DB
         │                                            ↓
         ├─→ User Actions ──→ n8n Webhooks ──────→ Airtable
         │                                            ↓
         └─→ Admin Dashboard ←────────────────── Airtable
```

**Data Flow:**
1. Railway PostgreSQL = Source of truth (performance)
2. n8n = Automation hub (syncs data to Airtable)
3. Airtable = Display layer (user accessibility)
4. Admin Dashboard = Visualization (reads from Airtable)

---

## Airtable Configuration

### Base Details

**Base ID:** `appqPJ0fria1HBb9e`

**Workspace:** Limitless Life

**Environment Variables:**
```bash
AIRTABLE_BASE_ID=appqPJ0fria1HBb9e
AIRTABLE_PERSONAL_ACCESS_TOKEN=pat_your_token_here
```

### Table 1: Leads

**Table ID:** `tbl9VqQo0ZEHtL9zP`

**Purpose:** Track all leads with scoring and temperature classification

**Fields:**
- `Email` (Single line text) - Primary field, unique identifier
- `FirstName` (Single line text) - Optional
- `LastName` (Single line text) - Optional
- `Name` (Formula) - `IF(FirstName, FirstName & " " & LastName, Email)`
- `Score` (Number) - 0-100, calculated from user actions
- `Temperature` (Single select) - Options: "Hot", "Warm", "Cold"
- `CreatedAt` (Date) - When lead was first created
- `LastActivity` (Date) - Last engagement timestamp
- `Phone` (Phone) - Optional, from application
- `UTMSource` (Single select) - utm_source parameter
- `UTMCampaign` (Single line text) - utm_campaign parameter
- `UTMMedium` (Single select) - utm_medium parameter
- `CustomerStatus` (Single select) - Options: "prospect", "customer"

**Temperature Classification:**
- **Hot**: Score ≥ 70 points
- **Warm**: Score ≥ 40 points
- **Cold**: Score < 40 points

**Scoring Actions:**
- VSL started: +10 points
- VSL completed: +20 points
- Pricing viewed: +15 points
- Checkout started: +25 points
- Application step: +5-15 points (varies by step)

### Table 2: HotLeads

**Table ID:** `tblDriVenm9NvqEUB`

**Purpose:** Dedicated table for hot leads requiring immediate follow-up

**Fields:**
- `Email` (Single line text) - Primary field
- `Name` (Single line text) - Full name
- `Score` (Number) - Current lead score
- `Temperature` (Single select) - Always "Hot"
- `WhatTheyDid` (Long text) - Generated activity summary
- `Phone` (Phone) - Contact number
- `BecameHotAt` (Date) - When they crossed 70-point threshold
- `CallPriority` (Formula) - Higher score = higher priority
- `UTMSource` (Single select) - Original traffic source

**Auto-Populated When:** Lead score crosses 70-point threshold

### Table 3: Payments

**Table ID:** `tblp6S2puU6RNgQ9q`

**Purpose:** Track all successful transactions

**Fields:**
- `Email` (Single line text) - Customer email
- `Amount` (Currency) - Payment amount in USD
- `Tier` (Single select) - Options: "Access", "Plus", "Premium", "Elite"
- `StripePaymentId` (Single line text) - Unique payment identifier
- `PaymentDate` (Date) - When payment was processed

**Tier Pricing:**
- Access: $2,997
- Plus: $4,997
- Premium: $8,997
- Elite: $14,997

### Table 4: Applications

**Table ID:** `tbl6MDuIthRprQnli`

**Purpose:** Track application funnel progress

**Fields:**
- `Email` (Single line text) - Applicant email
- `Tier` (Single select) - Which tier they're applying for
- `Status` (Single select) - Options: "started", "completed", "cancelled"
- `CreatedAt` (Date) - Application start date
- `CompletedAt` (Date) - When all steps finished (if completed)

---

## n8n Webhook Integration

### Base Configuration

**n8n Instance:** `https://n8n.marleymcbride.co`

**Webhook Base URL:** `https://n8n.marleymcbride.co/webhook`

**Environment Variable:**
```bash
N8N_WEBHOOK_URL=https://n8n.marleymcbride.co/webhook
```

### Standard Webhook Envelope

**All webhooks from Next.js use this wrapper:**

```json
{
  "event": "webhook-name",
  "data": { ...actual payload... },
  "timestamp": "2026-02-08T10:45:23.456Z",
  "source": "limitless-sales-page"
}
```

### Webhook 1: Payment Complete

**Endpoint:** `https://n8n.marleymcbride.co/webhook/payment-complete`

**Event Name:** `payment-complete`

**Triggered From:** `src/app/api/webhooks/stripe/route.ts:182`

**Payload:**
```json
{
  "event": "payment-complete",
  "data": {
    "userId": "550e8400-e29b-41d4-a716-446655440000",
    "email": "john.smith@example.com",
    "amount": 2997,
    "currency": "USD",
    "stripePaymentId": "pi_3Nv6gx2eZvKYlo2C1a2b3c4d",
    "productName": "Limitless Life Program",
    "firstName": "John",
    "lastName": "Smith"
  },
  "timestamp": "2026-02-08T10:45:23.456Z",
  "source": "limitless-sales-page"
}
```

**Field Descriptions:**
- `userId` (string, optional): UUID from Railway. New customers won't have this.
- `email` (string, required): Customer email from Stripe
- `amount` (number): Payment amount in dollars (not cents)
- `currency` (string): 3-letter ISO currency code
- `stripePaymentId` (string): Stripe PaymentIntent ID
- `productName` (string, optional): Tier name from metadata
- `firstName` (string, optional): From Railway user record
- `lastName` (string, optional): From Railway user record

**n8n Workflow Actions:**

1. **Create Airtable Payment Record:**
   - Table: `Payments` (tblp6S2puU6RNgQ9q)
   - Fields: Email, Amount, Tier, StripePaymentId, PaymentDate

2. **Update Airtable Lead Record:**
   - Table: `Leads` (tbl9VqQo0ZEHtL9zP)
   - Find by: Email
   - Set CustomerStatus → "customer"
   - Set Temperature → "Hot" (if not already)

3. **Systeme.io Integration:**
   - Add contact to "customers" list
   - Tag as `paid:tier-name`
   - Trigger tier-specific onboarding email sequence

**Tier Detection:**
```javascript
// Map amount to tier name
function getTierFromAmount(amount) {
  if (amount >= 14997) return "Elite";
  if (amount >= 8997) return "Premium";
  if (amount >= 4997) return "Plus";
  return "Access";
}
```

---

### Webhook 2: Hot Lead Alert

**Endpoint:** `https://n8n.marleymcbride.co/webhook/hot-lead`

**Event Name:** `hot-lead-alert`

**Triggered From:** `src/lib/scoring.ts` when score ≥ 70

**Payload:**
```json
{
  "event": "hot-lead-alert",
  "data": {
    "userId": "550e8400-e29b-41d4-a716-446655440000",
    "email": "jane.doe@example.com",
    "score": 72,
    "firstName": "Jane",
    "lastName": "Doe",
    "lastActivity": "2026-02-08T10:30:00.000Z",
    "activitySummary": {
      "vslWatched": true,
      "vslCompletionPercent": 85,
      "applicationStarted": true,
      "applicationCompleted": false,
      "pricingViewed": true
    }
  },
  "timestamp": "2026-02-08T10:45:23.456Z",
  "source": "limitless-sales-page"
}
```

**Field Descriptions:**
- `userId` (string, optional): UUID from Railway
- `email` (string, required): Lead email
- `score` (number): Current lead score (0-100)
- `firstName` (string, optional): From Railway user record
- `lastName` (string, optional): From Railway user record
- `lastActivity` (string, optional): ISO 8601 datetime
- `activitySummary` (object, optional):
  - `vslWatched` (boolean): Whether they watched the VSL
  - `vslCompletionPercent` (number): How much of VSL they watched (0-100)
  - `applicationStarted` (boolean): Started application
  - `applicationCompleted` (boolean): Completed application
  - `pricingViewed` (boolean): Viewed pricing page

**n8n Workflow Actions:**

1. **Update Airtable Lead Record:**
   - Table: `Leads` (tbl9VqQo0ZEHtL9zP)
   - Find by: Email
   - Set Temperature → "Hot"
   - Set Score → `data.score`

2. **Create Airtable Hot Lead Record:**
   - Table: `HotLeads` (tblDriVenm9NvqEUB)
   - Fields: Email, Name, Score, Temperature="Hot", Phone, UTMSource
   - Generate WhatTheyDid from activitySummary:
     ```text
     Watched VSL (85%), viewed pricing, started application
     ```

3. **Send Email Notification:**
   - To: Your email
   - Subject: 🔥 NEW HOT LEAD
   - Body:
     ```text
     🔥 NEW HOT LEAD
     Email: jane.doe@example.com
     Score: 72 points
     What they did: Watched VSL (85%), viewed pricing, started application
     Phone: [if available]
     Source: [UTM source/campaign]
     Call them NOW!
     ```

4. **Optional - Systeme.io:**
   - Add to "hot-leads" list for special offers
   - Send immediate follow-up email sequence

---

### Webhook 3: Application Step

**Endpoint:** `https://n8n.marleymcbride.co/webhook/application-step`

**Event Name:** `application-step`

**Triggered From:** `/api/webhooks/application` when user completes each step

**Payload:**
```json
{
  "event": "application-step",
  "data": {
    "userId": "550e8400-e29b-41d4-a716-446655440000",
    "email": "mike.johnson@example.com",
    "step": "personal-info",
    "stepNumber": 1,
    "stepData": {
      "firstName": "Mike",
      "lastName": "Johnson",
      "phone": "+1 555-123-4567"
    }
  },
  "timestamp": "2026-02-08T10:45:23.456Z",
  "source": "limitless-sales-page"
}
```

**Field Descriptions:**
- `userId` (string, optional): UUID from Railway
- `email` (string, required): User email
- `step` (string): Step identifier (e.g., "personal-info", "goals", "health-history")
- `stepNumber` (number): Step order (1-5)
- `stepData` (object): Form data from this step, varies by step

**n8n Workflow Actions:**

1. **Update Airtable Lead Record:**
   - Table: `Leads` (tbl9VqQo0ZEHtL9zP)
   - Find or create by: Email
   - Set LastActivity → current timestamp
   - Update Name if firstName/lastName in stepData
   - Update Phone if phone in stepData
   - Increment Score by +5 points per step

2. **Optional - Abandonment Tracking:**
   - Start timer after step 3
   - If no activity for 24 hours → trigger re-engagement email
   - Return to application URL with reminder

---

### Webhook 4: New Lead (Application Start)

**Endpoint:** `https://n8n.marleymcbride.co/webhook/application-start`

**Event Name:** `application-start`

**Triggered From:** When user starts application (first major engagement)

**Payload:**
```json
{
  "event": "application-start",
  "data": {
    "userId": "550e8400-e29b-41d4-a716-446655440000",
    "email": "sarah.wilson@example.com",
    "firstName": "Sarah",
    "lastName": "Wilson"
  },
  "timestamp": "2026-02-08T10:45:23.456Z",
  "source": "limitless-sales-page"
}
```

**Field Descriptions:**
- `userId` (string, optional): UUID from Railway
- `email` (string, required): User email
- `firstName` (string, optional): From form
- `lastName` (string, optional): From form

**n8n Workflow Actions:**

1. **Create Airtable Lead Record:**
   - Table: `Leads` (tbl9VqQo0ZEHtL9zP)
   - Check if exists by Email (create if not)
   - Set Score → 10 (starting points)
   - Set Temperature → "Cold"
   - Set CreatedAt → current date
   - Set CustomerStatus → "prospect"

2. **Optional - Systeme.io:**
   - Add to "prospects" list
   - Send welcome email sequence

---

### Webhook 5: Analytics Sync (Pull from Railway)

**Endpoint:** `https://n8n.marleymcbride.co/webhook/analytics-sync`

**Triggered By:** n8n cron job (daily at midnight) - **NOT sent from Next.js**

**This is a PULL workflow** - n8n queries Railway PostgreSQL

**SQL Query:**
```sql
SELECT
  e.userId,
  e.eventType,
  e.eventData,
  e.createdAt,
  u.email,
  u.firstName,
  u.lastName
FROM analytics e
JOIN users u ON e.userId = u.id
WHERE e.createdAt >= NOW() - INTERVAL '1 day'
  AND e.eventType IN (
    'vsl_started',
    'vsl_completed',
    'pricing_view',
    'checkout_started',
    'payment_complete'
  )
ORDER BY e.createdAt DESC;
```

**n8n Workflow Actions:**

1. **Query Railway PostgreSQL:**
   - Connect via PostgreSQL connection
   - Execute query above
   - Fetch all results

2. **Aggregate Events Per User:**
   - Group by userId/email
   - Count events by type
   - Calculate total score increase

3. **Batch Update Airtable:**
   - Table: `Leads` (tbl9VqQo0ZEHtL9zP)
   - For each user:
     - Add score from new events
     - Update temperature if threshold crossed
     - Update LastActivity timestamp

---

### Additional Available Events

**VSL Events:**
- `vsl-play-started` - User presses play on VSL
- `vsl-progress-milestone` - Every 25% progress milestone
- `vsl-completed` - Watched entire VSL
- `vsl-dropped-off` - Stopped watching (with drop-off point)

**Application Events:**
- `application-complete` - Finished all application steps
- `email-submit` - Early email capture (if implemented)

**Lead Temperature:**
- `lead-temperature-changed` - When temperature changes (cold→warm→hot)

**Recovery:**
- `drop-off-recovery` - Trigger recovery emails/SMS for abandoned funnels

**Reports:**
- `generate-daily-report` - Daily summary
- `generate-weekly-report` - Weekly summary

---

### Systeme.io Integration

**Required Credentials:**
- API Key
- List IDs: customers, hot-leads, prospects

**List Mapping:**
- **customers list:** Triggered by `payment-complete` webhook
- **hot-leads list:** Triggered by `hot-lead-alert` webhook
- **prospects list:** Triggered by `application-start` webhook

**Tagging Format:**
- `paid:tier-name` - For customers (e.g., "paid:premium")
- `hot-lead` - For hot leads
- `prospect` - For new leads

---

## Stripe Webhook Handler

### Configuration

**Stripe API Version:** 2023-10-16

**Webhook Endpoint:** `https://limitless-life-production.up.railway.app/api/webhooks/stripe`

**Environment Variables:**
```bash
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
```

### Events Handled

#### 1. checkout.session.completed

**Purpose:** Main payment handler

**Flow:**
1. Verify webhook signature
2. Extract email from session
3. Find or create user in Railway by email
4. Check for duplicate payments (by stripePaymentIntentId)
5. Create payment record in Railway
6. Update user status to "customer"
7. Track analytics event
8. Trigger n8n `payment-complete` webhook

**Code Location:** `src/app/api/webhooks/stripe/route.ts:76-195`

**User Types Handled:**
- **Existing users:** Have `userId` in session metadata
- **New customers:** Only email (no userId), created automatically

**Idempotency:**
```typescript
// Check if payment already exists
const existingPayment = await db
  .select()
  .from(payments)
  .where(eq(payments.stripePaymentIntentId, paymentIntentId))
  .limit(1);

if (existingPayment.length > 0) {
  return NextResponse.json({ received: true, status: 'duplicate' });
}
```

#### 2. checkout.session.expired

**Purpose:** Track abandoned checkouts

**Flow:**
1. Log expired session
2. Track analytics event (for funnel analysis)
3. Optional: Trigger recovery workflow

**Code Location:** `src/app/api/webhooks/stripe/route.ts:198-224`

#### 3. payment_intent.succeeded

**Purpose:** Backup payment handler (if not handled by checkout.session.completed)

**Flow:**
1. Create payment record
2. Track analytics event
3. Trigger n8n `payment-complete` webhook

**Code Location:** `src/app/api/webhooks/stripe/route.ts:226-284`

#### 4. payment_intent.payment_failed

**Purpose:** Track failed payments for analysis

**Flow:**
1. Create failed payment record
2. Store error message
3. Optional: Trigger recovery workflow

**Code Location:** `src/app/api/webhooks/stripe/route.ts:286-309`

#### 5. invoice.paid / invoice.payment_failed

**Purpose:** Future support for subscriptions

**Status:** TODO - Not implemented yet

**Code Location:** `src/app/api/webhooks/stripe/route.ts:311-323`

---

## Railway PostgreSQL Schema

### Connection

**Host:** Railway PostgreSQL
**Database:** limitlesslife
**ORM:** Drizzle ORM

**Schema File:** `src/db/schema.ts`

### Table: users

**Purpose:** Store all user records (prospects and customers)

**Fields:**
- `id` (uuid, primary key)
- `email` (text, unique, required)
- `firstName` (text, optional)
- `lastName` (text, optional)
- `phone` (text, optional)
- `status` (text: "prospect" | "customer")
- `leadScore` (integer, default 0)
- `leadTemperature` (text: "Hot" | "Warm" | "Cold")
- `utmSource` (text, optional)
- `utmCampaign` (text, optional)
- `utmMedium` (text, optional)
- `utmContent` (text, optional)
- `createdAt` (timestamp, default now())
- `updatedAt` (timestamp, optional)

**Indexes:**
- Unique index on `email`
- Index on `status`
- Index on `leadTemperature`

### Table: sessions

**Purpose:** Track user sessions and UTM parameters

**Fields:**
- `id` (uuid, primary key)
- `userId` (uuid, nullable, references users.id)
- `sessionId` (text, unique)
- `utmSource` (text, optional)
- `utmCampaign` (text, optional)
- `utmMedium` (text, optional)
- `utmContent` (text, optional)
- `createdAt` (timestamp, default now())
- `expiresAt` (timestamp, 30 days from createdAt)

**Purpose of 30-day window:** Attribution for conversions

### Table: analytics

**Purpose:** Track all user events for scoring and analytics

**Fields:**
- `id` (uuid, primary key)
- `sessionId` (uuid, references sessions.id)
- `userId` (uuid, references users.id)
- `eventType` (text)
  - Examples: "vsl_started", "pricing_view", "payment_complete"
- `eventData` (jsonb, optional)
- `createdAt` (timestamp, default now())

**Event Types Tracked:**
- VSL engagement: `vsl_started`, `vsl_progress_25`, `vsl_progress_50`, `vsl_progress_75`, `vsl_completed`
- Funnel: `pricing_view`, `checkout_started`, `application_step`
- Conversion: `payment_complete`

**Indexes:**
- Index on `userId`
- Index on `eventType`
- Index on `createdAt` (for time-based queries)

### Table: payments

**Purpose:** Store all payment records

**Fields:**
- `id` (uuid, primary key)
- `userId` (uuid, references users.id, required)
- `stripePaymentIntentId` (text, unique, required)
- `amount` (numeric, required)
- `currency` (text: "USD", default "USD")
- `status` (text: "succeeded" | "failed" | "pending")
- `paymentDate` (timestamp, default now())
- `metadata` (jsonb, optional)

**Important:**
- `stripePaymentIntentId` is unique (prevents duplicate payments)
- Idempotency check before creating records

### Table: webhookQueue

**Purpose:** Queue webhooks for reliable delivery with retries

**Fields:**
- `id` (uuid, primary key)
- `targetUrl` (text, required)
- `payload` (jsonb, required)
- `attemptCount` (integer, default 0)
- `maxAttempts` (integer, default 3)
- `status` (text: "pending" | "processing" | "delivered" | "failed")
- `lastAttemptAt` (timestamp, optional)
- `nextAttemptAt` (timestamp, required)
- `deliveredAt` (timestamp, optional)
- `errorMessage` (text, optional)
- `createdAt` (timestamp, default now())

**Exponential Backoff:**
- Attempt 1: Immediate
- Attempt 2: 5 minutes later
- Attempt 3: 25 minutes later

**Processing:**
- Cron job endpoint: `/api/cron/retry-webhooks`
- Processes 10 pending webhooks at a time

---

## Admin Dashboard

### Access

**URL:** `https://www.limitless-life.co/admin`

**Authentication:** Password-based via `ADMIN_PASSWORD` env variable

**Cookie:** `admin_auth` (httpOnly, secure in production, 7-day expiration)

### Pages

#### 1. Dashboard Overview

**Route:** `/admin`

**Endpoint:** `/api/admin/stats`

**Metrics:**
- Total visitors (all leads in Airtable)
- Hot leads count (Temperature = "Hot")
- Total payments this month
- Conversion rate (hot leads / total visitors)

**Features:**
- Big number cards for key metrics
- Recent payments table (last 10)
- Quick action buttons

#### 2. Leads Table

**Route:** `/admin` (tab: Leads)

**Endpoint:** `/api/admin/leads?filter=all|hot|warm`

**Columns:**
- Email
- Name
- Score
- Temperature
- Phone
- UTM Source
- Created At

**Features:**
- Filter by temperature (All / Hot / Warm)
- Sort by score or date
- Search by email
- Click row for activity history

#### 3. Traffic Sources

**Route:** `/admin` (tab: Traffic Sources)

**Endpoint:** `/api/admin/traffic-sources`

**Columns:**
- Source
- Campaign
- Visitors
- Hot Leads
- Payments
- ROI

**Features:**
- Aggregated by UTM source/campaign
- Sorted by ROI (descending)
- Shows which channels convert best

### API Routes

All admin routes require authentication (checked via `isAuthenticated()`)

#### GET /api/admin/stats

**Returns:** Dashboard metrics

**Response:**
```json
{
  "totalVisitors": 1234,
  "hotLeadsCount": 87,
  "totalPaymentsThisMonth": 29970,
  "conversionRate": 7.05
}
```

#### GET /api/admin/leads?filter=hot

**Query Params:**
- `filter`: "all" | "hot" | "warm" (default: "all")

**Returns:** Array of leads

**Response:**
```json
[
  {
    "email": "john@example.com",
    "name": "John Doe",
    "score": 72,
    "temperature": "Hot",
    "phone": "+1 555-123-4567",
    "utmSource": "youtube",
    "createdAt": "2026-02-08T10:30:00.000Z"
  }
]
```

#### GET /api/admin/traffic-sources

**Returns:** Aggregated UTM analytics

**Response:**
```json
[
  {
    "source": "youtube",
    "campaign": "video_description",
    "visitors": 234,
    "hotLeads": 18,
    "payments": 5,
    "roi": 641.03
  }
]
```

---

## Environment Variables

### Required for All Environments

```bash
# ===================================================================
# DATABASE
# ===================================================================
DATABASE_URL=postgresql://user:pass@host:port/database

# ===================================================================
# AIRTABLE
# ===================================================================
AIRTABLE_BASE_ID=appqPJ0fria1HBb9e
AIRTABLE_PERSONAL_ACCESS_TOKEN=pat_your_token_here

# ===================================================================
# STRIPE
# ===================================================================
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
STRIPE_PUBLISHABLE_KEY=pk_live_xxx

# ===================================================================
# N8N WEBHOOKS
# ===================================================================
N8N_WEBHOOK_URL=https://n8n.marleymcbride.co/webhook

# ===================================================================
# ADMIN DASHBOARD
# ===================================================================
ADMIN_PASSWORD=your_secure_password_here

# ===================================================================
# APP
# ===================================================================
NEXT_PUBLIC_APP_URL=https://www.limitless-life.co
```

### Production-Only

```bash
NODE_ENV=production
```

### Development-Only

```bash
# Use test keys for development
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_test_xxx
```

---

## Testing Checklist

### Phase 1: n8n Workflow Testing

#### Payment Complete Workflow

- [ ] Create test webhook payload for $2,997 payment
- [ ] Send to `https://n8n.marleymcbride.co/webhook/payment-complete`
- [ ] Verify Airtable `Payments` table has new record
- [ ] Verify Airtable `Leads` table updated (CustomerStatus = "customer")
- [ ] Verify Systeme.io contact added to "customers" list
- [ ] Verify Systeme.io tag applied: `paid:access`
- [ ] Test with all 4 tier amounts ($2,997, $4,997, $8,997, $14,997)

#### Hot Lead Alert Workflow

- [ ] Create test webhook payload with score = 72
- [ ] Send to `https://n8n.marleymcbride.co/webhook/hot-lead`
- [ ] Verify Airtable `Leads` table updated (Temperature = "Hot", Score = 72)
- [ ] Verify Airtable `HotLeads` table has new record
- [ ] Verify email notification received
- [ ] Check email content format and data accuracy

#### Application Step Workflow

- [ ] Create test webhook payload for step 1 (personal-info)
- [ ] Send to `https://n8n.marleymcbride.co/webhook/application-step`
- [ ] Verify Airtable `Leads` table LastActivity updated
- [ ] Verify Name/Phone updated from stepData
- [ ] Test with all 5 application steps

#### New Lead Workflow

- [ ] Create test webhook payload for new lead
- [ ] Send to `https://n8n.marleymcbride.co/webhook/application-start`
- [ ] Verify Airtable `Leads` table has new record
- [ ] Verify Score = 10, Temperature = "Cold"
- [ ] Verify CreatedAt set correctly

#### Analytics Sync Workflow

- [ ] Manually trigger n8n workflow
- [ ] Verify Railway PostgreSQL query succeeds
- [ ] Verify Airtable batch updates work
- [ ] Check score calculations

### Phase 2: Stripe Webhook Testing

#### Test Payment Flow

- [ ] Create test checkout session in Stripe
- [ ] Complete test payment (using Stripe test card)
- [ ] Verify Railway `users` table has user record
- [ ] Verify Railway `payments` table has payment record
- [ ] Verify Railway `analytics` table has `payment_complete` event
- [ ] Check n8n webhook queue for `payment-complete` event
- [ ] Verify Airtable records created via n8n
- [ ] Test idempotency (send same webhook twice)

#### Test Failed Payment

- [ ] Create test payment with failure card
- [ ] Verify failed payment record created
- [ ] Verify error message stored
- [ ] Check analytics tracked correctly

#### Test New User vs Existing User

- [ ] Test checkout with new email (no userId)
- [ ] Verify user created automatically
- [ ] Test checkout with existing email (has userId)
- [ ] Verify existing user updated

### Phase 3: Admin Dashboard Testing

#### Authentication

- [ ] Access `/admin` without auth → redirect to login
- [ ] Login with correct password → access granted
- [ ] Login with incorrect password → access denied
- [ ] Verify cookie set (httpOnly, secure)
- [ ] Test cookie expiration (7 days)

#### Dashboard Page

- [ ] Load `/admin` → verify metrics display
- [ ] Verify total visitors count
- [ ] Verify hot leads count
- [ ] Verify total payments this month
- [ ] Verify conversion rate calculation
- [ ] Check recent payments table

#### Leads Table

- [ ] Click "Leads" tab
- [ ] Test filter: All Leads → show all
- [ ] Test filter: Hot Only → show only Temperature="Hot"
- [ ] Test filter: Warm Only → show only Temperature="Warm"
- [ ] Test search by email
- [ ] Click lead row → view details

#### Traffic Sources

- [ ] Click "Traffic Sources" tab
- [ ] Verify UTM aggregation
- [ ] Check ROI calculations
- [ ] Verify sorting by ROI
- [ ] Test source/campaign combinations

### Phase 4: End-to-End Testing

#### Complete User Journey

- [ ] Simulate user arriving with UTM parameters
- [ ] Watch VSL (track progress)
- [ ] View pricing page
- [ ] Start application
- [ ] Complete application steps
- [ ] Start checkout
- [ ] Complete payment
- [ ] Verify all data synced to Airtable
- [ ] Verify Systeme.io lists updated
- [ ] Check admin dashboard for accurate data

#### Lead Scoring

- [ ] Test user crossing 70-point threshold
- [ ] Verify hot lead alert sent
- [ ] Check Airtable HotLeads table
- [ ] Verify temperature updated in Leads table

#### Webhook Queue

- [ ] Temporarily disable n8n
- [ ] Trigger payment (webhook fails)
- [ ] Verify webhook queued in Railway
- [ ] Re-enable n8n
- [ ] Run cron job: `/api/cron/retry-webhooks`
- [ ] Verify webhook delivered
- [ ] Check retry count incremented

### Phase 5: Performance Testing

- [ ] Load test admin dashboard (100 concurrent users)
- [ ] Test webhook delivery time (should be < 5 seconds)
- [ ] Test Airtable query performance (should be < 2 seconds)
- [ ] Check webhook queue processing speed

---

## Troubleshooting

### Common Issues

#### n8n Webhook Not Triggered

**Symptoms:** Webhook sent from Next.js but n8n workflow doesn't run

**Solutions:**
1. Check Railway webhookQueue table for queued webhooks
2. Verify n8n instance is accessible: `curl https://n8n.marleymcbride.co/webhook/test`
3. Check n8n workflow is active (not disabled)
4. Verify webhook URL matches exactly (case-sensitive)
5. Check n8n execution logs

#### Airtable Record Not Created

**Symptoms:** n8n workflow runs but no Airtable record

**Solutions:**
1. Verify Airtable credentials (Base ID, PAT)
2. Check table IDs are correct
3. Verify field names match exactly (case-sensitive)
4. Check Airtable API rate limits (5 requests/second)
5. Look for field type mismatches (e.g., Number vs Currency)

#### Stripe Webhook Signature Fails

**Symptoms:** Stripe webhook returns 401 Unauthorized

**Solutions:**
1. Verify STRIPE_WEBHOOK_SECRET environment variable
2. Check you're using the correct secret (test vs live)
3. Ensure Stripe API version matches (2023-10-16)
4. Check raw webhook body is passed to verification

#### Admin Dashboard Returns 401

**Symptoms:** Can't access admin pages after login

**Solutions:**
1. Verify ADMIN_PASSWORD environment variable set
2. Clear cookies and re-login
3. Check cookie domain matches site domain
4. Verify httpOnly cookie flag not blocking
5. Check isAuthenticated() function in admin-auth.ts

#### Webhook Queue Not Processing

**Symptoms:** Webhooks stuck in "pending" status

**Solutions:**
1. Verify cron job endpoint is accessible
2. Check processWebhookQueue() function exists
3. Manually trigger: `curl /api/cron/retry-webhooks`
4. Check Railway logs for errors
5. Verify nextAttemptAt is in the past

---

## Contact & Support

**Code Repository:** GitHub (private)
**Railway Project:** limitless-life-production
**Airtable Base:** Limitless Life CRM
**n8n Instance:** https://n8n.marleymcbride.co
**Stripe Account:** https://dashboard.stripe.com

**Emergency Contacts:**
- Marley McBride: business.marleymcbride@gmail.com

---

## Version History

- **2026-02-08:** Initial creation - Complete integration reference
  - Added all webhook payloads
  - Added Airtable schema
  - Added Railway schema
  - Added testing checklist
  - Added troubleshooting guide

---

**Document Status:** ✅ Complete

**Next Steps:**
1. Configure n8n workflows (Task 10)
2. Configure Stripe webhook (Task 11)
3. Run end-to-end testing (Task 12)
4. Deploy to production (Task 13)
