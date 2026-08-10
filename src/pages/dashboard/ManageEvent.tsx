import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Icon,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Spinner,
  Divider,
} from '@chakra-ui/react'
import { useParams, Link } from 'react-router-dom'
import { MdArrowBack, MdEdit } from 'react-icons/md'
import { useEvent } from '../../hooks/useEvent'
import { useEventParticipants } from '../../hooks/useEventParticipants'
import AddParticipantsSection from '../../components/dashboard/AddParticipantsSection'
import UpdateParticipantStatsSection from '../../components/dashboard/UpdateParticipantStatsSection'

export default function ManageEvent() {
  const { eventId } = useParams()
  const { event, loading, error } = useEvent(eventId)
  const { participants, loading: participantsLoading, refetch: refetchParticipants } = useEventParticipants(eventId)

  return (
    <VStack align="stretch" spacing={8} maxW="720px" w="full" mx="auto">

      <Breadcrumb fontSize="sm" color="gray.400" fontFamily="'Josefin Sans', sans-serif">
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to="/dashboard/events">Events</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink color="gray.600">Manage Event</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <Box>
        <HStack spacing={3} mb={1} justify="space-between">
          <Button
            as={Link}
            to="/dashboard/events"
            variant="ghost"
            size="sm"
            leftIcon={<Icon as={MdArrowBack} />}
            fontFamily="'Josefin Sans', sans-serif"
            color="gray.500"
            px={2}
          >
            Back
          </Button>
          <Button
            as={Link}
            to={`/dashboard/events/${eventId}/edit`}
            variant="outline"
            size="sm"
            leftIcon={<Icon as={MdEdit} />}
            borderColor="#385C40"
            color="#385C40"
            borderRadius="lg"
            fontFamily="'Josefin Sans', sans-serif"
            _hover={{ bg: 'green.50' }}
          >
            Edit Details
          </Button>
        </HStack>
        <Heading
          fontFamily="'Josefin Sans', sans-serif"
          fontSize={{ base: '2xl', md: '3xl' }}
          fontWeight="700"
          color="#385C40"
        >
          Manage Event
        </Heading>
        <Text color="gray.500" mt={1} fontSize="sm">
          Manage participants below, or edit event details.
        </Text>
      </Box>

      <Box
        bg="white"
        borderRadius="xl"
        borderWidth="1px"
        borderColor="gray.200"
        p={{ base: 5, md: 8 }}
      >
        {loading ? (
          <HStack spacing={3} color="gray.500">
            <Spinner size="sm" />
            <Text fontFamily="'Josefin Sans', sans-serif">Loading event…</Text>
          </HStack>
        ) : error ? (
          <Text color="red.600" fontSize="sm">Couldn't load event: {error}</Text>
        ) : !event ? (
          <Text color="gray.500" fontSize="sm">Event not found.</Text>
        ) : (
          <VStack align="stretch" spacing={8}>
            <AddParticipantsSection
              eventId={eventId}
              participants={participants}
              onParticipantsAdded={refetchParticipants}
            />

            <Divider />

            <UpdateParticipantStatsSection
              eventId={eventId}
              participants={participants}
              participantsLoading={participantsLoading}
              isTreePlantingEvent={event.eventType === 'tree_planting'}
            />
          </VStack>
        )}
      </Box>
    </VStack>
  )
}
