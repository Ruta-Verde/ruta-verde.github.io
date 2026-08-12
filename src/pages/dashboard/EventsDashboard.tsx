import { Box, Button, Divider, Flex, HStack, Heading, Icon, Select, Text, VStack, useDisclosure } from '@chakra-ui/react'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MdAdd } from 'react-icons/md'
import { useAuth } from '../../contexts/AuthContext'
import EventSection from '../../components/dashboard/EventSection'
import EventDetailModal from '../../components/dashboard/EventDetailModal'
import { useEvents, type EventFilter } from '../../hooks/useEvents'
import { groupEventsByStatus } from '../../utils/eventStatus'
import type { DashboardEvent } from '../../types/DashboardEvent'

export default function EventsDashboard() {
  const { user, activeRole } = useAuth()
  const navigate = useNavigate()

  const isAdmin = activeRole === 'admin'
  const [filter, setFilter] = useState<EventFilter>(isAdmin ? 'all' : 'mine')

  const { events, loading, error, refetch } = useEvents({ filter, userId: user?.id })
  const { drafts, inProgress, upcoming, past } = useMemo(() => groupEventsByStatus(events), [events])

  const [selectedEvent, setSelectedEvent] = useState<DashboardEvent | null>(null)
  const { isOpen, onOpen, onClose } = useDisclosure()

  function handleSelectEvent(event: DashboardEvent) {
    setSelectedEvent(event)
    onOpen()
  }

  return (
    <VStack align="stretch" spacing={8}>
      <Flex justify="space-between" align="flex-end" flexWrap="wrap" gap={4}>
        <Box>
          <Heading fontFamily="'Josefin Sans', sans-serif" fontSize={{ base: '2xl', md: '3xl' }} fontWeight="700" color="#385C40">
            Events
          </Heading>
          <Text color="gray.500" mt={1} fontSize="sm">
            {isAdmin ? 'All organisation events' : 'Events you are organizing'}
          </Text>
        </Box>

        <HStack spacing={3}>
          {isAdmin && (
            <Box>
              <Text fontSize="xs" fontWeight="600" textTransform="uppercase" letterSpacing="wide" color="gray.500" mb={1} fontFamily="'Josefin Sans', sans-serif">
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

      {error && (
        <Flex bg="red.50" borderWidth="1px" borderColor="red.200" borderRadius="lg" p={4} justify="space-between" align="center">
          <Text color="red.600" fontSize="sm">Couldn't load events: {error}</Text>
          <Button size="xs" variant="outline" colorScheme="red" onClick={refetch}>Retry</Button>
        </Flex>
      )}

      <EventSection title="Drafts" events={drafts} loading={loading} badgeColor="purple" onSelectEvent={handleSelectEvent} />
      <Divider />
      <EventSection title="In Progress" events={inProgress} loading={loading} badgeColor="green" onSelectEvent={handleSelectEvent} />
      <Divider />
      <EventSection title="Upcoming" events={upcoming} loading={loading} badgeColor="blue" onSelectEvent={handleSelectEvent} />
      <Divider />
      <EventSection title="Past" events={past} loading={loading} badgeColor="gray" onSelectEvent={handleSelectEvent} />

      <EventDetailModal event={selectedEvent} isOpen={isOpen} onClose={onClose} />
    </VStack>
  )
}