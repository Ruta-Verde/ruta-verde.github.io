/**
 * RouteGuard.tsx
 *
 * Wraps any route that requires specific roles.
 * Reads from AuthContext so it always has the latest role state.
 *
 * Usage:
 *   <RouteGuard allowed={['admin']}>
 *     <AdminBlogPage />
 *   </RouteGuard>
 *
 * Two failure modes:
 *   1. Not logged in → redirect to /loginpage
 *   2. Logged in but wrong role → redirect to /dashboard (or show 403)
 *
 * We redirect rather than render a 403 to avoid leaking that the route exists.
 */

import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import type { UserRole } from '../types/UserRole'

interface RouteGuardProps {
  allowed: UserRole[]
  children: React.ReactNode
}

export default function RouteGuard({ allowed, children }: RouteGuardProps) {
  const { user, availableRoles, loading, roleLoading } = useAuth()

  // Authenticating
  if (loading || roleLoading) return null

  // Not authenticated at all
  if (!user) return <Navigate to="/loginpage" replace />

  // Authenticated user can't access non-permitted pages
  const hasAccess = allowed.some(role => availableRoles.includes(role))
  if (!hasAccess) return <Navigate to="/dashboard" replace />

  return <>{children}</>
}