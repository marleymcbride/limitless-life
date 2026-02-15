# UTM Parameter Testing Guide
**For:** Verifying UTM tracking end-to-end

## 🎯 Test Overview

We'll test UTM parameter tracking through the complete user journey:
1. **Landing** → Session creation with UTM params
2. **Signup** → User creation with UTM association
3. **Payment** → UTM passed to Stripe and synced to Airtable
4. **Verification** → Check PostgreSQL, Admin Dashboard, and Airtable

---

## 📋 Test Link

Use this UTM-tagged URL for testing:

```
https://www.limitless-life.co/?utm_source=test_source&utm_medium=test_medium&utm_campaign=test_campaign_feb_2026&utm_content=test_content&utm_term=test_keyword
```

**UTM Parameters Breakdown:**
- `utm_source=test_source` - Traffic source identification
- `utm_medium=test_medium` - Marketing medium (email, social, etc.)
- `utm_campaign=test_campaign_feb_2026` - Campaign name
- `utm_content=test_content` - Content variation
- `utm_term=test_keyword` - Keyword targeting

---

## ✅ Step-by-Step Test Procedure

### Step 1: Clean Browser Session

**Action:** Open browser in incognito/private mode

**Why:** Ensures clean session without existing cookies or UTM data

**Verification:** No existing `ll_session` cookie

---

### Step 2: Navigate with UTM Parameters

**Action:** Paste the test URL into your browser and navigate to site

```
https://www.limitless-life.co/?utm_source=test_source&utm_medium=test_medium&utm_campaign=test_campaign_feb_2026&utm_content=test_content&utm_term=test_keyword
```

**What Happens:**
- Browser calls `/api/session` on page load
- Session API extracts UTM params from URL query string
- Creates new session with UTM data stored

**Expected in Browser Console (F12):**
```
[SESSION API] Returning: { sessionId: "uuid-here", userId: null }
```

---

### Step 3: Verify UTM Data in PostgreSQL

**Action:** Check if session was created with UTM params

**Run this script:**
```bash
npx tsx scripts/quick-check.ts
```

**Then run this query to see the specific session:**
```bash
npx tsx scripts/check-utm-session.ts
```

**Expected Output:**
```
📊 Latest Session with UTM Parameters:
┌─────────────────────┬────────────────────────┬──────────────────────────┬─────────────────────────────────┐
│ (index)              │ id                     │ utm_source                │ utm_medium                      │
├─────────────────────┼────────────────────────┼──────────────────────────┼─────────────────────────────────┤
│ 0                    │ 'session-uuid-here'    │ 'test_source'             │ 'test_medium'                    │
└─────────────────────┴────────────────────────┴──────────────────────────┴─────────────────────────────────┘
```

---

### Step 4: Sign Up with Email

**Action:** Enter your email on the landing page

**What Happens:**
- Email submit event tracked
- User created in PostgreSQL database
- User associated with session (which has UTM params)

**Verification Query (check user was created):**
```bash
npx tsx scripts/check-user-utm.ts
```

**Expected:** New user record with email and associated session_id

---

### Step 5: Complete Application Flow

**Action:** Go through the application process

**What Happens:**
- Application start event tracked (30pts)
- Application steps tracked (5pts each)
- Application complete event tracked (40pts)

**Lead Score Should Increase:**
- Email submit: 10pts
- Application start: +30pts = 40pts total
- Application complete: +40pts = 80pts (WARM → HOT!)

---

### Step 6: View Pricing Page

**Action:** Navigate to pricing/tier selection

**What Happens:**
- Pricing view event tracked (20pts)
- Tier view event tracked (15pts)

**Lead Score Should Increase:**
- 80pts + 20pts (pricing_view) + 15pts (tier_view) = 115pts

---

### Step 7: Select Tier and Payment Plan

**Action:** Choose a tier (e.g., "Life") and payment plan (e.g., "Weekly")

**What Happens:**
- Tier selection event tracked (tier_select_life: 15pts)
- Payment plan selection tracked (payment_plan_select: 10pts)
- Triggers Phase 2 milestone score override (TIER_SELECTED = 70pts)

**Lead Score:** Should be set to 70pts (tier selection milestone)

---

### Step 8: Initiate Stripe Checkout

