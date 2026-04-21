import type { Metadata } from 'next'
import Script from 'next/script'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { StarField } from '@/components/StarField'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://rocketclients.com'),
  title: 'RocketClients — The all-in-one AI CRM for growing agencies',
  description: 'Capture leads, nurture relationships, book appointments, and grow revenue with AI-powered automation. Everything your agency needs — one platform.',
  keywords: ['RocketClients', 'CRM', 'marketing automation', 'lead generation', 'agency CRM', 'AI CRM'],
  applicationName: 'RocketClients',
  icons: {
    icon: [
      { url: '/brand/icon.png', type: 'image/png' },
      { url: '/icon.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-icon.png' }],
  },
  openGraph: {
    title: 'RocketClients — The all-in-one AI CRM for growing agencies',
    description: 'Capture, nurture, and close — all on one platform. Built for agencies, powered by AI.',
    url: 'https://rocketclients.com',
    siteName: 'RocketClients',
    type: 'website',
    images: [{ url: '/brand/wordmark-dark.png', width: 1200, height: 630, alt: 'RocketClients' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RocketClients — The all-in-one AI CRM for growing agencies',
    description: 'Capture, nurture, and close — all on one platform.',
    images: ['/brand/wordmark-dark.png'],
  },
  alternates: { canonical: 'https://rocketclients.com' },
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
      <body className="antialiased bg-[#050507] text-white">
        <StarField />
        <div className="relative z-10 flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
