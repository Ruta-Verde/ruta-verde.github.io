/**
 * DashboardBlog.tsx  (+ BlogPostCard)
 *
 * Admin-only Blog tab.  Displays all blog posts as cards.
 * Image is a placeholder — swap for real Supabase Storage URLs when ready.
 *
 * BlogPostCard actions (stub):
 *   Edit   → navigate to /dashboard/blog/:id/edit  (not yet built)
 *   Delete → stub handler, wire to supabase.from('posts').delete()
 *   View   → navigate to /blog/:slug (existing public page)
 *
 * fetchBlogPosts() returns stub data.
 * Replace with: supabase.from('posts').select('*').order('created_at', { ascending: false })
 */

import {
  Box,
  Grid,
  GridItem,
  VStack,
  HStack,
  Heading,
  Text,
  Image,
  Badge,
  Button,
  Icon,
  Skeleton,
  SkeletonText,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useToast,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  MdAdd,
  MdMoreVert,
  MdEdit,
  MdDelete,
  MdOpenInNew,
  MdSearch,
} from 'react-icons/md'

// ─── Types ─────────────────────────────────────────────────────────────────────

type PostStatus = 'published' | 'draft' | 'archived'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  status: PostStatus
  author: string
  createdAt: string
  slug: string
  /** placeholder — real app uses Supabase Storage URL */
  coverUrl?: string
}

// ─── Stub data ─────────────────────────────────────────────────────────────────

const PLACEHOLDER_IMAGE = 'https://placehold.co/600x320/e2e8f0/a0aec0?text=No+Image'

async function fetchBlogPosts(): Promise<BlogPost[]> {
  await new Promise(r => setTimeout(r, 600))
  return [
    {
      id: 'post-1',
      title: 'Why Reforestation Matters in the Andes',
      excerpt: 'The Andean ecosystem is one of the most biodiverse on Earth, yet it faces unprecedented pressure...',
      status: 'published',
      author: 'Maria Torres',
      createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
      slug: 'reforestation-andes',
    },
    {
      id: 'post-2',
      title: 'Volunteer Spotlight: Carlos from Lima',
      excerpt: 'Carlos has logged over 120 hours with Ruta Verde since joining last year. We caught up with him...',
      status: 'published',
      author: 'Ana Ramos',
      createdAt: new Date(Date.now() - 10 * 86400000).toISOString(),
      slug: 'volunteer-spotlight-carlos',
    },
    {
      id: 'post-3',
      title: 'Q3 Impact Report — Draft',
      excerpt: 'This quarter, Ruta Verde volunteers contributed over 800 hours across 12 events...',
      status: 'draft',
      author: 'Maria Torres',
      createdAt: new Date(Date.now() - 1 * 86400000).toISOString(),
      slug: 'q3-impact-report',
    },
    {
      id: 'post-4',
      title: 'Introducing the Ruta Verde App',
      excerpt: 'We have been building something exciting: a platform to connect volunteers, organizers...',
      status: 'archived',
      author: 'Admin',
      createdAt: new Date(Date.now() - 60 * 86400000).toISOString(),
      slug: 'introducing-ruta-verde-app',
    },
  ]
}

// Stub delete — replace with supabase.from('posts').delete().eq('id', id)
async function deletePostStub(id: string): Promise<void> {
  console.log('[stub] delete post:', id)
  await new Promise(r => setTimeout(r, 400))
}

// ─── Status badge config ────────────────────────────────────────────────────────

