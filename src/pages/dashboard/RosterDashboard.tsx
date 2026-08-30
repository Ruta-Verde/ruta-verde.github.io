/**
 * RosterDashboard.tsx
 *
 * Admin-only Roster tab. Lists every profile, sectioned into Admins and
 * Volunteers, backed by the get_roster() RPC via useRoster(). Clicking a
 * row opens a stats modal with a guarded "Make Admin" action.
 */

import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Avatar,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Spinner,
  Divider,
  Flex,
  Button,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { useRoster, type RosterEntry } from '../../hooks/useRoster'
import RosterProfileModal from '../../components/dashboard/RosterProfileModal'

export default function RosterDashboard() {
  const toast = useToast()
  const { admins, volunteers, loading, error, refetch, promoteToAdmin } = useRoster()

  const [selectedEntry, setSelectedEntry] = useState<RosterEntry | null>(null)
  const [entryPendingPromote, setEntryPendingPromote] = useState<RosterEntry | null>(null)
  const [promoting, setPromoting] = useState(false)
  const { isOpen: isDetailOpen, onOpen: onDetailOpen, onClose: onDetailClose } = useDisclosure()
  const { isOpen: isPromoteOpen, onOpen: onPromoteOpen, onClose: onPromoteClose } = useDisclosure()
  const cancelPromoteRef = useRef<HTMLButtonElement>(null)

  function handleSelectEntry(entry: RosterEntry) {
    setSelectedEntry(entry)
    onDetailOpen()
  }

  function requestPromote(entry: RosterEntry) {
    setEntryPendingPromote(entry)
    onDetailClose()
    onPromoteOpen()
  }

  async function handleConfirmPromote() {
    if (!entryPendingPromote) return
    setPromoting(true)
    const errorMessage = await promoteToAdmin(entryPendingPromote.profileId)
    setPromoting(false)

    if (errorMessage) {
      toast({ title: 'Failed to grant admin access', description: errorMessage, status: 'error', duration: 3000 })
      return
    }

    toast({ title: `${entryPendingPromote.username} is now an admin`, status: 'success', duration: 3000, isClosable: true })
    onPromoteClose()
    setEntryPendingPromote(null)
    refetch()
  }

  function renderRosterTable(title: string, rows: RosterEntry[]) {
    return (
      <VStack align="stretch" spacing={3} minW={0}>
        <HStack spacing={2}>
          <Heading fontFamily="'Josefin Sans', sans-serif" fontSize="lg" fontWeight="600" color="gray.700">
            {title}
          </Heading>
          <Text fontSize="sm" color="gray.500">({rows.length})</Text>
        </HStack>

        {rows.length === 0 ? (
          <Box bg="gray.50" borderRadius="xl" borderWidth="1px" borderColor="gray.200" p={6} textAlign="center">
            <Text color="gray.500" fontSize="sm">No {title.toLowerCase()} yet.</Text>
          </Box>
        ) : (
          <TableContainer w="100%" borderWidth="1px" borderColor="gray.200" borderRadius="lg" overflowX="auto">
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th borderColor="gray.200" bg="gray.50">Username</Th>
                </Tr>
              </Thead>
              <Tbody>
                {rows.map(entry => (
                  <Tr
                    key={entry.profileId}
                    cursor="pointer"
                    _hover={{ bg: 'green.50' }}
                    onClick={() => handleSelectEntry(entry)}
                  >
                    <Td borderColor="gray.200" px={3} py={2}>
                      <HStack spacing={3}>
                        <Avatar size="sm" name={entry.username} bg="#385C40" color="white" />
                        <Text fontFamily="'Josefin Sans', sans-serif" fontSize="sm" color="gray.700">
                          {entry.username}
                        </Text>
                      </HStack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </VStack>
    )
  }

  return (
    <VStack align="stretch" spacing={8}>
      <Box>
        <Heading fontFamily="'Josefin Sans', sans-serif" fontSize={{ base: '2xl', md: '3xl' }} fontWeight="700" color="#385C40">
          Roster
        </Heading>
        <Text color="gray.500" mt={1} fontSize="sm">
          {loading ? '—' : `${admins.length + volunteers.length} total profiles`}
        </Text>
      </Box>

      {error && (
        <Flex bg="red.50" borderWidth="1px" borderColor="red.200" borderRadius="lg" p={4} justify="space-between" align="center">
          <Text color="red.600" fontSize="sm">Couldn't load roster: {error}</Text>
          <Button size="xs" variant="outline" colorScheme="red" onClick={refetch}>Retry</Button>
        </Flex>
      )}

      {loading ? (
        <HStack spacing={3} color="gray.500">
          <Spinner size="sm" />
          <Text fontFamily="'Josefin Sans', sans-serif" fontSize="sm">Loading roster…</Text>
        </HStack>
      ) : (
        <>
          {renderRosterTable('Admins', admins)}
          <Divider />
          {renderRosterTable('Volunteers', volunteers)}
        </>
      )}

      <RosterProfileModal
        entry={selectedEntry}
        isOpen={isDetailOpen}
        onClose={onDetailClose}
        onRequestPromote={requestPromote}
      />

      <AlertDialog isOpen={isPromoteOpen} leastDestructiveRef={cancelPromoteRef} onClose={onPromoteClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontFamily="'Josefin Sans', sans-serif">Grant Admin Access</AlertDialogHeader>
            <AlertDialogBody>
              Grant admin access to "{entryPendingPromote?.username}"? Admins cannot be demoted from this dashboard —
              this cannot be undone.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelPromoteRef} onClick={onPromoteClose} borderRadius="lg" fontFamily="'Josefin Sans', sans-serif">
                Cancel
              </Button>
              <Button
                bg="#385C40"
                color="white"
                _hover={{ bg: '#2d4a33' }}
                borderRadius="lg"
                fontFamily="'Josefin Sans', sans-serif"
                onClick={handleConfirmPromote}
                isLoading={promoting}
                loadingText="Granting…"
                ml={3}
              >
                Make Admin
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </VStack>
  )
}
