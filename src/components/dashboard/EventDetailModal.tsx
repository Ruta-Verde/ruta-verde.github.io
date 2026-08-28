import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Box,
  Image,
  Text,
  VStack,
  Divider,
  Button,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import DetailRow from './DetailRow'
import type { DashboardEvent } from '../../types/DashboardEvent'

const STATUS_LABELS: Record<DashboardEvent['status'], string> = {
  draft: 'Draft',
  scheduled: 'Upcoming',
  active: 'In Progress',
  completed: 'Past',
  cancelled: 'Cancelled',
}

const CATEGORY_LABELS: Record<string, string> = {
  tree_planting: 'Tree Planting',
  conference: 'Conference',
  meeting: 'Meeting',
}

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

interface EventDetailModalProps {
  event: DashboardEvent | null
  isOpen: boolean
  onClose: () => void
}

export default function EventDetailModal({ event, isOpen, onClose }: EventDetailModalProps) {
  const navigate = useNavigate()

  if (!event) return null

  const eventId = event.id

  function handleManageEvent() {
    navigate(`/dashboard/events/${eventId}/manage`)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
      <ModalOverlay />
      <ModalContent bg="transparent" boxShadow="none">
        <VStack align="stretch" spacing={4}>
          <Box
            position="relative"
            bg="white"
            borderRadius="xl"
            boxShadow="lg"
            maxH="70vh"
            overflow="hidden"
            display="flex"
            flexDirection="column"
          >
            <ModalHeader fontFamily="'Josefin Sans', sans-serif" pr={10}>
              {event.title}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody overflowY="auto">
              <VStack align="stretch" spacing={4}>
                {event.imageUrl && (
                  <Image
                    src={event.imageUrl}
                    alt={event.title}
                    borderRadius="lg"
                    maxH="220px"
                    w="full"
                    objectFit="cover"
                  />
                )}

                <VStack align="stretch" spacing={1.5}>
                  <DetailRow label="Status" value={STATUS_LABELS[event.status]} />
                  {event.eventType && (
                    <DetailRow label="Category" value={CATEGORY_LABELS[event.eventType] ?? event.eventType} />
                  )}
                  <DetailRow label="Starts" value={formatDateTime(event.date)} />
                  <DetailRow label="Ends" value={formatDateTime(event.endDate)} />
                  <DetailRow label="Location" value={event.location} />
                  <DetailRow
                    label="Attendees"
                    value={event.capacity ? `${event.attendeeCount} / ${event.capacity}` : `${event.attendeeCount}`}
                  />
                  <DetailRow label="Organizer" value={event.organizerName} />
                </VStack>

                {event.description && (
                  <>
                    <Divider />
                    <VStack align="stretch" spacing={1}>
                      <Text fontWeight="600" color="gray.600" fontSize="sm">
                        About
                      </Text>
                      <Text fontSize="sm" color="gray.700" whiteSpace="pre-wrap">
                        {event.description}
                      </Text>
                    </VStack>
                  </>
                )}
              </VStack>
            </ModalBody>
          </Box>

          <Button
            w="full"
            bg="#385C40"
            color="white"
            borderRadius="xl"
            boxShadow="lg"
            py={6}
            fontFamily="'Josefin Sans', sans-serif"
            _hover={{ bg: '#2d4a33' }}
            onClick={handleManageEvent}
          >
            Event Management
          </Button>
        </VStack>
      </ModalContent>
    </Modal>
  )
}
