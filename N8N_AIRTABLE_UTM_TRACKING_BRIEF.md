# n8n/Airtable Integration Brief: UTM Tracking Implementation

**Date:** 2026-02-15
**Purpose:** Ensure UTM parameters flow correctly from PostgreSQL → n8n → Airtable
**Specialist:** n8n/Airtable Integration Specialist

---

## 🎯 Overview

We've just completed a PostgreSQL migration adding 5 new UTM tracking columns to the `sessions` table. We need to ensure our n8n workflows and Airtable schemas properly capture this data.

**Critical:** UTM parameters are now tracking at the **session level**, not user level. This means we need to join sessions with users to get complete attribution data.

---

## 📊 PostgreSQL Schema Changes

### Sessions Table (Updated)

**New columns added:**
```sql
utm_content    TEXT    -- UTM content parameter (A/B testing)
utm_term       TEXT    -- UTM term/keyword parameter
browser        TEXT    -- Browser user agent (JSON string)
ip_address     TEXT    -- User IP address
country_code   TEXT    -- Country from IP geolocation
```

**Full sessions table structure:**
```sql
CREATE TABLE sessions (
  id              UUID PRIMARY KEY,
  user_id         UUID REFERENCES users(id) ON DELETE SET NULL,
  first_seen      TIMESTAMP,
  last_seen       TIMESTAMP,

  -- UTM Parameters (8 total fields)
  utm_source      TEXT,
  utm_medium      TEXT,
  utm_campaign    TEXT,
  utm_content     TEXT,    -- ✨ NEW
  utm_term        TEXT,    -- ✨ NEW

  -- Device & Browser Info
  referrer        TEXT,
  device_type     TEXT,    -- 'mobile' | 'tablet' | 'desktop'
  browser         TEXT,    -- ✨ NEW (JSON: {"name":"Chrome","version":"141.0","os":"macOS"})
  ip_address      TEXT,    -- ✨ NEW
  country_code    TEXT,    -- ✨ NEW

  INDEXES:
    idx_sessions_user_id (user_id)
    idx_sessions_last_seen (last_seen)
);
```

### Key Relationship: Sessions ↔ Users

```
sessions.user_id → users.id (nullable, set NULL on delete)
```

**Important:** A user may have multiple sessions over time. The "first touch" UTM data is in the earliest session linked to that user.

---

## 🔗 How UTM Data Flows

### Current Flow:
1. **User visits site** with UTM params in URL
   → Session API (`/api/session`) extracts UTM params
   → Creates/updates session record with UTM data

2. **User signs up**
   → User record created
   → Linked to session via `user_id`

3. **Payment webhook fired**
   → n8n receives webhook with user email
   → n8n queries PostgreSQL for user data
   → n8n syncs to Airtable

### The Critical Join Query

To get complete UTM attribution for a user, you **MUST** join sessions:

```sql
SELECT
  u.id as user_id,
  u.email,
  u.lead_score,
  u.lead_temperature,
  u.tier_interest,
  u.created_at,

  -- First touch UTM data (from earliest session)
  s.utm_source,
  s.utm_medium,
  s.utm_campaign,
  s.utm_content,     -- ✨ NEW
  s.utm_term,        -- ✨ NEW

  -- Device info
  s.device_type,
  s.browser,         -- ✨ NEW
  s.ip_address,      -- ✨ NEW
  s.country_code,    -- ✨ NEW
  s.referrer,

  -- Session metadata
  s.first_seen as first_touch_date,
  s.last_seen as last_seen_date

FROM users u
LEFT JOIN LATERAL (
  SELECT *
  FROM sessions
  WHERE sessions.user_id = u.id
    AND sessions.utm_source IS NOT NULL  -- Only get sessions with UTM data
  ORDER BY sessions.first_seen ASC
  LIMIT 1
) s ON true

WHERE u.email = 'user@example.com'
ORDER BY u.created_at DESC;
```

**Why `LEFT JOIN LATERAL`?**
- Gets the **first session with UTM data** for each user
- Handles users with multiple sessions (returns earliest UTM touch)
- Returns NULL if user has no UTM data (graceful degradation)

