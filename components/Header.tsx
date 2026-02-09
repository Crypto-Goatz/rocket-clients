'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Rocket,
  Menu,
  X,
  ChevronDown,
  BookOpen,
  FileSearch,
  Search,
  Code,
  Braces,
  TrendingUp,
  Gauge,
  MapPin,
  Target,
  Calculator,
  ArrowRight,
  Sparkles,
} from 'lucide-react'

const RESOURCE_TOOLS = [
  { slug: 'sxo-playbook-2026', title: 'SXO Playbook 2026', desc: 'Complete SXO strategy guide', icon: BookOpen, featured: true },
  { slug: 'content-audit', title: 'Content Audit', desc: 'AI-powered page analysis', icon: FileSearch },
  { slug: 'seo-analyzer', title: 'SEO Analyzer', desc: 'Technical SEO audit', icon: Search },
  { slug: 'meta-tag-generator', title: 'Meta Tag Generator', desc: 'Optimized meta tags', icon: Code },
  { slug: 'schema-markup-generator', title: 'Schema Generator', desc: 'JSON-LD structured data', icon: Braces },
  { slug: 'keyword-research', title: 'Keyword Research', desc: 'Find profitable keywords', icon: TrendingUp },
  { slug: 'page-speed-analyzer', title: 'Page Speed', desc: 'Performance analysis', icon: Gauge },
  { slug: 'local-seo-checker', title: 'Local SEO', desc: 'Local search audit', icon: MapPin },
  { slug: 'competitor-analysis', title: 'Competitor Analysis', desc: 'Competitive research', icon: Target },
  { slug: 'cro-calculator', title: 'CRO Calculator', desc: 'Conversion ROI', icon: Calculator },
]

const NAV_LINKS = [
  { href: '/features', label: 'Features' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/resources', label: 'Resources', hasDropdown: true },
]

export function Header() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [resourcesOpen, setResourcesOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null)

  useEffect(() => {
    setMobileOpen(false)
    setResourcesOpen(false)
  }, [pathname])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setResourcesOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setResourcesOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setResourcesOpen(false), 200)
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-xl">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-red-500 shadow-lg shadow-orange-500/20">
              <Rocket className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">
              Rocket<span className="text-orange-500">+</span>CRM
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) =>
              link.hasDropdown ? (
                <div
                  key={link.href}
                  ref={dropdownRef}
                  className="relative"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={link.href}
                    className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      pathname.startsWith('/resources')
                        ? 'text-white bg-white/[0.06]'
                        : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    {link.label}
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${resourcesOpen ? 'rotate-180' : ''}`} />
                  </Link>

                  {/* Mega Dropdown */}
                  {resourcesOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[680px] mega-menu-enter">
                      <div className="rounded-2xl border border-zinc-800 bg-zinc-950/95 backdrop-blur-xl shadow-2xl shadow-black/40 overflow-hidden">
                        {/* Featured */}
                        <div className="p-4 border-b border-zinc-800/60">
                          <Link
                            href="/resources/sxo-playbook-2026"
                            className="flex items-center gap-4 p-3 rounded-xl bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 hover:border-orange-500/40 transition-colors group"
                          >
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-red-500 shrink-0">
                              <BookOpen className="h-6 w-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-white group-hover:text-orange-400 transition-colors">
                                  The SXO Playbook for 2026
                                </span>
                                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400">
                                  Featured
                                </span>
                              </div>
                              <p className="text-sm text-zinc-400 mt-0.5">
                                60+ page guide to dominating search in 2026
                              </p>
                            </div>
                            <ArrowRight className="h-4 w-4 text-zinc-600 group-hover:text-orange-400 transition-colors" />
                          </Link>
                        </div>

                        {/* Tools Grid */}
                        <div className="p-4">
                          <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 mb-3 px-1">
                            Free Tools & Resources
                          </p>
                          <div className="grid grid-cols-3 gap-1">
                            {RESOURCE_TOOLS.filter((t) => !t.featured).map((tool) => (
                              <Link
                                key={tool.slug}
                                href={`/resources/${tool.slug}`}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/[0.04] transition-colors group"
                              >
                                <tool.icon className="h-4 w-4 text-zinc-500 group-hover:text-orange-400 transition-colors shrink-0" />
                                <div className="min-w-0">
                                  <div className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors truncate">
                                    {tool.title}
                                  </div>
                                  <div className="text-xs text-zinc-500 truncate">{tool.desc}</div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>

                        {/* Footer */}
                        <div className="px-4 py-3 border-t border-zinc-800/60 bg-zinc-900/50">
                          <Link
                            href="/resources"
                            className="flex items-center justify-center gap-2 text-sm font-medium text-orange-500 hover:text-orange-400 transition-colors"
                          >
                            <Sparkles className="h-4 w-4" />
                            View All Resources
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? 'text-white bg-white/[0.06]'
                      : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
            <a
              href="https://rocketopp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/[0.04] transition-colors"
            >
              Solutions
            </a>
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="https://app.rocketclients.com"
              className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors"
            >
              Login
            </a>
            <a
              href="https://app.rocketclients.com"
              className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-red-500 rounded-lg hover:shadow-lg hover:shadow-orange-500/20 hover:opacity-90 transition-all"
            >
              Start Free Trial
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen((p) => !p)}
            className="lg:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-zinc-800/60 bg-zinc-950/98 backdrop-blur-xl animate-fade-in-down">
          <div className="px-4 py-4 space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                  pathname === link.href || (link.href === '/resources' && pathname.startsWith('/resources'))
                    ? 'text-white bg-white/[0.06]'
                    : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://rocketopp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-3 rounded-xl text-base font-medium text-zinc-400 hover:text-white hover:bg-white/[0.04] transition-colors"
            >
              Solutions
            </a>

            {/* Mobile Resource Links */}
            <div className="pt-2 mt-2 border-t border-zinc-800/60">
              <p className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-zinc-600">
                Free Tools
              </p>
              {RESOURCE_TOOLS.slice(0, 5).map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/resources/${tool.slug}`}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-zinc-400 hover:text-white hover:bg-white/[0.04] transition-colors"
                >
                  <tool.icon className="h-4 w-4 text-zinc-600" />
                  {tool.title}
                </Link>
              ))}
            </div>

            {/* Mobile CTAs */}
            <div className="pt-4 mt-2 border-t border-zinc-800/60 space-y-2">
              <a
                href="https://app.rocketclients.com"
                className="block w-full px-4 py-3 text-center text-base font-medium text-zinc-400 border border-zinc-800 rounded-xl hover:text-white hover:border-zinc-700 transition-colors"
              >
                Login
              </a>
              <a
                href="https://app.rocketclients.com"
                className="block w-full px-4 py-3 text-center text-base font-semibold text-white bg-gradient-to-r from-orange-500 to-red-500 rounded-xl hover:opacity-90 transition-opacity"
              >
                Start Free Trial
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
