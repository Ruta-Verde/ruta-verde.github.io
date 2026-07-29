import { useState } from 'react'
import { Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'


export default function LogoutButton() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSignOut = async () => {
    setLoading(true)
    await supabase.auth.signOut()
    navigate('/')
  }

  return (
    <Button
      variant="link"
      size="xs"
      fontWeight="500"
      color="gray.500"
      whiteSpace="normal"
      textAlign="left"
      h="auto"
      isLoading={loading}
      onClick={handleSignOut}
    >
      Sign out
    </Button>
  )
}