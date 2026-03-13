import { pgTable, uuid, text, integer, timestamp, jsonb, index, boolean } from 'drizzle-orm/pg-core';

export const sessions = pgTable('sessions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'set null' }),
  firstSeen: timestamp('first_seen').defaultNow(),
  lastSeen: timestamp('last_seen').defaultNow(),
  utmSource: text('utm_source'),
  utmMedium: text('utm_medium'),
  utmCampaign: text('utm_campaign'),
  utmContent: text('utm_content'),
  utmTerm: text('utm_term'),
  referrer: text('referrer'),
  deviceType: text('device_type').$type<'mobile' | 'tablet' | 'desktop'>(),
  browser: text('browser'),
  ipAddress: text('ip_address'),
  countryCode: text('country_code'),
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
  leadTemperature: text('lead_temperature').$type<'cold' | 'warm' | 'hot'>(),
  status: text('status').$type<'prospect' | 'lead' | 'customer'>().default('prospect'),
  tierInterest: text('tier_interest').$type<'course' | 'll' | 'll+wa' | 'lhc'>(),
  firstSeen: timestamp('first_seen').defaultNow(),
  lastSeen: timestamp('last_seen').defaultNow(),
  createdAt: timestamp('created_at').defaultNow(),
  // New columns for multi-site lead tracking
  sourceSite: text('source_site').$type<'3weeks.co' | 'limitless-life.co' | 'marleymcbride.co' | 'systeme.io' | 'other'>(),
  leadAction: text('lead_action').$type<'work-with-me' | 'email-signup' | 'popup-completed' | 'applied'>(),
  lastAction: text('last_action').$type<'work-with-me' | 'email-signup' | 'popup-completed' | 'applied'>(),
  lastSeenSite: text('last_seen_site'),
  firstTouchDate: timestamp('first_touch_date'),
}, (table) => ({
  emailIdx: index('idx_users_email').on(table.email),
  leadScoreIdx: index('idx_users_lead_score').on(table.leadScore),
  // New indexes for multi-site lead tracking
  sourceSiteIdx: index('idx_users_source_site').on(table.sourceSite),
  leadActionIdx: index('idx_users_lead_action').on(table.leadAction),
  leadTemperatureIdx: index('idx_users_lead_temperature').on(table.leadTemperature),
}));

export const contactTagEvents = pgTable('contact_tag_events', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'set null' }),
  email: text('email').notNull(),
  tagId: integer('tag_id').notNull(),
  tagName: text('tag_name').notNull(),
  detectedAt: timestamp('detected_at').defaultNow(),
}, (table) => ({
  emailIdx: index('idx_tag_events_email').on(table.email),
  tagIdIdx: index('idx_tag_events_tag_id').on(table.tagId),
  detectedAtIdx: index('idx_tag_events_detected_at').on(table.detectedAt),
}));

export const events = pgTable('events', {
  id: uuid('id').primaryKey(),
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
  tier: text('tier').$type<'Course' | 'LL' | 'LL+WA' | 'LHC'>(), // Which tier they purchased
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
  nextAttemptAt: timestamp('next_attempt_at'),
  deliveredAt: timestamp('delivered_at'),
  errorMessage: text('error_message'),
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => ({
  statusIdx: index('idx_webhook_queue_status').on(table.status, table.createdAt),
  nextAttemptIdx: index('idx_webhook_queue_next_attempt').on(table.status, table.nextAttemptAt),
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

// Revtrack Campaign Tables
export const campaigns = pgTable('campaigns', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  category: text('category').$type<'comm' | 'video' | 'web'>().notNull(),
  utmCampaign: text('utm_campaign').notNull().unique(),
  sourceUrl: text('source_url'),
  publishedAt: timestamp('published_at'),
  firstEventAt: timestamp('first_event_at'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
}, (table) => ({
  utmCampaignIdx: index('idx_campaigns_utm_campaign').on(table.utmCampaign),
  categoryIdx: index('idx_campaigns_category').on(table.category),
  publishedAtIdx: index('idx_campaigns_published_at').on(table.publishedAt),
}));

export const campaignMetrics = pgTable('campaign_metrics', {
  id: uuid('id').primaryKey().defaultRandom(),
  campaignId: uuid('campaign_id').references(() => campaigns.id, { onDelete: 'cascade' }).notNull(),
  metricDate: timestamp('metric_date').notNull(),
  views: integer('views').default(0),
  clicks: integer('clicks').default(0),
  emails: integer('emails').default(0),
  sales: integer('sales').default(0),
  revenue: integer('revenue').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
}, (table) => ({
  campaignIdIdx: index('idx_campaign_metrics_campaign_id').on(table.campaignId),
  metricDateIdx: index('idx_campaign_metrics_metric_date').on(table.metricDate),
  campaignDateUniqueIdx: index('idx_campaign_metrics_campaign_date').on(table.campaignId, table.metricDate),
}));

// Waitlist signups table - separate from users for clean data segmentation
export const waitlistSignups = pgTable('waitlist_signups', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  firstName: text('first_name'),
  createdAt: timestamp('created_at').defaultNow(),

  // Waitlist-specific fields
  cohortLaunchDate: timestamp('cohort_launch_date').defaultNow(),

  // Interest level from Step 3 choice
  interestLevel: text('interest_level').$type<'cohort-hot' | 'cohort-warm' | 'cohort-future'>().notNull(),

  // Choice mapping
  choice: text('choice').$type<'yes' | 'maybe' | 'no'>().notNull(),
  choiceDescription: text('choice_description'),

  // Lead scoring for waitlist
  leadScore: integer('lead_score').default(50),
  leadTemperature: text('lead_temperature').$type<'cold' | 'warm' | 'hot'>().default('warm'),

  // Source tracking
  flowType: text('flow_type').default('waitlist'),
  sourceSite: text('source_site').default('limitless-life.co'),
  tier: text('tier'),

  // Status tracking
  status: text('status').$type<'waitlist' | 'applied' | 'accepted' | 'rejected' | 'withdrawn'>().default('waitlist'),

  // Metadata
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  referrer: text('referrer'),
  utmSource: text('utm_source'),
  utmMedium: text('utm_medium'),
  utmCampaign: text('utm_campaign'),
  utmTerm: text('utm_term'),
  utmContent: text('utm_content'),

  // Timestamps
  firstSeen: timestamp('first_seen').defaultNow(),
  lastSeen: timestamp('last_seen').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
}, (table) => ({
  emailIdx: index('idx_waitlist_signups_email').on(table.email),
  interestLevelIdx: index('idx_waitlist_signups_interest_level').on(table.interestLevel),
  leadScoreIdx: index('idx_waitlist_signups_lead_score').on(table.leadScore),
  statusIdx: index('idx_waitlist_signups_status').on(table.status),
  createdAtIdx: index('idx_waitlist_signups_created_at').on(table.createdAt),
}));
