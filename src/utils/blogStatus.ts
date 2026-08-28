import type { DashboardBlogPost } from '../types/DashboardBlogPost'
import type { BlogStatus } from '../types/BlogStatus'

export const statusConfig: Record<BlogStatus, { label: string; colorScheme: string }> = {
  published: { label: 'Published', colorScheme: 'green' },
  draft: { label: 'Draft', colorScheme: 'yellow' },
  unpublished: { label: 'Unpublished', colorScheme: 'gray' },
}

export const PLACEHOLDER_IMAGE = 'https://placehold.co/600x320/e2e8f0/a0aec0?text=No+Image'

export function formatBlogDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function groupBlogPostsByStatus(posts: DashboardBlogPost[]) {
  return {
    published: posts.filter(p => p.status === 'published'),
    drafts: posts.filter(p => p.status !== 'published'),
  }
}
