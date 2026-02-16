# n8n & Airtable Integration - Complete Technical Guide

> **For n8n/Airtable Specialist:** This document contains everything needed to integrate with our PostgreSQL database and set up Airtable CRM workflows.

**Last Updated:** 2026-02-14
**System Status:** ✅ Production Ready
**Data Flow:** Railway PostgreSQL → n8n Webhooks → Airtable CRM
**Base URL:** https://n8n.marleymcbride.co

---

## 🏗️ System Architecture

### Three-Tier Data Flow

```
┌───────────────────────────────────────────────────────────────────────┐
│                    User Actions (Next.js App)                  │
└─────────────────────┬────────────────────────────────────────────────┘
                       │
                      ▼
┌───────────────────────────────────────────────────────────────────────┐
│            Railway PostgreSQL (Source of Truth)              │
│                                                                  │
│  📊 users (id, email, lead_score, lead_temperature,        │
│    tier_interest, first_seen, last_seen, created_at)           │
│                                                                  │
│  📊 events (id, session_id, user_id, event_type,           │
│    event_data, created_at)                                   │
│                                                                  │
│  📊 payments (id, user_id, stripe_payment_intent_id,         │
│    amount, currency, tier, status, created_at)              │
│                                                                  │
│  📊 lead_alerts (id, user_id, alert_type, sent_at,         │
│    first_contact_at, response_time_seconds)                   │
└─────────────────────────────┬──────────────────────────────────────────┘
                       │
                      ▼
┌───────────────────────────────────────────────────────────────────────┐
│               n8n Webhook Layer (Sync Layer)                   │
│  https://n8n.marleymcbride.co/webhook/                        │
│                                                                  │
│  Endpoints:                                                       │
│  • POST /webhook-test/payment-complete                        │
│  • POST /webhook/hot-lead                                    │
└─────────────────────────────┬──────────────────────────────────────────┘
                       │
                      ▼
┌───────────────────────────────────────────────────────────────────────┐
│              Airtable CRM (Display Layer)                      │
│                                                                  │
│  📊 Leads Table (main customer database)                    │
│  📊 Payments Table (transaction history)                     │
│  📊 HotLeads Table (high-priority prospects)                  │
└───────────────────────────────────────────────────────────────────┘
```

**Key Principle:** PostgreSQL is ALWAYS the source of truth. n8n webhooks are fire-and-forget sync operations that never block user flow.

---

## 📊 PostgreSQL Database Schema

### Connection Details

**Host:** `turntable.proxy.rlwy.net`
**Port:** `40464`
**Database:** `railway`
**User:** `postgres`
**Password:** `AXoStUMAdvEENmkybbrxYvGIoLbdJfmU`

**Connection String:**
```
postgresql://postgres:AXoStUMAdvEENmkybbrxYvGIoLbdJfmU@turntable.proxy.rlwy.net:40464/railway
```

### Table: `users`
**Purpose:** Main customer records with lead scoring and tracking

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  first_name TEXT,
  last_name TEXT,
  lead_score INTEGER DEFAULT 0,
  lead_temperature TEXT CHECK (lead_temperature IN ('cold', 'warm', 'hot')),
  status TEXT CHECK (status IN ('prospect', 'lead', 'customer')) DEFAULT 'prospect',
  tier_interest TEXT CHECK (tier_interest IN ('access', 'plus', 'premium', 'elite')),
  first_seen TIMESTAMP DEFAULT NOW(),
  last_seen TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_lead_score ON users(lead_score);
