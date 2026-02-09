import Link from 'next/link'
import { Rocket, Mail, Globe } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-red-500">
                <Rocket className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">Rocket<span className="text-orange-500">+</span>CRM</span>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed">
              The all-in-one CRM platform powered by AI. Capture, nurture, and convert leads with intelligent automation.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Product</h4>
            <ul className="space-y-3">
              <li><Link href="/features" className="text-sm text-zinc-400 hover:text-white transition-colors">Features</Link></li>
              <li><Link href="/pricing" className="text-sm text-zinc-400 hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="/resources" className="text-sm text-zinc-400 hover:text-white transition-colors">Resources & Tools</Link></li>
              <li><a href="https://app.rocketclients.com" className="text-sm text-zinc-400 hover:text-white transition-colors">Login</a></li>
            </ul>
          </div>

          {/* Ecosystem */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Ecosystem</h4>
            <ul className="space-y-3">
              <li><a href="https://rocketadd.com" target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-400 hover:text-white transition-colors">Rocket+ Mods</a></li>
              <li><a href="https://rocketopp.com" target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-400 hover:text-white transition-colors">RocketOpp</a></li>
              <li><Link href="/resources/sxo-playbook-2026" className="text-sm text-zinc-400 hover:text-white transition-colors">SXO Playbook 2026</Link></li>
              <li><a href="https://mcpfed.com" target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-400 hover:text-white transition-colors">MCPFED</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-zinc-400">
                <Mail className="h-4 w-4 shrink-0" />
                support@rocketclients.com
              </li>
              <li className="flex items-center gap-2 text-sm text-zinc-400">
                <Globe className="h-4 w-4 shrink-0" />
                rocketclients.com
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-zinc-500">
            &copy; {new Date().getFullYear()} Rocket+CRM. A RocketOpp Company.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors">Privacy</a>
            <a href="#" className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
