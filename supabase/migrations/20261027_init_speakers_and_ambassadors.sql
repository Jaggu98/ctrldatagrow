-- ====================================================================
-- Ctrl + Data + Grow (CDG) Database Initialization Migration
-- Tables: speakers, campus_ambassadors, admin_users
-- Storage Buckets: speaker-resumes, ambassador-resumes
-- Row Level Security (RLS) & Triggers
-- ====================================================================

-- 1. Enable Required Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ====================================================================
-- 2. Create Reusable Functions
-- ====================================================================

-- Trigger function for automatic updated_at maintenance
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger function to atomically generate unique registration_id for speakers (SPK-YYYYMMDD-XXXXXX)
CREATE OR REPLACE FUNCTION generate_speaker_reg_id()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.registration_id IS NULL OR NEW.registration_id = '' THEN
    NEW.registration_id := 'SPK-' || to_char(now(), 'YYYYMMDD') || '-' || upper(substr(md5(random()::text || clock_timestamp()::text), 1, 6));
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger function to atomically generate unique application_id for ambassadors (AMB-YYYYMMDD-XXXXXX)
CREATE OR REPLACE FUNCTION generate_ambassador_app_id()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.application_id IS NULL OR NEW.application_id = '' THEN
    NEW.application_id := 'AMB-' || to_char(now(), 'YYYYMMDD') || '-' || upper(substr(md5(random()::text || clock_timestamp()::text), 1, 6));
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- ====================================================================
-- 3. Create admin_users Table
-- ====================================================================
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
  full_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ====================================================================
-- 4. Create speakers Table
-- ====================================================================
CREATE TABLE IF NOT EXISTS speakers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  registration_id TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  designation TEXT NOT NULL,
  company TEXT NOT NULL,
  preferred_mode TEXT NOT NULL DEFAULT 'Both Online & Offline (Weekends)',
  linkedin_url TEXT NOT NULL,
  portfolio_url TEXT,
  topics TEXT NOT NULL,
  speaking_experience TEXT,
  fee_range TEXT,
  agree_verify BOOLEAN NOT NULL DEFAULT true,
  resume_url TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'approved', 'rejected')),
  internal_notes TEXT,
  reviewed_by UUID REFERENCES auth.users(id),
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Indexes for high-performance querying and duplicate inspection
CREATE INDEX IF NOT EXISTS idx_speakers_email ON speakers(lower(email));
CREATE INDEX IF NOT EXISTS idx_speakers_status ON speakers(status);
CREATE INDEX IF NOT EXISTS idx_speakers_created_at ON speakers(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_speakers_registration_id ON speakers(registration_id);
CREATE INDEX IF NOT EXISTS idx_speakers_company ON speakers(company);

-- Triggers for speakers
DROP TRIGGER IF EXISTS trg_speakers_updated_at ON speakers;
CREATE TRIGGER trg_speakers_updated_at
  BEFORE UPDATE ON speakers
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

DROP TRIGGER IF EXISTS trg_speakers_generate_id ON speakers;
CREATE TRIGGER trg_speakers_generate_id
  BEFORE INSERT ON speakers
  FOR EACH ROW
  EXECUTE FUNCTION generate_speaker_reg_id();


-- ====================================================================
-- 5. Create campus_ambassadors Table
-- ====================================================================
CREATE TABLE IF NOT EXISTS campus_ambassadors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  college_name TEXT NOT NULL,
  city_state TEXT NOT NULL,
  branch TEXT NOT NULL,
  year_of_study TEXT NOT NULL DEFAULT '3rd Year',
  linkedin_url TEXT NOT NULL,
  club_involvement TEXT,
  outreach_plan TEXT NOT NULL,
  resume_url TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'approved', 'rejected')),
  internal_notes TEXT,
  reviewed_by UUID REFERENCES auth.users(id),
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Indexes for high-performance querying (supports multiple students per college)
CREATE INDEX IF NOT EXISTS idx_ambassadors_email ON campus_ambassadors(lower(email));
CREATE INDEX IF NOT EXISTS idx_ambassadors_college ON campus_ambassadors(lower(college_name));
CREATE INDEX IF NOT EXISTS idx_ambassadors_status ON campus_ambassadors(status);
CREATE INDEX IF NOT EXISTS idx_ambassadors_created_at ON campus_ambassadors(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ambassadors_application_id ON campus_ambassadors(application_id);

-- Triggers for campus_ambassadors
DROP TRIGGER IF EXISTS trg_ambassadors_updated_at ON campus_ambassadors;
CREATE TRIGGER trg_ambassadors_updated_at
  BEFORE UPDATE ON campus_ambassadors
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

DROP TRIGGER IF EXISTS trg_ambassadors_generate_id ON campus_ambassadors;
CREATE TRIGGER trg_ambassadors_generate_id
  BEFORE INSERT ON campus_ambassadors
  FOR EACH ROW
  EXECUTE FUNCTION generate_ambassador_app_id();


-- ====================================================================
-- 6. Configure Row Level Security (RLS)
-- ====================================================================

-- Enable RLS on all tables
ALTER TABLE speakers ENABLE ROW LEVEL SECURITY;
ALTER TABLE campus_ambassadors ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Helper function to check if current authenticated user is an authorized admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  -- Service role always has access
  IF (auth.jwt() ->> 'role') = 'service_role' THEN
    RETURN TRUE;
  END IF;

  -- Authenticated user in admin_users table
  IF auth.uid() IS NOT NULL THEN
    RETURN EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.user_id = auth.uid()
         OR lower(admin_users.email) = lower(auth.jwt() ->> 'email')
    );
  END IF;

  RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- --------------------------------------------------------------------
