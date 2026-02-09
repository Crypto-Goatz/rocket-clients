import Link from 'next/link'
import type { Metadata } from 'next'
import { TOOLS } from '@/lib/tools'
import {
  ArrowRight,
  Sparkles,
  BookOpen,
  Rocket,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Free SEO & SXO Tools | Resources | RocketClients',
  description: 'Free SEO tools, SXO resources, and marketing guides to grow your business. Content audit, keyword research, schema generator, and the SXO Playbook for 2026.',
  keywords: ['SEO tools', 'SXO resources', 'free marketing tools', 'content audit', 'keyword research'],
}

export default function ResourcesPage() {
  const featured = TOOLS.find((t) => t.featured)
  const tools = TOOLS.filter((t) => !t.featured)

  return (
    <div className="bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-red-500/5" />
        <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 mb-6 animate-fade-in">
            <Sparkles className="h-4 w-4 text-orange-500" />
            <span className="text-sm font-medium text-orange-500">100% Free Tools & Resources</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl animate-fade-in-up">
            Grow Smarter with
            <br />
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Free SXO Tools
            </span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-zinc-400 max-w-2xl mx-auto animate-fade-in-up stagger-2">
            Professional-grade SEO analysis tools, SXO resources, and marketing guides.
            No credit card required — just actionable insights to grow your business.
          </p>
        </div>
      </section>

      {/* Featured: SXO Playbook */}
      {featured && (
        <section className="pb-16">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
            <Link
              href={`/resources/${featured.slug}`}
              className="group block rounded-3xl border border-orange-500/30 bg-gradient-to-br from-orange-500/10 via-red-500/5 to-zinc-900 p-8 lg:p-12 hover:border-orange-500/50 transition-all duration-300 animate-fade-in-up"
            >
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-orange-500 to-red-500 shadow-2xl shadow-orange-500/30 shrink-0 animate-float">
                  <BookOpen className="h-12 w-12 text-white" />
                </div>
                <div className="flex-1 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 rounded-full bg-orange-500/20 border border-orange-500/30 px-4 py-1 mb-3">
                    <Sparkles className="h-3 w-3 text-orange-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-orange-400">Featured Resource</span>
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-white group-hover:text-orange-400 transition-colors">
                    {featured.title}
                  </h2>
                  <p className="mt-3 text-lg text-zinc-400 max-w-2xl">
                    {featured.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3 justify-center lg:justify-start">
                    {featured.features.slice(0, 4).map((f) => (
                      <span key={f.title} className="text-xs font-medium text-zinc-300 bg-zinc-800/80 border border-zinc-700/50 px-3 py-1.5 rounded-full">
                        {f.title}
                      </span>
                    ))}
                    <span className="text-xs font-medium text-orange-400 bg-orange-500/10 border border-orange-500/20 px-3 py-1.5 rounded-full">
                      +{featured.features.length - 4} more
                    </span>
                  </div>
                </div>
                <div className="shrink-0">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-zinc-800 border border-zinc-700 group-hover:bg-orange-500 group-hover:border-orange-500 transition-all">
                    <ArrowRight className="h-6 w-6 text-zinc-400 group-hover:text-white transition-colors" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Tools Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl font-bold text-white">Free Tools & Analyzers</h2>
              <p className="mt-1 text-zinc-400">{tools.length} tools to optimize your digital presence</p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool, i) => (
              <Link
                key={tool.slug}
                href={`/resources/${tool.slug}`}
                className={`group relative rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 hover:border-zinc-600 hover:shadow-lg hover:shadow-orange-500/5 hover:-translate-y-1 transition-all duration-300 animate-fade-in-up stagger-${Math.min(i + 1, 9)}`}
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${tool.gradient} mb-5 group-hover:shadow-lg transition-shadow`}>
                  <tool.icon className="h-6 w-6 text-white" />
                </div>

                <div className="mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">{tool.category}</span>
                </div>

                <h3 className="text-lg font-semibold text-white group-hover:text-orange-400 transition-colors">
                  {tool.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed line-clamp-2">
                  {tool.description}
                </p>

                <div className="mt-5 flex items-center gap-2 text-sm font-medium text-orange-500 group-hover:text-orange-400 transition-colors">
                  Try Free
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SXO Playbook Reminder */}
      <section className="py-16 border-t border-zinc-800">
        <div className="mx-auto max-w-4xl px-4 text-center animate-fade-in-up">
          <div className="rounded-3xl bg-gradient-to-r from-orange-500 to-red-500 p-10 lg:p-14">
            <Rocket className="h-10 w-10 text-white/80 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white">Ready to Master Search in 2026?</h2>
            <p className="mt-4 text-lg text-white/90 max-w-xl mx-auto">
              Download the complete SXO Playbook — the only guide you need to dominate search experience optimization.
            </p>
            <Link
              href="/resources/sxo-playbook-2026"
              className="inline-flex items-center gap-2 mt-8 px-8 py-4 rounded-xl bg-white text-orange-600 font-bold text-lg hover:bg-zinc-100 transition-colors"
            >
              Get the Free Playbook
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