**Action:** Click "Enroll Today" button to go to Stripe

**What Happens:**
- Stripe checkout initiated event tracked (20pts)
- Stripe checkout session created with metadata:
  ```json
  {
    "tier": "life",
    "paymentPlan": "weekly",
    "utm_source": "test_source",
    "utm_medium": "test_medium",
    "utm_campaign": "test_campaign_feb_2026",
    "utm_content": "test_content",
    "utm_term": "test_keyword"
  }
  ```

**Lead Score:** Should be set to 95pts (checkout milestone)

---

### Step 9: Complete Test Payment

**Action:** Complete the Stripe checkout flow with test card

**Test Card Details:**
- Card Number: `4242 4242 4242 4242`
- Expiry: Any future date
- CVC: Any 3 digits
- Zip: Any 5 digits

**What Happens:**
- Payment complete event tracked (100pts)
- Payment webhook fired → n8n webhook called
- UTM parameters passed to n8n webhook:
  ```json
  {
    "email": "your-email@example.com",
    "firstName": "Test",
    "lastName": "User",
    "tier": "Premium",
    "amount": 259700,
    "stripePaymentId": "pi_test_123",
    "paymentDate": "2026-02-15T13:00:00Z",
    "score": 100,
    "phone": "+1234567890",
    "utmSource": "test_source",
    "utmCampaign": "test_campaign_feb_2026",
    "utmMedium": "test_medium"
  }
  ```

**Lead Score:** Should be set to 100pts (payment complete milestone)

---

## 🔍 Verification Steps

### Verification 1: Check PostgreSQL Directly

**Script to check latest user with UTM data:**

Create `scripts/check-utm-session.ts`:
```typescript
import { config } from 'dotenv';
import postgres from 'postgres';

config({ path: '.env.local' });
const client = postgres(process.env.DATABASE_URL!);

async function checkUTM() {
  console.log('🔍 Checking UTM Parameters in Database...\n');

  // Check latest session
  const session = await client`
    SELECT
      id,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
      utm_term,
      created_at
    FROM sessions
    ORDER BY created_at DESC
    LIMIT 1
  `;

  console.log('📊 Latest Session:');
  console.table(session);

  // Check latest user with session info
  const user = await client`
    SELECT
      u.id,
      u.email,
      u.lead_score,
      u.lead_temperature,
      s.utm_source,
      s.utm_medium,
      s.utm_campaign,
      s.utm_content,
      s.utm_term,
      u.created_at
    FROM users u
    LEFT JOIN sessions s ON u.id = s.user_id
    ORDER BY u.created_at DESC
    LIMIT 1
  `;

  console.log('\n👤 Latest User with UTM Data:');
  console.table(user);

  // Check latest payment with UTM
  const payment = await client`
    SELECT
      p.id,
      u.email,
      p.amount,
      p.tier,
      p.status,
      p.created_at
    FROM payments p
    JOIN users u ON p.user_id = u.id
    ORDER BY p.created_at DESC
    LIMIT 1
  `;

  console.log('\n💳 Latest Payment:');
  console.table(payment);

  await client.end();
}

checkUTM();
```

**Run it:**
```bash
npx tsx scripts/check-utm-session.ts
```

---

### Verification 2: Check Admin Dashboard

**Action:** Navigate to your admin dashboard

**Expected to See:**
- **Traffic Sources Table** - Shows `test_source` in UTM Source column
- **Leads Table** - Shows user with associated UTM parameters
- **Revenue Intelligence** - Shows payment with UTM attribution

**Look For:**
- UTM Source: `test_source`
- UTM Medium: `test_medium`
- UTM Campaign: `test_campaign_feb_2026`

---

### Verification 3: Check Airtable (via n8n)

**Action:** Check your Airtable CRM

**Expected in Leads Table:**
- Email: your test email
- UTM Source: `test_source`
- UTM Medium: `test_medium`
- UTM Campaign: `test_campaign_feb_2026`
- UTM Content: `test_content`
- Score: 100 (hot lead!)

**Expected in Payments Table:**
- Email: your test email
- Amount: $2,597.00 (or your selected tier/plan)
- Tier: Premium (Life tier)
- Stripe Payment ID: `pi_test_...`

