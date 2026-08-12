import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Icon,
  Spinner,
  Input,
  InputGroup,
  InputLeftElement,
  Avatar,
  Wrap,
  WrapItem,
  Tag,
  TagLabel,
  TagCloseButton,
  Select,
  useOutsideClick,
} from '@chakra-ui/react'
import { useMemo, useRef, useState } from 'react'
import { MdSearch } from 'react-icons/md'
import { supabase } from '../../lib/supabaseClient'
import type { EventParticipant } from '../../hooks/useEventParticipants'
import { useProfileSearch, type ProfileSearchResult } from '../../hooks/useProfileSearch'

type StagedRole = 'volunteer' | 'event-organizer'

interface AddParticipantsSectionProps {
  eventId: string | undefined
  participants: EventParticipant[]
  onParticipantsAdded: () => void
}

export default function AddParticipantsSection({ eventId, participants, onParticipantsAdded }: AddParticipantsSectionProps) {
  const [participantSearch, setParticipantSearch] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [stagedParticipants, setStagedParticipants] = useState<ProfileSearchResult[]>([])
  const [stagedRoles, setStagedRoles] = useState<Record<string, StagedRole>>({})
  const [isAddingParticipants, setIsAddingParticipants] = useState(false)
  const [addParticipantsError, setAddParticipantsError] = useState<string | null>(null)

  const searchContainerRef = useRef<HTMLDivElement>(null)
  useOutsideClick({ ref: searchContainerRef, handler: () => setIsSearchFocused(false) })

  const excludeProfileIds = useMemo(
    () => [...participants.map(p => p.profileId), ...stagedParticipants.map(p => p.profileId)],
    [participants, stagedParticipants],
  )
  const { results: searchResults, loading: searchLoading } = useProfileSearch(participantSearch, excludeProfileIds)
  const isSuggestionsOpen = isSearchFocused && participantSearch.trim().length > 0

  function handleSelectParticipant(profile: ProfileSearchResult) {
    setStagedParticipants(prev => [...prev, profile])
    setParticipantSearch('')
  }

  function handleUnstageParticipant(profileId: string) {
    setStagedParticipants(prev => prev.filter(p => p.profileId !== profileId))
    setStagedRoles(prev => {
      const next = { ...prev }
      delete next[profileId]
      return next
    })
  }

  function handleRoleChange(profileId: string, role: StagedRole) {
    setStagedRoles(prev => ({ ...prev, [profileId]: role }))
  }

  async function handleAddParticipants() {
    if (!eventId || stagedParticipants.length === 0) return

    setIsAddingParticipants(true)
    setAddParticipantsError(null)

    const { error: insertError } = await supabase.from('event_participants').insert(
      stagedParticipants.map(profile => ({
        event_id: eventId,
        profile_id: profile.profileId,
        event_role: stagedRoles[profile.profileId] ?? 'volunteer',
      })),
    )

    if (insertError) {
      setAddParticipantsError(insertError.message)
      setIsAddingParticipants(false)
      return
    }

    setStagedParticipants([])
    setStagedRoles({})
    setIsAddingParticipants(false)
    onParticipantsAdded()
  }

  return (
    <VStack align="stretch" spacing={3}>
      <Heading
        fontFamily="'Josefin Sans', sans-serif"
        fontSize="lg"
        fontWeight="600"
        color="gray.800"
      >
        Add Participants
      </Heading>
      <Box position="relative" ref={searchContainerRef}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Icon as={MdSearch} color="gray.400" />
          </InputLeftElement>
          <Input
            placeholder="Search volunteers to add…"
            value={participantSearch}
            onChange={e => setParticipantSearch(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            focusBorderColor="#385C40"
            borderRadius="lg"
            fontFamily="'Josefin Sans', sans-serif"
            fontSize="sm"
          />
        </InputGroup>

        {isSuggestionsOpen && (
          <Box
            position="absolute"
            top="100%"
            left={0}
            right={0}
            mt={1}
            bg="white"
            borderWidth="1px"
            borderColor="gray.200"
            borderRadius="lg"
            boxShadow="md"
            zIndex={10}
            maxH="220px"
            overflowY="auto"
          >
            {searchLoading ? (
              <HStack spacing={3} px={4} py={3} color="gray.500">
                <Spinner size="sm" />
                <Text fontFamily="'Josefin Sans', sans-serif" fontSize="sm">Searching…</Text>
              </HStack>
            ) : searchResults.length === 0 ? (
              <Text px={4} py={3} fontSize="sm" color="gray.500">No matching volunteers.</Text>
            ) : (
              searchResults.map(profile => (
                <HStack
                  key={profile.profileId}
                  spacing={3}
                  px={4}
                  py={2}
                  cursor="pointer"
                  _hover={{ bg: 'green.50' }}
                  onClick={() => handleSelectParticipant(profile)}
                >
                  <Avatar size="xs" name={profile.username} bg="#385C40" color="white" />
                  <Text fontFamily="'Josefin Sans', sans-serif" fontSize="sm" color="gray.700">
                    {profile.username}
                  </Text>
                </HStack>
              ))
            )}
          </Box>
        )}
      </Box>

      {stagedParticipants.length > 0 && (
        <Wrap>
          {stagedParticipants.map(profile => (
            <WrapItem key={profile.profileId}>
              <Tag
                borderRadius="full"
                bg="green.50"
                color="#385C40"
                fontFamily="'Josefin Sans', sans-serif"
                pr={1}
              >
                <TagLabel>{profile.username}</TagLabel>
                <Select
                  value={stagedRoles[profile.profileId] ?? 'volunteer'}
                  onChange={e => handleRoleChange(profile.profileId, e.target.value as StagedRole)}
                  size="xs"
                  variant="unstyled"
                  w="auto"
                  ml={2}
                  mr={1}
                  fontFamily="'Josefin Sans', sans-serif"
                  color="#385C40"
                >
                  <option value="volunteer">Volunteer</option>
                  <option value="event-organizer">Organizer</option>
                </Select>
                <TagCloseButton onClick={() => handleUnstageParticipant(profile.profileId)} />
              </Tag>
            </WrapItem>
          ))}
        </Wrap>
      )}

      {addParticipantsError && (
        <Text color="red.600" fontSize="sm">Couldn't add participants: {addParticipantsError}</Text>
      )}

      <Button
        alignSelf="flex-end"
        bg="#385C40"
        color="white"
        borderRadius="lg"
        fontFamily="'Josefin Sans', sans-serif"
        _hover={{ bg: '#2d4a33' }}
        onClick={handleAddParticipants}
        isLoading={isAddingParticipants}
        loadingText="Adding…"
        isDisabled={stagedParticipants.length === 0}
      >
        Add Participants
      </Button>
    </VStack>
  )
}
