'use client'

import { Building2, MapPin, Phone } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { editableUi as ui } from '@/editable/layouts/design-contract'
import { EditableContactLeadForm } from '@/editable/components/EditableContactLeadForm'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

const lanes = [
  { icon: Building2, title: 'Business onboarding', body: 'Add listings, verify operational details, and bring your business surface live quickly.' },
  { icon: Phone, title: 'Partnership support', body: 'Talk through bulk publishing, local growth, and operational setup questions.' },
  { icon: MapPin, title: 'Coverage requests', body: 'Need a new geography or category lane? We can shape the directory around it.' },
]

export default function ContactPage() {
  return (
    <EditableSiteShell>
      <main className={ui.page}>
        <section className={`${ui.container} ${ui.sectionY}`}>
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <p className={ui.eyebrow}>{pagesContent.contact.eyebrow}</p>
              <h1 className={`mt-4 max-w-xl ${ui.h1}`}>
                {pagesContent.contact.title}
                <span className="text-[var(--slot4-accent)]">.</span>
              </h1>
              <p className={`mt-6 max-w-2xl ${ui.lead}`}>{pagesContent.contact.description}</p>

              <div className="mt-8 grid gap-4">
                {lanes.map((lane) => (
                  <div key={lane.title} className={`${ui.card} ${ui.cardHover} p-5`}>
                    <lane.icon className="h-5 w-5 text-[var(--slot4-accent)]" />
                    <h2 className={`mt-3 ${ui.h3}`}>{lane.title}</h2>
                    <p className={`mt-2 ${ui.body}`}>{lane.body}</p>
                  </div>
                ))}
              </div>

              <div className={`mt-8 grid gap-4 border border-[var(--editable-border)] ${ui.tint} p-5 sm:grid-cols-2 sm:p-6`}>
                <div>
                  <p className={ui.eyebrowQuiet}>Directory desk</p>
                  <p className="mt-2 text-sm font-semibold">{SITE_CONFIG.domain}</p>
                </div>
                <div>
                  <p className={ui.eyebrowQuiet}>Coverage</p>
                  <p className="mt-2 text-sm font-semibold">Local and online business listings</p>
                </div>
              </div>
            </div>

            <div className={`${ui.panel} p-7`}>
              <h2 className={ui.h2}>{pagesContent.contact.formTitle}</h2>
              <p className={`mt-2 ${ui.body}`}>Share the business name, category, location, and what you need changed or supported.</p>
              <div className="mt-6">
                <EditableContactLeadForm />
              </div>
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
