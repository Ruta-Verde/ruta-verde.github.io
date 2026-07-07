import { useState, useCallback } from 'react'
import { Box, Button } from '@chakra-ui/react'
import { signInWithGoogle } from '../lib/auth.js'
import type { AuthError } from '@supabase/supabase-js'

interface SupabaseAuthResponse {
  error: AuthError | null
}

type AuthFn = () => Promise<SupabaseAuthResponse>

export interface AuthWidgetProps {
  onSuccess?: () => void
}

function GoogleIcon() {
  return (
    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" width={18} />
  )
}

export default function AuthWidget({ onSuccess }: AuthWidgetProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handle = useCallback(async (fn: AuthFn): Promise<void> => {
    setError(null)
    setLoading(true)
    try {
      const { error } = await fn()
      if (error) throw error
      onSuccess?.()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }, [onSuccess])

  return (
    <Box
      bg="white" borderRadius="2xl" border="1px solid" borderColor="gray.200" boxShadow="0 1px 4px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.04)"
      overflow="hidden" w="full" p={5}
    >
      <Button
        w="full"
        variant="outline"
        leftIcon={<GoogleIcon />}
        borderColor="gray.200"
        fontWeight={500}
        fontSize="sm"
        height="42px"
        _hover={{ bg: 'gray.100' }}
        isLoading={loading}
        loadingText="Redirecting…"
        onClick={() => handle(async () => {
          await signInWithGoogle()
          return { error: null }
        })}
      >
        Continue with Google
      </Button>
      
      {error && (
        <Box mt={3} fontSize="xs" color="red.500" textAlign="center">
          {error}
        </Box>
      )}
    </Box>
  )
}