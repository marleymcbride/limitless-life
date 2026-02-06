# Limitless Life 8-Figure Optimization Design

**Project:** Limitless Life Sales Funnel Optimization
**Date:** 2026-02-06
**Goal:** Transform current sales funnel into state-of-the-art, 8-figure ready conversion machine
**Approach:** Quality & Scalability - build it right the first time
**Budget:** Bootstrap/MVP - $0 additional tool costs

---

## Executive Summary

Transform the existing Limitless Life sales funnel into a comprehensive, data-driven conversion machine with full funnel visibility, robust integrations, elite performance, and clean architecture.

**Primary Problem:** Blind spots - poor visibility into funnel (can't see where leads drop off, what they watch, where friction occurs)

**Secondary Problems:**
- Performance issues affecting conversions
- Fragmented integrations (webhooks fail, data doesn't sync)
- Code maintainability (675-line monolithic component, fear of breaking things)
- Poor mobile experience

---

## Phase 1: Analytics & Visibility Architecture

### Problem Statement
Currently flying blind - can see payments in Stripe and get some n8n webhooks, but no visibility into:
- Who watched the VSL to 90%?
- Where do people drop off (video → email → application → payment)?
- What's the actual conversion rate at each step?
- Which marketing channels produce the best customers?

### Solution Architecture

#### 1.1 Session-Based User Identity Layer

**Technical Specification:**
- Generate anonymous session IDs on first visit (UUID v4, cookie-based, no fingerprinting)
- Cookie configuration: HttpOnly, Secure, SameSite=Lax, 30-day expiry
- Session schema:
  ```sql
  CREATE TABLE sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) NULL,
    fingerprint TEXT,
    first_seen TIMESTAMP DEFAULT NOW(),
    last_seen TIMESTAMP DEFAULT NOW(),
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    utm_content TEXT,
    utm_term TEXT,
    referrer TEXT,
    device_type TEXT,
    browser TEXT,
    ip_address TEXT,
    country_code TEXT
  );

  CREATE INDEX idx_sessions_user_id ON sessions(user_id);
  CREATE INDEX idx_sessions_last_seen ON sessions(last_seen);
  ```

- Cross-device session stitching:
  - When email submitted, merge all sessions with matching email into one user
  - Update all historical events with new user_id
  - Preserve first-touch attribution forever

**Implementation Steps:**
1. Create `lib/session.ts` - session management utilities
2. Create middleware to initialize/update session on each request
3. Implement session stitching logic when email captured
4. Add UTM parameter capture from URL query params
5. Extract device/browser info from user-agent

**Testable Outcomes:**
- Anonymous users tracked with session ID
- Email submission merges previous sessions
- UTM parameters captured and persisted
- Cross-device journey visible in dashboard

---

#### 1.2 Event-Driven Analytics Engine

**Technical Specification:**
- Track all meaningful user actions with structured events
- Event schema:
  ```sql
  CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES sessions(id) NOT NULL,
    user_id UUID REFERENCES users(id) NULL,
    event_type TEXT NOT NULL,
    event_data JSONB,
    created_at TIMESTAMP DEFAULT NOW()
  );

  CREATE INDEX idx_events_session_id ON events(session_id);
  CREATE INDEX idx_events_user_id ON events(user_id);
  CREATE INDEX idx_events_type ON events(event_type);
  CREATE INDEX idx_events_created_at ON events(created_at DESC);

  -- Event types to track:
  -- page_view, vsl_start, vsl_milestone (25, 50, 75, 90, 95), vsl_complete
  -- email_submit, application_start, application_step, application_complete
  -- pricing_view, cta_click, scroll_depth, time_on_page
  ```

- Event tracking API: `/api/analytics/events`
  - POST endpoint receives: `{ event_type, event_data, timestamp? }`
  - Server validates session, enriches with user_id if available
  - Writes to database asynchronously for performance
  - Returns 200 OK immediately (fire-and-forget)

**Implementation Steps:**
1. Create database tables and indexes
2. Create `lib/analytics.ts` - event tracking utilities
3. Create `/api/analytics/events` API route
4. Create `hooks/useAnalytics.ts` - React hook for event tracking
5. Instrument all key components with event tracking:
   - VSL player: milestones at 25%, 50%, 75%, 90%, 95%, 100%
   - Email form: submit event
   - Application: start, each step, complete
   - CTAs: click events
   - Scroll depth: 25%, 50%, 75%, 100%

**Testable Outcomes:**
- All events stored in database with proper relationships
- Dashboard shows real-time event stream
- Funnel visualization possible from event data

---

#### 1.3 Lead Scoring System

**Technical Specification:**
- Dynamic scoring based on engagement signals
- Score calculation rules:
  ```typescript
  const scoringRules = {
    vsl_milestone_25: 5,
    vsl_milestone_50: 10,
    vsl_milestone_75: 20,
    vsl_milestone_90: 30,
    vsl_milestone_95: 50,
    vsl_complete: 60,
    email_submit: 10,
    application_start: 30,
    application_step: 5, // per step
    application_complete: 40,
    pricing_view: 20,
    cta_click: 5,
    time_on_site_2min: 5,
    time_on_site_5min: 10,
  };

  const hotLeadThreshold = 70;
  const warmLeadThreshold = 40;
  ```

- User schema with scoring:
  ```sql
  CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    first_name TEXT,
    last_name TEXT,
    phone TEXT,
    lead_score INTEGER DEFAULT 0,
    lead_temperature TEXT, -- 'cold', 'warm', 'hot'
    status TEXT DEFAULT 'prospect', -- 'prospect', 'application_started', 'applied', 'customer'
    first_seen TIMESTAMP DEFAULT NOW(),
    last_seen TIMESTAMP DEFAULT NOW(),
    created_at TIMESTAMP DEFAULT NOW()
  );

  CREATE INDEX idx_users_email ON users(email);
  CREATE INDEX idx_users_lead_score ON users(lead_score DESC);
  CREATE INDEX idx_users_status ON users(status);
  ```

- Real-time score updates:
  - Recalculate score on each new event
  - Update lead_temperature based on thresholds
  - Trigger hot lead alert when crossing threshold

**Implementation Steps:**
1. Update user schema with lead scoring fields
2. Create `lib/scoring.ts` - scoring calculation logic
3. Create database trigger or API endpoint to update scores
4. Update event tracking to trigger score recalculation
5. Create `hooks/useLeadScoring.ts` for real-time score access

**Testable Outcomes:**
- All users have accurate lead scores
- Lead temperature updates automatically
- Dashboard shows scored users sorted by score

---

#### 1.4 Real-Time Funnel Visualization Dashboard

**Technical Specification:**
- Admin dashboard at `/admin` (password protected)
- Funnel stages and metrics:
  1. **Visitors** - Unique sessions
  2. **VSL Started** - Clicked play
  3. **VSL 90%+** - Watched to 90% milestone
  4. **Email Captured** - Submitted email
  5. **Application Started** - Started application
  6. **Application Complete** - Finished application
  7. **Payment** - Converted to customer

- For each stage show:
  - Count (absolute number)
  - Conversion rate from previous stage
  - Drop-off rate (lost users)
  - Dollar value attached (how much revenue lost)

- Revenue attribution by source:
  - Group by utm_source/utm_medium/utm_campaign
  - Show customer count, total revenue, CPA
  - Calculate ROI per channel

- Hot lead feed:
  - Real-time list of leads scoring ≥70
  - Show full profile: scores, events watched, application status
  - Time-sorted (most recent first)

**Implementation Steps:**
1. Create `/api/analytics/funnel` - returns funnel data
2. Create `/api/analytics/attribution` - returns revenue by source
3. Create `/api/analytics/hot-leads` - returns hot leads
4. Create `/app/admin/page.tsx` - dashboard UI
5. Create components:
   - `FunnelVisualization.tsx` - funnel chart with metrics
   - `AttributionTable.tsx` - source attribution table
   - `HotLeadsFeed.tsx` - live hot lead stream
6. Add authentication middleware (simple password for MVP)

**Testable Outcomes:**
- Dashboard shows complete funnel with conversion rates
- Can see exact drop-off points with dollar values
- Attribution data shows best/worst performing channels
- Hot leads appear in real-time feed

---

#### 1.5 Smart Recovery Systems

**Technical Specification:**

**A. Form Abandonment Auto-Save**
- Application form auto-saves progress to database
- Schema:
  ```sql
  CREATE TABLE application_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) NOT NULL,
    submission_data JSONB NOT NULL,
    current_step INTEGER DEFAULT 1,
    is_complete BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  );
  ```

- Auto-save on every field change (debounced, 500ms)
- On return to application, load saved progress
- Allow user to resume where they left off

**B. Drop-Off Email Triggers**
- Detect abandonment patterns:
  - Watched VSL to 90%+ but no email submitted
  - Started application but didn't complete in 24 hours
  - Started application, didn't complete, visited again
- Trigger n8n workflows with user context
- n8n sends personalized recovery emails with direct links

**C. Speed-to-Lead Alerts**
- When lead score crosses 70 threshold:
  - Trigger n8n webhook with full lead profile
  - n8n sends Slack notification to team
  - n8n creates task in Systeme.io for immediate follow-up
  - Optional: SMS notification for fastest response

**Implementation Steps:**
1. Create `lib/auto-save.ts` - auto-save utilities
2. Update application form with auto-save on field change
3. Create `/api/analytics/abandonment-check` - detects abandoned users
4. Create n8n workflows for recovery sequences
5. Create `/api/webhooks/lead-score-alert` - trigger for hot leads
6. Update lead scoring to trigger webhook on threshold crossing

**Testable Outcomes:**
- Application progress saved automatically
- Users can resume abandoned applications
- Recovery emails sent for abandonment patterns
- Team notified instantly of hot leads

---

### Phase 1 Summary

**Database Tables Created:**
- sessions
- users
- events
- application_submissions

**API Routes Created:**
- `/api/analytics/events` - event tracking
- `/api/analytics/funnel` - funnel data
- `/api/analytics/attribution` - revenue attribution
- `/api/analytics/hot-leads` - hot lead feed
- `/api/analytics/abandonment-check` - abandonment detection
- `/api/webhooks/lead-score-alert` - hot lead alerts

**Components Created:**
- `hooks/useAnalytics.ts` - event tracking hook
- `hooks/useLeadScoring.ts` - lead scoring hook
- `hooks/useSession.ts` - session management hook
- `/app/admin/page.tsx` - admin dashboard
- `FunnelVisualization.tsx` - funnel chart
- `AttributionTable.tsx` - attribution table
- `HotLeadsFeed.tsx` - hot lead stream

**Build Time Estimate:** 3-4 days

---

## Phase 2: Integration & Data Flow Architecture

### Problem Statement
Current n8n webhooks to Systeme.io are fragmented and unreliable. The `/application` route exists but isn't fully integrated. Data loss occurs between systems, and speed-to-lead suffers.

### Solution Architecture

#### 2.1 Centralized Webhook Management

**Technical Specification:**
- Unified webhook handler at `/api/webhooks`
- Queue-based delivery with retry logic:
  ```typescript
  // Webhook queue table
  CREATE TABLE webhook_queue (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    payload JSONB NOT NULL,
    target_url TEXT NOT NULL,
    attempt_count INTEGER DEFAULT 0,
    max_attempts INTEGER DEFAULT 3,
    status TEXT DEFAULT 'pending', -- 'pending', 'sent', 'failed'
    last_attempt_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
  );

  CREATE INDEX idx_webhook_queue_status ON webhook_queue(status, created_at);
  ```

- Retry strategy:
  - Exponential backoff: 1min, 5min, 15min
  - 3 retry attempts before marking as failed
  - Alert on final failure

- Dual-write strategy:
  1. Write to local database first (source of truth)
  2. Queue webhook for delivery to external systems
  3. Never lose data even if external systems are down

**Implementation Steps:**
1. Create webhook queue schema
2. Create `lib/webhook-queue.ts` - queue management utilities
3. Create `/api/webhooks` - unified webhook receiver
4. Create background job processor (Vercel Cron or custom)
5. Implement retry logic with exponential backoff
6. Add failure alerting (n8n → email/Slack)

**Testable Outcomes:**
- All events stored locally before external delivery
- Webhooks retried automatically on failure
- Failed webhooks alert team for manual intervention
- No data loss even during outages

---

#### 2.2 Enhanced Systeme.io CRM Integration

**Technical Specification:**

**A. Complete User Profile Sync**
- When email captured, sync to Systeme.io:
  - First name, last name, email, phone
  - Lead score and temperature
  - UTM attribution (source, medium, campaign, content)
  - Custom fields: `lead_score`, `lead_temperature`, `utm_source`, `utm_medium`, `utm_campaign`, `first_seen`, `last_seen`

**B. Real-Time Behavior Updates**
- Every significant event updates Systeme.io contact:
  - VSL milestones → update `vsl_progress` field
  - Application steps → update `application_progress` field
  - Lead score changes → update `lead_score` field
  - Status changes → update tags

**C. Automated Tagging**
- Auto-tag based on behavior:
  - `hot-lead` - score ≥70
  - `vsl-complete` - watched 95%+
  - `app-started` - started application
  - `app-completed` - finished application
  - `customer` - made payment

**D. Two-Way Sync**
- Pull updates from Systeme.io webhooks:
  - Email opened
  - Link clicked
  - Payment made
  - Tag added/removed
- Store engagement data locally for analysis

**Implementation Steps:**
1. Research Systeme.io API documentation
2. Create `lib/systemeio.ts` - Systeme.io API client
3. Create mapping: local user fields → Systeme.io fields
4. Implement contact creation/update on email submit
5. Implement real-time updates on key events
6. Create tag management logic
7. Set up Systeme.io webhook receiver for two-way sync
8. Test all sync scenarios

**Testable Outcomes:**
- Email submit creates contact in Systeme.io with all fields
- Lead score visible in Systeme.io
- UTM attribution visible in Systeme.io
- Tags auto-applied based on behavior
- Systeme.io engagement data synced locally

---

#### 2.3 Application Flow Integration

**Technical Specification:**
- Multi-step application with progress tracking
- Steps: Basic Info → Health Goals → Commitment → Payment
- Real-time sync to Systeme.io on each step completion

- On application start:
  - Update user status: `prospect` → `application_started`
  - Add tag: `app-started`
  - Create draft application in Systeme.io

- On each step completion:
  - Update application_progress field in Systeme.io
  - Store step data locally in application_submissions

- On final submission:
  - Update user status: `application_started` → `applied`
  - Add tag: `app-completed`
  - Create opportunity/deal in Systeme.io with full application data
  - Trigger team notification (Slack/email)
  - Send confirmation email with next steps

**Implementation Steps:**
1. Update application form with step-by-step UI
2. Create `/api/application/start` - initialize application
3. Create `/api/application/step` - save step progress
4. Create `/api/application/submit` - final submission
5. Update Systeme.io client with deal/opportunity creation
6. Create n8n workflow for team notifications
7. Create confirmation email template
8. Test complete application flow

**Testable Outcomes:**
- Application progress saved to database
- Each step updates Systeme.io contact
- Final submission creates deal in Systeme.io
- Team notified of completed application
- Confirmation email sent

---

#### 2.4 Stripe ↔ CRM Connection

**Technical Specification:**
- Stripe webhook handler: `/api/webhooks/stripe`
- Events to handle:
  - `checkout.session.completed` - Payment successful
  - `customer.subscription.created` - Subscription started
  - `invoice.payment_succeeded` - Recurring payment
  - `payment_intent.succeeded` - One-time payment

- On payment event:
  1. Retrieve session data from Stripe
  2. Get customer email
  3. Find user by email in local database
  4. Update user status: `applied` → `customer`
  5. Store payment data:
     ```sql
     CREATE TABLE payments (
       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       user_id UUID REFERENCES users(id) NOT NULL,
       stripe_payment_intent_id TEXT UNIQUE,
       stripe_customer_id TEXT,
       amount INTEGER, -- in cents
       currency TEXT,
       status TEXT,
       payment_method TEXT,
       created_at TIMESTAMP DEFAULT NOW()
     );
     ```
  6. Sync to Systeme.io:
     - Update status to `customer`
     - Add tag: `customer`
     - Add payment amount to custom field
     - Link to deal/opportunity
  7. Update attribution: link payment to original UTM source

- Revenue calculation:
  - Group payments by utm_source/utm_medium/utm_campaign
  - Calculate: customer count, total revenue, average revenue, CPA

**Implementation Steps:**
1. Create payments schema
2. Create `/api/webhooks/stripe` - Stripe webhook handler
3. Implement Stripe webhook signature verification
4. Create `lib/stripe.ts` - Stripe API client
5. Implement payment processing logic
6. Update user status and sync to Systeme.io
7. Create revenue attribution queries
8. Test with Stripe test mode

**Testable Outcomes:**
- Stripe payments update user to customer
- Payment data stored locally
- Systeme.io updated with customer status
- Revenue attribution calculated correctly

---

#### 2.5 Speed-to-Lead Automation

**Technical Specification:**

**Hot Lead Triggers:**
- Lead score ≥70 triggers immediate notification:
  - User profile: name, email, phone, scores
  - Journey: events watched, application status, last activity
  - Attribution: source, medium, campaign

- Notification channels:
  1. Slack message to #sales-leads channel with full profile
  2. Email to sales team
  3. Systeme.io task: "Call within 15 minutes"
  4. Optional: SMS to sales team phone

**Smart Routing:**
- Different alert types based on lead quality:
  - Score 70-89: "Warm lead - watch for signals"
  - Score 90+: "Hot lead - contact immediately"
  - Application complete: "Application ready - review now"
  - Payment started: "Payment in progress - be available"

- Response time tracking:
  ```sql
  CREATE TABLE lead_alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) NOT NULL,
    alert_type TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT NOW(),
    first_contact_at TIMESTAMP,
    response_time_seconds INTEGER
  );
  ```

**Implementation Steps:**
1. Create lead alerts schema
2. Create `/api/webhooks/lead-score-alert` - hot lead trigger
3. Update lead scoring to call webhook on threshold cross
4. Create n8n workflow for notifications:
   - Slack integration
   - Email integration
   - SMS integration (optional)
5. Create Systeme.io task creation logic
6. Build response time tracking
7. Test all alert types

**Testable Outcomes:**
- Hot leads trigger instant notifications
- Team receives full lead profile
- Tasks created in Systeme.io
- Response times tracked for optimization

---

#### 2.6 Business Intelligence Dashboard

**Technical Specification:**
- Enhanced admin dashboard with BI metrics
- Real-time and historical data

**Metrics to Display:**

1. **Lead Volume by Source** (real-time)
   - Count of new leads by utm_source/utm_medium
   - Chart: lead volume over time
   - Top/bottom performing sources

2. **Application Completion Rate**
   - Started vs completed applications
   - Drop-off by step
   - Time to complete

3. **Sales by Channel/Attribution**
   - Total revenue by source
   - Customer count by source
   - CPA by source
   - ROI by source (revenue / spend)

4. **Funnel Drop-off with Dollar Value**
   - Each stage shows: lost leads, lost revenue
   - Example: "500 people dropped off at email stage, $125,000 potential revenue lost"

5. **Speed-to-Lead Metrics**
   - Average response time to hot leads
   - Response time distribution
   - Correlation: response time → conversion rate

**Implementation Steps:**
1. Create `/api/analytics/bi` - BI data endpoint
2. Create aggregation queries for all metrics
3. Create dashboard components:
   - `LeadVolumeChart.tsx` - leads by source over time
   - `ApplicationFunnel.tsx` - application completion
   - `SalesAttribution.tsx` - sales by channel
   - `DropOffAnalysis.tsx` - funnel drop-off with $ value
   - `ResponseTimeMetrics.tsx` - speed-to-lead stats
4. Update admin dashboard with new components
5. Add date range filters
6. Add export to CSV functionality

**Testable Outcomes:**
- Dashboard shows all BI metrics
- Real-time updates as data flows in
- Can identify best/worst performing channels
- Can see revenue impact of funnel improvements

---

### Phase 2 Summary

**Database Tables Created:**
- webhook_queue
- payments
- lead_alerts

**API Routes Created:**
- `/api/webhooks` - unified webhook receiver
- `/api/webhooks/stripe` - Stripe webhooks
- `/api/webhooks/lead-score-alert` - hot lead alerts
- `/api/application/start` - start application
- `/api/application/step` - save application step
- `/api/application/submit` - submit application
- `/api/analytics/bi` - business intelligence data

**Components Created:**
- `lib/webhook-queue.ts` - webhook queue management
- `lib/systemeio.ts` - Systeme.io API client
- `lib/stripe.ts` - Stripe API client
- `LeadVolumeChart.tsx` - lead volume visualization
- `ApplicationFunnel.tsx` - application funnel
- `SalesAttribution.tsx` - sales attribution table
- `DropOffAnalysis.tsx` - drop-off with dollar value
- `ResponseTimeMetrics.tsx` - speed-to-lead metrics

**Build Time Estimate:** 3-4 days

---

## Phase 3: Performance & Mobile Optimization

### Problem Statement
Current 675-line monolithic page component, video loading issues on mobile, large bundle sizes, no lazy loading. Performance is killing conversions.

### Solution Architecture

#### 3.1 Code Splitting & Lazy Loading

**Technical Specification:**
- Break `app/page.tsx` (675+ lines) into section components
- Lazy load sections with `React.lazy()` and `Suspense`
- Load sections as they enter viewport using Intersection Observer

**Component Structure:**
```
/app/page.tsx (main composition, ~50 lines)
/components/sales-page/
  ├── HeroSection.tsx
  ├── ProblemSection.tsx
  ├── StorySection.tsx
  ├── ValuePropsSection.tsx
  ├── TestimonialsSection.tsx
  ├── ProgramDetailsSection.tsx
  ├── PricingSection.tsx
  ├── FAQSection.tsx
  └── FinalCTASection.tsx
```

**Lazy Loading Strategy:**
```typescript
// app/page.tsx
import { lazy, Suspense } from 'react';
import { SectionPlaceholder } from '@/components/ui/section-placeholder';

const HeroSection = lazy(() => import('@/components/sales-page/HeroSection'));
const ProblemSection = lazy(() => import('@/components/sales-page/ProblemSection'));
// ... other sections

export default function SalesPage() {
  return (
    <>
      <Suspense fallback={<SectionPlaceholder />}>
        <HeroSection />
      </Suspense>
      <Suspense fallback={<SectionPlaceholder />}>
        <ProblemSection />
      </Suspense>
      {/* ... other sections */}
    </>
  );
}
```

- Priority loading: HeroSection loads immediately (above fold)
- Other sections: Intersection Observer triggers load when approaching viewport
- Placeholder: Simple skeleton while loading

**Implementation Steps:**
1. Extract each section from `page.tsx` into separate component
2. Test each section in isolation
3. Implement lazy loading with Suspense
4. Create SectionPlaceholder component
5. Add Intersection Observer for viewport-triggered loading
6. Test progressive loading with network throttling

**Testable Outcomes:**
- Initial bundle reduced by 60-70%
- Page loads with only HeroSection initially
- Other sections load as user scrolls
- No layout shift during lazy loads

---

#### 3.2 Video Optimization

**Technical Specification:**

**A. Adaptive Bitrate Streaming**
- Detect device type and screen size
- Serve different video quality:
  - Mobile (<768px): 720p, ~1.5Mbps
  - Tablet (768-1024px): 1080p, ~3Mbps
  - Desktop (>1024px): 1080p, ~5Mbps
- Use Bunny.net stream API or multiple video sources

**B. Preload Strategy**
- Initial state: Show poster image with play button
- Load video only on user interaction (click play)
- Preload: "metadata" only (not full video)
- After first play: Preload "auto" for smooth replay

**C. Bunny.net CDN Optimization**
- Enable Bunny.net optimizer features:
  - Adaptive bitrate
  - HTTP/2 delivery
  - Global edge caching
  - Video thumbnail generation
- Configure optimal caching headers

**D. Mobile-Specific Video Controls**
- Larger controls (min 44x44px)
- Touch-friendly scrubbing
- Landscape mode optimization
- Click-to-unmute (current feature, keep)

**Implementation Steps:**
1. Detect device type with `useMediaQuery` hook
2. Create `lib/video-config.ts` - video source selector
3. Update video player to use adaptive sources
4. Set preload="metadata" initially
5. Update to preload="auto" after first play
6. Configure Bunny.net settings
7. Test on multiple devices with network throttling

**Testable Outcomes:**
- Mobile loads 720p video, desktop loads 1080p
- Video doesn't load until play button clicked
- Smooth playback after first interaction
- Mobile controls are touch-friendly

---

#### 3.3 Mobile-Specific Optimizations

**Technical Specification:**

**A. Touch-Friendly CTAs**
- Min tap target size: 44x44px (WCAG AA standard)
- Adequate spacing between buttons (min 8px)
- Larger touch targets on mobile (48-48px recommended)

**B. Simplified Mobile Layout**
- Remove non-critical sections on mobile:
  - Collapse some testimonials into carousel
  - Simplify FAQ to top 5 questions with "show more"
  - Hide some social proof elements below fold
- Use `hidden md:block` pattern for desktop-only sections

**C. Progressive Disclosure**
- Show key info first, expand on tap
- Example: FAQ shows 3 questions, tap to expand more
- Example: Testimonials show 3, tap "load more"

**D. Mobile-First Typography**
- Larger base font size on mobile (16px minimum)
- Increased line height (1.6-1.8) for readability
- Shorter paragraphs (2-3 sentences)

**Implementation Steps:**
1. Audit all CTAs for touch target size
2. Update button components with mobile-specific sizing
3. Create mobile variants of sections (collapsed/simplified)
4. Implement progressive disclosure for long content
5. Adjust typography for mobile readability
6. Test on actual mobile devices

**Testable Outcomes:**
- All CTAs easily tappable on mobile
- Page feels lighter, faster on mobile
- Content is readable without zooming
- Conversion rate improves on mobile

---

#### 3.4 Image & Asset Optimization

**Technical Specification:**

**A. Next.js Image Optimization**
- Convert all `<img>` to `<Image />` from `next/image`
- Configure image domains in `next.config.js`
- Enable sharp optimizer for faster processing

**B. Modern Image Formats**
- Serve WebP with JPEG/PNG fallback
- Use AVIF if supported (better compression)
- Configure: `formats: ['image/avif', 'image/webp']`

**C. Responsive Images**
- Serve different sizes per device:
  - Mobile: 640px width
  - Tablet: 1024px width
  - Desktop: 1920px width
- Use `sizes` attribute for responsive loading

**D. Lazy Loading**
- Lazy load all images below fold
- Use `loading="lazy"` on regular images
- Use Next.js `priority` for above-fold images

**E. Font Optimization**
- Subset fonts to include only used characters
- Use `next/font` for automatic optimization
- Remove unused icon imports

**Implementation Steps:**
1. Replace all `<img>` with `<Image />`
2. Configure image domains in next.config.js
3. Convert images to WebP/AVIF format
4. Add responsive sizes to all images
5. Enable lazy loading for below-fold images
6. Audit and remove unused fonts/icons
7. Test with Lighthouse for image optimization

**Testable Outcomes:**
- All images served in modern formats (WebP/AVIF)
- Images load at appropriate sizes for each device
- Below-fold images lazy loaded
- Lighthouse image score: 95+

---

#### 3.5 Performance Monitoring

**Technical Specification:**

**A. Core Web Vitals Tracking**
- Track LCP (Largest Contentful Paint) - target: <2.5s
- Track FID (First Input Delay) - target: <100ms
- Track CLS (Cumulative Layout Shift) - target: <0.1
- Use Web Vitals library: `web-vitals`

**B. Real User Monitoring (RUM)**
- Capture actual user performance data
- Store in events table:
  ```typescript
  event_type: 'core_web_vitals'
  event_data: {
    lcp: number,
    fid: number,
    cls: number,
    device_type: string,
    connection_type: string,
  }
  ```
- Aggregate in dashboard

**C. Performance Budget**
- Set budgets for:
  - Initial bundle: <200KB
  - Each lazy chunk: <100KB
  - Total page weight: <2MB
- Alert when budgets exceeded

**D. Lighthouse CI**
- Run Lighthouse in CI/CD
- Block deployment if score drops below threshold
- Target scores:
  - Performance: 90+
  - Accessibility: 95+
  - Best Practices: 90+
  - SEO: 95+

**Implementation Steps:**
1. Install `web-vitals` package
2. Create `lib/performance.ts` - performance tracking
3. Add Core Web Vitals to analytics events
4. Create performance budget in next.config.js
5. Set up Lighthouse CI (GitHub Actions)
6. Add performance metrics to admin dashboard
7. Configure alerts for budget violations

**Testable Outcomes:**
- Core Web Vitals tracked for all users
- Dashboard shows real-user performance data
- Performance budgets enforced in CI
- Lighthouse scores consistently 90+

---

### Phase 3 Summary

**Component Refactoring:**
- Extract 10+ section components from `page.tsx`
- Implement lazy loading with Suspense
- Create SectionPlaceholder component
- Mobile-specific variants of sections

**Performance Improvements:**
- Bundle size reduced by 60-70%
- Adaptive video streaming
- Image optimization (WebP/AVIF, responsive)
- Core Web Vitals tracking
- Performance budgets enforced

**Build Time Estimate:** 2-3 days

---

## Phase 4: Technical Refactoring & Scalability

### Problem Statement
Current 675-line main component, no separation of concerns, difficult to maintain, fear of breaking things. Code quality impedes feature development.

### Solution Architecture

#### 4.1 Component Architecture Refactoring

**Technical Specification:**

**Current Structure:**
```
app/page.tsx - 675+ lines (monolithic)
components/ - 100+ components, unclear organization
```

**Target Structure:**
```
app/
├── page.tsx - Clean composition (~50 lines)
├── layout.tsx - Root layout
├── admin/
│   └── page.tsx - Admin dashboard
└── (other routes)

components/
├── sales-page/ - Sales page sections
│   ├── hero/ - Hero section
│   ├── problem/ - Problem agitation
│   ├── story/ - Founder story
│   ├── value-props/ - Value propositions
│   ├── testimonials/ - Social proof
│   ├── program-details/ - Program info
│   ├── pricing/ - Pricing section
│   ├── faq/ - FAQ section
│   └── cta/ - Call to action
├── ui/ - Reusable UI components
│   ├── button.tsx
│   ├── input.tsx
│   ├── video-player.tsx
│   └── (other primitives)
├── admin/ - Admin dashboard components
│   ├── funnel-visualization.tsx
│   ├── attribution-table.tsx
│   ├── hot-leads-feed.tsx
│   └── (other admin components)
└── forms/ - Form components
    ├── email-form.tsx
    └── application-form.tsx

hooks/ - Custom React hooks
├── useAnalytics.ts - Event tracking
├── useSession.ts - Session management
├── useLeadScoring.ts - Lead scoring
├── useVideoProgress.ts - Video tracking
└── useAutoSave.ts - Form auto-save

lib/ - Utilities and helpers
├── analytics.ts - Analytics utilities
├── session.ts - Session management
├── scoring.ts - Scoring logic
├── video-config.ts - Video configuration
├── webhook-queue.ts - Webhook queue
├── systemeio.ts - Systeme.io API
├── stripe.ts - Stripe API
└── db.ts - Database client

types/ - TypeScript definitions
├── analytics.ts - Analytics types
├── session.ts - Session types
├── user.ts - User types
└── events.ts - Event types
```

**Refactoring Principles:**
- **Single Responsibility:** Each component does one thing well
- **Composition:** Page composed of small, focused components
- **Reusability:** UI components used across multiple sections
- **Type Safety:** Strong TypeScript types throughout

**Implementation Steps:**
1. Create new directory structure
2. Extract sections one-by-one from `page.tsx`
3. Test each section in isolation
4. Update imports and dependencies
5. Delete old code after migration verified
6. Run TypeScript compiler to catch errors
7. Test full page after all extractions

**Testable Outcomes:**
- `page.tsx` reduced to ~50 lines
- All sections work independently
- No TypeScript errors
- Page renders identically to before refactoring

---

#### 4.2 Custom Hooks for Logic

**Technical Specification:**

**A. `useAnalytics()` - Event Tracking Hook**
```typescript
// hooks/useAnalytics.ts
export function useAnalytics() {
  const trackEvent = useCallback((eventType: string, eventData: unknown) => {
    fetch('/api/analytics/events', {
      method: 'POST',
      body: JSON.stringify({ event_type: eventType, event_data: eventData }),
    });
  }, []);

  return { trackEvent };
}

// Usage
const { trackEvent } = useAnalytics();
trackEvent('vsl_milestone', { percent: 50 });
```

**B. `useSession()` - Session Management Hook**
```typescript
// hooks/useSession.ts
export function useSession() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // Initialize or load session from cookie
    initializeSession().then(setSession);
  }, []);

  return { session };
}

// Usage
const { session } = useSession();
console.log(session.utm_source);
```

**C. `useLeadScoring()` - Lead Scoring Hook**
```typescript
// hooks/useLeadScoring.ts
export function useLeadScoring(userId: string) {
  const [score, setScore] = useState(0);
  const [temperature, setTemperature] = useState<'cold' | 'warm' | 'hot'>('cold');

  useEffect(() => {
    // Subscribe to score updates
    const unsubscribe = subscribeToScoreUpdates(userId, (newScore) => {
      setScore(newScore);
      setTemperature(calculateTemperature(newScore));
    });

    return unsubscribe;
  }, [userId]);

  return { score, temperature };
}

// Usage
const { score, temperature } = useLeadScoring(userId);
```

**D. `useVideoProgress()` - Video Tracking Hook**
```typescript
// hooks/useVideoProgress.ts
export function useVideoProgress(videoId: string) {
  const { trackEvent } = useAnalytics();
  const [progress, setProgress] = useState(0);
  const milestones = [25, 50, 75, 90, 95];

  const onProgress = useCallback((percent: number) => {
    setProgress(percent);

    // Track milestones
    milestones.forEach((milestone) => {
      if (percent >= milestone && progress < milestone) {
        trackEvent('vsl_milestone', { videoId, percent: milestone });
      }
    });
  }, [progress, trackEvent, videoId]);

  return { onProgress, progress };
}

// Usage
const { onProgress } = useVideoProgress('main-vsl');
<VideoPlayer onProgress={onProgress} />
```

**E. `useAutoSave()` - Form Auto-Save Hook**
```typescript
// hooks/useAutoSave.ts
export function useAutoSave<T>(formId: string, initialData: T) {
  const [data, setData] = useState<T>(initialData);
  const [status, setStatus] = useState<'saved' | 'saving' | 'error'>('saved');

  const save = useCallback(async (newData: T) => {
    setData(newData);
    setStatus('saving');

    try {
      await fetch(`/api/application/autosave`, {
        method: 'POST',
        body: JSON.stringify({ formId, data: newData }),
      });
      setStatus('saved');
    } catch (error) {
      setStatus('error');
    }
  }, [formId]);

  // Debounced save on data change
  useEffect(() => {
    const timer = setTimeout(() => save(data), 500);
    return () => clearTimeout(timer);
  }, [data, save]);

  return { data, setData, status };
}

// Usage
const { data, setData, status } = useAutoSave('app-form', initialData);
<input onChange={(e) => setData({ ...data, name: e.target.value })} />
```

**Implementation Steps:**
1. Create each hook file in `hooks/`
2. Implement hook logic with proper TypeScript types
3. Add error handling and loading states
4. Test hooks in isolation with custom test components
5. Replace inline logic in components with hooks
6. Verify all functionality works after migration

**Testable Outcomes:**
- All business logic extracted into hooks
- Components are pure and focused on UI
- Hooks are reusable across components
- Logic is testable in isolation

---

#### 4.3 Database Schema Finalization

**Technical Specification:**

**Complete Schema:**
```sql
-- Sessions
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) NULL,
  fingerprint TEXT,
  first_seen TIMESTAMP DEFAULT NOW(),
  last_seen TIMESTAMP DEFAULT NOW(),
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_content TEXT,
  utm_term TEXT,
  referrer TEXT,
  device_type TEXT,
  browser TEXT,
  ip_address TEXT,
  country_code TEXT
);
CREATE INDEX idx_sessions_user_id ON sessions(user_id);
CREATE INDEX idx_sessions_last_seen ON sessions(last_seen);
CREATE INDEX idx_sessions_utm_source ON sessions(utm_source);

-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  lead_score INTEGER DEFAULT 0,
  lead_temperature TEXT, -- 'cold', 'warm', 'hot'
  status TEXT DEFAULT 'prospect', -- 'prospect', 'application_started', 'applied', 'customer'
  first_seen TIMESTAMP DEFAULT NOW(),
  last_seen TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_lead_score ON users(lead_score DESC);
CREATE INDEX idx_users_status ON users(status);
CREATE INDEX idx_users_lead_temperature ON users(lead_temperature);

-- Events
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES sessions(id) NOT NULL,
  user_id UUID REFERENCES users(id) NULL,
  event_type TEXT NOT NULL,
  event_data JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);
CREATE INDEX idx_events_session_id ON events(session_id);
CREATE INDEX idx_events_user_id ON events(user_id);
CREATE INDEX idx_events_type ON events(event_type);
CREATE INDEX idx_events_created_at ON events(created_at DESC);
CREATE INDEX idx_events_user_created ON events(user_id, created_at DESC);

-- Application Submissions
CREATE TABLE application_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) NOT NULL,
  submission_data JSONB NOT NULL,
  current_step INTEGER DEFAULT 1,
  is_complete BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
CREATE INDEX idx_app_submissions_user_id ON application_submissions(user_id);
CREATE INDEX idx_app_submissions_complete ON application_submissions(is_complete);

-- Payments
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) NOT NULL,
  stripe_payment_intent_id TEXT UNIQUE,
  stripe_customer_id TEXT,
  amount INTEGER, -- in cents
  currency TEXT,
  status TEXT,
  payment_method TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
CREATE INDEX idx_payments_user_id ON payments(user_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_created_at ON payments(created_at DESC);

-- Webhook Queue
CREATE TABLE webhook_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  payload JSONB NOT NULL,
  target_url TEXT NOT NULL,
  attempt_count INTEGER DEFAULT 0,
  max_attempts INTEGER DEFAULT 3,
  status TEXT DEFAULT 'pending', -- 'pending', 'sent', 'failed'
  last_attempt_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);
CREATE INDEX idx_webhook_queue_status ON webhook_queue(status, created_at);

-- Lead Alerts
CREATE TABLE lead_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) NOT NULL,
  alert_type TEXT NOT NULL,
  sent_at TIMESTAMP DEFAULT NOW(),
  first_contact_at TIMESTAMP,
  response_time_seconds INTEGER
);
CREATE INDEX idx_lead_alerts_user_id ON lead_alerts(user_id);
CREATE INDEX idx_lead_alerts_sent_at ON lead_alerts(sent_at DESC);
```

**Additional Considerations:**
- Add foreign key constraints for data integrity
- Add CHECK constraints for valid values
- Add triggers for updated_at timestamps
- Add cascade deletes for cleanup
- Partition events table by month for performance (scale preparation)

**Implementation Steps:**
1. Review and finalize schema
2. Create migration files (use Drizzle or Prisma)
3. Run migrations in dev environment
4. Seed with test data
5. Verify all queries work efficiently
6. Add indexes for slow queries
7. Document schema in README

**Testable Outcomes:**
- All tables created with proper constraints
- Indexes improve query performance
- Foreign keys prevent orphaned records
- Migrations are reversible

---

#### 4.4 API Routes Structure

**Technical Specification:**

**Route Organization:**
```
app/api/
├── analytics/
│   ├── events/route.ts - POST event tracking
│   ├── funnel/route.ts - GET funnel data
│   ├── attribution/route.ts - GET revenue by source
│   ├── hot-leads/route.ts - GET hot leads
│   ├── abandonment-check/route.ts - GET abandoned users
│   └── bi/route.ts - GET business intelligence
├── webhooks/
│   ├── route.ts - POST unified webhook receiver
│   ├── stripe/route.ts - POST Stripe webhooks
│   └── lead-score-alert/route.ts - POST hot lead trigger
├── application/
│   ├── start/route.ts - POST start application
│   ├── step/route.ts - POST save step
│   ├── submit/route.ts - POST submit application
│   └── autosave/route.ts - POST auto-save progress
└── admin/
    └── dashboard/route.ts - GET admin data (protected)
```

**API Route Standards:**
- **Authentication:** Simple API key for MVP (Bearer token in Authorization header)
- **Validation:** Zod schemas for request/response validation
- **Error Handling:** Consistent error format
- **Rate Limiting:** Per IP or per user (10 req/min for public endpoints)
- **CORS:** Configure for allowed origins

**Error Response Format:**
```typescript
{
  success: false,
  error: {
    code: 'VALIDATION_ERROR',
    message: 'Invalid request data',
    details: { ... }
  }
}
```

**Success Response Format:**
```typescript
{
  success: true,
  data: { ... }
}
```

**Example: `/api/analytics/events`**
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { trackEvent } from '@/lib/analytics';

const eventSchema = z.object({
  event_type: z.string(),
  event_data: z.object({}).optional(),
  timestamp: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = eventSchema.parse(body);

    await trackEvent(validated.event_type, validated.event_data);

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', details: error.errors } },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to track event' } },
      { status: 500 }
    );
  }
}
```

**Implementation Steps:**
1. Create API route directory structure
2. Implement each route with validation
3. Add error handling middleware
4. Add authentication middleware
5. Add rate limiting (using upstash/ratelimit or similar)
6. Test all routes with Postman/Insomnia
7. Add API documentation (OpenAPI/Swagger)

**Testable Outcomes:**
- All routes return consistent responses
- Validation catches bad requests
- Authentication protects admin routes
- Rate limiting prevents abuse
- API documentation is complete

---

#### 4.5 Environment Configuration

**Technical Specification:**

**Use `@t3-oss/env-nextjs` for type-safe env vars:**
```typescript
// env.mjs
import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    NEXTAUTH_SECRET: z.string().min(1),
    SYSTEMEIO_API_KEY: z.string().min(1),
    STRIPE_SECRET_KEY: z.string().min(1),
    STRIPE_WEBHOOK_SECRET: z.string().min(1),
    N8N_WEBHOOK_URL: z.string().url().optional(),
    ADMIN_API_KEY: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().url(),
    NEXT_PUBLIC_BUNNY_VIDEO_URL: z.string().url(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    SYSTEMEIO_API_KEY: process.env.SYSTEMEIO_API_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    N8N_WEBHOOK_URL: process.env.N8N_WEBHOOK_URL,
    ADMIN_API_KEY: process.env.ADMIN_API_KEY,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_BUNNY_VIDEO_URL: process.env.NEXT_PUBLIC_BUNNY_VIDEO_URL,
  },
});
```

**Environment Files:**
- `.env.local` - Local development (gitignored)
- `.env.example` - Template (committed)
- `.env.test` - Testing environment
- Deploy to production with platform-specific env vars (Vercel)

**Secrets Management:**
- Never commit secrets to git
- Use `.gitignore` for `.env.local`
- Use Vercel environment variables for production
- Rotate secrets periodically
- Document all required env vars in README

**Implementation Steps:**
1. Install `@t3-oss/env-nextjs`
2. Create `env.mjs` with schema
3. Create `.env.example` with all required vars
4. Update all code to use `env.DB_URL` instead of `process.env.DB_URL`
5. Add check at app startup for missing env vars
6. Document env vars in README
7. Set up production env vars in Vercel

**Testable Outcomes:**
- App won't start if env vars missing
- TypeScript errors if accessing non-existent env var
- All secrets properly configured in production
- New developers can set up env easily from `.env.example`

---

### Phase 4 Summary

**Component Refactoring:**
- 675-line page reduced to ~50 lines
- 10+ section components extracted
- Clear component hierarchy
- Mobile-specific variants where needed

**Custom Hooks Created:**
- `useAnalytics` - Event tracking
- `useSession` - Session management
- `useLeadScoring` - Lead scoring
- `useVideoProgress` - Video tracking
- `useAutoSave` - Form auto-save

**Database Schema:**
- 7 tables with proper relationships
- Indexes for performance
- Foreign keys for integrity
- Migration-ready

**API Routes:**
- 12+ organized API routes
- Validation with Zod
- Error handling middleware
- Authentication and rate limiting

**Configuration:**
- Type-safe environment variables
- Secrets management
- Clear documentation

**Build Time Estimate:** 4-5 days

---

## Implementation Phases & Dependencies

### Phase Order (Critical Path)

1. **Phase 4: Technical Refactoring** (Week 1, Days 1-5)
   - WHY FIRST: Creates solid foundation for all other work
   - Extract components, create hooks, finalize schema
   - DEPENDENCIES: None

2. **Phase 1: Analytics & Visibility** (Week 2, Days 1-4)
   - WHY SECOND: Provides visibility for all other optimizations
   - Build tracking, database, dashboard
   - DEPENDENCIES: Phase 4 complete

3. **Phase 2: Integration & Data Flow** (Week 2, Days 4-5 + Week 3, Days 1-2)
   - WHY THIRD: Enhances existing integrations
   - Webhook management, Systeme.io sync, Stripe integration
   - DEPENDENCIES: Phase 1 (needs user/event data)

4. **Phase 3: Performance & Mobile Optimization** (Week 3, Days 3-5)
   - WHY LAST: Easier to optimize clean code
   - Code splitting, video optimization, mobile improvements
   - DEPENDENCIES: Phase 4 (refactored components easier to optimize)

### Total Timeline: ~15-17 working days (3-4 weeks)

---

## Testing Strategy

### Unit Tests
- Custom hooks (test with `@testing-library/react-hooks`)
- Utility functions (test with Vitest)
- API route handlers (test with Vitest + Supertest)

### Integration Tests
- Database queries (test with real test DB)
- External API calls (mock Systeme.io, Stripe)
- Webhook handlers (test with sample payloads)

### E2E Tests
- Critical user flows:
  - Visit site → Watch VSL → Submit email
  - Submit email → Start application → Complete
  - Complete application → Make payment
- Test with Playwright
- Run in CI before deployment

### Performance Tests
- Lighthouse CI (score thresholds)
- Bundle size monitoring
- Database query performance (EXPLAIN ANALYZE)

### Manual Testing
- Test on real devices (iOS, Android, desktop)
- Test with slow network (Chrome DevTools throttling)
- Test accessibility with screen reader

---

## Success Metrics

### Analytics & Visibility
- ✅ Can see drop-off rate at each funnel stage
- ✅ Can identify which channel produces best customers
- ✅ Dashboard shows real-time hot leads
- ✅ Form abandonment rate reduced by 50%

### Integration & Data Flow
- ✅ 99.9% webhook delivery success rate
- ✅ Zero data loss between systems
- ✅ Speed-to-lead: <15 minutes for hot leads
- ✅ Systeme.io always in sync with local data

### Performance & Mobile
- ✅ Lighthouse Performance score: 90+
- ✅ Initial bundle reduced by 60%
- ✅ Mobile conversion rate increased by 20%
- ✅ Video loads instantly on mobile

### Code Quality
- ✅ Zero TypeScript errors
- ✅ Page.tsx < 100 lines
- ✅ All logic in reusable hooks
- ✅ Can add new features without breaking existing code

---

## Deployment Strategy

### Staging Environment
1. Create Vercel project for staging
2. Deploy all branches to preview URLs
3. Test all features in staging before production

### Production Deployment
1. Create Vercel project for production
2. Connect GitHub repository
3. Configure environment variables
4. Enable automatic deployments on main branch
5. Set up monitoring (Vercel Analytics, Sentry)

### Database Migrations
1. Use migration tool (Drizzle/Prisma)
2. Review migrations before deploying
3. Backup production database before migration
4. Run migrations during low-traffic period
5. Verify migration success, rollback plan ready

### Rollback Plan
1. Keep previous deployment available
2. Database migrations must be reversible
3. Feature flags for new functionality
4. Monitor for errors after deployment
5. Quick rollback if critical issues found

---

## Maintenance & Monitoring

### Daily Checks
- Dashboard for critical errors
- Funnel metrics (drop-off spikes)
- Webhook delivery rate
- Server response times

### Weekly Tasks
- Review hot leads and response times
- Analyze funnel performance
- Check attribution data
- Review performance metrics

### Monthly Tasks
- Review and update lead scoring rules
- Optimize database queries
- Clean up old data (events > 90 days)
- Review and update dependencies

### Quarterly Tasks
- Major feature releases
- Architecture review
- Security audit
- Performance optimization review

---

## Next Steps

This design document is ready for implementation planning using the `superpowers:writing-plans` skill.

The plan will break down each phase into detailed, actionable implementation steps with clear acceptance criteria.

**To proceed:**
1. Review this design document for completeness
2. Ask questions or request clarifications
3. Use `superpowers:writing-plans` to create implementation plan
4. Use `superpowers:using-git-worktrees` to create isolated workspace
5. Begin implementation following the plan

---

## Appendix: Technology Choices

### Why This Stack (2026 Best Practices)

**Next.js 16+ with App Router**
- Server components for better performance
- Built-in optimization (images, fonts, routing)
- Excellent developer experience
- Strong community and long-term viability

**TypeScript**
- Catch errors at compile time
- Better IDE support
- Self-documenting code
- Industry standard for 2026

**Tailwind CSS**
- Utility-first, highly productive
- Small bundle size
- Easy to maintain
- Dark mode support built-in

**PostgreSQL**
- Robust relational database
- Excellent performance
- JSONB for flexible data
- Strong ACID guarantees

**n8n (Self-Hosted)**
- No-cost alternative to Zapier
- Visual workflow builder
- Self-hosted for data privacy
- Easy to integrate with anything

**Systeme.io**
- All-in-one marketing platform
- CRM, email marketing, payments
- Affordable for growing businesses
- Good API for integrations

**Stripe**
- Industry standard for payments
- Excellent documentation
- Reliable and secure
- Strong webhook system

**Bunny.net**
- Fastest CDN for video
- Affordable pricing
- Easy integration
- Good optimization features

This stack prioritizes:
- Performance
- Developer productivity
- Cost efficiency
- Scalability
- Long-term viability
