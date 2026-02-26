import { addDoc, collection, doc, increment, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from '../firebase'

export type SiteMetricField =
  | 'siteOpens'
  | 'totalClicks'
  | 'quoteClicks'
  | 'poleParticulierClicks'
  | 'poleEntrepriseClicks'

export type SiteMetricCounters = Record<SiteMetricField, number>

export const SITE_METRIC_FIELDS: SiteMetricField[] = [
  'siteOpens',
  'totalClicks',
  'quoteClicks',
  'poleParticulierClicks',
  'poleEntrepriseClicks',
]

export const SITE_METRIC_LABELS: Record<SiteMetricField, string> = {
  siteOpens: 'Ouvertures du site web',
  totalClicks: 'Clics totaux sur le site',
  quoteClicks: 'Clics sur demande de devis',
  poleParticulierClicks: 'Clics vers pôle particuliers',
  poleEntrepriseClicks: 'Clics vers pôle entreprises',
}

export const createEmptySiteMetricCounters = (): SiteMetricCounters => ({
  siteOpens: 0,
  totalClicks: 0,
  quoteClicks: 0,
  poleParticulierClicks: 0,
  poleEntrepriseClicks: 0,
})

const SITE_METRICS_DOC = doc(db, 'site_metrics', 'global')
const SITE_OPENINGS_COLLECTION = collection(db, 'site_metrics', 'global', 'openings')
const FLUSH_INTERVAL_MS = 8000
const HOME_OPEN_LAST_AT_KEY = 'tc_home_open_last_at_v1'
const HOME_OPEN_SESSION_KEY = 'tc_home_open_tracked_v1'
const HOME_OPEN_THROTTLE_MS = 1500
const EXCLUDED_SITE_OPEN_PATHS = ['/admin-cagnat']

type PendingMetricMap = Partial<Record<SiteMetricField, number>>
type SiteMetricsWindow = Window & typeof globalThis & {
  __tcSiteMetricsInitialized?: boolean
}

const pendingMetrics: PendingMetricMap = {}
let flushTimer: number | null = null
let flushInFlight = false
let flushRequestedAfterFlight = false
let canWriteOpeningHistory = true

const isPermissionDeniedError = (error: unknown) => {
  const code = (error as { code?: string } | undefined)?.code
  return code === 'permission-denied'
}

const parseTrackedMetric = (value?: string): SiteMetricField | null => {
  if (!value) return null
  const normalized = value.trim()
  if (!normalized) return null

  switch (normalized) {
    case 'siteOpens':
    case 'site_opens':
      return 'siteOpens'
    case 'totalClicks':
    case 'total_clicks':
      return 'totalClicks'
    case 'quoteClicks':
    case 'quote_clicks':
      return 'quoteClicks'
    case 'poleParticulierClicks':
    case 'pole_particulier_clicks':
      return 'poleParticulierClicks'
    case 'poleEntrepriseClicks':
    case 'pole_entreprise_clicks':
      return 'poleEntrepriseClicks'
    default:
      return null
  }
}

const normalizePathname = (pathname: string) => {
  const normalized = pathname.replace(/\/+$/, '')
  return normalized || '/'
}

const getPathnameFromAction = (action: HTMLElement): string | null => {
  if (typeof window === 'undefined') return null

  const anchor = action.closest('a')
  if (!anchor) return null
  const href = anchor.getAttribute('href')
  if (!href || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) {
    return null
  }

  try {
    const url = new URL(href, window.location.origin)
    if (url.origin !== window.location.origin) return null
    return normalizePathname(url.pathname)
  } catch {
    return null
  }
}

const getActionElement = (target: EventTarget | null): HTMLElement | null => {
  if (!(target instanceof Element)) return null
  return target.closest<HTMLElement>('a,button,[role="button"],summary')
}

const mergeSnapshotBack = (snapshot: PendingMetricMap) => {
  SITE_METRIC_FIELDS.forEach((field) => {
    const value = snapshot[field]
    if (!value) return
    pendingMetrics[field] = (pendingMetrics[field] ?? 0) + value
  })
}

const takePendingSnapshot = (): PendingMetricMap => {
  const snapshot: PendingMetricMap = {}
  SITE_METRIC_FIELDS.forEach((field) => {
    const value = pendingMetrics[field] ?? 0
    if (value <= 0) return
    snapshot[field] = value
    delete pendingMetrics[field]
  })
  return snapshot
}

const hasPendingValues = (snapshot: PendingMetricMap) =>
  SITE_METRIC_FIELDS.some((field) => (snapshot[field] ?? 0) > 0)

const queueFlush = () => {
  if (typeof window === 'undefined') return
  if (flushTimer !== null) return
  flushTimer = window.setTimeout(() => {
    flushTimer = null
    void flushPendingSiteMetrics()
  }, FLUSH_INTERVAL_MS)
}

export const trackSiteMetric = (field: SiteMetricField, value = 1) => {
  if (value <= 0) return
  pendingMetrics[field] = (pendingMetrics[field] ?? 0) + value
  queueFlush()
}

export const flushPendingSiteMetrics = async () => {
  if (flushInFlight) {
    flushRequestedAfterFlight = true
    return
  }

  const snapshot = takePendingSnapshot()
  if (!hasPendingValues(snapshot)) return

  flushInFlight = true
  try {
    const payload: Record<string, unknown> = {
      updatedAt: serverTimestamp(),
    }
    SITE_METRIC_FIELDS.forEach((field) => {
      const value = snapshot[field]
      if (!value || value <= 0) return
      payload[field] = increment(value)
    })
    await setDoc(SITE_METRICS_DOC, payload, { merge: true })
  } catch (error) {
    mergeSnapshotBack(snapshot)
    console.warn('Site metrics flush failed', error)
  } finally {
    flushInFlight = false
    if (flushRequestedAfterFlight) {
      flushRequestedAfterFlight = false
      void flushPendingSiteMetrics()
    }
  }
}

export const trackHomePageOpen = () => {
  trackSiteOpenOncePerSession()
}

const trackSiteOpenOncePerSession = () => {
  if (typeof window === 'undefined') return
  if (window.sessionStorage.getItem(HOME_OPEN_SESSION_KEY) === '1') return

  const normalizedPath = normalizePathname(window.location.pathname)
  if (EXCLUDED_SITE_OPEN_PATHS.some((path) => normalizedPath.startsWith(path))) {
    return
  }

  const now = Date.now()
  const lastTrackedAt = Number(window.sessionStorage.getItem(HOME_OPEN_LAST_AT_KEY) ?? '0')
  if (Number.isFinite(lastTrackedAt) && now - lastTrackedAt < HOME_OPEN_THROTTLE_MS) {
    return
  }
  window.sessionStorage.setItem(HOME_OPEN_LAST_AT_KEY, String(now))
  window.sessionStorage.setItem(HOME_OPEN_SESSION_KEY, '1')

  trackSiteMetric('siteOpens')
  void flushPendingSiteMetrics()

  if (!canWriteOpeningHistory) {
    return
  }

  void addDoc(SITE_OPENINGS_COLLECTION, {
    openedAt: serverTimestamp(),
  }).catch((error) => {
    if (isPermissionDeniedError(error)) {
      canWriteOpeningHistory = false
      return
    }
    console.warn('Site opening tracking failed', error)
  })
}

export const initSiteMetricsTracking = () => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return
  const siteWindow = window as SiteMetricsWindow
  if (siteWindow.__tcSiteMetricsInitialized) return
  siteWindow.__tcSiteMetricsInitialized = true
  trackSiteOpenOncePerSession()

  const onClick = (event: MouseEvent) => {
    const trackedInEvent = new Set<SiteMetricField>()
    const trackUniqueMetric = (field: SiteMetricField) => {
      if (trackedInEvent.has(field)) return
      trackedInEvent.add(field)
      trackSiteMetric(field)
    }

    trackUniqueMetric('totalClicks')

    const action = getActionElement(event.target)
    if (!action) return

    const explicitMetric = parseTrackedMetric(action.dataset.trackMetric)
    if (explicitMetric) {
      trackUniqueMetric(explicitMetric)
    }

    const text = (action.textContent ?? '').toLowerCase()
    if (text.includes('devis')) {
      trackUniqueMetric('quoteClicks')
    }

    const pathname = getPathnameFromAction(action)
    if (!pathname) return
    if (pathname.startsWith('/particulier')) {
      trackUniqueMetric('poleParticulierClicks')
    }
    if (pathname.startsWith('/entreprise')) {
      trackUniqueMetric('poleEntrepriseClicks')
    }
  }

  const flushNow = () => {
    void flushPendingSiteMetrics()
  }

  document.addEventListener('click', onClick, true)
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      flushNow()
    }
  })
  window.addEventListener('online', flushNow)
  window.addEventListener('pagehide', flushNow)
  window.addEventListener('beforeunload', flushNow)
  window.setInterval(flushNow, FLUSH_INTERVAL_MS)
}
