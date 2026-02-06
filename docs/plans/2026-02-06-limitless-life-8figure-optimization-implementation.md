# Limitless Life 8-Figure Optimization Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform the Limitless Life sales funnel into a state-of-the-art, 8-figure ready conversion machine with complete funnel visibility, robust integrations, elite performance, and clean architecture.

**Architecture:**
1. **Phase 1 (Priority):** Build session-based tracking, event-driven analytics, lead scoring, and real-time dashboard to solve blind spots
2. **Phase 2:** Centralize webhook management, enhance Systeme.io CRM sync, integrate Stripe with attribution
3. **Phase 3:** Implement code splitting, adaptive video streaming, mobile optimizations, and performance monitoring
4. **Phase 4:** Refactor monolithic page into clean component architecture with custom hooks (easier after other work done)

**Tech Stack:** Next.js 16+, TypeScript, PostgreSQL, Tailwind CSS, n8n, Systeme.io, Stripe, Bunny.net

**Timeline:** ~15-17 working days (3-4 weeks)

**Execution Order:** Phase 1 → 2 → 3 → 4 (analytics first to address biggest pain point)

---

## PHASE 1: ANALYTICS & VISIBILITY

**Goal:** Complete funnel visibility with event tracking, lead scoring, and real-time dashboard

**Timeline:** Days 1-4

---

### Task 1: Set up Database Schema

**Files:**
- Install: `package.json` (add drizzle-orm, postgres)
- Create: `drizzle.config.ts`
- Create: `src/db/schema.ts`
- Create: `src/lib/db.ts`
- Create: `.env.example`

**Step 1: Install dependencies**

```bash
npm install drizzle-orm postgres
npm install -D drizzle-kit
npm install @t3-oss/env-nextjs zod
```

**Step 2: Create environment schema**

Create file: `env.mjs` (in project root)

```javascript
import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    SYSTEMEIO_API_KEY: z.string().min(1),
    STRIPE_SECRET_KEY: z.string().min(1),
    STRIPE_WEBHOOK_SECRET: z.string().min(1),
    N8N_WEBHOOK_URL: z.string().url().optional(),
    ADMIN_API_KEY: z.string().min(1),
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().url(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    SYSTEMEIO_API_KEY: process.env.SYSTEMEIO_API_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    N8N_WEBHOOK_URL: process.env.N8N_WEBHOOK_URL,
    ADMIN_API_KEY: process.env.ADMIN_API_KEY,
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
```

**Step 3: Create database schema**

Create file: `src/db/schema.ts`

```typescript
import { pgTable, uuid, text, integer, timestamp, jsonb, index, boolean } from 'drizzle-orm/pg-core';

export const sessions = pgTable('sessions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'set null' }),
  firstSeen: timestamp('first_seen').defaultNow(),
  lastSeen: timestamp('last_seen').defaultNow(),
  utmSource: text('utm_source'),
  utmMedium: text('utm_medium'),
  utmCampaign: text('utm_campaign'),
  referrer: text('referrer'),
  deviceType: text('device_type'),
}, (table) => ({
  userIdIdx: index('idx_sessions_user_id').on(table.userId),
  lastSeenIdx: index('idx_sessions_last_seen').on(table.lastSeen),
}));

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  firstName: text('first_name'),
  lastName: text('last_name'),
  leadScore: integer('lead_score').default(0),
  leadTemperature: text('lead_temperature'),
  status: text('status').default('prospect'),
  firstSeen: timestamp('first_seen').defaultNow(),
  lastSeen: timestamp('last_seen').defaultNow(),
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => ({
  emailIdx: index('idx_users_email').on(table.email),
  leadScoreIdx: index('idx_users_lead_score').on(table.leadScore),
}));

export const events = pgTable('events', {
  id: uuid('id').primaryKey().defaultRandom(),
  sessionId: uuid('session_id').references(() => sessions.id).notNull(),
  userId: uuid('user_id').references(() => users.id),
  eventType: text('event_type').notNull(),
  eventData: jsonb('event_data').$type<any>(),
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => ({
  sessionIdIdx: index('idx_events_session_id').on(table.sessionId),
  userIdIdx: index('idx_events_user_id').on(table.userId),
  eventTypeIdx: index('idx_events_type').on(table.eventType),
  createdAtIdx: index('idx_events_created_at').on(table.createdAt),
}));

export const applicationSubmissions = pgTable('application_submissions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  submissionData: jsonb('submission_data').notNull().$type<any>(),
  currentStep: integer('current_step').default(1),
  isComplete: boolean('is_complete').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const payments = pgTable('payments', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  stripePaymentIntentId: text('stripe_payment_intent_id').unique(),
  amount: integer('amount'),
  currency: text('currency'),
  status: text('status'),
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => ({
  userIdIdx: index('idx_payments_user_id').on(table.userId),
  createdAtIdx: index('idx_payments_created_at').on(table.createdAt),
}));

export const webhookQueue = pgTable('webhook_queue', {
  id: uuid('id').primaryKey().defaultRandom(),
  payload: jsonb('payload').notNull().$type<any>(),
  targetUrl: text('target_url').notNull(),
  attemptCount: integer('attempt_count').default(0),
  maxAttempts: integer('max_attempts').default(3),
  status: text('status').default('pending'),
  lastAttemptAt: timestamp('last_attempt_at'),
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => ({
  statusIdx: index('idx_webhook_queue_status').on(table.status, table.createdAt),
}));

export const leadAlerts = pgTable('lead_alerts', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  alertType: text('alert_type').notNull(),
  sentAt: timestamp('sent_at').defaultNow(),
  firstContactAt: timestamp('first_contact_at'),
  responseTimeSeconds: integer('response_time_seconds'),
}, (table) => ({
  userIdIdx: index('idx_lead_alerts_user_id').on(table.userId),
}));
```

