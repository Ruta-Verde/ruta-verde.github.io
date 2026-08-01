import type { EventCategory } from './EventCategory'

export interface EventFormState {
  title: string
  description: string
  location: string
  startDate: string
  endDate: string
  capacity?: number
  eventType: EventCategory | ''
}
