import type { EventStatus } from './EventStatus'

export interface PublicEvent {
  id: string
  title: string
  location: string
  date: string
  status: EventStatus
  about: string | null
  imageUrl: string | null
}
