import { createClient, SupabaseClient } from '@supabase/supabase-js'


const supabaseUrl = 'https://wtwvdfrngbsicwvythxs.supabase.co'
const supabasePublishableKey = 'sb_publishable_f51_JUTRBLUv4ss-ezHcgA_YS_tSsRL'

export const supabase: SupabaseClient = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  }
})