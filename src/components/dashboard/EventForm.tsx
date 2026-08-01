import {
  VStack,
  HStack,
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
  IconButton,
  Icon,
  Image,
  Divider,
} from '@chakra-ui/react'
import type { RefObject } from 'react'
import { MdUpload, MdDelete } from 'react-icons/md'
import type { EventFormState } from '../../types/EventFormState'
import type { EventCategory } from '../../types/EventCategory'

const EVENT_CATEGORIES: { value: EventCategory; label: string }[] = [
  { value: 'tree_planting', label: 'Tree Planting' },
  { value: 'conference', label: 'Conference' },
  { value: 'meeting', label: 'Meeting' },
]

const FIELD_LABEL_PROPS = {
  fontFamily: "'Josefin Sans', sans-serif",
  fontWeight: '600',
  fontSize: 'sm',
  color: 'gray.700',
} as const

const FIELD_INPUT_PROPS = {
  focusBorderColor: '#385C40',
  borderRadius: 'lg',
  fontFamily: "'Josefin Sans', sans-serif",
} as const

interface EventFormProps {
  form: EventFormState
  onFieldChange: <K extends keyof EventFormState>(key: K, value: EventFormState[K]) => void
  imageFile: File | null
  imagePreviewUrl: string | null
  fileInputRef: RefObject<HTMLInputElement>
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onRemoveImage: () => void
}

export default function EventForm({
  form,
  onFieldChange,
  imageFile,
  imagePreviewUrl,
  fileInputRef,
  onFileChange,
  onRemoveImage,
}: EventFormProps) {
  return (
    <VStack spacing={6} align="stretch">

      {/* Title */}
      <FormControl isRequired>
        <FormLabel {...FIELD_LABEL_PROPS}>Event Title</FormLabel>
        <Input
          placeholder="e.g. Trail Restoration — Mount Rainier"
          value={form.title}
          onChange={e => onFieldChange('title', e.target.value)}
          {...FIELD_INPUT_PROPS}
        />
      </FormControl>

      {/* Description */}
      <FormControl isRequired>
        <FormLabel {...FIELD_LABEL_PROPS}>Description</FormLabel>
        <Textarea
          placeholder="Describe the event, what volunteers will do, what to bring, and where to meet..."
          value={form.description}
          onChange={e => onFieldChange('description', e.target.value)}
          {...FIELD_INPUT_PROPS}
          rows={5}
          resize="vertical"
        />
      </FormControl>

      {/* Cover image */}
      <FormControl>
        <FormLabel {...FIELD_LABEL_PROPS}>Cover Image</FormLabel>
        <Input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={onFileChange}
          display="none"
        />
        <HStack spacing={4} align="center" justify="center" w="full">
          {imagePreviewUrl && (
            <Image
              src={imagePreviewUrl}
              alt="Event cover preview"
              boxSize="96px"
              objectFit="cover"
              borderRadius="lg"
              borderWidth="1px"
              borderColor="gray.200"
            />
          )}
          <Button
            leftIcon={<Icon as={MdUpload} />}
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            borderColor="#385C40"
            color="#385C40"
            borderRadius="lg"
            fontFamily="'Josefin Sans', sans-serif"
            _hover={{ bg: 'green.50' }}
          >
            {imageFile ? 'Change Image' : 'Upload Image'}
          </Button>
          {imageFile && (
            <IconButton
              aria-label="Remove image"
              icon={<Icon as={MdDelete} />}
              variant="outline"
              onClick={onRemoveImage}
              borderColor="gray.600"
              color="gray.600"
              borderRadius="lg"
              _hover={{ bg: 'gray.100' }}
            />
          )}
        </HStack>
        <FormHelperText fontSize="xs">
          PNG or JPG
        </FormHelperText>
      </FormControl>

      <Divider />

      {/* Date range */}
      <HStack spacing={4} flexWrap="wrap">
        <FormControl isRequired flex={1} minW="200px">
          <FormLabel {...FIELD_LABEL_PROPS}>Start Date & Time</FormLabel>
          <Input
            type="datetime-local"
            value={form.startDate}
            onChange={e => onFieldChange('startDate', e.target.value)}
            {...FIELD_INPUT_PROPS}
          />
        </FormControl>

        <FormControl isRequired flex={1} minW="200px">
          <FormLabel {...FIELD_LABEL_PROPS}>End Date & Time</FormLabel>
          <Input
            type="datetime-local"
            value={form.endDate}
            onChange={e => onFieldChange('endDate', e.target.value)}
            {...FIELD_INPUT_PROPS}
          />
        </FormControl>
      </HStack>

      {/* Location */}
      <FormControl isRequired>
        <FormLabel {...FIELD_LABEL_PROPS}>Location</FormLabel>
        <Input
          placeholder="e.g. Seattle, WA"
          value={form.location}
          onChange={e => onFieldChange('location', e.target.value)}
          {...FIELD_INPUT_PROPS}
        />
        <FormHelperText fontSize="xs">
          {/* TODO: wire up Google Maps Places autocomplete */}
        </FormHelperText>
      </FormControl>

      <Divider />

      {/* Category + Capacity */}
      <HStack spacing={4} flexWrap="wrap">
        <FormControl isRequired flex={1} minW="180px">
          <FormLabel {...FIELD_LABEL_PROPS}>Category</FormLabel>
          <Select
            placeholder="Select category"
            value={form.eventType}
            onChange={e => onFieldChange('eventType', e.target.value as EventCategory)}
            {...FIELD_INPUT_PROPS}
          >
            {EVENT_CATEGORIES.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </Select>
        </FormControl>

        <FormControl flex={1} minW="160px">
          <FormLabel {...FIELD_LABEL_PROPS}>Capacity</FormLabel>
          <NumberInput
            value={form.capacity ?? ''}
            min={1}
            max={500}
            onChange={(valueString, valueNumber) =>
              onFieldChange('capacity', valueString === '' ? undefined : valueNumber)
            }
            focusBorderColor="#385C40"
          >
            <NumberInputField borderRadius="lg" fontFamily="'Josefin Sans', sans-serif" placeholder="Optional" />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
      </HStack>

    </VStack>
  )
}
