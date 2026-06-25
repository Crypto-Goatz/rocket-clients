'use client'

import { useState, useMemo, useEffect, FormEvent } from 'react'
import { NebulaBg } from '@/components/NebulaBg'
import {
  Loader2, Check, ArrowRight, Star, Sparkles, Zap, Users, MessageSquare,
  Mail, Calendar, Globe, Phone, Instagram, FileText, Workflow, Bot,
  CreditCard, Target, BookOpen, RefreshCw, Shuffle, Gift, Tag, ChevronDown,
  BarChart3, CheckSquare, Image, Package, ShoppingCart,
} from 'lucide-react'

const baseFeatures = [
  { name: 'Contacts & CRM', description: 'Contact management, tags, segments, custom fields', icon: Users, value: 35 },
  { name: 'Media Library', description: 'File storage, images, documents, assets', icon: Image, value: 15 },
  { name: 'Forms', description: 'Lead capture forms, submissions, notifications', icon: FileText, value: 25 },
  { name: 'Tasks', description: 'Task management, assignments, due dates', icon: CheckSquare, value: 15 },
  { name: 'Calendar & Booking', description: 'Online scheduling, appointments, reminders', icon: Calendar, value: 30 },
  { name: 'Reporting & Dashboard', description: 'Analytics, stats, performance tracking', icon: BarChart3, value: 35 },
]
const baseValue = baseFeatures.reduce((sum, f) => sum + f.value, 0)

const ICONS: Record<string, typeof Globe> = {
  'funnels': Globe, 'email-marketing': Mail, 'sms-marketing': Phone,
  'unified-inbox': MessageSquare, 'social-media': Instagram, 'reputation': Star,
  'pipeline': Target, 'workflows': Workflow, 'triggers': Zap, 'payments': CreditCard,
  'ecommerce': ShoppingCart, 'membership': BookOpen, 'communities': Users,
  'call-tracking': Phone, 'rocket-ai': Bot,
}

interface ApiFeature {
  feature_key: string
  name: string
  description: string
  category: string
  price_cents: number
  stripe_price_id: string
  is_bundle: boolean
  included_features: string[]
  trial_days: number
  highlight: boolean
  popular: boolean
}

