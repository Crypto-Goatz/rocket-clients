// ============================================================
// RocketClients - Features Page
// ============================================================
// Detailed features breakdown for Rocket+CRM
// ============================================================

'use client'

import Link from 'next/link'
import {
  Rocket,
  Users,
  MessageSquare,
  Calendar,
  Zap,
  Globe,
  BarChart3,
  Mail,
  Phone,
  Instagram,
  Facebook,
  ArrowRight,
  Check,
  Sparkles,
  Target,
  DollarSign,
  FileText,
  Workflow,
  Bot,
  Shield,
  Clock,
  Smartphone,
  PieChart,
  Bell,
  GitBranch
} from 'lucide-react'

const featureCategories = [
  {
    title: 'Contact Management',
    icon: Users,
    description: 'Organize and segment your contacts with powerful CRM tools',
    features: [
      'Unlimited contacts storage',
      'Smart tags and segments',
      'Contact scoring',
      'Custom fields',
      'Import/export CSV',
      'Duplicate detection',
      'Activity timeline',
      'Contact notes'
    ]
  },
  {
    title: 'Unified Inbox',
    icon: MessageSquare,
    description: 'All your conversations in one place',
    features: [
      'SMS two-way messaging',
      'Email inbox',
      'Facebook Messenger',
      'Instagram DMs',
      'WhatsApp (Business)',
      'Google Business Messages',
      'Live chat widget',
      'Conversation assignments'
    ]
  },
  {
    title: 'Appointment Scheduling',
    icon: Calendar,
    description: 'Let customers book time with you automatically',
    features: [
      'Multiple calendars',
      'Booking widgets',
      'Google Calendar sync',
      'Automated reminders',
      'Buffer times',
      'Team scheduling',
      'Zoom integration',
      'Payment collection'
    ]
  },
  {
    title: 'Marketing Automation',
    icon: Workflow,
    description: 'Build powerful automated workflows',
    features: [
      'Visual workflow builder',
      'Trigger-based automation',
      'Drip campaigns',
      'Lead nurturing sequences',
      'Abandoned cart recovery',
      'Birthday/anniversary triggers',
      'Multi-channel workflows',
      'A/B testing'
    ]
  },
  {
    title: 'Website & Funnels',
    icon: Globe,
    description: 'Build high-converting pages without code',
    features: [
      'Drag-and-drop builder',
      'Landing pages',
      'Sales funnels',
      'Full websites',
      'Blog functionality',
      'Custom domains',
      'SSL certificates',
      'Mobile responsive'
    ]
  },
  {
    title: 'Email Marketing',
    icon: Mail,
    description: 'Professional email campaigns that convert',
    features: [
      'Visual email builder',
      'Pre-built templates',
      'Personalization',
      'A/B testing',
      'Scheduled sending',
      'Open/click tracking',
      'Unsubscribe management',
      'Deliverability optimization'
    ]
  },
  {
    title: 'SMS Marketing',
    icon: Phone,
    description: 'Reach customers instantly with text messaging',
    features: [
      'Mass SMS campaigns',
      'Personalized messaging',
      'Link tracking',
      'Two-way conversations',
      'SMS templates',
      'Compliance tools',
      'Number masking',
      'MMS support'
    ]
  },
  {
    title: 'Analytics & Reporting',
    icon: BarChart3,
    description: 'Data-driven insights to grow faster',
    features: [
      'Real-time dashboard',
      'Conversion tracking',
      'Revenue attribution',
      'Campaign analytics',
      'Funnel analytics',
      'Custom reports',
      'Export data',
      'Goal tracking'
    ]
  }
]

const rocketPlusFeatures = [
  {
    name: 'RocketFlow',
    icon: GitBranch,
    description: 'AI-powered JSON workflow automation. Create complex automations using natural language and deploy them instantly.',
    benefits: ['Natural language workflow creation', 'Intelligent action sequencing', 'Auto-error handling']
  },
  {
    name: 'AI Course Generator',
    icon: FileText,
    description: 'Generate complete courses with lessons, quizzes, and certificates using AI. Import directly into your membership area.',
    benefits: ['Full course outlines in seconds', 'Automatic quiz generation', 'GHL course import']
  },
  {
    name: 'APEX AI',
    icon: Target,
    description: 'Multi-armed bandit A/B testing that automatically optimizes your campaigns in real-time.',
    benefits: ['Self-optimizing tests', 'Real-time winner selection', 'Revenue-focused optimization']
  },
  {
    name: 'Content AI',
    icon: Bot,
    description: 'Generate and rewrite marketing content instantly. Blog posts, emails, social media, and more.',
    benefits: ['One-click content generation', 'Brand voice matching', 'Multi-format output']
  },
  {
    name: 'Health Score Monitor',
    icon: PieChart,
    description: 'Automatically score contact engagement and identify at-risk relationships before they churn.',
    benefits: ['Engagement scoring', 'Churn prediction', 'Automated alerts']
  },
  {
    name: 'RSS Content Engine',
    icon: Bell,
    description: 'Automatically generate and publish content from RSS feeds across all your channels.',
    benefits: ['Auto-content curation', 'Multi-channel posting', 'Scheduled publishing']
  }
]

