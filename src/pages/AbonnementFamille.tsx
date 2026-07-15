import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import ContactForm from '../components/ContactForm'
import FounderNote from '../components/FounderNote'
import { site } from '../content/site'
import { getServiceByProfileAndId } from '../content/services'
import { useProfile } from '../utils/useProfile'
import heroFamille from '../assets/service-support-familial-abonnement.jpg'

const SERVICE_TITLE = 'Support Digital Familial (Abonnement foyer)'

// Chaque libellé fait > 20 caractères pour être utilisé tel quel comme
// message (contrainte serveur Firestore).
const quickReasons = [
  'Aider un parent senior à distance',
  'Sécuriser les comptes de la famille',
  'Trop d’appareils à gérer au quotidien',
  'Besoin d’aide régulière, sans stress',
  'Être conseillé avant chaque achat tech',
  'Autre besoin pour le foyer',
]

const trustPoints = [
  {
    title: 'Un interlocuteur unique',
    text: 'Le même expert pour tous les sujets numériques du foyer : PC, smartphones, box, imprimantes, comptes.',
  },
  {
    title: 'Hotline dédiée',
    text: 'Une ligne directe pour vos questions et pannes du quotidien, selon la formule choisie au devis.',
  },
  {
    title: 'Pédagogie tous âges',
    text: 'Mini-formations adaptées : adultes, seniors, ados. On explique simplement, sans jargon.',
  },
  {
    title: 'Sans surprise',
    text: 'Périmètre, fréquence et tarif définis noir sur blanc au devis. Devis gratuit, TVA non applicable.',
  },
]

const steps = [
  { title: 'Audit du foyer', text: 'Cartographie des appareils, comptes et usages de chacun. On identifie les risques et les priorités.' },
  { title: 'Sécurisation & mise en place', text: 'Mots de passe, sauvegardes, bonnes pratiques : on pose des bases saines pour toute la famille.' },
  { title: 'Assistance toute l’année', text: 'Aide au quotidien, accompagnement des projets et points réguliers. Vous n’êtes plus jamais seul face à la tech.' },
]

