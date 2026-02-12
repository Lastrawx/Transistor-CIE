export type ConsentAuditStatus = 'granted' | 'denied' | 'unset'
export type ConsentAuditContext =
  | 'banner_accept'
  | 'banner_refuse'
  | 'footer_reset'
  | 'legacy_migration'
  | 'storage_sync'

const CONSENT_AUDIT_COLLECTION = 'consent_events'
const CONSENT_AUDIT_ID_STORAGE_KEY = 'tc_consent_audit_id_v1'
export const CONSENT_STORAGE_KEY_NAME = 'tc_ads_consent_v1'
export const CONSENT_POLICY_VERSION = '2026-02-12'
export const CONSENT_SCHEMA_VERSION = 'v2'

const buildAuditId = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
}

const getConsentAuditId = () => {
  if (typeof window === 'undefined') return 'unknown'

  const existing = window.localStorage.getItem(CONSENT_AUDIT_ID_STORAGE_KEY)
  if (existing) return existing

  const generated = buildAuditId()
  window.localStorage.setItem(CONSENT_AUDIT_ID_STORAGE_KEY, generated)
  return generated
}

const sanitizePath = (path: string) => path.slice(0, 160)

export const logConsentAuditEvent = async (status: ConsentAuditStatus, context: ConsentAuditContext) => {
  if (typeof window === 'undefined') return

  const consentAuditId = getConsentAuditId()
  const pagePath = sanitizePath(`${window.location.pathname}${window.location.search}`)

  try {
    const [{ addDoc, collection, serverTimestamp }, { db }] = await Promise.all([
      import('firebase/firestore'),
      import('../firebase'),
    ])

    await addDoc(collection(db, CONSENT_AUDIT_COLLECTION), {
      type: 'ads_cookie_consent',
      source: 'site-netlify',
      status,
      context,
      consentAuditId,
      consentStorageKey: CONSENT_STORAGE_KEY_NAME,
      policyVersion: CONSENT_POLICY_VERSION,
      consentSchemaVersion: CONSENT_SCHEMA_VERSION,
      pagePath,
      clientRecordedAtMs: Date.now(),
      recordedAt: serverTimestamp(),
    })
  } catch (error) {
    console.warn('Consent audit log failed', error)
  }
}
