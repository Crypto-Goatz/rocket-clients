// ============================================================
// Supabase Client for RocketClients
// Shared Supabase instance: rtwtaisjtvdajrdyivkn (rocketadd.com)
// ============================================================

import { createClient } from '@supabase/supabase-js'

// ============================================================
// Types (matching existing table schema)
// ============================================================

export interface Client {
  id: string
  name: string
  slug: string
  email: string | null
  phone: string | null
  website: string | null
  address: string | null
  city: string | null
  state: string | null
  zip: string | null
  country: string
  timezone: string
  logo_url: string | null
  primary_color: string
  ghl_location_id: string | null
  ghl_location_pit: string | null
  ghl_company_id: string | null
  ghl_connected_at: string | null
  ghl_last_sync_at: string | null
  status: 'active' | 'paused' | 'archived' | 'pending'
  settings: Record<string, unknown>
  metadata: Record<string, unknown>
  contact_count: number
  opportunity_count: number
  monthly_revenue: number
  created_at: string
  updated_at: string
}

export interface ActivityLog {
  id: string
  client_id: string | null
  user_id: string | null
  user_email: string | null
  api_key_id: string | null
  action: string
  resource_type: string | null
  resource_id: string | null
  description: string | null
  metadata: Record<string, unknown>
  ip_address: string | null
  user_agent: string | null
  created_at: string
}

// ============================================================
// Supabase Admin Client (bypasses RLS)
// Lazy-initialized to avoid build-time errors
// ============================================================

import type { SupabaseClient } from '@supabase/supabase-js'

let _supabaseAdmin: SupabaseClient | null = null

function getSupabaseAdmin(): SupabaseClient {
  if (!_supabaseAdmin) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!url || !key) {
      throw new Error('NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required')
    }
    _supabaseAdmin = createClient(url, key)
  }
  return _supabaseAdmin
}

export const supabaseAdmin = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    const client = getSupabaseAdmin()
    const value = (client as unknown as Record<string | symbol, unknown>)[prop]
    if (typeof value === 'function') {
      return value.bind(client)
    }
    return value
  },
})

// ============================================================
// Activity Logging
// ============================================================

export async function logActivity(log: Omit<ActivityLog, 'id' | 'created_at'>) {
  const { error } = await supabaseAdmin
    .from('activity_logs')
    .insert(log as never)

  if (error) {
    console.error('Failed to log activity:', error)
  }
}
