-- Adds Storage RLS policies for the blog-pdfs/ and blog-covers/ folders in
-- the existing public-assets bucket. Without these, storage.objects'
-- default-deny RLS rejects uploads to any folder that doesn't already have
-- a policy covering it -- the existing policies only ever covered events/,
-- which is why event cover image uploads work but blog PDF/cover uploads
-- fail with a 403 "new row violates row-level security policy" / AccessDenied
-- error from the storage API (see useBlogPostForm.ts's resolvePdfPath /
-- resolveCoverPath).
--
-- Anyone can read (blog files need to be publicly downloadable from the
-- public blog pages); only admins can write, mirroring the blog_posts
-- table policies in 20260827010000_create_blog_posts.sql.
--
-- Run this by hand against the Supabase project (SQL editor or CLI) --
-- there is no migration runner wired up in this repo yet.

create policy "public_assets_select_blog"
  on storage.objects for select
  to anon, authenticated
  using (
    bucket_id = 'public-assets'
    and (storage.foldername(name))[1] in ('blog-pdfs', 'blog-covers')
  );

create policy "public_assets_insert_blog_admins"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'public-assets'
    and (storage.foldername(name))[1] in ('blog-pdfs', 'blog-covers')
    and exists (
      select 1 from public.global_user_roles gur
      where gur.user_id = auth.uid() and gur.role = 'admin'
    )
  );

create policy "public_assets_update_blog_admins"
  on storage.objects for update
  to authenticated
  using (
    bucket_id = 'public-assets'
    and (storage.foldername(name))[1] in ('blog-pdfs', 'blog-covers')
    and exists (
      select 1 from public.global_user_roles gur
      where gur.user_id = auth.uid() and gur.role = 'admin'
    )
  );

create policy "public_assets_delete_blog_admins"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'public-assets'
    and (storage.foldername(name))[1] in ('blog-pdfs', 'blog-covers')
    and exists (
      select 1 from public.global_user_roles gur
      where gur.user_id = auth.uid() and gur.role = 'admin'
    )
  );
