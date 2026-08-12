import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { DASHBOARD_EVENT_COLUMNS, mapDashboardEventRow, type DashboardEventRow } from '../lib/dashboardEvents'
import type { DashboardEvent } from '../types/DashboardEvent'

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
      .select(DASHBOARD_EVENT_COLUMNS)
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

    const rows = (data ?? []) as unknown as DashboardEventRow[]
    setEvents(rows.map(mapDashboardEventRow))
    setLoading(false)
  }, [filter, userId])

  useEffect(() => {
    fetchEvents()
  }, [fetchEvents])

  return { events, loading, error, refetch: fetchEvents }
}