```

**Field Descriptions:**
- `lead_score`: 0-100, calculated from event history
- `lead_temperature`:
  - **cold** (0-39 pts): Early stage, low engagement
  - **warm** (40-69 pts): Active interest, considering options
  - **hot** (70-100 pts): High intent, ready to buy or bought
- `tier_interest`: Which tier they're interested in (access=Protocol, plus=Life, premium=Life+WhatsApp, elite=Concierge)
- `status`: prospect→lead→customer progression

### Table: `events`
**Purpose:** Complete user journey tracking for lead scoring

```sql
CREATE TABLE events (
  id UUID PRIMARY KEY,
  session_id UUID REFERENCES sessions(id) NOT NULL,
  user_id UUID REFERENCES users(id),
  event_type TEXT NOT NULL,
  event_data JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_events_session_id ON events(session_id);
CREATE INDEX idx_events_user_id ON events(user_id);
CREATE INDEX idx_events_type ON events(event_type);
CREATE INDEX idx_events_created_at ON events(created_at);
```

**Event Types (Updated with Tier Selection):**
```typescript
// Phase 1: Engagement (0-60pts) - granular additions
type EventType =
  | 'page_view'            // Landing page view
  | 'vsl_start'            // Started watching VSL (5pts)
  | 'vsl_milestone'         // VSL progress % (up to 60pts at 100%)
  | 'email_submit'          // Submitted email (10pts)
  | 'application_start'     // Started application (30pts)
  | 'application_step'       // Application step (5pts)
  | 'application_complete'   // Completed application (40pts)
  | 'pricing_view'         // Viewed pricing page (20pts)
  | 'cta_click'            // Clicked CTA button (5pts)
  | 'tier_click'           // Clicked a tier button (15pts)
  // NEW: Tier selection events
  | 'tier_view'            // Viewed tier options (15pts)
  | 'tier_select_protocol'  // Selected Protocol tier (10pts)
  | 'tier_select_life'      // Selected Life tier (15pts)
  | 'tier_select_whatsapp'   // Selected WhatsApp tier (20pts)
  | 'tier_select_concierge'  // Selected Concierge tier (25pts)
  // Phase 2: Purchase Intent (60-100pts) - milestone overrides
  | 'payment_plan_select'    // Chose payment plan → 85pts
  | 'stripe_checkout_initiated' // Clicked Stripe button → 95pts
  | 'payment_complete'      // Completed purchase → 100pts
  | 'scroll_depth';         // Scroll tracking (0pts)
```

### Table: `payments`
**Purpose:** Transaction records

```sql
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) NOT NULL,
  stripe_payment_intent_id TEXT UNIQUE,
  amount INTEGER,
  currency TEXT,
  tier TEXT CHECK (tier IN ('Access', 'Plus', 'Premium', 'Elite')),
  status TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_payments_user_id ON payments(user_id);
CREATE INDEX idx_payments_created_at ON payments(created_at);
```

**Tier Mapping:**
- `Access` = Protocol tier ($297)
- `Plus` = Life tier ($2,597)
- `Premium` = Life + WhatsApp tier ($4,397)
- `Elite` = Concierge tier ($6,897)

### Table: `lead_alerts`
**Purpose:** Hot lead notification tracking

```sql
CREATE TABLE lead_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) NOT NULL,
  alert_type TEXT NOT NULL, -- 'hot_lead', 'temperature_changed', etc.
  sent_at TIMESTAMP DEFAULT NOW(),
  first_contact_at TIMESTAMP,
  response_time_seconds INTEGER
);

-- Indexes
CREATE INDEX idx_lead_alerts_user_id ON lead_alerts(user_id);
```

---

## 🗄️ n8n Webhook Endpoints

### Base URL
```
https://n8n.marleymcbride.co/webhook/
```

### Endpoint 1: Payment Complete
**URL:** `POST https://n8n.marleymcbride.co/webhook-test/payment-complete`

**Purpose:** Sync completed purchases to Airtable CRM

**Expected Payload:**
```json
{
  "email": "customer@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "tier": "Premium",
  "amount": 439700,
  "stripePaymentId": "pi_3N5xQ9oL1fQ7x9Q7x9Q7x9Q7x9Q",
  "paymentDate": "2026-02-14T12:00:00Z",
  "score": 100,
  "phone": "+1234567890",
  "utmSource": "youtube",
  "utmCampaign": "limitless-launch",
  "utmMedium": "video"
}
```

