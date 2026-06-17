-- Kerege.ON — схема Supabase: профили с ролями + workspace на клиента, защита через RLS.

-- 1. Профили (роль клиента/сотрудника). Создаётся автоматически при регистрации.
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  role text not null default 'client' check (role in ('client', 'admin')),
  created_at timestamptz default now()
);

-- 2. Workspace клиента (данные дашборда — риски, документы, задачи, календарь).
create table if not exists public.workspaces (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz default now(),
  unique (owner_id)
);

-- Автосоздание профиля при регистрации пользователя.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, email) values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Хелпер: является ли текущий пользователь сотрудником.
create or replace function public.is_admin()
returns boolean language sql security definer stable as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$;

-- 3. RLS.
alter table public.profiles enable row level security;
alter table public.workspaces enable row level security;

-- Профиль: пользователь видит свой, сотрудник видит все.
drop policy if exists "profiles_select" on public.profiles;
create policy "profiles_select" on public.profiles
  for select using (id = auth.uid() or public.is_admin());

-- Workspace: клиент читает свой (только просмотр), сотрудник читает и пишет все.
drop policy if exists "ws_select" on public.workspaces;
create policy "ws_select" on public.workspaces
  for select using (owner_id = auth.uid() or public.is_admin());

drop policy if exists "ws_insert" on public.workspaces;
create policy "ws_insert" on public.workspaces
  for insert with check (public.is_admin() or owner_id = auth.uid());

-- Запись/редактирование статусов и рисков — только сотрудник.
drop policy if exists "ws_update" on public.workspaces;
create policy "ws_update" on public.workspaces
  for update using (public.is_admin()) with check (public.is_admin());
