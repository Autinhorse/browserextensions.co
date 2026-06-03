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

-- Feedback / bug reports and feature requests -------------------------------
create table if not exists public.feedback (
  id              uuid primary key default gen_random_uuid(),
  type            text not null check (type in ('bug', 'feature')),
  app             text not null check (app in ('aichatsnapper', 'websnapper', 'reviewsnapper')),
  version         text,
  lang            text,
  platform        text check (
    platform is null or platform in (
      'chatgpt',
      'gemini',
      'claude',
      'grok',
      'mistral',
      'doubao',
      'qianwen',
      'kimi',
      'perplexity',
      'deepseek'
    )
  ),
  email           text,
  title           text not null,
  message         text not null,
  page_url        text,
  issue_url       text,
  user_agent      text,
  referrer        text,
  ip_hash         text,
  status          text not null default 'new' check (status in ('new', 'triaged', 'planned', 'closed')),
  created_at      timestamptz not null default now()
);

create index if not exists feedback_created_at_idx on public.feedback (created_at desc);
create index if not exists feedback_status_idx on public.feedback (status);
create index if not exists feedback_app_type_idx on public.feedback (app, type);

alter table public.feedback add column if not exists issue_url text;
alter table public.feedback enable row level security;

-- Inserts happen server-side via the service-role key (which bypasses RLS),
-- so no public insert policy is granted. Reads are admin-only by default.

-- Private attachment storage. Run this after Supabase Storage is enabled.
insert into storage.buckets (id, name, public, file_size_limit)
values ('feedback-attachments', 'feedback-attachments', false, 10485760)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit;

create table if not exists public.feedback_attachments (
  id                 uuid primary key default gen_random_uuid(),
  feedback_id        uuid not null references public.feedback(id) on delete cascade,
  storage_bucket     text not null default 'feedback-attachments',
  storage_path       text not null unique,
  original_filename  text not null,
  content_type       text,
  size_bytes         bigint not null,
  created_at         timestamptz not null default now()
);

create index if not exists feedback_attachments_feedback_id_idx
  on public.feedback_attachments (feedback_id);

alter table public.feedback_attachments enable row level security;
