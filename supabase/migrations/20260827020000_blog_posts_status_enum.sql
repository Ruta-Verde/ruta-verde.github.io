-- Converts blog_posts.blog_status from varchar + check constraint to a
-- proper Postgres enum, per follow-up request after the table was already
-- created via 20260827010000_create_blog_posts.sql.
--
-- Run this by hand against the Supabase project (SQL editor or CLI) --
-- there is no migration runner wired up in this repo yet.

-- Postgres has no "create type if not exists" -- guard it so this file is
-- safe to re-run (e.g. after an earlier attempt got partway through).
do $$ begin
  create type public.blog_status as enum ('draft', 'published', 'unpublished');
exception
  when duplicate_object then null;
end $$;

alter table public.blog_posts
  drop constraint if exists blog_posts_blog_status_check;

-- blog_posts_select_public reads blog_status, so Postgres won't let the
-- column's type change while that policy exists -- drop it and recreate
-- it afterward (same definition as in 20260827010000_create_blog_posts.sql).
drop policy if exists "blog_posts_select_public" on public.blog_posts;

alter table public.blog_posts
  alter column blog_status drop default;

alter table public.blog_posts
  alter column blog_status type public.blog_status
  using blog_status::public.blog_status;

alter table public.blog_posts
  alter column blog_status set default 'draft'::public.blog_status;

create policy "blog_posts_select_public"
  on public.blog_posts for select
  to anon, authenticated
  using (blog_status = 'published'::public.blog_status);
