-- Run this in the Supabase SQL editor to set up the initial schema.

-- Waitlist / email capture ---------------------------------------------------
create table if not exists public.waitlist (
  id          uuid primary key default gen_random_uuid(),
  email       text not null unique,
  source      text,
  created_at  timestamptz not null default now()
);

alter table public.waitlist enable row level security;

-- Inserts happen server-side via the service-role key (which bypasses RLS),
-- so no public insert policy is granted. Reads are admin-only by default.
