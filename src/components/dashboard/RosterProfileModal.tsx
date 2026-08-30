import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Box,
  VStack,
  Button,
  Icon,
} from '@chakra-ui/react'
import { MdAdminPanelSettings } from 'react-icons/md'
import DetailRow from './DetailRow'
import type { RosterEntry } from '../../hooks/useRoster'

interface RosterProfileModalProps {
  entry: RosterEntry | null
  isOpen: boolean
  onClose: () => void
  onRequestPromote: (entry: RosterEntry) => void
}

export default function RosterProfileModal({ entry, isOpen, onClose, onRequestPromote }: RosterProfileModalProps) {
  if (!entry) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered>
      <ModalOverlay />
      <ModalContent bg="transparent" boxShadow="none" mx={4}>
        <VStack align="stretch" spacing={4}>
          <Box position="relative" bg="white" borderRadius="xl" boxShadow="lg" overflow="hidden">
            <ModalHeader fontFamily="'Josefin Sans', sans-serif" pr={10}>
              {entry.username}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <VStack align="stretch" spacing={1.5}>
                <DetailRow label="Username" value={entry.username} />
                <DetailRow label="Events Attended" value={String(entry.eventsAttended)} />
                <DetailRow label="Volunteer Hours" value={String(entry.volunteerHours)} />
                <DetailRow label="Trees Planted" value={String(entry.treesPlanted)} />
              </VStack>
            </ModalBody>
          </Box>

          <Button
            w="full"
            bg={entry.isAdmin ? 'gray.300' : '#385C40'}
            color="white"
            borderRadius="xl"
            boxShadow="lg"
            py={6}
            fontFamily="'Josefin Sans', sans-serif"
            _hover={entry.isAdmin ? { bg: 'gray.300' } : { bg: '#2d4a33' }}
            leftIcon={<Icon as={MdAdminPanelSettings} />}
            isDisabled={entry.isAdmin}
            cursor={entry.isAdmin ? 'not-allowed' : 'pointer'}
            onClick={() => onRequestPromote(entry)}
          >
            {entry.isAdmin ? 'Already Admin' : 'Make Admin'}
          </Button>
        </VStack>
      </ModalContent>
    </Modal>
  )
}
