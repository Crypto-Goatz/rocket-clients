// ============================================================
// RocketClients - GHL White-Label Reseller Landing Page
// ============================================================
// Sell GHL as Rocket+CRM with Rocket+ Mods integration
// ============================================================

'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Rocket,
  Zap,
  Users,
  Calendar,
  MessageSquare,
  BarChart3,
  Shield,
  ArrowRight,
  Check,
  Sparkles,
  Building,
  Mail,
  Phone,
  Globe,
  ChevronRight,
  Star
} from 'lucide-react'

const features = [
  {
    icon: Users,
    title: 'Contact Management',
    description: 'Unlimited contacts with smart segmentation, tagging, and automated workflows.'
  },
  {
    icon: MessageSquare,
    title: 'Unified Inbox',
    description: 'SMS, email, Facebook, Instagram, and WhatsApp all in one conversation view.'
  },
  {
    icon: Calendar,
    title: 'Appointment Scheduling',
    description: 'Built-in calendars, booking widgets, and automated reminders.'
  },
  {
    icon: Zap,
    title: 'Marketing Automation',
    description: 'Visual workflow builder for drip campaigns, follow-ups, and nurture sequences.'
  },
  {
    icon: Globe,
    title: 'Website Builder',
    description: 'Drag-and-drop funnels, landing pages, and full websites with hosting included.'
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'Track leads, conversions, revenue, and campaign performance in real-time.'
  }
]

const integrations = [
  { name: 'Stripe', description: 'Accept payments & subscriptions' },
  { name: 'Calendly', description: 'Advanced scheduling' },
  { name: 'Zapier', description: '5000+ app integrations' },
  { name: 'Google', description: 'Calendar, Analytics, Ads' },
  { name: 'Facebook', description: 'Ads & Messenger' },
  { name: 'Quickbooks', description: 'Accounting sync' }
]

const rocketPlusMods = [
  { name: 'RocketFlow', description: 'AI-powered workflow automation' },
  { name: 'AI Course Generator', description: 'Create courses with AI' },
  { name: 'APEX AI', description: 'A/B testing & optimization' },
  { name: 'Content AI', description: 'Generate content instantly' },
  { name: 'Health Score Monitor', description: 'Contact engagement scoring' },
  { name: 'RSS Content Engine', description: 'Automated content posting' }
]

