import { useEffect, useState } from 'react'
import { Box, Text, VStack } from '@chakra-ui/react'
import LogoutButton from '../components/LogoutButton'
import { supabase } from '../lib/supabaseClient'

export default function Dashboard() {
  const [displayName, setDisplayName] = useState<string | null>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      const name =
        //Only one of these should be neccessary...
        // IMPORTANT! add DB trigger to create profile row entry
        // on auth.user row entry, then change this to query profiles table.
        user?.user_metadata?.display_name ||
        user?.email?.split('@')[0]
      setDisplayName(name)
    })
  }, [])

  return (
    <Box minH="50vh" w="100vw" display="flex" alignItems="center" justifyContent="center">
      <VStack spacing={10}>
        <Text fontFamily="'Josefin Sans', sans-serif" fontSize="4xl" fontWeight="600" color='#385C40'>
          Welcome back, {displayName ?? '…'}
        </Text>
        <LogoutButton />
      </VStack>
    </Box>
  )
}