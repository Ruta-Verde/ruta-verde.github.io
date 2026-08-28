export interface PublicBlogPost {
  id: number
  title: string
  description: string
  author: string
  date: Date
  fileUrl: string
  coverUrl: string | null
}