const AbonnementFamille = () => {
  const { setProfile } = useProfile()
  const service = getServiceByProfileAndId('particulier', 'support-digital-familial-abonnement')
  const faq = service?.landing.faq ?? []

  useEffect(() => {
    setProfile('particulier')
  }, [setProfile])

  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Abonnement Sérénité Famille',
      serviceType: SERVICE_TITLE,
      description:
        'Abonnement mensuel d’assistance numérique pour tout le foyer : audit initial, sécurisation, aide au quotidien et mini-formations. 100% à distance, partout en France.',
      url: `${site.websiteUrl}/abonnement-famille`,
      areaServed: 'FR',
      provider: {
        '@type': 'Organization',
        '@id': `${site.websiteUrl}/#organization`,
        name: site.brand,
        url: site.websiteUrl,
        telephone: site.phoneDisplay,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    },
  ]

  return (
    <div className="space-y-14 pt-3 sm:pt-4">
      <SEO
        title="Abonnement Sérénité Famille — assistance numérique du foyer | Transistor&CIE"
        description="Toute la tech de votre famille prise en charge : assistance au quotidien, sécurisation, aide aux seniors, mini-formations. À partir de 39 €/mois, partout en France."
        image={heroFamille}
        structuredData={structuredData}
      />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 soft-grid" aria-hidden="true" />
        <div className="container-page relative grid items-center gap-10 py-10 sm:py-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <span className="chip bg-brand-cloud text-brand-ink">Abonnement Sérénité Famille · 100% à distance</span>
            <h1 className="text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl md:text-5xl">
              Toute la tech de votre famille, prise en charge toute l’année.
            </h1>
            <p className="text-base text-slate-600 sm:text-lg">
              Assistance au quotidien, sécurisation des comptes, aide aux parents et grands-parents, conseils avant
              chaque achat : un seul interlocuteur pour tout le foyer, <strong className="font-semibold text-slate-800">sans déplacement</strong>.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a href="#form" className="btn-primary">
                Demander mon devis famille
              </a>
              <a href={`tel:${site.phoneHref}`} className="btn-secondary">
                Appeler {site.phoneDisplay}
              </a>
              <a href={site.whatsappUrl} target="_blank" rel="noreferrer" className="btn-whatsapp-soft">
                WhatsApp
              </a>
            </div>
            <p className="text-sm font-semibold text-slate-800">À partir de 39 €/mois — mise en place 99 €</p>
            <p className="text-xs font-medium text-slate-500">
              Tarif indicatif selon la composition du foyer · Devis gratuit · Garantie satisfaction
            </p>
          </div>
          <div className="relative">
            <div className="hero-panel rounded-3xl p-3 shadow-lift">
              <img
                src={heroFamille}
                alt="Abonnement d’assistance numérique familiale Transistor&CIE"
                className="w-full rounded-2xl"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CONFIANCE */}
      <section className="container-page">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trustPoints.map((point) => (
            <div key={point.title} className="section-card h-full p-5">
              <h2 className="text-base font-semibold text-slate-900">{point.title}</h2>
              <p className="mt-2 text-sm text-slate-600">{point.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* COMMENT ÇA SE PASSE */}
      <section className="container-page section-card p-6 sm:p-8">
        <div className="space-y-5">
          <div>
            <p className="text-xs font-semibold uppercase text-slate-500">Comment ça se passe ?</p>
            <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">Simple, en 3 étapes</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.title} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                <p className="text-lg font-semibold text-slate-900">
                  {index + 1}. {step.title}
                </p>
                <p className="mt-2 text-sm text-slate-600">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORMULAIRE */}
      <section id="form" className="container-page section-card p-6 sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold uppercase text-slate-500">Demande rapide</p>
              <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
                Parlez-nous de votre foyer, on construit la formule
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Choisissez votre situation en un clic et laissez vos coordonnées. Devis gratuit, sans engagement.
              </p>
            </div>
            <ContactForm
              express
              prefillProfile="particulier"
              prefillService={SERVICE_TITLE}
              quickReasons={quickReasons}
              submitLabel="Recevoir mon devis famille"
            />
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-slate-100 bg-white p-5">
              <p className="text-sm font-semibold text-slate-800">Vous préférez ne pas laisser vos coordonnées ici ?</p>
              <div className="mt-4 flex flex-col gap-2">
                <a href={`tel:${site.phoneHref}`} className="btn-primary justify-center">
                  Appeler {site.phoneDisplay}
                </a>
                <a href={site.whatsappUrl} target="_blank" rel="noreferrer" className="btn-whatsapp-soft justify-center">
                  Écrire sur WhatsApp
                </a>
              </div>
            </div>
            <FounderNote />
          </aside>
        </div>
      </section>

      {/* FAQ */}
      {faq.length > 0 && (
        <section className="container-page section-card p-6 sm:p-8">
          <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">Questions fréquentes</h2>
          <div className="mt-4 grid gap-3">
            {faq.map((item) => (
              <details key={item.question} className="group rounded-2xl border border-slate-100 bg-white p-4">
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-sm font-semibold text-slate-800">
                  {item.question}
                  <span className="text-brand-cyan transition group-open:rotate-180">▾</span>
                </summary>
                <p className="mt-3 text-sm text-slate-600">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* CTA FINAL */}
      <section className="container-page section-card p-6 text-center sm:p-8">
        <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">Un souci ponctuel plutôt qu’un abonnement ?</h2>
        <p className="mt-2 text-sm text-slate-600">Le dépannage à la demande existe aussi, dès 45 €.</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a href="#form" className="btn-primary">
            Demander mon devis famille
          </a>
          <Link to="/depannage-pc" className="btn-secondary">
            Voir le dépannage ponctuel
          </Link>
        </div>
      </section>
    </div>
  )
}

export default AbonnementFamille
