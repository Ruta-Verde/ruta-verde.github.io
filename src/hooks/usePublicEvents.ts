import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { PUBLIC_EVENT_COLUMNS, mapPublicEventRow, type PublicEventRow } from '../lib/publicEvents'
import type { PublicEvent } from '../types/PublicEvent'

interface UsePublicEventsResult {
  events: PublicEvent[]
  loading: boolean
  error: string | null
  refetch: () => void
}

export function usePublicEvents(): UsePublicEventsResult {
  const [events, setEvents] = useState<PublicEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchEvents = useCallback(async () => {
    setLoading(true)
    setError(null)

    const { data, error: fetchError } = await supabase
      .from('events')
      .select(PUBLIC_EVENT_COLUMNS)
      .in('status', ['scheduled', 'active', 'completed'])
      .order('start_date', { ascending: true })

    if (fetchError) {
      setError(fetchError.message)
      setEvents([])
      setLoading(false)
      return
    }

    const rows = (data ?? []) as unknown as PublicEventRow[]
    setEvents(rows.map(mapPublicEventRow))
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchEvents()
  }, [fetchEvents])

  return { events, loading, error, refetch: fetchEvents }
}
