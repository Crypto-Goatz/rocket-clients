// ============================================================
// RocketClients - BUILD YOUR OWN CRM - Pricing Revolution
// ============================================================
// Only pay for what you need. Mix and match. Change anytime.
// ============================================================

'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  Rocket,
  Check,
  X,
  ArrowRight,
  ArrowDown,
  Star,
  Sparkles,
  Zap,
  Users,
  MessageSquare,
  BarChart3,
  Shield,
  Headphones,
  Mail,
  Calendar,
  Globe,
  Phone,
  Instagram,
  FileText,
  Workflow,
  Bot,
  CreditCard,
  Megaphone,
  Target,
  PieChart,
  Smartphone,
  Video,
  Palette,
  ShoppingCart,
  BookOpen,
  HeadphonesIcon,
  Wrench,
  Plus,
  Minus,
  RefreshCw,
  Shuffle,
  Gift,
  Tag,
  Percent,
  ChevronDown
} from 'lucide-react'

// ============================================================
// BUILD YOUR OWN - 20 Individual Features (PRIMARY)
// ============================================================
const individualFeatures = [
  // Marketing
  { id: 'social-media', name: 'Social Media Manager', description: 'Schedule posts, manage accounts, track engagement across all platforms', price: 45, icon: Instagram, category: 'Marketing' },
  { id: 'email-marketing', name: 'Email Marketing', description: 'Campaigns, templates, automation, analytics, and deliverability tools', price: 40, icon: Mail, category: 'Marketing' },
  { id: 'sms-marketing', name: 'SMS & Text Marketing', description: 'Two-way texting, bulk SMS, templates, and compliance tools', price: 50, icon: Phone, category: 'Marketing' },
  { id: 'reputation', name: 'Reputation Management', description: 'Review requests, monitoring, Google & Facebook review management', price: 35, icon: Star, category: 'Marketing' },
  // CRM
  { id: 'crm-contacts', name: 'CRM & Contacts', description: 'Contact management, tags, segments, custom fields, and activity tracking', price: 35, icon: Users, category: 'CRM' },
  { id: 'unified-inbox', name: 'Unified Inbox', description: 'All conversations in one place - SMS, email, FB, IG, WhatsApp', price: 40, icon: MessageSquare, category: 'CRM' },
  { id: 'pipeline', name: 'Sales Pipeline', description: 'Visual pipelines, deal tracking, opportunity management', price: 45, icon: Target, category: 'CRM' },
  // Scheduling
  { id: 'calendar', name: 'Calendar & Booking', description: 'Online scheduling, calendar sync, automated reminders', price: 30, icon: Calendar, category: 'Scheduling' },
  // Websites
  { id: 'funnels', name: 'Funnels & Landing Pages', description: 'Drag-and-drop builder, templates, A/B testing, analytics', price: 55, icon: Globe, category: 'Websites' },
  { id: 'websites', name: 'Full Website Builder', description: 'Complete websites with blog, SEO tools, custom domains', price: 60, icon: Palette, category: 'Websites' },
  { id: 'forms-surveys', name: 'Forms & Surveys', description: 'Custom forms, surveys, quizzes with conditional logic', price: 25, icon: FileText, category: 'Websites' },
  // Automation
  { id: 'workflows', name: 'Workflow Automation', description: 'Visual workflow builder, triggers, conditions, multi-step campaigns', price: 65, icon: Workflow, category: 'Automation' },
  { id: 'triggers', name: 'Smart Triggers', description: 'Event-based automation, webhooks, third-party integrations', price: 40, icon: Zap, category: 'Automation' },
  // Commerce
  { id: 'payments', name: 'Payments & Invoicing', description: 'Accept payments, subscriptions, invoices, payment plans', price: 45, icon: CreditCard, category: 'Commerce' },
  { id: 'ecommerce', name: 'E-commerce & Products', description: 'Product catalog, order management, shopping cart', price: 50, icon: ShoppingCart, category: 'Commerce' },
  // Content
  { id: 'membership', name: 'Membership & Courses', description: 'Create courses, membership areas, drip content, certificates', price: 55, icon: BookOpen, category: 'Content' },
  { id: 'communities', name: 'Communities', description: 'Build community spaces, discussions, member engagement', price: 40, icon: Users, category: 'Content' },
  // Analytics
  { id: 'analytics', name: 'Advanced Analytics', description: 'Dashboards, reports, attribution, conversion tracking', price: 35, icon: PieChart, category: 'Analytics' },
  { id: 'call-tracking', name: 'Call Tracking', description: 'Track calls, recordings, analytics, lead attribution', price: 45, icon: Phone, category: 'Analytics' },
  // AI
  { id: 'rocket-ai', name: 'Rocket+ AI Mods', description: 'Full suite: RocketFlow, Content AI, APEX AI, Course Generator & more', price: 99, icon: Bot, category: 'AI', highlight: true },
]

