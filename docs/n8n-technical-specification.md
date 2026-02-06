# N8N Technical Specification - Limitless Life Integration

## Overview

This document specifies the n8n workflows required for the Limitless Life sales funnel integration. All webhooks are sent to:

**Base URL**: `https://n8n.marleymcbride.co/webhook/[event-name]`

**Webhook Payload Structure**:
```json
{
  "event": "event-name",
  "data": {
    // Event-specific data
  },
  "timestamp": "2026-02-06T21:00:00.000Z",
  "source": "limitless-sales-page"
}
```

---

## Workflow 1: Hot Lead Alerts 🔥

**Webhook**: `https://n8n.marleymcbride.co/webhook/hot-lead-alert`

**Trigger**: When a lead reaches ≥70 points (becomes "hot")

**Payload**:
```json
{
  "event": "hot-lead-alert",
  "data": {
    "userId": "uuid",
    "email": "lead@example.com",
    "score": 75,
    "firstName": "John",
    "lastName": "Doe",
    "lastActivity": "2026-02-06T20:00:00.000Z",
    "activitySummary": {
      "vslWatched": true,
      "vslCompletionPercent": 95,
      "applicationStarted": true,
      "applicationCompleted": false,
      "pricingViewed": true
    }
  },
  "timestamp": "2026-02-06T21:00:00.000Z",
  "source": "limitless-sales-page"
}
```

**Workflow Steps**:

1. **Receive Webhook** (Hot Lead Alert)
   - Event: `hot-lead-alert`

2. **Send Slack Notification** (or your preferred communication tool)
   ```
   Channel: #sales-alerts
   Message:
   🔥 HOT LEAD ALERT - 75 points

   Lead: John Doe (john@example.com)
   Last Activity: 6 minutes ago

   Activity Summary:
   • VSL Watched: Yes (95% complete)
   • Application Started: Yes
   • Pricing Viewed: Yes

   Action: Call immediately - ready to close!
   ```

3. **Send Email Notification to Sales Team**
   ```
   To: sales@yourdomain.com
   Subject: 🔥 Hot Lead - John Doe (75 points)
   Body: [Include all activity summary data]
   ```

4. **Add Tag in Systeme.io**
   - API Endpoint: `POST https://api.systeme.io/contact`
   - Add tag: "Hot Lead"
   - Systeme.io API Key: From your environment variables

5. **Add to Systeme.io Campaign** (Optional)
   - Add to "Hot Leads - Call ASAP" campaign
   - Triggers immediate outreach sequence

6. **Create Lead Alert in Database** (Optional)
   - API: `POST https://your-domain.com/api/admin/lead-alerts`
   - Headers: `x-admin-api-key: [your-key]`
   - Body: `{ userId, email, alertType: "hot_lead", data }`

---

## Workflow 2: Lead Temperature Segmentation

**Webhook**: `https://n8n.marleymcbride.co/webhook/lead-temperature-changed`

**Trigger**: When a lead's temperature changes

**Payload**:
```json
{
  "event": "lead-temperature-changed",
  "data": {
    "userId": "uuid",
    "email": "lead@example.com",
    "previousTemperature": "cold",
    "newTemperature": "warm",
    "score": 45,
    "firstName": "John",
    "lastName": "Doe"
  },
  "timestamp": "2026-02-06T21:00:00.000Z",
  "source": "limitless-sales-page"
}
```

**Workflow Steps**:

1. **Receive Webhook** (Temperature Changed)

2. **Branch Based on Temperature Change**:

   **Case A: cold → warm**
   - Add Systeme.io tag: "Warm Lead"
   - Remove Systeme.io tag: "Cold Lead" (if exists)
   - Add to nurture sequence in Systeme.io

   **Case B: warm → hot**
   - Add Systeme.io tag: "Hot Lead"
   - Remove Systeme.io tag: "Warm Lead"
   - Add to "Hot Lead Call ASAP" campaign

   **Case C: cold → hot** (skipped warm)
   - Add Systeme.io tag: "Hot Lead"
   - Remove "Cold Lead" tag
   - Add to "Hot Lead Call ASAP" campaign
   - Send notification to sales team

   **Case D: hot → warm** (unusual - monitor)
   - Add Systeme.io tag: "Warm Lead"
   - Remove "Hot Lead" tag
   - Alert team: "Lead cooled down - may need intervention"

   **Case E: Any → cold**
   - Add Systeme.io tag: "Cold Lead"
   - Remove previous temperature tags
   - Add to long-term nurture sequence

