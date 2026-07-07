/**
 * CreateEvent.tsx
 *
 * Stub create-event form page — accessible to admin and event-organizer.
 *
 * All field handlers and submit are intentionally left as stubs.
 * When you're ready to wire up:
 *   - Replace handleSubmit with a supabase.from('events').insert() call
 *   - Add image upload via supabase.storage
 *   - Add slug generation (e.g. slugify(title) + nanoid(6))
 *   - Add capacity, tags, co-organizer multi-select fields
 *
 * Using Chakra FormControl/FormLabel throughout for consistent a11y.
 * No <form> tags — using onClick on the submit button per project convention.
 */

import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Textarea,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  Icon,
  Divider,
  useToast,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Switch,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { MdArrowBack, MdSave, MdPublish } from 'react-icons/md'

// ─── Types ─────────────────────────────────────────────────────────────────────

interface EventFormState {
  title: string
  description: string
  location: string
  startDate: string
  endDate: string
  capacity: number
  category: string
  isPublic: boolean
}

const INITIAL_STATE: EventFormState = {
  title: '',
  description: '',
  location: '',
  startDate: '',
  endDate: '',
  capacity: 20,
  category: '',
  isPublic: true,
}

// ─── Stubs ─────────────────────────────────────────────────────────────────────

async function saveDraftStub(_data: EventFormState): Promise<void> {
  // TODO: supabase.from('events').insert({ ...data, status: 'draft', organizer_id: user.id })
  await new Promise(r => setTimeout(r, 500))
}

async function publishEventStub(_data: EventFormState): Promise<void> {
  // TODO: supabase.from('events').insert({ ...data, status: 'published', organizer_id: user.id })
  await new Promise(r => setTimeout(r, 800))
}

// ─── Component ─────────────────────────────────────────────────────────────────

