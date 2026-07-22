import { EventStatus } from "./EventStatus"

export interface DashboardEvent {
  id: string
  title: string
  status: EventStatus
  date: string
  location: string
  organizerName: string
  attendeeCount: number
}