'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { MessageSquare, RefreshCw, Search } from 'lucide-react'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { editableUi as ui } from '@/editable/layouts/design-contract'

type StoredComment = {
  id: string
  name: string
  email?: string
  comment: string
  createdAt: string
  articleTitle?: string
  articleSlug?: string
}

const COMMENTS_PER_PAGE = 8
const COMMENT_KEY_PREFIX = 'slot4:article-comments:'

const formatDate = (value: string) => {
  try {
    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(value))
  } catch {
    return 'Just now'
  }
}

const readCommentsFromStorage = (): StoredComment[] => {
  const items: StoredComment[] = []
  for (let index = 0; index < window.localStorage.length; index += 1) {
    const key = window.localStorage.key(index)
    if (!key?.startsWith(COMMENT_KEY_PREFIX)) continue
    const articleSlug = key.replace(COMMENT_KEY_PREFIX, '')
    try {
      const parsed = JSON.parse(window.localStorage.getItem(key) || '[]')
      if (!Array.isArray(parsed)) continue
      for (const item of parsed) {
        if (!item || typeof item !== 'object') continue
        if (typeof item.name !== 'string' || typeof item.comment !== 'string') continue
        items.push({
          id: typeof item.id === 'string' ? item.id : `${articleSlug}-${items.length}`,
          name: item.name,
          email: typeof item.email === 'string' ? item.email : undefined,
          comment: item.comment,
          createdAt: typeof item.createdAt === 'string' ? item.createdAt : new Date().toISOString(),
          articleTitle: typeof item.articleTitle === 'string' ? item.articleTitle : undefined,
          articleSlug: typeof item.articleSlug === 'string' ? item.articleSlug : articleSlug,
        })
      }
    } catch {
      // Ignore corrupted local comment records.
    }
  }

  return items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export default function CommentsPage() {
  const [comments, setComments] = useState<StoredComment[]>([])
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)

  useEffect(() => {
    setComments(readCommentsFromStorage())
  }, [])

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) return comments
    return comments.filter((item) => {
      return [item.name, item.email, item.comment, item.articleTitle, item.articleSlug]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(term))
    })
  }, [comments, query])

  const totalPages = Math.max(1, Math.ceil(filtered.length / COMMENTS_PER_PAGE))
  const currentPage = Math.min(page, totalPages)
  const visibleComments = filtered.slice((currentPage - 1) * COMMENTS_PER_PAGE, currentPage * COMMENTS_PER_PAGE)

  function refreshComments() {
    setComments(readCommentsFromStorage())
    setPage(1)
  }

  return (
    <EditableSiteShell>
      <main className={ui.page}>
        <section className={`${ui.container} ${ui.sectionY}`}>
          <div className={`${ui.panel} p-6 sm:p-8 lg:p-10`}>
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className={`inline-flex items-center gap-2 ${ui.eyebrow}`}>
                  <MessageSquare className="h-4 w-4" /> Local comments
                </p>
                <h1 className={`mt-4 ${ui.h1}`}>
                  Comments<span className="text-[var(--slot4-accent)]">.</span>
                </h1>
                <p className={`mt-6 max-w-2xl ${ui.lead}`}>
                  Review comments saved in this browser from article pages.
                </p>
              </div>
              <button type="button" className={ui.btnSecondary} onClick={refreshComments}>
                <RefreshCw className="h-4 w-4" /> Refresh comments
              </button>
            </div>

            <div className={`mt-8 flex flex-col gap-3 border border-[var(--editable-border)] ${ui.tint} p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5`}>
              <div className="relative w-full sm:max-w-md">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
                <input
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value)
                    setPage(1)
                  }}
                  placeholder="Search comments..."
                  className={`${ui.field} pl-11`}
                />
              </div>
              <p className={`text-sm font-semibold ${ui.muted}`}>
                {filtered.length} comment{filtered.length === 1 ? '' : 's'} found
              </p>
            </div>
          </div>

          {visibleComments.length ? (
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {visibleComments.map((item) => (
                <article key={`${item.articleSlug}-${item.id}`} className={`${ui.card} ${ui.cardHover} p-5 sm:p-6`}>
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <p className="truncate text-base font-semibold tracking-[-0.02em]">{item.name}</p>
                      <p className={`mt-1 text-xs font-semibold ${ui.softMuted}`}>{formatDate(item.createdAt)}</p>
                    </div>
                    {item.articleSlug ? (
                      <Link href={`/article/${item.articleSlug}`} className="shrink-0 text-sm font-semibold text-[var(--slot4-accent)] underline-offset-4 hover:underline">
                        Open article
                      </Link>
                    ) : null}
                  </div>
                  {item.articleTitle ? <p className={`mt-4 border-l-2 border-[var(--slot4-accent)] ${ui.tint} px-4 py-3 text-sm font-semibold`}>{item.articleTitle}</p> : null}
                  <p className={`mt-4 ${ui.body}`}>{item.comment}</p>
                </article>
              ))}
            </div>
          ) : (
            <section className="mt-8 border border-dashed border-[var(--editable-border)] bg-white p-10 text-center">
              <span className={`mx-auto flex h-14 w-14 items-center justify-center ${ui.tintSoft}`}>
                <MessageSquare className="h-6 w-6 text-[var(--slot4-accent)]" />
              </span>
              <h2 className={`mt-5 ${ui.h3}`}>No comments yet</h2>
              <p className={`mx-auto mt-3 max-w-md ${ui.body}`}>Add a comment on any article page and it will appear here.</p>
            </section>
          )}

          {filtered.length > COMMENTS_PER_PAGE ? (
            <div className={`mt-8 flex flex-wrap items-center justify-between gap-3 ${ui.card} p-4`}>
              <span className={`text-sm font-semibold ${ui.muted}`}>Page {currentPage} of {totalPages}</span>
              <div className="flex gap-2">
                <button type="button" className={`${ui.btnSmall} disabled:opacity-40`} disabled={currentPage <= 1} onClick={() => setPage((value) => Math.max(1, value - 1))}>Previous</button>
                <button type="button" className={`${ui.btnSmall} disabled:opacity-40`} disabled={currentPage >= totalPages} onClick={() => setPage((value) => Math.min(totalPages, value + 1))}>Next</button>
              </div>
            </div>
          ) : null}
        </section>
      </main>
    </EditableSiteShell>
  )
}
