/**
 * CreateEvent.tsx
 *
 * Create-event form page — accessible to admin and event-organizer.
 *
 * Still TODO:
 *   - Slug generation (e.g. slugify(title) + nanoid(6))
 *   - Public/private visibility (dropped until that column exists)
 *
 * Form state, image upload, and submission logic live in useEventForm;
 * this component is just page chrome + composition.
 * No <form> tags — using onClick on the submit button per project convention.
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
import { useEventForm } from '../../hooks/useEventForm'
import EventForm from '../../components/dashboard/EventForm'

export default function CreateEvent() {
  const navigate = useNavigate()
  const {
    form,
    setField,
    imageFile,
    imagePreviewUrl,
    fileInputRef,
    handleFileChange,
    handleRemoveImage,
    saving,
    publishing,
    handleSaveDraft,
    handlePublish,
  } = useEventForm()

  return (
    <VStack align="stretch" spacing={8} maxW="720px" w="full" mx="auto">

      {/* Breadcrumb */}
      <Breadcrumb fontSize="sm" color="gray.400" fontFamily="'Josefin Sans', sans-serif">
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to="/dashboard/events">Events</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink color="gray.600">Create Event</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      {/* Header */}
      <Box>
        <HStack spacing={3} mb={1}>
          <Button
            variant="ghost"
            size="sm"
            leftIcon={<Icon as={MdArrowBack} />}
            onClick={() => navigate('/dashboard/events')}
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
          Create Event
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
        <EventForm
          form={form}
          onFieldChange={setField}
          imageFile={imageFile}
          imagePreviewUrl={imagePreviewUrl}
          fileInputRef={fileInputRef}
          onFileChange={handleFileChange}
          onRemoveImage={handleRemoveImage}
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
          Publish Event
        </Button>
      </HStack>
    </VStack>
  )
}
