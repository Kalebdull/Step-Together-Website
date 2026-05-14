-- Step Together Line Dance — Initial Schema
-- Run this in Supabase SQL Editor → New Query

-- Profiles (extends auth.users)
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  full_name text,
  avatar_url text,
  role text not null default 'member' check (role in ('member', 'admin')),
  membership_tier text not null default 'free' check (membership_tier in ('free', 'community', 'premium')),
  stripe_customer_id text unique,
  created_at timestamptz not null default now()
);

-- Auto-create profile on user signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name'
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Classes
create table if not exists classes (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  location text,
  address text,
  day_of_week text,
  time text,
  level text default 'All Levels' check (level in ('Beginner','Intermediate','Advanced','All Levels')),
  instructor text default 'Cinnamon Leigh Dull',
  price numeric(10,2) not null default 0,
  is_free boolean not null default false,
  max_capacity integer,
  image_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- Events
create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  event_type text default 'social' check (event_type in ('themed_night','boot_camp','social','special')),
  location text,
  address text,
  event_date timestamptz,
  end_date timestamptz,
  price numeric(10,2) not null default 0,
  is_free boolean not null default false,
  max_capacity integer,
  image_url text,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

-- Workshops
create table if not exists workshops (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  location text,
  start_date timestamptz,
  end_date timestamptz,
  price numeric(10,2),
  max_capacity integer,
  image_url text,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

-- Partnerships
create table if not exists partnerships (
  id uuid primary key default gen_random_uuid(),
  partner_name text not null,
  description text,
  logo_url text,
  website_url text,
  partnership_type text default 'venue' check (partnership_type in ('venue','brand','organization')),
  is_featured boolean not null default false,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- Apparel Products
create table if not exists apparel_products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price numeric(10,2),
  image_url text,
  category text,
  is_coming_soon boolean not null default true,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- Memberships
create table if not exists memberships (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price numeric(10,2) not null default 0,
  interval text not null default 'month' check (interval in ('month','year')),
  stripe_price_id text,
  features text[] not null default '{}',
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- Registrations
create table if not exists registrations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  entity_type text not null check (entity_type in ('class','event','workshop')),
  entity_id uuid not null,
  status text not null default 'confirmed' check (status in ('confirmed','cancelled','waitlist')),
  payment_status text not null default 'pending' check (payment_status in ('pending','paid','failed','refunded')),
  stripe_session_id text,
  created_at timestamptz not null default now()
);

-- Contact Submissions
create table if not exists contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

-- Newsletter Subscribers
create table if not exists newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  name text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- Site Settings
create table if not exists site_settings (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,
  value text,
  updated_at timestamptz not null default now()
);
