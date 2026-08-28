import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabaseClient'
import type { BlogStatus } from '../types/BlogStatus'
import type { BlogPostFormState } from '../types/BlogPostFormState'

const ASSET_BUCKET = 'public-assets'
const PDF_FOLDER = 'blog-pdfs'
const COVER_FOLDER = 'blog-covers'
const MAX_PDF_BYTES = 20 * 1024 * 1024
const MAX_COVER_BYTES = 5 * 1024 * 1024

const INITIAL_STATE: BlogPostFormState = {
  title: '',
  description: '',
  author: '',
  date: '',
}

interface BlogPostRow {
  title: string
  blog_description: string
  author: string
  blog_date: string
  blog_status: BlogStatus
  file_path: string
  cover_image_path: string | null
}

interface BlogPostInsertPayload {
  title: string
  blog_description: string
  author: string
  blog_date: string
  blog_status: BlogStatus
  created_by: string
  file_path: string
  cover_image_path: string | null
}

interface BlogPostUpdatePayload {
  title: string
  blog_description: string
  author: string
  blog_date: string
  blog_status: BlogStatus
  file_path: string
  cover_image_path: string | null
}

function toInsertPayload(
  data: BlogPostFormState,
  createdBy: string,
  status: BlogStatus,
  filePath: string,
  coverImagePath: string | null,
): BlogPostInsertPayload {
  return {
    title: data.title,
    blog_description: data.description,
    author: data.author,
    blog_date: new Date(data.date).toISOString(),
    blog_status: status,
    created_by: createdBy,
    file_path: filePath,
    cover_image_path: coverImagePath,
  }
}

function toUpdatePayload(
  data: BlogPostFormState,
  status: BlogStatus,
  filePath: string,
  coverImagePath: string | null,
): BlogPostUpdatePayload {
  return {
    title: data.title,
    blog_description: data.description,
    author: data.author,
    blog_date: new Date(data.date).toISOString(),
    blog_status: status,
    file_path: filePath,
    cover_image_path: coverImagePath,
  }
}

function missingRequiredFields(data: BlogPostFormState): boolean {
  return !data.title || !data.description || !data.author || !data.date
}

// Postgres gives back an ISO timestamp; <input type="date"> just wants the
// calendar date portion, and since blog_date is stored as UTC midnight for
// date-only input there's no timezone shift to correct for (unlike the
// datetime-local case on events).
function toDateInputValue(iso: string): string {
  return iso.slice(0, 10)
}

/**
 * Owns Blog Post form state — field values, PDF/cover selection & upload,
 * and submission. Used for both creating a new post (no blogId) and editing
 * an existing one (blogId passed in, which prefills the form and switches
 * handleSave/handleDelete on instead of handleSaveDraft/handlePublish).
 */
