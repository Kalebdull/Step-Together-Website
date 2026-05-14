-- Step Together — Content schema additions + seed data
-- Run in Supabase SQL Editor after 003_seed_data.sql

-- Add fields to workshops that the public page uses
alter table workshops add column if not exists subtitle text;
alter table workshops add column if not exists highlights text[] not null default '{}';
alter table workshops add column if not exists is_featured boolean not null default false;

-- ── EVENTS ───────────────────────────────────────────────────────────────────
insert into events (title, description, event_type, location, event_date, price, is_free, max_capacity, is_published)
select 'Western Neon Night', 'Dust off your boots and glow up. Western neon dress code, live DJ, and all-night dancing.', 'themed_night', 'The Ranch Venue', '2026-06-07 19:00:00+00', 25, false, 80, true
where not exists (select 1 from events where title = 'Western Neon Night');

insert into events (title, description, event_type, location, event_date, price, is_free, max_capacity, is_published)
select 'Spring Boot Camp', 'A full-day intensive for all levels. Learn 6 new routines and build your confidence on the floor.', 'boot_camp', 'Studio West', '2026-06-14 09:00:00+00', 45, false, 30, true
where not exists (select 1 from events where title = 'Spring Boot Camp');

insert into events (title, description, event_type, location, event_date, price, is_free, max_capacity, is_published)
select 'Community Social Dance', 'Our monthly open social — come dance, meet new people, and feel the Step Together energy.', 'social', 'Community Hall A', '2026-06-21 18:00:00+00', 10, false, 100, true
where not exists (select 1 from events where title = 'Community Social Dance');

insert into events (title, description, event_type, location, event_date, price, is_free, max_capacity, is_published)
select 'Canada Day Stomp', 'Celebrate Canada Day with a special themed dance night. Red & white, boots required.', 'special', 'The Ranch Venue', '2026-07-01 18:00:00+00', 30, false, 120, true
where not exists (select 1 from events where title = 'Canada Day Stomp');

insert into events (title, description, event_type, location, event_date, price, is_free, max_capacity, is_published)
select 'Beginners Welcome Night', 'Never danced before? Perfect. This night is designed for you — no experience needed, just show up.', 'social', 'Community Hall B', '2026-07-12 18:00:00+00', 0, true, 50, true
where not exists (select 1 from events where title = 'Beginners Welcome Night');

-- ── WORKSHOPS ────────────────────────────────────────────────────────────────
insert into workshops (title, subtitle, description, location, start_date, end_date, price, max_capacity, highlights, is_featured, is_published)
select
  'Summer Dance Retreat',
  '3-Day Immersive Experience',
  'Three days of deep-dive line dance in the Canadian Rockies. Morning sessions, afternoon workshops, and evening socials surrounded by mountains. All levels welcome.',
  'Banff, Alberta',
  '2026-08-14 09:00:00+00',
  '2026-08-16 17:00:00+00',
  495,
  20,
  ARRAY['6 new choreographies', 'All meals included', 'Evening social dances', 'Small group — max 20 dancers'],
  true,
  true
where not exists (select 1 from workshops where title = 'Summer Dance Retreat');

insert into workshops (title, subtitle, description, location, start_date, end_date, price, max_capacity, highlights, is_featured, is_published)
select
  'Weekend Boot Camp',
  '2-Day Intensive',
  'A focused weekend to level up your footwork, timing, and stage presence. Suitable for intermediate to advanced dancers.',
  'Calgary, AB',
  '2026-09-19 09:00:00+00',
  '2026-09-20 17:00:00+00',
  195,
  30,
  ARRAY['Footwork mastery', 'Stage presence coaching', 'Video review sessions', 'Networking dinner'],
  false,
  true
where not exists (select 1 from workshops where title = 'Weekend Boot Camp');

