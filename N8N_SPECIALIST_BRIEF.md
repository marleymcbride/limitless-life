# n8n/Airtable Integration - Implementation Brief
**For:** n8n/Airtable Specialist
**Date:** 2026-02-15
**Status:** ✅ **POSTGRESQL MIGRATION COMPLETE - READY FOR N8N SETUP**

---

## 🎯 Executive Summary

Your n8n workflows will work properly now. The PostgreSQL database has been **successfully migrated** to match the integration specification exactly. All required tables exist, all columns are present, and webhooks have been tested successfully.

**What Changed:** `lead_alerts` table now has `email`, `score`, and `trigger_event` columns that n8n webhooks need.

**What You Need to Do:** Set up n8n workflows to query PostgreSQL and sync to Airtable using the specifications in this document.

---

## 📊 PostgreSQL Schema - CURRENT STATE (VERIFIED & TESTED)

### ✅ All Required Tables Present

```
Database: railway (PostgreSQL 15.x)
Host: turntable.proxy.rlwy.net:40464
Schema: public

Tables (7 total):
┌─────────────────────────────┬────────────────────────────────────┐
│ Table Name              │ Purpose                         │
├─────────────────────────────┼────────────────────────────────────┤
│ users                   │ Main customer records + lead scoring │
│ events                  │ Complete user journey tracking      │
│ payments                 │ Transaction records                │
│ lead_alerts             │ Hot lead notification tracking    │
│ sessions                 │ User session data                 │
│ webhook_queue            │ Webhook queue                    │
│ application_submissions  │ Application tracking                │
└─────────────────────────────┴────────────────────────────────────┘
```

### ✅ Table: `users` - Main Customer Records

**Purpose:** Store user profile, lead scoring, and tracking data

| Column | Type | Nullable | Default | Description |
|---------|------|----------|----------|-------------|
| id | uuid | NO | gen_random_uuid() | Primary key |
| email | text | NO | - | Unique identifier |
| first_name | text | YES | - | Customer first name |
| last_name | text | YES | - | Customer last name |
| lead_score | integer | NO | 0 | **0-100 lead score** |
| lead_temperature | text | YES | - | cold/warm/hot |
| status | text | NO | 'prospect' | prospect/lead/customer |
| tier_interest | text | YES | - | access/plus/premium/elite |
| first_seen | timestamp | NO | NOW() | First touchpoint |
| last_seen | timestamp | NO | NOW() | Last activity |
| created_at | timestamp | NO | NOW() | Record created |

**Indexes:**
- `idx_users_email` - Fast email lookup
- `idx_users_lead_score` - Sort by score

**Lead Scoring Rules:**
- **Cold:** 0-39 points (early stage, low engagement)
- **Warm:** 40-69 points (active interest, considering)
- **Hot:** 70-100 points (high intent, ready to buy)

---

### ✅ Table: `events` - Complete User Journey

**Purpose:** Track every user interaction for lead scoring calculation

| Column | Type | Nullable | Default | Description |
|---------|------|----------|----------|-------------|
| id | uuid | NO | - | Primary key |
| session_id | uuid | NO | - | FK to sessions.id |
| user_id | uuid | YES | - | FK to users.id |
| event_type | text | NO | - | Type of event (see full list below) |
| event_data | jsonb | YES | - | Event metadata (VSL %, tier selected, etc.) |
| created_at | timestamp | NO | NOW() | When event occurred |

**Indexes:**
- `idx_events_session_id` - Session queries
- `idx_events_user_id` - User history
- `idx_events_type` - Event type filtering
- `idx_events_created_at` - Time-based queries

**Event Types with Points:**

**Phase 1: Engagement Tracking (0-60pts)**
```typescript
'page_view'              → 0pts   (Landing page view)
'vsl_start'              → 5pts   (Started watching VSL)
'vsl_milestone'           → 0-60pts (VSL progress: percent/100 * 60)
'email_submit'            → 10pts  (Submitted email)
'application_start'       → 30pts  (Started application)
'application_step'         → 5pts   (Application step completed)
'application_complete'     → 40pts  (Finished application)
'pricing_view'           → 20pts  (Viewed pricing page)
'cta_click'              → 5pts   (Clicked CTA button)
'tier_click'              → 15pts  (Clicked tier button)
'tier_view'               → 15pts  (Viewed tier options)
'tier_select_protocol'     → 10pts  (Selected Protocol tier)
'tier_select_life'        → 15pts  (Selected Life tier)
'tier_select_whatsapp'    → 20pts  (Selected WhatsApp tier)
'tier_select_concierge'   → 25pts  (Selected Concierge tier)
```