export function useBlogPostForm(blogId?: string) {
  const navigate = useNavigate()
  const toast = useToast()
  const { user } = useAuth()
  const isEditMode = Boolean(blogId)

  const [form, setForm] = useState<BlogPostFormState>(INITIAL_STATE)
  const [status, setStatus] = useState<BlogStatus>('draft')
  const [existingFilePath, setExistingFilePath] = useState<string | null>(null)
  const [existingCoverPath, setExistingCoverPath] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [publishing, setPublishing] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [pdfFileName, setPdfFileName] = useState<string | null>(null)
  const pdfInputRef = useRef<HTMLInputElement>(null)

  const [coverFile, setCoverFile] = useState<File | null>(null)
  const [coverPreviewUrl, setCoverPreviewUrl] = useState<string | null>(null)
  const coverInputRef = useRef<HTMLInputElement>(null)

  const [loading, setLoading] = useState(isEditMode)
  const [loadError, setLoadError] = useState<string | null>(null)

  const fetchPost = useCallback(async () => {
    if (!blogId) return

    setLoading(true)
    setLoadError(null)

    const { data, error } = await supabase
      .from('blog_posts')
      .select('title, blog_description, author, blog_date, blog_status, file_path, cover_image_path')
      .eq('blog_id', Number(blogId))
      .maybeSingle()

    if (error) {
      setLoadError(error.message)
      setLoading(false)
      return
    }
    if (!data) {
      setLoadError('Post not found.')
      setLoading(false)
      return
    }

    const row = data as BlogPostRow
    setForm({
      title: row.title,
      description: row.blog_description,
      author: row.author,
      date: toDateInputValue(row.blog_date),
    })
    setStatus(row.blog_status)
    setExistingFilePath(row.file_path)
    setPdfFileName(row.file_path.split('/').pop() ?? row.file_path)
    setExistingCoverPath(row.cover_image_path)
    setCoverPreviewUrl(
      row.cover_image_path
        ? supabase.storage.from(ASSET_BUCKET).getPublicUrl(row.cover_image_path).data.publicUrl
        : null,
    )
    setLoading(false)
  }, [blogId])

  useEffect(() => {
    if (blogId) fetchPost()
  }, [blogId, fetchPost])

  function setField<K extends keyof BlogPostFormState>(key: K, value: BlogPostFormState[K]) {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  function handlePdfChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null
    if (!file) return

    if (file.type !== 'application/pdf') {
      toast({ title: 'Please choose a PDF file', status: 'warning', duration: 3000 })
      e.target.value = ''
      return
    }
    if (file.size > MAX_PDF_BYTES) {
      toast({ title: 'PDF must be under 20MB', status: 'warning', duration: 3000 })
      e.target.value = ''
      return
    }

    setPdfFile(file)
    setPdfFileName(file.name)
  }

  function handleCoverChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null
    if (!file) return

    if (!file.type.startsWith('image/')) {
      toast({ title: 'Please choose an image file', status: 'warning', duration: 3000 })
      e.target.value = ''
      return
    }
    if (file.size > MAX_COVER_BYTES) {
      toast({ title: 'Cover image must be under 5MB', status: 'warning', duration: 3000 })
      e.target.value = ''
      return
    }

    setCoverFile(file)
    setCoverPreviewUrl(prev => {
      if (prev) URL.revokeObjectURL(prev)
      return URL.createObjectURL(file)
    })
  }

  function handleRemoveCover() {
    setCoverPreviewUrl(prev => {
      if (prev) URL.revokeObjectURL(prev)
      return null
    })
    setCoverFile(null)
    setExistingCoverPath(null)
    if (coverInputRef.current) coverInputRef.current.value = ''
  }

  // PDF is required on the row (file_path is NOT NULL) — with no new file,
  // falls back to the existing path when editing, or throws when creating.
  async function resolvePdfPath(): Promise<string> {
    if (!pdfFile) {
      if (isEditMode && existingFilePath) return existingFilePath
      throw new Error('A PDF file is required.')
    }

    const fileName = `${crypto.randomUUID()}.pdf`
    const path = `${PDF_FOLDER}/${fileName}`

    const { error } = await supabase.storage.from(ASSET_BUCKET).upload(path, pdfFile, {
      cacheControl: '3600',
      upsert: false,
    })
    if (error) throw error

    return path
  }

  // Cover image is optional — with no new file, falls back to the existing
  // path when editing, or null when creating.
  async function resolveCoverPath(): Promise<string | null> {
    if (!coverFile) return isEditMode ? existingCoverPath : null

    const extension = coverFile.name.includes('.') ? coverFile.name.split('.').pop() : undefined
    const fileName = `${crypto.randomUUID()}${extension ? `.${extension}` : ''}`
    const path = `${COVER_FOLDER}/${fileName}`

    const { error } = await supabase.storage.from(ASSET_BUCKET).upload(path, coverFile, {
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
      const filePath = await resolvePdfPath()
      const coverPath = await resolveCoverPath()
      const { error } = await supabase
        .from('blog_posts')
        .insert(toInsertPayload(form, user.id, 'draft', filePath, coverPath))
      if (error) throw error
      toast({ title: 'Draft saved', status: 'success', duration: 3000, isClosable: true })
      navigate('/dashboard/blog')
    } catch (error) {
      console.error('Failed to save draft:', error)
      toast({
        title: 'Failed to save draft',
        description: error instanceof Error ? error.message : undefined,
        status: 'error',
        duration: 3000,
      })
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
      const filePath = await resolvePdfPath()
      const coverPath = await resolveCoverPath()
      const { error } = await supabase
        .from('blog_posts')
        .insert(toInsertPayload(form, user.id, 'published', filePath, coverPath))
      if (error) throw error
      toast({
        title: 'Post published!',
        description: 'It is now visible on the public blog.',
        status: 'success',
        duration: 4000,
        isClosable: true,
      })
      navigate('/dashboard/blog')
    } catch (error) {
      console.error('Failed to publish post:', error)
      toast({
        title: 'Failed to publish post',
        description: error instanceof Error ? error.message : undefined,
        status: 'error',
        duration: 3000,
      })
    } finally {
      setPublishing(false)
    }
  }

  async function handleSave() {
    if (!blogId) return
    setSaving(true)
    try {
      const filePath = await resolvePdfPath()
      const coverPath = await resolveCoverPath()
      const { error } = await supabase
        .from('blog_posts')
        .update(toUpdatePayload(form, status, filePath, coverPath))
        .eq('blog_id', Number(blogId))
      if (error) throw error

      toast({ title: 'Post updated', status: 'success', duration: 3000, isClosable: true })
      navigate('/dashboard/blog')
    } catch (error) {
      console.error('Failed to update post:', error)
      toast({
        title: 'Failed to update post',
        description: error instanceof Error ? error.message : undefined,
        status: 'error',
        duration: 3000,
      })
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!blogId) return
    setDeleting(true)
    try {
      const { error } = await supabase.from('blog_posts').delete().eq('blog_id', Number(blogId))
      if (error) throw error

      // Best-effort storage cleanup — don't block the row delete on it.
      const pathsToRemove = [existingFilePath, existingCoverPath].filter((p): p is string => Boolean(p))
      if (pathsToRemove.length > 0) {
        await supabase.storage.from(ASSET_BUCKET).remove(pathsToRemove)
      }

      toast({ title: 'Post deleted', status: 'success', duration: 3000, isClosable: true })
      navigate('/dashboard/blog')
    } catch (error) {
      console.error('Failed to delete post:', error)
      toast({ title: 'Failed to delete post', status: 'error', duration: 3000 })
      setDeleting(false)
    }
  }

  return {
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
    publishing,
    deleting,
    handleSaveDraft,
    handlePublish,
    handleSave,
    handleDelete,
  }
}
