import { BlogStatus } from './BlogStatus'

export interface DashboardBlogPost {
  id: number
  title: string
  description: string
  status: BlogStatus
  author: string
  date: string
  createdAt: string
  fileUrl: string
  coverUrl: string | null
}
