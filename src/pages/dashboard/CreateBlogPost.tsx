/**
 * CreateBlogPost.tsx
 *
 * Create-post form page — admin only.
 *
 * Form state, PDF/cover upload, and submission logic live in
 * useBlogPostForm; this component is just page chrome + composition.
 * No <form> tag — using onClick on the submit button per project convention.
 */

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
} from '@chakra-ui/react'
import { useNavigate, Link } from 'react-router-dom'
import { MdArrowBack, MdSave, MdPublish } from 'react-icons/md'
import { useBlogPostForm } from '../../hooks/useBlogPostForm'
import BlogPostForm from '../../components/dashboard/BlogPostForm'

export default function CreateBlogPost() {
  const navigate = useNavigate()
  const {
    form,
    setField,
    pdfFile,
    pdfFileName,
    pdfInputRef,
    handlePdfChange,
    coverFile,
    coverPreviewUrl,
    coverInputRef,
    handleCoverChange,
    handleRemoveCover,
    saving,
    publishing,
    handleSaveDraft,
    handlePublish,
  } = useBlogPostForm()

  return (
    <VStack align="stretch" spacing={8} maxW="720px" w="full" mx="auto">

      {/* Breadcrumb */}
      <Breadcrumb fontSize="sm" color="gray.400" fontFamily="'Josefin Sans', sans-serif">
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to="/dashboard/blog">Blog</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink color="gray.600">New Post</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      {/* Header */}
      <Box>
        <HStack spacing={3} mb={1}>
          <Button
            variant="ghost"
            size="sm"
            leftIcon={<Icon as={MdArrowBack} />}
            onClick={() => navigate('/dashboard/blog')}
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
          New Post
        </Heading>
        <Text color="gray.500" mt={1} fontSize="sm">
          Fields marked with * are required.
        </Text>
      </Box>

      {/* Form */}
      <Box
        bg="white"
        borderRadius="xl"
        borderWidth="1px"
        borderColor="gray.200"
        p={{ base: 5, md: 8 }}
      >
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
        />
      </Box>

      {/* Action buttons */}
      <HStack justify="flex-end" spacing={3} pb={8}>
        <Button
          variant="outline"
          leftIcon={<Icon as={MdSave} />}
          onClick={handleSaveDraft}
          isLoading={saving}
          loadingText="Saving…"
          borderColor="#385C40"
          color="#385C40"
          borderRadius="lg"
          fontFamily="'Josefin Sans', sans-serif"
          _hover={{ bg: 'green.50' }}
        >
          Save Draft
        </Button>
        <Button
          leftIcon={<Icon as={MdPublish} />}
          onClick={handlePublish}
          isLoading={publishing}
          loadingText="Publishing…"
          bg="#385C40"
          color="white"
          borderRadius="lg"
          fontFamily="'Josefin Sans', sans-serif"
          _hover={{ bg: '#2d4a33' }}
        >
          Publish Post
        </Button>
      </HStack>
    </VStack>
  )
}
