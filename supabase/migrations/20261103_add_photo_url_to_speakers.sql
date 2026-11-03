-- ====================================================================
-- Ctrl + Data + Grow (CDG) Migration: Add photo_url to speakers table
-- ====================================================================

ALTER TABLE speakers ADD COLUMN IF NOT EXISTS photo_url TEXT;

COMMENT ON COLUMN speakers.photo_url IS 'Public or base64 data URL of the speaker professional headshot / profile picture';
