import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Image,
  Text,
  VStack,
  HStack,
  Divider,
} from '@chakra-ui/react'
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

interface DetailRowProps {
  label: string
  value: string
}

function DetailRow({ label, value }: DetailRowProps) {
  return (
    <HStack align="flex-start" spacing={2} fontSize="sm">
      <Text fontWeight="600" color="gray.600" minW="90px">
        {label}
      </Text>
      <Text color="gray.700">{value}</Text>
    </HStack>
  )
}

interface EventDetailModalProps {
  event: DashboardEvent | null
  isOpen: boolean
  onClose: () => void
}

export default function EventDetailModal({ event, isOpen, onClose }: EventDetailModalProps) {
  if (!event) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent borderRadius="xl">
        <ModalHeader fontFamily="'Josefin Sans', sans-serif" pr={10}>
          {event.title}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
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
      </ModalContent>
    </Modal>
  )
}
