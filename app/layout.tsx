import type { Metadata } from 'next'
import Script from 'next/script'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import './globals.css'

export const metadata: Metadata = {
  title: 'Rocket+CRM - All-in-One CRM Platform',
  description: 'The all-in-one CRM platform your business needs. Capture leads, nurture relationships, book appointments, and grow revenue with AI-powered automation.',
  keywords: ['CRM', 'marketing automation', 'lead generation', 'Rocket+', 'SXO'],
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
      <head>
        <Script id="clarity-script" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "uxfwwd7byi");`}
        </Script>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-WWE1ZBYL59" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-WWE1ZBYL59');`}
        </Script>
      </head>
      <body className="antialiased bg-[#0a0a0f] text-white">
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