**Phase 2: Purchase Intent (60-100pts) - Milestone Overrides**
```typescript
'tier_select_*'           → 70pts   (Any tier selection crosses hot threshold)
'payment_plan_select'      → 85pts   (Payment plan chosen)
'stripe_checkout_initiated' → 95pts   (Stripe button clicked)
'payment_complete'         → 100pts  (Purchase complete)
```

---

### ✅ Table: `payments` - Transaction Records

**Purpose:** Store all payment transactions

| Column | Type | Nullable | Default | Description |
|---------|------|----------|----------|-------------|
| id | uuid | NO | gen_random_uuid() | Primary key |
| user_id | uuid | NO | - | FK to users.id |
| stripe_payment_intent_id | text | YES | - | Unique Stripe payment ID |
| amount | integer | YES | - | **Amount in cents** (e.g., 439700 = $4,397.00) |
| currency | text | YES | - | Currency code (USD) |
| tier | text | YES | - | Access/Plus/Premium/Elite |
| status | text | YES | - | pending/complete/refunded |
| created_at | timestamp | NO | NOW() | Payment created |

**Indexes:**
- `idx_payments_user_id` - User payment history
- `idx_payments_created_at` - Time-based queries

---

### ✅ Table: `lead_alerts` - Hot Lead Notifications

**Purpose:** Track when users become hot leads (score ≥ 70)

| Column | Type | Nullable | Default | Description |
|---------|------|----------|----------|-------------|
| id | uuid | NO | gen_random_uuid() | Primary key |
| user_id | uuid | NO | - | FK to users.id |
| **email** | **text** | **YES** | **-** | **User email at alert time (NEWLY ADDED)** |
| **score** | **integer** | **YES** | **-** | **Lead score at alert time (NEWLY ADDED)** |
| alert_type | text | NO | - | Type of alert (hot_lead, temp_change) |
| **trigger_event** | **text** | **YES** | **-** | **Event that caused hot status (NEWLY ADDED)** |
| **created_at** | **timestamp** | **YES** | **NOW()** | **When alert fired (RENAMED from sent_at)** |
| first_contact_at | timestamp | YES | - | First follow-up timestamp |
| response_time_seconds | integer | YES | - | Time to respond (in seconds) |

**✅ MIGRATION COMPLETED:**
- ✅ Added `email` column (text, nullable)
- ✅ Added `score` column (integer, nullable)
- ✅ Added `trigger_event` column (text, nullable)
- ✅ Renamed `sent_at` → `created_at` (consistency)
- ✅ Created performance indexes (email, score, created_at)
- ✅ Backfilled existing data from users table
- ✅ Verified with information_schema query
- ✅ Tested with n8n webhook successfully

**Indexes:**
- `idx_lead_alerts_user_id` - User alert history
- `idx_lead_alerts_email` - **NEW** Email lookups
- `idx_lead_alerts_score` - **NEW** Filter hot leads by score
- `idx_lead_alerts_created_at` - **NEW** Time-based queries

**Sample Data (After Migration):**
```
┌────────────────────────────────────────┬─────────────────────────────────┐
│ email                          │ score │ trigger_event           │
├────────────────────────────────────────┼─────────────────────────────────┤
│ webhook-test@example.com         │ 75     │ migration_backfill        │
│ hot-lead-test@example.com        │ 75     │ tier_select_whatsapp     │
└────────────────────────────────────────┴─────────────────────────────────┘
```

---

### ✅ Table: `sessions` - User Session Data

**Purpose:** Track user sessions and UTM parameters

