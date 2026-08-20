import type { CSSProperties } from 'react'

export const editableRootStyle = {
  '--slot4-page-bg': '#f7f7f5',
  '--slot4-page-text': '#171717',
  '--slot4-panel-bg': '#f1eeeb',
  '--slot4-surface-bg': '#ffffff',
  '--slot4-muted-text': '#565656',
  '--slot4-soft-muted-text': '#727272',
  '--slot4-accent': '#ef4c5f',
  '--slot4-accent-fill': '#ef4c5f',
  '--slot4-accent-soft': '#fde8eb',
  '--slot4-dark-bg': '#101010',
  '--slot4-dark-text': '#ffffff',
  '--slot4-media-bg': '#ececea',
  '--slot4-cream': '#ffffff',
  '--slot4-warm': '#f7f7f5',
  '--slot4-lavender': '#f1eeeb',
  '--slot4-gray': '#f7f7f5',
  '--slot4-body-gradient': 'linear-gradient(180deg, #ffffff 0%, #f7f7f5 45%, #f1eeeb 100%)',
} as CSSProperties

export const editablePalette = {
  pageBg: 'bg-[var(--slot4-page-bg)]',
  pageText: 'text-[var(--slot4-page-text)]',
  panelBg: 'bg-[var(--slot4-panel-bg)]',
  panelText: 'text-[var(--slot4-page-text)]',
  surfaceBg: 'bg-[var(--slot4-surface-bg)]',
  surfaceText: 'text-[var(--slot4-page-text)]',
  mutedText: 'text-[var(--slot4-muted-text)]',
  softMutedText: 'text-[var(--slot4-soft-muted-text)]',
  accentText: 'text-[var(--slot4-accent)]',
  accentBg: 'bg-[var(--slot4-accent-fill)]',
  accentSoftBg: 'bg-[var(--slot4-accent-soft)]',
  accentSoftText: 'text-[var(--slot4-accent-soft)]',
  darkBg: 'bg-[var(--slot4-dark-bg)]',
  darkText: 'text-[var(--slot4-dark-text)]',
  mediaBg: 'bg-[var(--slot4-media-bg)]',
  creamBg: 'bg-[var(--slot4-cream)]',
  warmBg: 'bg-[var(--slot4-warm)]',
  lavenderBg: 'bg-[var(--slot4-lavender)]',
  grayBg: 'bg-[var(--slot4-gray)]',
  border: 'border-black/[0.06]',
  darkBorder: 'border-white/10',
  shadow: 'shadow-[0_12px_40px_rgba(0,0,0,0.08)]',
  shadowStrong: 'shadow-[0_18px_70px_rgba(0,0,0,0.14)]',
  overlay: 'bg-[linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.62))]',
} as const

export const editableDesignContract = {
  shell: {
    page: `min-h-screen ${editablePalette.pageBg} ${editablePalette.pageText}`,
    section: 'mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8',
    sectionY: 'py-14 sm:py-16 lg:py-20',
  },
  layout: {
    safeGrid: 'grid gap-6 md:grid-cols-2 xl:grid-cols-3',
    featureGrid: 'grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center',
    rail: 'flex snap-x gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
    minRailCard: 'w-[140px] shrink-0 snap-start sm:w-[160px]',
  },
  type: {
    eyebrow: 'text-xs font-extrabold uppercase tracking-[0.18em]',
    heroTitle: 'text-4xl font-semibold leading-[1.04] tracking-[-0.055em] sm:text-5xl lg:text-6xl',
    sectionTitle: 'text-3xl font-semibold tracking-[-0.045em] sm:text-4xl',
    body: 'text-base leading-relaxed',
  },
  surface: {
    card: `border ${editablePalette.border} ${editablePalette.surfaceBg} ${editablePalette.shadow}`,
    soft: `border ${editablePalette.border} ${editablePalette.surfaceBg}`,
    dark: `${editablePalette.darkBg} ${editablePalette.darkText} ${editablePalette.shadowStrong}`,
  },
  button: {
    primary: `inline-flex items-center justify-center gap-2 ${editablePalette.darkBg} px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[var(--slot4-accent-fill)]`,
    secondary: `inline-flex items-center justify-center gap-2 border border-black/20 ${editablePalette.surfaceBg} px-6 py-3.5 text-sm font-semibold ${editablePalette.surfaceText} transition hover:border-black hover:bg-black/[0.03]`,
    accent: `inline-flex items-center justify-center gap-2 ${editablePalette.accentBg} px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-black`,
  },
  media: {
    frame: `relative overflow-hidden ${editablePalette.mediaBg}`,
    ratio: 'aspect-[2/3]',
  },
  motion: {
    lift: 'transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_55px_rgba(0,0,0,0.14)]',
    fade: 'transition duration-300 hover:opacity-80',
  },
} as const