const statusConfig: Record<PostStatus, { label: string; colorScheme: string }> = {
  published: { label: 'Published', colorScheme: 'green' },
  draft:     { label: 'Draft',     colorScheme: 'yellow' },
  archived:  { label: 'Archived',  colorScheme: 'gray' },
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

// ─── BlogPostCard ───────────────────────────────────────────────────────────────

interface BlogPostCardProps {
  post: BlogPost
  onDelete: (id: string) => void
}

function BlogPostCard({ post, onDelete }: BlogPostCardProps) {
  const navigate = useNavigate()
  const { label, colorScheme } = statusConfig[post.status]

  return (
    <Box
      bg="white"
      borderRadius="xl"
      borderWidth="1px"
      borderColor="gray.200"
      overflow="hidden"
      transition="box-shadow 0.15s"
      _hover={{ boxShadow: 'md' }}
    >
      {/* Cover image — placeholder until Supabase Storage is wired up */}
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
        {/* Title + overflow menu */}
        <Flex justify="space-between" align="flex-start" mb={2}>
          <Text
            fontFamily="'Josefin Sans', sans-serif"
            fontWeight="600"
            fontSize="md"
            color="gray.800"
            noOfLines={2}
            flex={1}
            pr={2}
          >
            {post.title}
          </Text>

          {/* Three-dot menu */}
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<Icon as={MdMoreVert} />}
              variant="ghost"
              size="xs"
              aria-label="Post options"
              flexShrink={0}
            />
            <MenuList fontSize="sm" fontFamily="'Josefin Sans', sans-serif">
              <MenuItem
                icon={<Icon as={MdEdit} />}
                onClick={() => navigate(`/dashboard/blog/${post.id}/edit`)}
              >
                Edit
              </MenuItem>
              <MenuItem
                icon={<Icon as={MdOpenInNew} />}
                onClick={() => navigate(`/blog/${post.slug}`)}
              >
                View Public Post
              </MenuItem>
              <MenuItem
                icon={<Icon as={MdDelete} />}
                color="red.500"
                onClick={() => onDelete(post.id)}
              >
                Delete
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>

        <Text fontSize="sm" color="gray.500" noOfLines={2} mb={3}>
          {post.excerpt}
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
            {formatDate(post.createdAt)}
          </Text>
        </Flex>
      </Box>
    </Box>
  )
}

// ─── Skeleton card ─────────────────────────────────────────────────────────────

function BlogPostCardSkeleton() {
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

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function BlogDashboard() {
  const navigate = useNavigate()
  const toast = useToast()

  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchBlogPosts().then(data => {
      setPosts(data)
      setLoading(false)
    })
  }, [])

  async function handleDelete(id: string) {
    try {
      await deletePostStub(id)
      setPosts(prev => prev.filter(p => p.id !== id))
      toast({ title: 'Post deleted', status: 'info', duration: 3000, isClosable: true })
    } catch {
      toast({ title: 'Failed to delete post', status: 'error', duration: 3000 })
    }
  }

  // Client-side filter — in prod, add .ilike('title', `%${search}%`) to query
  const filtered = posts.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <VStack align="stretch" spacing={8}>

      {/* Header */}
      <Flex justify="space-between" align="flex-end" flexWrap="wrap" gap={4}>
        <Box>
          <Heading
            fontFamily="'Josefin Sans', sans-serif"
            fontSize={{ base: '2xl', md: '3xl' }}
            fontWeight="700"
            color="#385C40"
          >
            Blog Posts
          </Heading>
          <Text color="gray.500" mt={1} fontSize="sm">
            {loading ? '—' : `${posts.length} total posts`}
          </Text>
        </Box>

        <Button
          leftIcon={<Icon as={MdAdd} />}
          bg="#385C40"
          color="white"
          size="sm"
          borderRadius="lg"
          fontFamily="'Josefin Sans', sans-serif"
          _hover={{ bg: '#2d4a33' }}
          onClick={() => navigate('/dashboard/blog/create')} // stub route
        >
          New Post
        </Button>
      </Flex>

      {/* Search */}
      <InputGroup maxW="340px">
        <InputLeftElement pointerEvents="none">
          <Icon as={MdSearch} color="gray.400" />
        </InputLeftElement>
        <Input
          placeholder="Search posts…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          focusBorderColor="#385C40"
          borderRadius="lg"
          fontFamily="'Josefin Sans', sans-serif"
          fontSize="sm"
        />
      </InputGroup>

      {/* Cards grid */}
      <Grid
        templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', xl: 'repeat(3, 1fr)' }}
        gap={5}
      >
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <GridItem key={i}><BlogPostCardSkeleton /></GridItem>
            ))
          : filtered.length === 0
            ? (
              <GridItem colSpan={3}>
                <Box
                  bg="gray.50"
                  borderRadius="xl"
                  borderWidth="1px"
                  borderColor="gray.200"
                  p={10}
                  textAlign="center"
                >
                  <Text color="gray.400" fontFamily="'Josefin Sans', sans-serif">
                    {search ? `No posts matching "${search}"` : 'No blog posts yet'}
                  </Text>
                </Box>
              </GridItem>
            )
            : filtered.map(post => (
                <GridItem key={post.id}>
                  <BlogPostCard post={post} onDelete={handleDelete} />
                </GridItem>
              ))
        }
      </Grid>
    </VStack>
  )
}