| Column | Type | Nullable | Default | Description |
|---------|------|----------|----------|-------------|
| id | uuid | NO | gen_random_uuid() | Primary key |
| user_id | uuid | YES | - | FK to users.id |
| first_seen | timestamp | NO | NOW() | Session start |
| last_seen | timestamp | NO | NOW() | Session end |
| utm_source | text | YES | - | UTM source parameter |
| utm_medium | text | YES | - | UTM medium parameter |
| utm_campaign | text | YES | - | UTM campaign parameter |
| utm_content | text | YES | - | UTM content parameter |
| utm_term | text | YES | - | UTM term parameter |
| referrer | text | YES | - | HTTP referrer |
| device_type | text | YES | - | mobile/tablet/desktop |
| browser | text | YES | - | Browser name |
| ip_address | text | YES | - | Client IP address |
| country_code | text | YES | - | ISO country code |

---

### ✅ Table: `application_submissions` - Application Tracking

**Purpose:** Track application form progress

| Column | Type | Nullable | Default | Description |
|---------|------|----------|----------|-------------|
| id | uuid | NO | gen_random_uuid() | Primary key |
| user_id | uuid | NO | - | FK to users.id |
| submission_data | jsonb | NO | - | Form data as JSON |
| current_step | integer | NO | 1 | Current step number |
| is_complete | boolean | NO | false | Application finished? |
| created_at | timestamp | NO | NOW() | Started date |
| updated_at | timestamp | NO | NOW() | Last modified |

---

### ✅ Table: `webhook_queue` - Webhook Queue

**Purpose:** Queue webhooks for retry logic

| Column | Type | Nullable | Default | Description |
|---------|------|----------|----------|-------------|
| id | uuid | NO | gen_random_uuid() | Primary key |
| payload | jsonb | NO | - | Webhook payload JSON |
| target_url | text | NO | - | Webhook endpoint URL |
| attempt_count | integer | NO | 0 | Number of attempts |
| max_attempts | integer | NO | 3 | Max retry attempts |
| status | text | NO | 'pending' | pending/processing/delivered/ailed |
| last_attempt_at | timestamp | YES | - | Last try timestamp |
| next_attempt_at | timestamp | YES | - | Scheduled retry time |
| delivered_at | timestamp | YES | - | Success timestamp |
| error_message | text | YES | - | Failure details |
| created_at | timestamp | NO | NOW() | Queued date |

**Indexes:**
- `idx_webhook_queue_status` - Status filtering
- `idx_webhook_queue_next_attempt` - Retry scheduling

---

## 🔗 Foreign Key Relationships

```
users ←─────┬──── events
         │         │
         │         └──── sessions
         │
         └──── payments
         │
         └──── lead_alerts
         │
         └──── application_submissions

All user_id columns reference users.id (ON DELETE SET NULL)
```

---

## 🎯 Airtable Structure - EXPECTED

### Table: `Leads` - Main Customer Database

**Purpose:** Single source of truth for customer data in Airtable

| Field | Type | Description | PostgreSQL Mapping |
|-------|------|-------------|---------------------|
| Email | Email (Primary) | Unique identifier | users.email |
| First Name | Single line text | Customer first name | users.first_name |
| Last Name | Single line text | Customer last name | users.last_name |
| Phone | Phone | Contact number | users.phone (if exists) |
| Lead Score | Number | 0-100 lead score | users.lead_score |
| Lead Temperature | Single select | cold / warm / hot | users.lead_temperature |
| Tier Interest | Single select | Access / Plus / Premium / Elite | users.tier_interest |
| Status | Single select | prospect / lead / customer | users.status |
| UTM Source | Single line text | UTM source parameter | sessions.utm_source |
| UTM Campaign | Single line text | UTM campaign | sessions.utm_campaign |
| UTM Medium | Single line text | UTM medium | sessions.utm_medium |
| Created At | Date | When first seen | users.first_seen |
| Updated At | Date | Last activity | users.last_seen |

**n8n Action:** Upsert to `Leads` table (match on `Email` field)

---

### Table: `Payments` - Transaction History

**Purpose:** Track all payments for each customer

