import { Box, Badge, Text, Image, Flex, Skeleton, SkeletonText } from '@chakra-ui/react'
import { statusConfig, PLACEHOLDER_IMAGE, formatBlogDate } from '../../utils/blogStatus'
import type { DashboardBlogPost } from '../../types/DashboardBlogPost'

interface BlogPostCardProps {
  post: DashboardBlogPost
  onClick: () => void
}

export function BlogPostCard({ post, onClick }: BlogPostCardProps) {
  const { label, colorScheme } = statusConfig[post.status]

  return (
    <Box
      bg="white"
      borderRadius="xl"
      borderWidth="1px"
      borderColor="gray.200"
      overflow="hidden"
      cursor="pointer"
      transition="all 0.15s"
      _hover={{
        boxShadow: 'md',
        borderColor: '#385C40',
        transform: 'translateY(-2px)',
      }}
      onClick={onClick}
    >
      <Image
        src={post.coverUrl ?? PLACEHOLDER_IMAGE}
        alt={post.title}
        w="100%"
        h="160px"
        objectFit="cover"
        bg="gray.100"
        fallbackSrc={PLACEHOLDER_IMAGE}
      />
      <Box p={4}>
        <Text
          fontFamily="'Josefin Sans', sans-serif"
          fontWeight="600"
          fontSize="md"
          color="gray.800"
          noOfLines={2}
          mb={2}
        >
          {post.title}
        </Text>

        <Text fontSize="sm" color="gray.500" noOfLines={2} mb={3}>
          {post.description}
        </Text>

        <Flex justify="space-between" align="center">
          <Badge
            colorScheme={colorScheme}
            borderRadius="full"
            px={2}
            fontSize="xs"
            fontFamily="'Josefin Sans', sans-serif"
          >
            {label}
          </Badge>
          <Text fontSize="xs" color="gray.400">
            {formatBlogDate(post.date)}
          </Text>
        </Flex>
      </Box>
    </Box>
  )
}

export function BlogPostCardSkeleton() {
  return (
    <Box bg="white" borderRadius="xl" borderWidth="1px" borderColor="gray.200" overflow="hidden">
      <Skeleton height="160px" />
      <Box p={4}>
        <SkeletonText noOfLines={2} spacing="2" mb={3} />
        <SkeletonText noOfLines={2} spacing="2" mb={3} />
        <Skeleton height="20px" w="80px" />
      </Box>
    </Box>
  )
}
