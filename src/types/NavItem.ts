import type { UserRole } from './UserRole'

export interface NavItem {
  label: string
  to: string
  icon: React.ElementType
  roles: UserRole[] // Empty = all authenticated users.
}