-- Step Together Line Dance — Seed Data
-- Run AFTER 002_rls_policies.sql

-- Default membership plans
insert into memberships (name, description, price, interval, features) values
('Free', 'Get a taste of the community.', 0, 'month', ARRAY[
  'Access to 3 free tutorial videos',
  'Community newsletter',
  'Event announcements',
  'Basic class schedule'
]),
('Community', 'For the regular dancer who wants more.', 19, 'month', ARRAY[
  'Unlimited on-demand videos',
  'Live virtual classes (2/week)',
  'Member-only event discounts',
  'Community chat access',
  'Monthly new routine drop'
]),
('Premium', 'Everything — for the dedicated dancer.', 39, 'month', ARRAY[
  'Everything in Community',
  'Unlimited live virtual classes',
  '1-on-1 monthly check-in with Cinnamon',
  'Early access to workshops & retreats',
  'Exclusive choreography notes',
  'Priority event registration'
])
on conflict do nothing;

-- Default site settings
insert into site_settings (key, value) values
('instagram_url', 'https://instagram.com/steptogetherdance'),
('facebook_url', 'https://facebook.com/steptogetherdance'),
('youtube_url', 'https://youtube.com/@steptogetherdance'),
('contact_email', 'hello@steptogetherdance.com'),
('hero_headline', 'Connecting People Through Line Dance'),
('hero_subtext', 'A community built on rhythm, belonging, and the joy of moving together.'),
('about_text', 'Step Together was built on one idea — that line dance is one of the most powerful ways to bring people together across ages, backgrounds, and borders.')
on conflict (key) do nothing;
