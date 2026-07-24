import type { DashboardEvent } from "../types/DashboardEvent"

export function groupEventsByStatus(events: DashboardEvent[]) {
  return {
    drafts: events.filter(e => e.status === 'draft'),
    upcoming: events.filter(e => e.status === 'scheduled'),
    inProgress: events.filter(e => e.status === 'active'),
    past: events.filter(e => e.status === 'completed'),
  }
}