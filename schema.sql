-- Run once in Supabase: SQL Editor -> New query. Replace ADMIN_EMAIL_HERE first.
create table public.responses (
  participant_id uuid primary key,
  created_at timestamptz not null default now(),
  survey_version text not null,
  consent boolean not null check (consent),
  duration_s int check (duration_s between 0 and 86400),
  profile jsonb not null check (pg_column_size(profile) < 4000),
  answers jsonb not null check (pg_column_size(answers) < 30000)
);
alter table public.responses enable row level security;
revoke all on public.responses from anon, authenticated;
grant insert on public.responses to anon;
grant select on public.responses to authenticated;
-- Visitors can ONLY insert. They cannot read, update or delete anything.
create policy "submit only" on public.responses for insert to anon with check (consent and survey_version = '1.0');
-- Only this one logged-in account can read.
create policy "admin read" on public.responses for select to authenticated using ((auth.jwt() ->> 'email') = 'ADMIN_EMAIL_HERE');