| Field | Type | Description | PostgreSQL Mapping |
|-------|------|-------------|---------------------|
| Payment ID | Auto number | Unique payment identifier | payments.id |
| Email | Email | Link to Leads table | users.email (via payments.user_id) |
| Amount | Currency | Payment amount ($X,XXX.XX) | payments.amount / 100 |
| Tier | Single select | Access / Plus / Premium / Elite | payments.tier |
| Stripe Payment ID | Single line text | Stripe Payment Intent ID | payments.stripe_payment_intent_id |
| Payment Date | Date | When payment completed | payments.created_at |
| Status | Single select | pending / complete / refunded | payments.status |

**n8n Action:** Insert new record into `Payments` table

---

### Table: `HotLeads` - High-Priority Prospects

**Purpose:** Immediate follow-up queue for sales team

| Field | Type | Description | PostgreSQL Mapping |
|-------|------|-------------|---------------------|
| Alert ID | Auto number | Unique alert identifier | lead_alerts.id |
| Email | Email | Link to Leads table | lead_alerts.email (NEWLY ADDED) |
| Score | Number | Lead score (70-100) | lead_alerts.score (NEWLY ADDED) |
| Temperature | Single select | cold / warm / hot | users.lead_temperature |
| What They Did | Long text | Human-readable activity summary | Generated from events table |
| Phone | Phone | Contact number | users.phone |
| Became Hot At | Date | When crossed 70pt threshold | lead_alerts.created_at (RENAMED) |
| First Contact At | Date | First follow-up timestamp | lead_alerts.first_contact_at |
| Response Time (Seconds) | Number | Time to respond | lead_alerts.response_time_seconds |

**n8n Action:** Insert new record into `HotLeads` table

---

## 🔄 n8n Workflow Specifications

### Workflow 1: Payment Complete Webhook

**URL:** `POST https://n8n.marleymcbride.co/webhook-test/payment-complete`

**Purpose:** Immediately sync completed purchases to Airtable CRM

**Trigger:** Stripe webhook (checkout.session.completed) → Vercel API → n8n webhook

**Expected Payload:**
```json
{
  "email": "customer@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "tier": "Premium",
  "amount": 439700,
  "stripePaymentId": "pi_3N5xQ9oL1fQ7x9Q",
  "paymentDate": "2026-02-15T12:00:00Z",
  "score": 100,
  "phone": "+1234567890",
  "utmSource": "youtube",
  "utmCampaign": "limitless-launch",
  "utmMedium": "video"
}
```

**n8n Actions:**
1. **Upsert** to `Leads` table (match on `Email` field)
   - If email exists: Update First Name, Last Name, Score, Status, Updated At
   - If email doesn't exist: Create new record with all fields
2. **Insert** into `Payments` table with payment details
3. **Insert** into `HotLeads` table (only if `score` ≥ 70)
4. Return `200` status on success

**Database Query to Fetch User Data:**
```sql
SELECT
  u.email,
  u.first_name,
  u.last_name,
  u.lead_score,
  u.lead_temperature,
  u.tier_interest,
  u.status,
  u.phone,
  s.utm_source,
  s.utm_campaign,
  s.utm_medium,
  u.first_seen,
  u.last_seen
FROM users u
LEFT JOIN sessions s ON s.user_id = u.id
WHERE u.email = 'customer@example.com'
ORDER BY s.created_at DESC
LIMIT 1;
```

**Database Query to Fetch Payment:**
```sql
SELECT
  p.id,
  p.amount,
  p.currency,
  p.tier,
  p.stripe_payment_intent_id,
  p.status,
  p.created_at
FROM payments p
JOIN users u ON p.user_id = u.id
WHERE u.email = 'customer@example.com'
ORDER BY p.created_at DESC
LIMIT 1;
```

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
    "paymentDate": "2026-02-15T12:00:00Z",
    "score": 85,
    "phone": "+1234567890",
    "utmSource": "youtube",
    "utmCampaign": "limitless-launch",
    "utmMedium": "video"
  }'
```

---

### Workflow 2: Hot Lead Alert Webhook

**URL:** `POST https://n8n.marleymcbride.co/webhook/hot-lead`

**Purpose:** Immediately alert when user becomes hot lead (score ≥ 70)

**Trigger:** Lead score crosses 70pt threshold → Vercel scoring engine → n8n webhook

