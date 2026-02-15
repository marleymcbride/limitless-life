-- Migration: Fix lead_alerts table schema to match n8n integration spec
-- Date: 2026-02-15
-- Purpose: Add missing columns needed by n8n webhooks for Airtable sync

-- ============================================================================
-- STEP 1: Add missing columns to lead_alerts
-- ============================================================================

-- Add email column (needed for n8n webhook payload)
ALTER TABLE lead_alerts
ADD COLUMN IF NOT EXISTS email TEXT;

-- Add score column (needed to track lead score at alert time)
ALTER TABLE lead_alerts
ADD COLUMN IF NOT EXISTS score INTEGER;

-- Add trigger_event column (needed to know what event caused hot lead status)
ALTER TABLE lead_alerts
ADD COLUMN IF NOT EXISTS trigger_event TEXT;

-- ============================================================================
-- STEP 2: Rename sent_at to created_at for consistency with documentation
-- ============================================================================

-- Rename column to match documentation spec
ALTER TABLE lead_alerts
RENAME COLUMN sent_at TO created_at;

-- ============================================================================
-- STEP 3: Update existing data (if any)
-- ============================================================================

-- Backfill email from users table for existing records
UPDATE lead_alerts la
SET email = u.email
FROM users u
WHERE la.user_id = u.id
  AND la.email IS NULL;

-- Backfill score from users table for existing records
UPDATE lead_alerts la
SET score = u.lead_score
FROM users u
WHERE la.user_id = u.id
  AND la.score IS NULL;

-- Set default trigger_event for existing records (if not set)
UPDATE lead_alerts
SET trigger_event = 'unknown'
WHERE trigger_event IS NULL;

-- ============================================================================
-- STEP 4: Create indexes for performance
-- ============================================================================

-- Index on email for n8n lookups
CREATE INDEX IF NOT EXISTS idx_lead_alerts_email ON lead_alerts(email);

-- Index on score for filtering hot leads
CREATE INDEX IF NOT EXISTS idx_lead_alerts_score ON lead_alerts(score);

-- Index on created_at for time-based queries
CREATE INDEX IF NOT EXISTS idx_lead_alerts_created_at ON lead_alerts(created_at);

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================

-- Verify the schema is now correct
SELECT
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'lead_alerts'
ORDER BY ordinal_position;

-- Expected output:
-- column_name      | data_type | is_nullable | column_default
-- -----------------|-----------|-------------|---------------------------
-- id               | uuid      | NO          | gen_random_uuid()
-- user_id          | uuid      | NO          |
-- email            | text      | YES         | NULL
-- score            | integer   | YES         | NULL
-- alert_type       | text      | NO          |
-- trigger_event   | text      | YES         | NULL
-- created_at       | timestamp | YES         | NOW()
-- first_contact_at | timestamp | YES         | NULL
-- response_time... | integer   | YES         | NULL

-- ============================================================================
-- ROLLBACK SCRIPT (if needed)
-- ============================================================================

-- To rollback this migration, use:
-- DROP INDEX IF EXISTS idx_lead_alerts_email;
-- DROP INDEX IF EXISTS idx_lead_alerts_score;
-- DROP INDEX IF EXISTS idx_lead_alerts_created_at;
-- ALTER TABLE lead_alerts DROP COLUMN IF EXISTS email;
-- ALTER TABLE lead_alerts DROP COLUMN IF EXISTS score;
-- ALTER TABLE lead_alerts DROP COLUMN IF EXISTS trigger_event;
-- ALTER TABLE lead_alerts RENAME COLUMN created_at TO sent_at;
