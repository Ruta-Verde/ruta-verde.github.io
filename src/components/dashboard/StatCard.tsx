import { Box, Flex, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Icon } from '@chakra-ui/react'
import { ImpactStat } from '../../types/ImpactStat'

export function StatCard({ stat }: { stat: ImpactStat }) {
  return (
    <Box
      bg="white"
      borderRadius="xl"
      borderWidth="1px"
      borderColor="gray.200"
      p={5}
      h="100%"
      boxShadow="sm"
      transition="box-shadow 0.2s"
      _hover={{ boxShadow: 'md' }}
    >
      <Flex justify="space-between" align="flex-start">
        <Stat>
          <StatLabel
            fontFamily="'Josefin Sans', sans-serif"
            fontSize="xs"
            textTransform="uppercase"
            letterSpacing="wide"
            color="gray.500"
          >
            {stat.label}
          </StatLabel>
          <StatNumber
            fontFamily="'Josefin Sans', sans-serif"
            fontSize="3xl"
            fontWeight="700"
            color="#385C40"
          >
            {stat.value}
          </StatNumber>
          {stat.helpText && (
            <StatHelpText mb={0}>
              {stat.trend && <StatArrow type={stat.trend} />}
              {stat.helpText}
            </StatHelpText>
          )}
        </Stat>
        <Box p={2.5} bg="green.50" borderRadius="lg" color="#385C40">
          <Icon as={stat.icon} boxSize={5} />
        </Box>
      </Flex>
    </Box>
  )
}