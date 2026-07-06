import { useEffect, useState } from 'react'
import type { User } from '@supabase/supabase-js'
import { supabase } from '../lib/supabaseClient'
import type { UserRole } from '../types/UserRole'


interface UseRoleReturn {
  availableRoles: UserRole[]
  activeRole: UserRole
  setActiveRole: (role: UserRole) => void
  loading: boolean
}

/**
 * Resolves the current user's available and active roles by querying
 * Supabase for admin and event-organizer status.
 *
 * Every authenticated user is at least a `'Volunteer'`. Additional roles
 * (`'Event Organizer'`, `'Admin'`) are added if the user has a matching
 * row in `event_participants` (event_role = true) or `global_user_roles`,
 * respectively. `activeRole` defaults to the highest-privilege role found
 * (Admin > Event Organizer > Volunteer) — callers can override via
 * `setActiveRole`.
 *
 * Refetches only when `user.id` changes (not on every `user` object
 * re-render). If `user` is `null`, roles default to `['Volunteer']` and
 * no network request is made.
 *
 * @param user - The current authenticated Supabase user, or `null` if logged out.
 * @returns
 *  - `availableRoles` — all roles the user qualifies for.
 *  - `activeRole` — the currently selected role (defaults to highest privilege).
 *  - `setActiveRole` — manually switch the active role (e.g. for a role-switcher UI).
 *  - `loading` — `true` while the role lookup is in flight.
 */

export function useRole(user: User | null): UseRoleReturn {
  const [availableRoles, setAvailableRoles] = useState<UserRole[]>(['volunteer'])
  const [activeRole, setActiveRole] = useState<UserRole>('volunteer')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      setLoading(false)
      return
    }

async function fetchRoles() {
  const [adminResult, organizerResult] = await Promise.all([
    supabase
      .from('global_user_roles')
      .select('user_id')
      .eq('user_id', user!.id)
      .eq('role', 'admin')
      .maybeSingle(),                     // fine here — one admin row per user

    supabase
      .from('event_participants')
      .select('profile_id')
      .eq('profile_id', user!.id)
      .eq('event_role', 'event-organizer')
      .limit(1),                          // drop .maybeSingle() — just get rows array
  ])

  // log both results so we can see exactly what's coming back
  console.log('adminResult:', adminResult)
  console.log('organizerResult:', organizerResult)

  const roles: UserRole[] = ['volunteer']
  if (organizerResult.data && organizerResult.data.length > 0) roles.push('event-organizer')
  if (adminResult.data) roles.push('admin')

  setAvailableRoles(roles)
  setActiveRole(roles[roles.length - 1])
  setLoading(false)
}

    fetchRoles()
  }, [user?.id]) // re-runs only if the logged-in user actually changes

      // active role
  return { availableRoles, activeRole, setActiveRole, loading }
}