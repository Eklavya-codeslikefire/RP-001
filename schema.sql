-- Schema for "Youth Aspirations & India" Research Study
-- Run this script in the Supabase SQL Editor (Dashboard > SQL Editor)

-- 1. Create the responses table
CREATE TABLE IF NOT EXISTS public.responses (
  participant_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  survey_version TEXT NOT NULL,
  consent BOOLEAN NOT NULL CHECK (consent = true),
  duration_s INT NOT NULL CHECK (duration_s >= 0 AND duration_s <= 86400),
  profile JSONB NOT NULL CHECK (octet_length(profile::text) < 4000),
  answers JSONB NOT NULL CHECK (octet_length(answers::text) < 30000)
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.responses ENABLE ROW LEVEL SECURITY;

-- 3. Revoke all permissions by default
REVOKE ALL ON public.responses FROM PUBLIC, anon, authenticated;

-- 4. Grant least-privilege access
GRANT INSERT ON public.responses TO anon;
GRANT SELECT ON public.responses TO authenticated;

-- 5. Policies:
-- Anonymous participants can only INSERT valid, consented responses with version '1.0'
DROP POLICY IF EXISTS "Anon insert responses" ON public.responses;
CREATE POLICY "Anon insert responses"
ON public.responses
FOR INSERT
TO anon
WITH CHECK (
  consent = true AND survey_version = '1.0'
);

-- Authenticated admin can SELECT responses
-- REPLACE 'ADMIN_EMAIL_HERE' with the admin's email address created in Supabase Auth
DROP POLICY IF EXISTS "Admin select responses" ON public.responses;
CREATE POLICY "Admin select responses"
ON public.responses
FOR SELECT
TO authenticated
USING (
  (auth.jwt()->>'email') = 'unskilled179@gmail.com' -- Change to your admin email address
);

-- No UPDATE or DELETE policies are created to guarantee immutability of collected research data.
