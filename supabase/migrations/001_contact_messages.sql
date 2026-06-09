-- Run in Supabase: SQL Editor → New query → Run

create table if not exists public.contact_messages (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default timezone('utc', now()) not null,
  name text not null check (char_length(name) <= 100),
  email text not null check (email ~* '^[^@]+@[^@]+\.[^@]+$'),
  message text not null check (char_length(message) <= 2000),
  ip_hash text,
  status text default 'unread' check (status in ('unread', 'read', 'archived'))
);

alter table public.contact_messages enable row level security;

-- No policies for anon/authenticated = public cannot read or write.
-- API uses SUPABASE_SERVICE_ROLE_KEY server-side, which bypasses RLS.