**Expected in HotLeads Table:**
- Email: your test email
- Score: 100
- Temperature: Hot
- WhatTheyDid: "Test user journey with UTM tracking"

---

## 🎯 Success Criteria

✅ **Session Level:**
- UTM parameters captured in sessions table
- Session created with all 6 UTM params stored

✅ **User Level:**
- User associated with session containing UTM data
- User's lead score calculated correctly (100pts)

✅ **Payment Level:**
- UTM params passed through Stripe checkout
- Payment webhook includes UTM metadata
- n8n webhook receives UTM parameters

✅ **Airtable Level:**
- Lead record created/synced with UTM fields populated
- Payment record created with UTM attribution
- Hot lead alert triggered (score ≥ 70)

✅ **Admin Dashboard:**
- Traffic sources table shows test_source
- Leads table shows user with UTM attribution
- Revenue dashboard shows payment with UTM data

---

## 🧪 Quick Test Script

**One-command test to verify entire UTM flow:**

```bash
# 1. Check session has UTM params
npx tsx scripts/check-utm-session.ts

# 2. Check user was created with UTM association
npx tsx -e "
import { config } from 'dotenv';
import postgres from 'postgres';
config({ path: '.env.local' });
const client = postgres(process.env.DATABASE_URL!);
const user = await client\`
  SELECT u.email, u.lead_score, s.utm_source, s.utm_campaign
  FROM users u
  LEFT JOIN sessions s ON u.id = s.user_id
  ORDER BY u.created_at DESC
  LIMIT 1
\`;
console.log('✅ User with UTM:', user);
await client.end();
"

# 3. Check payment with UTM metadata
npx tsx -e "
import { config } from 'dotenv';
import postgres from 'postgres';
config({ path: '.env.local' });
const client = postgres(process.env.DATABASE_URL!);
const payment = await client\`
  SELECT p.tier, p.amount, u.email
  FROM payments p
  JOIN users u ON p.user_id = u.id
  ORDER BY p.created_at DESC
  LIMIT 1
\`;
console.log('✅ Latest Payment:', payment);
await client.end();
"
```

---

## 📊 What You Should See

**In PostgreSQL:**
```sql
-- Sessions table
utm_source: 'test_source'
utm_medium: 'test_medium'
utm_campaign: 'test_campaign_feb_2026'
utm_content: 'test_content'
utm_term: 'test_keyword'

-- Users table (joined with sessions)
email: 'your-test@email.com'
lead_score: 100
lead_temperature: 'hot'
tier_interest: 'premium' (or selected tier)
```

**In Airtable:**
```
Leads Table:
- UTM Source: test_source
- UTM Campaign: test_campaign_feb_2026
- UTM Medium: test_medium
- Score: 100

Payments Table:
- Amount: $2,597.00
- Tier: Premium
- Stripe Payment ID: pi_xxx

HotLeads Table:
- Email: your-test@email.com
- Score: 100
- Temperature: Hot
```

**In Admin Dashboard:**
- Traffic Sources: `test_source` appears in table
- Leads Table: User shows with UTM attribution
- Revenue: Payment attributed to test campaign

---

## 🐛 Troubleshooting

**Issue:** UTM params not showing in session

**Solution:**
- Check browser console for session API call
- Verify URL has `?utm_source=...` format (not `&utm_source`)
- Clear cookies and try again

**Issue:** User not associated with session

**Solution:**
- Check if user was created after session
- Verify email submit calls the session API
- Check users table for session_id match

**Issue:** UTM not passed to Stripe

**Solution:**
- Check `/api/create-checkout-session/route.ts` metadata
- Verify session.utm_source is populated
- Check Stripe dashboard for payment metadata

**Issue:** n8n webhook not receiving UTM

**Solution:**
- Check Vercel logs for webhook call
- Verify webhook payload includes UTM fields
- Test n8n webhook manually with curl command

---

## 🎉 Success!

When you complete this test, you'll have verified:

✅ UTM parameters flow from URL → Session → User → Payment → Airtable
✅ Complete attribution chain from marketing to revenue
✅ Admin dashboard shows UTM breakdown
✅ Airtable CRM has full UTM data for segmentation
✅ n8n workflows sync UTM data correctly

This proves your UTM tracking system is production-ready!
