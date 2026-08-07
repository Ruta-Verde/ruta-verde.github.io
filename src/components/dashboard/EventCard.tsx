/**
 * EventCard.tsx
 *
 * Clickable card representing a single event in the dashboard Events tab.
 * Opens the event detail modal on click.
 *
 * Status badge coloring:
 *   draft      → purple
 *   scheduled  → blue
 *   active     → green
 *   completed  → gray
 *   cancelled  → red
 *
 * The card intentionally avoids heavy imagery — the dashboard should feel
 * data-dense, not like the public events page.
 */

import {
  Box,
  Badge,
  Text,
  HStack,
  VStack,
  Icon,
  Flex,
} from '@chakra-ui/react'
import { MdLocationOn, MdCalendarToday, MdPeople } from 'react-icons/md'
import type { DashboardEvent } from '../../types/DashboardEvent'
import type { EventStatus } from '../../types/EventStatus'

// ─── Types ─────────────────────────────────────────────────────────────────────



// ─── Helpers ───────────────────────────────────────────────────────────────────

const statusConfig: Record<EventStatus, { label: string; colorScheme: string }> = {
  draft:     { label: 'Draft',     colorScheme: 'purple' },
  scheduled: { label: 'Upcoming',  colorScheme: 'blue'   },
  active:    { label: 'In Progress', colorScheme: 'green' },
  completed: { label: 'Past',      colorScheme: 'gray'   },
  cancelled: { label: 'Cancelled', colorScheme: 'red'    },
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

// ─── Component ─────────────────────────────────────────────────────────────────

interface EventCardProps {
  event: DashboardEvent
  onClick: () => void
}

export default function EventCard({ event, onClick }: EventCardProps) {
  const { label, colorScheme } = statusConfig[event.status]

  return (
    <Box
      bg="white"
      borderRadius="xl"
      borderWidth="1px"
      borderColor="gray.200"
      p={5}
      cursor="pointer"
      transition="all 0.15s"
      _hover={{
        boxShadow: 'md',
        borderColor: '#385C40',
        transform: 'translateY(-2px)',
      }}
      onClick={onClick}
    >
      <Flex justify="space-between" align="flex-start" mb={3}>
        <Text
          fontFamily="'Josefin Sans', sans-serif"
          fontWeight="600"
          fontSize="md"
          color="gray.800"
          noOfLines={2}
          flex={1}
          pr={3}
        >
          {event.title}
        </Text>
        <Badge
          colorScheme={colorScheme}
          borderRadius="full"
          px={3}
          py={1}
          fontSize="xs"
          fontFamily="'Josefin Sans', sans-serif"
          flexShrink={0}
        >
          {label}
        </Badge>
      </Flex>

      <VStack align="stretch" spacing={1.5} mb={4}>
        <HStack spacing={2} color="gray.500" fontSize="sm">
          <Icon as={MdCalendarToday} boxSize={4} />
          <Text>{formatDate(event.date)}</Text>
        </HStack>
        <HStack spacing={2} color="gray.500" fontSize="sm">
          <Icon as={MdLocationOn} boxSize={4} />
          <Text noOfLines={1}>{event.location}</Text>
        </HStack>
        <HStack spacing={2} color="gray.500" fontSize="sm">
          <Icon as={MdPeople} boxSize={4} />
          <Text>{event.attendeeCount} attendees</Text>
        </HStack>
      </VStack>

      {/* Attendee avatar cluster — stub, real app pulls profile_picture_url
      <Flex justify="space-between" align="center">
        <Text fontSize="xs" color="gray.400" fontFamily="'Josefin Sans', sans-serif">
          Organized by {event.organizerName}
        </Text>
        {event.attendeeAvatars && event.attendeeAvatars.length > 0 && (
          <Tooltip label={`${event.attendeeCount} attending`} hasArrow>
            <AvatarGroup size="xs" max={4}>
              {event.attendeeAvatars.map((src, i) => (
                <Avatar key={i} src={src} bg="#385C40" />
              ))}
            </AvatarGroup>
          </Tooltip>
        )}
      </Flex> */}
    </Box>
  )
}