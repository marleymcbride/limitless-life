-- Multi-Site Lead Integration: Add tracking columns to users table
-- Date: 2026-02-24

-- Add new columns for multi-site lead tracking
ALTER TABLE users
  ADD COLUMN IF NOT EXISTS source_site VARCHAR(50),
  ADD COLUMN IF NOT EXISTS lead_action VARCHAR(50),
  ADD COLUMN IF NOT EXISTS last_action VARCHAR(50),
  ADD COLUMN IF NOT EXISTS last_seen_site VARCHAR(50),
  ADD COLUMN IF NOT EXISTS first_touch_date TIMESTAMP;

-- Set first touch date for existing users
UPDATE users SET first_touch_date = created_at WHERE first_touch_date IS NULL;

-- CRITICAL: Email index for upsert performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_source_site ON users(source_site);
CREATE INDEX IF NOT EXISTS idx_users_lead_action ON users(lead_action);
CREATE INDEX IF NOT EXISTS idx_users_lead_temperature ON users(lead_temperature);
