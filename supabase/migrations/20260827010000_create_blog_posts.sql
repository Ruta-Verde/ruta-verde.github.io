-- Creates the blog_posts table backing the new admin blog system
-- (dashboard CRUD at /dashboard/blog, public read at /blog and /blog/:title).
--
-- Each post is backed by a required PDF (file_path) plus an optional cover
-- image (cover_image_path), both stored as paths into the existing
-- public-assets Storage bucket (same "store the path, resolve the public
-- URL on read" convention used by events.image_path) -- not full URLs.
--
-- status has three states: draft (admin-only, not yet public), published
-- (visible on the public blog), and unpublished (pulled off the public
-- blog but still visible/recoverable in the dashboard). Deleting a post is
-- a hard delete -- there is no "deleted" status.
--
-- Run this by hand against the Supabase project (SQL editor or CLI) --
-- there is no migration runner wired up in this repo yet.

create table if not exists public.blog_posts (
  blog_id integer generated always as identity primary key,
  title varchar not null,
  blog_description varchar not null,
  author varchar not null,
  blog_date timestamptz not null,
  file_path varchar not null,
  cover_image_path varchar,
  blog_status varchar not null default 'draft' check (blog_status in ('draft', 'published', 'unpublished')),
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now()
);

alter table public.blog_posts enable row level security;

grant select on public.blog_posts to anon;
grant select, insert, update, delete on public.blog_posts to authenticated;

-- Anyone (including logged-out visitors) can read published posts.
create policy "blog_posts_select_public"
  on public.blog_posts for select
  to anon, authenticated
  using (blog_status = 'published');

-- Global admins can read every post regardless of status.
create policy "blog_posts_select_admins"
  on public.blog_posts for select
  to authenticated
  using (
    exists (
      select 1 from global_user_roles gur
      where gur.user_id = auth.uid()
        and gur.role = 'admin'
    )
  );

create policy "blog_posts_insert_admins"
  on public.blog_posts for insert
  to authenticated
  with check (
    exists (
      select 1 from global_user_roles gur
      where gur.user_id = auth.uid()
        and gur.role = 'admin'
    )
  );

create policy "blog_posts_update_admins"
  on public.blog_posts for update
  to authenticated
  using (
    exists (
      select 1 from global_user_roles gur
      where gur.user_id = auth.uid()
        and gur.role = 'admin'
    )
  )
  with check (
    exists (
      select 1 from global_user_roles gur
      where gur.user_id = auth.uid()
        and gur.role = 'admin'
    )
  );

create policy "blog_posts_delete_admins"
  on public.blog_posts for delete
  to authenticated
  using (
    exists (
      select 1 from global_user_roles gur
      where gur.user_id = auth.uid()
        and gur.role = 'admin'
    )
  );
