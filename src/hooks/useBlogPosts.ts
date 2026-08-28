import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import {
  DASHBOARD_BLOG_POST_COLUMNS,
  mapDashboardBlogPostRow,
  type DashboardBlogPostRow,
} from '../lib/dashboardBlog'
import type { DashboardBlogPost } from '../types/DashboardBlogPost'

interface UseBlogPostsResult {
  posts: DashboardBlogPost[]
  loading: boolean
  error: string | null
  refetch: () => void
}

export function useBlogPosts(): UseBlogPostsResult {
  const [posts, setPosts] = useState<DashboardBlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPosts = useCallback(async () => {
    setLoading(true)
    setError(null)

    const { data, error: fetchError } = await supabase
      .from('blog_posts')
      .select(DASHBOARD_BLOG_POST_COLUMNS)
      .order('created_at', { ascending: false })

    if (fetchError) {
      setError(fetchError.message)
      setPosts([])
      setLoading(false)
      return
    }

    const rows = (data ?? []) as unknown as DashboardBlogPostRow[]
    setPosts(rows.map(mapDashboardBlogPostRow))
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  return { posts, loading, error, refetch: fetchPosts }
}
