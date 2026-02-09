'use client'

import { useState, type FormEvent } from 'react'
import { ArrowRight, Check, Loader2, AlertCircle } from 'lucide-react'

interface LeadCaptureFormProps {
  toolSlug: string
  toolName: string
  heading?: string
  subheading?: string
  buttonText?: string
  compact?: boolean
}

type FormState = 'idle' | 'loading' | 'success' | 'error'

export function LeadCaptureForm({
  toolSlug,
  toolName,
  heading = 'Get Your Free Report',
  subheading = 'Enter your details below and we\'ll send your results instantly.',
  buttonText = 'Get Free Access',
  compact = false,
}: LeadCaptureFormProps) {
  const [state, setState] = useState<FormState>('idle')
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!formData.email) return

    setState('loading')
    setError('')

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone || undefined,
          source: `Resource: ${toolName}`,
          tags: ['resource-lead', `tool:${toolSlug}`, 'rocketclients-resources'],
          customFields: formData.company ? { company: formData.company } : undefined,
          pageUrl: typeof window !== 'undefined' ? window.location.href : undefined,
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Submission failed')
      setState('success')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      setState('error')
    }
  }

  if (state === 'success') {
    return (
      <div className={`rounded-2xl border border-green-500/30 bg-green-500/5 ${compact ? 'p-6' : 'p-8 lg:p-10'} text-center animate-scale-in`}>
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 mb-6">
          <Check className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">You&apos;re In!</h3>
        <p className="text-zinc-400 max-w-md mx-auto">
          Check your inbox for your <span className="text-white font-medium">{toolName}</span> results.
          We&apos;ve also added you to our exclusive insights list.
        </p>
      </div>
    )
  }

  return (
    <div className={`rounded-2xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-sm ${compact ? 'p-6' : 'p-8 lg:p-10'} animate-fade-in-up`}>
      {!compact && (
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-white">{heading}</h3>
          <p className="mt-2 text-zinc-400">{subheading}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-zinc-300 mb-1.5">
              First Name <span className="text-orange-500">*</span>
            </label>
            <input
              id="firstName"
              type="text"
              required
              value={formData.firstName}
              onChange={(e) => setFormData((p) => ({ ...p, firstName: e.target.value }))}
              className="w-full h-11 px-4 rounded-xl bg-zinc-800/60 border border-zinc-700 text-white placeholder:text-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all"
              placeholder="John"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-zinc-300 mb-1.5">
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              value={formData.lastName}
              onChange={(e) => setFormData((p) => ({ ...p, lastName: e.target.value }))}
              className="w-full h-11 px-4 rounded-xl bg-zinc-800/60 border border-zinc-700 text-white placeholder:text-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all"
              placeholder="Doe"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-1.5">
            Work Email <span className="text-orange-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
            className="w-full h-11 px-4 rounded-xl bg-zinc-800/60 border border-zinc-700 text-white placeholder:text-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all"
            placeholder="john@company.com"
          />
        </div>

        {!compact && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-zinc-300 mb-1.5">
                Phone <span className="text-zinc-600">(optional)</span>
              </label>
              <input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                className="w-full h-11 px-4 rounded-xl bg-zinc-800/60 border border-zinc-700 text-white placeholder:text-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all"
                placeholder="(555) 123-4567"
              />
            </div>
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-zinc-300 mb-1.5">
                Company <span className="text-zinc-600">(optional)</span>
              </label>
              <input
                id="company"
                type="text"
                value={formData.company}
                onChange={(e) => setFormData((p) => ({ ...p, company: e.target.value }))}
                className="w-full h-11 px-4 rounded-xl bg-zinc-800/60 border border-zinc-700 text-white placeholder:text-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all"
                placeholder="Acme Inc"
              />
            </div>
          </div>
        )}

        {state === 'error' && (
          <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 animate-fade-in">
            <AlertCircle className="h-4 w-4 text-red-400 shrink-0" />
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={state === 'loading'}
          className="w-full h-12 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold text-base hover:shadow-lg hover:shadow-orange-500/20 hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {state === 'loading' ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              {buttonText}
              <ArrowRight className="h-5 w-5" />
            </>
          )}
        </button>

        <p className="text-xs text-zinc-500 text-center">
          No spam. Unsubscribe anytime. By submitting you agree to our Privacy Policy.
        </p>
      </form>
    </div>
  )
}
