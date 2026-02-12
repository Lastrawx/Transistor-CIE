import {
  CONSENT_POLICY_VERSION,
  CONSENT_SCHEMA_VERSION,
  CONSENT_STORAGE_KEY_NAME,
  logConsentAuditEvent,
  type ConsentAuditContext,
} from './consent-audit'

export type AdsConsentStatus = 'unset' | 'granted' | 'denied'

const ADS_CONSENT_STORAGE_KEY = CONSENT_STORAGE_KEY_NAME
const CONSENT_TTL_MS = 1000 * 60 * 60 * 24 * 180
const ADS_GTAG_ID = 'AW-17935957032'
export const ADS_CONSENT_EVENT = 'tc_ads_consent_change'

type ConsentWindow = Window & typeof globalThis & {
  dataLayer?: unknown[]
  gtag?: (...args: unknown[]) => void
  __tcAdsConfigured?: boolean
}

type StoredConsentPayload = {
  status: Exclude<AdsConsentStatus, 'unset'>
  savedAt: number
  policyVersion: string
  consentSchemaVersion: string
}

type LegacyStoredConsentPayload = {
  status: Exclude<AdsConsentStatus, 'unset'>
  savedAt: number
}

const CONSENT_GRANTED = {
  ad_storage: 'granted',
  ad_user_data: 'granted',
  ad_personalization: 'granted',
  analytics_storage: 'granted',
}

const CONSENT_DENIED = {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
}

const isConsentStatus = (value: string | null): value is Exclude<AdsConsentStatus, 'unset'> =>
  value === 'granted' || value === 'denied'

const isLegacyStoredConsentPayload = (value: unknown): value is LegacyStoredConsentPayload => {
  if (typeof value !== 'object' || value === null) return false
  const payload = value as Partial<LegacyStoredConsentPayload>
  return (
    typeof payload.savedAt === 'number' &&
    Number.isFinite(payload.savedAt) &&
    payload.savedAt > 0 &&
    isConsentStatus(payload.status ?? null)
  )
}

const isStoredConsentPayload = (value: unknown): value is StoredConsentPayload => {
  if (!isLegacyStoredConsentPayload(value)) return false
  const payload = value as Partial<StoredConsentPayload>
  return (
    typeof payload.policyVersion === 'string' &&
    payload.policyVersion.length > 0 &&
    typeof payload.consentSchemaVersion === 'string' &&
    payload.consentSchemaVersion.length > 0
  )
}

const isConsentExpired = (savedAt: number) => Date.now() - savedAt > CONSENT_TTL_MS

const persistConsent = (status: Exclude<AdsConsentStatus, 'unset'>, savedAt = Date.now()) => {
  if (typeof window === 'undefined') return
  const payload: StoredConsentPayload = {
    status,
    savedAt,
    policyVersion: CONSENT_POLICY_VERSION,
    consentSchemaVersion: CONSENT_SCHEMA_VERSION,
  }
  window.localStorage.setItem(ADS_CONSENT_STORAGE_KEY, JSON.stringify(payload))
}

const clearAdsCookies = () => {
  if (typeof document === 'undefined') return

  const prefixes = ['_gcl', '_gac', '_ga', '_gid']
  const cookieNames = document.cookie
    .split(';')
    .map((cookie) => cookie.split('=')[0]?.trim())
    .filter((name): name is string => Boolean(name))
    .filter((name) => prefixes.some((prefix) => name.startsWith(prefix)))

  if (cookieNames.length === 0) return

  const host = window.location.hostname
  const hostParts = host.split('.')
  const rootDomain = hostParts.length > 2 ? `.${hostParts.slice(-2).join('.')}` : null
  const secureSuffix = window.location.protocol === 'https:' ? '; Secure' : ''

  const expire = (name: string, domain?: string | null) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; Max-Age=0; path=/; SameSite=Lax${secureSuffix}${domain ? `; domain=${domain}` : ''}`
  }

  cookieNames.forEach((name) => {
    expire(name)
    expire(name, host)
    if (rootDomain) {
      expire(name, rootDomain)
    }
  })
}

const readStoredConsentStatus = (): AdsConsentStatus => {
  if (typeof window === 'undefined') return 'unset'
  const rawValue = window.localStorage.getItem(ADS_CONSENT_STORAGE_KEY)
  if (!rawValue) return 'unset'

  // Legacy format migration: plain "granted"/"denied" string.
  if (isConsentStatus(rawValue)) {
    persistConsent(rawValue)
    void logConsentAuditEvent(rawValue, 'legacy_migration')
    return rawValue
  }

  try {
    const parsed: unknown = JSON.parse(rawValue)
    if (!isLegacyStoredConsentPayload(parsed)) {
      window.localStorage.removeItem(ADS_CONSENT_STORAGE_KEY)
      return 'unset'
    }

    if (isConsentExpired(parsed.savedAt)) {
      window.localStorage.removeItem(ADS_CONSENT_STORAGE_KEY)
      return 'unset'
    }

    if (!isStoredConsentPayload(parsed)) {
      persistConsent(parsed.status, parsed.savedAt)
      void logConsentAuditEvent(parsed.status, 'storage_sync')
      return parsed.status
    }

    return parsed.status
  } catch {
    window.localStorage.removeItem(ADS_CONSENT_STORAGE_KEY)
    return 'unset'
  }
}

const injectAdsScript = () => {
  if (typeof document === 'undefined') return
  const existingScript = document.querySelector<HTMLScriptElement>(`script[data-tc-gtag="${ADS_GTAG_ID}"]`)
  if (existingScript) return

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${ADS_GTAG_ID}`
  script.dataset.tcGtag = ADS_GTAG_ID
  document.head.appendChild(script)
}