// ============================================================
// BUNDLE PLANS (Secondary - for those who want everything)
// ============================================================
const bundlePlans = [
  {
    name: 'Starter Bundle',
    description: 'Essential tools to get started',
    price: 225,
    annual: 2250,
    trial: 7,
    stripeMonthly: 'https://buy.stripe.com/5kQbJ0djObObb4E6162wU0a',
    stripeAnnual: 'https://buy.stripe.com/5kQbJ0djObObb4E6162wU0a',
    includes: ['CRM & Contacts', 'Email Marketing', 'SMS Marketing', 'Calendar', 'Landing Pages', 'Basic Automations', 'Unified Inbox'],
  },
  {
    name: 'Growth Bundle',
    description: 'Everything you need to scale',
    price: 425,
    annual: 4225,
    trial: 0,
    stripeMonthly: 'https://buy.stripe.com/6oU6oG3JecSf5Kk4X22wU0e',
    stripeAnnual: 'https://buy.stripe.com/9B65kCbbG3hF6Oodty2wU0g',
    includes: ['Everything in Starter', 'Funnels & Websites', 'Advanced Automations', 'Membership & Courses', 'Reputation Management', 'Social Media', 'Payments', 'Rocket+ AI Mods'],
    popular: true,
  },
  {
    name: 'Scale Bundle',
    description: 'Enterprise-grade for agencies',
    price: 925,
    annual: 9500,
    trial: 14,
    stripeMonthly: 'https://buy.stripe.com/7sY6oG3Je19x3Cccpu2wU0i',
    stripeAnnual: 'https://buy.stripe.com/3cI5kC0x2f0nfkU2OU2wU0j',
    includes: ['Everything in Growth', 'Unlimited Sub-accounts', 'White-label Platform', 'API Access', 'Dedicated Success Manager', 'All Rocket+ AI Mods', 'Phone Support'],
  }
]

const categories = ['All', 'Marketing', 'CRM', 'Scheduling', 'Websites', 'Automation', 'Commerce', 'Content', 'Analytics', 'AI']

