import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export interface RosterEntry {
  profileId: string
  username: string
  isAdmin: boolean
  eventsAttended: number
  volunteerHours: number
  treesPlanted: number
}

interface RosterRow {
  profile_id: string
  username: string
  is_admin: boolean
  events_attended: number
  volunteer_hours: number
  trees_planted: number
}

function rowToEntry(row: RosterRow): RosterEntry {
  return {
    profileId: row.profile_id,
    username: row.username,
    isAdmin: row.is_admin,
    eventsAttended: row.events_attended,
    volunteerHours: row.volunteer_hours,
    treesPlanted: row.trees_planted,
  }
}

interface UseRosterResult {
  admins: RosterEntry[]
  volunteers: RosterEntry[]
  loading: boolean
  error: string | null
  refetch: () => void
  promoteToAdmin: (profileId: string) => Promise<string | null>
}

export function useRoster(): UseRosterResult {
  const [entries, setEntries] = useState<RosterEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchRoster = useCallback(async () => {
    setLoading(true)
    setError(null)

    const { data, error: fetchError } = await supabase.rpc('get_roster')

    if (fetchError) {
      setError(fetchError.message)
      setEntries([])
      setLoading(false)
      return
    }

    setEntries(((data ?? []) as RosterRow[]).map(rowToEntry))
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchRoster()
  }, [fetchRoster])

  const promoteToAdmin = useCallback(async (profileId: string): Promise<string | null> => {
    const { error: promoteError } = await supabase.rpc('promote_to_admin', { target_profile_id: profileId })
    if (promoteError) return promoteError.message
    return null
  }, [])

  return {
    admins: entries.filter(entry => entry.isAdmin),
    volunteers: entries.filter(entry => !entry.isAdmin),
    loading,
    error,
    refetch: fetchRoster,
    promoteToAdmin,
  }
}
