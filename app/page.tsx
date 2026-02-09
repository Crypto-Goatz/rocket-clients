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
  Globe,
  ChevronRight,
  Star,
  BookOpen,
} from 'lucide-react'
import { NebulaBg } from '@/components/NebulaBg'

const features = [
  { icon: Users, title: 'Contact Management', description: 'Unlimited contacts with smart segmentation, tagging, and automated workflows.' },
  { icon: MessageSquare, title: 'Unified Inbox', description: 'SMS, email, Facebook, Instagram, and WhatsApp all in one conversation view.' },
  { icon: Calendar, title: 'Appointment Scheduling', description: 'Built-in calendars, booking widgets, and automated reminders.' },
  { icon: Zap, title: 'Marketing Automation', description: 'Visual workflow builder for drip campaigns, follow-ups, and nurture sequences.' },
  { icon: Globe, title: 'Website Builder', description: 'Drag-and-drop funnels, landing pages, and full websites with hosting included.' },
  { icon: BarChart3, title: 'Analytics Dashboard', description: 'Track leads, conversions, revenue, and campaign performance in real-time.' },
]

const integrations = [
  { name: 'Stripe', description: 'Accept payments & subscriptions' },
  { name: 'Calendly', description: 'Advanced scheduling' },
  { name: 'Zapier', description: '5000+ app integrations' },
  { name: 'Google', description: 'Calendar, Analytics, Ads' },
  { name: 'Facebook', description: 'Ads & Messenger' },
  { name: 'Quickbooks', description: 'Accounting sync' },
]

const rocketPlusMods = [
  { name: 'RocketFlow', description: 'AI-powered workflow automation' },
  { name: 'AI Course Generator', description: 'Create courses with AI' },
  { name: 'APEX AI', description: 'A/B testing & optimization' },
  { name: 'Content AI', description: 'Generate content instantly' },
]

