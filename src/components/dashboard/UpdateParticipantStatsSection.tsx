import {
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Spinner,
  Input,
  NumberInput,
  NumberInputField,
  Avatar,
} from '@chakra-ui/react'
import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { useAuth } from '../../contexts/AuthContext'
import type { EventParticipant } from '../../hooks/useEventParticipants'

interface UpdateParticipantStatsSectionProps {
  eventId: string | undefined
  participants: EventParticipant[]
  participantsLoading: boolean
  isTreePlantingEvent: boolean
}

export default function UpdateParticipantStatsSection({
  eventId,
  participants,
  participantsLoading,
  isTreePlantingEvent,
}: UpdateParticipantStatsSectionProps) {
  const { user } = useAuth()

  const [participantHours, setParticipantHours] = useState<Record<string, string>>({})
  const [participantNotes, setParticipantNotes] = useState<Record<string, string>>({})
  const [participantTrees, setParticipantTrees] = useState<Record<string, string>>({})
  const [isSubmittingStats, setIsSubmittingStats] = useState(false)
  const [submitStatsError, setSubmitStatsError] = useState<string | null>(null)

  const hasStatsToSubmit = participants.some(participant => {
    const hours = parseFloat(participantHours[participant.id] ?? '')
    return !Number.isNaN(hours) && hours > 0
  })

  const organizers = participants.filter(participant => participant.role === 'event-organizer')
  const volunteers = participants.filter(participant => participant.role !== 'event-organizer')

  function handleHoursChange(participantId: string, value: string) {
    setParticipantHours(prev => ({ ...prev, [participantId]: value }))
  }

  function handleNotesChange(participantId: string, value: string) {
    setParticipantNotes(prev => ({ ...prev, [participantId]: value }))
  }

  function handleTreesChange(participantId: string, value: string) {
    setParticipantTrees(prev => ({ ...prev, [participantId]: value }))
  }

  async function handleSubmitParticipantStats() {
    if (!eventId) return

    const entries = participants
      .map(participant => ({ participant, hours: parseFloat(participantHours[participant.id] ?? '') }))
      .filter((entry): entry is { participant: typeof entry.participant; hours: number } =>
        !Number.isNaN(entry.hours) && entry.hours > 0,
      )

    if (entries.length === 0) return

    setIsSubmittingStats(true)
    setSubmitStatsError(null)

    const now = new Date().toISOString()

    const { error: insertError } = await supabase.from('event_participant_metrics').insert(
      entries.map(({ participant, hours }) => {
        const trees = isTreePlantingEvent ? parseInt(participantTrees[participant.id] ?? '', 10) : NaN
        const notes = participantNotes[participant.id]?.trim() || null

        return {
          event_id: eventId,
          event_participant_id: participant.profileId,
          daily_volunteer_hours: hours,
          trees_planted: Number.isNaN(trees) ? null : trees,
          notes,
          verified_by: user?.id ?? null,
          verified_at: now,
        }
      }),
    )

    if (insertError) {
      setSubmitStatsError(insertError.message)
      setIsSubmittingStats(false)
      return
    }

    setParticipantHours({})
    setParticipantNotes({})
    setParticipantTrees({})
    setIsSubmittingStats(false)
  }

  function renderParticipantRow(participant: EventParticipant, index: number) {
    return (
      <HStack
        key={participant.id}
        spacing={3}
        px={4}
        py={3}
        justify="space-between"
        borderTopWidth={index === 0 ? 0 : '1px'}
        borderColor="gray.200"
      >
        <HStack spacing={3}>
          <Avatar size="sm" name={participant.username} bg="#385C40" color="white" />
          <Text fontFamily="'Josefin Sans', sans-serif" fontSize="sm" color="gray.700">
            {participant.username}
          </Text>
        </HStack>
        <HStack spacing={2}>
          {isTreePlantingEvent && (
            <NumberInput
              value={participantTrees[participant.id] ?? ''}
              onChange={valueString => handleTreesChange(participant.id, valueString)}
              min={0}
              step={1}
              precision={0}
              size="sm"
              w="80px"
              focusBorderColor="#385C40"
            >
              <NumberInputField
                placeholder="Trees"
                borderRadius="lg"
                fontFamily="'Josefin Sans', sans-serif"
                fontSize="sm"
              />
            </NumberInput>
          )}
          <NumberInput
            value={participantHours[participant.id] ?? ''}
            onChange={valueString => handleHoursChange(participant.id, valueString)}
            min={0}
            step={0.5}
            precision={1}
            size="sm"
            w="90px"
            focusBorderColor="#385C40"
          >
            <NumberInputField
              placeholder="Hours"
              borderRadius="lg"
              fontFamily="'Josefin Sans', sans-serif"
              fontSize="sm"
            />
          </NumberInput>
          <Input
            value={participantNotes[participant.id] ?? ''}
            onChange={e => handleNotesChange(participant.id, e.target.value)}
            placeholder="Notes"
            size="sm"
            w="140px"
            borderRadius="lg"
            fontFamily="'Josefin Sans', sans-serif"
            fontSize="sm"
            focusBorderColor="#385C40"
          />
        </HStack>
      </HStack>
    )
  }

  return (
    <VStack align="stretch" spacing={3}>
      <Heading
        fontFamily="'Josefin Sans', sans-serif"
        fontSize="lg"
        fontWeight="600"
        color="gray.800"
      >
        Update Participant Stats
      </Heading>

      {participantsLoading ? (
        <HStack spacing={3} color="gray.500">
          <Spinner size="sm" />
          <Text fontFamily="'Josefin Sans', sans-serif" fontSize="sm">Loading volunteers…</Text>
        </HStack>
      ) : participants.length === 0 ? (
        <Text color="gray.500" fontSize="sm">No volunteers registered for this event yet.</Text>
      ) : (
        <VStack align="stretch" spacing={5}>
          <VStack align="stretch" spacing={2}>
            <Text fontFamily="'Josefin Sans', sans-serif" fontWeight="600" fontSize="sm" color="gray.700" textAlign="left">
              Organizers
            </Text>
            {organizers.length === 0 ? (
              <Text color="gray.500" fontSize="sm">No organizers assigned to this event yet.</Text>
            ) : (
              <VStack align="stretch" spacing={0} borderWidth="1px" borderColor="gray.200" borderRadius="lg" overflow="hidden">
                {organizers.map((participant, index) => renderParticipantRow(participant, index))}
              </VStack>
            )}
          </VStack>

          <VStack align="stretch" spacing={2}>
            <Text fontFamily="'Josefin Sans', sans-serif" fontWeight="600" fontSize="sm" color="gray.700" textAlign="left">
              Volunteers
            </Text>
            {volunteers.length === 0 ? (
              <Text color="gray.500" fontSize="sm">No volunteers registered for this event yet.</Text>
            ) : (
              <VStack align="stretch" spacing={0} borderWidth="1px" borderColor="gray.200" borderRadius="lg" overflow="hidden">
                {volunteers.map((participant, index) => renderParticipantRow(participant, index))}
              </VStack>
            )}
          </VStack>
        </VStack>
      )}

      {submitStatsError && (
        <Text color="red.600" fontSize="sm">Couldn't submit hours: {submitStatsError}</Text>
      )}

      <Button
        alignSelf="flex-end"
        bg="#385C40"
        color="white"
        borderRadius="lg"
        fontFamily="'Josefin Sans', sans-serif"
        _hover={{ bg: '#2d4a33' }}
        onClick={handleSubmitParticipantStats}
        isLoading={isSubmittingStats}
        loadingText="Submitting…"
        isDisabled={!hasStatsToSubmit}
      >
        Submit
      </Button>
    </VStack>
  )
}