**Field Descriptions:**
- `email`: Customer email (required)
- `firstName`: Customer first name (optional)
- `lastName`: Customer last name (optional)
- `tier`: One of: `Access`, `Plus`, `Premium`, `Elite`
- `amount`: Payment amount in **cents** (e.g., 439700 = $4,397.00)
- `stripePaymentId`: Stripe Payment Intent ID (format: `pi_...`)
- `paymentDate`: ISO 8601 timestamp (format: `YYYY-MM-DDTHH:MM:SSZ`)
- `score`: Current lead score (0-100)
- `phone`: Phone number (optional)
- `utmSource`: UTM source parameter (optional)
- `utmCampaign`: UTM campaign (optional)
- `utmMedium`: UTM medium (optional)

**Expected Actions:**
1. **Upsert** to `Leads` table (match on `Email` field)
2. **Insert** into `Payments` table
3. **Insert** into `HotLeads` table (if score ≥ 70)
4. Return 200 status on success

**Testing:**
```bash
curl -X POST https://n8n.marleymcbride.co/webhook-test/payment-complete \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "firstName": "Test",
    "lastName": "User",
    "tier": "Premium",
    "amount": 439700,
    "stripePaymentId": "pi_test_123",
    "paymentDate": "2026-02-14T12:00:00Z",
    "score": 85,
    "phone": "+1234567890",
    "utmSource": "youtube",
    "utmCampaign": "limitless-launch",
    "utmMedium": "video"
  }'
```

### Endpoint 2: Hot Lead Alert
**URL:** `POST https://n8n.marleymcbride.co/webhook/hot-lead`

**Purpose:** Alert when user becomes hot lead (score ≥ 70)

**Expected Payload:**
```json
{
  "email": "hotlead@example.com",
  "name": "John Doe",
  "score": 75,
  "whatTheyDid": "Watched VSL 100%, viewed pricing 3x",
  "phone": "+1234567890",
  "becameHotAt": "2026-02-14T12:00:00Z"
}
```

**Field Descriptions:**
- `email`: Lead email (required)
- `name`: Full name (fallback: email if no name)
- `score`: Current lead score (70-100)
- `whatTheyDid`: Human-readable activity summary
- `phone`: Phone number (optional)
- `becameHotAt`: ISO 8601 timestamp when they crossed 70pt threshold

**Expected Actions:**
1. **Upsert** to `Leads` table (match on `Email` field)
2. **Insert** into `HotLeads` table
3. Send notification (email/Slack/etc. per your workflow)
4. Return 200 status on success

**Testing:**
```bash
curl -X POST https://n8n.marleymcbride.co/webhook/hot-lead \
  -H "Content-Type: application/json" \
  -d '{
    "email": "hotlead@example.com",
    "name": "Hot Lead Test",
    "score": 75,
    "whatTheyDid": "Watched VSL 100%, viewed pricing 3x",
    "phone": "+1234567890"
  }'
```

---

## 🎯 Lead Scoring System

### Two-Phase Scoring Logic

**Phase 1: Engagement Tracking (0-60 points)**
- Granular event-based scoring for early funnel
- Detailed analytics for user behavior
- Maximum score: 60 points (warm lead threshold)

**Phase 2: Purchase Intent (60-100 points)**
- Milestone-based scoring for high-intent actions
- Simple, predictable progression
- Triggered at 60pt threshold

**Transition:** When user's score reaches 60+ points, scoring switches from granular to milestone overrides.

### Scoring Rules

**Phase 1: Event Points (0-60pts)**
```typescript
const ENGAGEMENT_POINTS = {
  vsl_start: 5,
  vsl_milestone: 0, // Calculated separately as (percent / 100) * 60
  email_submit: 10,
  application_start: 30,
  application_step: 5,
  application_complete: 40,
  pricing_view: 20,
  cta_click: 5,
  tier_view: 15,
  tier_click: 15,
  // Tier selection (before 60pts)
  tier_select_protocol: 10,
  tier_select_life: 15,
  tier_select_whatsapp: 20,
  tier_select_concierge: 25,
};
```

**Phase 2: Milestone Scores (60-100pts)**
```typescript
const MILESTONE_SCORES = {
  TIER_SELECTED: 70,        // Any tier selection
  PAYMENT_PLAN_SELECTED: 85,     // Payment plan chosen
  CHECKOUT_INITIATED: 95,     // Stripe button clicked
  PAYMENT_COMPLETE: 100,        // Purchase complete
};
```