export default function CreateEvent() {
  const navigate = useNavigate()
  const toast = useToast()
  const [form, setForm] = useState<EventFormState>(INITIAL_STATE)
  const [saving, setSaving] = useState(false)
  const [publishing, setPublishing] = useState(false)

  // Generic field updater — avoids a handler per field
  function setField<K extends keyof EventFormState>(key: K, value: EventFormState[K]) {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  async function handleSaveDraft() {
    setSaving(true)
    try {
      await saveDraftStub(form)
      toast({
        title: 'Draft saved',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } catch {
      toast({ title: 'Failed to save draft', status: 'error', duration: 3000 })
    } finally {
      setSaving(false)
    }
  }

  async function handlePublish() {
    // TODO: add form validation before calling publishEventStub
    setPublishing(true)
    try {
      await publishEventStub(form)
      toast({
        title: 'Event published!',
        description: 'It is now visible to volunteers.',
        status: 'success',
        duration: 4000,
        isClosable: true,
      })
      navigate('/dashboard/events')
    } catch {
      toast({ title: 'Failed to publish event', status: 'error', duration: 3000 })
    } finally {
      setPublishing(false)
    }
  }

  return (
    <VStack align="stretch" spacing={8} maxW="720px">

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
        <VStack spacing={6} align="stretch">

          {/* Title */}
          <FormControl isRequired>
            <FormLabel
              fontFamily="'Josefin Sans', sans-serif"
              fontWeight="600"
              fontSize="sm"
              color="gray.700"
            >
              Event Title
            </FormLabel>
            <Input
              placeholder="e.g. River Clean-Up — Urubamba"
              value={form.title}
              onChange={e => setField('title', e.target.value)}
              focusBorderColor="#385C40"
              borderRadius="lg"
              fontFamily="'Josefin Sans', sans-serif"
            />
          </FormControl>

          {/* Description */}
          <FormControl isRequired>
            <FormLabel
              fontFamily="'Josefin Sans', sans-serif"
              fontWeight="600"
              fontSize="sm"
              color="gray.700"
            >
              Description
            </FormLabel>
            <Textarea
              placeholder="Describe the event, what volunteers will do, what to bring..."
              value={form.description}
              onChange={e => setField('description', e.target.value)}
              focusBorderColor="#385C40"
              borderRadius="lg"
              fontFamily="'Josefin Sans', sans-serif"
              rows={5}
              resize="vertical"
            />
          </FormControl>

          <Divider />

          {/* Date range */}
          <HStack spacing={4} flexWrap="wrap">
            <FormControl isRequired flex={1} minW="200px">
              <FormLabel
                fontFamily="'Josefin Sans', sans-serif"
                fontWeight="600"
                fontSize="sm"
                color="gray.700"
              >
                Start Date & Time
              </FormLabel>
              <Input
                type="datetime-local"
                value={form.startDate}
                onChange={e => setField('startDate', e.target.value)}
                focusBorderColor="#385C40"
                borderRadius="lg"
                fontFamily="'Josefin Sans', sans-serif"
              />
            </FormControl>

            <FormControl isRequired flex={1} minW="200px">
              <FormLabel
                fontFamily="'Josefin Sans', sans-serif"
                fontWeight="600"
                fontSize="sm"
                color="gray.700"
              >
                End Date & Time
              </FormLabel>
              <Input
                type="datetime-local"
                value={form.endDate}
                onChange={e => setField('endDate', e.target.value)}
                focusBorderColor="#385C40"
                borderRadius="lg"
                fontFamily="'Josefin Sans', sans-serif"
              />
            </FormControl>
          </HStack>

          {/* Location */}
          <FormControl isRequired>
            <FormLabel
              fontFamily="'Josefin Sans', sans-serif"
              fontWeight="600"
              fontSize="sm"
              color="gray.700"
            >
              Location
            </FormLabel>
            <Input
              placeholder="e.g. Cusco, Peru"
              value={form.location}
              onChange={e => setField('location', e.target.value)}
              focusBorderColor="#385C40"
              borderRadius="lg"
              fontFamily="'Josefin Sans', sans-serif"
            />
            <FormHelperText fontSize="xs">
              {/* TODO: wire up Google Maps Places autocomplete */}
              Full address or city name. Map pin coming soon.
            </FormHelperText>
          </FormControl>

          <Divider />

          {/* Category + Capacity */}
          <HStack spacing={4} flexWrap="wrap">
            <FormControl flex={1} minW="180px">
              <FormLabel
                fontFamily="'Josefin Sans', sans-serif"
                fontWeight="600"
                fontSize="sm"
                color="gray.700"
              >
                Category
              </FormLabel>
              <Select
                placeholder="Select category"
                value={form.category}
                onChange={e => setField('category', e.target.value)}
                focusBorderColor="#385C40"
                borderRadius="lg"
                fontFamily="'Josefin Sans', sans-serif"
              >
                {/* TODO: pull categories from supabase.from('event_categories').select() */}
                <option value="reforestation">Reforestation</option>
                <option value="cleanup">Clean-Up</option>
                <option value="education">Education / Workshop</option>
                <option value="survey">Environmental Survey</option>
                <option value="other">Other</option>
              </Select>
            </FormControl>

            <FormControl flex={1} minW="160px">
              <FormLabel
                fontFamily="'Josefin Sans', sans-serif"
                fontWeight="600"
                fontSize="sm"
                color="gray.700"
              >
                Capacity
              </FormLabel>
              <NumberInput
                value={form.capacity}
                min={1}
                max={500}
                onChange={(_, val) => setField('capacity', val)}
                focusBorderColor="#385C40"
              >
                <NumberInputField borderRadius="lg" fontFamily="'Josefin Sans', sans-serif" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          </HStack>

          {/* Visibility toggle */}
          <FormControl display="flex" alignItems="center" gap={3}>
            <Switch
              isChecked={form.isPublic}
              onChange={e => setField('isPublic', e.target.checked)}
              colorScheme="green"
              id="public-toggle"
            />
            <FormLabel htmlFor="public-toggle" mb={0} fontFamily="'Josefin Sans', sans-serif" fontSize="sm" fontWeight="600" color="gray.700">
              Public Event
            </FormLabel>
            <Text fontSize="xs" color="gray.400">
              {form.isPublic ? 'Visible on the public events page' : 'Only visible to org members'}
            </Text>
          </FormControl>

        </VStack>
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