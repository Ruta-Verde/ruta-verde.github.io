import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Icon,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Spinner,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import { useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { MdArrowBack, MdSave, MdDelete } from 'react-icons/md'
import { useBlogPostForm } from '../../hooks/useBlogPostForm'
import BlogPostForm from '../../components/dashboard/BlogPostForm'

export default function EditBlogPost() {
  const { id } = useParams()
  const {
    form,
    setField,
    status,
    setStatus,
    pdfFile,
    pdfFileName,
    pdfInputRef,
    handlePdfChange,
    coverFile,
    coverPreviewUrl,
    coverInputRef,
    handleCoverChange,
    handleRemoveCover,
    loading,
    loadError,
    saving,
    deleting,
    handleSave,
    handleDelete,
  } = useBlogPostForm(id)

  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelDeleteRef = useRef<HTMLButtonElement>(null)

  return (
    <VStack align="stretch" spacing={8} maxW="720px" w="full" mx="auto">

      <Breadcrumb fontSize="sm" color="gray.400" fontFamily="'Josefin Sans', sans-serif">
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to="/dashboard/blog">Blog</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink color="gray.600">Edit Post</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <Box>
        <HStack spacing={3} mb={1}>
          <Button
            as={Link}
            to="/dashboard/blog"
            variant="ghost"
            size="sm"
            leftIcon={<Icon as={MdArrowBack} />}
            fontFamily="'Josefin Sans', sans-serif"
            color="gray.500"
            px={2}
          >
            Back
          </Button>
        </HStack>
        <Heading
          fontFamily="'Josefin Sans', sans-serif"
          fontSize={{ base: '2xl', md: '3xl' }}
          fontWeight="700"
          color="#385C40"
        >
          Edit Post
        </Heading>
        <Text color="gray.500" mt={1} fontSize="sm">
          Fields marked with * are required.
        </Text>
      </Box>

      <Box
        bg="white"
        borderRadius="xl"
        borderWidth="1px"
        borderColor="gray.200"
        p={{ base: 5, md: 8 }}
      >
        {loading ? (
          <HStack spacing={3} color="gray.500">
            <Spinner size="sm" />
            <Text fontFamily="'Josefin Sans', sans-serif">Loading post…</Text>
          </HStack>
        ) : loadError ? (
          <Text color="red.600" fontSize="sm">Couldn't load post: {loadError}</Text>
        ) : (
          <BlogPostForm
            form={form}
            onFieldChange={setField}
            pdfFile={pdfFile}
            pdfFileName={pdfFileName}
            pdfInputRef={pdfInputRef}
            onPdfChange={handlePdfChange}
            coverFile={coverFile}
            coverPreviewUrl={coverPreviewUrl}
            coverInputRef={coverInputRef}
            onCoverChange={handleCoverChange}
            onRemoveCover={handleRemoveCover}
            status={status}
            onStatusChange={setStatus}
          />
        )}
      </Box>

      {!loading && !loadError && (
        <HStack justify="space-between" spacing={3} pb={8}>
          <Button
            variant="outline"
            leftIcon={<Icon as={MdDelete} />}
            onClick={onOpen}
            isLoading={deleting}
            loadingText="Deleting…"
            borderColor="red.500"
            color="red.500"
            borderRadius="lg"
            fontFamily="'Josefin Sans', sans-serif"
            _hover={{ bg: 'red.50' }}
          >
            Delete Post
          </Button>
          <Button
            leftIcon={<Icon as={MdSave} />}
            onClick={handleSave}
            isLoading={saving}
            loadingText="Saving…"
            bg="#385C40"
            color="white"
            borderRadius="lg"
            fontFamily="'Josefin Sans', sans-serif"
            _hover={{ bg: '#2d4a33' }}
          >
            Save Changes
          </Button>
        </HStack>
      )}

      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelDeleteRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontFamily="'Josefin Sans', sans-serif">Delete Post</AlertDialogHeader>
            <AlertDialogBody>
              This permanently deletes the post and its file. This cannot be undone.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelDeleteRef} onClick={onClose} borderRadius="lg" fontFamily="'Josefin Sans', sans-serif">
                Cancel
              </Button>
              <Button
                bg="red.500"
                color="white"
                _hover={{ bg: 'red.600' }}
                borderRadius="lg"
                fontFamily="'Josefin Sans', sans-serif"
                onClick={() => {
                  onClose()
                  handleDelete()
                }}
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