**Step 4: Create database client**

Create file: `src/lib/db.ts`

```typescript
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '../db/schema';
import { env } from '@/env.mjs';

const queryClient = postgres(env.DATABASE_URL);
export const db = drizzle(queryClient, { schema });
```

**Step 5: Create Drizzle config**

Create file: `drizzle.config.ts`

```typescript
import type { Config } from 'drizzle-kit';
import { env } from './env.mjs';

export default {
  schema: './src/db/schema.ts',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: env.DATABASE_URL,
  },
} satisfies Config;
```

**Step 6: Create .env.example**

Create file: `.env.example`

```bash
DATABASE_URL="postgresql://user:password@localhost:5432/limitless_life"
SYSTEMEIO_API_KEY="your-api-key"
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
N8N_WEBHOOK_URL="https://your-n8n.com/webhook"
ADMIN_API_KEY="your-admin-key"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"
```

**Step 7: Add migration scripts**

Modify file: `package.json`

Add to scripts:
```json
"db:generate": "drizzle-kit generate",
"db:push": "drizzle-kit push",
"db:studio": "drizzle-kit studio"
```

**Step 8: Generate and push migration**

```bash
npm run db:generate
npm run db:push

# Expected: Tables created in database
```

**Step 9: Commit**

```bash
git add env.mjs drizzle.config.ts src/db/schema.ts src/lib/db.ts .env.example package.json package-lock.json
git commit -m "feat: set up database with Drizzle ORM and schema"
```

---

### Task 2: Create TypeScript Types

**Files:**
- Create: `src/types/index.ts`
- Create: `src/types/session.ts`
- Create: `src/types/user.ts`
- Create: `src/types/analytics.ts`

**Step 1: Create types**

Create file: `src/types/analytics.ts`

```typescript
export type EventType =
  | 'page_view'
  | 'vsl_start'
  | 'vsl_milestone'
  | 'vsl_complete'
  | 'email_submit'
  | 'application_start'
  | 'application_step'
  | 'application_complete'
  | 'pricing_view'
  | 'cta_click'
  | 'payment_complete';

export interface Event {
  id: string;
  sessionId: string;
  userId?: string;
  eventType: EventType;
  eventData?: any;
  createdAt: Date;
}

export interface FunnelMetrics {
  visitors: number;
  vslStarted: number;
  vsl95Plus: number;
  emailCaptured: number;
  applicationStarted: number;
  applicationComplete: number;
  payments: number;
}
```

Create file: `src/types/user.ts`

```typescript
export type UserStatus = 'prospect' | 'application_started' | 'applied' | 'customer';
export type LeadTemperature = 'cold' | 'warm' | 'hot';

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  leadScore: number;
  leadTemperature?: LeadTemperature;
  status: UserStatus;
}
```

Create file: `src/types/index.ts`

```typescript
export * from './analytics';
export * from './user';
```

**Step 2: Commit**

```bash
git add src/types/
git commit -m "feat: add TypeScript type definitions"
```

---

### Task 3: Create Session Management

**Files:**
- Create: `src/lib/session.ts`
- Create: `src/app/api/session/route.ts`

**Step 1: Create session utilities**

Create file: `src/lib/session.ts`