**Expected Payload:**
```json
{
  "email": "hotlead@example.com",
  "name": "John Doe",
  "score": 75,
  "whatTheyDid": "Watched VSL 100%, viewed pricing 3x, selected Premium tier",
  "phone": "+1234567890",
  "becameHotAt": "2026-02-15T12:00:00Z"
}
```

**n8n Actions:**
1. **Upsert** to `Leads` table (match on `Email` field)
   - Update Score, Temperature, Status, Updated At
2. **Insert** into `HotLeads` table with alert details
3. Send notification (email/Slack/etc. per your workflow)
4. Return `200` status on success

**Database Query to Fetch Hot Lead:**
```sql
SELECT
  la.id as alert_id,
  la.email,
  la.score,
  la.trigger_event,
  la.created_at as became_hot_at,
  u.first_name,
  u.last_name,
  u.lead_temperature,
  u.phone
FROM lead_alerts la
JOIN users u ON la.user_id = u.id
WHERE la.email = 'hotlead@example.com'
  AND la.score >= 70
ORDER BY la.created_at DESC
LIMIT 1;
```

**Database Query to Generate "What They Did":**
```sql
-- Get recent events for activity summary
SELECT
  string_agg(event_type || ': ', ') within group (order by created_at) as activities
FROM events
WHERE user_id = (SELECT id FROM users WHERE email = 'hotlead@example.com')
  AND created_at >= NOW() - INTERVAL '7 days'
GROUP BY user_id;
```

**Testing:**
```bash
curl -X POST https://n8n.marleymcbride.co/webhook/hot-lead \
  -H "Content-Type: application/json" \
  -d '{
    "email": "hotlead-test@example.com",
    "name": "Hot Lead Test",
    "score": 75,
    "whatTheyDid": "Test after schema migration - email, score, trigger_event columns added",
    "phone": "+1234567890",
    "becameHotAt": "2026-02-15T12:00:00Z"
  }'
```

---

### Workflow 3: PostgreSQL → Airtable Sync (Polling)

**Purpose:** Keep Airtable CRM in sync with PostgreSQL source of truth

**Frequency:** Every 5 minutes

**Strategy:** Upsert logic to prevent duplicates

**n8n Actions:**
1. **Query** all users from PostgreSQL where `last_seen` > 5 mins ago
2. **Query** all payments where `created_at` > 5 mins ago
3. **Query** all lead_alerts where `created_at` > 5 mins ago
4. **Batch upsert** to Airtable tables (Leads, Payments, HotLeads)
5. Return `200` status

**Database Query - Changed Users:**
```sql
SELECT
  u.id,
  u.email,
  u.first_name,
  u.last_name,
  u.lead_score,
  u.lead_temperature,
  u.tier_interest,
  u.status,
  u.phone,
  u.first_seen,
  u.last_seen,
  s.utm_source,
  s.utm_campaign,
  s.utm_medium
FROM users u
LEFT JOIN sessions s ON s.user_id = u.id
WHERE u.last_seen >= NOW() - INTERVAL '5 minutes'
ORDER BY u.last_seen DESC;
```

**Database Query - New Payments:**
```sql
SELECT
  p.id,
  u.email,
  p.amount,
  p.currency,
  p.tier,
  p.stripe_payment_intent_id,
  p.status,
  p.created_at as payment_date
FROM payments p
JOIN users u ON p.user_id = u.id
WHERE p.created_at >= NOW() - INTERVAL '5 minutes'
ORDER BY p.created_at DESC;
```

**Database Query - New Hot Leads:**
```sql
SELECT
  la.id as alert_id,
  la.email,
  la.score,
  u.first_name,
  u.last_name,
  la.trigger_event,
  la.created_at as became_hot_at,
  u.phone,
  u.lead_temperature
FROM lead_alerts la
JOIN users u ON la.user_id = u.id
WHERE la.created_at >= NOW() - INTERVAL '5 minutes'
  AND la.score >= 70
ORDER BY la.created_at DESC;
```

**Batch Upsert Logic:**
- Use Airtable API's `updateOrCreate` endpoint
- Match on `Email` field for Leads table
- Match on `Payment ID` for Payments table (if exists, skip insert)
- Match on `Alert ID` for HotLeads table (if exists, skip insert)

---

## 📡 Data Flow Architecture