const ensureAdsGtag = () => {
  if (typeof window === 'undefined') return
  const consentWindow = window as ConsentWindow

  consentWindow.dataLayer = consentWindow.dataLayer || []

  if (typeof consentWindow.gtag !== 'function') {
    consentWindow.gtag = (...args: unknown[]) => {
      consentWindow.dataLayer?.push(args)
    }
  }

  if (!consentWindow.__tcAdsConfigured) {
    consentWindow.gtag('consent', 'default', CONSENT_DENIED)
    consentWindow.gtag('js', new Date())
    consentWindow.gtag('config', ADS_GTAG_ID)
    consentWindow.__tcAdsConfigured = true
  }

  injectAdsScript()
}

const applyConsentToGtag = (status: AdsConsentStatus) => {
  if (typeof window === 'undefined') return
  const consentWindow = window as ConsentWindow
  if (typeof consentWindow.gtag !== 'function') return

  consentWindow.gtag('consent', 'update', status === 'granted' ? CONSENT_GRANTED : CONSENT_DENIED)
}

const emitConsentChange = (status: AdsConsentStatus) => {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent<AdsConsentStatus>(ADS_CONSENT_EVENT, { detail: status }))
}

export const getAdsConsentStatus = (): AdsConsentStatus => {
  return readStoredConsentStatus()
}

export const setAdsConsentStatus = (status: Exclude<AdsConsentStatus, 'unset'>) => {
  if (typeof window === 'undefined') return
  persistConsent(status)

  if (status === 'granted') {
    ensureAdsGtag()
  } else {
    clearAdsCookies()
  }

  applyConsentToGtag(status)
  emitConsentChange(status)
  const context: ConsentAuditContext = status === 'granted' ? 'banner_accept' : 'banner_refuse'
  void logConsentAuditEvent(status, context)
}

export const resetAdsConsentStatus = () => {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(ADS_CONSENT_STORAGE_KEY)
  clearAdsCookies()
  applyConsentToGtag('denied')
  emitConsentChange('unset')
  void logConsentAuditEvent('unset', 'footer_reset')
}

export const initAdsTrackingFromConsent = () => {
  if (typeof window === 'undefined') return
  const status = readStoredConsentStatus()

  if (status === 'granted') {
    ensureAdsGtag()
    applyConsentToGtag('granted')
  }
}

export const subscribeAdsConsent = (onChange: (status: AdsConsentStatus) => void) => {
  if (typeof window === 'undefined') return () => {}

  const handleCustomEvent = (event: Event) => {
    const customEvent = event as CustomEvent<AdsConsentStatus>
    onChange(customEvent.detail ?? getAdsConsentStatus())
  }

  const handleStorageEvent = (event: StorageEvent) => {
    if (event.key !== ADS_CONSENT_STORAGE_KEY) return
    onChange(readStoredConsentStatus())
  }

  window.addEventListener(ADS_CONSENT_EVENT, handleCustomEvent)
  window.addEventListener('storage', handleStorageEvent)

  return () => {
    window.removeEventListener(ADS_CONSENT_EVENT, handleCustomEvent)
    window.removeEventListener('storage', handleStorageEvent)
  }
}
