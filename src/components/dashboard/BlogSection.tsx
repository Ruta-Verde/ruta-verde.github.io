import { Badge, Box, Grid, HStack, Heading, Text } from '@chakra-ui/react'
import { BlogPostCard, BlogPostCardSkeleton } from './BlogPostCard'
import type { DashboardBlogPost } from '../../types/DashboardBlogPost'

interface BlogSectionProps {
  title: string
  posts: DashboardBlogPost[]
  loading: boolean
  badgeColor: string
  emptyLabel: string
  onSelectPost: (post: DashboardBlogPost) => void
}

export default function BlogSection({ title, posts, loading, badgeColor, emptyLabel, onSelectPost }: BlogSectionProps) {
  return (
    <Box>
      <HStack spacing={3} mb={4}>
        <Heading fontFamily="'Josefin Sans', sans-serif" fontSize="lg" fontWeight="600" color="gray.700">
          {title}
        </Heading>
        <Badge colorScheme={badgeColor} borderRadius="full" px={2}>
          {loading ? '–' : posts.length}
        </Badge>
      </HStack>

      {loading ? (
        <Grid templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', xl: 'repeat(3, 1fr)' }} gap={5}>
          {Array.from({ length: 3 }).map((_, i) => (
            <BlogPostCardSkeleton key={i} />
          ))}
        </Grid>
      ) : posts.length === 0 ? (
        <Box bg="gray.50" borderRadius="xl" borderWidth="1px" borderColor="gray.200" p={6} textAlign="center">
          <Text color="gray.400" fontSize="sm" fontFamily="'Josefin Sans', sans-serif">
            No {emptyLabel} posts
          </Text>
        </Box>
      ) : (
        <Grid templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', xl: 'repeat(3, 1fr)' }} gap={5}>
          {posts.map(post => (
            <BlogPostCard key={post.id} post={post} onClick={() => onSelectPost(post)} />
          ))}
        </Grid>
      )}
    </Box>
  )
}
