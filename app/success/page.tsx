// ============================================================
// RocketClients - Post-Purchase Success Page
// ============================================================
// Customers land here after completing Stripe checkout
// GHL automatically creates their sub-account in the background
// ============================================================

import Link from 'next/link'
import {
  Rocket,
  CheckCircle,
  Mail,
  Clock,
  ArrowRight,
  MessageCircle,
  BookOpen,
  Zap
} from 'lucide-react'

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
      {/* Navigation */}
      <nav className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-lg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-red-500">
                <Rocket className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Rocket<span className="text-orange-500">+</span>CRM</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Success Content */}
      <main className="py-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          {/* Success Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 mb-8">
            <CheckCircle className="h-10 w-10 text-white" />
          </div>

          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            Welcome to
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent"> Rocket+CRM</span>!
          </h1>

          <p className="mt-6 text-xl text-zinc-400">
            Your payment was successful. We're setting up your CRM now.
          </p>

          {/* What's Happening */}
          <div className="mt-12 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 text-left">
            <h2 className="text-lg font-semibold text-white mb-6">What happens next:</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-orange-500/20">
                  <Clock className="h-5 w-5 text-orange-500" />
                </div>
                <div>
                  <h3 className="font-medium text-white">Account Creation (1-2 minutes)</h3>
                  <p className="mt-1 text-sm text-zinc-400">
                    Your CRM sub-account is being created automatically with all your selected features.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-orange-500/20">
                  <Mail className="h-5 w-5 text-orange-500" />
                </div>
                <div>
                  <h3 className="font-medium text-white">Check Your Email</h3>
                  <p className="mt-1 text-sm text-zinc-400">
                    You'll receive login credentials and a link to access your new CRM at <strong className="text-white">app.rocketclients.com</strong>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-orange-500/20">
                  <Zap className="h-5 w-5 text-orange-500" />
                </div>
                <div>
                  <h3 className="font-medium text-white">Start Using Your CRM</h3>
                  <p className="mt-1 text-sm text-zinc-400">
                    Log in, complete the setup wizard, and start growing your business with Rocket+CRM!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://app.rocketclients.com"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 px-8 py-3 font-semibold text-white hover:opacity-90 transition-opacity"
            >
              Go to Login
              <ArrowRight className="h-5 w-5" />
            </a>
            <a
              href="https://rocketopp.com/support"
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-8 py-3 font-medium text-white hover:bg-zinc-800 transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              Contact Support
            </a>
          </div>

          {/* Quick Resources */}
          <div className="mt-16 grid gap-4 sm:grid-cols-2">
            <a
              href="https://rocketopp.com/docs"
              className="group rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 text-left hover:border-orange-500/50 transition-colors"
            >
              <BookOpen className="h-8 w-8 text-orange-500 mb-4" />
              <h3 className="font-semibold text-white group-hover:text-orange-500 transition-colors">Documentation</h3>
              <p className="mt-2 text-sm text-zinc-400">Learn how to use all the features in your new CRM.</p>
            </a>
            <a
              href="https://rocketadd.com"
              className="group rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 text-left hover:border-orange-500/50 transition-colors"
            >
              <Rocket className="h-8 w-8 text-orange-500 mb-4" />
              <h3 className="font-semibold text-white group-hover:text-orange-500 transition-colors">Rocket+ AI Mods</h3>
              <p className="mt-2 text-sm text-zinc-400">Supercharge your CRM with AI-powered enhancements.</p>
            </a>
          </div>

          {/* Receipt Note */}
          <p className="mt-12 text-sm text-zinc-500">
            A receipt has been sent to your email. If you don't receive your login within 5 minutes,
            please check your spam folder or <a href="mailto:support@rocketopp.com" className="text-orange-500 hover:underline">contact us</a>.
          </p>
        </div>
      </main>

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