/**
 * Canonical Ginfosolution theme tokens.
 *
 * The base theme is a warm-neutral editorial directory:
 * square edges (no border radius), `font-semibold` with tight negative
 * tracking, near-black #101010 primaries, and a single coral #ef4c5f accent.
 * Pages compose these so shape, weight, and spacing stay identical sitewide.
 */
export const editableUi = {
  page: 'bg-[var(--editable-page-bg,#f7f7f5)] text-[var(--editable-page-text,#171717)]',
  container: 'mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8',
  sectionY: 'py-14 sm:py-16 lg:py-20',
  eyebrow: 'text-xs font-semibold uppercase tracking-[0.22em] text-[var(--slot4-accent)]',
  eyebrowQuiet: 'text-xs font-semibold uppercase tracking-[0.22em] text-[var(--slot4-soft-muted-text)]',
  h1: 'text-5xl font-semibold leading-[0.98] tracking-[-0.065em] sm:text-6xl',
  h2: 'text-3xl font-semibold tracking-[-0.05em] sm:text-4xl',
  h3: 'text-xl font-semibold tracking-[-0.04em]',
  lead: 'text-base leading-8 text-[var(--slot4-muted-text)]',
  body: 'text-sm leading-7 text-[var(--slot4-muted-text)]',
  muted: 'text-[var(--slot4-muted-text)]',
  softMuted: 'text-[var(--slot4-soft-muted-text)]',
  card: 'border border-[var(--editable-border)] bg-white shadow-sm',
  cardHover: 'transition duration-300 hover:-translate-y-1 hover:border-[var(--slot4-accent)] hover:shadow-xl',
  panel: 'border border-[var(--editable-border)] bg-white shadow-[0_24px_80px_rgba(0,0,0,0.06)]',
  tint: 'bg-[var(--slot4-panel-bg)]',
  tintSoft: 'bg-[var(--slot4-accent-soft)]',
  mediaBg: 'bg-[var(--slot4-media-bg)]',
  dark: 'bg-[var(--slot4-dark-bg)] text-white',
  btnPrimary: 'inline-flex items-center justify-center gap-2 bg-[var(--slot4-dark-bg)] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[var(--slot4-accent)]',
  btnSecondary: 'inline-flex items-center justify-center gap-2 border border-black/20 bg-white px-6 py-3.5 text-sm font-semibold transition hover:border-black hover:bg-black/[0.03]',
  btnAccent: 'inline-flex items-center justify-center gap-2 bg-[var(--slot4-accent)] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-black',
  btnBlock: 'inline-flex h-12 w-full items-center justify-center gap-2 bg-[var(--slot4-dark-bg)] px-6 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[var(--slot4-accent)]',
  btnSmall: 'inline-flex items-center justify-center gap-2 border border-black/20 bg-white px-4 py-2 text-sm font-semibold transition hover:border-black',
  field: 'h-12 w-full border border-black/20 bg-white px-4 text-sm font-semibold text-black outline-none transition placeholder:text-neutral-500 focus:border-[var(--slot4-accent)]',
  chip: 'inline-flex items-center gap-1 border border-[var(--editable-border)] bg-[var(--slot4-page-bg)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em]',
  badge: 'inline-flex items-center gap-2 border border-[var(--editable-border)] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--slot4-accent)]',
  accent: 'var(--slot4-accent)',
} as const

export const aiLayoutRules = [
  'Change the full site color palette in editableRootStyle first; all homepage sections consume those CSS variables.',
  'Keep page structure in src/editable/sections/HomeSections.tsx so AI can redesign the whole home experience in one file.',
  'Use wide readable grids; never create skinny columns for paragraphs or cards.',
  'Use horizontal rails for dense post browsing, like the MysteryCoder reference layout.',
  'Keep dynamic post fetching intact; do not replace posts with mock arrays.',
  'Use postHref() for all post links so task-specific routes keep working.',
] as const