insert into workshops (title, subtitle, description, location, start_date, end_date, price, max_capacity, highlights, is_featured, is_published)
select
  'Beginner''s Journey Workshop',
  'Half-Day Session',
  'New to line dance? This half-day workshop is your perfect starting point. Walk away knowing 2 full routines and feeling confident on any dance floor.',
  'Edmonton, AB',
  '2026-07-18 10:00:00+00',
  '2026-07-18 14:00:00+00',
  65,
  25,
  ARRAY['2 complete routines', 'No experience needed', 'Light refreshments', 'Take-home cheat sheets'],
  false,
  true
where not exists (select 1 from workshops where title = 'Beginner''s Journey Workshop');

-- ── CLASSES ──────────────────────────────────────────────────────────────────
insert into classes (title, day_of_week, time, location, level, price, max_capacity, instructor, is_active)
select 'Beginner Boot Scootin''', 'Monday', '6:30 PM', 'Community Hall A', 'Beginner', 15, 20, 'Cinnamon Leigh Dull', true
where not exists (select 1 from classes where title = 'Beginner Boot Scootin''');

insert into classes (title, day_of_week, time, location, level, price, max_capacity, instructor, is_active)
select 'Intermediate Groove', 'Wednesday', '7:00 PM', 'Studio West', 'Intermediate', 18, 20, 'Cinnamon Leigh Dull', true
where not exists (select 1 from classes where title = 'Intermediate Groove');

insert into classes (title, day_of_week, time, location, level, price, max_capacity, instructor, is_active)
select 'All Levels Open Floor', 'Friday', '7:30 PM', 'Community Hall B', 'All Levels', 12, 25, 'Cinnamon Leigh Dull', true
where not exists (select 1 from classes where title = 'All Levels Open Floor');

insert into classes (title, day_of_week, time, location, level, price, max_capacity, instructor, is_active)
select 'Advanced Footwork', 'Saturday', '10:00 AM', 'Dance Studio Main', 'Advanced', 22, 15, 'Cinnamon Leigh Dull', true
where not exists (select 1 from classes where title = 'Advanced Footwork');

insert into classes (title, day_of_week, time, location, level, price, max_capacity, instructor, is_active)
select 'Country Heat Cardio', 'Tuesday', '5:30 PM', 'Fitness Centre', 'All Levels', 14, 25, 'Cinnamon Leigh Dull', true
where not exists (select 1 from classes where title = 'Country Heat Cardio');

insert into classes (title, day_of_week, time, location, level, price, max_capacity, instructor, is_active)
select 'Saturday Social Dance', 'Saturday', '7:00 PM', 'The Ranch Venue', 'All Levels', 20, 30, 'Cinnamon Leigh Dull', true
where not exists (select 1 from classes where title = 'Saturday Social Dance');

-- ── APPAREL PRODUCTS ─────────────────────────────────────────────────────────
insert into apparel_products (name, category, is_coming_soon, is_active)
select 'Step Together Tee', 'Tops', true, true
where not exists (select 1 from apparel_products where name = 'Step Together Tee');

insert into apparel_products (name, category, is_coming_soon, is_active)
select 'Signature Hoodie', 'Tops', true, true
where not exists (select 1 from apparel_products where name = 'Signature Hoodie');

insert into apparel_products (name, category, is_coming_soon, is_active)
select 'Branded Cap', 'Accessories', true, true
where not exists (select 1 from apparel_products where name = 'Branded Cap');

insert into apparel_products (name, category, is_coming_soon, is_active)
select 'Dance Bandana', 'Accessories', true, true
where not exists (select 1 from apparel_products where name = 'Dance Bandana');

insert into apparel_products (name, category, is_coming_soon, is_active)
select 'Boot Bag', 'Gear', true, true
where not exists (select 1 from apparel_products where name = 'Boot Bag');

insert into apparel_products (name, category, is_coming_soon, is_active)
select 'Community Vest', 'Tops', true, true
where not exists (select 1 from apparel_products where name = 'Community Vest');
