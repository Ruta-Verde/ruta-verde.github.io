import { Box, Text } from '@chakra-ui/react'

export function ImpactChartPlaceholder() {
  return (
    <Box
      bg="gray.50"
      borderRadius="xl"
      borderWidth="1px"
      borderColor="gray.200"
      p={8}
      textAlign="center"
      color="gray.400"
    >
      <Text fontFamily="'Josefin Sans', sans-serif" fontSize="sm">
        📊 Charts & activity timeline coming soon
      </Text>
    </Box>
  )
}