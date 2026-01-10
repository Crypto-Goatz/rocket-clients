// ============================================================
// RocketClients - BUILD YOUR OWN CRM - Final Pricing
// ============================================================
// Base included free. Pay only for what you need. Change anytime.
// ============================================================

'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  Rocket,
  Check,
  X,
  ArrowRight,
  Star,
  Sparkles,
  Zap,
  Users,
  MessageSquare,
  Mail,
  Calendar,
  Globe,
  Phone,
  Instagram,
  FileText,
  Workflow,
  Bot,
  CreditCard,
  Target,
  PieChart,
  Palette,
  ShoppingCart,
  BookOpen,
  RefreshCw,
  Shuffle,
  Gift,
  Tag,
  Percent,
  ChevronDown,
  BarChart3,
  FolderOpen,
  CheckSquare,
  Image,
  Package
} from 'lucide-react'

// ============================================================
// BASE FEATURES (Included FREE with any purchase)
// ============================================================
const baseFeatures = [
  { name: 'Contacts & CRM', description: 'Contact management, tags, segments, custom fields', icon: Users, value: 35 },
  { name: 'Media Library', description: 'File storage, images, documents, assets', icon: Image, value: 15 },
  { name: 'Forms', description: 'Lead capture forms, submissions, notifications', icon: FileText, value: 25 },
  { name: 'Tasks', description: 'Task management, assignments, due dates', icon: CheckSquare, value: 15 },
  { name: 'Calendar & Booking', description: 'Online scheduling, appointments, reminders', icon: Calendar, value: 30 },
  { name: 'Reporting & Dashboard', description: 'Analytics, stats, performance tracking', icon: BarChart3, value: 35 },
]

const baseValue = baseFeatures.reduce((sum, f) => sum + f.value, 0) // $155 value

// ============================================================
// PAID FEATURES (Add what you need)
// ============================================================
const paidFeatures = [
  { id: 'funnels', name: 'Funnels & Landing Pages', description: 'Drag-and-drop builder, templates, A/B testing', price: 55, icon: Globe, category: 'Websites' },
  { id: 'email-marketing', name: 'Email Marketing', description: 'Campaigns, templates, sequences, analytics', price: 40, icon: Mail, category: 'Marketing' },
  { id: 'sms-marketing', name: 'SMS & Text Marketing', description: 'Two-way texting, bulk SMS, compliance tools', price: 50, icon: Phone, category: 'Marketing' },
  { id: 'unified-inbox', name: 'Unified Inbox', description: 'All conversations in one place - SMS, email, FB, IG', price: 40, icon: MessageSquare, category: 'CRM' },
  { id: 'social-media', name: 'Social Media Manager', description: 'Schedule posts, manage accounts, track engagement', price: 45, icon: Instagram, category: 'Marketing' },
  { id: 'reputation', name: 'Reputation Management', description: 'Review requests, monitoring, Google & Facebook', price: 35, icon: Star, category: 'Marketing' },
  { id: 'pipeline', name: 'Sales Pipeline', description: 'Visual pipelines, deal tracking, opportunities', price: 45, icon: Target, category: 'CRM' },
  { id: 'workflows', name: 'Workflow Automation', description: 'Visual builder, triggers, multi-step campaigns', price: 65, icon: Workflow, category: 'Automation' },
  { id: 'triggers', name: 'Smart Triggers', description: 'Event-based automation, webhooks, integrations', price: 40, icon: Zap, category: 'Automation' },
  { id: 'payments', name: 'Payments & Invoicing', description: 'Accept payments, subscriptions, payment plans', price: 45, icon: CreditCard, category: 'Commerce' },
  { id: 'ecommerce', name: 'E-commerce & Products', description: 'Product catalog, order management, cart', price: 50, icon: ShoppingCart, category: 'Commerce' },
  { id: 'membership', name: 'Membership & Courses', description: 'Course builder, membership areas, drip content', price: 55, icon: BookOpen, category: 'Content' },
  { id: 'communities', name: 'Communities', description: 'Build community spaces, discussions, engagement', price: 40, icon: Users, category: 'Content' },
  { id: 'call-tracking', name: 'Call Tracking', description: 'Track calls, recordings, analytics, attribution', price: 45, icon: Phone, category: 'Analytics' },
  { id: 'rocket-ai', name: 'Rocket+ AI Mods', description: 'Full AI suite: RocketFlow, Content AI, APEX & more', price: 99, icon: Bot, category: 'AI', highlight: true },
]

