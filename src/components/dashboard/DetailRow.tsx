import { HStack, Text } from '@chakra-ui/react'

interface DetailRowProps {
  label: string
  value: string
}

export default function DetailRow({ label, value }: DetailRowProps) {
  return (
    <HStack align="flex-start" spacing={2} fontSize="sm">
      <Text fontWeight="600" color="gray.600" minW="90px">
        {label}
      </Text>
      <Text color="gray.700">{value}</Text>
    </HStack>
  )
}
