-- Run this in Supabase SQL Editor to add the product ratings table.

create table if not exists product_ratings (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  buyer_profile_id uuid not null references profiles(id) on delete cascade,
  rating integer not null check (rating >= 1 and rating <= 5),
  review text,
  created_at timestamptz not null default now(),
  unique (product_id, buyer_profile_id)
);

-- Allow logged-in users to read all ratings (for averages)
alter table product_ratings enable row level security;

create policy "Anyone can read ratings"
  on product_ratings for select using (true);

create policy "Buyers can insert their own rating"
  on product_ratings for insert
  with check (auth.uid() = (select auth_user_id from profiles where id = buyer_profile_id));

create policy "Buyers can update their own rating"
  on product_ratings for update
  using (auth.uid() = (select auth_user_id from profiles where id = buyer_profile_id));