---

## ✅ n8n Workflow Requirements

### Workflow 1: Payment Webhook Handler

**Trigger:** Stripe `checkout.session.completed` webhook

**Current payload includes:**
```json
{
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "tier": "Premium",
  "amount": 259700,
  "stripePaymentId": "pi_1234567890",
  "paymentDate": "2026-02-15T14:44:54Z"
}
```

**⚠️ MISSING:** UTM parameters!

**Required fix:**

1. **Add PostgreSQL query node** after webhook trigger
   - Query: First-touch UTM data (using JOIN LATERAL above)
   - Input: `email` from webhook payload
   - Output: All UTM fields + device info

2. **Merge UTM data into webhook payload**
   ```json
   {
     "email": "user@example.com",
     "firstName": "John",
     "lastName": "Doe",
     "tier": "Premium",
     "amount": 259700,
     "stripePaymentId": "pi_1234567890",
     "paymentDate": "2026-02-15T14:44:54Z",

     // ✨ ADD THESE FIELDS:
     "utmSource": "test_source",
     "utmMedium": "test_medium",
     "utmCampaign": "test_campaign_feb_2026",
     "utmContent": "test_content",
     "utmTerm": "test_keyword",
     "deviceType": "desktop",
     "browser": "{\"name\":\"Chrome\",\"version\":\"141.0\",\"os\":\"macOS\"}",
     "ipAddress": "54.193.2.30",
     "countryCode": "US",
     "referrer": "https://google.com"
   }
   ```

3. **Send updated payload to Airtable**

---

### Workflow 2: Hot Lead Alert

**Trigger:** Lead score ≥ 70 (calculated in PostgreSQL)

**Current query:**
```sql
SELECT u.email, u.lead_score, u.lead_temperature
FROM users u
WHERE u.lead_score >= 70
```

**⚠️ MISSING:** UTM attribution for hot leads!

**Required fix:**

Update query to include UTM data:
```sql
SELECT
  u.email,
  u.lead_score,
  u.lead_temperature,
  u.tier_interest,

  -- Add first-touch UTM data
  s.utm_source,
  s.utm_medium,
  s.utm_campaign,
  s.utm_content,
  s.utm_term,
  s.device_type,
  s.country_code,
  s.first_seen as first_touch_date

FROM users u
LEFT JOIN LATERAL (
  SELECT *
  FROM sessions
  WHERE sessions.user_id = u.id
    AND sessions.utm_source IS NOT NULL
  ORDER BY sessions.first_seen ASC
  LIMIT 1
) s ON true

WHERE u.lead_score >= 70
ORDER BY u.lead_score DESC, u.created_at DESC;
```

**Payload should include:**
```json
{
  "email": "hot.lead@example.com",
  "score": 85,
  "temperature": "hot",

  // ✨ ADD UTM ATTRIBUTION:
  "utmSource": "newsletter",
  "utmMedium": "email",
  "utmCampaign": "feb_2026_promo",
  "utmContent": "variant_a",
  "utmTerm": "weight_loss",
  "deviceType": "mobile",
  "countryCode": "GB",
  "firstTouchDate": "2026-02-10T09:30:00Z"
}
```

---

### Workflow 3: Real-time Lead Sync (if exists)

**Trigger:** New user created

**Current query:**
```sql
SELECT * FROM users WHERE email = 'new@example.com'
```

**Required fix:**

Add session join to get UTM data (same JOIN LATERAL pattern).

---

## 📋 Airtable Schema Requirements

### Table: Leads (or Contacts)

**Required new columns:**

