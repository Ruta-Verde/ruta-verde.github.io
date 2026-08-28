/**
 * BlogDashboard.tsx
 *
 * Admin-only Blog tab. Displays blog posts grouped into Published/Drafts
 * sections, backed by the blog_posts Supabase table via useBlogPosts().
 */

import {
  Box,
  VStack,
  Heading,
  Text,
  Button,
  Icon,
  Flex,
  Divider,
  useToast,
  Input,
  InputGroup,
  InputLeftElement,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import { useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MdAdd, MdSearch } from 'react-icons/md'
import { useBlogPosts } from '../../hooks/useBlogPosts'
import { supabase } from '../../lib/supabaseClient'
import { groupBlogPostsByStatus } from '../../utils/blogStatus'
import BlogSection from '../../components/dashboard/BlogSection'
import BlogPostDetailModal from '../../components/dashboard/BlogPostDetailModal'
import type { DashboardBlogPost } from '../../types/DashboardBlogPost'
import type { BlogStatus } from '../../types/BlogStatus'

const ASSET_BUCKET = 'public-assets'

export default function BlogDashboard() {
  const navigate = useNavigate()
  const toast = useToast()
  const { posts, loading, error, refetch } = useBlogPosts()

  const [search, setSearch] = useState('')
  const [selectedPost, setSelectedPost] = useState<DashboardBlogPost | null>(null)
  const [postPendingDelete, setPostPendingDelete] = useState<DashboardBlogPost | null>(null)
  const [deleting, setDeleting] = useState(false)
  const { isOpen: isDetailOpen, onOpen: onDetailOpen, onClose: onDetailClose } = useDisclosure()
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure()
  const cancelDeleteRef = useRef<HTMLButtonElement>(null)

  function handleSelectPost(post: DashboardBlogPost) {
    setSelectedPost(post)
    onDetailOpen()
  }

  function requestDelete(post: DashboardBlogPost) {
    setPostPendingDelete(post)
    onDetailClose()
    onDeleteOpen()
  }

  async function handleTogglePublish(post: DashboardBlogPost) {
    const nextStatus: BlogStatus = post.status === 'published' ? 'draft' : 'published'
    const { error } = await supabase
      .from('blog_posts')
      .update({ blog_status: nextStatus })
      .eq('blog_id', post.id)

    if (error) {
      toast({ title: 'Failed to update post', status: 'error', duration: 3000 })
      return
    }

    toast({
      title: nextStatus === 'published' ? 'Post published' : 'Post unpublished',
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
    refetch()
  }

  async function handleConfirmDelete() {
    if (!postPendingDelete) return
    setDeleting(true)
    try {
      const { error } = await supabase.from('blog_posts').delete().eq('blog_id', postPendingDelete.id)
      if (error) throw error

      const pathsToRemove = [postPendingDelete.fileUrl, postPendingDelete.coverUrl]
        .filter((url): url is string => Boolean(url))
        .map(url => url.split(`${ASSET_BUCKET}/`).pop())
        .filter((path): path is string => Boolean(path))
      if (pathsToRemove.length > 0) {
        await supabase.storage.from(ASSET_BUCKET).remove(pathsToRemove)
      }

      toast({ title: 'Post deleted', status: 'success', duration: 3000, isClosable: true })
      onDeleteClose()
      setPostPendingDelete(null)
      refetch()
    } catch {
      toast({ title: 'Failed to delete post', status: 'error', duration: 3000 })
    } finally {
      setDeleting(false)
    }
  }

  // Client-side filter — in prod, add .ilike('title', `%${search}%`) to query
  const filtered = posts.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase())
  )
  const { published, drafts } = useMemo(() => groupBlogPostsByStatus(filtered), [filtered])

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
          onClick={() => navigate('/dashboard/blog/create')}
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

      {error && (
        <Flex bg="red.50" borderWidth="1px" borderColor="red.200" borderRadius="lg" p={4} justify="space-between" align="center">
          <Text color="red.600" fontSize="sm">Couldn't load posts: {error}</Text>
          <Button size="xs" variant="outline" colorScheme="red" onClick={refetch}>Retry</Button>
        </Flex>
      )}

      <BlogSection
        title="Published"
        posts={published}
        loading={loading}
        badgeColor="green"
        emptyLabel="published"
        onSelectPost={handleSelectPost}
      />
      <Divider />
      <BlogSection
        title="Drafts"
        posts={drafts}
        loading={loading}
        badgeColor="yellow"
        emptyLabel="draft"
        onSelectPost={handleSelectPost}
      />

      <BlogPostDetailModal
        post={selectedPost}
        isOpen={isDetailOpen}
        onClose={onDetailClose}
        onTogglePublish={handleTogglePublish}
        onRequestDelete={requestDelete}
      />

      <AlertDialog isOpen={isDeleteOpen} leastDestructiveRef={cancelDeleteRef} onClose={onDeleteClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontFamily="'Josefin Sans', sans-serif">Delete Post</AlertDialogHeader>
            <AlertDialogBody>
              This permanently deletes "{postPendingDelete?.title}" and its file. This cannot be undone.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelDeleteRef} onClick={onDeleteClose} borderRadius="lg" fontFamily="'Josefin Sans', sans-serif">
                Cancel
              </Button>
              <Button
                bg="red.500"
                color="white"
                _hover={{ bg: 'red.600' }}
                borderRadius="lg"
                fontFamily="'Josefin Sans', sans-serif"
                onClick={handleConfirmDelete}
                isLoading={deleting}
                loadingText="Deleting…"
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </VStack>
  )
}