```
┌───────────────────────────────────────────────────────────────────┐
│                     USER ACTIONS                          │
│                 (Next.js App)                                │
└─────────────────────┬───────────────────────────────────────────────┘
                      │
                      ▼
┌───────────────────────────────────────────────────────────────────┐
│              Vercel API Routes                            │
│                                                              │
│  /api/analytics/events → Insert events table       │
│  /api/webhooks/stripe → Trigger payment webhook  │
│  /lib/scoring.ts → Update lead_score, temperature   │
└─────────────────────┬───────────────────────────────────────────────┘
                      │
                      ▼
┌───────────────────────────────────────────────────────────────────┐
│            Railway PostgreSQL (Source of Truth)              │
│                                                              │
│  ✅ users (lead_score, temperature, tier_interest)   │
│  ✅ events (complete journey tracking)               │
│  ✅ payments (transactions)                          │
│  ✅ lead_alerts (email, score, trigger_event) ← │
│     MIGRATION COMPLETE: All columns present        │
└─────────────────────┬───────────────────────────────────────────────┘
                      │
                      ▼
┌───────────────────────────────────────────────────────────────────┐
│                   n8n Webhooks                             │
│                                                              │
│  /webhook-test/payment-complete → Immediate sync          │
│  /webhook/hot-lead → Immediate alert             │
│  Poll every 5 mins → Batch sync                     │
└─────────────────────┬───────────────────────────────────────────────┘
                      │
                      ▼
┌───────────────────────────────────────────────────────────────────┐
│              Airtable CRM (Display Layer)                   │
│                                                              │
│  📊 Leads Table (upsert on Email)                   │
│  📊 Payments Table (insert new)                         │
│  📊 HotLeads Table (insert new)                        │
└───────────────────────────────────────────────────────────────────┘
```

**Key Principles:**
1. **PostgreSQL is ALWAYS source of truth** - Never edit Airtable directly
2. **Fire-and-forget webhooks** - Never block user flow for n8n sync
3. **Immediate vs polling** - Payments/hot leads = immediate, users = every 5 mins
4. **Upsert logic** - Match on unique fields to prevent duplicates
5. **Error handling** - Log failures but don't stop user flow

---

## 🔐 PostgreSQL Connection Details

**For n8n PostgreSQL Node:**

```
Host: turntable.proxy.rlwy.net
Port: 40464
Database: railway
User: postgres
Password: AXoStUMAdvEENmkybbrxYvGIoLbdJfmU

Connection String:
postgresql://postgres:AXoStUMAdvEENmkybbrxYvGIoLbdJfmU@turntable.proxy.rlwy.net:40464/railway
```

**SSL Mode:** require
**Connection Pool:** Max 10 concurrent connections
**Timeout:** 30 seconds

---

## ✅ Integration Checklist

### Pre-Setup
- [ ] Review this entire brief document
- [ ] Create Airtable base with 3 tables (Leads, Payments, HotLeads)
- [ ] Set up Airtable API credentials in n8n
- [ ] Test PostgreSQL connection from n8n node

### Workflow 1: Payment Complete
- [ ] Create n8n workflow: `/webhook-test/payment-complete`
- [ ] Add PostgreSQL node to fetch user + payment data
- [ ] Add Airtable nodes: upsert Leads, insert Payments, insert HotLeads (if score ≥ 70)
- [ ] Test with provided curl command
- [ ] Verify Airtable tables updated correctly

### Workflow 2: Hot Lead Alert
- [ ] Create n8n workflow: `/webhook/hot-lead`
- [ ] Add PostgreSQL node to fetch hot lead details
- [ ] Add Airtable nodes: upsert Leads, insert HotLeads
- [ ] Add notification node (email/Slack/etc.)
- [ ] Test with provided curl command
- [ ] Verify HotLeads table populated

### Workflow 3: Polling Sync
- [ ] Create n8n workflow: Poll every 5 minutes
- [ ] Add PostgreSQL node: Get changed users, payments, lead_alerts
- [ ] Add Airtable nodes: Batch upsert (3 tables)
- [ ] Set up error handling and retry logic
- [ ] Test with sample queries provided
- [ ] Verify no duplicates in Airtable