```typescript
import { cookies } from 'next/headers';
import { db } from './db';
import { sessions } from '../db/schema';
import { eq } from 'drizzle-orm';

const SESSION_COOKIE = 'll_session';
const COOKIE_MAX_AGE = 30 * 24 * 60 * 60; // 30 days

export async function getSessionId() {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE)?.value;
}

export async function createSession(data: {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  referrer?: string;
  deviceType?: string;
}) {
  const id = crypto.randomUUID();

  await db.insert(sessions).values({
    id,
    firstSeen: new Date(),
    lastSeen: new Date(),
    utmSource: data.utmSource,
    utmMedium: data.utmMedium,
    utmCampaign: data.utmCampaign,
    referrer: data.referrer,
    deviceType: data.deviceType,
  });

  const cookieStore = await cookies();
  cookieStore.set({
    name: SESSION_COOKIE,
    value: id,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  });

  return id;
}

export async function getOrCreateSession(data: {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  referrer?: string;
  deviceType?: string;
}) {
  const existing = await getSessionId();

  if (existing) {
    await db
      .update(sessions)
      .set({ lastSeen: new Date() })
      .where(eq(sessions.id, existing));
    return existing;
  }

  return await createSession(data);
}
```

**Step 2: Create session API**

Create file: `src/app/api/session/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getOrCreateSession } from '@/lib/session';

export async function GET(req: NextRequest) {
  const url = req.nextUrl;

  const sessionId = await getOrCreateSession({
    utmSource: url.searchParams.get('utm_source') || undefined,
    utmMedium: url.searchParams.get('utm_medium') || undefined,
    utmCampaign: url.searchParams.get('utm_campaign') || undefined,
    referrer: req.headers.get('referer') || undefined,
    deviceType: /mobile/i.test(req.headers.get('user-agent') || '') ? 'mobile' : 'desktop',
  });

  return NextResponse.json({ sessionId });
}
```

**Step 3: Test**

```bash
curl http://localhost:3000/api/session

# Expected: { "sessionId": "uuid" }
```

**Step 4: Commit**

```bash
git add src/lib/session.ts src/app/api/session/route.ts
git commit -m "feat: add session management with cookies"
```

---

### Task 4: Create Analytics Utilities

**Files:**
- Create: `src/lib/analytics.ts`
- Create: `src/app/api/analytics/events/route.ts`
- Create: `src/hooks/useAnalytics.ts`

**Step 1: Create analytics utilities**

Create file: `src/lib/analytics.ts`

```typescript
import { db } from './db';
import { events } from '../db/schema';
import { type EventType } from '../types';

export async function trackEvent(data: {
  sessionId: string;
  userId?: string;
  eventType: EventType;
  eventData?: any;
}) {
  await db.insert(events).values({
    sessionId: data.sessionId,
    userId: data.userId,
    eventType: data.eventType,
    eventData: data.eventData || {},
    createdAt: new Date(),
  });
}

export const LEAD_SCORING_RULES: Record<EventType, number> = {
  vsl_start: 5,
  vsl_milestone: 0, // Calculated separately
  vsl_complete: 60,
  email_submit: 10,
  application_start: 30,
  application_step: 5,
  application_complete: 40,
  pricing_view: 20,
  cta_click: 5,
  page_view: 0,
  payment_complete: 100,
};
```

**Step 2: Create events API**

Create file: `src/app/api/analytics/events/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { trackEvent } from '@/lib/analytics';

const schema = z.object({
  sessionId: z.string().uuid(),
  userId: z.string().uuid().optional(),
  eventType: z.string(),
  eventData: z.object({}).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId, userId, eventType, eventData } = schema.parse(body);

    await trackEvent({ sessionId, userId, eventType: eventType as any, eventData });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 });
  }
}
```

**Step 3: Create useAnalytics hook**

Create file: `src/hooks/useAnalytics.ts`

```typescript
'use client';

import { useCallback } from 'react';
import { type EventType } from '@/types';

export function useAnalytics(sessionId: string) {
  const trackEvent = useCallback(async (eventType: EventType, eventData?: any) => {
    await fetch('/api/analytics/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, eventType, eventData }),
    });
  }, [sessionId]);

  return { trackEvent };
}
```

**Step 4: Commit**

```bash
git add src/lib/analytics.ts src/app/api/analytics/events/route.ts src/hooks/useAnalytics.ts
git commit -m "feat: add analytics tracking with events API"
```

---

### Task 5: Update VSL Player with Tracking

**Files:**
- Modify: Existing VSL player component (update with milestone tracking)

**Step 1: Update VSL component**

Find and modify the VSL player component (location varies based on current codebase):

```typescript
'use client';

import { useRef, useState } from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';

export function VSLPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [trackedMilestones, setTrackedMilestones] = useState<Set<number>>(new Set());

  // Get sessionId from useSession hook (created in next task)
  const sessionId = '...'; // Will get from session hook
  const { trackEvent } = useAnalytics(sessionId);

  const handlePlay = () => {
    trackEvent('vsl_start');
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;

    const percent = (video.currentTime / video.duration) * 100;
    const milestones = [25, 50, 75, 90, 95];

    milestones.forEach((m) => {
      if (percent >= m && !trackedMilestones.has(m)) {
        trackEvent('vsl_milestone', { percent: m });
        setTrackedMilestones((prev) => new Set(prev).add(m));
      }
    });

    if (percent >= 98 && !trackedMilestones.has(100)) {
      trackEvent('vsl_complete');
      setTrackedMilestones((prev) => new Set(prev).add(100));
    }
  };

  return (
    <video
      ref={videoRef}
      src="your-video-url"
      controls
      onPlay={handlePlay}
      onTimeUpdate={handleTimeUpdate}
      preload="metadata"
    />
  );
}
```

