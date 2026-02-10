import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import GuaranteeDetailsModal from './GuaranteeDetailsModal'

const DISMISS_STORAGE_KEY = 'satisfactionGuaranteeBannerDismissedAt'
const DISMISS_DURATION_MS = 7 * 24 * 60 * 60 * 1000
const HIDDEN_PATHS = new Set(['/cgv-cgu', '/cgv', '/cgu'])
type SatisfactionGuaranteeBannerProps = {
  onVisibilityChange?: (visible: boolean) => void
}

const isBannerDismissed = () => {
  if (typeof window === 'undefined') return false

  const rawValue = window.localStorage.getItem(DISMISS_STORAGE_KEY)
  if (!rawValue) return false

  const dismissedAt = Number(rawValue)
  if (!Number.isFinite(dismissedAt)) {
    window.localStorage.removeItem(DISMISS_STORAGE_KEY)
    return false
  }

  const stillDismissed = Date.now() - dismissedAt < DISMISS_DURATION_MS
  if (!stillDismissed) {
    window.localStorage.removeItem(DISMISS_STORAGE_KEY)
  }

  return stillDismissed
}

const trackEvent = (eventName: string) => {
  if (typeof window === 'undefined') return

  const analyticsWindow = window as Window & typeof globalThis & {
    gtag?: (...args: unknown[]) => void
  }

  if (typeof analyticsWindow.gtag === 'function') {
    analyticsWindow.gtag('event', eventName)
    return
  }

  console.log(`[analytics] ${eventName}`)
}

const SatisfactionGuaranteeBanner = ({ onVisibilityChange }: SatisfactionGuaranteeBannerProps) => {
  const location = useLocation()
  const [dismissed, setDismissed] = useState(isBannerDismissed)
  const [modalOpen, setModalOpen] = useState(false)
  const hasTrackedViewRef = useRef(false)

  const normalizedPath = location.pathname.length > 1 ? location.pathname.replace(/\/+$/, '') : location.pathname
  const hiddenOnThisPage = HIDDEN_PATHS.has(normalizedPath)
  const bannerVisible = !dismissed && !hiddenOnThisPage

  useEffect(() => {
    onVisibilityChange?.(bannerVisible)
  }, [bannerVisible, onVisibilityChange])

  useEffect(() => {
    if (!bannerVisible || hasTrackedViewRef.current) return
    trackEvent('banner_view')
    hasTrackedViewRef.current = true
  }, [bannerVisible])

  const handleDismissBanner = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(DISMISS_STORAGE_KEY, String(Date.now()))
    }
    setDismissed(true)
    setModalOpen(false)
    trackEvent('banner_close')
  }

  const handleOpenModal = () => {
    setModalOpen(true)
  }

  return (
    <>
      {bannerVisible && (
        <div className="fixed inset-x-0 bottom-0 z-50 px-3 pb-3 sm:px-4 sm:pb-4">
          <div className="container-page">
            <div className="rounded-2xl border border-sky-200/80 bg-white/95 p-4 shadow-2xl backdrop-blur">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-slate-700">
                  🛡️ Garantie satisfaction – vous gardez le contrôle. Intervention à distance : si le résultat n’est
                  pas au rendez-vous, on applique notre garantie.
                </p>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={handleOpenModal} className="btn-primary px-4 py-2 text-xs sm:text-sm">
                    Afficher les détails
                  </button>
                  <button
                    type="button"
                    onClick={handleDismissBanner}
                    className="btn-ghost gap-1 px-3 py-2 text-xs sm:text-sm"
                    aria-label="Fermer le bandeau Garantie satisfaction"
                  >
                    <span aria-hidden="true">✕</span>
                    <span>Fermer</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <GuaranteeDetailsModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}

export default SatisfactionGuaranteeBanner
