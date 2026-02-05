import { useEffect } from 'react'
import ContactForm from './ContactForm'
import type { Service } from '../content/services'
import type { UserProfile } from '../utils/storage'

const ContactModal = ({
  open,
  onClose,
  service,
  profile,
}: {
  open: boolean
  onClose: () => void
  service?: Service | null
  profile?: UserProfile | null
}) => {
  useEffect(() => {
    if (!open) return
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 py-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="max-h-full w-full max-w-3xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase text-slate-400">Demande de devis</p>
            <h2 className="text-2xl font-semibold text-slate-900">Parlons de votre besoin</h2>
            <p className="mt-2 text-sm text-slate-600">100% à distance, devis gratuit.</p>
          </div>
          <button type="button" onClick={onClose} className="btn-ghost">
            Fermer
          </button>
        </div>
        <div className="mt-6">
          <ContactForm
            prefillProfile={profile ?? undefined}
            prefillService={service?.title}
            prefillSubject={service?.defaultSubject}
            compact
          />
        </div>
      </div>
    </div>
  )
}

export default ContactModal
