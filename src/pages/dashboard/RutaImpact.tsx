import { Box, Heading, Text, VStack } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useImpactStats } from '../../hooks/useImpactStats'
import { RoleSelector } from '../../components/dashboard/RoleSelector'
import { StatsGrid } from '../../components/dashboard/StatsGrid'
import { ImpactChartPlaceholder } from '../../components/dashboard/ImpactChartPlaceholder'
import type { UserRole } from '../../types/UserRole'

export default function MyRutaImpact() {
  const { user, availableRoles, activeRole } = useAuth()
  const [viewAs, setViewAs] = useState<UserRole>(activeRole)

  useEffect(() => {
    setViewAs(activeRole)
  }, [activeRole])

  const { stats, loading, error } = useImpactStats(viewAs, user?.id)

  return (
    <VStack align="stretch" spacing={8}>

      <Box>
        <Heading
          fontFamily="'Josefin Sans', sans-serif"
          fontSize={{ base: '2xl', md: '3xl' }}
          fontWeight="700"
          color="#385C40"
        >
          My Ruta Impact
        </Heading>
        <Text color="gray.500" mt={1} fontSize="sm">
          Your contribution to a greener planet.
        </Text>
      </Box>

      <RoleSelector
        availableRoles={availableRoles}
        viewAs={viewAs}
        onChange={setViewAs}
      />

      {error && (
        <Text color="red.500" fontSize="sm" fontFamily="'Josefin Sans', sans-serif">
          Failed to load stats. Please try again.
        </Text>
      )}

      <StatsGrid stats={stats} loading={loading} />

      <ImpactChartPlaceholder />

    </VStack>
  )
}