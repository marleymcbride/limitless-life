-- Multi-Site Lead Integration: Create contact_tag_events table for Systeme.io tag tracking
-- Date: 2026-02-24

CREATE TABLE contact_tag_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  email VARCHAR(255) NOT NULL,
  tag_id INTEGER NOT NULL,
  tag_name VARCHAR(255) NOT NULL,
  detected_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_tag_events_email ON contact_tag_events(email);
CREATE INDEX idx_tag_events_tag_id ON contact_tag_events(tag_id);
CREATE INDEX idx_tag_events_detected_at ON contact_tag_events(detected_at);
