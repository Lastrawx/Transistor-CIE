import { useEffect, useMemo, useRef } from 'react'
import { cgvCguSections } from '../content/legal'

const FOCUSABLE_SELECTOR =
  'a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])'

type GuaranteeDetailsModalProps = {
  open: boolean
  onClose: () => void
}

const GuaranteeDetailsModal = ({ open, onClose }: GuaranteeDetailsModalProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  const guaranteeSection = useMemo(
    () => cgvCguSections.find((section) => section.id === 'garantie-satisfaction'),
    [],
  )

  useEffect(() => {
    if (!open) return

    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null

    const firstFocusable = modalRef.current?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR)
    firstFocusable?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
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
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-white/45 backdrop-blur-[1px] px-3 py-4 sm:items-center sm:px-4 sm:py-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="garantie-details-title"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        ref={modalRef}
        className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase text-emerald-700">Garantie satisfaction</p>
            <h2 id="garantie-details-title" className="text-2xl font-semibold text-slate-900">
              Détails de la garantie satisfaction
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="btn-ghost gap-1 px-3 py-2 text-xs sm:text-sm"
            aria-label="Fermer la fenêtre des détails de garantie"
          >
            <span aria-hidden="true">✕</span>
            <span>Fermer</span>
          </button>
        </div>

        <div className="mt-5 space-y-3 text-sm text-slate-700">
          {guaranteeSection ? (
            <>
              {guaranteeSection.paragraphs.map((paragraph, index) => (
                <p key={`garantie-paragraph-${index}`}>{paragraph}</p>
              ))}
              {guaranteeSection.items && guaranteeSection.items.length > 0 && (
                <ul className="list-disc pl-5">
                  {guaranteeSection.items.map((item, index) => (
                    <li key={`garantie-item-${index}`}>{item}</li>
                  ))}
                </ul>
              )}
              {guaranteeSection.postParagraphs &&
                guaranteeSection.postParagraphs.length > 0 &&
                guaranteeSection.postParagraphs.map((paragraph, index) => (
                  <p key={`garantie-post-paragraph-${index}`}>{paragraph}</p>
                ))}
            </>
          ) : (
            <p>Les détails de la garantie ne sont pas disponibles pour le moment.</p>
          )}
        </div>

        <div className="mt-6 flex justify-end">
          <button type="button" onClick={onClose} className="btn-primary px-4 py-2 text-sm">
            Fermer
          </button>
        </div>
      </div>
    </div>
  )
}

export default GuaranteeDetailsModal
