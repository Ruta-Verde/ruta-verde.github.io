import {
  VStack,
  HStack,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Textarea,
  Select,
  Text,
  Button,
  IconButton,
  Icon,
  Image,
  Divider,
} from '@chakra-ui/react'
import type { RefObject } from 'react'
import { MdUpload, MdDelete, MdPictureAsPdf } from 'react-icons/md'
import type { BlogPostFormState } from '../../types/BlogPostFormState'
import type { BlogStatus } from '../../types/BlogStatus'

const BLOG_STATUSES: { value: BlogStatus; label: string }[] = [
  { value: 'draft', label: 'Draft' },
  { value: 'published', label: 'Published' },
  { value: 'unpublished', label: 'Unpublished' },
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

interface BlogPostFormProps {
  form: BlogPostFormState
  onFieldChange: <K extends keyof BlogPostFormState>(key: K, value: BlogPostFormState[K]) => void
  pdfFile: File | null
  pdfFileName: string | null
  pdfInputRef: RefObject<HTMLInputElement>
  onPdfChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  coverFile: File | null
  coverPreviewUrl: string | null
  coverInputRef: RefObject<HTMLInputElement>
  onCoverChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onRemoveCover: () => void
  status?: BlogStatus
  onStatusChange?: (status: BlogStatus) => void
}

export default function BlogPostForm({
  form,
  onFieldChange,
  pdfFile,
  pdfFileName,
  pdfInputRef,
  onPdfChange,
  coverFile,
  coverPreviewUrl,
  coverInputRef,
  onCoverChange,
  onRemoveCover,
  status,
  onStatusChange,
}: BlogPostFormProps) {
  return (
    <VStack spacing={6} align="stretch">

      {/* Title */}
      <FormControl isRequired>
        <FormLabel {...FIELD_LABEL_PROPS}>Post Title</FormLabel>
        <Input
          placeholder="e.g. Mangrove Tree"
          value={form.title}
          onChange={e => onFieldChange('title', e.target.value)}
          {...FIELD_INPUT_PROPS}
        />
      </FormControl>

      {/* Status — edit mode only (status is set by which button you press when creating) */}
      {status !== undefined && onStatusChange && (
        <FormControl isRequired>
          <FormLabel {...FIELD_LABEL_PROPS}>Status</FormLabel>
          <Select
            value={status}
            onChange={e => onStatusChange(e.target.value as BlogStatus)}
            {...FIELD_INPUT_PROPS}
          >
            {BLOG_STATUSES.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </Select>
        </FormControl>
      )}

      {/* Author */}
      <FormControl isRequired>
        <FormLabel {...FIELD_LABEL_PROPS}>Author</FormLabel>
        <Input
          placeholder="e.g. Jean Jacques"
          value={form.author}
          onChange={e => onFieldChange('author', e.target.value)}
          {...FIELD_INPUT_PROPS}
        />
      </FormControl>

      {/* Date */}
      <FormControl isRequired>
        <FormLabel {...FIELD_LABEL_PROPS}>Date</FormLabel>
        <Input
          type="date"
          value={form.date}
          onChange={e => onFieldChange('date', e.target.value)}
          {...FIELD_INPUT_PROPS}
        />
      </FormControl>

      {/* Description */}
      <FormControl isRequired>
        <FormLabel {...FIELD_LABEL_PROPS}>Description</FormLabel>
        <Textarea
          placeholder="A short summary shown on the blogs pages..."
          value={form.description}
          onChange={e => onFieldChange('description', e.target.value)}
          {...FIELD_INPUT_PROPS}
          rows={4}
          resize="vertical"
        />
      </FormControl>

      <Divider />

      {/* PDF upload */}
      <FormControl isRequired>
        <FormLabel {...FIELD_LABEL_PROPS}>Post PDF</FormLabel>
        <Input
          ref={pdfInputRef}
          type="file"
          accept="application/pdf"
          onChange={onPdfChange}
          display="none"
        />
        <HStack spacing={4} align="center" w="full">
          <Button
            leftIcon={<Icon as={MdUpload} />}
            variant="outline"
            onClick={() => pdfInputRef.current?.click()}
            borderColor="#385C40"
            color="#385C40"
            borderRadius="lg"
            fontFamily="'Josefin Sans', sans-serif"
            _hover={{ bg: 'green.50' }}
          >
            {pdfFile ? 'Change PDF' : 'Upload PDF'}
          </Button>
          {pdfFileName && (
            <HStack spacing={2} color="gray.600" fontSize="sm" fontFamily="'Josefin Sans', sans-serif">
              <Icon as={MdPictureAsPdf} />
              <Text noOfLines={1}>{pdfFileName}</Text>
            </HStack>
          )}
        </HStack>
        <FormHelperText fontSize="xs">
          PDF only, up to 20MB. Required.
        </FormHelperText>
      </FormControl>

      {/* Cover image */}
      <FormControl>
        <FormLabel {...FIELD_LABEL_PROPS}>Cover Image</FormLabel>
        <Input
          ref={coverInputRef}
          type="file"
          accept="image/*"
          onChange={onCoverChange}
          display="none"
        />
        <HStack spacing={4} align="center" justify="center" w="full">
          {coverPreviewUrl && (
            <Image
              src={coverPreviewUrl}
              alt="Post cover preview"
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
            onClick={() => coverInputRef.current?.click()}
            borderColor="#385C40"
            color="#385C40"
            borderRadius="lg"
            fontFamily="'Josefin Sans', sans-serif"
            _hover={{ bg: 'green.50' }}
          >
            {coverFile ? 'Change Image' : 'Upload Image'}
          </Button>
          {coverFile && (
            <IconButton
              aria-label="Remove cover image"
              icon={<Icon as={MdDelete} />}
              variant="outline"
              onClick={onRemoveCover}
              borderColor="gray.600"
              color="gray.600"
              borderRadius="lg"
              _hover={{ bg: 'gray.100' }}
            />
          )}
        </HStack>
        <FormHelperText fontSize="xs">
          Optional. PNG or JPG, up to 5MB.
        </FormHelperText>
      </FormControl>

      {pdfFileName && !pdfFile && (
        <Text fontSize="xs" color="gray.400">
          Keeping current file: {pdfFileName}
        </Text>
      )}
    </VStack>
  )
}