**Step 2: Commit**

```bash
git add [vsl-component-path]
git commit -m "feat: add VSL milestone tracking"
```

---

### Task 6: Create Lead Scoring System

**Files:**
- Create: `src/lib/scoring.ts`
- Create: `src/app/api/analytics/recalculate-score/route.ts`

**Step 1: Create scoring utilities**

Create file: `src/lib/scoring.ts`

```typescript
import { db } from './db';
import { users, events } from '../db/schema';
import { eq, sql } from 'drizzle-orm';
import { LEAD_SCORING_RULES } from './analytics';

const HOT_LEAD_THRESHOLD = 70;
const WARM_LEAD_THRESHOLD = 40;

export async function calculateLeadScore(userId: string) {
  const userEvents = await db
    .select()
    .from(events)
    .where(eq(events.userId, userId));

  let score = 0;

  for (const event of userEvents) {
    const points = LEAD_SCORING_RULES[event.eventType] || 0;

    if (event.eventType === 'vsl_milestone') {
      const percent = event.eventData?.percent || 0;
      if (percent === 95) score += 50;
      else if (percent === 90) score += 30;
      else if (percent === 75) score += 20;
      else score += points;
    } else {
      score += points;
    }
  }

  // Calculate temperature
  let temperature: 'cold' | 'warm' | 'hot' = 'cold';
  if (score >= HOT_LEAD_THRESHOLD) temperature = 'hot';
  else if (score >= WARM_LEAD_THRESHOLD) temperature = 'warm';

  // Update user
  await db
    .update(users)
    .set({
      leadScore: score,
      leadTemperature: temperature,
    })
    .where(eq(users.id, userId));

  return { score, temperature };
}

export async function isHotLead(userId: string) {
  const user = await db.select().from(users).where(eq(users.id, userId)).limit(1);
  return (user[0]?.leadScore || 0) >= HOT_LEAD_THRESHOLD;
}
```

**Step 2: Create score recalculation API**

Create file: `src/app/api/analytics/recalculate-score/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { calculateLeadScore } from '@/lib/scoring';

const schema = z.object({
  userId: z.string().uuid(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId } = schema.parse(body);

    const result = await calculateLeadScore(userId);

    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 });
  }
}
```

**Step 3: Update events API to trigger scoring**

Modify file: `src/app/api/analytics/events/route.ts`

After tracking event, add:
```typescript
if (userId) {
  // Recalculate score asynchronously
  calculateLeadScore(userId).catch(console.error);
}
```

**Step 4: Commit**

```bash
git add src/lib/scoring.ts src/app/api/analytics/recalculate-score/route.ts src/app/api/analytics/events/route.ts
git commit -m "feat: add lead scoring system with hot lead detection"
```

---

### Task 7: Create Funnel Analytics API

**Files:**
- Create: `src/app/api/analytics/funnel/route.ts`

**Step 1: Create funnel API**

Create file: `src/app/api/analytics/funnel/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { events, users } from '@/db/schema';
import { sql, and, gte, desc } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const days = parseInt(url.searchParams.get('days') || '30');
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  // Get all events in date range
  const allEvents = await db
    .select()
    .from(events)
    .where(gte(events.createdAt, startDate))
    .orderBy(desc(events.createdAt));

  // Calculate funnel metrics
  const uniqueSessions = new Set(allEvents.map((e) => e.sessionId)).size;
  const vslStarted = new Set(
    allEvents.filter((e) => e.eventType === 'vsl_start').map((e) => e.sessionId)
  ).size;
  const vsl95Plus = new Set(
    allEvents
      .filter((e) => e.eventType === 'vsl_milestone' && e.eventData?.percent >= 95)
      .map((e) => e.sessionId)
  ).size;
  const emailCaptured = new Set(
    allEvents.filter((e) => e.eventType === 'email_submit').map((e) => e.sessionId)
  ).size;
  const applicationStarted = new Set(
    allEvents.filter((e) => e.eventType === 'application_start').map((e) => e.sessionId)
  ).size;
  const applicationComplete = new Set(
    allEvents.filter((e) => e.eventType === 'application_complete').map((e) => e.sessionId)
  ).size;

  // Get payment count from users table
  const payments = await db
    .select()
    .from(users)
    .where(sql`${users.status} = 'customer'`)
    .where(gte(users.createdAt, startDate));

  const funnel = {
    visitors: uniqueSessions,
    vslStarted,
    vsl95Plus,
    emailCaptured,
    applicationStarted,
    applicationComplete,
    payments: payments.length,
  };

  return NextResponse.json({ success: true, funnel });
}
```

