import { supabase } from './supabaseClient'
import type { PublicBlogPost } from '../types/PublicBlogPost'

const ASSET_BUCKET = 'public-assets'

const PUBLIC_BLOG_POST_COLUMNS = `
  blog_id,
  title,
  blog_description,
  author,
  blog_date,
  file_path,
  cover_image_path
`

interface PublicBlogPostRow {
  blog_id: number
  title: string
  blog_description: string
  author: string
  blog_date: string
  file_path: string
  cover_image_path: string | null
}

function mapPublicBlogPostRow(row: PublicBlogPostRow): PublicBlogPost {
  return {
    id: row.blog_id,
    title: row.title,
    description: row.blog_description,
    author: row.author,
    date: new Date(row.blog_date),
    fileUrl: supabase.storage.from(ASSET_BUCKET).getPublicUrl(row.file_path).data.publicUrl,
    coverUrl: row.cover_image_path
      ? supabase.storage.from(ASSET_BUCKET).getPublicUrl(row.cover_image_path).data.publicUrl
      : null,
  }
}

export async function fetchPublishedBlogPosts(): Promise<PublicBlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select(PUBLIC_BLOG_POST_COLUMNS)
    .eq('blog_status', 'published')
    .order('blog_date', { ascending: false })

  if (error) throw error

  const rows = (data ?? []) as unknown as PublicBlogPostRow[]
  return rows.map(mapPublicBlogPostRow)
}

// Derives a URL-safe slug from a post's title for /blog/:title routing —
// there's no dedicated slug column, so this is computed on both the
// linking side (Blog.tsx) and the matching side (BlogPage.tsx). Posts with
// the same title would collide; that's an accepted limitation.
export function slugifyTitle(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
