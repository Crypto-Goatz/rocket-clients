// ============================================================
// RocketClients - Pricing Page
// ============================================================
// Detailed pricing tiers for Rocket+CRM
// ============================================================

'use client'

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
  Headphones
} from 'lucide-react'

const plans = [
  {
    name: 'Starter',
    description: 'Perfect for small businesses just getting started with CRM',
    price: 97,
    features: [
      { name: '2,500 contacts', included: true },
      { name: 'Email marketing', included: true },
      { name: 'SMS marketing (pay per use)', included: true },
      { name: '1 user', included: true },
      { name: 'Landing pages', included: true },
      { name: 'Basic automations', included: true },
      { name: 'Calendar booking', included: true },
      { name: 'Email support', included: true },
      { name: 'Advanced automations', included: false },
      { name: 'Rocket+ Mods', included: false },
      { name: 'API access', included: false },
      { name: 'White-label', included: false },
    ],
    cta: 'Get Started',
    popular: false
  },
  {
    name: 'Pro',
    description: 'For growing businesses with AI-powered automation',
    price: 297,
    features: [
      { name: 'Unlimited contacts', included: true },
      { name: 'Email marketing', included: true },
      { name: 'SMS marketing (included credits)', included: true },
      { name: '3 users', included: true },
      { name: 'Unlimited pages & funnels', included: true },
      { name: 'Advanced automations', included: true },
      { name: 'Calendar booking', included: true },
      { name: 'Priority support', included: true },
      { name: 'Rocket+ Mods Included', included: true, highlight: true },
      { name: 'API access', included: true },
      { name: 'Custom integrations', included: true },
      { name: 'White-label', included: false },
    ],
    cta: 'Start Free Trial',
    popular: true
  },
  {
    name: 'Agency',
    description: 'For agencies managing multiple client accounts',
    price: 497,
    features: [
      { name: 'Unlimited everything', included: true },
      { name: 'All marketing channels', included: true },
      { name: 'Unlimited SMS credits', included: true },
      { name: 'Unlimited users', included: true },
      { name: 'Unlimited pages & funnels', included: true },
      { name: 'Advanced automations', included: true },
      { name: 'Multi-calendar booking', included: true },
      { name: 'Dedicated success manager', included: true },
      { name: 'All Rocket+ Mods', included: true, highlight: true },
      { name: 'Full API access', included: true },
      { name: '10+ sub-accounts', included: true },
      { name: 'White-label option', included: true },
    ],
    cta: 'Contact Sales',
    popular: false
  }
]

const faqs = [
  {
    question: 'What is included in the free trial?',
    answer: 'The 14-day free trial includes full access to the Pro plan features. No credit card required to start.'
  },
  {
    question: 'What are Rocket+ Mods?',
    answer: 'Rocket+ Mods are AI-powered enhancements that supercharge your CRM. Including RocketFlow automation, AI content generation, A/B testing optimization, and more.'
  },
  {
    question: 'Can I switch plans later?',
    answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect at your next billing cycle.'
  },
  {
    question: 'Is there a setup fee?',
    answer: 'No setup fees. You can get started immediately after signing up.'
  },
  {
    question: 'Do you offer custom enterprise plans?',
    answer: 'Yes! Contact RocketOpp at rocketopp.com for custom enterprise solutions tailored to your needs.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, ACH bank transfers, and crypto payments (Bitcoin, Ethereum).'
  }
]

const rocketPlusMods = [
  { name: 'RocketFlow', description: 'AI-powered JSON workflow automation' },
  { name: 'AI Course Generator', description: 'Create complete courses instantly' },
  { name: 'APEX AI', description: 'Multi-armed bandit A/B testing' },
  { name: 'Content AI', description: 'Generate & rewrite content' },
  { name: 'Health Score Monitor', description: 'Contact engagement scoring' },
  { name: 'RSS Content Engine', description: 'Automated content posting' },
  { name: 'Auto-SEO', description: 'SEO optimization tools' },
  { name: 'AI Insights', description: 'Analytics & predictions' },
]

