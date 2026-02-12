import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import SEO from '../components/SEO'
import ContactForm from '../components/ContactForm'
import PillBanner from '../components/PillBanner'
import GuaranteeHighlight from '../components/GuaranteeHighlight'
import { instagram } from '../content/instagram'
import { site } from '../content/site'
import { getServiceByProfileAndId, type ServiceProfile } from '../content/services'
import type { UserProfile } from '../utils/storage'

const Contact = () => {
  const [searchParams] = useSearchParams()
  const prefillProfile = useMemo(() => {
    const value = searchParams.get('profile')
    if (value === 'particulier' || value === 'entreprise') {
      return value as UserProfile
    }
    return undefined
  }, [searchParams])

  const prefillService = useMemo(() => {
    const profile = searchParams.get('profile')
    const serviceId = searchParams.get('serviceId')
    if (!profile || !serviceId) return undefined
    if (profile !== 'particulier' && profile !== 'entreprise') return undefined
    return getServiceByProfileAndId(profile as ServiceProfile, serviceId)?.title
  }, [searchParams])

  const prefillSubject = searchParams.get('subject') ?? undefined
  const prefillMessage = searchParams.get('message') ?? undefined
  const hasQuizSummaryPrefill = searchParams.get('includeQuizSummary') === '1' && Boolean(prefillMessage)

  return (
    <div className="space-y-16 pt-3 sm:pt-4">
      <SEO
        title="Transistor&CIE — Contact"
        description="Contactez Transistor&CIE pour demander un devis gratuit, 100% digital, partout en France."
      />

      <section className="container-page section-card p-8">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase text-slate-500">Contact</p>
            <h1 className="text-3xl font-semibold text-slate-900">Contact Transistor&CIE — Demandez votre devis gratuit</h1>
            <p className="text-sm text-slate-600">
              Décrivez votre besoin à Transistor&CIE et recevez une proposition claire. Interventions 100% digital, partout en France.
            </p>
            <PillBanner />
            <GuaranteeHighlight compact />
            <div className="rounded-2xl border border-slate-100 bg-white p-5">
              <p className="text-sm font-semibold text-slate-800">Coordonnées directes</p>
              <div className="mt-2 flex flex-col gap-1 text-sm text-slate-600">
                <a className="hover:text-slate-900" href={`tel:${site.phoneHref}`}>
                  {site.phoneDisplay} (appel direct)
                </a>
                <a className="hover:text-slate-900" href={site.whatsappUrl} target="_blank" rel="noreferrer">
                  WhatsApp
                </a>
                <a className="hover:text-slate-900" href={`mailto:${site.contactEmail}`}>
                  {site.contactEmail}
                </a>
                <a className="hover:text-slate-900" href={site.websiteUrl} target="_blank" rel="noreferrer">
                  {site.websiteUrl}
                </a>
              </div>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-white p-5">
              <p className="text-sm font-semibold text-slate-800">Instagram</p>
              <a
                href={instagram.url}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900"
              >
                {instagram.handle}
              </a>
            </div>
          </div>
          <div>
            {hasQuizSummaryPrefill && (
              <div className="mb-4 rounded-2xl border border-cyan-200 bg-cyan-50 p-4 text-sm text-cyan-900">
                Synthèse du test cyber préremplie dans le message. Vous pouvez la modifier avant envoi.
              </div>
            )}
            <ContactForm
              prefillProfile={prefillProfile}
              prefillService={prefillService}
              prefillSubject={prefillSubject}
              prefillMessage={prefillMessage}
            />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
