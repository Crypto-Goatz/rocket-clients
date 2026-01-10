import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Rocket+CRM - All-in-One CRM Platform',
  description: 'The all-in-one CRM platform your business needs. Capture leads, nurture relationships, book appointments, and grow revenue with AI-powered automation.',
  keywords: ['CRM', 'marketing automation', 'lead generation', 'GoHighLevel', 'Rocket+'],
  openGraph: {
    title: 'Rocket+CRM - All-in-One CRM Platform',
    description: 'Replace your marketing stack with one powerful platform.',
    url: 'https://rocketclients.com',
    siteName: 'Rocket+CRM',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rocket+CRM - All-in-One CRM Platform',
    description: 'Replace your marketing stack with one powerful platform.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
