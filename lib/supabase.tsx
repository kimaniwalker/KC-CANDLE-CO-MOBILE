import { createClient } from '@supabase/supabase-js'
import AsyncStorage from '@react-native-async-storage/async-storage'
import 'react-native-url-polyfill/auto'


const supabaseUrl = 'https://jbitdwjpbcsbsruauglb.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpiaXRkd2pwYmNzYnNydWF1Z2xiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njc5ODM1MDYsImV4cCI6MTk4MzU1OTUwNn0.1Qc43NWW7U5xxooziRxVCRsqN0Ad8IxzJhnO6orZd2U'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: AsyncStorage as any,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
})