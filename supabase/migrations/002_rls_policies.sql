-- Step Together Line Dance — Row Level Security Policies
-- Run AFTER 001_initial_schema.sql

-- Enable RLS on all tables
alter table profiles enable row level security;
alter table classes enable row level security;
alter table events enable row level security;
alter table workshops enable row level security;
alter table partnerships enable row level security;
alter table apparel_products enable row level security;
alter table memberships enable row level security;
alter table registrations enable row level security;
alter table contact_submissions enable row level security;
alter table newsletter_subscribers enable row level security;
alter table site_settings enable row level security;

-- Helper: check if current user is admin
create or replace function is_admin()
returns boolean language sql security definer as $$
  select exists (
    select 1 from profiles where id = auth.uid() and role = 'admin'
  );
$$;

-- PROFILES
create policy "Users can view own profile" on profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);
create policy "Admins can view all profiles" on profiles for select using (is_admin());
create policy "Admins can update all profiles" on profiles for update using (is_admin());

-- CLASSES (public read, admin write)
create policy "Anyone can view active classes" on classes for select using (is_active = true);
create policy "Admins can manage classes" on classes for all using (is_admin());

-- EVENTS (public read, admin write)
create policy "Anyone can view published events" on events for select using (is_published = true);
create policy "Admins can manage events" on events for all using (is_admin());

-- WORKSHOPS (public read, admin write)
create policy "Anyone can view published workshops" on workshops for select using (is_published = true);
create policy "Admins can manage workshops" on workshops for all using (is_admin());

-- PARTNERSHIPS (public read, admin write)
create policy "Anyone can view active partnerships" on partnerships for select using (is_active = true);
create policy "Admins can manage partnerships" on partnerships for all using (is_admin());

-- APPAREL (public read, admin write)
create policy "Anyone can view active apparel" on apparel_products for select using (is_active = true);
create policy "Admins can manage apparel" on apparel_products for all using (is_admin());

-- MEMBERSHIPS (public read, admin write)
create policy "Anyone can view active memberships" on memberships for select using (is_active = true);
create policy "Admins can manage memberships" on memberships for all using (is_admin());

-- REGISTRATIONS (user sees own, admin sees all)
create policy "Users can view own registrations" on registrations for select using (auth.uid() = user_id);
create policy "Users can create registrations" on registrations for insert with check (auth.uid() = user_id);
create policy "Admins can manage all registrations" on registrations for all using (is_admin());

-- CONTACT SUBMISSIONS (insert only for public, admin reads)
create policy "Anyone can submit contact form" on contact_submissions for insert with check (true);
create policy "Admins can view contact submissions" on contact_submissions for select using (is_admin());
create policy "Admins can update contact submissions" on contact_submissions for update using (is_admin());

-- NEWSLETTER (insert for public, admin manages)
create policy "Anyone can subscribe" on newsletter_subscribers for insert with check (true);
create policy "Admins can manage newsletter" on newsletter_subscribers for all using (is_admin());

-- SITE SETTINGS (public read, admin write)
create policy "Anyone can read site settings" on site_settings for select using (true);
create policy "Admins can manage site settings" on site_settings for all using (is_admin());
