import { createContext, useContext, useEffect, useState } from 'react'
import type { User } from '@supabase/supabase-js'
import { supabase } from '../lib/supabaseClient'
import type { Profile } from '../types/Profile'
import type { UserRole } from '../types/UserRole'
import { useRole } from '../hooks/useRole'

interface AuthContextValue {
  user: User | null
  profile: Profile | null
  loading: boolean
  availableRoles: UserRole[]
  activeRole: UserRole
  setActiveRole: (role: UserRole) => void
  roleLoading: boolean
}


const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser]       = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const {
    availableRoles,
    activeRole,
    setActiveRole,
    loading: roleLoading,
  } = useRole(user)

async function fetchProfile(userId: string) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('profile_id, created_at, username')
      .eq('profile_id', userId)
      .single()
    setProfile(data ?? null)
  } catch (err) {
    console.error('fetchProfile threw:', err)
  }
}

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      const u = session?.user ?? null
      setUser(u)
      if (u) {
        fetchProfile(u.id).finally(() => setLoading(false))
      } else {
        setLoading(false)
      }
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const u = session?.user ?? null
      setUser(u)
      if (u) fetchProfile(u.id)
      else setProfile(null)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user, profile, loading, availableRoles, activeRole, setActiveRole, roleLoading }}>
      {!loading && !roleLoading && children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}