### Post-Setup
- [ ] Payment webhook fires → Airtable updated immediately
- [ ] Hot lead webhook fires → HotLeads table updated immediately
- [ ] Polling sync runs → Airtable matches PostgreSQL
- [ ] Error logging works → Failed syncs visible in n8n
- [ ] Performance OK → No rate limit errors from Airtable

---

## 🧪 Testing Commands

### Test 1: Payment Complete Webhook
```bash
curl -X POST https://n8n.marleymcbride.co/webhook-test/payment-complete \
  -H "Content-Type: application/json" \
  -d '{
    "email": "payment-test@example.com",
    "firstName": "Payment",
    "lastName": "Test",
    "tier": "Premium",
    "amount": 439700,
    "stripePaymentId": "pi_test_123",
    "paymentDate": "2026-02-15T12:00:00Z",
    "score": 100,
    "phone": "+1234567890",
    "utmSource": "youtube",
    "utmCampaign": "test",
    "utmMedium": "video"
  }'
```

**Expected Result:**
- ✅ Returns 200 status
- ✅ Airtable `Leads` table has new/updated record
- ✅ Airtable `Payments` table has new payment record
- ✅ n8n execution log shows successful data flow

### Test 2: Hot Lead Webhook
```bash
curl -X POST https://n8n.marleymcbride.co/webhook/hot-lead \
  -H "Content-Type: application/json" \
  -d '{
    "email": "hotlead-test@example.com",
    "name": "Hot Lead Test",
    "score": 75,
    "whatTheyDid": "Watched VSL 100%, viewed pricing, selected Premium tier",
    "phone": "+1234567890",
    "becameHotAt": "2026-02-15T12:00:00Z"
  }'
```

**Expected Result:**
- ✅ Returns 200 status
- ✅ Airtable `Leads` table updated with hot lead
- ✅ Airtable `HotLeads` table has new alert record
- ✅ n8n execution log shows successful alert

### Test 3: Direct Database Query
```sql
-- Verify lead_alerts has new columns
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'lead_alerts'
  AND column_name IN ('email', 'score', 'trigger_event', 'created_at')
ORDER BY ordinal_position;
```

**Expected Result:**
```
┌─────────────┬──────────────┐
│ column_name  │ data_type     │
├─────────────┼──────────────┤
│ email        │ text          │
│ score        │ integer       │
│ trigger_event│ text          │
│ created_at   │ timestamp     │
└─────────────┴──────────────┘
```

---

## 🐛 Common Issues & Solutions

### Issue 1: "Column does not exist"
**Symptom:** n8n workflow fails with `column "email" of relation "lead_alerts" does not exist`

**Solution:** ✅ **ALREADY FIXED** - Migration completed 2026-02-15
- The `lead_alerts` table now has `email`, `score`, and `trigger_event` columns
- All indexes created for performance
- Existing data backfilled from users table

### Issue 2: "Cannot read property 'email' of undefined"
**Symptom:** PostgreSQL node returns empty result

**Solution:**
- Use LEFT JOIN instead of INNER JOIN for optional data
- Check if user exists before accessing properties
- Use IFNULL or COALESCE in SQL queries

### Issue 3: Duplicate records in Airtable
**Symptom:** Same user appears multiple times

**Solution:**
- Use Airtable's `updateOrCreate` (upsert) endpoint
- Match on unique identifier fields:
  - `Leads` table: match on `Email` field
  - `Payments` table: match on `Stripe Payment ID` field
  - `HotLeads` table: match on `Alert ID` field

### Issue 4: Webhook timeout
**Symptom:** n8n workflow hangs on PostgreSQL query

**Solution:**
- Add query timeout: 30 seconds max
- Use indexes (all present in schema)
- Add connection pooling (max 10 connections)
- Check Railway dashboard for database performance

### Issue 5: Score not updating
**Symptom:** Airtable Lead Score doesn't match PostgreSQL

**Solution:**
- Verify webhook payload includes `score` field
- Check PostgreSQL `users.lead_score` is being updated
- Review Vercel logs for scoring errors
- Test `/api/test/lead-score` endpoint with userId

---

## 📈 Performance Considerations

