import { useCallback, useEffect, useRef, useState } from 'react'
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

interface EventRow {
  event_name: string
  about: string | null
  location: string
  start_date: string
  end_date: string
  status: EventStatus
  capacity: number | null
  event_type: string | null
  image_path: string | null
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

interface EventUpdatePayload {
  event_name: string
  about: string
  location: string
  start_date: string
  end_date: string
  status: EventStatus
  capacity: number | null
  event_type: string
  image_path: string | null
}

function toInsertPayload(
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

function toUpdatePayload(data: EventFormState, status: EventStatus, imagePath: string | null): EventUpdatePayload {
  return {
    event_name: data.title,
    about: data.description,
    location: data.location,
    start_date: new Date(data.startDate).toISOString(),
    end_date: new Date(data.endDate).toISOString(),
    status,
    capacity: data.capacity ?? null,
    event_type: data.eventType,
    image_path: imagePath,
  }
}

function missingRequiredFields(data: EventFormState): boolean {
  return !data.title || !data.description || !data.location || !data.startDate || !data.endDate || !data.eventType
}

// <input type="datetime-local"> expects "YYYY-MM-DDTHH:mm" in local time,
// but Supabase gives back UTC ISO — shift by the local offset before slicing.
function toDatetimeLocalValue(iso: string): string {
  const date = new Date(iso)
  const localMs = date.getTime() - date.getTimezoneOffset() * 60000
  return new Date(localMs).toISOString().slice(0, 16)
}

/**
 * Owns Event form state — field values, cover image selection/upload, and
 * submission. Used for both creating a new event (no eventId) and editing
 * an existing one (eventId passed in, which prefills the form and switches
 * handleSave/handleDelete on instead of handleSaveDraft/handlePublish).
 */
export function useEventForm(eventId?: string) {
  const navigate = useNavigate()
  const toast = useToast()
  const { user } = useAuth()
  const isEditMode = Boolean(eventId)

  const [form, setForm] = useState<EventFormState>(INITIAL_STATE)
  const [status, setStatus] = useState<EventStatus>('draft')
  const [existingImagePath, setExistingImagePath] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [publishing, setPublishing] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [loading, setLoading] = useState(isEditMode)
  const [loadError, setLoadError] = useState<string | null>(null)

  const fetchEvent = useCallback(async () => {
    if (!eventId) return

    setLoading(true)
    setLoadError(null)

    const { data, error } = await supabase
      .from('events')
      .select('event_name, about, location, start_date, end_date, status, capacity, event_type, image_path')
      .eq('event_id', eventId)
      .maybeSingle()

    if (error) {
      setLoadError(error.message)
      setLoading(false)
      return
    }
    if (!data) {
      setLoadError('Event not found.')
      setLoading(false)
      return
    }

    const row = data as EventRow
    setForm({
      title: row.event_name,
      description: row.about ?? '',
      location: row.location,
      startDate: toDatetimeLocalValue(row.start_date),
      endDate: toDatetimeLocalValue(row.end_date),
      capacity: row.capacity ?? undefined,
      eventType: (row.event_type ?? '') as EventFormState['eventType'],
    })
    setStatus(row.status)
    setExistingImagePath(row.image_path)
    setImagePreviewUrl(
      row.image_path ? supabase.storage.from(IMAGE_BUCKET).getPublicUrl(row.image_path).data.publicUrl : null,
    )
    setLoading(false)
  }, [eventId])

  useEffect(() => {
    if (eventId) fetchEvent()
  }, [eventId, fetchEvent])

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
    setExistingImagePath(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  // Uploads the selected image (if any) and returns its storage path.
  // With no new file: falls back to the existing path when editing, or the
  // default placeholder when creating.
  async function resolveImagePath(): Promise<string | null> {
    if (!imageFile) return isEditMode ? existingImagePath : DEFAULT_IMAGE_PATH

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
      const imagePath = await resolveImagePath()
      const { error } = await supabase.from('events').insert(toInsertPayload(form, user.id, 'draft', imagePath ?? DEFAULT_IMAGE_PATH))
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
      const imagePath = await resolveImagePath()
      const { error } = await supabase.from('events').insert(toInsertPayload(form, user.id, 'scheduled', imagePath ?? DEFAULT_IMAGE_PATH))
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

  async function handleSave() {
    if (!eventId) return
    setSaving(true)
    try {
      const imagePath = await resolveImagePath()
      const { error } = await supabase
        .from('events')
        .update(toUpdatePayload(form, status, imagePath))
        .eq('event_id', eventId)
      if (error) throw error

      toast({ title: 'Event updated', status: 'success', duration: 3000, isClosable: true })
      navigate(`/dashboard/events/${eventId}/manage`)
    } catch (error) {
      console.error('Failed to update event:', error)
      toast({ title: 'Failed to update event', status: 'error', duration: 3000 })
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!eventId) return
    setDeleting(true)
    try {
      const { error } = await supabase.from('events').delete().eq('event_id', eventId)
      if (error) throw error

      toast({ title: 'Event deleted', status: 'success', duration: 3000, isClosable: true })
      navigate('/dashboard/events')
    } catch (error) {
      console.error('Failed to delete event:', error)
      toast({ title: 'Failed to delete event', status: 'error', duration: 3000 })
      setDeleting(false)
    }
  }

  return {
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
    publishing,
    deleting,
    handleSaveDraft,
    handlePublish,
    handleSave,
    handleDelete,
  }
}
