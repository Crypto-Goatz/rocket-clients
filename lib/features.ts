import { supabaseAdmin } from '@/lib/supabase'

export interface Feature {
  feature_key: string
  name: string
  description: string | null
  category: string | null
  price_cents: number
  stripe_product_id: string
  stripe_price_id: string
  is_bundle: boolean
  included_features: string[]
  trial_days: number
  sort_order: number
  highlight: boolean
  popular: boolean
}

export async function listFeatures(): Promise<Feature[]> {
  const { data, error } = await supabaseAdmin
    .from('rocket_clients_features')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })
  if (error) throw error
  return (data ?? []) as Feature[]
}

export async function getFeaturesByKeys(keys: string[]): Promise<Feature[]> {
  if (!keys.length) return []
  const { data, error } = await supabaseAdmin
    .from('rocket_clients_features')
    .select('*')
    .in('feature_key', keys)
    .eq('is_active', true)
  if (error) throw error
  return (data ?? []) as Feature[]
}

export async function getFeatureByKey(key: string): Promise<Feature | null> {
  const { data, error } = await supabaseAdmin
    .from('rocket_clients_features')
    .select('*')
    .eq('feature_key', key)
    .eq('is_active', true)
    .maybeSingle()
  if (error) throw error
  return (data as Feature) ?? null
}