export default function RocketClientsPage() {
  const [email, setEmail] = useState('')

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-lg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-red-500">
                <Rocket className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Rocket<span className="text-orange-500">+</span>CRM</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <Link href="/features" className="text-zinc-400 hover:text-white transition-colors">
                Features
              </Link>
              <Link href="/pricing" className="text-zinc-400 hover:text-white transition-colors">
                Pricing
              </Link>
              <Link href="https://rocketadd.com" target="_blank" className="text-zinc-400 hover:text-white transition-colors">
                Rocket+ Mods
              </Link>
              <Link href="https://rocketopp.com" target="_blank" className="text-zinc-400 hover:text-white transition-colors">
                Custom Solutions
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="https://app.rocketclients.com"
                className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors"
              >
                Login
              </a>
              <a
                href="https://app.rocketclients.com"
                className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-red-500 rounded-lg hover:opacity-90 transition-opacity"
              >
                Start Free Trial
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 mb-6">
              <Sparkles className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-medium text-orange-500">Powered by GoHighLevel + Rocket+ AI</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
              The All-in-One CRM
              <br />
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                Your Business Needs
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-zinc-400 max-w-2xl mx-auto">
              Replace your marketing stack with one powerful platform. Capture leads, nurture relationships,
              book appointments, and grow revenue — all with AI-powered automation.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <a
                href="https://app.rocketclients.com"
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 text-base font-semibold text-white shadow-lg hover:opacity-90 transition-opacity"
              >
                Start 14-Day Free Trial
                <ArrowRight className="h-5 w-5" />
              </a>
              <Link
                href="/features"
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-6 py-3 text-base font-semibold text-white hover:bg-zinc-800 transition-colors"
              >
                See All Features
              </Link>
            </div>
            <p className="mt-4 text-sm text-zinc-500">
              No credit card required • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-zinc-800 bg-zinc-900/50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">50K+</div>
              <div className="mt-1 text-sm text-zinc-400">Active Businesses</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">100M+</div>
              <div className="mt-1 text-sm text-zinc-400">Messages Sent</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">$2B+</div>
              <div className="mt-1 text-sm text-zinc-400">Revenue Generated</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">4.8/5</div>
              <div className="mt-1 text-sm text-zinc-400">Customer Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Everything You Need to
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent"> Grow</span>
            </h2>
            <p className="mt-4 text-lg text-zinc-400">
              One platform to capture, nurture, and convert leads into customers
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 hover:border-orange-500/50 transition-colors"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 group-hover:from-orange-500/30 group-hover:to-red-500/30 transition-colors">
                  <feature.icon className="h-6 w-6 text-orange-500" />
                </div>
                <h3 className="mt-6 text-lg font-semibold text-white">{feature.title}</h3>
                <p className="mt-2 text-zinc-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rocket+ Integration Banner */}
      <section className="relative overflow-hidden bg-gradient-to-r from-orange-500/10 via-red-500/10 to-orange-500/10 py-16 border-y border-orange-500/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/50 bg-orange-500/20 px-3 py-1 mb-4">
                <Rocket className="h-4 w-4 text-orange-500" />
                <span className="text-sm font-medium text-orange-500">Exclusive Integration</span>
              </div>
              <h2 className="text-3xl font-bold text-white">
                Supercharge with <span className="text-orange-500">Rocket+ Mods</span>
              </h2>
              <p className="mt-4 text-lg text-zinc-300">
                Our Pro plan includes access to AI-powered mods that automate and enhance your CRM.
                Generate content, optimize campaigns, and scale faster with intelligent automation.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                {rocketPlusMods.slice(0, 4).map((mod) => (
                  <div key={mod.name} className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="text-zinc-300">{mod.name}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <a
                  href="https://rocketadd.com"
                  target="_blank"
                  className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-400 font-medium"
                >
                  Explore all Rocket+ Mods
                  <ChevronRight className="h-4 w-4" />
                </a>
              </div>
            </div>
            <div className="flex-shrink-0">
              <div className="flex h-32 w-32 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 shadow-lg shadow-orange-500/30">
                <Rocket className="h-16 w-16 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Connects to Your Favorite Tools
            </h2>
            <p className="mt-4 text-lg text-zinc-400">
              Seamless integrations with the apps you already use
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {integrations.map((integration) => (
              <div
                key={integration.name}
                className="flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800">
                  <Zap className="h-5 w-5 text-zinc-400" />
                </div>
                <div>
                  <div className="font-medium text-white">{integration.name}</div>
                  <div className="text-sm text-zinc-500">{integration.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RocketOpp Custom Solutions */}
      <section className="py-24 bg-zinc-900/50 border-y border-zinc-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-violet-500/30 bg-gradient-to-br from-violet-500/10 to-purple-500/10 p-8 lg:p-12">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/50 bg-violet-500/20 px-3 py-1 mb-4">
                  <Building className="h-4 w-4 text-violet-500" />
                  <span className="text-sm font-medium text-violet-500">Enterprise Solutions</span>
                </div>
                <h2 className="text-3xl font-bold text-white">
                  Need Something Custom?
                </h2>
                <p className="mt-4 text-lg text-zinc-300">
                  RocketOpp builds custom marketing automation solutions for businesses with unique needs.
                  From custom integrations to white-label platforms, we've got you covered.
                </p>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-violet-500" />
                    <span className="text-zinc-300">Custom API integrations</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-violet-500" />
                    <span className="text-zinc-300">White-label solutions</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-violet-500" />
                    <span className="text-zinc-300">AI-powered automation</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-violet-500" />
                    <span className="text-zinc-300">Dedicated support team</span>
                  </li>
                </ul>
                <div className="mt-8">
                  <a
                    href="https://rocketopp.com"
                    target="_blank"
                    className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet-500 to-purple-500 px-6 py-3 font-semibold text-white hover:opacity-90 transition-opacity"
                  >
                    Contact RocketOpp
                    <ArrowRight className="h-5 w-5" />
                  </a>
                </div>
              </div>
              <div className="flex-shrink-0">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-violet-500/20 border border-violet-500/30">
                    <Shield className="h-12 w-12 text-violet-500" />
                  </div>
                  <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-purple-500/20 border border-purple-500/30">
                    <Zap className="h-12 w-12 text-purple-500" />
                  </div>
                  <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-purple-500/20 border border-purple-500/30">
                    <BarChart3 className="h-12 w-12 text-purple-500" />
                  </div>
                  <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-violet-500/20 border border-violet-500/30">
                    <Globe className="h-12 w-12 text-violet-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Simple, Transparent Pricing
            </h2>
            <p className="mt-4 text-lg text-zinc-400">
              Choose the plan that fits your business
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {/* Starter */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8">
              <h3 className="text-xl font-semibold text-white">Starter</h3>
              <div className="mt-4">
                <span className="text-4xl font-bold text-white">$97</span>
                <span className="text-zinc-400">/month</span>
              </div>
              <p className="mt-4 text-zinc-400">Perfect for small businesses getting started</p>
              <ul className="mt-8 space-y-3">
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-zinc-300">2,500 contacts</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-zinc-300">Email & SMS marketing</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-zinc-300">1 user</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-zinc-300">Basic automations</span>
                </li>
              </ul>
              <a
                href="https://app.rocketclients.com"
                className="mt-8 block w-full rounded-lg border border-zinc-700 py-3 text-center font-medium text-white hover:bg-zinc-800 transition-colors"
              >
                Get Started
              </a>
            </div>

            {/* Pro - Featured */}
            <div className="relative rounded-2xl border-2 border-orange-500 bg-zinc-900/50 p-8">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <div className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-4 py-1">
                  <Star className="h-4 w-4 text-white" />
                  <span className="text-sm font-medium text-white">Most Popular</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white">Pro</h3>
              <div className="mt-4">
                <span className="text-4xl font-bold text-white">$297</span>
                <span className="text-zinc-400">/month</span>
              </div>
              <p className="mt-4 text-zinc-400">For growing businesses with Rocket+ AI</p>
              <ul className="mt-8 space-y-3">
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-orange-500" />
                  <span className="text-zinc-300">Unlimited contacts</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-orange-500" />
                  <span className="text-zinc-300">Advanced automations</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-orange-500" />
                  <span className="text-zinc-300">3 users</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-orange-500" />
                  <span className="text-white font-medium">Rocket+ Mods Included</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-orange-500" />
                  <span className="text-zinc-300">Priority support</span>
                </li>
              </ul>
              <a
                href="https://app.rocketclients.com"
                className="mt-8 block w-full rounded-lg bg-gradient-to-r from-orange-500 to-red-500 py-3 text-center font-medium text-white hover:opacity-90 transition-opacity"
              >
                Start Free Trial
              </a>
            </div>

            {/* Agency */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8">
              <h3 className="text-xl font-semibold text-white">Agency</h3>
              <div className="mt-4">
                <span className="text-4xl font-bold text-white">$497</span>
                <span className="text-zinc-400">/month</span>
              </div>
              <p className="mt-4 text-zinc-400">For agencies managing multiple clients</p>
              <ul className="mt-8 space-y-3">
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-zinc-300">Unlimited everything</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-zinc-300">10+ sub-accounts</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-zinc-300">White-label option</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-zinc-300">All Rocket+ Mods</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-zinc-300">Dedicated success manager</span>
                </li>
              </ul>
              <a
                href="https://app.rocketclients.com"
                className="mt-8 block w-full rounded-lg border border-zinc-700 py-3 text-center font-medium text-white hover:bg-zinc-800 transition-colors"
              >
                Contact Sales
              </a>
            </div>
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-400 font-medium"
            >
              See full pricing comparison
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-orange-500 to-red-500 p-12 text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Ready to Grow Your Business?
            </h2>
            <p className="mt-4 text-lg text-white/90">
              Start your 14-day free trial today. No credit card required.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full sm:w-80 px-4 py-3 rounded-lg bg-white/10 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <a
                href={`https://app.rocketclients.com?email=${encodeURIComponent(email)}`}
                className="w-full sm:w-auto px-8 py-3 rounded-lg bg-white text-orange-600 font-semibold hover:bg-zinc-100 transition-colors"
              >
                Start Free Trial
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-red-500">
                  <Rocket className="h-4 w-4 text-white" />
                </div>
                <span className="text-lg font-bold text-white">Rocket+CRM</span>
              </div>
              <p className="text-sm text-zinc-400">
                The all-in-one CRM platform powered by AI. Capture, nurture, and convert leads with intelligent automation.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-white mb-4">Product</h4>
              <ul className="space-y-2">
                <li><Link href="/features" className="text-sm text-zinc-400 hover:text-white">Features</Link></li>
                <li><Link href="/pricing" className="text-sm text-zinc-400 hover:text-white">Pricing</Link></li>
                <li><a href="https://app.rocketclients.com" className="text-sm text-zinc-400 hover:text-white">Login</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-white mb-4">Ecosystem</h4>
              <ul className="space-y-2">
                <li><a href="https://rocketadd.com" className="text-sm text-zinc-400 hover:text-white">Rocket+ Mods</a></li>
                <li><a href="https://rocketopp.com" className="text-sm text-zinc-400 hover:text-white">RocketOpp (Custom)</a></li>
                <li><a href="https://mcpfed.com" className="text-sm text-zinc-400 hover:text-white">MCPFED</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-white mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-zinc-400">
                  <Mail className="h-4 w-4" />
                  support@rocketclients.com
                </li>
                <li className="flex items-center gap-2 text-sm text-zinc-400">
                  <Globe className="h-4 w-4" />
                  rocketclients.com
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-zinc-500">
              {new Date().getFullYear()} Rocket+CRM. A RocketOpp Company.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-zinc-400 hover:text-white">Privacy</a>
              <a href="#" className="text-sm text-zinc-400 hover:text-white">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
