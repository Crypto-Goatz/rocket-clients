// ============================================================
// GHL API Integration for RocketClients
// ============================================================
// Handles contact creation, custom values, and webhooks
// Uses Location PIT for direct sub-account operations
// ============================================================

const GHL_API_BASE = 'https://services.leadconnectorhq.com'
const GHL_API_VERSION = '2021-07-28'

// Get credentials from environment
const getCredentials = () => ({
  locationId: process.env.GHL_LOCATION_ID!,
  locationPit: process.env.GHL_LOCATION_PIT!,
  agencyPit: process.env.GHL_AGENCY_PIT!,
  agencyId: process.env.GHL_AGENCY_ID!,
})

// ============================================================
// Types
// ============================================================

export interface GHLContact {
  id?: string
  locationId?: string
  firstName?: string
  lastName?: string
  name?: string
  email?: string
  phone?: string
  address1?: string
  city?: string
  state?: string
  postalCode?: string
  website?: string
  tags?: string[]
  source?: string
  customFields?: Array<{ id: string; value: string }>
}

export interface GHLCustomValue {
  id: string
  name: string
  value: string
}

export interface GHLResponse<T> {
  success: boolean
  data?: T
  error?: string
}

// ============================================================
// API Helpers
// ============================================================

async function ghlRequest<T>(
  endpoint: string,
  options: {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
    body?: Record<string, unknown>
    useAgencyPit?: boolean
  } = {}
): Promise<GHLResponse<T>> {
  const { locationPit, agencyPit } = getCredentials()
  const { method = 'GET', body, useAgencyPit = false } = options

  const token = useAgencyPit ? agencyPit : locationPit

  try {
    const response = await fetch(`${GHL_API_BASE}${endpoint}`, {
      method,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Version': GHL_API_VERSION,
      },
      body: body ? JSON.stringify(body) : undefined,
    })

    const data = await response.json()

    if (!response.ok) {
      return {
        success: false,
        error: data.message || data.error || `HTTP ${response.status}`,
      }
    }

    return { success: true, data }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

// ============================================================
// Contact Operations
// ============================================================

export async function createContact(contact: GHLContact): Promise<GHLResponse<{ contact: GHLContact }>> {
  const { locationId } = getCredentials()

  return ghlRequest('/contacts/', {
    method: 'POST',
    body: {
      locationId,
      ...contact,
    },
  })
}

export async function updateContact(
  contactId: string,
  updates: Partial<GHLContact>
): Promise<GHLResponse<{ contact: GHLContact }>> {
  return ghlRequest(`/contacts/${contactId}`, {
    method: 'PUT',
    body: updates,
  })
}

export async function addTagsToContact(
  contactId: string,
  tags: string[]
): Promise<GHLResponse<{ tags: string[] }>> {
  return ghlRequest(`/contacts/${contactId}/tags`, {
    method: 'POST',
    body: { tags },
  })
}

export async function searchContacts(
  query: string
): Promise<GHLResponse<{ contacts: GHLContact[] }>> {
  const { locationId } = getCredentials()
  return ghlRequest(`/contacts/search?locationId=${locationId}&query=${encodeURIComponent(query)}`)
}

export async function getContactByEmail(
  email: string
): Promise<GHLResponse<{ contacts: GHLContact[] }>> {
  const { locationId } = getCredentials()
  return ghlRequest(`/contacts/?locationId=${locationId}&email=${encodeURIComponent(email)}`)
}

// ============================================================
// Workflow Operations
// ============================================================

export async function addContactToWorkflow(
  contactId: string,
  workflowId: string
): Promise<GHLResponse<{ success: boolean }>> {
  return ghlRequest(`/contacts/${contactId}/workflow/${workflowId}`, {
    method: 'POST',
    body: {},
  })
}

export async function listWorkflows(): Promise<GHLResponse<{ workflows: Array<{ id: string; name: string }> }>> {
  const { locationId } = getCredentials()
  return ghlRequest(`/workflows/?locationId=${locationId}`)
}

// ============================================================
// Custom Values Operations
// ============================================================

export async function getCustomValues(): Promise<GHLResponse<{ customValues: GHLCustomValue[] }>> {
  const { locationId } = getCredentials()
  return ghlRequest(`/locations/${locationId}/customValues`)
}

export async function updateCustomValue(
  customValueId: string,
  value: string
): Promise<GHLResponse<{ customValue: GHLCustomValue }>> {
  const { locationId } = getCredentials()
  return ghlRequest(`/locations/${locationId}/customValues/${customValueId}`, {
    method: 'PUT',
    body: { value },
  })
}

// ============================================================
// Location Tags
// ============================================================

export async function getLocationTags(): Promise<GHLResponse<{ tags: Array<{ id: string; name: string }> }>> {
  const { locationId } = getCredentials()
  return ghlRequest(`/locations/${locationId}/tags`)
}

export async function createLocationTag(
  name: string
): Promise<GHLResponse<{ tag: { id: string; name: string } }>> {
  const { locationId } = getCredentials()
  return ghlRequest(`/locations/${locationId}/tags`, {
    method: 'POST',
    body: { name },
  })
}

// ============================================================
// Opportunity Operations
// ============================================================

export async function createOpportunity(opportunity: {
  contactId: string
  pipelineId: string
  pipelineStageId: string
  name: string
  monetaryValue?: number
  status?: 'open' | 'won' | 'lost' | 'abandoned'
}): Promise<GHLResponse<{ opportunity: Record<string, unknown> }>> {
  const { locationId } = getCredentials()
  return ghlRequest('/opportunities/', {
    method: 'POST',
    body: {
      locationId,
      ...opportunity,
    },
  })
}

// ============================================================
// Calendar Operations
// ============================================================

export async function getCalendars(): Promise<GHLResponse<{ calendars: Array<{ id: string; name: string }> }>> {
  const { locationId } = getCredentials()
  return ghlRequest(`/calendars/?locationId=${locationId}`)
}

export async function createAppointment(appointment: {
  calendarId: string
  contactId: string
  startTime: string
  endTime: string
  title?: string
  notes?: string
}): Promise<GHLResponse<{ event: Record<string, unknown> }>> {
  const { locationId } = getCredentials()
  return ghlRequest('/calendars/events', {
    method: 'POST',
    body: {
      locationId,
      ...appointment,
    },
  })
}

// ============================================================
// Messaging Operations
// ============================================================

export async function sendSMS(
  contactId: string,
  message: string
): Promise<GHLResponse<{ messageId: string }>> {
  return ghlRequest('/conversations/messages', {
    method: 'POST',
    body: {
      type: 'SMS',
      contactId,
      message,
    },
  })
}

export async function sendEmail(
  contactId: string,
  subject: string,
  body: string,
  html?: string
): Promise<GHLResponse<{ messageId: string }>> {
  return ghlRequest('/conversations/messages', {
    method: 'POST',
    body: {
      type: 'Email',
      contactId,
      subject,
      body,
      html,
    },
  })
}

// ============================================================
// Snapshot Operations (Agency Level)
// ============================================================

export async function listSnapshots(): Promise<GHLResponse<{ snapshots: Array<{ id: string; name: string }> }>> {
  const { agencyId } = getCredentials()
  return ghlRequest(`/snapshots/?companyId=${agencyId}`, { useAgencyPit: true })
}

export async function getSnapshotShareLink(
  snapshotId: string
): Promise<GHLResponse<{ shareLink: string }>> {
  const { agencyId } = getCredentials()
  return ghlRequest(`/snapshots/share-link?companyId=${agencyId}&snapshotId=${snapshotId}`, {
    useAgencyPit: true,
  })
}

// ============================================================
// Lead Capture - Main Function
// ============================================================

export interface LeadCaptureData {
  firstName?: string
  lastName?: string
  email: string
  phone?: string
  source?: string
  tags?: string[]
  workflowId?: string
  customFields?: Record<string, string>
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
}

export async function captureLeadToGHL(lead: LeadCaptureData): Promise<GHLResponse<{ contact: GHLContact }>> {
  // Build tags array
  const tags = [
    ...(lead.tags || []),
    'rocket-form',
    lead.source ? `source:${lead.source}` : 'source:website',
    ...(lead.utmSource ? [`utm_source:${lead.utmSource}`] : []),
    ...(lead.utmMedium ? [`utm_medium:${lead.utmMedium}`] : []),
    ...(lead.utmCampaign ? [`utm_campaign:${lead.utmCampaign}`] : []),
  ].filter(Boolean)

  // Create the contact
  const result = await createContact({
    firstName: lead.firstName,
    lastName: lead.lastName,
    email: lead.email,
    phone: lead.phone,
    source: lead.source || 'Rocket Form',
    tags,
  })

  if (!result.success || !result.data?.contact?.id) {
    return result
  }

  const contactId = result.data.contact.id

  // Add to workflow if specified
  if (lead.workflowId) {
    await addContactToWorkflow(contactId, lead.workflowId)
  }

  return result
}