// ============================================================
// BUNDLE PLANS (For those who want it all)
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
    includes: ['Base Features', 'Funnels', 'Email', 'SMS', 'Inbox', 'Pipeline'],
    featureCount: 5,
  },
  {
    name: 'Growth Bundle',
    description: 'Everything you need to scale',
    price: 425,
    annual: 4250,
    trial: 0,
    stripeMonthly: 'https://buy.stripe.com/6oU6oG3JecSf5Kk4X22wU0e',
    stripeAnnual: 'https://buy.stripe.com/9B65kCbbG3hF6Oodty2wU0g',
    includes: ['Everything in Starter', 'Workflows', 'Social Media', 'Reputation', 'Payments', 'Rocket+ AI'],
    featureCount: 10,
    popular: true,
  },
  {
    name: 'Scale Bundle',
    description: 'Enterprise-grade for agencies',
    price: 925,
    annual: 9250,
    trial: 14,
    stripeMonthly: 'https://buy.stripe.com/7sY6oG3Je19x3Cccpu2wU0i',
    stripeAnnual: 'https://buy.stripe.com/3cI5kC0x2f0nfkU2OU2wU0j',
    includes: ['All 15 Features', 'White-label Platform', 'Unlimited Sub-accounts', 'API Access', 'Priority Support'],
    featureCount: 15,
  }
]

const categories = ['All', 'Marketing', 'CRM', 'Websites', 'Automation', 'Commerce', 'Content', 'Analytics', 'AI']

