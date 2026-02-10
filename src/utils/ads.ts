const QUOTE_CONVERSION_SEND_TO = 'AW-17935957032/8enxCOSW4_UbEKj4w-hC'
const QUOTE_CONVERSION_PENDING_KEY = 'quote_conversion_pending'

type AnalyticsWindow = Window & typeof globalThis & {
  gtag?: (...args: unknown[]) => void
  dataLayer?: Array<Record<string, unknown>>
}

export const markQuoteConversionPending = () => {
  if (typeof window === 'undefined') return
  window.sessionStorage.setItem(QUOTE_CONVERSION_PENDING_KEY, '1')
}

export const flushQuoteConversionIfPending = () => {
  if (typeof window === 'undefined') return false

  const pending = window.sessionStorage.getItem(QUOTE_CONVERSION_PENDING_KEY) === '1'
  if (!pending) return false

  const analyticsWindow = window as AnalyticsWindow

  if (typeof analyticsWindow.gtag !== 'function') return false

  analyticsWindow.gtag('event', 'conversion', {
    send_to: QUOTE_CONVERSION_SEND_TO,
  })

  if (Array.isArray(analyticsWindow.dataLayer)) {
    analyticsWindow.dataLayer.push({
      event: 'devis_submit',
      lead_type: 'devis',
      source: 'site-netlify',
    })
  }

  window.sessionStorage.removeItem(QUOTE_CONVERSION_PENDING_KEY)
  return true
}
