import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { DASHBOARD_EVENT_COLUMNS, mapDashboardEventRow, type DashboardEventRow } from '../lib/dashboardEvents'
import type { DashboardEvent } from '../types/DashboardEvent'

interface UseEventResult {
  event: DashboardEvent | null
  loading: boolean
  error: string | null
  refetch: () => void
}

export function useEvent(eventId: string | undefined): UseEventResult {
  const [event, setEvent] = useState<DashboardEvent | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchEvent = useCallback(async () => {
    if (!eventId) {
      setEvent(null)
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    const { data, error: fetchError } = await supabase
      .from('events')
      .select(DASHBOARD_EVENT_COLUMNS)
      .eq('event_id', eventId)
      .maybeSingle()

    if (fetchError) {
      setError(fetchError.message)
      setEvent(null)
      setLoading(false)
      return
    }

    const row = data as unknown as DashboardEventRow | null
    setEvent(row ? mapDashboardEventRow(row) : null)
    setLoading(false)
  }, [eventId])

  useEffect(() => {
    fetchEvent()
  }, [fetchEvent])

  return { event, loading, error, refetch: fetchEvent }
}
