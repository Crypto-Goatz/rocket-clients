import { NextResponse } from 'next/server'
import { listFeatures } from '@/lib/features'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders })
}

export async function GET() {
  try {
    const rows = await listFeatures()
    const features = rows.filter(r => !r.is_bundle)
    const bundles = rows.filter(r => r.is_bundle)
    return NextResponse.json({ features, bundles }, { headers: corsHeaders })
  } catch (err) {
    console.error('GET /api/features failed:', err)
    return NextResponse.json({ error: 'Failed to load features' }, { status: 500, headers: corsHeaders })
  }
}
