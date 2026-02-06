# N8N Integration - Simple Overview

## What I've Done

I've updated your sales page code to send **webhook notifications** to n8n whenever important things happen. These webhooks will trigger automated workflows that connect to your other tools (Systeme.io, Stripe, email, etc.).

Think of it like this: **Your sales page tells n8n what happened, and n8n handles the rest.**

## What This Solves

**Problem**: You had blind spots - you didn't know:
- Which leads were hot and ready to buy
- Where people were dropping off in your funnel
- How to automatically follow up with the right people

**Solution**: Now your sales page automatically tells n8n:
- "Someone just became a hot lead!" → n8n alerts your sales team
- "Someone dropped off at 75% of the video" → n8n sends recovery email
- "Someone just paid!" → n8n updates everything and sends welcome email
- "Lead temperature changed from cold to warm" → n8n updates their tags in Systeme.io

## The 5 Key Workflows You Need in N8N

### 1. **Hot Lead Alerts** (🔥 Most Important)
**When**: A lead hits 70+ points

**What n8n does**:
- Sends immediate Slack/email notification to your sales team
- Tags them as "Hot Lead" in Systeme.io
- Adds them to "Call ASAP" email campaign

**Why**: Sales team can follow up immediately while they're hot

---

### 2. **Lead Temperature Segmentation**
**When**: A lead's temperature changes (cold → warm → hot)

**What n8n does**:
- Updates tags in Systeme.io: "Cold Lead", "Warm Lead", or "Hot Lead"
- Adds them to the right email nurture sequence
- If going from hot → cold (unusual): alerts team to intervene

**Why**: Right message to the right person at the right time

---

### 3. **Drop-off Recovery Emails**
**When**: Someone abandons at key points

**What n8n does**:
- VSL 25% watched and stopped → "Still interested?" email
- VSL 75% watched and stopped → "Almost there - finish watching" email
- Started application but didn't finish → "Complete your application" reminder
- Viewed pricing but didn't buy → "Have questions? Let's talk" email

**Why**: Recover lost revenue by following up at the right moment

---

### 4. **Payment Processing**
**When**: Someone completes payment in Stripe

**What n8n does**:
- Updates their status to "customer" in your database
- Tags as "Customer" in Systeme.io
- Adds to customer onboarding email sequence
- Sends welcome email immediately

**Why**: Seamless onboarding = happy customers

---

### 5. **Daily/Weekly Reports**
**When**: Automated schedule (daily 9am, weekly Monday 9am)

**What n8n does**:
- Fetches funnel metrics from your API
- Compiles report: top drop-off points, hot leads count, conversion rates
- Emails report to your team
- Posts summary to Slack

**Why**: You always know how your funnel is performing

---

## What You Need to Do

1. **Set up n8n webhooks** at: `https://n8n.marleymcbride.co/webhook/[event-name]`
   - See the technical spec below for all event names

2. **Create the 5 workflows** in n8n (your n8n specialist can do this)
   - I've provided a detailed technical spec for them

3. **Connect your tools** in n8n:
   - Systeme.io API
   - Stripe API
   - Email (or use Systeme.io)
   - Slack (for alerts)

4. **Test it**:
   - Submit an email → should trigger n8n workflow
   - Complete application → should trigger n8n workflow
   - Check that everything connects properly

---

## Summary

Your sales page now tracks everything and sends smart notifications to n8n. n8n handles the automation (tagging, emailing, alerting). You get:
- ✅ Instant hot lead notifications
- ✅ Automatic follow-up emails
- ✅ Lead segmentation in Systeme.io
- ✅ Payment processing automation
- ✅ Daily/weekly performance reports

**Next step**: Give the technical spec file to your n8n specialist to build the workflows.
