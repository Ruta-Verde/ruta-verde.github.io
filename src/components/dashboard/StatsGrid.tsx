import { Grid, GridItem, Skeleton } from '@chakra-ui/react'
import { StatCard } from './StatCard'
import { ImpactStat } from '../../types/ImpactStat'

interface StatsGridProps {
  stats: ImpactStat[]
  loading: boolean
}

export function StatsGrid({ stats, loading }: StatsGridProps) {
  return (
    <Grid
      templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(5, 1fr)' }}
      gap={4}
    >
      {loading
        ? Array.from({ length: 5 }).map((_, i) => (
            <GridItem key={i}>
              <Skeleton height="130px" borderRadius="xl" />
            </GridItem>
          ))
        : stats.map(stat => (
            <GridItem key={stat.label}>
              <StatCard stat={stat} />
            </GridItem>
          ))
      }
    </Grid>
  )
}