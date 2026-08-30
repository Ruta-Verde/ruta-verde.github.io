import { supabase } from './supabaseClient'
import type { PublicEvent } from '../types/PublicEvent'
import type { EventStatus } from '../types/EventStatus'

export const PUBLIC_EVENT_COLUMNS = `
  event_id,
  event_name,
  location,
  start_date,
  status,
  about,
  image_path
`

export interface PublicEventRow {
  event_id: string
  event_name: string
  location: string
  start_date: string
  status: EventStatus
  about: string | null
  image_path: string | null
}

export function mapPublicEventRow(row: PublicEventRow): PublicEvent {
  return {
    id: row.event_id,
    title: row.event_name,
    location: row.location,
    date: row.start_date,
    status: row.status,
    about: row.about,
    imageUrl: row.image_path
      ? supabase.storage.from('public-assets').getPublicUrl(row.image_path).data.publicUrl
      : null,
  }
}
