// ============================================================
// RocketClients - Revolutionary Pricing Page
// ============================================================
// Core Plans + Build Your Own CRM with 20 Individual Features
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
  Minus
} from 'lucide-react'

// ============================================================
// CORE PLANS (From GHL SaaS Configurator)
// ============================================================
const corePlans = [
  {
    name: 'Starter',
    description: 'Essential tools to get your business online and capturing leads',
    price: 225,
    annual: 2250,
    trial: 7,
    credits: 15,
    snapshot: 'Client Onboarding',
    stripeId: 'prod_JdMRcmRGfEyihr',
    saleLinkMonthly: 'https://buy.stripe.com/5kQbJ0djObObb4E6162wU0a',
    saleLinkAnnual: 'https://buy.stripe.com/5kQbJ0djObObb4E6162wU0a',
    features: [
      'CRM & Contact Management',
      'Email Marketing',
      'SMS Marketing',
      'Calendar & Booking',
      'Landing Pages',
      'Basic Automations',
      'Unified Inbox',
      'Mobile App Access',
    ],
    notIncluded: [
      'Advanced Automations',
      'Funnels & Websites',
      'Membership Areas',
      'Rocket+ AI Mods',
    ],
    cta: 'Start 7-Day Trial',
    popular: false
  },
  {
    name: 'Growth',
    description: 'Full-featured CRM with advanced automation and AI tools',
    price: 425,
    annual: 4225,
    trial: 0,
    credits: 50,
    snapshot: null,
    stripeId: 'prod_JdMRXZlBzDFyMQ',
    saleLinkMonthly: 'https://buy.stripe.com/6oU6oG3JecSf5Kk4X22wU0e',
    saleLinkAnnual: 'https://buy.stripe.com/9B65kCbbG3hF6Oodty2wU0g',
    features: [
      'Everything in Starter',
      'Advanced Automations',
      'Unlimited Funnels & Pages',
      'Membership & Courses',
      'Reputation Management',
      'Social Media Planner',
      'Invoicing & Payments',
      'Rocket+ AI Mods',
      'Priority Support',
    ],
    notIncluded: [
      'White-label',
      'Sub-accounts',
    ],
    cta: 'Get Started',
    popular: true
  },
  {
    name: 'Scale',
    description: 'Enterprise solution for agencies and large teams',
    price: 925,
    annual: 9500,
    trial: 14,
    credits: 100,
    snapshot: 'Starter Snapshot',
    stripeId: 'prod_JdMRbcFNwBalSm',
    saleLinkMonthly: 'https://buy.stripe.com/7sY6oG3Je19x3Cccpu2wU0i',
    saleLinkAnnual: 'https://buy.stripe.com/3cI5kC0x2f0nfkU2OU2wU0j',
    features: [
      'Everything in Growth',
      'Unlimited Sub-accounts',
      'White-label Platform',
      'Custom Branding',
      'API Access',
      'Dedicated Success Manager',
      'Advanced Reporting',
      'All Rocket+ AI Mods',
      'Phone Support',
    ],
    notIncluded: [],
    cta: 'Start 14-Day Trial',
    popular: false
  }
]