**Temperature Thresholds:**
- **Cold:** 0-39 points
- **Warm:** 40-69 points
- **Hot:** 70-100 points

### Example User Journey

```
Event                       Phase   Points  Running Total   Temperature
------------------------------------------------------------------------
page_view                     1        0         0          cold
vsl_start                    1        +5        5          cold
vsl_milestone (50%)         1        +30       35          cold
email_submit                  1        +10       45          warm
application_start            1        +30       75          warm
tier_view                    1        +15       90          warm
tier_select_whatsapp          2        →70       70          HOT! 🚨
payment_plan_select           2        →85       85          hot
stripe_checkout_initiated     2        →95       95          hot
payment_complete              2        →100     100         hot
```

---

## 🔄 Data Flow Integration Points

### Integration Point 1: User Actions → PostgreSQL
**Location:** Next.js frontend → API routes

**Key Files:**
- `src/app/api/analytics/events/route.ts` - Event tracking endpoint
- `src/lib/analytics.ts` - Event tracking library
- `src/lib/scoring.ts` - Lead scoring engine

**Flow:**
```
User Action → Component → API Event → PostgreSQL → Scoring Engine
```

### Integration Point 2: PostgreSQL → n8n → Airtable
**Location:** Stripe webhook handler

**Key File:** `src/app/api/webhooks/stripe/route.ts`

**Current Implementation:**
```typescript
// When payment completes (checkout.session.completed)
await syncPaymentToAirtable({
  email: customer_details.email,
  firstName: customer_details.name?.split(' ')[0],
  lastName: customer_details.name?.split(' ').slice(1).join(' '),
  tier: session.metadata.tier, // Access, Plus, Premium, Elite
  amount: session.amount_total, // Already in cents
  stripePaymentId: session.payment_intent as string,
  paymentDate: new Date().toISOString(),
  score: calculatedScore,
  phone: customer_details.phone,
  utmSource: session.metadata.utm_source,
  utmCampaign: session.metadata.utm_campaign,
  utmMedium: session.metadata.utm_medium,
});
```

### Integration Point 3: Hot Lead Alerts
**Location:** Lead scoring engine

**Key File:** `src/lib/scoring.ts` (lines 131-200)

**Current Implementation:**
```typescript
// If user crossed hot threshold (70pts)
if (scoreData.temperature === 'hot' && previousTemperature !== 'hot') {
  await alertHotLead({
    email,
    name: [firstName, lastName].filter(Boolean).join(' ') || email,
    score: scoreData.score,
    whatTheyDid: activities.join(', '),
    phone: previousUser[0].phone || undefined,
    becameHotAt: new Date().toISOString(),
  });
}
```

---

## 🔧 Environment Configuration

### Required Environment Variables

**Create in:** `.env.local` (development) and Vercel (production)

```bash
# ============================================================================
# N8N WEBHOOK CONFIGURATION
# ============================================================================
N8N_WEBHOOK_URL=https://n8n.marleymcbride.co/webhook

# ============================================================================
# STRIPE CONFIGURATION
# ============================================================================
STRIPE_SECRET_KEY=sk_live_... # Get from: https://dashboard.stripe.com/apikeys
STRIPE_WEBHOOK_SECRET=whsec_...  # Get from: Stripe → Developers → Webhooks

# Stripe Price IDs for Pricing Selector
STRIPE_PRICE_PROTOCOL_FULL=price_1T09wMDglwfGELM83WAAtN9A
STRIPE_PRICE_LIFE_WEEKLY=price_1T0MIuDglwfGELM8H3NQlRrG
STRIPE_PRICE_LIFE_3PAY=price_1T0LyODglwfGELM8kLQgAovQ
STRIPE_PRICE_LIFE_2PAY=price_1T0LxqDglwfGELM8L6AHL3FA
STRIPE_PRICE_LIFE_FULL=price_1T0A0JDglwfGELM82De17V7u
STRIPE_PRICE_WHATSAPP_WEEKLY=price_1T0ME3DglwfGELM8b1EIFRnz
STRIPE_PRICE_WHATSAPP_3PAY=price_1T0MDTDglwfGELM8WSAhUVlF
STRIPE_PRICE_WHATSAPP_2PAY=price_1T0MCZDglwfGELM8tAT6mkFl
STRIPE_PRICE_WHATSAPP_FULL=price_1T0A3qDglwfGELM8o4DPQ6UG
STRIPE_PRICE_CONCIERGE_WEEKLY=price_1T0MGvDglwfGELM8u5OniLRx
STRIPE_PRICE_CONCIERGE_6PAY=price_1T0MGQDglwfGELM8hymAaX0e
STRIPE_PRICE_CONCIERGE_3PAY=price_1T0MFPDglwfGELM8bAcxQmPj
STRIPE_PRICE_CONCIERGE_FULL=price_1T0A5VDglwfGELM8Iyf8rjzH

# ============================================================================
# APPLICATION CONFIGURATION
# ============================================================================
NEXT_PUBLIC_BASE_URL=https://www.limitless-life.co

# ============================================================================
# ADMIN API KEY (optional, for admin endpoints)
# ============================================================================
ADMIN_API_KEY=your-secure-random-key-here
NEXT_PUBLIC_ADMIN_API_KEY=your-secure-random-key-here
```

