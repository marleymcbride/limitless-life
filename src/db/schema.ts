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
  deviceType: text('device_type').$type<'mobile' | 'tablet' | 'desktop'>(),
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