| Field Name | Type | PostgreSQL Source | Notes |
|------------|------|-------------------|-------|
| UTM Source | Single Line Text | `sessions.utm_source` | |
| UTM Medium | Single Line Text | `sessions.utm_medium` | |
| UTM Campaign | Single Line Text | `sessions.utm_campaign` | |
| UTM Content | Single Line Text | `sessions.utm_content` | ✨ NEW |
| UTM Term | Single Line Text | `sessions.utm_term` | ✨ NEW |
| Device Type | Single Select | `sessions.device_type` | Options: Mobile, Tablet, Desktop |
| Browser | Formula or Long Text | `sessions.browser` | JSON string |
| IP Address | Single Line Text | `sessions.ip_address` | ✨ NEW |
| Country | Single Line Text | `sessions.country_code` | ✨ NEW |
| Referrer | Single Line Text | `sessions.referrer` | |
| First Touch Date | Date | `sessions.first_seen` | When they first visited with UTM params |

**Implementation Steps:**
1. Add these columns to Airtable Leads table
2. Map them in n8n workflow nodes
3. Test with sample data

---

### Table: Payments

**Required new columns:**

| Field Name | Type | PostgreSQL Source | Notes |
|------------|------|-------------------|-------|
| UTM Source | Single Line Text | `sessions.utm_source` (via user) | Lookup from Lead |
| UTM Medium | Single Line Text | `sessions.utm_medium` | |
| UTM Campaign | Single Line Text | `sessions.utm_campaign` | |
| UTM Content | Single Line Text | `sessions.utm_content` | ✨ NEW |
| UTM Term | Single Line Text | `sessions.utm_term` | ✨ NEW |
| Device Type | Single Select | `sessions.device_type` | |
| Country | Single Line Text | `sessions.country_code` | ✨ NEW |

**Note:** These can be lookup fields to the Leads table, OR stored directly on payment records for historical accuracy.

---

### Table: Hot Leads (if separate)

Same UTM fields as Leads table above.

---

## 🧪 Testing Checklist

### Step 1: Verify PostgreSQL Data

Run this query to confirm UTM data exists:
```sql
SELECT
  u.email,
  s.utm_source,
  s.utm_medium,
  s.utm_campaign,
  s.utm_content,
  s.utm_term
FROM users u
LEFT JOIN sessions s ON u.id = s.user_id
WHERE s.utm_source IS NOT NULL
ORDER BY u.created_at DESC
LIMIT 5;
```

**Expected:** Users with UTM parameters populated

---

### Step 2: Test n8n Workflow 1 (Payment Webhook)

1. **Trigger a test payment** (or use test webhook URL)
2. **Check n8n execution logs:**
   - Verify PostgreSQL query node runs
   - Check query includes JOIN LATERAL
   - Confirm UTM fields in output

3. **Check Airtable:**
   - Find the payment record
   - Verify all 8 UTM fields populated
   - Check browser, IP, country fields have data

**Success criteria:**
- ✅ UTM Source/Medium/Campaign populated
- ✅ UTM Content/Term populated
- ✅ Device Type correct
- ✅ Browser JSON present
- ✅ IP Address present
- ✅ Country Code present

---

### Step 3: Test n8n Workflow 2 (Hot Leads)

1. **Find a hot lead** (score ≥ 70) in PostgreSQL
2. **Manually trigger workflow** (or wait for automation)
3. **Check n8n execution:**
   - Verify query returns UTM data
   - Check payload includes UTM fields

4. **Check Airtable Hot Leads table:**
   - Verify UTM fields populated
   - Check First Touch Date is accurate

---

### Step 4: End-to-End Test

1. **Visit site with UTM params:**
   ```
   https://www.limitless-life.co/?utm_source=newsletter&utm_medium=email&utm_campaign=feb_promo&utm_content=variant_a&utm_term=weight_loss
   ```

2. **Complete signup + payment flow**

3. **Run PostgreSQL query:**
   ```sql
   SELECT
     u.email,
     s.utm_source,
     s.utm_medium,
     s.utm_campaign,
     s.utm_content,
     s.utm_term
   FROM users u
   LEFT JOIN sessions s ON u.id = s.user_id
   WHERE u.email = 'your-test-email@example.com'
   ```

4. **Check n8n webhook received:**
   - Verify UTM params in payload

5. **Check Airtable:**
   - Find the lead/payment
   - Verify all UTM fields present

---

## 🔧 Common Issues & Solutions

### Issue 1: UTM Fields NULL in Airtable