### Vercel Environment Variables Setup

**Via CLI:**
```bash
vercel env add N8N_WEBHOOK_URL "https://n8n.marleymcbride.co/webhook"
vercel env add STRIPE_SECRET_KEY "sk_live_..."
vercel env add STRIPE_WEBHOOK_SECRET "whsec_..."
# Add all Stripe Price IDs...
```

**Via Dashboard:**
1. Go to: https://vercel.com/marleymcbride/limitless-life/settings/environment-variables
2. Add each variable with production values
3. Redeploy after adding

---

## 📊 Database Queries for n8n Workflows

### Query 1: Get User Lead Score
**Purpose:** Fetch current lead score for a user

```sql
SELECT
  u.id,
  u.email,
  u.first_name,
  u.last_name,
  u.lead_score,
  u.lead_temperature,
  u.tier_interest,
  u.phone
FROM users u
WHERE u.email = 'target@example.com';
```

### Query 2: Get User Event History
**Purpose:** Retrieve user's complete activity history

```sql
SELECT
  event_type,
  event_data,
  created_at
FROM events
WHERE user_id = 'user-uuid-here'
ORDER BY created_at ASC;
```

### Query 3: Get Recent Hot Leads
**Purpose:** Find leads that crossed hot threshold recently

```sql
SELECT
  u.id,
  u.email,
  u.first_name,
  u.last_name,
  u.lead_score,
  u.tier_interest,
  u.phone,
  u.created_at
FROM users u
WHERE u.lead_score >= 70
ORDER BY u.created_at DESC
LIMIT 50;
```

### Query 4: Get Payment History
**Purpose:** Retrieve all payments for a user

```sql
SELECT
  p.id,
  p.amount,
  p.currency,
  p.tier,
  p.status,
  p.created_at
FROM payments p
WHERE p.user_id = 'user-uuid-here'
ORDER BY p.created_at DESC;
```

### Query 5: Recent Hot Lead Alerts
**Purpose:** Check who was alerted as hot lead recently

```sql
SELECT
  la.id,
  u.email,
  u.first_name,
  u.last_name,
  la.alert_type,
  la.sent_at
FROM lead_alerts la
JOIN users u ON la.user_id = u.id
WHERE la.alert_type = 'hot_lead'
ORDER BY la.sent_at DESC
LIMIT 20;
```

---

## 🧪 Testing & Debugging

### Test 1: Complete Payment Journey

**Steps:**
1. Start development server: `npm run dev`
2. Navigate to: http://localhost:3000
3. Complete purchase flow
4. Check Vercel logs for: `[n8n] Payment synced to Airtable: user@example.com`
5. Check n8n executions: https://n8n.marleymcbride.co → Workflows → Executions tab

**Expected Result:**
- ✅ Leads table: New/updated record
- ✅ Payments table: New payment record
- ✅ HotLeads table: New hot lead record (if score ≥ 70)

### Test 2: Hot Lead Alert Journey

