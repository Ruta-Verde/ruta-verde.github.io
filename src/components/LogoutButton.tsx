import { useState } from 'react'
import { Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseclient'


export default function LogoutButton() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSignOut = async () => {
    setLoading(true)
    await supabase.auth.signOut()
    navigate('/')
  }

  return (
    <Button variant="ghost" size="sm" isLoading={loading} onClick={handleSignOut}>
      Sign out
    </Button>
  )
}