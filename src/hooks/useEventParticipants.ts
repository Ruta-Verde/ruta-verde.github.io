import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export interface EventParticipant {
  id: string
  profileId: string
  username: string
  role: string
}

interface EventParticipantRow {
  event_paticipation_id: number
  profile_id: string
  event_role: string
  profiles: { username: string } | null
}

interface UseEventParticipantsResult {
  participants: EventParticipant[]
  loading: boolean
  error: string | null
  refetch: () => void
}

export function useEventParticipants(eventId: string | undefined): UseEventParticipantsResult {
  const [participants, setParticipants] = useState<EventParticipant[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchParticipants = useCallback(async () => {
    if (!eventId) {
      setParticipants([])
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    const { data, error: fetchError } = await supabase
      .from('event_participants')
      .select('event_paticipation_id, profile_id, event_role, profiles ( username )')
      .eq('event_id', eventId)

    if (fetchError) {
      setError(fetchError.message)
      setParticipants([])
      setLoading(false)
      return
    }

    const rows = (data ?? []) as unknown as EventParticipantRow[]
    setParticipants(
      rows.map(row => ({
        id: String(row.event_paticipation_id),
        profileId: row.profile_id,
        username: row.profiles?.username ?? 'Unknown volunteer',
        role: row.event_role,
      })),
    )
    setLoading(false)
  }, [eventId])

  useEffect(() => {
    fetchParticipants()
  }, [fetchParticipants])

  return { participants, loading, error, refetch: fetchParticipants }
}
