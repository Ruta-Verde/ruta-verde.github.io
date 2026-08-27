import { useCallback, useEffect, useRef, useState } from 'react'
import type { RealtimeChannel } from '@supabase/supabase-js'
import { supabase } from '../lib/supabaseClient'
import { useAuth } from '../contexts/AuthContext'

export interface ParticipantMetric {
  dailyVolunteerHours: number | null
  treesPlanted: number | null
  notes: string | null
  verifiedBy: string | null
  verifiedAt: string | null
}

export type ParticipantMetricField = 'dailyVolunteerHours' | 'treesPlanted' | 'notes'

interface MetricRow {
  event_participant_id: string
  daily_volunteer_hours: number | null
  trees_planted: number | null
  notes: string | null
  verified_by: string | null
  verified_at: string | null
}

// Maps a raw snake_case DB row to the camelCase shape the UI uses.
function rowToMetric(row: MetricRow): ParticipantMetric {
  return {
    dailyVolunteerHours: row.daily_volunteer_hours,
    treesPlanted: row.trees_planted,
    notes: row.notes,
    verifiedBy: row.verified_by,
    verifiedAt: row.verified_at,
  }
}

interface UseEventParticipantMetricsResult {
  metrics: Record<string, ParticipantMetric>
  loading: boolean
  error: string | null
  upsertMetric: (
    eventParticipantId: string,
    field: ParticipantMetricField,
    value: number | string | null,
  ) => Promise<string | null>
  setEditing: (eventParticipantId: string, field: ParticipantMetricField | null) => void
}

// Loads existing per-participant stat rows for an event, keeps them live via
// a Supabase Realtime subscription, and exposes an upsert to save cell edits.
export function useEventParticipantMetrics(eventId: string | undefined): UseEventParticipantMetricsResult {
  const { user } = useAuth()
  const [metrics, setMetrics] = useState<Record<string, ParticipantMetric>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Tracks which (participant, field) cell is actively being typed into
  // locally, so an incoming realtime update from another viewer doesn't
  // clobber it mid-edit.
  const editingRef = useRef<string | null>(null)

  // Marks (or clears) the cell currently being typed into, so the realtime
  // handler below knows not to overwrite it out from under the local user.
  const setEditing = useCallback((eventParticipantId: string, field: ParticipantMetricField | null) => {
    editingRef.current = field ? `${eventParticipantId}:${field}` : null
  }, [])

  // Fetches the current metric rows for this event, then opens a realtime
  // channel so edits from other viewers stream in; tears both down on
  // unmount or when eventId changes.
  useEffect(() => {
    if (!eventId) {
      setMetrics({})
      setLoading(false)
      return
    }

    let cancelled = false
    setLoading(true)
    setError(null)

    supabase
      .from('event_participant_metrics')
      .select('event_participant_id, daily_volunteer_hours, trees_planted, notes, verified_by, verified_at')
      .eq('event_id', eventId)
      // Seeds local state with whatever rows already exist for this event.
      .then(({ data, error: fetchError }) => {
        if (cancelled) return
        if (fetchError) {
          setError(fetchError.message)
          setLoading(false)
          return
        }
        const rows = (data ?? []) as MetricRow[]
        setMetrics(Object.fromEntries(rows.map(row => [row.event_participant_id, rowToMetric(row)])))
        setLoading(false)
      })

    let channel: RealtimeChannel | null = supabase
      .channel(`event_participant_metrics:${eventId}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'event_participant_metrics', filter: `event_id=eq.${eventId}` },
        // Applies an incoming insert/update/delete from any viewer (including
        // ourselves) to local state, skipping the cell being actively edited.
        payload => {
          if (payload.eventType === 'DELETE') {
            const oldRow = payload.old as Partial<MetricRow>
            if (!oldRow.event_participant_id) return
            setMetrics(prev => {
              const next = { ...prev }
              delete next[oldRow.event_participant_id as string]
              return next
            })
            return
          }

          const row = payload.new as MetricRow
          setMetrics(prev => {
            const key = `${row.event_participant_id}:dailyVolunteerHours`
            const key2 = `${row.event_participant_id}:treesPlanted`
            const key3 = `${row.event_participant_id}:notes`
            if ([key, key2, key3].includes(editingRef.current ?? '')) {
              return prev
            }
            return { ...prev, [row.event_participant_id]: rowToMetric(row) }
          })
        },
      )
      .subscribe()

    return () => {
      cancelled = true
      if (channel) {
        supabase.removeChannel(channel)
        channel = null
      }
    }
  }, [eventId])

  // Saves one field for one participant, merging it onto that
  // participant's existing row and upserting (event_id, event_participant_id)
  // in place instead of appending a new row.
  const upsertMetric = useCallback(
    async (
      eventParticipantId: string,
      field: ParticipantMetricField,
      value: number | string | null,
    ): Promise<string | null> => {
      if (!eventId) return 'Missing event'

      const now = new Date().toISOString()
      const existing = metrics[eventParticipantId]

      const mergedHours = field === 'dailyVolunteerHours' ? (value as number | null) : existing?.dailyVolunteerHours ?? null
      const mergedTrees = field === 'treesPlanted' ? (value as number | null) : existing?.treesPlanted ?? null
      const mergedNotes = field === 'notes' ? (value as string | null) : existing?.notes ?? null
      const isNowEmpty = mergedHours === null && mergedTrees === null && !mergedNotes

      // No values left for this participant: drop the row instead of
      // upserting an all-null one. Nothing to do if there was no row to begin with.
      if (isNowEmpty) {
        if (!existing) return null

        const { error: deleteError } = await supabase
          .from('event_participant_metrics')
          .delete()
          .eq('event_id', eventId)
          .eq('event_participant_id', eventParticipantId)

        if (deleteError) {
          return deleteError.message
        }

        setMetrics(prev => {
          const next = { ...prev }
          delete next[eventParticipantId]
          return next
        })
        return null
      }

      const patch = {
        event_id: eventId,
        event_participant_id: eventParticipantId,
        daily_volunteer_hours: mergedHours,
        trees_planted: mergedTrees,
        notes: mergedNotes,
        verified_by: user?.id ?? null,
        verified_at: now,
      }

      const { data, error: upsertError } = await supabase
        .from('event_participant_metrics')
        .upsert(patch, { onConflict: 'event_id,event_participant_id' })
        .select('event_participant_id, daily_volunteer_hours, trees_planted, notes, verified_by, verified_at')
        .single()

      if (upsertError) {
        return upsertError.message
      }

      setMetrics(prev => ({ ...prev, [eventParticipantId]: rowToMetric(data as MetricRow) }))
      return null
    },
    [eventId, metrics, user?.id],
  )

  return { metrics, loading, error, upsertMetric, setEditing }
}
