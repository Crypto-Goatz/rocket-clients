'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'

/**
 * THE CRO9 TRACKER, LOADED ON 180crm.com ONLY.
 *
 * Mike, 2026-09-18, gave the tag for 180crm.com:
 *   <script src="https://www.cro9.com/cro9-tracker.js"
 *           data-api-key="cro9_446948e4…" defer></script>
 *
 * WHY IT IS GATED BY HOSTNAME AND NOT JUST DROPPED IN THE LAYOUT.
 *
 * The `rocket-clients` Vercel project serves FOUR domains from this one
 * codebase — rocketclients.com, www.rocketclients.com, 180crm.com and
 * www.180crm.com (verified against the project's domain list, 2026-09-18). A
 * bare script tag in app/layout.tsx would therefore fire on rocketclients.com
 * too, and `data-api-key` is CRO9's PER-SITE key: every rocketclients.com
 * pageview would be recorded against the 180crm.com site record.
 *
 * That is not a tidiness problem, it is a data problem. CRO9's whole output is
 * per-site — scores, dead clicks, the daily brief, the before/after — and a
 * site whose event stream is half another brand's traffic produces confident
 * numbers about a site that does not exist. Mike asked for 180crm.com; this
 * loads on 180crm.com.
 *
 * The check runs on the client because the host is what the BROWSER resolved,
 * which is the only thing that matches where the pageview actually happened.
 * `next/script` with `afterInteractive` matches the `defer` in the tag Mike
 * supplied: analytics never blocks first paint.
 *
 * The key is a public, write-only, per-site key — it is meant to be in page
 * source, the way a GA measurement ID is. It grants no read access.
 */

/** Hosts this tag belongs to. Anything else gets nothing. */
const TRACKED_HOSTS = ['180crm.com', 'www.180crm.com']

const CRO9_SITE_KEY = 'cro9_446948e4ae62d651eb16c2f2f915c14fe1984ef9bfe288b4'

export default function Cro9Tracker() {
  const [tracked, setTracked] = useState(false)

  useEffect(() => {
    // Localhost and preview deploys are deliberately excluded: a preview URL
    // is not the customer's site, and its traffic is ours.
    setTracked(TRACKED_HOSTS.includes(window.location.hostname))
  }, [])

  if (!tracked) return null

  return (
    <Script
      id="cro9-tracker"
      src="https://www.cro9.com/cro9-tracker.js"
      data-api-key={CRO9_SITE_KEY}
      strategy="afterInteractive"
    />
  )
}
