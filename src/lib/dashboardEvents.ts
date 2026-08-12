import { supabase } from './supabaseClient'
import type { DashboardEvent } from '../types/DashboardEvent'
import type { EventStatus } from '../types/EventStatus'
import type { EventCategory } from '../types/EventCategory'

export const DASHBOARD_EVENT_COLUMNS = `
  event_id,
  event_name,
  about,
  start_date,
  end_date,
  status,
  location,
  created_by,
  event_type,
  capacity,
  image_path,
  organizer:profiles!created_by ( username ),
  attendees:event_participants ( count )
`

export interface DashboardEventRow {
  event_id: string
  event_name: string
  about: string | null
  start_date: string
  end_date: string
  status: EventStatus
  location: string
  created_by: string
  event_type: EventCategory | null
  capacity: number | null
  image_path: string | null
  organizer: { username: string } | null
  attendees: { count: number }[] | null
}

export function mapDashboardEventRow(row: DashboardEventRow): DashboardEvent {
  return {
    id: row.event_id,
    title: row.event_name,
    status: row.status,
    date: row.start_date,
    endDate: row.end_date,
    location: row.location,
    organizerName: row.organizer?.username ?? 'Unknown organizer',
    attendeeCount: row.attendees?.[0]?.count ?? 0,
    description: row.about,
    eventType: row.event_type,
    capacity: row.capacity,
    imageUrl: row.image_path
      ? supabase.storage.from('public-assets').getPublicUrl(row.image_path).data.publicUrl
      : null,
  }
}
