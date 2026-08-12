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
import { useEventForm } from '../../hooks/useEventForm'
import EventForm from '../../components/dashboard/EventForm'

export default function EditEvent() {
  const { eventId } = useParams()
  const {
    form,
    setField,
    status,
    setStatus,
    imageFile,
    imagePreviewUrl,
    fileInputRef,
    handleFileChange,
    handleRemoveImage,
    loading,
    loadError,
    saving,
    deleting,
    handleSave,
    handleDelete,
  } = useEventForm(eventId)

  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelDeleteRef = useRef<HTMLButtonElement>(null)

  return (
    <VStack align="stretch" spacing={8} maxW="720px" w="full" mx="auto">

      <Breadcrumb fontSize="sm" color="gray.400" fontFamily="'Josefin Sans', sans-serif">
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to="/dashboard/events">Events</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to={`/dashboard/events/${eventId}/manage`}>Manage Event</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink color="gray.600">Edit Details</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <Box>
        <HStack spacing={3} mb={1}>
          <Button
            as={Link}
            to={`/dashboard/events/${eventId}/manage`}
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
          Edit Event
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
            <Text fontFamily="'Josefin Sans', sans-serif">Loading event…</Text>
          </HStack>
        ) : loadError ? (
          <Text color="red.600" fontSize="sm">Couldn't load event: {loadError}</Text>
        ) : (
          <EventForm
            form={form}
            onFieldChange={setField}
            imageFile={imageFile}
            imagePreviewUrl={imagePreviewUrl}
            fileInputRef={fileInputRef}
            onFileChange={handleFileChange}
            onRemoveImage={handleRemoveImage}
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
            Delete Event
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
            <AlertDialogHeader fontFamily="'Josefin Sans', sans-serif">Delete Event</AlertDialogHeader>
            <AlertDialogBody>
              This permanently deletes the event and cannot be undone. Are you sure?
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