**Step 2: Test funnel API**

```bash
curl "http://localhost:3000/api/analytics/funnel?days=30"

# Expected: Funnel metrics
```

**Step 3: Commit**

```bash
git add src/app/api/analytics/funnel/route.ts
git commit -m "feat: add funnel analytics API"
```

---

### Task 8: Create Admin Dashboard

**Files:**
- Create: `src/app/admin/page.tsx`
- Create: `src/app/admin/layout.tsx`
- Create: `src/components/admin/FunnelChart.tsx`

**Step 1: Create admin layout with auth**

Create file: `src/app/admin/layout.tsx`

```typescript
import { ReactNode } from 'react';
import { redirect } from 'next/navigation';

export default function AdminLayout({ children }: { children: ReactNode }) {
  // Simple auth check (production: use proper auth)
  const isAuthenticated = false; // TODO: Implement proper auth

  if (!isAuthenticated) {
    // For now, just render children - add auth later
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <header className="border-b border-gray-800 bg-black px-6 py-4">
        <h1 className="text-2xl font-bold text-white">Limitless Life Analytics</h1>
      </header>
      <main className="p-6">{children}</main>
    </div>
  );
}
```

**Step 2: Create funnel chart component**

Create file: `src/components/admin/FunnelChart.tsx`

```typescript
'use client';

interface FunnelData {
  visitors: number;
  vslStarted: number;
  vsl95Plus: number;
  emailCaptured: number;
  applicationStarted: number;
  applicationComplete: number;
  payments: number;
}

export function FunnelChart({ funnel }: { funnel: FunnelData }) {
  const stages = [
    { name: 'Visitors', count: funnel.visitors },
    { name: 'VSL Started', count: funnel.vslStarted },
    { name: 'VSL 95%+', count: funnel.vsl95Plus },
    { name: 'Email Captured', count: funnel.emailCaptured },
    { name: 'App Started', count: funnel.applicationStarted },
    { name: 'App Complete', count: funnel.applicationComplete },
    { name: 'Payments', count: funnel.payments },
  ];

  const getConversionRate = (current: number, previous: number) => {
    if (previous === 0) return 0;
    return ((current / previous) * 100).toFixed(1);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white">Funnel Overview</h2>
      <div className="space-y-2">
        {stages.map((stage, index) => {
          const previous = stages[index - 1]?.count || stage.count;
          const rate = getConversionRate(stage.count, previous);
          const dropOff = ((1 - stage.count / previous) * 100).toFixed(1);

          return (
            <div key={stage.name} className="flex items-center gap-4 rounded bg-gray-800 p-4">
              <div className="w-48 text-white">{stage.name}</div>
              <div className="flex-1">
                <div className="mb-2 h-8 rounded bg-gray-700">
                  <div
                    className="h-full rounded bg-red-600"
                    style={{ width: `${(stage.count / funnel.visitors) * 100}%` }}
                  />
                </div>
              </div>
              <div className="w-24 text-right text-white">{stage.count}</div>
              <div className="w-24 text-right text-green-400">{rate}%</div>
              <div className="w-24 text-right text-red-400">{dropOff}% drop</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
```

**Step 3: Create admin dashboard page**

Create file: `src/app/admin/page.tsx`

```typescript
'use client';

import { useEffect, useState } from 'react';
import { FunnelChart } from '@/components/admin/FunnelChart';

export default function AdminDashboard() {
  const [funnel, setFunnel] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/analytics/funnel?days=30')
      .then((res) => res.json())
      .then((data) => {
        setFunnel(data.funnel);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-white">Loading...</div>;

  return (
    <div className="space-y-8">
      <FunnelChart funnel={funnel} />
      {/* More dashboard components will be added */}
    </div>
  );
}
```

**Step 4: Commit**

```bash
git add src/app/admin/page.tsx src/app/admin/layout.tsx src/components/admin/FunnelChart.tsx
git commit -m "feat: add admin dashboard with funnel visualization"
```

---

### Task 9: Create Hot Leads Feed

**Files:**
- Create: `src/app/api/analytics/hot-leads/route.ts`
- Create: `src/components/admin/HotLeadsFeed.tsx`

**Step 1: Create hot leads API**

Create file: `src/app/api/analytics/hot-leads/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users, events } from '@/db/schema';
import { sql, gte, desc } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  const hotLeads = await db
    .select()
    .from(users)
    .where(sql`${users.leadScore} >= 70`)
    .orderBy(desc(users.leadScore))
    .limit(50);

  // Enrich with recent events
  const leadsWithEvents = await Promise.all(
    hotLeads.map(async (lead) => {
      const recentEvents = await db
        .select()
        .from(events)
        .where(eq(events.userId, lead.id))
        .orderBy(desc(events.createdAt))
        .limit(5);

      return {
        ...lead,
        recentEvents,
      };
    })
  );

  return NextResponse.json({ success: true, leads: leadsWithEvents });
}
```