3. **Update Systeme.io Contact**
   - API: `POST https://api.systeme.io/contact`
   - Headers: `X-API-Key: [your-key]`
   - Body:
   ```json
   {
     "email": "{{data.email}}",
     "firstName": "{{data.firstName}}",
     "lastName": "{{data.lastName}}",
     "tags": ["{{newTemperature}} Lead"]
   }
   ```

---

## Workflow 3: Drop-off Recovery

**Webhook**: `https://n8n.marleymcbride.co/webhook/drop-off-recovery`

**Trigger**: When user drops off at key funnel points

**Payload**:
```json
{
  "event": "drop-off-recovery",
  "data": {
    "userId": "uuid",
    "email": "lead@example.com",
    "dropOffPoint": "vsl-25",
    "recoveryAction": "email",
    "metadata": {
      "progress": 25,
      "lastWatched": "2026-02-06T20:00:00.000Z"
    }
  },
  "timestamp": "2026-02-06T21:00:00.000Z",
  "source": "limitless-sales-page"
}
```

**Drop-off Points**:
- `vsl-25`: Dropped at 25% of VSL
- `vsl-75`: Dropped at 75% of VSL
- `vsl-95`: Dropped at 95% of VSL
- `application-started`: Started but didn't complete application
- `pricing-viewed`: Viewed pricing but didn't purchase

**Workflow Steps**:

1. **Receive Webhook** (Drop-off Recovery)

2. **Branch Based on Drop-off Point**:

   **Case A: vsl-25**
   - Wait: 1 hour
   - Send email via Systeme.io:
   ```
   Subject: Still thinking about it?
   Body: [Email template - highlight benefits, social proof]
   ```

   **Case B: vsl-75**
   - Wait: 30 minutes
   - Send email via Systeme.io:
   ```
   Subject: You're almost there! 🎯
   Body: [Email template - encourage to finish watching, reveal what's at the end]
   ```

   **Case C: vsl-95**
   - Wait: 15 minutes (high intent!)
   - Send email via Systeme.io:
   ```
   Subject: You saw 95% - here's the final piece 🏆
   Body: [Email template - special offer, urgency]
   ```

   **Case D: application-started**
   - Wait: 2 hours
   - Send email via Systeme.io:
   ```
   Subject: Complete your application
   Body: [Email template - help them finish, offer support]
   ```

   **Case E: pricing-viewed**
   - Wait: 1 hour
   - Send email via Systeme.io:
   ```
   Subject: Have questions about pricing?
   Body: [Email template - overcome objections, offer call]
   ```

3. **Send Recovery Email via Systeme.io**:
   - Use Systeme.io transactional email API
   - Or add to targeted email sequence
   - Track opens/clicks for optimization

4. **Optional: SMS Recovery** (if phone number available):
   - Use SMS API (Twilio, etc.)
   - Short, urgent message

---

## Workflow 4: Payment Processing

**Webhook**: `https://n8n.marleymcbride.co/webhook/payment-complete`

**Trigger**: When Stripe payment succeeds (via Stripe webhook → n8n)

**Payload**:
```json
{
  "event": "payment-complete",
  "data": {
    "userId": "uuid",
    "email": "customer@example.com",
    "amount": 997,
    "currency": "USD",
    "stripePaymentId": "pi_1234567890",
    "productName": "Limitless Life Program",
    "firstName": "John",
    "lastName": "Doe"
  },
  "timestamp": "2026-02-06T21:00:00.000Z",
  "source": "limitless-sales-page"
}
```

**Note**: This webhook is triggered from the Stripe webhook handler (see Workflow 5 below)

**Workflow Steps**:

1. **Receive Webhook** (Payment Complete)

