-- Clean All Test Data - Keep 1 Entry Per Table
-- Sessions table: DELETE ALL (keep 0)
-- All other tables: DELETE ALL BUT 1 (keep 1)
-- Run with: source .env.local && psql "$DATABASE_URL" -f scripts/clean-all-test-data.sql

\echo 'Cleaning test data from all tables...'

BEGIN;

-- ============================================================================
-- STEP 1: Delete all from sessions table (keep 0)
-- ============================================================================
\echo '→ Deleting all sessions...'

-- Events must be deleted first (foreign key to sessions)
DELETE FROM events;
DELETE FROM sessions;

\echo '✓ Deleted all sessions and events'

-- ============================================================================
-- STEP 2: Delete all but 1 from child tables (those with foreign keys)
-- ============================================================================

-- contact_tag_events (references users)
DELETE FROM contact_tag_events WHERE id NOT IN (
  SELECT id FROM contact_tag_events ORDER BY detected_at DESC LIMIT 1
);
\echo '✓ Cleaned contact_tag_events (kept 1)'

-- application_submissions (references users)
DELETE FROM application_submissions WHERE id NOT IN (
  SELECT id FROM application_submissions ORDER BY created_at DESC LIMIT 1
);
\echo '✓ Cleaned application_submissions (kept 1)'

-- payments (references users)
DELETE FROM payments WHERE id NOT IN (
  SELECT id FROM payments ORDER BY created_at DESC LIMIT 1
);
\echo '✓ Cleaned payments (kept 1)'

-- webhook_queue (no foreign keys - safe to delete)
DELETE FROM webhook_queue WHERE id NOT IN (
  SELECT id FROM webhook_queue ORDER BY created_at DESC LIMIT 1
);
\echo '✓ Cleaned webhook_queue (kept 1)'

-- lead_alerts (references users)
DELETE FROM lead_alerts WHERE id NOT IN (
  SELECT id FROM lead_alerts ORDER BY sent_at DESC LIMIT 1
);
\echo '✓ Cleaned lead_alerts (kept 1)'

-- campaign_metrics (references campaigns)
-- First check if we have any campaigns
WITH kept_campaign AS (
  SELECT id FROM campaigns ORDER BY created_at DESC LIMIT 1
)
DELETE FROM campaign_metrics
WHERE campaign_id NOT IN (SELECT id FROM kept_campaign)
OR campaign_id IS NULL;
\echo '✓ Cleaned campaign_metrics (kept 1 if campaigns exist)'

-- ============================================================================
-- STEP 3: Delete all but 1 from parent tables
-- ============================================================================

-- waitlist_signups (no foreign keys to other tables)
DELETE FROM waitlist_signups WHERE id NOT IN (
  SELECT id FROM waitlist_signups ORDER BY created_at DESC LIMIT 1
);
\echo '✓ Cleaned waitlist_signups (kept 1)'

-- campaigns (parent of campaign_metrics)
DELETE FROM campaigns WHERE id NOT IN (
  SELECT id FROM campaigns ORDER BY created_at DESC LIMIT 1
);
\echo '✓ Cleaned campaigns (kept 1)'

-- users (parent of many tables)
DELETE FROM users WHERE id NOT IN (
  SELECT id FROM users ORDER BY created_at DESC LIMIT 1
);
\echo '✓ Cleaned users (kept 1)'

COMMIT;

\echo ''
\echo '✅ All tables cleaned!'
\echo '  • sessions: 0 rows (deleted all)'
\echo '  • All other tables: 1 row each'
\echo ''
\echo 'Verification:'
SELECT 'sessions' as table_name, COUNT(*) as count FROM sessions
UNION ALL
SELECT 'events', COUNT(*) FROM events
UNION ALL
SELECT 'users', COUNT(*) FROM users
UNION ALL
SELECT 'contact_tag_events', COUNT(*) FROM contact_tag_events
UNION ALL
SELECT 'application_submissions', COUNT(*) FROM application_submissions
UNION ALL
SELECT 'payments', COUNT(*) FROM payments
UNION ALL
SELECT 'webhook_queue', COUNT(*) FROM webhook_queue
UNION ALL
SELECT 'lead_alerts', COUNT(*) FROM lead_alerts
UNION ALL
SELECT 'campaigns', COUNT(*) FROM campaigns
UNION ALL
SELECT 'campaign_metrics', COUNT(*) FROM campaign_metrics
UNION ALL
SELECT 'waitlist_signups', COUNT(*) FROM waitlist_signups
ORDER BY table_name;
