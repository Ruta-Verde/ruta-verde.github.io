import {
  VStack,
  HStack,
  Heading,
  Text,
  Spinner,
  Input,
  NumberInput,
  NumberInputField,
  Avatar,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react'
import { useState } from 'react'
import type { EventParticipant } from '../../hooks/useEventParticipants'
import {
  useEventParticipantMetrics,
  type ParticipantMetricField,
} from '../../hooks/useEventParticipantMetrics'

interface UpdateParticipantStatsSectionProps {
  eventId: string | undefined
  participants: EventParticipant[]
  participantsLoading: boolean
  isTreePlantingEvent: boolean
}

type CellStatus = 'idle' | 'saving' | 'saved' | 'error'

export default function UpdateParticipantStatsSection({
  eventId,
  participants,
  participantsLoading,
  isTreePlantingEvent,
}: UpdateParticipantStatsSectionProps) {
  const { metrics, loading: metricsLoading, upsertMetric, setEditing } = useEventParticipantMetrics(eventId)

  // Local buffer for whatever a cell shows while it's being typed into,
  // keyed by "participantId:field" -- separate from `metrics`, which holds
  // the last value saved to (or received live from) the server.
  const [drafts, setDrafts] = useState<Record<string, string>>({})
  const [cellStatus, setCellStatus] = useState<Record<string, CellStatus>>({})
  const [cellError, setCellError] = useState<Record<string, string>>({})

  const organizers = participants.filter(participant => participant.role === 'event-organizer')
  const volunteers = participants.filter(participant => participant.role !== 'event-organizer')

  // Builds the "participantId:field" key used to index drafts/status/error.
  function cellKey(participantId: string, field: ParticipantMetricField) {
    return `${participantId}:${field}`
  }

  // Resolves what a cell should currently display: an in-progress draft if
  // present, otherwise the last known saved value from `metrics`.
  function cellValue(participantId: string, field: ParticipantMetricField): string {
    const key = cellKey(participantId, field)
    if (key in drafts) return drafts[key]
    const metric = metrics[participantId]
    if (!metric) return ''
    const value = metric[field]
    return value === null || value === undefined ? '' : String(value)
  }

  // Updates the local draft as the user types, without saving yet.
  function handleChange(participantId: string, field: ParticipantMetricField, value: string) {
    setDrafts(prev => ({ ...prev, [cellKey(participantId, field)]: value }))
  }

  // Marks a cell as actively focused so realtime updates don't clobber it.
  function handleFocus(participantId: string, field: ParticipantMetricField) {
    setEditing(participantId, field)
  }

  // Commits a cell's draft value on blur: parses it, upserts it, and
  // reflects saving/saved/error status inline.
  async function handleBlur(participantId: string, field: ParticipantMetricField) {
    setEditing(participantId, null)

    const key = cellKey(participantId, field)
    if (!(key in drafts)) return

    const raw = drafts[key]
    let value: number | string | null

    if (field === 'notes') {
      value = raw.trim() || null
    } else {
      const parsed = field === 'treesPlanted' ? parseInt(raw, 10) : parseFloat(raw)
      value = Number.isNaN(parsed) ? null : parsed
    }

    setCellStatus(prev => ({ ...prev, [key]: 'saving' }))
    setCellError(prev => ({ ...prev, [key]: '' }))

    const errorMessage = await upsertMetric(participantId, field, value)

    setDrafts(prev => {
      const next = { ...prev }
      delete next[key]
      return next
    })

    if (errorMessage) {
      setCellStatus(prev => ({ ...prev, [key]: 'error' }))
      setCellError(prev => ({ ...prev, [key]: errorMessage }))
      return
    }

    setCellStatus(prev => ({ ...prev, [key]: 'saved' }))
  }

  // Shared styling that makes each cell's input blend into the surrounding
  // grid line rather than reading as a separate boxed form field.
  const cellFieldStyle = {
    borderRadius: 0,
    fontFamily: "'Josefin Sans', sans-serif",
    fontSize: 'sm',
    w: '100%',
    h: '100%',
    minH: '36px',
    px: 3,
    py: 2,
    _focus: {
      boxShadow: 'inset 0 0 0 2px #385C40',
      bg: 'green.50',
    },
  }

  const spreadsheetCellProps = {
    p: 0,
    borderWidth: '1px',
    borderColor: 'gray.200',
    verticalAlign: 'top' as const,
  }

  // Renders one participant's row: name plus editable hours/trees/notes cells.
  function renderParticipantRow(participant: EventParticipant) {
    const hoursKey = cellKey(participant.profileId, 'dailyVolunteerHours')
    const treesKey = cellKey(participant.profileId, 'treesPlanted')
    const notesKey = cellKey(participant.profileId, 'notes')

    return (
      <Tr key={participant.id}>
        <Td {...spreadsheetCellProps} px={3} py={2} bg="gray.50">
          <HStack spacing={3}>
            <Avatar size="sm" name={participant.username} bg="#385C40" color="white" />
            <Text fontFamily="'Josefin Sans', sans-serif" fontSize="sm" color="gray.700">
              {participant.username}
            </Text>
          </HStack>
        </Td>
        <Td {...spreadsheetCellProps}>
          <NumberInput
            variant="unstyled"
            value={cellValue(participant.profileId, 'dailyVolunteerHours')}
            onChange={value => handleChange(participant.profileId, 'dailyVolunteerHours', value)}
            onFocus={() => handleFocus(participant.profileId, 'dailyVolunteerHours')}
            min={0}
            step={0.5}
            precision={1}
            w="100%"
            h="100%"
          >
            <NumberInputField
              placeholder="Hours"
              onBlur={() => handleBlur(participant.profileId, 'dailyVolunteerHours')}
              {...cellFieldStyle}
            />
          </NumberInput>
          {cellStatus[hoursKey] === 'error' && (
            <Text color="red.600" fontSize="xs" px={3} pb={1}>{cellError[hoursKey]}</Text>
          )}
        </Td>
        {isTreePlantingEvent && (
          <Td {...spreadsheetCellProps}>
            <NumberInput
              variant="unstyled"
              value={cellValue(participant.profileId, 'treesPlanted')}
              onChange={value => handleChange(participant.profileId, 'treesPlanted', value)}
              onFocus={() => handleFocus(participant.profileId, 'treesPlanted')}
              min={0}
              step={1}
              precision={0}
              w="100%"
              h="100%"
            >
              <NumberInputField
                placeholder="Trees"
                onBlur={() => handleBlur(participant.profileId, 'treesPlanted')}
                {...cellFieldStyle}
              />
            </NumberInput>
            {cellStatus[treesKey] === 'error' && (
              <Text color="red.600" fontSize="xs" px={3} pb={1}>{cellError[treesKey]}</Text>
            )}
          </Td>
        )}
        <Td {...spreadsheetCellProps}>
          <Input
            variant="unstyled"
            value={cellValue(participant.profileId, 'notes')}
            onChange={e => handleChange(participant.profileId, 'notes', e.target.value)}
            onFocus={() => handleFocus(participant.profileId, 'notes')}
            onBlur={() => handleBlur(participant.profileId, 'notes')}
            placeholder="Notes"
            {...cellFieldStyle}
          />
          {cellStatus[notesKey] === 'error' && (
            <Text color="red.600" fontSize="xs" px={3} pb={1}>{cellError[notesKey]}</Text>
          )}
        </Td>
        <Td {...spreadsheetCellProps} px={3} py={2} bg="gray.50">
          {(cellStatus[hoursKey] === 'saving' ||
            cellStatus[treesKey] === 'saving' ||
            cellStatus[notesKey] === 'saving') && (
            <Text fontSize="xs" color="gray.400">Saving…</Text>
          )}
          {(cellStatus[hoursKey] === 'saved' ||
            cellStatus[treesKey] === 'saved' ||
            cellStatus[notesKey] === 'saved') && (
            <Text fontSize="xs" color="green.600">Saved</Text>
          )}
        </Td>
      </Tr>
    )
  }

  // Renders a titled table (Organizers or Volunteers) for a subset of participants.
  function renderParticipantTable(title: string, rows: EventParticipant[]) {
    return (
      <VStack align="stretch" spacing={2}>
        <Text fontFamily="'Josefin Sans', sans-serif" fontWeight="600" fontSize="sm" color="gray.700" textAlign="left">
          {title}
        </Text>
        {rows.length === 0 ? (
          <Text color="gray.500" fontSize="sm">No {title.toLowerCase()} registered for this event yet.</Text>
        ) : (
          <TableContainer
            borderWidth="1px"
            borderColor="gray.200"
            borderRadius="lg"
            overflowX="auto"
            overflowY="hidden"
            sx={{ WebkitOverflowScrolling: 'touch' }}
          >
            <Table size="sm" minWidth={isTreePlantingEvent ? '640px' : '520px'} sx={{ borderCollapse: 'collapse' }}>
              <Thead>
                <Tr>
                  <Th borderWidth="1px" borderColor="gray.200" bg="gray.50">Name</Th>
                  <Th borderWidth="1px" borderColor="gray.200" bg="gray.50">Hours</Th>
                  {isTreePlantingEvent && <Th borderWidth="1px" borderColor="gray.200" bg="gray.50">Trees</Th>}
                  <Th borderWidth="1px" borderColor="gray.200" bg="gray.50">Notes</Th>
                  <Th borderWidth="1px" borderColor="gray.200" bg="gray.50"></Th>
                </Tr>
              </Thead>
              <Tbody>{rows.map(participant => renderParticipantRow(participant))}</Tbody>
            </Table>
          </TableContainer>
        )}
      </VStack>
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

      {participantsLoading || metricsLoading ? (
        <HStack spacing={3} color="gray.500">
          <Spinner size="sm" />
          <Text fontFamily="'Josefin Sans', sans-serif" fontSize="sm">Loading volunteers…</Text>
        </HStack>
      ) : participants.length === 0 ? (
        <Text color="gray.500" fontSize="sm">No volunteers registered for this event yet.</Text>
      ) : (
        <VStack align="stretch" spacing={5}>
          {renderParticipantTable('Organizers', organizers)}
          {renderParticipantTable('Volunteers', volunteers)}
        </VStack>
      )}
    </VStack>
  )
}
