import { Badge, Box, Grid, HStack, Heading, Skeleton, Text } from '@chakra-ui/react'
import EventCard from './EventCard'
import type { DashboardEvent } from '../../types/DashboardEvent'

interface EventSectionProps {
  title: string
  events: DashboardEvent[]
  loading: boolean
  badgeColor: string
}

export default function EventSection({ title, events, loading, badgeColor }: EventSectionProps) {
  return (
    <Box>
      <HStack spacing={3} mb={4}>
        <Heading fontFamily="'Josefin Sans', sans-serif" fontSize="lg" fontWeight="600" color="gray.700">
          {title}
        </Heading>
        <Badge colorScheme={badgeColor} borderRadius="full" px={2}>
          {loading ? '–' : events.length}
        </Badge>
      </HStack>

      {loading ? (
        <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={4}>
          {Array.from({ length: 2 }).map((_, i) => (
            <Skeleton key={i} height="180px" borderRadius="xl" />
          ))}
        </Grid>
      ) : events.length === 0 ? (
        <Box bg="gray.50" borderRadius="xl" borderWidth="1px" borderColor="gray.200" p={6} textAlign="center">
          <Text color="gray.400" fontSize="sm" fontFamily="'Josefin Sans', sans-serif">
            No {title.toLowerCase()} events
          </Text>
        </Box>
      ) : (
        <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={4}>
          {events.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </Grid>
      )}
    </Box>
  )
}