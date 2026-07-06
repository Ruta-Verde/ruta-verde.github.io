import { Box, Text, Select, HStack, Badge } from '@chakra-ui/react'
import type { UserRole } from '../../types/UserRole'

const roleLabelMap: Record<UserRole, string> = {
  admin:             'Admin',
  'event-organizer': 'Event Organizer',
  volunteer:         'Volunteer',
}

interface RoleSelectorProps {
  availableRoles: UserRole[]
  viewAs: UserRole
  onChange: (role: UserRole) => void
}

export function RoleSelector({ availableRoles, viewAs, onChange }: RoleSelectorProps) {
  if (availableRoles.length <= 1) return null

  return (
    <Box maxW="280px">
      <Text
        fontSize="xs"
        fontWeight="600"
        textTransform="uppercase"
        letterSpacing="wide"
        color="gray.500"
        mb={2}
        fontFamily="'Josefin Sans', sans-serif"
      >
        View stats as
      </Text>
      <HStack spacing={2}>
        <Select
          value={viewAs}
          onChange={e => onChange(e.target.value as UserRole)}
          size="sm"
          borderRadius="lg"
          focusBorderColor="#385C40"
          fontFamily="'Josefin Sans', sans-serif"
        >
          {availableRoles.map(role => (
            <option key={role} value={role}>
              {roleLabelMap[role]}
            </option>
          ))}
        </Select>
        <Badge
          colorScheme="green"
          borderRadius="md"
          px={2}
          py={1}
          fontSize="xs"
          fontFamily="'Josefin Sans', sans-serif"
          whiteSpace="nowrap"
        >
          {roleLabelMap[viewAs]}
        </Badge>
      </HStack>
    </Box>
  )
}