export default function PricingPage() {
  const [paidFeatures, setPaidFeatures] = useState<ApiFeature[]>([])
  const [bundlePlans, setBundlePlans] = useState<ApiFeature[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')

  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const [activeCategory, setActiveCategory] = useState('All')
  const [promoCode, setPromoCode] = useState('')
  const [checkoutEmail, setCheckoutEmail] = useState('')
  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const [checkoutError, setCheckoutError] = useState('')
  const [showEmailModal, setShowEmailModal] = useState<{ type: 'custom' | 'bundle'; bundleId?: string } | null>(null)

  useEffect(() => {
    fetch('/api/features')
      .then(r => r.json())
      .then(d => {
        if (d.error) throw new Error(d.error)
        setPaidFeatures(d.features ?? [])
        setBundlePlans(d.bundles ?? [])
      })
      .catch(e => setLoadError(e?.message || 'Failed to load pricing'))
      .finally(() => setLoading(false))
  }, [])

  const categories = useMemo(() => {
    const cats = new Set(paidFeatures.map(f => f.category))
    return ['All', ...Array.from(cats)]
  }, [paidFeatures])

  const handleCheckout = async (opts: { features?: string[]; bundleId?: string }) => {
    if (!checkoutEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(checkoutEmail)) {
      setCheckoutError('Please enter a valid email address')
      return
    }
    setCheckoutLoading(true)
    setCheckoutError('')
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: checkoutEmail,
          features: opts.features,
          bundleId: opts.bundleId,
          promoCode: promoCode || undefined,
        }),
      })
      const data = await res.json()
      if (data.success && data.checkoutUrl) {
        window.location.href = data.checkoutUrl
      } else {
        setCheckoutError(data.error || 'Something went wrong')
        setCheckoutLoading(false)
      }
    } catch {
      setCheckoutError('Network error. Please try again.')
      setCheckoutLoading(false)
    }
  }

  const toggleFeature = (id: string) => {
    setSelectedFeatures(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id])
  }
  const selectAll = () => setSelectedFeatures(paidFeatures.map(f => f.feature_key))
  const clearAll = () => setSelectedFeatures([])

  const filteredFeatures = useMemo(() => {
    if (activeCategory === 'All') return paidFeatures
    return paidFeatures.filter(f => f.category === activeCategory)
  }, [activeCategory, paidFeatures])

  const customTotal = useMemo(() => {
    return selectedFeatures.reduce((total, key) => {
      const f = paidFeatures.find(p => p.feature_key === key)
      return total + (f ? f.price_cents / 100 : 0)
    }, 0)
  }, [selectedFeatures, paidFeatures])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
      </div>
    )
  }
  if (loadError) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <p className="text-red-400 mb-4">Failed to load pricing: {loadError}</p>
          <button onClick={() => location.reload()} className="px-6 py-2 rounded-lg bg-cyan-500 text-white">Reload</button>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* HERO */}
      <section className="pt-16 pb-8 text-center relative overflow-hidden">
        <NebulaBg variant="hero" />
        <div className="mx-auto max-w-5xl px-4 relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-green-500/50 bg-green-500/10 px-6 py-2 mb-8 animate-pulse">
            <Gift className="h-4 w-4 text-green-400" />
            <span className="text-sm font-medium text-green-400">Special Offer: 20% off your first 3 months with code <span className="font-bold">ROCKET2026</span></span>
          </div>

          <h1 className="text-5xl font-bold text-white sm:text-6xl lg:text-7xl animate-fade-in-up">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">Build Your Own</span>
            <br />
            <span className="text-white">CRM</span>
          </h1>

          <p className="mt-6 text-xl text-zinc-400 max-w-2xl mx-auto animate-fade-in-up stagger-2">
            Start with a powerful base. Add only what you need. Pay for what you use. Change anytime.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4 animate-fade-in-up stagger-3">
            {[
              { icon: Package, text: `$${baseValue} Base Free`, color: 'text-green-400' },
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

          <div className="mt-10">
            <a href="#builder" className="inline-flex flex-col items-center text-zinc-500 hover:text-cyan-400 transition-colors">
              <span className="text-sm">Start Building</span>
              <ChevronDown className="h-6 w-6 animate-bounce mt-1" />
            </a>
          </div>
        </div>
      </section>

      {/* BASE FEATURES */}
      <section className="py-12 border-t border-zinc-800/50">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-green-500/50 bg-green-500/10 px-4 py-2 mb-4">
              <Check className="h-4 w-4 text-green-400" />
              <span className="text-sm font-medium text-green-400">Included FREE with any plan</span>
            </div>
            <h2 className="text-3xl font-bold text-white">Your Base Platform</h2>
            <p className="mt-2 text-zinc-400">${baseValue} value included at no extra cost</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
            {baseFeatures.map((feature, i) => (
              <div key={feature.name} className={`flex items-start gap-4 rounded-xl border border-green-500/20 bg-green-500/5 p-4 animate-fade-in-up stagger-${Math.min(i + 1, 6)}`}>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-500/20">
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

      {/* BUILD YOUR OWN */}
      <section id="builder" className="py-16 scroll-mt-20">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white">Add Your Features</h2>
              <p className="mt-2 text-zinc-400">Click to add. Pay only for what you select.</p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={selectAll} className="px-4 py-2 rounded-lg border border-zinc-700 text-sm text-zinc-400 hover:text-white hover:border-zinc-600 transition-all">Select All</button>
              <button onClick={clearAll} className="px-4 py-2 rounded-lg border border-zinc-700 text-sm text-zinc-400 hover:text-white hover:border-zinc-600 transition-all">Clear All</button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat ? 'bg-cyan-500 text-white' : 'bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredFeatures.map((feature) => {
              const isSelected = selectedFeatures.includes(feature.feature_key)
              const IconComponent = ICONS[feature.feature_key] || Sparkles
              const price = feature.price_cents / 100
              return (
                <button
                  key={feature.feature_key}
                  onClick={() => toggleFeature(feature.feature_key)}
                  className={`group relative rounded-xl border p-5 text-left backdrop-blur-sm transition-all duration-200 ${
                    isSelected
                      ? feature.highlight
                        ? 'border-orange-500 bg-orange-500/10 shadow-lg shadow-orange-500/10'
                        : 'border-cyan-500 bg-cyan-500/10 shadow-lg shadow-cyan-500/10'
                      : 'border-zinc-800/50 bg-zinc-900/30 hover:border-zinc-700/60 hover:bg-zinc-900/50 hover:shadow-md hover:shadow-cyan-500/5'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${
                      isSelected ? (feature.highlight ? 'bg-orange-500' : 'bg-cyan-500') : 'bg-zinc-800 group-hover:bg-zinc-700'
                    }`}>
                      <IconComponent className={`h-5 w-5 ${isSelected ? 'text-white' : 'text-zinc-400'}`} />
                    </div>
                    <div className={`flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all ${
                      isSelected ? (feature.highlight ? 'border-orange-500 bg-orange-500' : 'border-cyan-500 bg-cyan-500') : 'border-zinc-600 group-hover:border-zinc-500'
                    }`}>
                      {isSelected && <Check className="h-4 w-4 text-white" />}
                    </div>
                  </div>
                  <h3 className="mt-4 font-semibold text-white">{feature.name}</h3>
                  <p className="mt-1 text-sm text-zinc-400 line-clamp-2">{feature.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <span className={`text-xl font-bold ${isSelected ? (feature.highlight ? 'text-orange-400' : 'text-cyan-400') : 'text-zinc-300'}`}>
                        ${price}
                      </span>
                      <span className="text-sm text-zinc-500">/mo</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${isSelected ? 'bg-zinc-800 text-zinc-300' : 'bg-zinc-800/50 text-zinc-500'}`}>{feature.category}</span>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Sticky Total Bar */}
          <div className={`sticky bottom-4 mt-8 transition-all duration-300 ${selectedFeatures.length > 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
            <div className="mx-auto max-w-4xl rounded-2xl border border-cyan-500/50 bg-zinc-900/80 backdrop-blur-2xl p-6 shadow-2xl shadow-cyan-500/20">
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
                    </div>
                  </div>
                  {selectedFeatures.length > 0 && (
                    <p className="mt-2 text-sm text-zinc-500">
                      {selectedFeatures.slice(0, 3).map(key => paidFeatures.find(f => f.feature_key === key)?.name).join(', ')}
                      {selectedFeatures.length > 3 && ` +${selectedFeatures.length - 3} more`}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="relative">
                    <input type="text" placeholder="Promo code" value={promoCode} onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                      className="w-28 px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm placeholder:text-zinc-500 focus:outline-none focus:border-cyan-500" />
                    {promoCode === 'ROCKET2026' && <Check className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-400" />}
                  </div>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={checkoutEmail}
                    onChange={(e) => { setCheckoutEmail(e.target.value); setCheckoutError('') }}
                    className="w-48 px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm placeholder:text-zinc-500 focus:outline-none focus:border-cyan-500"
                  />
                  <button
                    onClick={() => handleCheckout({ features: selectedFeatures })}
                    disabled={checkoutLoading}
                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold text-lg hover:opacity-90 transition-all hover:shadow-lg hover:shadow-cyan-500/25 disabled:opacity-50 flex items-center gap-2"
                  >
                    {checkoutLoading ? <><Loader2 className="h-5 w-5 animate-spin" /> Processing...</> : 'Get Started'}
                  </button>
                </div>
                {checkoutError && <p className="text-red-400 text-sm mt-2 text-right">{checkoutError}</p>}
              </div>
            </div>
          </div>

          {selectedFeatures.length === 0 && paidFeatures.length > 0 && (
            <div className="mt-8 text-center">
              <p className="text-zinc-500">
                Select features above to build your plan.
                <span className="text-cyan-400 ml-2">Starting at just ${Math.min(...paidFeatures.map(f => f.price_cents / 100))}/mo!</span>
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Quick Start Combos */}
      <section className="py-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-white text-center mb-4">Popular Combinations</h3>
          <p className="text-zinc-400 text-center mb-10">Click to auto-select these features</p>
          <div className="grid gap-6 md:grid-cols-4">
            {[
              { name: 'Email Marketer', features: ['email-marketing'], color: 'from-blue-500 to-cyan-500' },
              { name: 'Social Pro', features: ['social-media', 'email-marketing'], color: 'from-pink-500 to-rose-500' },
              { name: 'Sales Machine', features: ['email-marketing', 'sms-marketing', 'unified-inbox', 'pipeline'], color: 'from-green-500 to-emerald-500' },
              { name: 'AI Powered', features: ['email-marketing', 'sms-marketing', 'workflows', 'rocket-ai'], color: 'from-orange-500 to-red-500' },
            ].map((combo) => {
              const total = combo.features.reduce((sum, k) => sum + (paidFeatures.find(p => p.feature_key === k)?.price_cents ?? 0), 0) / 100
              return (
                <button key={combo.name} onClick={() => setSelectedFeatures(combo.features)}
                  className="group rounded-xl border border-zinc-800/50 bg-zinc-900/30 backdrop-blur-sm p-6 text-left hover:border-zinc-700/60 hover:bg-zinc-900/50 hover:shadow-md transition-all">
                  <div className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${combo.color} px-3 py-1 mb-4`}>
                    <Sparkles className="h-3 w-3 text-white" />
                    <span className="text-xs font-medium text-white">Quick Start</span>
                  </div>
                  <h4 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">{combo.name}</h4>
                  <p className="mt-1 text-sm text-zinc-400">{combo.features.length} feature{combo.features.length > 1 ? 's' : ''} + Base</p>
                  <p className="mt-4 text-2xl font-bold text-white">${total}<span className="text-sm text-zinc-500">/mo</span></p>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Bundles */}
      <section className="py-24 border-t border-zinc-800/50 bg-zinc-900/10">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-zinc-500 text-sm uppercase tracking-wider mb-2">Want it all?</p>
            <h2 className="text-3xl font-bold text-white">Pre-Built Bundles</h2>
            <p className="mt-4 text-zinc-400">Save more when you bundle features together</p>
          </div>
          <div className="grid gap-8 lg:grid-cols-3 max-w-5xl mx-auto">
            {bundlePlans.map((plan) => {
              const price = plan.price_cents / 100
              return (
                <div key={plan.feature_key}
                  className={`relative rounded-2xl border backdrop-blur-sm ${plan.popular ? 'border-2 border-orange-500 bg-zinc-900/40 shadow-lg shadow-orange-500/10' : 'border-zinc-800/50 bg-zinc-900/30 hover:border-zinc-700/60'} p-8`}>
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
                    <span className="text-4xl font-bold text-white">${price}</span>
                    <span className="text-zinc-400">/mo</span>
                  </div>
                  {plan.trial_days > 0 && <p className="mt-2 text-sm text-cyan-400">{plan.trial_days}-day free trial</p>}
                  <button
                    onClick={() => { setShowEmailModal({ type: 'bundle', bundleId: plan.feature_key }); setCheckoutError('') }}
                    className={`mt-6 block w-full rounded-lg py-3 text-center font-medium transition-all ${
                      plan.popular ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:opacity-90' : 'border border-zinc-700 text-white hover:bg-zinc-800'
                    }`}>
                    Get {plan.name}
                  </button>
                  <ul className="mt-6 space-y-2">
                    {plan.included_features.map((featureKey) => {
                      const f = paidFeatures.find(p => p.feature_key === featureKey)
                      return (
                        <li key={featureKey} className="flex items-center gap-2 text-sm text-zinc-300">
                          <Check className="h-4 w-4 shrink-0 text-green-500" />
                          {f?.name ?? featureKey}
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Rocket+ AI Mods */}
      <section className="relative py-16 bg-gradient-to-r from-orange-500/5 via-red-500/5 to-orange-500/5 border-y border-orange-500/20 overflow-hidden">
        <NebulaBg variant="subtle" />
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white"><span className="text-orange-500">Rocket+</span> AI Mods</h2>
            <p className="mt-2 text-zinc-400">Add AI superpowers for ${(paidFeatures.find(f => f.feature_key === 'rocket-ai')?.price_cents ?? 9900) / 100}/mo</p>
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
              <div key={mod.name} className="rounded-xl border border-orange-500/30 bg-zinc-900/30 backdrop-blur-sm p-4 hover:bg-zinc-900/50 transition-colors">
                <div className="flex items-center gap-3">
                  <Zap className="h-5 w-5 text-orange-500 shrink-0" />
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
                if (!selectedFeatures.includes('rocket-ai')) setSelectedFeatures(prev => [...prev, 'rocket-ai'])
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
              { q: 'What\'s included in the base?', a: `Every plan includes Contacts & CRM, Media Library, Forms, Tasks, Calendar & Booking, and Reporting - a $${baseValue} value at no extra cost.` },
              { q: 'Can I start with just one feature?', a: 'Absolutely! Start with just Email Marketing for $40/mo or any single feature. Add more whenever you\'re ready.' },
              { q: 'Can I change my features later?', a: 'Yes! Add or remove features anytime. Changes take effect on your next billing cycle. No penalties, no hassle.' },
              { q: 'What if I need everything?', a: 'Check out our bundles! The Growth Bundle gives you 10 features and is our most popular option.' },
            ].map((faq, i) => (
              <div key={i} className="rounded-xl border border-zinc-800/50 bg-zinc-900/30 backdrop-blur-sm p-6 hover:border-zinc-700/60 hover:bg-zinc-900/50 transition-all">
                <h3 className="font-semibold text-white">{faq.q}</h3>
                <p className="mt-2 text-zinc-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold text-white">Ready to Build Your CRM?</h2>
          <p className="mt-4 text-lg text-zinc-400">Start with the base. Add what you need. Scale when you&apos;re ready.</p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#builder" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-4 font-bold text-white hover:opacity-90 transition-opacity">
              Start Building <ArrowRight className="h-5 w-5" />
            </a>
            <a href="https://rocketopp.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 px-8 py-4 font-medium text-white hover:bg-zinc-800 transition-colors">
              Need Help?
            </a>
          </div>
        </div>
      </section>

      {/* Email Modal for Bundle Checkout */}
      {showEmailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <h3 className="text-xl font-bold text-white">Enter Your Email</h3>
            <p className="mt-2 text-sm text-zinc-400">
              {showEmailModal.type === 'bundle'
                ? `Get started with the ${bundlePlans.find(b => b.feature_key === showEmailModal.bundleId)?.name || 'bundle'}`
                : 'Complete your custom plan checkout'}
            </p>
            <form onSubmit={(e: FormEvent) => {
              e.preventDefault()
              handleCheckout(
                showEmailModal.type === 'bundle'
                  ? { bundleId: showEmailModal.bundleId }
                  : { features: selectedFeatures }
              )
            }}>
              <input
                type="email"
                placeholder="your@email.com"
                value={checkoutEmail}
                onChange={(e) => { setCheckoutEmail(e.target.value); setCheckoutError('') }}
                autoFocus
                className="mt-4 w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-500 focus:outline-none focus:border-cyan-500"
              />
              {checkoutError && <p className="mt-2 text-sm text-red-400">{checkoutError}</p>}
              <button
                type="submit"
                disabled={checkoutLoading}
                className="mt-4 w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {checkoutLoading ? <><Loader2 className="h-5 w-5 animate-spin" /> Processing...</> : 'Continue to Checkout'}
              </button>
            </form>
            <button
              onClick={() => { setShowEmailModal(null); setCheckoutError('') }}
              className="mt-3 w-full py-2 text-sm text-zinc-500 hover:text-white transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
