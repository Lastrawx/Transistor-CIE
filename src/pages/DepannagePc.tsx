import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import ContactForm from '../components/ContactForm'
import PriceEstimator from '../components/PriceEstimator'
import { site } from '../content/site'
import { getServiceByProfileAndId } from '../content/services'
import { useProfile } from '../utils/useProfile'
import heroAssistance from '../assets/service-assistance.webp'

const SERVICE_TITLE = 'Assistance & Dépannage Informatique'

// Symptômes : servent à la fois de cartes "ce qu'on répare" et de boutons
// rapides dans le formulaire. Chaque libellé fait > 20 caractères pour être
// utilisé tel quel comme message (contrainte serveur Firestore).
const symptoms = [
  'Mon PC est lent ou se fige',
  'Écran bleu / plantages au démarrage',
  'Virus, pubs ou pop-ups suspects',
  'Wi-Fi ou connexion instable',
  'Impossible de me connecter (mots de passe)',
  'Mises à jour ou logiciels qui bloquent',
  'Imprimante ou périphérique introuvable',
  'Autre problème informatique',
]

const trustPoints = [
  {
    title: 'Expert systèmes & réseaux',
    text: 'Ancien administrateur réseaux & systèmes, formé à l’École des transmissions. Un vrai pro, pas un standard.',
  },
  {
    title: '100% à distance',
    text: 'Partout en France, par visio ou prise en main sécurisée (TeamViewer ou équivalent). Aucun déplacement.',
  },
  {
    title: 'Devis gratuit',
    text: 'Diagnostic clair avant toute intervention. Vous validez le prix d’abord, sans engagement.',
  },
  {
    title: 'Garantie satisfaction',
    text: 'Si le résultat défini n’est pas atteint, on applique la garantie selon les conditions prévues.',
  },
]

const steps = [
  { title: 'Diagnostic', text: 'Vous décrivez la panne, on identifie la cause rapidement et clairement.' },
  { title: 'Correction', text: 'Réparation à distance, en visio ou prise en main sécurisée, expliquée simplement.' },
  { title: 'Conseils + sécurisation', text: 'Bonnes pratiques, sauvegarde et prévention pour éviter que ça recommence.' },
]

