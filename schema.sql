create table if not exists public.inquiries (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  email text not null,
  phone text,
  service_type text not null,
  details jsonb,
  message text,
  status text default 'pending'
);

alter table public.inquiries enable row level security;

drop policy if exists "Enable insert for everyone" on public.inquiries;
create policy "Enable insert for everyone" on public.inquiries
  for insert with check (true);