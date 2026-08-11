import type { EventStatus } from './EventStatus'
import type { EventCategory } from './EventCategory'

export interface EventDetail {
  id: string
  title: string
  description: string | null
  status: EventStatus
  startDate: string
  endDate: string
  location: string
  eventType: EventCategory | null
  capacity: number | null
  organizerName: string
  attendeeCount: number
  imageUrl: string | null
}
