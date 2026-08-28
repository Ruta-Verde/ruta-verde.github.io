import type { NavItem } from '../types/NavItem'
import { MdLeaderboard, MdEvent, MdAddBox, MdArticle } from 'react-icons/md'

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
    label: 'Create Event',
    to: '/dashboard/events/create',
    icon: MdAddBox,
    roles: ['admin', 'event-organizer'],
  },
  {
    label: 'Blog',
    to: '/dashboard/blog',
    icon: MdArticle,
    roles: ['admin'],
  },
  {
    label: 'Create Post',
    to: '/dashboard/blog/create',
    icon: MdAddBox,
    roles: ['admin'],
  },
]