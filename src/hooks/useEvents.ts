import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import type { DashboardEvent } from '../types/DashboardEvent'
import type { EventStatus } from '../types/EventStatus'
import type { EventCategory } from '../types/EventCategory'

export type EventFilter = 'all' | 'mine'

interface UseEventsArgs {
  filter: EventFilter
  userId?: string
}

interface UseEventsResult {
  events: DashboardEvent[]
  loading: boolean
  error: string | null
  refetch: () => void
}

interface EventRow {
  event_id: string
  event_name: string
  about: string | null
  start_date: string
  end_date: string
  status: EventStatus
  location: string
  created_by: string
  event_type: EventCategory | null
  capacity: number | null
  image_path: string | null
  organizer: { username: string } | null
  attendees: { count: number }[] | null
}

const EVENTS_SELECT = `
  event_id,
  event_name,
  about,
  start_date,
  end_date,
  status,
  location,
  created_by,
  event_type,
  capacity,
  image_path,
  organizer:profiles!created_by ( username ),
  attendees:event_participants ( count )
`

export function useEvents({ filter, userId }: UseEventsArgs): UseEventsResult {
  const [events, setEvents] = useState<DashboardEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchEvents = useCallback(async () => {
    setLoading(true)
    setError(null)

    if (filter === 'mine' && !userId) {
      setEvents([])
      setLoading(false)
      return
    }

    let query = supabase
      .from('events')
      .select(EVENTS_SELECT)
      .order('start_date', { ascending: true })

    if (filter === 'mine') {
      query = query.eq('created_by', userId as string)
    }

    const { data, error: fetchError } = await query

    if (fetchError) {
      setError(fetchError.message)
      setEvents([])
      setLoading(false)
      return
    }

    const rows = (data ?? []) as unknown as EventRow[]

    const mapped: DashboardEvent[] = rows.map(row => ({
      id: row.event_id,
      title: row.event_name,
      status: row.status,
      date: row.start_date,
      endDate: row.end_date,
      location: row.location,
      organizerName: row.organizer?.username ?? 'Unknown organizer',
      attendeeCount: row.attendees?.[0]?.count ?? 0,
      description: row.about,
      eventType: row.event_type,
      capacity: row.capacity,
      imageUrl: row.image_path
        ? supabase.storage.from('public-assets').getPublicUrl(row.image_path).data.publicUrl
        : null,
    }))

    setEvents(mapped)
    setLoading(false)
  }, [filter, userId])

  useEffect(() => {
    fetchEvents()
  }, [fetchEvents])

  return { events, loading, error, refetch: fetchEvents }
}