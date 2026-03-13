-- Create waitlist_signups table
-- Separate from users table - dedicated to waitlist capture
-- Stores all waitlist popup submissions with interest level tracking

CREATE TABLE IF NOT EXISTS waitlist_signups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  first_name TEXT,
  created_at TIMESTAMP DEFAULT NOW(),

  -- Waitlist-specific fields
  cohort_launch_date DATE DEFAULT '2026-05-01', -- May 1st cohort

  -- Interest level from Step 3 choice
  interest_level TEXT NOT NULL CHECK (interest_level IN ('cohort-hot', 'cohort-warm', 'cohort-future')),

  -- Choice mapping
  choice TEXT NOT NULL CHECK (choice IN ('yes', 'maybe', 'no')),
  choice_description TEXT,

  -- Lead scoring for waitlist
  lead_score INTEGER DEFAULT 50,
  lead_temperature TEXT DEFAULT 'warm' CHECK (lead_temperature IN ('cold', 'warm', 'hot')),

  -- Source tracking
  flow_type TEXT DEFAULT 'waitlist',
  source_site TEXT DEFAULT 'limitless-life.co',
  tier TEXT,

  -- Status tracking
  status TEXT DEFAULT 'waitlist' CHECK (status IN ('waitlist', 'applied', 'accepted', 'rejected', 'withdrawn')),

  -- Metadata
  ip_address TEXT,
  user_agent TEXT,
  referrer TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_term TEXT,
  utm_content TEXT,

  -- Timestamps
  first_seen TIMESTAMP DEFAULT NOW(),
  last_seen TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),

  -- Constraints
  CONSTRAINT waitlist_signups_email_unique UNIQUE (email)
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_waitlist_signups_email ON waitlist_signups(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_signups_interest_level ON waitlist_signups(interest_level);
CREATE INDEX IF NOT EXISTS idx_waitlist_signups_lead_score ON waitlist_signups(lead_score);
CREATE INDEX IF NOT EXISTS idx_waitlist_signups_status ON waitlist_signups(status);
CREATE INDEX IF NOT EXISTS idx_waitlist_signups_created_at ON waitlist_signups(created_at DESC);

-- Add comments for documentation
COMMENT ON TABLE waitlist_signups IS 'Waitlist popup submissions - separate from main users table for clean data segmentation';
COMMENT ON COLUMN waitlist_signups.interest_level IS 'cohort-hot: ready for first cohort, cohort-warm: needs more info, cohort-future: interested but not ready for this cohort';
COMMENT ON COLUMN waitlist_signups.choice IS 'yes: ready to commit, maybe: need more details, no: not ready for cohort but keep in loop';
COMMENT ON COLUMN waitlist_signups.cohort_launch_date IS 'Target launch date for the cohort they expressed interest in';