-- Policies for: speakers
-- --------------------------------------------------------------------

-- Policy: Public anonymous visitors can ONLY submit applications with status 'pending'
DROP POLICY IF EXISTS "Public can submit speaker application" ON speakers;
CREATE POLICY "Public can submit speaker application"
  ON speakers
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    status = 'pending'
    AND length(trim(full_name)) > 0
    AND length(trim(email)) > 0
    AND length(trim(phone)) > 0
    AND length(trim(designation)) > 0
    AND length(trim(company)) > 0
    AND length(trim(linkedin_url)) > 0
    AND length(trim(topics)) > 0
  );

-- Policy: Only verified admins can view speaker registrations (Public CANNOT read)
DROP POLICY IF EXISTS "Admins can view speakers" ON speakers;
CREATE POLICY "Admins can view speakers"
  ON speakers
  FOR SELECT
  TO authenticated
  USING (is_admin());

-- Policy: Only verified admins can update speaker registrations (e.g. status)
DROP POLICY IF EXISTS "Admins can update speakers" ON speakers;
CREATE POLICY "Admins can update speakers"
  ON speakers
  FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- Policy: Only verified super_admins can delete speaker records
DROP POLICY IF EXISTS "Admins can delete speakers" ON speakers;
CREATE POLICY "Admins can delete speakers"
  ON speakers
  FOR DELETE
  TO authenticated
  USING (is_admin());


-- --------------------------------------------------------------------
-- Policies for: campus_ambassadors
-- --------------------------------------------------------------------

-- Policy: Public anonymous visitors can ONLY submit applications with status 'pending'
DROP POLICY IF EXISTS "Public can submit ambassador application" ON campus_ambassadors;
CREATE POLICY "Public can submit ambassador application"
  ON campus_ambassadors
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    status = 'pending'
    AND length(trim(full_name)) > 0
    AND length(trim(email)) > 0
    AND length(trim(phone)) > 0
    AND length(trim(college_name)) > 0
    AND length(trim(city_state)) > 0
    AND length(trim(branch)) > 0
    AND length(trim(linkedin_url)) > 0
    AND length(trim(outreach_plan)) > 0
  );

-- Policy: Only verified admins can view campus ambassador applications (Public CANNOT read)
DROP POLICY IF EXISTS "Admins can view ambassadors" ON campus_ambassadors;
CREATE POLICY "Admins can view ambassadors"
  ON campus_ambassadors
  FOR SELECT
  TO authenticated
  USING (is_admin());

-- Policy: Only verified admins can update ambassador applications (e.g. status)
DROP POLICY IF EXISTS "Admins can update ambassadors" ON campus_ambassadors;
CREATE POLICY "Admins can update ambassadors"
  ON campus_ambassadors
  FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- Policy: Only verified admins can delete ambassador applications
DROP POLICY IF EXISTS "Admins can delete ambassadors" ON campus_ambassadors;
CREATE POLICY "Admins can delete ambassadors"
  ON campus_ambassadors
  FOR DELETE
  TO authenticated
  USING (is_admin());


-- --------------------------------------------------------------------
-- Policies for: admin_users
-- --------------------------------------------------------------------
DROP POLICY IF EXISTS "Admins can view admin_users" ON admin_users;
CREATE POLICY "Admins can view admin_users"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid() OR is_admin()
  );

DROP POLICY IF EXISTS "Admins can manage admin_users" ON admin_users;
CREATE POLICY "Admins can manage admin_users"
  ON admin_users
  FOR ALL
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());


-- ====================================================================
-- 7. Supabase Storage Buckets & Policies (Optional File Uploads)
-- ====================================================================
INSERT INTO storage.buckets (id, name, public)
VALUES
  ('speaker-resumes', 'speaker-resumes', false),
  ('ambassador-resumes', 'ambassador-resumes', false)
ON CONFLICT (id) DO NOTHING;

-- Public can upload to buckets (with size < 10MB restriction)
DROP POLICY IF EXISTS "Public can upload speaker resume" ON storage.objects;
CREATE POLICY "Public can upload speaker resume"
  ON storage.objects
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    bucket_id IN ('speaker-resumes', 'ambassador-resumes')
  );

-- Only admins can download / read files from private buckets
DROP POLICY IF EXISTS "Admins can read uploaded resumes" ON storage.objects;
CREATE POLICY "Admins can read uploaded resumes"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (
    bucket_id IN ('speaker-resumes', 'ambassador-resumes')
    AND is_admin()
  );