**Step 2: Create hot leads feed component**

Create file: `src/components/admin/HotLeadsFeed.tsx`

```typescript
'use client';

import { useEffect, useState } from 'react';

export function HotLeadsFeed() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/analytics/hot-leads')
      .then((res) => res.json())
      .then((data) => {
        setLeads(data.leads);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-white">Loading hot leads...</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white">Hot Leads (Score ≥70)</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {leads.map((lead) => (
          <div key={lead.id} className="rounded border border-red-900 bg-gray-800 p-4">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="font-semibold text-white">{lead.email}</h3>
              <span className="rounded bg-red-600 px-2 py-1 text-sm text-white">
                {lead.leadScore}
              </span>
            </div>
            <p className="mb-2 text-sm text-gray-400">
              Status: {lead.status} | Temp: {lead.leadTemperature}
            </p>
            <div className="text-xs text-gray-500">
              Last seen: {new Date(lead.lastSeen).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

**Step 3: Add to dashboard**

Modify file: `src/app/admin/page.tsx`

Add component import and render:
```typescript
import { HotLeadsFeed } from '@/components/admin/HotLeadsFeed';

// In JSX, after FunnelChart:
<HotLeadsFeed />
```

**Step 4: Commit**

```bash
git add src/app/api/analytics/hot-leads/route.ts src/components/admin/HotLeadsFeed.tsx src/app/admin/page.tsx
git commit -m "feat: add hot leads feed to admin dashboard"
```

---

## PHASE 2: INTEGRATION & DATA FLOW

**Goal:** Robust webhook management, Systeme.io CRM sync, Stripe integration

**Timeline:** Days 5-8

---

### Task 10: Create Webhook Queue System

**Files:**
- Create: `src/lib/webhook-queue.ts`
- Create: `src/app/api/webhooks/route.ts`

**Step 1: Create webhook queue utilities**

Create file: `src/lib/webhook-queue.ts`

```typescript
import { db } from './db';
import { webhookQueue } from '../db/schema';
import { eq } from 'drizzle-orm';

export async function queueWebhook(data: {
  targetUrl: string;
  payload: any;
}) {
  const [webhook] = await db
    .insert(webhookQueue)
    .values({
      targetUrl: data.targetUrl,
      payload: data.payload,
      status: 'pending',
      attemptCount: 0,
      createdAt: new Date(),
    })
    .returning();

  return webhook;
}

export async function processWebhookQueue() {
  const pending = await db
    .select()
    .from(webhookQueue)
    .where(eq(webhookQueue.status, 'pending'))
    .limit(10);

  for (const webhook of pending) {
    try {
      const response = await fetch(webhook.targetUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(webhook.payload),
      });

      if (response.ok) {
        await db
          .update(webhookQueue)
          .set({ status: 'sent', lastAttemptAt: new Date() })
          .where(eq(webhookQueue.id, webhook.id));
      } else {
        throw new Error(`Webhook failed: ${response.status}`);
      }
    } catch (error) {
      const attemptCount = webhook.attemptCount + 1;

      if (attemptCount >= webhook.maxAttempts) {
        await db
          .update(webhookQueue)
          .set({ status: 'failed', attemptCount, lastAttemptAt: new Date() })
          .where(eq(webhookQueue.id, webhook.id));
      } else {
        await db
          .update(webhookQueue)
          .set({ attemptCount, lastAttemptAt: new Date() })
          .where(eq(webhookQueue.id, webhook.id));
      }
    }
  }
}
```

**Step 2: Create unified webhook receiver**

Create file: `src/app/api/webhooks/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { queueWebhook } from '@/lib/webhook-queue';

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    const targetUrl = payload.targetUrl;

    // Queue for delivery
    await queueWebhook({ targetUrl, payload });

    // Also store locally immediately
    // ... (store to appropriate table)

    return NextResponse.json({ success: true, queued: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to queue webhook' }, { status: 500 });
  }
}
```

**Step 3: Commit**

```bash
git add src/lib/webhook-queue.ts src/app/api/webhooks/route.ts
git commit -m "feat: add webhook queue with retry logic"
```

---

### Task 11: Create Systeme.io Integration

**Files:**
- Create: `src/lib/systemeio.ts`
- Create: `src/app/api/integration/systemeio/sync-contact/route.ts`

**Step 1: Create Systeme.io client**

Create file: `src/lib/systemeio.ts`

```typescript
import { env } from '@/env.mjs';

const SYSTEMEIO_API_BASE = 'https://systeme.io/api';

