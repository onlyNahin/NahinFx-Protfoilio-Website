import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase credentials in .env file.")
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testConnection() {
  console.log("Testing connection to Supabase...")
  
  // Try to fetch something simple
  const { data, error } = await supabase.from('projects').select('*').limit(1)
  
  if (error) {
    if (error.code === '42P01') {
      console.log("✅ Success! Connected to Supabase. (The 'projects' table doesn't exist yet, which is expected).")
    } else {
      console.error("❌ Failed to connect or query:", error.message)
    }
  } else {
    console.log("✅ Success! Connected to Supabase and fetched data.")
  }
}

testConnection()
