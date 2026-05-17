-- MOLBAB ONLINE RANKED / GOOGLE OAUTH / TIER / ENDING CLOUD SAVE PATCH
-- Run this once in Supabase SQL Editor.
-- This converts the existing simple scores table into login-based ranked data.

create table if not exists public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  nickname text not null,
  tier text not null default '방출 후보',
  best_score integer not null default 0,
  best_combo integer not null default 0,
  total_plays integer not null default 0,
  endings_unlocked_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  constraint profiles_nickname_len check (char_length(nickname) between 1 and 20),
  constraint profiles_best_score_range check (best_score between 0 and 9999999),
  constraint profiles_best_combo_range check (best_combo between 0 and 9999)
);

create table if not exists public.ending_unlocks (
  user_id uuid not null references auth.users(id) on delete cascade,
  ending_key text not null,
  unlocked_at timestamptz not null default now(),
  primary key (user_id, ending_key),
  constraint ending_key_valid check (
    ending_key in ('perfect','clear','kimchiKing','riceOnly','silent','comboMaster','tightrope','comeback','intern','rocket')
  )
);

alter table public.scores
add column if not exists user_id uuid references auth.users(id) on delete cascade;

alter table public.scores
add column if not exists tier text not null default '방출 후보';

alter table public.scores
add column if not exists mode text not null default 'ranked';

alter table public.scores
add column if not exists best_score_after integer not null default 0;

alter table public.scores enable row level security;
alter table public.profiles enable row level security;
alter table public.ending_unlocks enable row level security;

grant usage on schema public to anon, authenticated;
grant select on public.profiles to anon, authenticated;
grant select on public.scores to anon, authenticated;
grant select, insert, update on public.profiles to authenticated;
grant select, insert on public.scores to authenticated;
grant select, insert, update on public.ending_unlocks to authenticated;

drop policy if exists "scores_select_public" on public.scores;
drop policy if exists "scores_insert_public" on public.scores;
drop policy if exists "scores_insert_authenticated_owner" on public.scores;

create policy "scores_select_public"
on public.scores
for select
to anon, authenticated
using (true);

create policy "scores_insert_authenticated_owner"
on public.scores
for insert
to authenticated
with check (
  user_id = auth.uid()
  and char_length(nickname) between 1 and 20
  and total_score between 0 and 9999999
  and stage between 1 and 10
  and max_combo between 0 and 9999
  and rice_count between 0 and 99999
  and kimchi_count between 0 and 99999
  and caught_count between 0 and 999
  and objective_fail_count between 0 and 5
  and mode in ('ranked')
);

drop policy if exists "profiles_select_public" on public.profiles;
drop policy if exists "profiles_insert_own" on public.profiles;
drop policy if exists "profiles_update_own" on public.profiles;

create policy "profiles_select_public"
on public.profiles
for select
to anon, authenticated
using (true);

create policy "profiles_insert_own"
on public.profiles
for insert
to authenticated
with check (user_id = auth.uid());

create policy "profiles_update_own"
on public.profiles
for update
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

drop policy if exists "ending_unlocks_select_own" on public.ending_unlocks;
drop policy if exists "ending_unlocks_insert_own" on public.ending_unlocks;
drop policy if exists "ending_unlocks_update_own" on public.ending_unlocks;

create policy "ending_unlocks_select_own"
on public.ending_unlocks
for select
to authenticated
using (user_id = auth.uid());

create policy "ending_unlocks_insert_own"
on public.ending_unlocks
for insert
to authenticated
with check (user_id = auth.uid());

create policy "ending_unlocks_update_own"
on public.ending_unlocks
for update
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

create index if not exists profiles_best_score_idx on public.profiles (best_score desc, best_combo desc, updated_at asc);
create index if not exists scores_user_created_idx on public.scores (user_id, created_at desc);
create index if not exists scores_total_score_idx on public.scores (total_score desc, max_combo desc, created_at asc);
create index if not exists ending_unlocks_user_idx on public.ending_unlocks (user_id, unlocked_at desc);