interface SystemeioContact {
  email: string;
  firstName?: string;
  lastName?: string;
  fields?: Record<string, any>;
}

export async function createOrUpdateContact(contact: SystemeioContact) {
  const response = await fetch(`${SYSTEMEIO_API_BASE}/contacts`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.SYSTEMEIO_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(contact),
  });

  if (!response.ok) {
    throw new Error(`Systeme.io API error: ${response.status}`);
  }

  return await response.json();
}

export async function addTag(contactId: string, tagId: string) {
  const response = await fetch(`${SYSTEMEIO_API_BASE}/contacts/${contactId}/tags`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.SYSTEMEIO_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ tagId }),
  });

  return await response.json();
}
```

**Step 2: Create sync contact API**

Create file: `src/app/api/integration/systemeio/sync-contact/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createOrUpdateContact } from '@/lib/systemeio';

const schema = z.object({
  email: z.string().email(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  leadScore: z.number().optional(),
  leadTemperature: z.string().optional(),
  utmSource: z.string().optional(),
  utmCampaign: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    const contact = await createOrUpdateContact({
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      fields: {
        lead_score: data.leadScore,
        lead_temperature: data.leadTemperature,
        utm_source: data.utmSource,
        utm_campaign: data.utmCampaign,
      },
    });

    return NextResponse.json({ success: true, contact });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Sync failed' }, { status: 500 });
  }
}
```

**Step 3: Commit**

```bash
git add src/lib/systemeio.ts src/app/api/integration/systemeio/sync-contact/route.ts
git commit -m "feat: add Systeme.io CRM integration"
```

---

### Task 12: Create Stripe Integration

**Files:**
- Create: `src/lib/stripe.ts`
- Create: `src/app/api/webhooks/stripe/route.ts`

**Step 1: Install Stripe SDK**

```bash
npm install stripe
```

**Step 2: Create Stripe client**

Create file: `src/lib/stripe.ts`

```typescript
import Stripe from 'stripe';
import { env } from '@/env.mjs';

export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-11-20.acacia',
  typescript: true,
});

export async function handleStripeWebhook(event: Stripe.Event) {
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;
      await handlePaymentComplete(session);
      break;
    // Handle other event types
  }
}

async function handlePaymentComplete(session: Stripe.Checkout.Session) {
  const email = session.customer_details?.email;
  if (!email) return;

  // Update user to customer status
  // Store payment data
  // Sync to Systeme.io
}
```

**Step 3: Create Stripe webhook handler**

Create file: `src/app/api/webhooks/stripe/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe, handleStripeWebhook } from '@/lib/stripe';
import { env } from '@/env.mjs';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = (await headers()).get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 });
  }

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      env.STRIPE_WEBHOOK_SECRET
    );

    await handleStripeWebhook(event);

    return NextResponse.json({ received: true });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }
}
```

**Step 4: Commit**

```bash
git add package.json package-lock.json src/lib/stripe.ts src/app/api/webhooks/stripe/route.ts
git commit -m "feat: add Stripe payment integration"
```

---

## PHASE 3: PERFORMANCE & MOBILE

**Goal:** Code splitting, lazy loading, adaptive video, mobile optimization

**Timeline:** Days 9-12

---

### Task 13: Implement Code Splitting

**Files:**
- Modify: `src/app/page.tsx`
- Extract: Multiple section components

**Step 1: Extract sections into components**

From the monolithic page.tsx, extract each section into a separate component:

```bash
src/components/sales-page/
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

**Step 2: Lazy load sections**

Modify file: `src/app/page.tsx`

```typescript
import { lazy, Suspense } from 'react';

const HeroSection = lazy(() => import('@/components/sales-page/HeroSection'));
const ProblemSection = lazy(() => import('@/components/sales-page/ProblemSection'));
// ... other sections

export default function HomePage() {
  return (
    <main>
      <Suspense fallback={<SectionPlaceholder />}>
        <HeroSection />
      </Suspense>
      <Suspense fallback={<SectionPlaceholder />}>
        <ProblemSection />
      </Suspense>
      {/* ... other sections */}
    </main>
  );
}

function SectionPlaceholder() {
  return <div className="h-screen bg-black animate-pulse" />;
}
```

**Step 3: Commit**

```bash
git add src/components/sales-page/ src/app/page.tsx
git commit -m "refactor: implement code splitting and lazy loading"
```

---

### Task 14: Optimize Video Loading

**Files:**
- Modify: VSL player component
- Create: `src/lib/video-config.ts`

**Step 1: Create adaptive video config**

Create file: `src/lib/video-config.ts`

```typescript
export function getVideoSource(deviceType: string) {
  if (deviceType === 'mobile') {
    return 'https://video.bunnycdn.com/play/your-video-id-720p';
  }
  return 'https://video.bunnycdn.com/play/your-video-id-1080p';
}

export const VIDEO_POSTER = 'https://your-cdn.com/poster.jpg';
```