const DepannagePc = () => {
  const { setProfile } = useProfile()
  const service = getServiceByProfileAndId('particulier', 'assistance-depannage')
  const faq = service?.landing.faq ?? []
  // Message poussé par l'estimateur vers le formulaire (« Recevoir ce devis par écrit »).
  const [estimateMessage, setEstimateMessage] = useState('')

  useEffect(() => {
    setProfile('particulier')
  }, [setProfile])

  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Dépannage informatique à distance',
      serviceType: SERVICE_TITLE,
      description:
        'Diagnostic et réparation à distance des pannes logicielles : PC lent, virus, écran bleu, Wi-Fi, connexion. 100% digital, partout en France. Devis gratuit.',
      url: `${site.websiteUrl}/depannage-pc`,
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
        title="Dépannage informatique à distance — Transistor&CIE"
        description="PC lent, virus, écran bleu, Wi-Fi qui décroche ? Estimez votre prix en 1 clic, puis réparation à distance, souvent en moins de 24h. Devis gratuit, partout en France."
        image={heroAssistance}
        structuredData={structuredData}
      />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 soft-grid" aria-hidden="true" />
        <div className="container-page relative grid items-center gap-10 py-10 sm:py-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <span className="chip bg-brand-cloud text-brand-ink">Dépannage informatique · 100% à distance</span>
            <h1 className="text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl md:text-5xl">
              Votre PC rame, plante ou affiche des erreurs ?
            </h1>
            <p className="text-base text-slate-600 sm:text-lg">
              On diagnostique et on répare <strong className="font-semibold text-slate-800">à distance</strong>, sans
              déplacement — souvent en moins de 24h. Devis gratuit : vous ne payez rien tant que vous n’avez pas validé.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a href="#estimation" className="btn-primary">
                ⚡ Estimer mon prix en 1 clic
              </a>
              <a href={`tel:${site.phoneHref}`} className="btn-secondary">
                Appeler {site.phoneDisplay}
              </a>
              <a href={site.whatsappUrl} target="_blank" rel="noreferrer" className="btn-whatsapp-soft">
                WhatsApp
              </a>
            </div>
            <p className="text-sm font-semibold text-slate-800">
              Diagnostic 45 € — déduit si intervention · Forfaits dès 59 €
            </p>
            <p className="text-xs font-medium text-slate-500">
              Tarifs indicatifs, devis gratuit personnalisé · TVA non applicable (art. 293 B du CGI) · Réponse sous 24–48h ouvrées · Garantie satisfaction
            </p>
          </div>
          <div className="relative">
            <div className="hero-panel rounded-3xl p-3 shadow-lift">
              <img
                src={heroAssistance}
                alt="Dépannage informatique à distance Transistor&CIE"
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

      {/* ESTIMATEUR DE PRIX */}
      <section id="estimation" className="container-page scroll-mt-24 space-y-5">
        <div>
          <p className="text-xs font-semibold uppercase text-slate-500">Estimation immédiate — sans coordonnées</p>
          <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">Votre prix en 1 clic</h2>
          <p className="mt-2 text-sm text-slate-600">
            Touchez votre situation, le forfait s’affiche aussitôt. Le prix est ensuite confirmé par un devis
            gratuit : vous ne payez que ce que vous avez validé.
          </p>
        </div>
        <PriceEstimator onQuoteRequest={setEstimateMessage} />
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
                Décrivez votre problème, on vous répond vite
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Choisissez votre souci en un clic et laissez vos coordonnées. C’est gratuit et sans engagement.
              </p>
            </div>
            <ContactForm
              express
              prefillProfile="particulier"
              prefillService={SERVICE_TITLE}
              quickReasons={symptoms}
              externalMessage={estimateMessage || undefined}
              submitLabel="Être recontacté gratuitement"
            />
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-slate-100 bg-white p-5">
              <p className="text-sm font-semibold text-slate-800">Vous préférez ne pas laisser vos coordonnées ici ?</p>
              <p className="mt-1 text-sm text-slate-600">Appelez ou écrivez sur WhatsApp : réponse directe, et c’est vous qui gardez la main sur l’échange.</p>
              <div className="mt-4 flex flex-col gap-2">
                <a href={`tel:${site.phoneHref}`} className="btn-primary justify-center">
                  Appeler {site.phoneDisplay}
                </a>
                <a href={site.whatsappUrl} target="_blank" rel="noreferrer" className="btn-whatsapp-soft justify-center">
                  Écrire sur WhatsApp
                </a>
                <a href={`mailto:${site.contactEmail}`} className="btn-ghost justify-center">
                  {site.contactEmail}
                </a>
              </div>
            </div>
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-5">
              <p className="text-xs font-semibold uppercase text-emerald-700">Pourquoi nous faire confiance</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                <li>✅ Diagnostic et devis gratuits, avant toute intervention</li>
                <li>✅ Réparation à distance, sans déplacement</li>
                <li>✅ Garantie satisfaction selon conditions</li>
                <li>✅ Explications claires, sans jargon</li>
              </ul>
            </div>
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
        <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">Un problème à régler maintenant ?</h2>
        <p className="mt-2 text-sm text-slate-600">
          Décrivez-le en quelques secondes, la réponse est rapide et le devis gratuit.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a href="#estimation" className="btn-primary">
            ⚡ Estimer mon prix en 1 clic
          </a>
          <a href="#form" className="btn-ghost">
            Décrire mon problème
          </a>
          <Link to="/particulier" className="btn-secondary">
            Voir tous les services
          </Link>
        </div>
      </section>
    </div>
  )
}

export default DepannagePc
