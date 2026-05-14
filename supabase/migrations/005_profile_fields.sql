-- Step Together — Add phone, dance_experience, date_of_birth to profiles
-- Run in Supabase SQL Editor after 004_content.sql

alter table profiles add column if not exists phone text;
alter table profiles add column if not exists dance_experience text;
alter table profiles add column if not exists date_of_birth date;

-- Update the trigger so new signups have these fields saved automatically
create or replace function handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name, phone, dance_experience, date_of_birth)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'phone',
    new.raw_user_meta_data->>'dance_experience',
    case
      when new.raw_user_meta_data->>'date_of_birth' is not null
      then (new.raw_user_meta_data->>'date_of_birth')::date
      else null
    end
  )
  on conflict (id) do update set
    email             = excluded.email,
    full_name         = coalesce(excluded.full_name, profiles.full_name),
    phone             = coalesce(excluded.phone, profiles.phone),
    dance_experience  = coalesce(excluded.dance_experience, profiles.dance_experience),
    date_of_birth     = coalesce(excluded.date_of_birth, profiles.date_of_birth);
  return new;
end;
$$;