2. **Verify Payment with Stripe** (Security check):
   - API: `GET https://api.stripe.com/v1/payment_intents/{{stripePaymentId}}`
   - Verify status = "succeeded"
   - Verify amount matches

3. **Update Systeme.io Contact**:
   - Add tag: "Customer"
   - Remove tags: "Hot Lead", "Warm Lead", "Cold Lead"
   - Update custom fields:
     - `total_purchase_value`: += amount
     - `customer_since`: [current date]
     - `last_purchase_date`: [current date]

4. **Send Welcome Email** via Systeme.io:
   ```
   Subject: Welcome to Limitless Life! 🎉
   Body: [Welcome email with onboarding steps]
   ```

5. **Add to Customer Onboarding Sequence** in Systeme.io

6. **Notify Team** (Slack/email):
   ```
   New Customer: John Doe ($997)
   Email: john@example.com
   Product: Limitless Life Program
   ```

7. **Update Internal Database** (Optional):
   - API: `PATCH https://your-domain.com/api/users/{{userId}}`
   - Body: `{ status: "customer" }`

---

## Workflow 5: Stripe Webhook Handler

**Webhook**: Set up in Stripe Dashboard → Webhooks → Add Endpoint

**URL**: `https://n8n.marleymcbride.co/webhook/stripe-webhook`

**Events to listen for**:
- `payment_intent.succeeded`
- `checkout.session.completed`

**Stripe Webhook Payload** (Stripe format):
```json
{
  "id": "evt_1234567890",
  "type": "payment_intent.succeeded",
  "data": {
    "object": {
      "id": "pi_1234567890",
      "amount": 99700,
      "currency": "usd",
      "customer": "cus_1234567890",
      "metadata": {
        "userId": "uuid",
        "email": "customer@example.com"
      }
    }
  }
}
```

**Workflow Steps**:

1. **Receive Stripe Webhook**
   - Verify webhook signature (critical for security)
   - Stripe verifies it's really from Stripe

2. **Extract Payment Data**:
   - Payment ID
   - Amount (convert from cents: amount / 100)
   - Currency
   - Customer email
   - User ID (from metadata)
   - Product ID (from metadata or description)

3. **Get Customer Details from Stripe**:
   - API: `GET https://api.stripe.com/v1/customers/{{customerId}}`
   - Extract: email, name, phone

4. **Trigger Payment Workflow**:
   - Call the Payment Complete workflow
   - Pass all extracted data

---

## Workflow 6: Daily/Weekly Reports

**Trigger**: Cron/Scheduled trigger in n8n
- Daily: Every day at 9:00 AM
- Weekly: Every Monday at 9:00 AM

**Note**: This is NOT triggered by a webhook - it runs on a schedule

**Workflow Steps**:

1. **Scheduled Trigger** (9:00 AM)

2. **Fetch Funnel Metrics** from your API:
   - API: `GET https://your-domain.com/api/analytics/funnel`
   - Headers: `x-admin-api-key: [your-key]`
   - Query params:
     - `startDate`: [7 days ago for daily, 30 days ago for weekly]
     - `endDate`: [now]
     - `breakdown`: `source,device`

3. **Fetch Hot Leads** from your API:
   - API: `GET https://your-domain.com/api/analytics/leads`
   - Headers: `x-admin-api-key: [your-key]`

4. **Compile Report Data**:
   - Total visitors
   - Conversion rate
   - Hot leads count
   - Biggest drop-off points
   - Top traffic sources
   - Device breakdown
   - Revenue (if available)

5. **Format Report**:
   ```
   📊 LIMITLESS LIFE FUNNEL REPORT
   Period: [Last 7 days / Last 30 days]

   SUMMARY
   -------
   • Total Visitors: [count]
   • Conversions: [count]
   • Conversion Rate: [%]
   • Hot Leads: [count]

   BIGGEST DROP-OFFS
   -----------------
   1. VSL 75%: [count] dropped ([%])
   2. Application Start: [count] dropped ([%])

   TOP TRAFFIC SOURCES
   -------------------
   1. [source]: [count] visitors ([%] conv.)
   2. [source]: [count] visitors ([%] conv.)

   DEVICE BREAKDOWN
   ----------------
   • Desktop: [count] ([%] conv.)
   • Mobile: [count] ([%] conv.)
   ```

