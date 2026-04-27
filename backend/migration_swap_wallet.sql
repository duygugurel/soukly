-- ═════════════════════════════════════════════════════════════════════
--  SouklyClub — Swap & Wallet migration
--  Run this entire file in the Supabase SQL Editor (one time).
-- ═════════════════════════════════════════════════════════════════════

-- 1. Add swap-open flag to products
alter table products add column if not exists is_swap_open boolean not null default false;

-- 2. Swap proposals (buyer offers their product for seller's product)
create table if not exists swap_proposals (
  id uuid primary key default gen_random_uuid(),
  proposed_product_id   uuid not null references products(id) on delete cascade,  -- buyer's offered product
  target_product_id     uuid not null references products(id) on delete cascade,  -- seller's product
  proposer_profile_id   uuid not null references profiles(id) on delete cascade,  -- buyer
  recipient_profile_id  uuid not null references profiles(id) on delete cascade,  -- seller
  message text,
  price_difference_sd   numeric(10,2) not null default 0,  -- absolute difference (in Soukly Dirham, 1 SD = 1 AED)
  diff_payer_profile_id uuid references profiles(id) on delete set null, -- who pays the difference (the lower-priced product owner)
  status text not null default 'pending' check (status in ('pending', 'accepted', 'rejected', 'cancelled', 'completed')),
  created_at timestamptz not null default now()
);

-- 3. Per-user wallet (Soukly Dirham balance)
create table if not exists wallets (
  profile_id  uuid primary key references profiles(id) on delete cascade,
  balance_sd  numeric(10,2) not null default 0,
  updated_at  timestamptz not null default now()
);

-- 4. Wallet transaction ledger
create table if not exists wallet_transactions (
  id uuid primary key default gen_random_uuid(),
  profile_id        uuid not null references profiles(id) on delete cascade,
  type text not null check (type in ('topup','withdraw','sale','purchase','swap_diff_in','swap_diff_out','adjustment')),
  amount_sd         numeric(10,2) not null,           -- positive numbers; sign implied by type
  description       text,
  related_swap_id   uuid references swap_proposals(id) on delete set null,
  related_product_id uuid references products(id) on delete set null,
  created_at        timestamptz not null default now()
);

-- 5. Notification types extended (no schema change — type column is free text)
--    New types we'll use: 'swap_proposed', 'swap_accepted', 'swap_rejected'

-- ═════ Row Level Security ═════
alter table swap_proposals     enable row level security;
alter table wallets            enable row level security;
alter table wallet_transactions enable row level security;

-- Swap proposals: visible to either party
drop policy if exists "Users can read swap proposals involving them" on swap_proposals;
create policy "Users can read swap proposals involving them"
  on swap_proposals for select using (
    auth.uid() = (select auth_user_id from profiles where id = proposer_profile_id) or
    auth.uid() = (select auth_user_id from profiles where id = recipient_profile_id)
  );

drop policy if exists "Buyers can create swap proposals" on swap_proposals;
create policy "Buyers can create swap proposals"
  on swap_proposals for insert with check (
    auth.uid() = (select auth_user_id from profiles where id = proposer_profile_id)
  );

drop policy if exists "Recipient can update swap status" on swap_proposals;
create policy "Recipient can update swap status"
  on swap_proposals for update using (
    auth.uid() = (select auth_user_id from profiles where id = recipient_profile_id) or
    auth.uid() = (select auth_user_id from profiles where id = proposer_profile_id)
  );

-- Wallets: each user reads their own
drop policy if exists "Users can read their own wallet" on wallets;
create policy "Users can read their own wallet"
  on wallets for select using (
    auth.uid() = (select auth_user_id from profiles where id = profile_id)
  );

drop policy if exists "Users can upsert their own wallet" on wallets;
create policy "Users can upsert their own wallet"
  on wallets for insert with check (
    auth.uid() = (select auth_user_id from profiles where id = profile_id)
  );

drop policy if exists "Users can update their own wallet" on wallets;
create policy "Users can update their own wallet"
  on wallets for update using (
    auth.uid() = (select auth_user_id from profiles where id = profile_id)
  );

-- Wallet transactions: each user reads their own
drop policy if exists "Users can read their own wallet transactions" on wallet_transactions;
create policy "Users can read their own wallet transactions"
  on wallet_transactions for select using (
    auth.uid() = (select auth_user_id from profiles where id = profile_id)
  );

drop policy if exists "Users can insert their own wallet transactions" on wallet_transactions;
create policy "Users can insert their own wallet transactions"
  on wallet_transactions for insert with check (
    auth.uid() = (select auth_user_id from profiles where id = profile_id)
  );