// ============================================================
// BUILD YOUR OWN - 20 Individual Features
// ============================================================
const individualFeatures = [
  // Communication & Marketing
  {
    id: 'social-media',
    name: 'Social Media Manager',
    description: 'Schedule posts, manage accounts, track engagement across all platforms',
    price: 45,
    icon: Instagram,
    category: 'Marketing'
  },
  {
    id: 'email-marketing',
    name: 'Email Marketing',
    description: 'Campaigns, templates, automation, analytics, and deliverability tools',
    price: 40,
    icon: Mail,
    category: 'Marketing'
  },
  {
    id: 'sms-marketing',
    name: 'SMS & Text Marketing',
    description: 'Two-way texting, bulk SMS, templates, and compliance tools',
    price: 50,
    icon: Phone,
    category: 'Marketing'
  },
  {
    id: 'reputation',
    name: 'Reputation Management',
    description: 'Review requests, monitoring, Google & Facebook review management',
    price: 35,
    icon: Star,
    category: 'Marketing'
  },

  // CRM & Contacts
  {
    id: 'crm-contacts',
    name: 'CRM & Contacts',
    description: 'Contact management, tags, segments, custom fields, and activity tracking',
    price: 35,
    icon: Users,
    category: 'CRM'
  },
  {
    id: 'unified-inbox',
    name: 'Unified Inbox',
    description: 'All conversations in one place - SMS, email, FB, IG, WhatsApp',
    price: 40,
    icon: MessageSquare,
    category: 'CRM'
  },
  {
    id: 'pipeline',
    name: 'Sales Pipeline',
    description: 'Visual pipelines, deal tracking, opportunity management',
    price: 45,
    icon: Target,
    category: 'CRM'
  },

  // Scheduling & Booking
  {
    id: 'calendar',
    name: 'Calendar & Booking',
    description: 'Online scheduling, calendar sync, automated reminders',
    price: 30,
    icon: Calendar,
    category: 'Scheduling'
  },

  // Website & Funnels
  {
    id: 'funnels',
    name: 'Funnels & Landing Pages',
    description: 'Drag-and-drop builder, templates, A/B testing, analytics',
    price: 55,
    icon: Globe,
    category: 'Websites'
  },
  {
    id: 'websites',
    name: 'Full Website Builder',
    description: 'Complete websites with blog, SEO tools, custom domains',
    price: 60,
    icon: Palette,
    category: 'Websites'
  },
  {
    id: 'forms-surveys',
    name: 'Forms & Surveys',
    description: 'Custom forms, surveys, quizzes with conditional logic',
    price: 25,
    icon: FileText,
    category: 'Websites'
  },

  // Automation
  {
    id: 'workflows',
    name: 'Workflow Automation',
    description: 'Visual workflow builder, triggers, conditions, multi-step campaigns',
    price: 65,
    icon: Workflow,
    category: 'Automation'
  },
  {
    id: 'triggers',
    name: 'Smart Triggers',
    description: 'Event-based automation, webhooks, third-party integrations',
    price: 40,
    icon: Zap,
    category: 'Automation'
  },

  // Payments & Commerce
  {
    id: 'payments',
    name: 'Payments & Invoicing',
    description: 'Accept payments, subscriptions, invoices, payment plans',
    price: 45,
    icon: CreditCard,
    category: 'Commerce'
  },
  {
    id: 'ecommerce',
    name: 'E-commerce & Products',
    description: 'Product catalog, order management, shopping cart',
    price: 50,
    icon: ShoppingCart,
    category: 'Commerce'
  },

  // Content & Courses
  {
    id: 'membership',
    name: 'Membership & Courses',
    description: 'Create courses, membership areas, drip content, certificates',
    price: 55,
    icon: BookOpen,
    category: 'Content'
  },
  {
    id: 'communities',
    name: 'Communities',
    description: 'Build community spaces, discussions, member engagement',
    price: 40,
    icon: Users,
    category: 'Content'
  },

  // Analytics & Reporting
  {
    id: 'analytics',
    name: 'Advanced Analytics',
    description: 'Dashboards, reports, attribution, conversion tracking',
    price: 35,
    icon: PieChart,
    category: 'Analytics'
  },
  {
    id: 'call-tracking',
    name: 'Call Tracking',
    description: 'Track calls, recordings, analytics, lead attribution',
    price: 45,
    icon: Phone,
    category: 'Analytics'
  },

  // AI & Rocket+ Mods
  {
    id: 'rocket-ai',
    name: 'Rocket+ AI Mods',
    description: 'Full suite: RocketFlow, Content AI, APEX AI, Course Generator & more',
    price: 99,
    icon: Bot,
    category: 'AI',
    highlight: true
  },
]

const categories = ['All', 'Marketing', 'CRM', 'Scheduling', 'Websites', 'Automation', 'Commerce', 'Content', 'Analytics', 'AI']

