'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Suspense } from 'react'
import { CheckCircle2, ArrowRight, Rocket, Mail, Clock } from 'lucide-react'

function WelcomeContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="h-20 w-20 rounded-full bg-green-500/20 flex items-center justify-center">
              <CheckCircle2 className="h-10 w-10 text-green-400" />
            </div>
            <div className="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-cyan-500 flex items-center justify-center">
              <Rocket className="h-3 w-3 text-white" />
            </div>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-white sm:text-5xl">
          Welcome to <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Rocket+CRM</span>
        </h1>

        <p className="mt-4 text-lg text-zinc-400">
          Your account is being set up. Here&apos;s what happens next:
        </p>

        <div className="mt-10 space-y-4 text-left max-w-md mx-auto">
          {[
            {
              icon: CheckCircle2,
              title: 'Payment Confirmed',
              description: 'Your subscription is active',
              color: 'text-green-400',
              bgColor: 'bg-green-500/10 border-green-500/20',
            },
            {
              icon: Clock,
              title: 'Account Provisioning',
              description: 'Your CRM workspace is being created (1-2 minutes)',
              color: 'text-cyan-400',
              bgColor: 'bg-cyan-500/10 border-cyan-500/20',
            },
            {
              icon: Mail,
              title: 'Welcome Email',
              description: 'Login credentials will be sent to your email',
              color: 'text-blue-400',
              bgColor: 'bg-blue-500/10 border-blue-500/20',
            },
          ].map((step) => (
            <div key={step.title} className={`flex items-start gap-4 rounded-xl border ${step.bgColor} p-4`}>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-800">
                <step.icon className={`h-5 w-5 ${step.color}`} />
              </div>
              <div>
                <h3 className="font-semibold text-white">{step.title}</h3>
                <p className="text-sm text-zinc-400">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {sessionId && (
          <p className="mt-6 text-xs text-zinc-600">
            Session: {sessionId.slice(0, 20)}...
          </p>
        )}

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-3 font-bold text-white hover:opacity-90 transition-opacity"
          >
            Back to Home <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="https://rocketopp.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 px-8 py-3 font-medium text-white hover:bg-zinc-800 transition-colors"
          >
            Need Help?
          </a>
        </div>
      </div>
    </div>
  )
}

export default function WelcomePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 flex items-center justify-center">
        <div className="text-zinc-400">Loading...</div>
      </div>
    }>
      <WelcomeContent />
    </Suspense>
  )
}
