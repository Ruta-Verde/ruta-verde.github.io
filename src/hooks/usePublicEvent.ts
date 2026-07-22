import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { PUBLIC_EVENT_COLUMNS, mapPublicEventRow, type PublicEventRow } from '../lib/publicEvents'
import type { PublicEvent } from '../types/PublicEvent'

interface UsePublicEventResult {
  event: PublicEvent | null
  loading: boolean
  error: string | null
}

export function usePublicEvent(id: string | undefined): UsePublicEventResult {
  const [event, setEvent] = useState<PublicEvent | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchEvent = useCallback(async () => {
    if (!id) {
      setEvent(null)
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    const { data, error: fetchError } = await supabase
      .from('events')
      .select(PUBLIC_EVENT_COLUMNS)
      .eq('event_id', id)
      .in('status', ['scheduled', 'completed'])
      .maybeSingle()

    if (fetchError) {
      setError(fetchError.message)
      setEvent(null)
      setLoading(false)
      return
    }

    const row = data as unknown as PublicEventRow | null
    setEvent(row ? mapPublicEventRow(row) : null)
    setLoading(false)
  }, [id])

  useEffect(() => {
    fetchEvent()
  }, [fetchEvent])

  return { event, loading, error }
}