**Symptom:** Records sync but UTM fields are empty

**Possible causes:**
1. n8n workflow not querying sessions table
2. JOIN LATERAL query not used
3. User has no session with UTM data
4. Airtable fields not mapped correctly

**Debug steps:**
1. Check n8n PostgreSQL query node output
2. Verify query uses LEFT JOIN LATERAL
3. Run query manually in Railway
4. Check n8n Airtable node field mappings

---

### Issue 2: Wrong UTM Data (Most Recent vs First Touch)

**Symptom:** UTM data shows latest visit, not first touch

**Cause:** Query not using `ORDER BY first_seen ASC LIMIT 1`

**Fix:** Use LEFT JOIN LATERAL with proper ordering (see query above)

---

### Issue 3: Multiple Sessions, Which UTM to Use?

**Question:** User visited 3 times with different UTM params - which one do we use?

**Answer:** **First touch attribution** - use the earliest session with UTM data

**Why:** Marketing attribution should credit the source that **first** acquired the lead

**Implementation:** LEFT JOIN LATERAL with `ORDER BY first_seen ASC LIMIT 1`

---

### Issue 4: Browser Field Contains JSON

**Symptom:** Browser field shows `{"name":"Chrome","version":"141.0","os":"macOS"}`

**Question:** Should this be parsed?

**Answer:** Keep as JSON in Airtable, create formula field for display:

```
IF(
  NOT({Browser} = BLANK()),
  JSON_KEY(Browser, "name") & " " & JSON_KEY(Browser, "version"),
  "Unknown"
)
```

Result: "Chrome 141.0"

---

## 📝 Implementation Priority

### Urgent (Before Next Payment)
1. ✅ Add UTM columns to Airtable Leads/Payments tables
2. ✅ Update n8n payment webhook workflow to query sessions
3. ✅ Test with real payment
4. ✅ Verify UTM data in Airtable

### High Priority (This Week)
5. ✅ Update hot lead alert workflow
6. ✅ Test hot lead UTM attribution
7. ✅ Add UTM fields to Airtable views/filters

### Medium Priority (Next Sprint)
8. Create Airtable formula fields for browser parsing
9. Build UTM attribution dashboard in Airtable
10. Set up UTM performance reporting

---

## 🎯 Success Criteria

**Technical:**
- ✅ All 5 new PostgreSQL columns accessible via n8n
- ✅ n8n workflows use LEFT JOIN LATERAL queries
- ✅ Airtable tables have all UTM fields
- ✅ Field mappings correct in n8n nodes

**Business:**
- ✅ Every payment has complete UTM attribution
- ✅ Every hot lead has UTM source tracking
- ✅ Can calculate ROI per UTM campaign
- ✅ Can track first-touch vs last-touch attribution

**Verification:**
- ✅ Test payment shows all 8 UTM fields in Airtable
- ✅ Hot lead alert includes UTM data
- ✅ Historical payments can be backfilled with UTM data

---

## 📞 Questions for Specialist

Please review and confirm:

1. **PostgreSQL Access:** Do you have credentials to query Railway PostgreSQL directly?

2. **n8n Workflows:** Can you access existing payment webhook and hot lead workflows?

3. **Airtable Access:** Can you modify table schemas to add new UTM columns?

4. **Testing:** Do you have test environment for n8n workflows?

5. **Historical Data:** Should we backfill existing payments/leads with UTM data?

6. **Attribution Model:** Confirm we're using **first-touch attribution** (earliest session with UTM data)?

---

## 🚀 Next Steps

1. **Specialist reviews this brief**
2. **Identifies which workflows to update**
3. **Adds UTM columns to Airtable**
4. **Updates n8n PostgreSQL queries**
5. **Tests with sample data**
6. **Deploys to production**

**Estimated effort:** 2-4 hours depending on complexity

---

**Questions? Contact:** [Your Name]
**PostgreSQL Schema Location:** `src/db/schema.ts`
**Session API:** `src/app/api/session/route.ts`
**Migration Script:** `scripts/migrate-utm-columns.ts`