export default function RocketClientsPage() {
  const [email, setEmail] = useState('')

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <NebulaBg variant="hero" />
        <div className="absolute inset-0 bg-grid" />
        <div className="relative mx-auto max-w-[1440px] px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 mb-6 animate-fade-in">
              <Sparkles className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-medium text-orange-500">Powered by Rocket+ AI</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl animate-fade-in-up">
              The All-in-One CRM
              <br />
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                Your Business Needs
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-zinc-400 max-w-2xl mx-auto animate-fade-in-up stagger-2">
              Replace your marketing stack with one powerful platform. Capture leads, nurture relationships,
              book appointments, and grow revenue — all with AI-powered automation.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4 animate-fade-in-up stagger-3">
              <a
                href="https://app.rocketclients.com"
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 text-base font-semibold text-white shadow-lg hover:shadow-orange-500/20 hover:opacity-90 transition-all"
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
            <p className="mt-4 text-sm text-zinc-500 animate-fade-in stagger-4">
              No credit card required &bull; Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative border-y border-zinc-800/50 bg-zinc-900/20 backdrop-blur-sm">
        <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { value: '50K+', label: 'Active Businesses' },
              { value: '100M+', label: 'Messages Sent' },
              { value: '$2B+', label: 'Revenue Generated' },
              { value: '4.8/5', label: 'Customer Rating' },
            ].map((stat, i) => (
              <div key={stat.label} className={`text-center animate-fade-in-up stagger-${i + 1}`}>
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="mt-1 text-sm text-zinc-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SXO Playbook Banner */}
      <section className="py-16 border-b border-zinc-800/50">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <Link
            href="/resources/sxo-playbook-2026"
            className="group block rounded-2xl border border-orange-500/20 bg-gradient-to-r from-orange-500/5 via-red-500/5 to-orange-500/5 p-6 lg:p-8 hover:border-orange-500/40 transition-all"
          >
            <div className="flex flex-col lg:flex-row items-center gap-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 shrink-0 animate-float">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 rounded-full bg-orange-500/20 px-3 py-1 mb-2">
                  <Sparkles className="h-3 w-3 text-orange-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-orange-400">Free Download</span>
                </div>
                <h2 className="text-2xl font-bold text-white group-hover:text-orange-400 transition-colors">
                  The SXO Playbook for 2026
                </h2>
                <p className="mt-1 text-zinc-400">
                  60+ pages of Search Experience Optimization strategies, frameworks, and actionable tactics.
                </p>
              </div>
              <ArrowRight className="h-6 w-6 text-zinc-600 group-hover:text-orange-400 group-hover:translate-x-1 transition-all shrink-0" />
            </div>
          </Link>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-24">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Everything You Need to
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent"> Grow</span>
            </h2>
            <p className="mt-4 text-lg text-zinc-400">
              One platform to capture, nurture, and convert leads into customers
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <div
                key={feature.title}
                className={`group rounded-2xl border border-zinc-800/50 bg-zinc-900/30 backdrop-blur-sm p-8 hover:border-orange-500/40 hover:shadow-lg hover:shadow-orange-500/10 hover:bg-zinc-900/50 transition-all duration-300 animate-fade-in-up stagger-${i + 1}`}
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
      <section className="relative overflow-hidden bg-gradient-to-r from-orange-500/5 via-red-500/5 to-orange-500/5 py-16 border-y border-orange-500/20">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex-1 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/50 bg-orange-500/20 px-3 py-1 mb-4">
                <Rocket className="h-4 w-4 text-orange-500" />
                <span className="text-sm font-medium text-orange-500">Exclusive Integration</span>
              </div>
              <h2 className="text-3xl font-bold text-white">
                Supercharge with <span className="text-orange-500">Rocket+ Mods</span>
              </h2>
              <p className="mt-4 text-lg text-zinc-300">
                Our Pro plan includes access to AI-powered mods that automate and enhance your CRM.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                {rocketPlusMods.map((mod) => (
                  <div key={mod.name} className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500 shrink-0" />
                    <span className="text-zinc-300">{mod.name}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <a
                  href="https://rocketadd.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-400 font-medium transition-colors"
                >
                  Explore all Rocket+ Mods
                  <ChevronRight className="h-4 w-4" />
                </a>
              </div>
            </div>
            <div className="shrink-0 animate-float relative">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 blur-[40px] opacity-40 animate-glow-pulse" />
              <div className="relative flex h-32 w-32 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 shadow-lg shadow-orange-500/30">
                <Rocket className="h-16 w-16 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="py-24">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Connects to Your Favorite Tools</h2>
            <p className="mt-4 text-lg text-zinc-400">Seamless integrations with the apps you already use</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {integrations.map((integration, i) => (
              <div
                key={integration.name}
                className={`flex items-center gap-4 rounded-xl border border-zinc-800/50 bg-zinc-900/30 backdrop-blur-sm p-4 hover:border-zinc-700/60 hover:bg-zinc-900/50 transition-all animate-fade-in-up stagger-${i + 1}`}
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
      <section className="py-24 bg-zinc-900/20 border-y border-zinc-800/50">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-violet-500/30 bg-gradient-to-br from-violet-500/10 to-purple-500/10 p-8 lg:p-12 animate-fade-in-up">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/50 bg-violet-500/20 px-3 py-1 mb-4">
                  <Building className="h-4 w-4 text-violet-500" />
                  <span className="text-sm font-medium text-violet-500">Enterprise Solutions</span>
                </div>
                <h2 className="text-3xl font-bold text-white">Need Something Custom?</h2>
                <p className="mt-4 text-lg text-zinc-300">
                  RocketOpp builds custom marketing automation solutions for businesses with unique needs.
                </p>
                <ul className="mt-6 space-y-3">
                  {['Custom API integrations', 'White-label solutions', 'AI-powered automation', 'Dedicated support team'].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-violet-500 shrink-0" />
                      <span className="text-zinc-300">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <a
                    href="https://rocketopp.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet-500 to-purple-500 px-6 py-3 font-semibold text-white hover:opacity-90 hover:shadow-lg hover:shadow-violet-500/20 transition-all"
                  >
                    Contact RocketOpp
                    <ArrowRight className="h-5 w-5" />
                  </a>
                </div>
              </div>
              <div className="shrink-0">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { Icon: Shield, color: 'violet' },
                    { Icon: Zap, color: 'purple' },
                    { Icon: BarChart3, color: 'purple' },
                    { Icon: Globe, color: 'violet' },
                  ].map(({ Icon, color }, i) => (
                    <div
                      key={i}
                      className={`flex h-24 w-24 items-center justify-center rounded-xl bg-${color}-500/20 border border-${color}-500/30 animate-fade-in-up stagger-${i + 1}`}
                    >
                      <Icon className={`h-12 w-12 text-${color}-500`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-24">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Simple, Transparent Pricing</h2>
            <p className="mt-4 text-lg text-zinc-400">Choose the plan that fits your business</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
            {[
              { name: 'Starter', price: '$97', desc: 'Perfect for small businesses getting started', features: ['2,500 contacts', 'Email & SMS marketing', '1 user', 'Basic automations'], color: 'green', featured: false },
              { name: 'Pro', price: '$297', desc: 'For growing businesses with Rocket+ AI', features: ['Unlimited contacts', 'Advanced automations', '3 users', 'Rocket+ Mods Included', 'Priority support'], color: 'orange', featured: true },
              { name: 'Agency', price: '$497', desc: 'For agencies managing multiple clients', features: ['Unlimited everything', '10+ sub-accounts', 'White-label option', 'All Rocket+ Mods', 'Dedicated success manager'], color: 'green', featured: false },
            ].map((plan, i) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-8 backdrop-blur-sm transition-all duration-300 animate-fade-in-up stagger-${i + 1} ${
                  plan.featured
                    ? 'relative border-2 border-orange-500 bg-zinc-900/40 shadow-lg shadow-orange-500/10'
                    : 'border border-zinc-800/50 bg-zinc-900/30 hover:border-zinc-700/60 hover:bg-zinc-900/50'
                }`}
              >
                {plan.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-4 py-1">
                      <Star className="h-4 w-4 text-white" />
                      <span className="text-sm font-medium text-white">Most Popular</span>
                    </div>
                  </div>
                )}
                <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-zinc-400">/month</span>
                </div>
                <p className="mt-4 text-zinc-400">{plan.desc}</p>
                <ul className="mt-8 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-3">
                      <Check className={`h-5 w-5 shrink-0 ${plan.featured ? 'text-orange-500' : 'text-green-500'}`} />
                      <span className={f === 'Rocket+ Mods Included' ? 'text-white font-medium' : 'text-zinc-300'}>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="https://app.rocketclients.com"
                  className={`mt-8 block w-full rounded-lg py-3 text-center font-medium transition-all ${
                    plan.featured
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:opacity-90 hover:shadow-lg hover:shadow-orange-500/20'
                      : 'border border-zinc-700 text-white hover:bg-zinc-800'
                  }`}
                >
                  {plan.name === 'Agency' ? 'Contact Sales' : plan.featured ? 'Start Free Trial' : 'Get Started'}
                </a>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/pricing" className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-400 font-medium transition-colors">
              See full pricing comparison
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-orange-500 to-red-500 p-12 text-center animate-fade-in-up animate-color-shift">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Ready to Grow Your Business?</h2>
            <p className="mt-4 text-lg text-white/90">Start your 14-day free trial today. No credit card required.</p>
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
    </div>
  )
}