export default function PricingPage() {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const [activeCategory, setActiveCategory] = useState('All')
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly')

  const toggleFeature = (id: string) => {
    setSelectedFeatures(prev =>
      prev.includes(id)
        ? prev.filter(f => f !== id)
        : [...prev, id]
    )
  }

  const filteredFeatures = useMemo(() => {
    if (activeCategory === 'All') return individualFeatures
    return individualFeatures.filter(f => f.category === activeCategory)
  }, [activeCategory])

  const customTotal = useMemo(() => {
    return selectedFeatures.reduce((total, id) => {
      const feature = individualFeatures.find(f => f.id === id)
      return total + (feature?.price || 0)
    }, 0)
  }, [selectedFeatures])

  const annualSavings = Math.round(customTotal * 12 * 0.15)

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
              <Link href="/build" className="text-orange-500 hover:text-orange-400 transition-colors">Build Your Own</Link>
            </div>
            <div className="flex items-center gap-3">
              <a href="https://app.rocketclients.com" className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors">Login</a>
              <a href="https://app.rocketclients.com" className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-red-500 rounded-lg hover:opacity-90 transition-opacity">Start Free Trial</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="py-16 text-center">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            Choose Your
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent"> Perfect Plan</span>
          </h1>
          <p className="mt-4 text-lg text-zinc-400">
            Pick a core plan or build your own custom CRM with only the features you need
          </p>

          {/* Billing Toggle */}
          <div className="mt-8 inline-flex items-center gap-4 rounded-full border border-zinc-700 bg-zinc-800/50 p-1">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                billingCycle === 'monthly' ? 'bg-orange-500 text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                billingCycle === 'annual' ? 'bg-orange-500 text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Annual <span className="text-green-400 text-xs ml-1">Save 15%</span>
            </button>
          </div>
        </div>
      </section>

      {/* Core Plans */}
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {corePlans.map((plan) => (
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

                <div>
                  <h3 className="text-2xl font-semibold text-white">{plan.name}</h3>
                  <p className="mt-2 text-sm text-zinc-400">{plan.description}</p>
                </div>

                <div className="mt-6">
                  <span className="text-5xl font-bold text-white">
                    ${billingCycle === 'monthly' ? plan.price : Math.round(plan.annual / 12)}
                  </span>
                  <span className="text-zinc-400">/month</span>
                  {billingCycle === 'annual' && (
                    <p className="text-sm text-green-400 mt-1">
                      ${plan.annual}/year (save ${plan.price * 12 - plan.annual})
                    </p>
                  )}
                </div>

                {/* Trial & Credits */}
                <div className="mt-4 flex items-center gap-4 text-sm">
                  {plan.trial > 0 && (
                    <span className="text-zinc-400">
                      <span className="text-white font-medium">{plan.trial}</span> day trial
                    </span>
                  )}
                  <span className="text-zinc-400">
                    <span className="text-white font-medium">${plan.credits}</span> credits
                  </span>
                </div>

                <a
                  href={billingCycle === 'annual' ? plan.saleLinkAnnual : plan.saleLinkMonthly}
                  className={`mt-6 block w-full rounded-lg py-3 text-center font-medium transition-all ${
                    plan.popular
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:opacity-90'
                      : 'border border-zinc-700 text-white hover:bg-zinc-800'
                  }`}
                >
                  {plan.cta}
                </a>

                <ul className="mt-8 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <Check className="h-5 w-5 flex-shrink-0 text-green-500" />
                      <span className="text-sm text-zinc-300">{feature}</span>
                    </li>
                  ))}
                  {plan.notIncluded.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <X className="h-5 w-5 flex-shrink-0 text-zinc-600" />
                      <span className="text-sm text-zinc-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                {plan.snapshot && (
                  <div className="mt-6 pt-4 border-t border-zinc-800">
                    <p className="text-xs text-zinc-500">
                      Includes <span className="text-zinc-400">{plan.snapshot}</span> snapshot
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BUILD YOUR OWN SECTION */}
      <section className="py-24 bg-gradient-to-b from-zinc-900 to-zinc-950 border-t border-zinc-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/50 bg-cyan-500/10 px-4 py-2 mb-6">
              <Wrench className="h-4 w-4 text-cyan-500" />
              <span className="text-sm font-medium text-cyan-500">Industry First</span>
            </div>
            <h2 className="text-4xl font-bold text-white sm:text-5xl">
              Build Your Own
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"> CRM</span>
            </h2>
            <p className="mt-4 text-lg text-zinc-400 max-w-2xl mx-auto">
              Why pay for features you don't need? Select only what you want and create the perfect plan for your business.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
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
              return (
                <button
                  key={feature.id}
                  onClick={() => toggleFeature(feature.id)}
                  className={`relative rounded-xl border p-6 text-left transition-all ${
                    isSelected
                      ? feature.highlight
                        ? 'border-orange-500 bg-orange-500/10'
                        : 'border-cyan-500 bg-cyan-500/10'
                      : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                      isSelected
                        ? feature.highlight ? 'bg-orange-500' : 'bg-cyan-500'
                        : 'bg-zinc-800'
                    }`}>
                      <feature.icon className={`h-5 w-5 ${isSelected ? 'text-white' : 'text-zinc-400'}`} />
                    </div>
                    <div className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                      isSelected
                        ? feature.highlight ? 'border-orange-500 bg-orange-500' : 'border-cyan-500 bg-cyan-500'
                        : 'border-zinc-700'
                    }`}>
                      {isSelected && <Check className="h-4 w-4 text-white" />}
                    </div>
                  </div>
                  <h3 className="mt-4 font-semibold text-white">{feature.name}</h3>
                  <p className="mt-1 text-sm text-zinc-400 line-clamp-2">{feature.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className={`text-lg font-bold ${
                      feature.highlight ? 'text-orange-500' : 'text-cyan-400'
                    }`}>
                      ${feature.price}/mo
                    </span>
                    <span className="text-xs text-zinc-500">{feature.category}</span>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Sticky Total Bar */}
          {selectedFeatures.length > 0 && (
            <div className="sticky bottom-4 mt-8">
              <div className="mx-auto max-w-3xl rounded-2xl border border-cyan-500/50 bg-zinc-900/95 backdrop-blur-lg p-6 shadow-2xl shadow-cyan-500/10">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <p className="text-zinc-400">
                      <span className="text-white font-medium">{selectedFeatures.length}</span> features selected
                    </p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-white">${customTotal}</span>
                      <span className="text-zinc-400">/month</span>
                      {billingCycle === 'annual' && (
                        <span className="text-sm text-green-400">
                          (Save ${annualSavings}/year)
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setSelectedFeatures([])}
                      className="px-4 py-2 rounded-lg border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-600 transition-all"
                    >
                      Clear All
                    </button>
                    <a
                      href={`https://app.rocketclients.com/custom?features=${selectedFeatures.join(',')}&total=${customTotal}`}
                      className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold hover:opacity-90 transition-opacity"
                    >
                      Build This Plan
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Comparison Helper */}
          <div className="mt-12 text-center">
            <p className="text-zinc-500">
              Not sure what you need?
              <span className="text-cyan-400 ml-2">Our AI can recommend the perfect features for your business</span>
            </p>
            <a
              href="/build"
              className="mt-4 inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium"
            >
              <Bot className="h-4 w-4" />
              Try AI Plan Builder
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Rocket+ Mods Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500/10 via-red-500/10 to-orange-500/10 border-y border-orange-500/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">
              <span className="text-orange-500">Rocket+</span> AI Mods
            </h2>
            <p className="mt-4 text-lg text-zinc-400">
              Included with Growth, Scale, or add to any custom plan for $99/mo
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
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {[
              { q: 'Can I change my plan later?', a: 'Yes! Upgrade, downgrade, or add/remove features anytime. Changes take effect at your next billing cycle.' },
              { q: 'What if I need help choosing?', a: 'Our AI Plan Builder analyzes your business needs and recommends the perfect features. Or contact our team for a free consultation.' },
              { q: 'Are there any setup fees?', a: 'No setup fees ever. Get started immediately after signing up.' },
              { q: 'What payment methods do you accept?', a: 'All major credit cards, ACH bank transfers, and we also accept cryptocurrency.' },
              { q: 'Can I get a custom enterprise plan?', a: 'Absolutely! Contact RocketOpp for fully custom solutions tailored to your specific requirements.' },
            ].map((faq, i) => (
              <div key={i} className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
                <h3 className="font-semibold text-white">{faq.q}</h3>
                <p className="mt-2 text-zinc-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-zinc-800">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold text-white">Ready to Get Started?</h2>
          <p className="mt-4 text-lg text-zinc-400">
            Pick a plan or build your own — either way, you're in control.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://app.rocketclients.com" className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 px-8 py-3 font-semibold text-white hover:opacity-90 transition-opacity">
              Start Free Trial
              <ArrowRight className="h-5 w-5" />
            </a>
            <a href="https://rocketopp.com" target="_blank" className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-8 py-3 font-semibold text-white hover:bg-zinc-800 transition-colors">
              Need Custom Solution?
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