6. **Send Report Email**:
   - To: team@yourdomain.com
   - Subject: "Daily Funnel Report" or "Weekly Funnel Report"
   - Body: [Formatted report]
   - Attach: CSV export of raw data (optional)

7. **Post to Slack**:
   - Channel: #funnel-reports
   - Message: [Key metrics summary]

---

## Additional Event Webhooks (For Reference)

These webhooks are sent by your sales page but may not need dedicated workflows:

### Email Submit
**Webhook**: `https://n8n.marleymcbride.co/webhook/email-submit`
**Usage**: Tag as "Email Captured" in Systeme.io, add to welcome sequence

### Application Start
**Webhook**: `https://n8n.marleymcbride.co/webhook/application-start`
**Usage**: Tag as "Application Started" in Systeme.io, add to "Complete Application" sequence

### Application Step
**Webhook**: `https://n8n.marleymcbride.co/webhook/application-step`
**Usage**: Track progress in Systeme.io custom fields

### Application Complete
**Webhook**: `https://n8n.marleymcbride.co/webhook/application-complete`
**Usage**: Tag as "Application Complete" in Systeme.io, alert team to review

### VSL Events
- `vsl-play-started`: Track VSL engagement
- `vsl-progress-milestone`: Track progress (25%, 50%, 75%, 90%, 95%)
- `vsl-completed`: Tag as "VSL Completed" in Systeme.io
- `vsl-dropped-off`: Trigger drop-off recovery workflow

---

## API Endpoints Available

Your sales page provides these admin APIs for n8n to query:

### Get Funnel Metrics
```
GET https://your-domain.com/api/analytics/funnel
Headers: x-admin-api-key: [your-key]
Query: startDate, endDate, breakdown
```

### Get Leads by Temperature
```
GET https://your-domain.com/api/analytics/leads
Headers: x-admin-api-key: [your-key]
Returns: { hot: [], warm: [], cold: [] }
```

### Recalculate Lead Score
```
POST https://your-domain.com/api/analytics/recalculate-score
Headers: x-admin-api-key: [your-key]
Body: { userId: "uuid" }
```

---

## Systeme.io API Integration

All Systeme.io API calls require:

**Base URL**: `https://api.systeme.io`

**Headers**:
```
X-API-Key: [your-systemeio-api-key]
Content-Type: application/json
```

**Key Endpoints**:

### Create/Update Contact
```
POST /contact
Body: {
  email: "user@example.com",
  firstName: "John",
  lastName: "Doe",
  fields: {
    custom_field_name: "value"
  }
}
```

### Add Tags to Contact
```
POST /contact/{contactId}/tags
Body: {
  tagIds: ["tag-id-1", "tag-id-2"]
}
```

### Get All Tags
```
GET /tags
Returns: [{ id, name }, ...]
```

### Add to Campaign
```
POST /contact/{contactId}/campaigns
Body: {
  campaignIds: ["campaign-id"]
}
```

---

## Testing Checklist

Before going live, test each workflow:

- [ ] Hot Lead Alert: Submit test email → trigger manual score update → verify Slack notification
- [ ] Temperature Change: Update test user score → verify Systeme.io tags updated
- [ ] Drop-off Recovery: Trigger VSL drop-off → verify recovery email sent
- [ ] Payment: Create test Stripe payment → verify customer onboarding flow
- [ ] Reports: Manually trigger report workflow → verify email received with correct data

---

## Security Notes

1. **Verify webhook signatures** for all incoming webhooks (especially Stripe)
2. **Use API keys** for all external API calls
3. **Never log sensitive data** (credit card numbers, full API keys)
4. **Implement rate limiting** on n8n workflows if needed
5. **Monitor webhook failures** and implement retry logic

---

## Questions?

If you need clarification on any workflow or webhook format, refer to the code comments in:
- `/src/lib/n8nWebhooks.ts` - All webhook definitions
- `/src/lib/scoring.ts` - Lead scoring and temperature logic
- `/src/lib/analytics.ts` - Event tracking rules
