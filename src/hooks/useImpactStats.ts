import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import { calculateCo2OffsetKg, formatCo2 } from '../utils/co2'
import { MdEco, MdGroup, MdVolunteerActivism, MdEvent } from 'react-icons/md'
import type { UserRole } from '../types/UserRole'
import { ImpactStat } from '../types/ImpactStat'

async function fetchImpactStats(role: UserRole): Promise<ImpactStat[]> {
  if (role === 'admin') {
    const { data, error } = await supabase.rpc('get_admin_impact_stats')
    if (error) throw error
    const d = data[0]
    const co2Kg = calculateCo2OffsetKg(d.trees_planted)
      //Admin data
    return [
      { label: 'Total Members',   value: d.total_members,   icon: MdGroup,             trend: 'increase', helpText: 'Across all events' },
      { label: 'Active Events',   value: d.active_events,   icon: MdEvent,             trend: 'increase', helpText: 'Currently running' },
      { label: 'CO₂ Offset (kg)', value: formatCo2(co2Kg),  icon: MdEco,               trend: 'increase', helpText: 'This quarter'      },
      { label: 'Volunteer Hours', value: d.volunteer_hours, icon: MdVolunteerActivism, trend: 'increase', helpText: 'Organisation-wide' },
    ]
  }

if (role === 'event-organizer') {
  const { data, error } = await supabase.rpc('get_organizer_impact_stats')
  if (error) throw error
  const d = data[0]

  const co2Kg = calculateCo2OffsetKg(d.trees_planted)
    //Event Organizer data
  return [
    { label: 'Events Organized', value: d.total_events,    helpText: 'Total all time',      trend: 'increase', icon: MdEvent },
    { label: 'Hours Mustered',   value: d.volunteer_hours, helpText: 'Across your events',  trend: 'increase', icon: MdVolunteerActivism },
    { label: 'Trees Planted',    value: d.trees_planted,   helpText: 'Across your events',  trend: 'increase', icon: MdEco },
    { label: 'CO₂ Offset (kg)',  value: formatCo2(co2Kg),  helpText: 'Estimated impact',    trend: 'increase', icon: MdGroup },
  ]
}

  const { data, error } = await supabase.rpc('get_volunteer_impact_stats')
  if (error) throw error
  const d = data[0]
  const co2Kg = calculateCo2OffsetKg(d.trees_planted)
    //Volunteer data
  return [
    { label: 'Events Attended', value: d.events_attended, helpText: 'Total all time',     trend: 'increase', icon: MdEvent },
    { label: 'Hours Logged',    value: d.hours_logged,    helpText: 'Volunteering hours', trend: 'increase', icon: MdVolunteerActivism },
    { label: 'CO₂ Offset (kg)', value: formatCo2(co2Kg), helpText: 'Your contribution',  trend: 'increase', icon: MdEco },
    { label: 'Impact Points',   value: d.impact_points,  helpText: 'Ruta Verde score',   trend: 'increase', icon: MdGroup },
  ]
}

interface UseImpactStatsResult {
  stats: ImpactStat[]
  loading: boolean
  error: Error | null
}

export function useImpactStats(role: UserRole, userId: string | undefined): UseImpactStatsResult {
  const [stats, setStats] = useState<ImpactStat[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!userId) return
    setLoading(true)
    setError(null)
    fetchImpactStats(role)
      .then(data => {
        setStats(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('useImpactStats error:', err)
        setError(err)
        setLoading(false)
      })
  }, [role, userId])

  return { stats, loading, error }
}