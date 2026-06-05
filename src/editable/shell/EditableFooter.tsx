'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableFooter() {
  const taskLinks = SITE_CONFIG.tasks.filter((task) => task.enabled)
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()

  return (
    <footer className="border-t border-white/10 bg-[#101010] text-white">
      <div className="mx-auto max-w-[1200px] px-4 pb-8 pt-16 sm:px-6 lg:px-8">
        <div className="border-b border-white/15 pb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#ef4c5f]">Build local visibility</p>
          <div className="mt-4 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 className="max-w-3xl text-5xl font-semibold leading-none tracking-[-0.06em] sm:text-7xl">Put your business where customers are looking.</h2>
            <Link href={session ? '/create' : '/signup'} className="inline-flex shrink-0 items-center gap-2 bg-white px-5 py-3 text-sm font-semibold text-black">
              Create a listing <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="grid gap-10 py-12 lg:grid-cols-[1.25fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center overflow-hidden border border-white/20 bg-white">
                <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-8 w-8 object-contain" />
              </span>
              <span className="text-lg font-black tracking-[-0.04em]">{SITE_CONFIG.name}</span>
            </Link>
            <p className="mt-4 max-w-md text-sm leading-7 text-white/60">{globalContent.footer.description}</p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-white/45">Explore</h3>
            <div className="mt-4 grid gap-2">
              {taskLinks.map((task) => (
                <Link key={task.key} href={task.route} className="inline-flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-white">
                  {task.label} <ArrowUpRight className="h-3.5 w-3.5 text-[#ef4c5f]" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-white/45">Company</h3>
            <div className="mt-4 grid gap-2">
              <Link href="/about" className="text-sm font-semibold text-white/70 hover:text-white">About</Link>
              <Link href="/contact" className="text-sm font-semibold text-white/70 hover:text-white">Contact</Link>
              <Link href={session ? '/create' : '/signup'} className="text-sm font-semibold text-white/70 hover:text-white">{session ? 'Add business' : 'Create account'}</Link>
              {session ? <button type="button" onClick={logout} className="text-left text-sm font-semibold text-white/70 hover:text-white">Logout {session.name}</button> : <Link href="/login" className="text-sm font-semibold text-white/70 hover:text-white">Login</Link>}
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs font-bold text-white/45">
        © {year} {SITE_CONFIG.name}. Business discovery made simpler.
      </div>
    </footer>
  )
}
