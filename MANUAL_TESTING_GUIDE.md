# Manual Testing Guide - Enhanced Lead Scoring System

## Prerequisites
1. Development server running: `npm run dev`
2. Browser open to: http://localhost:3000

## Test 1: Phase 1 (Engagement) Scoring - Target: 0-60pts

**Steps:**
1. Navigate to home page (http://localhost:3000)
2. Watch VSL (triggers `vsl_start` +5pts)
3. Click "Apply Now" button (triggers `cta_click` +5pts)
4. Enter email address (triggers `email_submit` +10pts)
5. Start application (triggers `application_start` +30pts)

**Expected Score:** ~50pts (warm lead, approaching Phase 2)

**Verify with API:**
```bash
# 1. Get user ID from browser console:
# Open DevTools → Application → Session Storage → Copy 'userId' value

# 2. Test score endpoint:
curl -X POST http://localhost:3000/api/test/lead-score \
  -H "Content-Type: application/json" \
  -d '{"userId": "YOUR_USER_ID"}'

# Expected response:
{
  "success": true,
  "data": {
    "score": 50,
    "temperature": "warm",
    "breakdown": [...]
  }
}
```

## Test 2: Phase 2 Transition - Tier Selection (Target: 70pts)

**Steps:**
1. From application page, scroll to "What You Get" section
2. Click any tier button:

**Protocol (lower intent):**
- Click "THE LIMITLESS PROTOCOL" → Enroll button
- Event: `tier_select_protocol` (+10pts)
- If already at 50pts: **60pts** (Phase 1 → Phase 2 transition)

**Life (medium intent):**
- Click "LIMITLESS LIFE" → Enroll button
- Event: `tier_select_life` (+15pts)
- If already at 50pts: **65pts** (warm, approaching hot)

**Life + WhatsApp (high intent):**
- Click "LIMITLESS LIFE + PRIVATE" → Enroll button
- Event: `tier_select_whatsapp` (+20pts)
- If already at 50pts: **70pts** 🎯 **HOT LEAD ALERT!**

**Concierge (highest intent):**
- Click "LIMITLESS HEALTH CONCIERGE" → Enroll button
- Event: `tier_select_concierge` (+25pts)
- If already at 50pts: **75pts** 🎯 **HOT LEAD ALERT!**

**Expected Score:** 70-75pts (hot lead, milestone score override)

**Verify n8n Webhook:**
```bash
# Check Vercel logs for:
[n8n] Hot lead alert sent: user@example.com

# Or check n8n executions:
# Visit: https://n8n.marleymcbride.co
# Click workflow → Executions tab
# View success/failure status + data flow
```

## Test 3: Payment Plan Selection (Target: 85pts)

**Steps:**
1. Pricing selector modal opens automatically
2. Choose payment plan:
   - Weekly, 3-pay, 2-pay, or Full
3. Event: `payment_plan_select` triggered

**Expected Score:** **85pts** (milestone override from 70pts)

**Verify with API:**
```bash
curl -X POST http://localhost:3000/api/test/lead-score \
  -H "Content-Type: application/json" \
  -d '{"userId": "YOUR_USER_ID"}'

# Expected response:
{
  "success": true,
  "data": {
    "score": 85,
    "temperature": "hot",
    "breakdown": [
      {
        "eventType": "tier_select_whatsapp",
        "count": 1,
        "points": 70  # Milestone score
      },
      {
        "eventType": "payment_plan_select",
        "count": 1,
        "points": 85  # Milestone score
      }
    ]
  }
}
```

## Test 4: Stripe Checkout Initiation (Target: 95pts)

**Steps:**
1. Click "Confirm Enrollment" button
2. Event: `stripe_checkout_initiated` triggered
3. Redirects to Stripe checkout page

**Expected Score:** **95pts** (milestone override from 85pts)

**Verify with API:**
```bash
curl -X POST http://localhost:3000/api/test/lead-score \
  -H "Content-Type: application/json" \
  -d '{"userId": "YOUR_USER_ID"}'

# Expected response:
{
  "data": {
    "score": 95,
    "temperature": "hot",
    "breakdown": [...]
  }
}
```

## Test 5: Verify Database State

**Connect to Railway PostgreSQL:**
```bash
# Use connection string from .env.local:
postgresql://postgres:AXoStUMAdvEENmkybbrxYvGIoLbdJfmU@turntable.proxy.rlwy.net:40464/railway

# Query user data:
SELECT id, email, lead_score, lead_temperature, tier_interest, created_at, updated_at
FROM users
WHERE email = 'your-test-email@example.com';
```

**Expected Results:**
```
lead_score: 95
lead_temperature: 'hot'
tier_interest: 'premium'  # or 'access', 'plus', 'elite' based on selection
updated_at: [recent timestamp]
```

## Test 6: Verify Event Tracking

**Query events for user:**
```sql
SELECT event_type, event_data, created_at
FROM events
WHERE user_id = 'YOUR_USER_ID'
ORDER BY created_at ASC;
```

**Expected Events (in order):**
1. `vsl_start` - 5pts
2. `cta_click` - 5pts
3. `email_submit` - 10pts
4. `application_start` - 30pts
5. `tier_select_whatsapp` → Milestone to 70pts
6. `payment_plan_select` → Milestone to 85pts
7. `stripe_checkout_initiated` → Milestone to 95pts

**Total Score:** 95 (hot lead)

## Test 7: Verify n8n Workflow Execution

**Check n8n Dashboard:**
1. Visit: https://n8n.marleymcbride.co
2. Click "Hot Lead Alert" workflow
3. Click "Executions" tab
4. View latest execution

**Expected Data Flow:**
```json
{
  "email": "your-test-email@example.com",
  "name": "Test User",
  "score": 95,
  "whatTheyDid": "Watched VSL 100%, Viewed pricing page, Started application, Reached hot lead threshold",
  "phone": null,
  "becameHotAt": "2026-02-14T23:45:00.000Z"
}
```

**Success Criteria:**
- ✅ n8n workflow status: "success"
- ✅ Airtable HotLeads table updated
- ✅ Hot lead alert sent without errors

## Debugging Tips

**If scoring doesn't work:**
1. Check browser console for JavaScript errors
2. Check Network tab for failed API calls
3. Verify `/api/session` endpoint returns userId
4. Check event tracking in DevTools → Network

**If n8n webhook fails:**
1. Check Vercel logs: `vercel logs --prod`
2. Verify N8N_WEBHOOK_URL in .env.local
3. Check n8n workflow is active
4. Test webhook manually:
```bash
curl -X POST https://n8n.marleymcbride.co/webhook/hot-lead \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "name": "Test User",
    "score": 70,
    "whatTheyDid": "Test webhook"
  }'
```

**If database doesn't update:**
1. Check Railway connection string is correct
2. Verify user exists in `users` table
3. Check for database connection errors in logs
4. Verify `tier_interest` enum values match schema

## Expected Scoring Summary

| Event | Phase | Points | Running Total |
|-------|-------|--------|--------------|
| vsl_start | 1 | +5 | 5 |
| cta_click | 1 | +5 | 10 |
| email_submit | 1 | +10 | 20 |
| application_start | 1 | +30 | 50 |
| tier_select_whatsapp | **2** | → 70 | **70 (hot)** |
| payment_plan_select | **2** | → 85 | **85** |
| stripe_checkout_initiated | **2** | → 95 | **95** |
| payment_complete | **2** | → 100 | **100** |

**Phase Transition:** Occurs at 60pts threshold (between application_start and tier_select)