export default function FeaturesPage() {
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
              <Link href="/features" className="text-white font-medium">
                Features
              </Link>
              <Link href="/pricing" className="text-zinc-400 hover:text-white transition-colors">
                Pricing
              </Link>
              <a href="https://rocketadd.com" target="_blank" className="text-zinc-400 hover:text-white transition-colors">
                Rocket+ Mods
              </a>
            </div>
            <div className="flex items-center gap-3">
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
            Everything You Need to
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent"> Grow</span>
          </h1>
          <p className="mt-4 text-lg text-zinc-400">
            One platform. Every tool. Unlimited possibilities.
          </p>
        </div>
      </section>

      {/* Core Features Grid */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            {featureCategories.map((category) => (
              <div
                key={category.title}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 hover:border-zinc-700 transition-colors"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20">
                    <category.icon className="h-6 w-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{category.title}</h3>
                    <p className="text-sm text-zinc-400">{category.description}</p>
                  </div>
                </div>
                <ul className="grid grid-cols-2 gap-3">
                  {category.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-zinc-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-24 border-t border-zinc-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white">Plus So Much More</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
              <DollarSign className="h-8 w-8 text-orange-500 mb-4" />
              <h3 className="font-semibold text-white">Payment Collection</h3>
              <p className="mt-2 text-sm text-zinc-400">Accept payments, sell products, and manage subscriptions</p>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
              <Shield className="h-8 w-8 text-orange-500 mb-4" />
              <h3 className="font-semibold text-white">Reputation Management</h3>
              <p className="mt-2 text-sm text-zinc-400">Collect and manage reviews on Google and Facebook</p>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
              <Instagram className="h-8 w-8 text-orange-500 mb-4" />
              <h3 className="font-semibold text-white">Social Media Planner</h3>
              <p className="mt-2 text-sm text-zinc-400">Schedule posts across all your social channels</p>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
              <Clock className="h-8 w-8 text-orange-500 mb-4" />
              <h3 className="font-semibold text-white">Task Management</h3>
              <p className="mt-2 text-sm text-zinc-400">Assign tasks, set due dates, and track completion</p>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
              <Smartphone className="h-8 w-8 text-orange-500 mb-4" />
              <h3 className="font-semibold text-white">Mobile App</h3>
              <p className="mt-2 text-sm text-zinc-400">Manage everything on the go with iOS and Android apps</p>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
              <Users className="h-8 w-8 text-orange-500 mb-4" />
              <h3 className="font-semibold text-white">Membership Areas</h3>
              <p className="mt-2 text-sm text-zinc-400">Create courses and gated content with user management</p>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
              <Facebook className="h-8 w-8 text-orange-500 mb-4" />
              <h3 className="font-semibold text-white">Facebook Ads Integration</h3>
              <p className="mt-2 text-sm text-zinc-400">Sync leads and track conversions from Meta ads</p>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
              <Zap className="h-8 w-8 text-orange-500 mb-4" />
              <h3 className="font-semibold text-white">Zapier & API</h3>
              <p className="mt-2 text-sm text-zinc-400">Connect to 5000+ apps or build custom integrations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Rocket+ Mods Section */}
      <section className="py-24 bg-gradient-to-r from-orange-500/10 via-red-500/10 to-orange-500/10 border-y border-orange-500/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/50 bg-orange-500/20 px-4 py-2 mb-6">
              <Sparkles className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-medium text-orange-500">Exclusive — Included with Pro Plan</span>
            </div>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              <span className="text-orange-500">Rocket+</span> AI Mods
            </h2>
            <p className="mt-4 text-lg text-zinc-400 max-w-2xl mx-auto">
              Supercharge your CRM with AI-powered automation that learns and optimizes
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {rocketPlusFeatures.map((feature) => (
              <div
                key={feature.name}
                className="rounded-2xl border border-orange-500/30 bg-zinc-900/80 p-8 hover:border-orange-500/50 transition-colors"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-red-500 mb-6">
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">{feature.name}</h3>
                <p className="mt-3 text-zinc-400">{feature.description}</p>
                <ul className="mt-6 space-y-2">
                  {feature.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-orange-500" />
                      <span className="text-sm text-zinc-300">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a
              href="https://rocketadd.com"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 px-8 py-4 font-semibold text-white hover:opacity-90 transition-opacity"
            >
              Explore All Rocket+ Mods
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to Transform Your Business?
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            Join thousands of businesses using Rocket+CRM to capture leads, nurture relationships, and grow revenue.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://app.rocketclients.com"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 px-8 py-4 font-semibold text-white hover:opacity-90 transition-opacity"
            >
              Start 14-Day Free Trial
              <ArrowRight className="h-5 w-5" />
            </a>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-8 py-4 font-semibold text-white hover:bg-zinc-800 transition-colors"
            >
              View Pricing
            </Link>
          </div>
          <p className="mt-4 text-sm text-zinc-500">
            No credit card required • Cancel anytime
          </p>
        </div>
      </section>

      {/* Custom Solutions Banner */}
      <section className="py-16 border-t border-zinc-800">
        <div className="mx-auto max-w-5xl px-4">
          <div className="rounded-2xl border border-violet-500/30 bg-gradient-to-br from-violet-500/10 to-purple-500/10 p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white">Need Something Custom?</h3>
              <p className="mt-3 text-zinc-400">
                RocketOpp builds custom marketing automation solutions for businesses with unique requirements.
                From white-label platforms to enterprise integrations.
              </p>
            </div>
            <a
              href="https://rocketopp.com"
              target="_blank"
              className="flex-shrink-0 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet-500 to-purple-500 px-6 py-3 font-semibold text-white hover:opacity-90 transition-opacity"
            >
              Contact RocketOpp
              <ArrowRight className="h-5 w-5" />
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
