import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const DISMISS_STORAGE_KEY = 'satisfactionGuaranteeBannerDismissedAt'
const DISMISS_DURATION_MS = 7 * 24 * 60 * 60 * 1000
const HIDDEN_PATHS = new Set(['/cgv-cgu', '/cgv', '/cgu'])
const FOCUSABLE_SELECTOR =
  'a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])'

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
  const navigate = useNavigate()
  const [dismissed, setDismissed] = useState(isBannerDismissed)
  const [modalOpen, setModalOpen] = useState(false)
  const modalRef = useRef<HTMLDivElement | null>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)
  const hasTrackedViewRef = useRef(false)

  const hiddenOnThisPage = HIDDEN_PATHS.has(location.pathname)
  const bannerVisible = !dismissed && !hiddenOnThisPage

  useEffect(() => {
    onVisibilityChange?.(bannerVisible)
  }, [bannerVisible, onVisibilityChange])

  useEffect(() => {
    if (!bannerVisible || hasTrackedViewRef.current) return
    trackEvent('banner_view')
    hasTrackedViewRef.current = true
  }, [bannerVisible])

  useEffect(() => {
    if (!modalOpen) return

    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null

    const firstFocusable = modalRef.current?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR)
    firstFocusable?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setModalOpen(false)
        return
      }

      if (event.key !== 'Tab') return

      const dialog = modalRef.current
      if (!dialog) return

      const focusableElements = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
      if (focusableElements.length === 0) {
        event.preventDefault()
        return
      }

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]
      const activeElement = document.activeElement

      if (event.shiftKey) {
        if (activeElement === firstElement || !dialog.contains(activeElement)) {
          event.preventDefault()
          lastElement.focus()
        }
        return
      }

      if (activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
      previousFocusRef.current?.focus()
    }
  }, [modalOpen])

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

  const handleSeeClause = () => {
    setModalOpen(false)
    navigate('/cgv-cgu#garantie-satisfaction')
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
                    En savoir plus
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

      {modalOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-slate-900/50 px-3 py-4 sm:items-center sm:px-4 sm:py-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="garantie-satisfaction-title"
          onClick={(event) => {
            if (event.target === event.currentTarget) setModalOpen(false)
          }}
        >
          <div
            ref={modalRef}
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl"
          >
            <div className="flex items-start justify-between gap-4">
              <h2 id="garantie-satisfaction-title" className="text-2xl font-semibold text-slate-900">
                Garantie satisfaction Transistor&CIE
              </h2>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="btn-ghost gap-1 px-3 py-2 text-xs sm:text-sm"
                aria-label="Fermer la fenêtre Garantie satisfaction"
              >
                <span aria-hidden="true">✕</span>
                <span>Fermer</span>
              </button>
            </div>

            <div className="mt-5 space-y-5 text-sm text-slate-700">
              <p>Notre objectif est simple : un résultat concret et une expérience claire.</p>

              <div className="space-y-3">
                <p className="font-semibold text-slate-900">Comment ça fonctionne ?</p>
                <div className="space-y-2">
                  <p>1) Avant l’intervention, nous établissons un devis qui précise :</p>
                  <ul className="list-disc space-y-1 pl-5">
                    <li>le périmètre (ce qui est inclus / exclu),</li>
                    <li>les objectifs mesurables attendus,</li>
                    <li>le tarif et les modalités.</li>
                  </ul>
                </div>
                <p>
                  2) À la fin de l’intervention, si le résultat défini au devis n’est pas atteint, vous pouvez demander
                  l’application de notre garantie (conditions ci-dessous).
                </p>
              </div>

              <div className="space-y-2">
                <p className="font-semibold text-slate-900">Conditions de la garantie</p>
                <ul className="list-disc space-y-1 pl-5">
                  <li>Valable pour les devis ≤ 150 € TTC.</li>
                  <li>
                    La satisfaction s’évalue sur des critères objectifs définis dans le devis (résultat attendu /
                    livrables).
                  </li>
                  <li>La demande doit être effectuée dans les 48 heures suivant la fin de l’intervention.</li>
                  <li>
                    La garantie ne s’applique pas lorsque la difficulté rencontrée est externe au périmètre du devis ou
                    lorsque les pré-requis indiqués au devis n’ont pas été respectés par le Client.
                  </li>
                  <li>
                    À des fins de prévention de la fraude, un justificatif d’identité peut être demandé si nécessaire.
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button type="button" onClick={() => setModalOpen(false)} className="btn-ghost px-4 py-2 text-sm">
                Fermer
              </button>
              <button type="button" onClick={handleSeeClause} className="btn-primary px-4 py-2 text-sm">
                Voir la clause dans les CGV
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default SatisfactionGuaranteeBanner
