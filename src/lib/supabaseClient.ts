import { createClient, SupabaseClient } from '@supabase/supabase-js'


const SUPABASE_URL = 'https://wtwvdfrngbsicwvythxs.supabase.co'
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_f51_JUTRBLUv4ss-ezHcgA_YS_tSsRL'

export const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  }
})