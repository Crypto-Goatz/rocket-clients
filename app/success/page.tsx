import Link from 'next/link'
import {
  CheckCircle,
  Mail,
  Clock,
  ArrowRight,
  MessageCircle,
  BookOpen,
  Rocket,
  Zap,
} from 'lucide-react'

export default function SuccessPage() {
  return (
    <div className="relative">
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[400px] rounded-full bg-gradient-to-r from-green-500/10 to-emerald-500/10 blur-[150px] animate-drift pointer-events-none" aria-hidden="true" />
      <main className="relative py-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 mb-8 animate-scale-in">
            <CheckCircle className="h-10 w-10 text-white" />
          </div>

          <h1 className="text-4xl font-bold text-white sm:text-5xl animate-fade-in-up">
            Welcome to
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent"> Rocket+CRM</span>!
          </h1>

          <p className="mt-6 text-xl text-zinc-400 animate-fade-in-up stagger-2">
            Your payment was successful. We&apos;re setting up your CRM now.
          </p>

          <div className="mt-12 rounded-2xl border border-zinc-800/50 bg-zinc-900/30 backdrop-blur-sm p-8 text-left animate-fade-in-up stagger-3">
            <h2 className="text-lg font-semibold text-white mb-6">What happens next:</h2>
            <div className="space-y-6">
              {[
                { icon: Clock, title: 'Account Creation (1-2 minutes)', desc: 'Your CRM sub-account is being created automatically with all your selected features.' },
                { icon: Mail, title: 'Check Your Email', desc: 'You\'ll receive login credentials and a link to access your new CRM at app.rocketclients.com' },
                { icon: Zap, title: 'Start Using Your CRM', desc: 'Log in, complete the setup wizard, and start growing your business with Rocket+CRM!' },
              ].map((step) => (
                <div key={step.title} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-500/20">
                    <step.icon className="h-5 w-5 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{step.title}</h3>
                    <p className="mt-1 text-sm text-zinc-400">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up stagger-4">
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

          <div className="mt-16 grid gap-4 sm:grid-cols-2 animate-fade-in-up stagger-5">
            <a
              href="https://rocketopp.com/docs"
              className="group rounded-xl border border-zinc-800/50 bg-zinc-900/30 backdrop-blur-sm p-6 text-left hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-500/5 transition-all"
            >
              <BookOpen className="h-8 w-8 text-orange-500 mb-4" />
              <h3 className="font-semibold text-white group-hover:text-orange-500 transition-colors">Documentation</h3>
              <p className="mt-2 text-sm text-zinc-400">Learn how to use all the features in your new CRM.</p>
            </a>
            <a
              href="https://rocketadd.com"
              className="group rounded-xl border border-zinc-800/50 bg-zinc-900/30 backdrop-blur-sm p-6 text-left hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-500/5 transition-all"
            >
              <Rocket className="h-8 w-8 text-orange-500 mb-4" />
              <h3 className="font-semibold text-white group-hover:text-orange-500 transition-colors">Rocket+ AI Mods</h3>
              <p className="mt-2 text-sm text-zinc-400">Supercharge your CRM with AI-powered enhancements.</p>
            </a>
          </div>

          <p className="mt-12 text-sm text-zinc-500">
            A receipt has been sent to your email. If you don&apos;t receive your login within 5 minutes,
            please check your spam folder or <a href="mailto:support@rocketopp.com" className="text-orange-500 hover:underline">contact us</a>.
          </p>
        </div>
      </main>
    </div>
  )
}
