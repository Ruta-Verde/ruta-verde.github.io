import { supabase } from './supabaseClient'
import { slugifyTitle } from './publicBlog'
import type { DashboardBlogPost } from '../types/DashboardBlogPost'
import type { BlogStatus } from '../types/BlogStatus'

const ASSET_BUCKET = 'public-assets'

export const DASHBOARD_BLOG_POST_COLUMNS = `
  blog_id,
  title,
  blog_description,
  author,
  blog_date,
  file_path,
  cover_image_path,
  blog_status,
  created_at
`

export interface DashboardBlogPostRow {
  blog_id: number
  title: string
  blog_description: string
  author: string
  blog_date: string
  file_path: string
  cover_image_path: string | null
  blog_status: BlogStatus
  created_at: string
}

export function mapDashboardBlogPostRow(row: DashboardBlogPostRow): DashboardBlogPost {
  return {
    id: row.blog_id,
    title: row.title,
    description: row.blog_description,
    status: row.blog_status,
    author: row.author,
    date: row.blog_date,
    createdAt: row.created_at,
    fileUrl: supabase.storage.from(ASSET_BUCKET).getPublicUrl(row.file_path).data.publicUrl,
    coverUrl: row.cover_image_path
      ? supabase.storage.from(ASSET_BUCKET).getPublicUrl(row.cover_image_path).data.publicUrl
      : null,
    filePath: row.file_path,
    coverPath: row.cover_image_path,
  }
}

// Fetches a single post by its title slug regardless of status, relying on
// the blog_posts_select_admins RLS policy (any authenticated admin can read
// every post) -- used for the admin-only draft/unpublished preview page,
// which the public blog_posts_select_public policy would otherwise hide.
// There's no slug column (same limitation as publicBlog.ts's fetch), so this
// pulls every post visible to the caller and matches client-side.
export async function fetchBlogPostBySlug(slug: string): Promise<DashboardBlogPost | null> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select(DASHBOARD_BLOG_POST_COLUMNS)

  if (error) throw error

  const rows = (data ?? []) as unknown as DashboardBlogPostRow[]
  const row = rows.find(r => slugifyTitle(r.title) === slug)
  return row ? mapDashboardBlogPostRow(row) : null
}
