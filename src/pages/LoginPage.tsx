import { Box, Heading, Text, VStack, SlideFade } from '@chakra-ui/react'
import AuthWidget from '../components/AuthWidget'

export default function LoginPage() {
  return (
    <Box minH="100vh" w="100vw" bg="gray.50" display="flex" alignItems="center" justifyContent="center" p={4}>
      <Box w="400px" maxW="100%" mx="auto">
        <SlideFade in offsetY="10px">
          <VStack spacing={1} mb={7} textAlign="center">
            <Heading fontSize="2xl" fontWeight={700} letterSpacing="-0.4px">
              Welcome to Ruta Verde
            </Heading>
            <Text fontSize="sm" color="gray.500">
              Continue with Google to sign in
            </Text>
          </VStack>
        </SlideFade>

        <SlideFade in offsetY="16px">
          <AuthWidget onSuccess={() => console.log('auth success')} />
        </SlideFade>
      </Box>
    </Box>
  )
}