export default function PricingPage() {
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
              <Link href="/features" className="text-zinc-400 hover:text-white transition-colors">
                Features
              </Link>
              <Link href="/pricing" className="text-white font-medium">
                Pricing
              </Link>
              <a href="https://rocketadd.com" target="_blank" className="text-zinc-400 hover:text-white transition-colors">
                Rocket+ Mods
              </a>
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

      {/* Header */}
      <section className="py-16 text-center">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            Simple, Transparent
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent"> Pricing</span>
          </h1>
          <p className="mt-4 text-lg text-zinc-400">
            Choose the perfect plan for your business. All plans include a 14-day free trial.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl border ${
                  plan.popular
                    ? 'border-2 border-orange-500 bg-zinc-900/80'
                    : 'border-zinc-800 bg-zinc-900/50'
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
                  <span className="text-5xl font-bold text-white">${plan.price}</span>
                  <span className="text-zinc-400">/month</span>
                </div>
                <a
                  href="https://app.rocketclients.com"
                  className={`mt-8 block w-full rounded-lg py-3 text-center font-medium transition-all ${
                    plan.popular
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:opacity-90'
                      : 'border border-zinc-700 text-white hover:bg-zinc-800'
                  }`}
                >
                  {plan.cta}
                </a>
                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature.name} className="flex items-start gap-3">
                      {feature.included ? (
                        <Check className={`h-5 w-5 flex-shrink-0 ${feature.highlight ? 'text-orange-500' : 'text-green-500'}`} />
                      ) : (
                        <X className="h-5 w-5 flex-shrink-0 text-zinc-600" />
                      )}
                      <span className={`text-sm ${
                        feature.included
                          ? feature.highlight
                            ? 'text-white font-medium'
                            : 'text-zinc-300'
                          : 'text-zinc-600'
                      }`}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rocket+ Mods Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500/10 via-red-500/10 to-orange-500/10 border-y border-orange-500/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/50 bg-orange-500/20 px-4 py-2 mb-4">
              <Sparkles className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-medium text-orange-500">Included with Pro & Agency Plans</span>
            </div>
            <h2 className="text-3xl font-bold text-white">
              Rocket+ Mods — AI-Powered Superpowers
            </h2>
            <p className="mt-4 text-lg text-zinc-400 max-w-2xl mx-auto">
              Unlock intelligent automation features that multiply your productivity
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {rocketPlusMods.map((mod) => (
              <div
                key={mod.name}
                className="rounded-xl border border-orange-500/30 bg-zinc-900/50 p-6 hover:border-orange-500/50 transition-colors"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500/20 to-red-500/20">
                  <Zap className="h-5 w-5 text-orange-500" />
                </div>
                <h3 className="mt-4 font-semibold text-white">{mod.name}</h3>
                <p className="mt-1 text-sm text-zinc-400">{mod.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <a
              href="https://rocketadd.com"
              target="_blank"
              className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-400 font-medium"
            >
              Explore all Rocket+ Mods at rocketadd.com
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white text-center mb-12">
            Detailed Feature Comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="py-4 text-left text-sm font-medium text-zinc-400">Feature</th>
                  <th className="py-4 text-center text-sm font-medium text-zinc-400">Starter</th>
                  <th className="py-4 text-center text-sm font-medium text-orange-500">Pro</th>
                  <th className="py-4 text-center text-sm font-medium text-zinc-400">Agency</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                <tr>
                  <td className="py-4 text-sm text-zinc-300 flex items-center gap-2">
                    <Users className="h-4 w-4 text-zinc-500" /> Contacts
                  </td>
                  <td className="py-4 text-center text-sm text-zinc-400">2,500</td>
                  <td className="py-4 text-center text-sm text-white font-medium">Unlimited</td>
                  <td className="py-4 text-center text-sm text-white">Unlimited</td>
                </tr>
                <tr>
                  <td className="py-4 text-sm text-zinc-300 flex items-center gap-2">
                    <Users className="h-4 w-4 text-zinc-500" /> Team Members
                  </td>
                  <td className="py-4 text-center text-sm text-zinc-400">1</td>
                  <td className="py-4 text-center text-sm text-white">3</td>
                  <td className="py-4 text-center text-sm text-white">Unlimited</td>
                </tr>
                <tr>
                  <td className="py-4 text-sm text-zinc-300 flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-zinc-500" /> SMS Credits
                  </td>
                  <td className="py-4 text-center text-sm text-zinc-400">Pay per use</td>
                  <td className="py-4 text-center text-sm text-white">1,000/mo</td>
                  <td className="py-4 text-center text-sm text-white">Unlimited</td>
                </tr>
                <tr>
                  <td className="py-4 text-sm text-zinc-300 flex items-center gap-2">
                    <Zap className="h-4 w-4 text-zinc-500" /> Automations
                  </td>
                  <td className="py-4 text-center text-sm text-zinc-400">Basic</td>
                  <td className="py-4 text-center text-sm text-white">Advanced</td>
                  <td className="py-4 text-center text-sm text-white">Advanced</td>
                </tr>
                <tr>
                  <td className="py-4 text-sm text-zinc-300 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-orange-500" /> Rocket+ Mods
                  </td>
                  <td className="py-4 text-center"><X className="h-4 w-4 text-zinc-600 mx-auto" /></td>
                  <td className="py-4 text-center"><Check className="h-4 w-4 text-orange-500 mx-auto" /></td>
                  <td className="py-4 text-center"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="py-4 text-sm text-zinc-300 flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-zinc-500" /> API Access
                  </td>
                  <td className="py-4 text-center"><X className="h-4 w-4 text-zinc-600 mx-auto" /></td>
                  <td className="py-4 text-center"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                  <td className="py-4 text-center"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="py-4 text-sm text-zinc-300 flex items-center gap-2">
                    <Shield className="h-4 w-4 text-zinc-500" /> White-label
                  </td>
                  <td className="py-4 text-center"><X className="h-4 w-4 text-zinc-600 mx-auto" /></td>
                  <td className="py-4 text-center"><X className="h-4 w-4 text-zinc-600 mx-auto" /></td>
                  <td className="py-4 text-center"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="py-4 text-sm text-zinc-300 flex items-center gap-2">
                    <Headphones className="h-4 w-4 text-zinc-500" /> Support
                  </td>
                  <td className="py-4 text-center text-sm text-zinc-400">Email</td>
                  <td className="py-4 text-center text-sm text-white">Priority</td>
                  <td className="py-4 text-center text-sm text-white">Dedicated Manager</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24 border-t border-zinc-800">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
                <h3 className="font-semibold text-white">{faq.question}</h3>
                <p className="mt-2 text-zinc-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-zinc-800">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold text-white">
            Ready to Get Started?
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            Start your 14-day free trial today. No credit card required.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://app.rocketclients.com"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 px-8 py-3 font-semibold text-white hover:opacity-90 transition-opacity"
            >
              Start Free Trial
              <ArrowRight className="h-5 w-5" />
            </a>
            <a
              href="https://rocketopp.com"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-8 py-3 font-semibold text-white hover:bg-zinc-800 transition-colors"
            >
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