**Steps:**
1. Navigate through funnel (watch VSL, start application)
2. Reach 70+ point threshold
3. Check Vercel logs for: `[n8n] Hot lead alert sent: user@example.com`
4. Verify n8n workflow executed successfully

**Expected Result:**
- ✅ HotLeads table: New hot lead record
- ✅ User marked as 'hot' in database
- ✅ Email/Slack notification sent (per your workflow)

### Manual Webhook Testing

**Test Payment Webhook:**
```bash
curl -X POST https://n8n.marleymcbride.co/webhook-test/payment-complete \
  -H "Content-Type: application/json" \
  -d '{
    "email": "manual-test@example.com",
    "firstName": "Manual",
    "lastName": "Test",
    "tier": "Premium",
    "amount": 439700,
    "stripePaymentId": "pi_manual_test_123",
    "paymentDate": "2026-02-14T12:00:00Z",
    "score": 85,
    "phone": "+1234567890",
    "utmSource": "manual_test",
    "utmCampaign": "webhook_verification",
    "utmMedium": "api"
  }'
```

**Test Hot Lead Webhook:**
```bash
curl -X POST https://n8n.marleymcbride.co/webhook/hot-lead \
  -H "Content-Type: application/json" \
  -d '{
    "email": "manual-hotlead@example.com",
    "name": "Manual Hot Lead Test",
    "score": 75,
    "whatTheyDid": "Manual test: watched VSL 100%, viewed pricing",
    "phone": "+1234567890"
  }'
```

---

## 📈 Monitoring & Logging

### Vercel Logs
**Access:** `vercel logs --prod`

**Key Log Patterns:**
```
[n8n] Payment synced to Airtable: user@example.com
[n8n] Hot lead alert sent: user@example.com
[n8n] Hot lead alert failed (non-blocking): <error details>
```

### n8n Execution Monitoring
**URL:** https://n8n.marleymcbride.co

**Steps:**
1. Click on workflow
2. Go to "Executions" tab
3. View success/failure status
4. Click execution to see full data flow

### Error Handling Strategy

**Non-Blocking Principle:**
- User flow NEVER blocks on webhook failure
- Webhooks use fire-and-forget pattern
- Errors logged but don't stop execution

**Common Errors:**
1. **Connection timeout:** n8n server down → User flow unaffected, logged
2. **Invalid payload:** Schema mismatch → Logged, user succeeds
3. **Airtable rate limit:** Too many requests → Queued in n8n
4. **Missing fields:** Optional data missing → Uses defaults

---

## 📊 Expected Airtable Table Structure

### Table: Leads
**Purpose:** Main customer database

| Field | Type | Description |
|-------|------|-------------|
| Email | Email (Primary) | Customer email (unique identifier) |
| First Name | Single line text | First name |
| Last Name | Single line text | Last name |
| Phone | Phone | Phone number |
| Lead Score | Number | 0-100 lead score |
| Lead Temperature | Single select | cold / warm / hot |
| Tier Interest | Single select | Access / Plus / Premium / Elite |
| Status | Single select | prospect / lead / customer |
| UTM Source | Single line text | UTM source parameter |
| UTM Campaign | Single line text | UTM campaign parameter |
| UTM Medium | Single line text | UTM medium parameter |
| Created At | Date | When first seen |
| Updated At | Date | Last activity timestamp |

### Table: Payments
**Purpose:** Transaction history

| Field | Type | Description |
|-------|------|-------------|
| Payment ID | Auto number | Unique payment identifier |
| Email | Email | Link to Leads table |
| Amount | Currency | Payment amount ($X,XXX.XX) |
| Tier | Single select | Access / Plus / Premium / Elite |
| Stripe Payment ID | Single line text | Stripe Payment Intent ID |
| Payment Date | Date | When payment completed |
| Status | Single select | pending / complete / refunded |

### Table: HotLeads
**Purpose:** High-priority prospects needing immediate follow-up

| Field | Type | Description |
|-------|------|-------------|
| Alert ID | Auto number | Unique alert identifier |
| Email | Email | Link to Leads table |
| Score | Number | Lead score (70-100) |
| What They Did | Long text | Human-readable activity summary |
| Phone | Phone | Contact number |
| Became Hot At | Date | When crossed 70pt threshold |
| First Contact At | Date | First follow-up timestamp |
| Response Time (Seconds) | Number | Time to respond |

