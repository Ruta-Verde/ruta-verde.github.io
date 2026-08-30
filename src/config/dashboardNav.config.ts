import type { NavItem } from '../types/NavItem'
import { MdLeaderboard, MdEvent, MdArticle } from 'react-icons/md'

export const dashboardNavConfig: NavItem[] = [
  {
    label: 'My Ruta Impact',
    to: '/dashboard/impact',
    icon: MdLeaderboard,
    roles: [],
  },
  {
    label: 'Events',
    to: '/dashboard/events',
    icon: MdEvent,
    roles: ['admin', 'event-organizer'],
  },
  {
    label: 'Blog',
    to: '/dashboard/blog',
    icon: MdArticle,
    roles: ['admin'],
  },
]