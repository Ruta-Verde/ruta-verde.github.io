import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Box,
  Image,
  Text,
  VStack,
  HStack,
  Divider,
  Button,
  Icon,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { MdEdit, MdDelete, MdOpenInNew, MdPublish, MdUnpublished } from 'react-icons/md'
import { statusConfig } from '../../utils/blogStatus'
import { slugifyTitle } from '../../lib/publicBlog'
import type { DashboardBlogPost } from '../../types/DashboardBlogPost'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

interface DetailRowProps {
  label: string
  value: string
}

function DetailRow({ label, value }: DetailRowProps) {
  return (
    <HStack align="flex-start" spacing={2} fontSize="sm">
      <Text fontWeight="600" color="gray.600" minW="90px">
        {label}
      </Text>
      <Text color="gray.700">{value}</Text>
    </HStack>
  )
}

interface BlogPostDetailModalProps {
  post: DashboardBlogPost | null
  isOpen: boolean
  onClose: () => void
  onTogglePublish: (post: DashboardBlogPost) => void
  onRequestDelete: (post: DashboardBlogPost) => void
}

export default function BlogPostDetailModal({ post, isOpen, onClose, onTogglePublish, onRequestDelete }: BlogPostDetailModalProps) {
  const navigate = useNavigate()

  if (!post) return null

  const postId = post.id
  const postTitle = post.title

  function handleEdit() {
    navigate(`/dashboard/blog/${postId}/edit`)
    onClose()
  }

  const isPublished = post.status === 'published'

  function handleViewPublic() {
    const slug = slugifyTitle(postTitle)
    navigate(isPublished ? `/blog/${slug}` : `/blog/preview/${slug}`)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
      <ModalOverlay />
      <ModalContent bg="transparent" boxShadow="none">
        <VStack align="stretch" spacing={4}>
          <Box
            position="relative"
            bg="white"
            borderRadius="xl"
            boxShadow="lg"
            maxH="70vh"
            overflow="hidden"
            display="flex"
            flexDirection="column"
          >
            <ModalHeader fontFamily="'Josefin Sans', sans-serif" pr={10}>
              {post.title}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody overflowY="auto">
              <VStack align="stretch" spacing={4}>
                {post.coverUrl && (
                  <Image
                    src={post.coverUrl}
                    alt={post.title}
                    borderRadius="lg"
                    maxH="220px"
                    w="full"
                    objectFit="cover"
                  />
                )}

                <VStack align="stretch" spacing={1.5}>
                  <DetailRow label="Status" value={statusConfig[post.status].label} />
                  <DetailRow label="Author" value={post.author} />
                  <DetailRow label="Published" value={formatDate(post.date)} />
                </VStack>

                <Divider />
                <VStack align="stretch" spacing={1}>
                  <Text fontWeight="600" color="gray.600" fontSize="sm">
                    Description
                  </Text>
                  <Text fontSize="sm" color="gray.700" whiteSpace="pre-wrap">
                    {post.description}
                  </Text>
                </VStack>
              </VStack>
            </ModalBody>

            <ModalFooter borderTopWidth="1px" borderColor="gray.100" gap={2} flexWrap="wrap">
              <Button
                leftIcon={<Icon as={MdOpenInNew} />}
                variant="ghost"
                size="sm"
                fontFamily="'Josefin Sans', sans-serif"
                onClick={handleViewPublic}
              >
                {isPublished ? 'View Public Post' : 'Preview Public Post'}
              </Button>
              <Button
                leftIcon={<Icon as={isPublished ? MdUnpublished : MdPublish} />}
                variant="outline"
                size="sm"
                fontFamily="'Josefin Sans', sans-serif"
                onClick={() => onTogglePublish(post)}
              >
                {isPublished ? 'Unpublish' : 'Publish'}
              </Button>
              <Button
                leftIcon={<Icon as={MdDelete} />}
                colorScheme="red"
                variant="outline"
                size="sm"
                fontFamily="'Josefin Sans', sans-serif"
                onClick={() => onRequestDelete(post)}
              >
                Delete
              </Button>
            </ModalFooter>
          </Box>

          <Button
            w="full"
            bg="#385C40"
            color="white"
            borderRadius="xl"
            boxShadow="lg"
            py={6}
            fontFamily="'Josefin Sans', sans-serif"
            _hover={{ bg: '#2d4a33' }}
            leftIcon={<Icon as={MdEdit} />}
            onClick={handleEdit}
          >
            Edit Post
          </Button>
        </VStack>
      </ModalContent>
    </Modal>
  )
}