---

## 🚀 Deployment Checklist

### Pre-Deployment
- [ ] All environment variables set in Vercel
- [ ] Stripe webhook secret configured
- [ ] n8n webhooks tested manually
- [ ] PostgreSQL schema verified
- [ ] Lead scoring rules documented

### Deployment Steps
1. **Push to Vercel:**
   ```bash
   git push origin master
   ```

2. **Vercel auto-deploys** (watch for success)

3. **Verify deployment:**
   ```bash
   curl https://www.limitless-life.co/api/test/db-connection
   ```

4. **Test n8n webhooks:**
   ```bash
   curl -X POST https://n8n.marleymcbride.co/webhook-test/payment-complete \
     -H "Content-Type: application/json" \
     -d '{"email":"prod-test@example.com", ...}'
   ```

5. **Monitor Vercel logs:**
   ```bash
   vercel logs --prod
   ```

### Post-Deployment
- [ ] First successful payment synced
- [ ] First hot lead alert sent
- [ ] Airtable CRM receiving data
- [ ] Error logging working

---

## 🔗️ API Reference

### Internal API (for n8n workflows)

These endpoints can be called from n8n workflows to fetch additional data:

**GET /api/test/lead-score**
Get current lead score for a user

**Request:**
```json
{
  "userId": "user-uuid-here"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "score": 85,
    "temperature": "hot",
    "breakdown": [
      {
        "eventType": "tier_select_whatsapp",
        "count": 1,
        "points": 70
      },
      {
        "eventType": "payment_plan_select",
        "count": 1,
        "points": 85
      }
    ]
  }
}
```

**GET /api/admin/leads**
Get all leads (admin only, requires ADMIN_API_KEY)

**Response:**
```json
{
  "leads": [
    {
      "id": "user-uuid",
      "email": "user@example.com",
      "leadScore": 85,
      "leadTemperature": "hot",
      "tierInterest": "premium",
      "createdAt": "2026-02-14T12:00:00Z"
    }
  ]
}
```

---

## 📊 Analytics Events Reference

### Event Scoring Breakdown

**VSL Tracking:**
- `vsl_start` (5pts): User clicked play on VSL
- `vsl_milestone` (up to 60pts): Progress percentage (0-100%)
  - Calculated as: `(percent / 100) * 60`

**Application Funnel:**
- `email_submit` (10pts): Submitted email address
- `application_start` (30pts): Started application form
- `application_step` (5pts): Completed application step
- `application_complete` (40pts): Finished application

**Pricing Engagement:**
- `pricing_view` (20pts): Viewed pricing page
- `cta_click` (5pts): Clicked any CTA button
- `tier_click` (15pts): Clicked a tier button
- `tier_view` (15pts): Opened tier selector modal

**Tier Selection (increasing intent):**
- `tier_select_protocol` (10pts): Selected lowest tier
- `tier_select_life` (15pts): Selected middle tier
- `tier_select_whatsapp` (20pts): Selected high tier
- `tier_select_concierge` (25pts): Selected highest tier

**Purchase Intent (milestone overrides):**
- `tier_select_*` → 70pts (crossing hot threshold)
- `payment_plan_select` → 85pts (chose payment plan)
- `stripe_checkout_initiated` → 95pts (about to pay)
- `payment_complete` → 100pts (purchased)

### Example: Complete User Journey

```
Action                      Event Type              Score   Temp
------------------------------------------------------------------------
Visited home page           page_view                0       cold
Watched VSL start          vsl_start               5       cold
Watched VSL 50%           vsl_milestone (50%)      30      cold
Submitted email             email_submit            40      warm
Started application          application_start        70      HOT!
Viewed pricing page         pricing_view            90      hot
Selected Premium tier        tier_select_premium       70      HOT! (milestone)
Chose payment plan         payment_plan_select      85      hot
Clicked Stripe button        stripe_checkout_initiated 95      hot
Completed purchase          payment_complete        100     hot
```

---

## 🐛 Troubleshooting