export default function PricingPage() {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const [activeCategory, setActiveCategory] = useState('All')
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly')
  const [promoCode, setPromoCode] = useState('')

  const toggleFeature = (id: string) => {
    setSelectedFeatures(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    )
  }

  const selectAll = () => setSelectedFeatures(paidFeatures.map(f => f.id))
  const clearAll = () => setSelectedFeatures([])

  const filteredFeatures = useMemo(() => {
    if (activeCategory === 'All') return paidFeatures
    return paidFeatures.filter(f => f.category === activeCategory)
  }, [activeCategory])

  const customTotal = useMemo(() => {
    const base = selectedFeatures.reduce((total, id) => {
      const feature = paidFeatures.find(f => f.id === id)
      return total + (feature?.price || 0)
    }, 0)
    return billingCycle === 'annual' ? Math.round(base * 0.85) : base
  }, [selectedFeatures, billingCycle])

  const monthlyEquivalent = useMemo(() => {
    return selectedFeatures.reduce((total, id) => {
      const feature = paidFeatures.find(f => f.id === id)
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

      {/* HERO */}
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
            Start with a powerful base. Add only what you need.
            Pay for what you use. Change anytime.
          </p>

          {/* Value Props */}
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {[
              { icon: Package, text: '$155 Base Free', color: 'text-green-400' },
              { icon: Shuffle, text: 'Mix & Match', color: 'text-cyan-400' },
              { icon: RefreshCw, text: 'Change Anytime', color: 'text-orange-400' },
              { icon: Tag, text: 'No Contracts', color: 'text-pink-400' },
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

          <div className="mt-10">
            <a href="#builder" className="inline-flex flex-col items-center text-zinc-500 hover:text-cyan-400 transition-colors">
              <span className="text-sm">Start Building</span>
              <ChevronDown className="h-6 w-6 animate-bounce mt-1" />
            </a>
          </div>
        </div>
      </section>

      {/* BASE FEATURES - What's Included Free */}
      <section className="py-12 border-t border-zinc-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-green-500/50 bg-green-500/10 px-4 py-2 mb-4">
              <Check className="h-4 w-4 text-green-400" />
              <span className="text-sm font-medium text-green-400">Included FREE with any plan</span>
            </div>
            <h2 className="text-3xl font-bold text-white">Your Base Platform</h2>
            <p className="mt-2 text-zinc-400">${baseValue} value included at no extra cost</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
            {baseFeatures.map((feature) => (
              <div key={feature.name} className="flex items-start gap-4 rounded-xl border border-green-500/20 bg-green-500/5 p-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-green-500/20">
                  <feature.icon className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{feature.name}</h3>
                  <p className="text-sm text-zinc-400">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BUILD YOUR OWN - Feature Selector */}
      <section id="builder" className="py-16 scroll-mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white">Add Your Features</h2>
              <p className="mt-2 text-zinc-400">Click to add. Pay only for what you select.</p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={selectAll} className="px-4 py-2 rounded-lg border border-zinc-700 text-sm text-zinc-400 hover:text-white hover:border-zinc-600 transition-all">
                Select All
              </button>
              <button onClick={clearAll} className="px-4 py-2 rounded-lg border border-zinc-700 text-sm text-zinc-400 hover:text-white hover:border-zinc-600 transition-all">
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
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredFeatures.map((feature) => {
              const isSelected = selectedFeatures.includes(feature.id)
              const IconComponent = feature.icon
              const displayPrice = billingCycle === 'annual' ? Math.round(feature.price * 0.85) : feature.price
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
                    <div>
                      <span className={`text-xl font-bold ${
                        isSelected
                          ? feature.highlight ? 'text-orange-400' : 'text-cyan-400'
                          : 'text-zinc-300'
                      }`}>
                        ${displayPrice}
                      </span>
                      <span className="text-sm text-zinc-500">/mo</span>
                      {billingCycle === 'annual' && (
                        <span className="ml-2 text-xs text-green-400 line-through">${feature.price}</span>
                      )}
                    </div>
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
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-green-400 bg-green-500/10 px-2 py-1 rounded">Base included</span>
                      <span className="text-zinc-500">+</span>
                      <span className="text-2xl font-bold text-white">{selectedFeatures.length}</span>
                      <span className="text-zinc-400">features</span>
                    </div>
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
                      {selectedFeatures.slice(0, 3).map(id => paidFeatures.find(f => f.id === id)?.name).join(', ')}
                      {selectedFeatures.length > 3 && ` +${selectedFeatures.length - 3} more`}
                    </p>
                  )}
                </div>

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

          {/* Empty state */}
          {selectedFeatures.length === 0 && (
            <div className="mt-8 text-center">
              <p className="text-zinc-500">
                Select features above to build your plan.
                <span className="text-cyan-400 ml-2">Starting at just ${Math.min(...paidFeatures.map(f => f.price))}/mo!</span>
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Quick Start Combos */}
      <section className="py-16 border-t border-zinc-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-white text-center mb-4">Popular Combinations</h3>
          <p className="text-zinc-400 text-center mb-10">Click to auto-select these features</p>

          <div className="grid gap-6 md:grid-cols-4">
            {[
              { name: 'Email Marketer', features: ['email-marketing'], price: 40, color: 'from-blue-500 to-cyan-500' },
              { name: 'Social Pro', features: ['social-media', 'email-marketing'], price: 85, color: 'from-pink-500 to-rose-500' },
              { name: 'Sales Machine', features: ['email-marketing', 'sms-marketing', 'unified-inbox', 'pipeline'], price: 175, color: 'from-green-500 to-emerald-500' },
              { name: 'AI Powered', features: ['email-marketing', 'sms-marketing', 'workflows', 'rocket-ai'], price: 254, color: 'from-orange-500 to-red-500' },
            ].map((combo) => {
              const displayPrice = billingCycle === 'annual' ? Math.round(combo.price * 0.85) : combo.price
              return (
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
                  <p className="mt-1 text-sm text-zinc-400">{combo.features.length} feature{combo.features.length > 1 ? 's' : ''} + Base</p>
                  <p className="mt-4 text-2xl font-bold text-white">${displayPrice}<span className="text-sm text-zinc-500">/mo</span></p>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Bundles - Secondary */}
      <section className="py-24 border-t border-zinc-800 bg-zinc-900/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-zinc-500 text-sm uppercase tracking-wider mb-2">Want it all?</p>
            <h2 className="text-3xl font-bold text-white">Pre-Built Bundles</h2>
            <p className="mt-4 text-zinc-400">Save more when you bundle features together</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {bundlePlans.map((plan) => {
              const displayPrice = billingCycle === 'monthly' ? plan.price : Math.round(plan.annual / 12)
              return (
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
                        <span className="text-sm font-medium text-white">Best Value</span>
                      </div>
                    </div>
                  )}

                  <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
                  <p className="mt-1 text-sm text-zinc-400">{plan.description}</p>

                  <div className="mt-6">
                    <span className="text-4xl font-bold text-white">${displayPrice}</span>
                    <span className="text-zinc-400">/mo</span>
                    {billingCycle === 'annual' && (
                      <p className="text-sm text-green-400 mt-1">Save ${plan.price * 12 - plan.annual}/year</p>
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
              )
            })}
          </div>
        </div>
      </section>

      {/* Rocket+ AI Mods */}
      <section className="py-16 bg-gradient-to-r from-orange-500/10 via-red-500/10 to-orange-500/10 border-y border-orange-500/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white">
              <span className="text-orange-500">Rocket+</span> AI Mods
            </h2>
            <p className="mt-2 text-zinc-400">Add AI superpowers for ${billingCycle === 'annual' ? '84' : '99'}/mo</p>
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
          <h2 className="text-2xl font-bold text-white text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: 'What\'s included in the base?', a: 'Every plan includes Contacts & CRM, Media Library, Forms, Tasks, Calendar & Booking, and Reporting - a $155 value at no extra cost.' },
              { q: 'Can I start with just one feature?', a: 'Absolutely! Start with just Email Marketing for $40/mo or any single feature. Add more whenever you\'re ready.' },
              { q: 'Can I change my features later?', a: 'Yes! Add or remove features anytime. Changes take effect on your next billing cycle. No penalties, no hassle.' },
              { q: 'How does annual billing work?', a: 'Choose annual billing to save 15% on all features. You can switch between monthly and annual anytime.' },
              { q: 'What if I need everything?', a: 'Check out our bundles! The Growth Bundle at $425/mo gives you 10 features and is our most popular option.' },
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
          <h2 className="text-3xl font-bold text-white">Ready to Build Your CRM?</h2>
          <p className="mt-4 text-lg text-zinc-400">
            Start with the base. Add what you need. Scale when you're ready.
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
              Need Help?
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
