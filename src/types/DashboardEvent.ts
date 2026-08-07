import { EventStatus } from "./EventStatus"
import { EventCategory } from "./EventCategory"

export interface DashboardEvent {
  id: string
  title: string
  status: EventStatus
  date: string
  endDate: string
  location: string
  organizerName: string
  attendeeCount: number
  description: string | null
  eventType: EventCategory | null
  capacity: number | null
  imageUrl: string | null
}