### Problem: Webhook not firing

**Check:**
1. Vercel logs: `vercel logs --prod | grep n8n`
2. Environment variables: `vercel env ls`
3. Stripe webhook status: https://dashboard.stripe.com/webhooks
4. n8n workflow status: https://n8n.marleymcbride.co

### Problem: Score not updating

**Check:**
1. Event tracking: Look for `[event]` logs
2. Database connection: `/api/test/db-connection`
3. Scoring logic: `/api/test/lead-score` with userId
4. PostgreSQL events table for user

### Problem: Airtable not updating

**Check:**
1. n8n execution log (shows exact data sent)
2. Airtable API key permissions
3. Field mapping matches schema
4. Rate limits (Airtable free tier: 5 req/sec)

### Problem: Hot leads not alerting

**Check:**
1. Score threshold: Must be ≥ 70
2. Temperature change: Previous ≠ hot, current = hot
3. Webhook URL: Correct `/webhook/hot-lead` endpoint
4. Email/phone: Passed correctly in payload

---

## 📈 Performance Considerations

### Database Optimization
**Indexes in place:**
- `idx_users_email`: Fast user lookup by email
- `idx_users_lead_score`: Sort leads by score
- `idx_events_user_id`: Fetch user events quickly
- `idx_events_created_at`: Time-based queries

### Connection Pooling
**Railway provides:** Connection pooling handled automatically
**Recommended:** Max 10 concurrent connections

### Webhook Rate Limits
**n8n:** Handles queuing automatically
**Recommended:** Fire webhooks asynchronously (non-blocking)

---

## 🔒 Security Considerations

### API Key Protection
**Admin endpoints:** Require `ADMIN_API_KEY` header
**Test endpoints:** Remove or protect in production

### Webhook Verification
**Stripe:** Always verify webhook signatures
**n8n:** Use HTTPS + consider authentication header

### Data Sanitization
**User inputs:** Validate and sanitize before storage
**SQL Injection:** Use Drizzle ORM (parameterized queries)
**XSS:** Never trust user input in event_data

---

## 🎯 Key Takeaways for n8n/Airtable Specialist

1. **PostgreSQL is source of truth** - All data originates here
2. **Webhooks are fire-and-forget** - Never block user flow
3. **Two-phase scoring system** - Granular (0-60) then milestone (60-100)
4. **Hot lead threshold = 70pts** - Triggered at tier selection
5. **Tier interest tracking** - Automatically captured from events
6. **Payment amounts in cents** - e.g., 439700 = $4,397.00
7. **Timestamps in ISO 8601** - Format: `YYYY-MM-DDTHH:MM:SSZ`
8. **All changes committed** - Ready for Vercel deployment
9. **Error handling verified** - Non-blocking, well-logged
10. **Complete documentation** - This guide contains everything needed

---

## 📞 Next Steps for n8n Setup

### Immediate Actions
1. **Copy PostgreSQL credentials** from this document
2. **Test both webhooks** using manual curl commands
3. **Create Airtable base** with table structures provided
4. **Build n8n workflows** using webhook endpoints and payloads
5. **Test end-to-end** with manual payment flow

### Integration Checklist
- [ ] PostgreSQL connected successfully
- [ ] Payment webhook workflow created
- [ ] Hot lead webhook workflow created
- [ ] Airtable tables created with correct schema
- [ ] Upsert logic working (email as key)
- [ ] Test payment synced successfully
- [ ] Test hot lead alerted successfully
- [ ] Error handling verified (non-blocking)
- [ ] Production deployment tested

---

## 📞 Support & Contact

**Technical Questions:** marley@limitless-life.co
**Database Issues:** Check Railway dashboard first
**Webhook Issues:** Check n8n executions tab
**Airtable Issues:** Verify API keys and permissions

**Useful Links:**
- Vercel Dashboard: https://vercel.com/marleymcbride/limitless-life
- Railway Dashboard: https://railway.app
- n8n Dashboard: https://n8n.marleymcbride.co
- Stripe Dashboard: https://dashboard.stripe.com

---

**Document Version:** 1.0
**Last Updated:** 2026-02-14
**Status:** ✅ Ready for Production
