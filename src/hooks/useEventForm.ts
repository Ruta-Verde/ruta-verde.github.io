import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabaseClient'
import type { EventStatus } from '../types/EventStatus'
import type { EventFormState } from '../types/EventFormState'

const IMAGE_BUCKET = 'public-assets'
const IMAGE_FOLDER = 'events'
const MAX_IMAGE_BYTES = 5 * 1024 * 1024
const DEFAULT_IMAGE_PATH = 'events/event1.png'

const INITIAL_STATE: EventFormState = {
  title: '',
  description: '',
  location: '',
  startDate: '',
  endDate: '',
  capacity: undefined,
  eventType: '',
}

interface EventInsertPayload {
  event_name: string
  about: string
  location: string
  start_date: string
  end_date: string
  status: EventStatus
  created_by: string
  capacity?: number
  event_type: string
  image_path: string
}

function toPayload(
  data: EventFormState,
  createdBy: string,
  status: EventStatus,
  imagePath: string
): EventInsertPayload {
  return {
    event_name: data.title,
    about: data.description,
    location: data.location,
    start_date: new Date(data.startDate).toISOString(),
    end_date: new Date(data.endDate).toISOString(),
    status,
    created_by: createdBy,
    image_path: imagePath,
    event_type: data.eventType,
    ...(data.capacity !== undefined ? { capacity: data.capacity } : {}),
  }
}

function missingRequiredFields(data: EventFormState): boolean {
  return !data.title || !data.description || !data.location || !data.startDate || !data.endDate || !data.eventType
}

/**
 * Owns all Create Event form state — field values, cover image selection/upload,
 * and the save-draft/publish submission flow (including Supabase writes, toasts,
 * and post-publish navigation). Depends on router and Chakra toast context, so
 * it's a page-level hook rather than a portable/headless one.
 */
export function useEventForm() {
  const navigate = useNavigate()
  const toast = useToast()
  const { user } = useAuth()
  const [form, setForm] = useState<EventFormState>(INITIAL_STATE)
  const [saving, setSaving] = useState(false)
  const [publishing, setPublishing] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Generic field updater — avoids a handler per field
  function setField<K extends keyof EventFormState>(key: K, value: EventFormState[K]) {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null
    if (!file) return

    if (!file.type.startsWith('image/')) {
      toast({ title: 'Please choose an image file', status: 'warning', duration: 3000 })
      e.target.value = ''
      return
    }
    if (file.size > MAX_IMAGE_BYTES) {
      toast({ title: 'Image must be under 5MB', status: 'warning', duration: 3000 })
      e.target.value = ''
      return
    }

    setImageFile(file)
    setImagePreviewUrl(prev => {
      if (prev) URL.revokeObjectURL(prev)
      return URL.createObjectURL(file)
    })
  }

  function handleRemoveImage() {
    setImagePreviewUrl(prev => {
      if (prev) URL.revokeObjectURL(prev)
      return null
    })
    setImageFile(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  // Uploads the selected image (if any) and returns its storage path for the events row.
  // Falls back to a default placeholder image when no cover image was chosen.
  async function uploadEventImage(): Promise<string> {
    if (!imageFile || !user) return DEFAULT_IMAGE_PATH

    const extension = imageFile.name.includes('.') ? imageFile.name.split('.').pop() : undefined
    const fileName = `${crypto.randomUUID()}${extension ? `.${extension}` : ''}`
    const path = `${IMAGE_FOLDER}/${fileName}`

    const { error } = await supabase.storage.from(IMAGE_BUCKET).upload(path, imageFile, {
      cacheControl: '3600',
      upsert: false,
    })
    if (error) throw error

    return path
  }

  async function handleSaveDraft() {
    if (!user) return
    setSaving(true)
    try {
      const imagePath = await uploadEventImage()
      const { error } = await supabase.from('events').insert(toPayload(form, user.id, 'draft', imagePath))
      if (error) throw error
      toast({
        title: 'Draft saved',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } catch (error) {
      console.error('Failed to save draft:', error)
      toast({ title: 'Failed to save draft', status: 'error', duration: 3000 })
    } finally {
      setSaving(false)
    }
  }

  async function handlePublish() {
    if (!user) return
    if (missingRequiredFields(form)) {
      toast({ title: 'Fill in all required fields', status: 'warning', duration: 3000 })
      return
    }
    setPublishing(true)
    try {
      const imagePath = await uploadEventImage()
      const { error } = await supabase.from('events').insert(toPayload(form, user.id, 'scheduled', imagePath))
      if (error) throw error
      toast({
        title: 'Event published!',
        description: 'It is now visible to volunteers.',
        status: 'success',
        duration: 4000,
        isClosable: true,
      })
      navigate('/dashboard/events')
    } catch (error) {
      console.error('Failed to publish event:', error)
      toast({ title: 'Failed to publish event', status: 'error', duration: 3000 })
    } finally {
      setPublishing(false)
    }
  }

  return {
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
  }
}
