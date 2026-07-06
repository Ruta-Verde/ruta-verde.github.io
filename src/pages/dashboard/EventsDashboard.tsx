/**
 * DashboardEvents.tsx
 *
 * Events tab — accessible to admins and event-organizers.
 *
 * Layout:
 *   Three horizontal sections: In Progress → Upcoming → Past
 *   Each section is a horizontally scrollable row of EventCards.
 *
 * Admin-only filter dropdown:
 *   "All events" — shows everything in the org
 *   "My events"  — filters to events the admin is organizing personally
 *   Event-organizers always see only their own events, no dropdown needed.
 *
 * Data is currently stubbed.  Replace fetchEvents() with:
 *   supabase.from('events').select('*').order('start_date', { ascending: true })
 */

import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Select,
  Flex,
  Grid,
  Skeleton,
  Button,
  Icon,
  Divider,
  Badge,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MdAdd } from 'react-icons/md'
import { useAuth } from '../../contexts/AuthContext'
import EventCard from '../../components/dashboard/EventCard'
import type { DashboardEvent, EventStatus } from '../../components/dashboard/EventCard'

// ─── Stub data / fetch ─────────────────────────────────────────────────────────
// Replace with real Supabase query.  Filter param:
//   'all'  → no organizer filter
//   'mine' → WHERE organizer_id = user.id

type EventFilter = 'all' | 'mine'

async function fetchEvents(filter: EventFilter, _userId: string): Promise<DashboardEvent[]> {
  await new Promise(r => setTimeout(r, 700))

  const stub: DashboardEvent[] = [
    {
      id: 'ev-1',
      title: 'Reforestation Day — Cusco Valley',
      status: 'in-progress',
      date: new Date().toISOString(),
      location: 'Cusco, Peru',
      organizerName: 'Maria Torres',
      attendeeCount: 34,
      attendeeAvatars: [],
    },
    {
      id: 'ev-2',
      title: 'River Clean-Up — Urubamba',
      status: 'in-progress',
      date: new Date().toISOString(),
      location: 'Urubamba, Peru',
      organizerName: 'Carlos Lima',
      attendeeCount: 18,
      attendeeAvatars: [],
    },
    {
      id: 'ev-3',
      title: 'Seed Planting Workshop',
      status: 'upcoming',
      date: new Date(Date.now() + 7 * 86400000).toISOString(),
      location: 'Lima, Peru',
      organizerName: 'Maria Torres',
      attendeeCount: 12,
      attendeeAvatars: [],
    },
    {
      id: 'ev-4',
      title: 'Compost Collection Drive',
      status: 'upcoming',
      date: new Date(Date.now() + 14 * 86400000).toISOString(),
      location: 'Arequipa, Peru',
      organizerName: 'Ana Ramos',
      attendeeCount: 9,
      attendeeAvatars: [],
    },
    {
      id: 'ev-5',
      title: 'Coastal Cleanup — Miraflores',
      status: 'past',
      date: new Date(Date.now() - 10 * 86400000).toISOString(),
      location: 'Miraflores, Lima',
      organizerName: 'Carlos Lima',
      attendeeCount: 47,
      attendeeAvatars: [],
    },
    {
      id: 'ev-6',
      title: 'Tree Census — San Isidro',
      status: 'past',
      date: new Date(Date.now() - 30 * 86400000).toISOString(),
      location: 'San Isidro, Lima',
      organizerName: 'Maria Torres',
      attendeeCount: 22,
      attendeeAvatars: [],
    },
  ]

  // Stub "mine" filter — in prod this is handled server-side
  if (filter === 'mine') {
    return stub.filter(e => e.organizerName === 'Maria Torres')
  }
  return stub
}

// ─── Section component ─────────────────────────────────────────────────────────

interface EventSectionProps {
  title: string
  status: EventStatus
  events: DashboardEvent[]
  loading: boolean
  badgeColor: string
}

