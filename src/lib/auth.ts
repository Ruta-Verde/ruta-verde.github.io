import { supabase } from './supabaseClient'

export const signInWithGoogle = async (): Promise<void> => {
  await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'https://rutaverde.org/#/auth/callback'
    },
  })
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}