**Step 2: Update VSL player**

Modify VSL player to:
- Use poster image initially
- Load video only on play click
- Use adaptive bitrate based on device
- Set preload="metadata"

**Step 3: Commit**

```bash
git add src/lib/video-config.ts [vsl-component]
git commit -m "feat: add adaptive video streaming with poster image"
```

---

### Task 15: Mobile Optimization

**Files:**
- Modify: Various components for mobile
- Add: Responsive utility classes

**Step 1: Audit and fix touch targets**

Ensure all CTAs meet 44x44px minimum:
```typescript
<button className="min-h-[44px] min-w-[44px] px-6 py-3">
  CTA Button
</button>
```

**Step 2: Simplify mobile layout**

Hide non-critical sections on mobile:
```typescript
<div className="hidden md:block">
  {/* Desktop-only content */}
</div>
```

**Step 3: Commit**

```bash
git add [modified-components]
git commit -m "feat: optimize mobile experience with touch-friendly CTAs"
```

---

## PHASE 4: TECHNICAL REFACTORING

**Goal:** Clean architecture, custom hooks, maintainable codebase

**Timeline:** Days 13-15

---

### Task 16: Create Custom Hooks

**Files:**
- Create: `src/hooks/useSession.ts`
- Create: `src/hooks/useLeadScoring.ts`
- Create: `src/hooks/useAutoSave.ts`

**Step 1: Create useSession hook**

Create file: `src/hooks/useSession.ts`

```typescript
'use client';

import { useState, useEffect } from 'react';

export function useSession() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/session')
      .then((res) => res.json())
      .then((data) => {
        setSession(data.session);
        setLoading(false);
      });
  }, []);

  return { session, loading };
}
```

**Step 2: Create other hooks similarly**

**Step 3: Commit**

```bash
git add src/hooks/
git commit -m "feat: add custom hooks for session, lead scoring, and auto-save"
```

---

### Task 17: Final Code Cleanup

**Files:**
- Review and refactor: All components
- Update: Types for consistency
- Add: Documentation

**Step 1: Run TypeScript check**

```bash
npx tsc --noEmit

# Expected: No errors
```

**Step 2: Update README**

Create/update README with:
- Architecture overview
- Environment setup
- Development workflow
- Deployment instructions

**Step 3: Final commit**

```bash
git add README.md [all-updated-files]
git commit -m "docs: update README and finalize codebase"
```

---

## FINAL TASKS

### Task 18: Testing & Deployment

**Files:**
- Create: Test files for critical paths
- Configure: Production environment

**Step 1: Test all APIs**

```bash
# Test session
curl http://localhost:3000/api/session

# Test analytics
curl -X POST http://localhost:3000/api/analytics/events \
  -H "Content-Type: application/json" \
  -d '{"sessionId":"test","eventType":"page_view"}'

# Test funnel
curl http://localhost:3000/api/analytics/funnel
```

**Step 2: Deploy to production**

```bash
# Push to main branch
git push origin main

# Or deploy via Vercel
vercel --prod
```

**Step 3: Monitor post-deployment**

- Check analytics dashboard
- Verify webhooks are firing
- Monitor error logs

**Step 4: Commit deployment config**

```bash
git add vercel.json .env.production
git commit -m "chore: add production deployment configuration"
```

---

## Summary

**Total Tasks:** 18 major tasks (~90 subtasks)

**Phase Breakdown:**
- Phase 1 (Analytics): Tasks 1-9 (Days 1-4)
- Phase 2 (Integrations): Tasks 10-12 (Days 5-8)
- Phase 3 (Performance): Tasks 13-15 (Days 9-12)
- Phase 4 (Refactoring): Tasks 16-18 (Days 13-15)

**Success Criteria:**
✅ Complete funnel visibility in dashboard
✅ Lead scoring with hot lead alerts
✅ Reliable webhook delivery (99.9%)
✅ Systeme.io and Stripe integrations working
✅ Page load time <2s on mobile
✅ Zero TypeScript errors
✅ Clean component architecture

**Ready for Execution:** ✅

---

**Plan complete and saved to `docs/plans/2026-02-06-limitless-life-8figure-optimization-implementation.md`**

Two execution options:

**1. Subagent-Driven (this session)** - I dispatch fresh subagent per task, review between tasks, fast iteration

**2. Parallel Session (separate)** - Open new session with executing-plans, batch execution with checkpoints

**Which approach?**

If Subagent-Driven chosen:
- **REQUIRED SUB-SKILL:** Use superpowers:subagent-driven-development
- Stay in this session
- Fresh subagent per task + code review

If Parallel Session chosen:
- Guide them to open new session in worktree
- **REQUIRED SUB-SKILL:** New session uses superpowers:executing-plans