export default function PricingPage() {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const [activeCategory, setActiveCategory] = useState('All')
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly')
  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)

  const toggleFeature = (id: string) => {
    setSelectedFeatures(prev =>
      prev.includes(id)
        ? prev.filter(f => f !== id)
        : [...prev, id]
    )
  }

  const selectAll = () => {
    setSelectedFeatures(individualFeatures.map(f => f.id))
  }

  const clearAll = () => {
    setSelectedFeatures([])
  }

  const filteredFeatures = useMemo(() => {
    if (activeCategory === 'All') return individualFeatures
    return individualFeatures.filter(f => f.category === activeCategory)
  }, [activeCategory])

  const customTotal = useMemo(() => {
    const base = selectedFeatures.reduce((total, id) => {
      const feature = individualFeatures.find(f => f.id === id)
      return total + (feature?.price || 0)
    }, 0)
    // Apply 15% discount for annual
    if (billingCycle === 'annual') {
      return Math.round(base * 0.85)
    }
    return base
  }, [selectedFeatures, billingCycle])

  const monthlyEquivalent = useMemo(() => {
    return selectedFeatures.reduce((total, id) => {
      const feature = individualFeatures.find(f => f.id === id)
      return total + (feature?.price || 0)
    }, 0)
  }, [selectedFeatures])

  const annualSavings = Math.round(monthlyEquivalent * 12 * 0.15)

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-lg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-red-500">
                <Rocket className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Rocket<span className="text-orange-500">+</span>CRM</span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link href="/features" className="text-zinc-400 hover:text-white transition-colors">Features</Link>
              <Link href="/pricing" className="text-white font-medium">Pricing</Link>
            </div>
            <div className="flex items-center gap-3">
              <a href="https://app.rocketclients.com" className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors">Login</a>
              <a href="#builder" className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg hover:opacity-90 transition-opacity">Build Your CRM</a>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO - Build Your Own is THE focus */}
      <section className="pt-16 pb-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5" />
        <div className="mx-auto max-w-5xl px-4 relative">
          {/* Promo Banner */}
          <div className="inline-flex items-center gap-2 rounded-full border border-green-500/50 bg-green-500/10 px-6 py-2 mb-8 animate-pulse">
            <Gift className="h-4 w-4 text-green-400" />
            <span className="text-sm font-medium text-green-400">January Special: 20% off your first 3 months with code <span className="font-bold">ROCKET2026</span></span>
          </div>

          <h1 className="text-5xl font-bold text-white sm:text-6xl lg:text-7xl">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">Build Your Own</span>
            <br />
            <span className="text-white">CRM</span>
          </h1>

          <p className="mt-6 text-xl text-zinc-400 max-w-2xl mx-auto">
            Stop paying for features you don't use. Select exactly what you need,
            pay only for what you want, and change it anytime.
          </p>

          {/* Value Props */}
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {[
              { icon: Shuffle, text: 'Mix & Match', color: 'text-cyan-400' },
              { icon: RefreshCw, text: 'Change Anytime', color: 'text-green-400' },
              { icon: Tag, text: 'No Contracts', color: 'text-orange-400' },
              { icon: Percent, text: 'Monthly Specials', color: 'text-pink-400' },
            ].map((prop) => (
              <div key={prop.text} className="flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-800/50 px-5 py-2">
                <prop.icon className={`h-4 w-4 ${prop.color}`} />
                <span className="text-sm font-medium text-white">{prop.text}</span>
              </div>
            ))}
          </div>

          {/* Billing Toggle */}
          <div className="mt-10 inline-flex items-center gap-4 rounded-full border border-zinc-700 bg-zinc-800/50 p-1">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                billingCycle === 'monthly' ? 'bg-cyan-500 text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                billingCycle === 'annual' ? 'bg-cyan-500 text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Annual <span className="text-green-400 text-xs ml-1">Save 15%</span>
            </button>
          </div>

          {/* Scroll indicator */}
          <div className="mt-10">
            <a href="#builder" className="inline-flex flex-col items-center text-zinc-500 hover:text-cyan-400 transition-colors">
              <span className="text-sm">Start Building</span>
              <ChevronDown className="h-6 w-6 animate-bounce mt-1" />
            </a>
          </div>
        </div>
      </section>

      {/* BUILD YOUR OWN - Main Feature Selector */}
      <section id="builder" className="py-16 scroll-mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white">Select Your Features</h2>
              <p className="mt-2 text-zinc-400">Click to add or remove. Your plan updates in real-time.</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={selectAll}
                className="px-4 py-2 rounded-lg border border-zinc-700 text-sm text-zinc-400 hover:text-white hover:border-zinc-600 transition-all"
              >
                Select All
              </button>
              <button
                onClick={clearAll}
                className="px-4 py-2 rounded-lg border border-zinc-700 text-sm text-zinc-400 hover:text-white hover:border-zinc-600 transition-all"
              >
                Clear All
              </button>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-cyan-500 text-white'
                    : 'bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Feature Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {filteredFeatures.map((feature) => {
              const isSelected = selectedFeatures.includes(feature.id)
              const IconComponent = feature.icon
              return (
                <button
                  key={feature.id}
                  onClick={() => toggleFeature(feature.id)}
                  className={`group relative rounded-xl border p-5 text-left transition-all duration-200 ${
                    isSelected
                      ? feature.highlight
                        ? 'border-orange-500 bg-orange-500/10 shadow-lg shadow-orange-500/10'
                        : 'border-cyan-500 bg-cyan-500/10 shadow-lg shadow-cyan-500/10'
                      : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 hover:bg-zinc-900'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${
                      isSelected
                        ? feature.highlight ? 'bg-orange-500' : 'bg-cyan-500'
                        : 'bg-zinc-800 group-hover:bg-zinc-700'
                    }`}>
                      <IconComponent className={`h-5 w-5 ${isSelected ? 'text-white' : 'text-zinc-400'}`} />
                    </div>
                    <div className={`flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all ${
                      isSelected
                        ? feature.highlight ? 'border-orange-500 bg-orange-500' : 'border-cyan-500 bg-cyan-500'
                        : 'border-zinc-600 group-hover:border-zinc-500'
                    }`}>
                      {isSelected && <Check className="h-4 w-4 text-white" />}
                    </div>
                  </div>
                  <h3 className="mt-4 font-semibold text-white">{feature.name}</h3>
                  <p className="mt-1 text-sm text-zinc-400 line-clamp-2">{feature.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className={`text-xl font-bold ${
                      isSelected
                        ? feature.highlight ? 'text-orange-400' : 'text-cyan-400'
                        : 'text-zinc-300'
                    }`}>
                      ${feature.price}<span className="text-sm font-normal text-zinc-500">/mo</span>
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      isSelected ? 'bg-zinc-800 text-zinc-300' : 'bg-zinc-800/50 text-zinc-500'
                    }`}>
                      {feature.category}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Sticky Total Bar */}
          <div className={`sticky bottom-4 mt-8 transition-all duration-300 ${selectedFeatures.length > 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
            <div className="mx-auto max-w-4xl rounded-2xl border border-cyan-500/50 bg-zinc-900/95 backdrop-blur-xl p-6 shadow-2xl shadow-cyan-500/20">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-4 flex-wrap">
                    <p className="text-zinc-400">
                      <span className="text-2xl font-bold text-white">{selectedFeatures.length}</span> features
                    </p>
                    <div className="h-6 w-px bg-zinc-700" />
                    <div>
                      <span className="text-4xl font-bold text-white">${customTotal}</span>
                      <span className="text-zinc-400">/mo</span>
                      {billingCycle === 'annual' && (
                        <span className="ml-2 text-sm text-green-400 font-medium">
                          Save ${annualSavings}/year
                        </span>
                      )}
                    </div>
                  </div>
                  {selectedFeatures.length > 0 && (
                    <p className="mt-2 text-sm text-zinc-500">
                      {selectedFeatures.slice(0, 3).map(id => individualFeatures.find(f => f.id === id)?.name).join(', ')}
                      {selectedFeatures.length > 3 && ` +${selectedFeatures.length - 3} more`}
                    </p>
                  )}
                </div>

                {/* Promo Code */}
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                      className="w-32 px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm placeholder:text-zinc-500 focus:outline-none focus:border-cyan-500"
                    />
                    {promoCode === 'ROCKET2026' && (
                      <Check className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-400" />
                    )}
                  </div>
                  <a
                    href={`https://app.rocketclients.com/checkout?features=${selectedFeatures.join(',')}&total=${customTotal}&billing=${billingCycle}${promoCode ? `&promo=${promoCode}` : ''}`}
                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold text-lg hover:opacity-90 transition-all hover:shadow-lg hover:shadow-cyan-500/25"
                  >
                    Get Started
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Empty state helper */}
          {selectedFeatures.length === 0 && (
            <div className="mt-8 text-center">
              <p className="text-zinc-500">
                Click any feature above to start building your perfect CRM.
                <span className="text-cyan-400 ml-2">Start with just one feature for ${Math.min(...individualFeatures.map(f => f.price))}/mo!</span>
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Quick Start Suggestions */}
      <section className="py-16 border-t border-zinc-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-white text-center mb-4">Popular Combinations</h3>
          <p className="text-zinc-400 text-center mb-10">Quick-start templates you can customize</p>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                name: 'Social Media Only',
                price: 45,
                features: ['social-media'],
                description: 'Just need social? Get it for $45/mo',
                color: 'from-pink-500 to-rose-500'
              },
              {
                name: 'Email + CRM Basics',
                price: 115,
                features: ['email-marketing', 'crm-contacts', 'unified-inbox'],
                description: 'Perfect for email marketers',
                color: 'from-cyan-500 to-blue-500'
              },
              {
                name: 'Sales Machine',
                price: 155,
                features: ['crm-contacts', 'pipeline', 'calendar', 'payments'],
                description: 'Close more deals',
                color: 'from-green-500 to-emerald-500'
              },
            ].map((combo) => (
              <button
                key={combo.name}
                onClick={() => setSelectedFeatures(combo.features)}
                className="group rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 text-left hover:border-zinc-700 transition-all"
              >
                <div className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${combo.color} px-3 py-1 mb-4`}>
                  <Sparkles className="h-3 w-3 text-white" />
                  <span className="text-xs font-medium text-white">Quick Start</span>
                </div>
                <h4 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">{combo.name}</h4>
                <p className="mt-1 text-sm text-zinc-400">{combo.description}</p>
                <p className="mt-4 text-2xl font-bold text-white">${combo.price}<span className="text-sm text-zinc-500">/mo</span></p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* OR Choose a Bundle - Secondary */}
      <section className="py-24 border-t border-zinc-800 bg-zinc-900/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-zinc-500 text-sm uppercase tracking-wider mb-2">Or skip the customization</p>
            <h2 className="text-3xl font-bold text-white">Pre-Built Bundles</h2>
            <p className="mt-4 text-zinc-400">
              Want everything? Grab a bundle and get started instantly.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {bundlePlans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl border ${
                  plan.popular ? 'border-2 border-orange-500 bg-zinc-900/80' : 'border-zinc-800 bg-zinc-900/50'
                } p-8`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-4 py-1">
                      <Star className="h-4 w-4 text-white" />
                      <span className="text-sm font-medium text-white">Most Popular</span>
                    </div>
                  </div>
                )}

                <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
                <p className="mt-1 text-sm text-zinc-400">{plan.description}</p>

                <div className="mt-6">
                  <span className="text-4xl font-bold text-white">
                    ${billingCycle === 'monthly' ? plan.price : Math.round(plan.annual / 12)}
                  </span>
                  <span className="text-zinc-400">/mo</span>
                  {billingCycle === 'annual' && (
                    <p className="text-sm text-green-400 mt-1">
                      Save ${plan.price * 12 - plan.annual}/year
                    </p>
                  )}
                </div>

                {plan.trial > 0 && (
                  <p className="mt-2 text-sm text-cyan-400">{plan.trial}-day free trial</p>
                )}

                <a
                  href={billingCycle === 'annual' ? plan.stripeAnnual : plan.stripeMonthly}
                  className={`mt-6 block w-full rounded-lg py-3 text-center font-medium transition-all ${
                    plan.popular
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:opacity-90'
                      : 'border border-zinc-700 text-white hover:bg-zinc-800'
                  }`}
                >
                  Get {plan.name}
                </a>

                <ul className="mt-6 space-y-2">
                  {plan.includes.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-zinc-300">
                      <Check className="h-4 w-4 flex-shrink-0 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rocket+ AI Mods - Value Add */}
      <section className="py-16 bg-gradient-to-r from-orange-500/10 via-red-500/10 to-orange-500/10 border-y border-orange-500/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white">
              <span className="text-orange-500">Rocket+</span> AI Mods
            </h2>
            <p className="mt-2 text-zinc-400">
              Add AI superpowers to any plan for just $99/mo
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: 'RocketFlow', desc: 'AI workflow automation' },
              { name: 'Content AI', desc: 'Generate & rewrite content' },
              { name: 'APEX AI', desc: 'A/B testing optimization' },
              { name: 'Course Generator', desc: 'Create courses instantly' },
              { name: 'Health Score', desc: 'Contact engagement scoring' },
              { name: 'RSS Engine', desc: 'Automated content posting' },
              { name: 'Auto-SEO', desc: 'SEO optimization tools' },
              { name: 'AI Insights', desc: 'Analytics & predictions' },
            ].map((mod) => (
              <div key={mod.name} className="rounded-xl border border-orange-500/30 bg-zinc-900/50 p-4">
                <div className="flex items-center gap-3">
                  <Zap className="h-5 w-5 text-orange-500" />
                  <div>
                    <h3 className="font-medium text-white">{mod.name}</h3>
                    <p className="text-xs text-zinc-400">{mod.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <button
              onClick={() => {
                if (!selectedFeatures.includes('rocket-ai')) {
                  setSelectedFeatures(prev => [...prev, 'rocket-ai'])
                }
                document.getElementById('builder')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold hover:opacity-90 transition-opacity"
            >
              <Bot className="h-5 w-5" />
              Add AI Mods to My Plan
            </button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              { q: 'Can I really change my plan anytime?', a: 'Yes! Add or remove features whenever you want. Changes take effect immediately. No contracts, no penalties, complete flexibility.' },
              { q: 'What if I start small and need to scale?', a: 'Perfect! Start with one feature, add more as you grow. You can go from $25/mo to enterprise-level without switching platforms.' },
              { q: 'How does the billing work for custom plans?', a: 'Simple: add up your features and that\'s your monthly cost. Annual billing saves you 15%. Promo codes work on everything.' },
              { q: 'Can I switch from a bundle to custom?', a: 'Absolutely! Switch anytime. We\'ll prorate your billing and you only pay for what you use going forward.' },
              { q: 'Is there a free trial?', a: 'Starter and Scale bundles include free trials. For custom plans, you can try individual features risk-free with our 14-day money-back guarantee.' },
            ].map((faq, i) => (
              <div key={i} className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
                <h3 className="font-semibold text-white">{faq.q}</h3>
                <p className="mt-2 text-zinc-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 border-t border-zinc-800">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold text-white">Ready to Build Your Perfect CRM?</h2>
          <p className="mt-4 text-lg text-zinc-400">
            Start with exactly what you need. Scale when you're ready.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#builder"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-4 font-bold text-white hover:opacity-90 transition-opacity"
            >
              Start Building
              <ArrowRight className="h-5 w-5" />
            </a>
            <a href="https://rocketopp.com" target="_blank" className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 px-8 py-4 font-medium text-white hover:bg-zinc-800 transition-colors">
              Need Help Deciding?
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <p className="text-sm text-zinc-500">
            {new Date().getFullYear()} Rocket+CRM by RocketOpp. Powered by GoHighLevel.
          </p>
        </div>
      </footer>
    </div>
  )
}
