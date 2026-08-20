/**
 * Shared HTML parsing helpers for the editable UI layer.
 *
 * Feed values (`post.summary`, `content.description`, `content.excerpt`,
 * `content.body`) may arrive as plain text OR as rich HTML from the master
 * panel. Anything rendered as React text must be reduced to real text first,
 * otherwise markup and entities leak into cards as literal characters.
 *
 * Two directions are supported:
 * - `htmlToText` / `toExcerpt` for values printed as React children.
 * - `sanitizeRichHtml` for the one value passed to dangerouslySetInnerHTML.
 */

const NAMED_ENTITIES: Record<string, string> = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' ',
  ensp: ' ',
  emsp: ' ',
  thinsp: ' ',
  shy: '',
  zwj: '',
  zwnj: '',
  hellip: '…',
  mdash: '—',
  ndash: '–',
  lsquo: '‘',
  rsquo: '’',
  sbquo: '‚',
  ldquo: '“',
  rdquo: '”',
  bdquo: '„',
  bull: '•',
  middot: '·',
  laquo: '«',
  raquo: '»',
  copy: '©',
  reg: '®',
  trade: '™',
  deg: '°',
  euro: '€',
  pound: '£',
  yen: '¥',
  cent: '¢',
  sect: '§',
  para: '¶',
  dagger: '†',
  permil: '‰',
  times: '×',
  divide: '÷',
  plusmn: '±',
  frac12: '½',
  frac14: '¼',
  frac34: '¾',
  prime: '′',
  Prime: '″',
  larr: '←',
  uarr: '↑',
  rarr: '→',
  darr: '↓',
  harr: '↔',
}

const asString = (value: unknown) => (typeof value === 'string' ? value : '')

const codePointToText = (code: number) => {
  if (!Number.isFinite(code) || code <= 0 || code > 0x10ffff) return ''
  if (code >= 0xd800 && code <= 0xdfff) return ''
  try {
    return String.fromCodePoint(code)
  } catch {
    return ''
  }
}

export function decodeHtmlEntities(value: unknown): string {
  const raw = asString(value)
  if (!raw || !raw.includes('&')) return raw
  return raw.replace(/&(#[xX][0-9a-fA-F]+|#\d+|[a-zA-Z][a-zA-Z0-9]{1,31});/g, (match, body: string) => {
    if (body.startsWith('#')) {
      const isHex = body[1] === 'x' || body[1] === 'X'
      const code = isHex ? Number.parseInt(body.slice(2), 16) : Number.parseInt(body.slice(1), 10)
      return codePointToText(code) || match
    }
    const named = NAMED_ENTITIES[body]
    if (named !== undefined) return named
    const lower = NAMED_ENTITIES[body.toLowerCase()]
    return lower !== undefined ? lower : match
  })
}

export function looksLikeHtml(value: unknown): boolean {
  const raw = asString(value)
  if (!raw) return false
  return /<\/?[a-z][a-z0-9-]*(?:\s[^<>]*)?\/?>/i.test(raw)
}

export function htmlToText(value: unknown): string {
  const raw = asString(value)
  if (!raw) return ''
  const withoutBlocks = raw
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<(script|style|noscript|template|svg)[^>]*>[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<(script|style|noscript|template|svg)\b[^>]*\/?>/gi, ' ')
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<\/?[a-z][a-z0-9-]*(?:\s[^<>]*)?\/?>/gi, ' ')
  return decodeHtmlEntities(withoutBlocks).replace(/\s+/g, ' ').trim()
}

export function toExcerpt(value: unknown, limit = 180): string {
  const text = htmlToText(value)
  if (text.length <= limit) return text
  const clipped = text.slice(0, limit)
  const lastSpace = clipped.lastIndexOf(' ')
  const base = lastSpace > limit * 0.6 ? clipped.slice(0, lastSpace) : clipped
  return `${base.replace(/[\s.,;:!?-]+$/, '')}...`
}

export function toSearchText(value: unknown): string {
  return htmlToText(value).toLowerCase()
}

const DANGEROUS_TAGS = 'script|style|iframe|object|embed|link|meta|base|form|noscript|template'

const neutralizeUrlAttributes = (html: string) =>
  html.replace(/\b(href|src|xlink:href)\s*=\s*(["'])([\s\S]*?)\2/gi, (match, attr: string, quote: string, url: string) => {
    const probe = decodeHtmlEntities(url).replace(/[\s -]/g, '').toLowerCase()
    const blocked =
      probe.startsWith('javascript:') ||
      probe.startsWith('vbscript:') ||
      (probe.startsWith('data:') && !probe.startsWith('data:image/'))
    return blocked ? `${attr}=${quote}#${quote}` : match
  })

const hardenLinks = (html: string) =>
  html.replace(/<a\s+((?:"[^"]*"|'[^']*'|[^>])*)>/gi, (_match, attrs: string) => {
    let next = String(attrs).replace(/\s+on\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    if (!/\shref\s*=/i.test(` ${next}`)) return `<a ${next.trim()}>`
    if (!/\starget\s*=/i.test(` ${next}`)) next += ' target="_blank"'
    if (!/\srel\s*=/i.test(` ${next}`)) next += ' rel="nofollow noopener noreferrer"'
    return `<a ${next.trim()}>`
  })

export function sanitizeRichHtml(html: unknown): string {
  const raw = asString(html)
  if (!raw) return ''
  const cleaned = raw
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(new RegExp(`<(${DANGEROUS_TAGS})[^>]*>[\\s\\S]*?<\\/\\1>`, 'gi'), '')
    .replace(new RegExp(`<\\/?(?:${DANGEROUS_TAGS})\\b[^>]*>`, 'gi'), '')
    .replace(/\s+on\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
  return hardenLinks(neutralizeUrlAttributes(cleaned))
}

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

const safeUrl = (value: string) => (/^https?:\/\//i.test(value) ? value : '#')

const linkifyMarkdown = (value: string) =>
  value.replace(
    /\[([^\]]+)]\((https?:\/\/[^\s)]+)\)/gi,
    (_match, label: string, url: string) => `<a href="${safeUrl(url)}" target="_blank" rel="nofollow noopener noreferrer">${label}</a>`
  )

const linkifyBareUrls = (value: string) =>
  value.replace(
    /(^|[\s(>])((?:https?:\/\/)[^\s<)]+)/gi,
    (_match, prefix: string, url: string) => `${prefix}<a href="${safeUrl(url)}" target="_blank" rel="nofollow noopener noreferrer">${url}</a>`
  )

export function formatBodyHtml(value: unknown): string {
  const raw = asString(value).trim()
  if (!raw) return ''
  if (looksLikeHtml(raw)) return sanitizeRichHtml(linkifyMarkdown(raw))
  return raw
    .split(/\n{2,}/)
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => `<p>${linkifyBareUrls(linkifyMarkdown(escapeHtml(decodeHtmlEntities(part)))).replace(/\n/g, '<br />')}</p>`)
    .join('')
}