function EventSection({ title, status, events, loading, badgeColor }: EventSectionProps) {
  const filtered = events.filter(e => e.status === status)

  return (
    <Box>
      <HStack spacing={3} mb={4}>
        <Heading
          fontFamily="'Josefin Sans', sans-serif"
          fontSize="lg"
          fontWeight="600"
          color="gray.700"
        >
          {title}
        </Heading>
        <Badge colorScheme={badgeColor} borderRadius="full" px={2}>
          {loading ? '–' : filtered.length}
        </Badge>
      </HStack>

      {loading ? (
        <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={4}>
          {Array.from({ length: 2 }).map((_, i) => (
            <Skeleton key={i} height="180px" borderRadius="xl" />
          ))}
        </Grid>
      ) : filtered.length === 0 ? (
        <Box
          bg="gray.50"
          borderRadius="xl"
          borderWidth="1px"
          borderColor="gray.200"
          p={6}
          textAlign="center"
        >
          <Text color="gray.400" fontSize="sm" fontFamily="'Josefin Sans', sans-serif">
            No {title.toLowerCase()} events
          </Text>
        </Box>
      ) : (
        <Grid
          templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
          gap={4}
        >
          {filtered.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </Grid>
      )}
    </Box>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function EventsDashboard() {
  const { user, activeRole } = useAuth()
  const navigate = useNavigate()

  const isAdmin = activeRole === 'admin'

  // Admins get a filter; event-organizers always see 'mine'
  const [filter, setFilter] = useState<EventFilter>(isAdmin ? 'all' : 'mine')
  const [events, setEvents] = useState<DashboardEvent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    setLoading(true)
    fetchEvents(filter, user.id).then(data => {
      setEvents(data)
      setLoading(false)
    })
  }, [filter, user])

  return (
    <VStack align="stretch" spacing={8}>

      {/* Header row */}
      <Flex justify="space-between" align="flex-end" flexWrap="wrap" gap={4}>
        <Box>
          <Heading
            fontFamily="'Josefin Sans', sans-serif"
            fontSize={{ base: '2xl', md: '3xl' }}
            fontWeight="700"
            color="#385C40"
          >
            Events
          </Heading>
          <Text color="gray.500" mt={1} fontSize="sm">
            {isAdmin ? 'All organisation events' : 'Events you are organizing'}
          </Text>
        </Box>

        <HStack spacing={3}>
          {/* Admin-only: filter dropdown */}
          {isAdmin && (
            <Box>
              <Text
                fontSize="xs"
                fontWeight="600"
                textTransform="uppercase"
                letterSpacing="wide"
                color="gray.500"
                mb={1}
                fontFamily="'Josefin Sans', sans-serif"
              >
                Filter
              </Text>
              <Select
                value={filter}
                onChange={e => setFilter(e.target.value as EventFilter)}
                size="sm"
                borderRadius="lg"
                focusBorderColor="#385C40"
                fontFamily="'Josefin Sans', sans-serif"
                w="160px"
              >
                <option value="all">All Events</option>
                <option value="mine">My Events</option>
              </Select>
            </Box>
          )}

          {/* Create event CTA — for both admin and event-organizer */}
          <Button
            leftIcon={<Icon as={MdAdd} />}
            bg="#385C40"
            color="white"
            size="sm"
            borderRadius="lg"
            fontFamily="'Josefin Sans', sans-serif"
            _hover={{ bg: '#2d4a33' }}
            onClick={() => navigate('/dashboard/events/create')}
            alignSelf="flex-end"
          >
            Create Event
          </Button>
        </HStack>
      </Flex>

      {/* Three sections */}
      <EventSection
        title="In Progress"
        status="in-progress"
        events={events}
        loading={loading}
        badgeColor="green"
      />
      <Divider />
      <EventSection
        title="Upcoming"
        status="upcoming"
        events={events}
        loading={loading}
        badgeColor="blue"
      />
      <Divider />
      <EventSection
        title="Past"
        status="past"
        events={events}
        loading={loading}
        badgeColor="gray"
      />
    </VStack>
  )
}