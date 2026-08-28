-- Scopes public read on blog PDFs/covers to published posts only.
--
-- The original public_assets_select_blog policy (from
-- 20260827030000_blog_storage_policies.sql) granted unconditional public
-- read on every object under blog-pdfs/ and blog-covers/, regardless of
-- the owning post's status. That meant a draft or unpublished post's PDF
-- or cover image was fully downloadable by anyone with the URL (e.g.
-- captured from the admin-only /blog/preview/:title page) even though
-- both the blog_posts RLS and the React RouteGuard treat that content as
-- admin-only -- storage objects don't inherit the table's row security.
--
-- Run this by hand against the Supabase project (SQL editor or CLI) --
-- there is no migration runner wired up in this repo yet.

drop policy if exists "public_assets_select_blog" on storage.objects;

-- Anyone (including logged-out visitors) can read files belonging to a
-- published post.
create policy "public_assets_select_blog_public"
  on storage.objects for select
  to anon, authenticated
  using (
    bucket_id = 'public-assets'
    and (storage.foldername(name))[1] in ('blog-pdfs', 'blog-covers')
    and exists (
      select 1 from public.blog_posts bp
      where (bp.file_path = storage.objects.name or bp.cover_image_path = storage.objects.name)
        and bp.blog_status = 'published'
    )
  );

-- Admins can read every blog file regardless of the owning post's status
-- -- needed for the dashboard (draft cover thumbnails) and the
-- /blog/preview/:title admin-only preview page.
create policy "public_assets_select_blog_admins"
  on storage.objects for select
  to authenticated
  using (
    bucket_id = 'public-assets'
    and (storage.foldername(name))[1] in ('blog-pdfs', 'blog-covers')
    and exists (
      select 1 from public.global_user_roles gur
      where gur.user_id = auth.uid() and gur.role = 'admin'
    )
  );
