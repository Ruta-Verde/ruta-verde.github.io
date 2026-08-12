import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export interface ProfileSearchResult {
  profileId: string
  username: string
}

const DEBOUNCE_MS = 300
const RESULT_LIMIT = 6

export function useProfileSearch(query: string, excludeProfileIds: string[]): {
  results: ProfileSearchResult[]
  loading: boolean
  error: string | null
} {
  const [results, setResults] = useState<ProfileSearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const trimmedQuery = query.trim()
  const excludeKey = excludeProfileIds.join(',')

  useEffect(() => {
    if (!trimmedQuery) {
      setResults([])
      setLoading(false)
      setError(null)
      return
    }

    let cancelled = false
    setLoading(true)

    const timeoutId = setTimeout(async () => {
      const { data, error: fetchError } = await supabase
        .from('profiles')
        .select('profile_id, username')
        .ilike('username', `%${trimmedQuery}%`)
        .limit(RESULT_LIMIT)

      if (cancelled) return

      if (fetchError) {
        setError(fetchError.message)
        setResults([])
        setLoading(false)
        return
      }

      const excluded = new Set(excludeKey ? excludeKey.split(',') : [])
      setResults(
        (data ?? [])
          .filter(row => !excluded.has(row.profile_id))
          .map(row => ({ profileId: row.profile_id, username: row.username })),
      )
      setError(null)
      setLoading(false)
    }, DEBOUNCE_MS)

    return () => {
      cancelled = true
      clearTimeout(timeoutId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trimmedQuery, excludeKey])

  return { results, loading, error }
}
