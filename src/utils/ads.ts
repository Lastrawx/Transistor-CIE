import { getAdsConsentStatus } from './cookie-consent'

const QUOTE_CONVERSION_SEND_TO = 'AW-17935957032/8enxCOSW4_UbEKj4w-hC'
const QUOTE_CONVERSION_PENDING_KEY = 'quote_conversion_pending_v2'
const LEGACY_QUOTE_CONVERSION_PENDING_KEY = 'quote_conversion_pending'
const QUOTE_CONVERSION_MAX_AGE_MS = 1000 * 60 * 60 * 24 * 30
const ADS_CONSENT_EVENT = 'tc_ads_consent_change'

type AnalyticsWindow = Window & typeof globalThis & {
  gtag?: (...args: unknown[]) => void
  fbq?: (...args: unknown[]) => void
  dataLayer?: unknown[]
  __tcQuoteAutoFlushInitialized?: boolean
}

type PendingConversionPayload = {
  createdAt: number
}

const isPendingConversionPayload = (value: unknown): value is PendingConversionPayload => {
  if (typeof value !== 'object' || value === null) return false
  const payload = value as Partial<PendingConversionPayload>
  return typeof payload.createdAt === 'number' && Number.isFinite(payload.createdAt) && payload.createdAt > 0
}

const readPendingConversion = (): PendingConversionPayload | null => {
  if (typeof window === 'undefined') return null

  const stored = window.localStorage.getItem(QUOTE_CONVERSION_PENDING_KEY)
  if (stored) {
    try {
      const parsed: unknown = JSON.parse(stored)
      if (isPendingConversionPayload(parsed)) {
        return parsed
      }
      window.localStorage.removeItem(QUOTE_CONVERSION_PENDING_KEY)
    } catch {
      window.localStorage.removeItem(QUOTE_CONVERSION_PENDING_KEY)
    }
  }

  const legacyPending = window.sessionStorage.getItem(LEGACY_QUOTE_CONVERSION_PENDING_KEY) === '1'
  if (!legacyPending) return null

  const migrated: PendingConversionPayload = { createdAt: Date.now() }
  window.localStorage.setItem(QUOTE_CONVERSION_PENDING_KEY, JSON.stringify(migrated))
  window.sessionStorage.removeItem(LEGACY_QUOTE_CONVERSION_PENDING_KEY)
  return migrated
}

const clearPendingConversion = () => {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(QUOTE_CONVERSION_PENDING_KEY)
  window.sessionStorage.removeItem(LEGACY_QUOTE_CONVERSION_PENDING_KEY)
}

const isPendingConversionExpired = (payload: PendingConversionPayload) =>
  Date.now() - payload.createdAt > QUOTE_CONVERSION_MAX_AGE_MS

const tryFlushPendingConversion = () => {
  if (typeof window === 'undefined') return false
  if (getAdsConsentStatus() !== 'granted') return false
  const pendingPayload = readPendingConversion()
  if (!pendingPayload) return false

  if (isPendingConversionExpired(pendingPayload)) {
    clearPendingConversion()
    return false
  }

  const analyticsWindow = window as AnalyticsWindow
  const canSendGoogle = typeof analyticsWindow.gtag === 'function'
  const canSendMeta = typeof analyticsWindow.fbq === 'function'
  if (!canSendGoogle && !canSendMeta) return false

  if (canSendGoogle) {
    analyticsWindow.gtag?.('event', 'conversion', {
      send_to: QUOTE_CONVERSION_SEND_TO,
    })

    if (Array.isArray(analyticsWindow.dataLayer)) {
      analyticsWindow.dataLayer.push({
        event: 'devis_submit',
        lead_type: 'devis',
        source: 'site-netlify',
        sent_at: new Date().toISOString(),
      })
    }
  }

  if (canSendMeta) {
    analyticsWindow.fbq?.('track', 'Lead', {
      lead_type: 'devis',
      source: 'site-netlify',
    })
  }

  clearPendingConversion()
  return true
}

export const markQuoteConversionPending = () => {
  if (typeof window === 'undefined') return
  const payload: PendingConversionPayload = {
    createdAt: Date.now(),
  }
  window.localStorage.setItem(QUOTE_CONVERSION_PENDING_KEY, JSON.stringify(payload))
}

export const flushQuoteConversionIfPending = () => {
  return tryFlushPendingConversion()
}

export const initQuoteConversionAutoFlush = () => {
  if (typeof window === 'undefined') return
  const analyticsWindow = window as AnalyticsWindow
  if (analyticsWindow.__tcQuoteAutoFlushInitialized) return
  analyticsWindow.__tcQuoteAutoFlushInitialized = true

  const tryFlush = () => {
    void tryFlushPendingConversion()
  }

  tryFlush()

  const retryInterval = window.setInterval(tryFlush, 5000)
  window.setTimeout(() => window.clearInterval(retryInterval), 1000 * 60 * 5)

  window.addEventListener('focus', tryFlush)
  window.addEventListener('pageshow', tryFlush)
  window.addEventListener('online', tryFlush)
  window.addEventListener(ADS_CONSENT_EVENT, tryFlush as EventListener)
  window.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      tryFlush()
    }
  })
}
