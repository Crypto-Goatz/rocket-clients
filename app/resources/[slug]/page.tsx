import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { TOOLS, getToolBySlug, getRelatedTools } from '@/lib/tools'
import { LeadCaptureForm } from '@/components/LeadCaptureForm'
import {
  ArrowRight,
  Check,
  Sparkles,
  ArrowLeft,
  Rocket,
  BookOpen,
} from 'lucide-react'

export async function generateStaticParams() {
  return TOOLS.map((tool) => ({ slug: tool.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const tool = getToolBySlug(slug)
  if (!tool) return { title: 'Not Found' }

  return {
    title: tool.metaTitle,
    description: tool.metaDescription,
    keywords: tool.metaKeywords,
    openGraph: {
      title: tool.metaTitle,
      description: tool.metaDescription,
      url: `https://rocketclients.com/resources/${tool.slug}`,
      siteName: 'RocketClients',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: tool.metaTitle,
      description: tool.metaDescription,
    },
    alternates: {
      canonical: `https://rocketclients.com/resources/${tool.slug}`,
    },
  }
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const tool = getToolBySlug(slug)
  if (!tool) notFound()

  const related = getRelatedTools(slug, 3)

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.title,
    description: tool.metaDescription,
    url: `https://rocketclients.com/resources/${tool.slug}`,
    applicationCategory: 'SEO Tool',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    publisher: {
      '@type': 'Organization',
      name: 'RocketClients',
      url: 'https://rocketclients.com',
    },
  }

  return (
    <div className="bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 pt-6">
        <nav className="flex items-center gap-2 text-sm text-zinc-500 animate-fade-in">
          <Link href="/" className="hover:text-zinc-300 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/resources" className="hover:text-zinc-300 transition-colors">Resources</Link>
          <span>/</span>
          <span className="text-zinc-300">{tool.title}</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden py-16 lg:py-24">
        <div className={`absolute inset-0 bg-gradient-to-r ${tool.gradient} opacity-[0.03]`} />
        <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: Info */}
            <div>
              <div className="flex items-center gap-3 mb-6 animate-fade-in">
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${tool.gradient} shadow-lg`}>
                  <tool.icon className="h-7 w-7 text-white" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">{tool.category}</span>
                  {tool.featured && (
                    <span className="ml-2 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400">
                      Featured
                    </span>
                  )}
                </div>
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl animate-fade-in-up">
                {tool.headline}
              </h1>

              <p className="mt-6 text-lg leading-relaxed text-zinc-400 animate-fade-in-up stagger-2">
                {tool.longDescription}
              </p>

              {/* Feature highlights */}
              <div className="mt-8 flex flex-wrap gap-3 animate-fade-in-up stagger-3">
                {tool.features.slice(0, 4).map((f) => (
                  <div key={f.title} className="flex items-center gap-2 text-sm">
                    <Check className={`h-4 w-4 ${tool.color} shrink-0`} />
                    <span className="text-zinc-300">{f.title}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 animate-fade-in-up stagger-4">
                <Link
                  href="/resources"
                  className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to all resources
                </Link>
              </div>
            </div>

            {/* Right: Lead Capture Form */}
            <div className="lg:sticky lg:top-24 animate-fade-in-up stagger-3">
              <LeadCaptureForm
                toolSlug={tool.slug}
                toolName={tool.title}
                heading={tool.featured ? 'Download Your Free Copy' : `Get Your Free ${tool.title} Report`}
                subheading={tool.featured
                  ? 'Enter your details and we\'ll send you the complete SXO Playbook instantly.'
                  : 'Enter your details below to access this tool and receive your personalized results.'}
                buttonText={tool.featured ? 'Download Playbook' : 'Run Free Analysis'}
              />
            </div>
          </div>
        </div>
      </section>

      {/* What We Analyze / Features Grid */}
      <section className="py-20 border-t border-zinc-800">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 animate-fade-in-up">
            <h2 className="text-3xl font-bold text-white">
              {tool.featured ? 'What\'s Inside the Playbook' : 'What We Analyze'}
            </h2>
            <p className="mt-3 text-lg text-zinc-400">
              {tool.featured
                ? 'Eight comprehensive chapters covering every aspect of SXO'
                : `${tool.features.length} critical dimensions analyzed in your report`}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {tool.features.map((feature, i) => (
              <div
                key={feature.title}
                className={`rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 hover:border-zinc-700 hover:shadow-lg transition-all duration-300 animate-fade-in-up stagger-${Math.min(i + 1, 8)}`}
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${tool.gradient} opacity-80 mb-4`}>
                  <span className="text-sm font-bold text-white">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="font-semibold text-white">{feature.title}</h3>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why This Matters / SXO Education */}
      <section className="py-20 bg-zinc-900/40 border-y border-zinc-800">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center animate-fade-in-up">
          <Sparkles className="h-8 w-8 text-orange-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white">
            Why {tool.featured ? 'SXO' : tool.title.replace(' Tool', '')} Matters in 2026
          </h2>
          <p className="mt-6 text-lg text-zinc-400 leading-relaxed max-w-3xl mx-auto">
            {tool.featured
              ? 'Search Experience Optimization is the convergence of SEO, UX, and CRO. Google\'s algorithms now prioritize pages that deliver exceptional user experiences alongside relevance. Businesses that master SXO see 3-5x higher conversion rates from organic traffic.'
              : `Understanding your ${tool.title.toLowerCase().replace(' tool', '')} performance is critical for improving your search visibility and user experience. Data-driven optimization beats guesswork every time, and our tool gives you the actionable insights you need to outperform competitors.`}
          </p>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { value: '3-5x', label: 'Higher Conversion Rate' },
              { value: '68%', label: 'More Organic Traffic' },
              { value: '40%', label: 'Lower Bounce Rate' },
            ].map((stat, i) => (
              <div key={stat.label} className={`rounded-xl border border-zinc-700 bg-zinc-800/50 p-6 animate-fade-in-up stagger-${i + 1}`}>
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="mt-1 text-sm text-zinc-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-orange-500 to-red-500 p-10 lg:p-14 text-center animate-fade-in-up">
            <Rocket className="h-10 w-10 text-white/80 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white">
              {tool.featured ? 'Ready to Dominate Search?' : 'Want to Automate This?'}
            </h2>
            <p className="mt-4 text-lg text-white/90 max-w-xl mx-auto">
              {tool.featured
                ? 'Implement every SXO strategy automatically with Rocket+CRM and AI-powered automation.'
                : 'Rocket+CRM automates your marketing, SEO, and lead generation. Get AI-powered insights without lifting a finger.'}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://app.rocketclients.com"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-orange-600 font-bold text-lg hover:bg-zinc-100 transition-colors"
              >
                Start Free Trial
                <ArrowRight className="h-5 w-5" />
              </a>
              {!tool.featured && (
                <Link
                  href="/resources/sxo-playbook-2026"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-white/30 text-white font-semibold hover:bg-white/10 transition-colors"
                >
                  <BookOpen className="h-5 w-5" />
                  Get SXO Playbook
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Related Tools */}
      <section className="py-16 border-t border-zinc-800">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-8 animate-fade-in">Related Resources</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((rel, i) => (
              <Link
                key={rel.slug}
                href={`/resources/${rel.slug}`}
                className={`group rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 hover:border-zinc-600 hover:-translate-y-1 transition-all duration-300 animate-fade-in-up stagger-${i + 1}`}
              >
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${rel.gradient} mb-4`}>
                  <rel.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white group-hover:text-orange-400 transition-colors">{rel.title}</h3>
                <p className="mt-2 text-sm text-zinc-400 line-clamp-2">{rel.description}</p>
                <div className="mt-4 flex items-center gap-2 text-sm font-medium text-orange-500 group-hover:text-orange-400">
                  Try Free <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
