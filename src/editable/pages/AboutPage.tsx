import Link from 'next/link'
import { ArrowRight, Building2, CheckCircle2, Search, Users } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export default function AboutPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[var(--editable-page-bg,#f7f7f5)] px-4 py-14 text-[var(--editable-page-text,#171717)] sm:px-6 lg:px-8">
        <section className="mx-auto grid max-w-[1200px] gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="border border-[var(--editable-border)] bg-white p-8 shadow-sm lg:p-12">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--slot4-accent)]">{pagesContent.about.badge}</p>
            <h1 className="mt-5 text-5xl font-semibold leading-none tracking-[-0.065em] sm:text-7xl">About {SITE_CONFIG.name}<span className="text-[var(--slot4-accent)]">.</span></h1>
            <p className="mt-6 max-w-2xl text-base leading-8 opacity-70">{pagesContent.about.description}</p>
            <div className="mt-8 space-y-4 text-sm leading-8 opacity-75">{pagesContent.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
          </article>
          <aside className="grid gap-4">
            {pagesContent.about.values.map((value) => <div key={value.title} className="border border-[var(--editable-border)] bg-white p-6 shadow-sm"><h2 className="text-xl font-semibold tracking-[-0.04em]">{value.title}</h2><p className="mt-3 text-sm leading-7 opacity-70">{value.description}</p></div>)}
          </aside>
        </section>

        <section className="mx-auto mt-8 grid max-w-[1200px] border border-black/10 bg-[#101010] text-white md:grid-cols-3">
          {[{ icon: Search, title: 'Discover', body: 'Search practical listings by service, category, or location.' }, { icon: CheckCircle2, title: 'Compare', body: 'Understand each business through clear details and direct actions.' }, { icon: Users, title: 'Connect', body: 'Move from research to a real conversation without friction.' }].map((item) => <div key={item.title} className="border-b border-white/15 p-7 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"><item.icon className="h-6 w-6 text-[var(--slot4-accent)]" /><h2 className="mt-8 text-3xl font-semibold tracking-[-0.05em]">{item.title}</h2><p className="mt-3 text-sm leading-7 text-white/60">{item.body}</p></div>)}
        </section>

        <section className="mx-auto mt-8 flex max-w-[1200px] flex-col justify-between gap-6 border border-black/10 bg-white p-8 md:flex-row md:items-center">
          <div><div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--slot4-accent)]"><Building2 className="h-4 w-4" /> For business owners</div><h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em]">Ready to be easier to find?</h2></div>
          <Link href="/signup" className="inline-flex items-center gap-2 bg-black px-5 py-3 text-sm font-semibold text-white">Create your listing <ArrowRight className="h-4 w-4" /></Link>
        </section>
      </main>
    </EditableSiteShell>
  )
}