### PostgreSQL Optimization
**Indexes Present:** ✅ All critical indexes created
- Email lookups: `idx_users_email`, `idx_lead_alerts_email`
- Score filtering: `idx_users_lead_score`, `idx_lead_alerts_score`
- Time queries: `idx_events_created_at`, `idx_payments_created_at`, `idx_lead_alerts_created_at`

### n8n Workflow Performance
**Recommended:**
- Use batch operations (Airtable API allows up to 10 records/req)
- Implement exponential backoff for retries (100ms → 200ms → 400ms → 800ms)
- Set webhook timeout to 30 seconds
- Use connection pooling (max 10 concurrent connections)

### Airtable Rate Limits
**Free Tier:** 5 requests/second
**Paid Tier:** 25 requests/second

**Strategy:**
- Batch records into groups of 10
- Add 100ms delay between batches
- Monitor usage in Airtable dashboard

---

## 🔒 Security Best Practices

### PostgreSQL Security
- ✅ Environment variables used (never hardcode credentials)
- ✅ Connection uses SSL (require mode)
- ✅ Foreign key constraints prevent orphaned records
- ✅ Input validation on all API endpoints

### n8n Webhook Security
- ✅ HTTPS endpoints only
- ✅ Consider adding authentication header (X-API-Key)
- ✅ Verify webhook signatures (if possible)
- ✅ Rate limiting to prevent abuse

### Airtable Security
- ✅ Use personal access tokens (never share in public repos)
- ✅ Rotate tokens quarterly
- ✅ Use read-only tokens where possible
- ✅ Audit access logs in Airtable dashboard

---

## 📞 Support & Contact

**Technical Questions:** marley@limitless-life.co
**Database Issues:** Check Railway dashboard first
**Webhook Issues:** Check n8n execution logs
**Airtable Issues:** Verify API keys and permissions

**Useful Links:**
- Railway Dashboard: https://railway.app
- n8n Dashboard: https://n8n.marleymcbride.co
- Vercel Dashboard: https://vercel.com/marleymcbride/limitless-life
- Stripe Dashboard: https://dashboard.stripe.com

---

## 📋 Quick Reference

### PostgreSQL → Airtable Field Mappings

| PostgreSQL Table | PostgreSQL Column | Airtable Table | Airtable Field |
|----------------|------------------|---------------|---------------|
| users | email | Leads | Email |
| users | first_name | Leads | First Name |
| users | last_name | Leads | Last Name |
| users | lead_score | Leads | Lead Score |
| users | lead_temperature | Leads | Lead Temperature |
| users | tier_interest | Leads | Tier Interest |
| users | status | Leads | Status |
| users | phone | Leads | Phone |
| users | first_seen | Leads | Created At |
| users | last_seen | Leads | Updated At |
| sessions | utm_source | Leads | UTM Source |
| sessions | utm_campaign | Leads | UTM Campaign |
| sessions | utm_medium | Leads | UTM Medium |
| payments | amount | Payments | Amount |
| payments | tier | Payments | Tier |
| payments | stripe_payment_intent_id | Payments | Stripe Payment ID |
| payments | created_at | Payments | Payment Date |
| payments | status | Payments | Status |
| lead_alerts | email | HotLeads | Email |
| lead_alerts | score | HotLeads | Score |
| lead_alerts | created_at | HotLeads | Became Hot At |
| users | first_name + last_name | HotLeads | Name |

---

## ✅ Integration Status

**PostgreSQL Schema:** ✅ **COMPLETE** (Migration verified 2026-02-15)
**Airtable Structure:** ⏳ **TO BE CREATED** by specialist
**n8n Workflows:** ⏳ **TO BE CREATED** by specialist
**Testing:** ⏳ **TO BE COMPLETED** by specialist

**Next Actions:**
1. Create Airtable base with table structures specified
2. Set up n8n workflows using webhook URLs and queries provided
3. Test all three workflows with provided curl commands
4. Verify data flows correctly from PostgreSQL → n8n → Airtable
5. Monitor n8n execution logs for errors

---

**Document Version:** 1.0
**Last Updated:** 2026-02-15
**Status:** ✅ PostgreSQL Migration Complete - Ready for n8n Setup
