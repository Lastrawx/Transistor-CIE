import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import ContactForm from '../components/ContactForm'
import FounderNote from '../components/FounderNote'
import CyberRiskQuiz from '../components/CyberRiskQuiz'
import { site } from '../content/site'
import { getServiceByProfileAndId } from '../content/services'
import { useProfile } from '../utils/useProfile'
import heroCyber from '../assets/service-abonnement-cyber-pme.jpg'

const SERVICE_TITLE = 'Cybersécurité TPE/PME (mise à niveau + suivi)'
const QUIZ_SERVICE_ID = 'cybersecurite-essentielle'

// Chaque libellé fait > 20 caractères pour être utilisé tel quel comme
// message (contrainte serveur Firestore).
const quickReasons = [
  'Nous recevons des emails de phishing',
  'Sécuriser nos accès à distance (VPN)',
  'Pas de service informatique interne',
  'Mettre en place de vraies sauvegardes',
  'Évaluer notre niveau de risque cyber',
  'Autre besoin de sécurité',
]

const formules = [
  {
    name: 'Formule 1 — Mise à niveau Essentielle',
    price: 'À partir de 530 €',
    text: 'Audit sécurité, MFA, gestion des comptes et des droits, accès distants, sauvegardes, sensibilisation phishing. Objectif : votre PME sécurisée en 1 mois (selon périmètre).',
    highlight: false,
  },
  {
    name: 'Formule 2 — Suivi continu',
    price: 'Abonnement mensuel, sur devis selon taille',
    text: 'Après la mise à niveau : contrôles réguliers, mises à jour des protections, simulations phishing, hotline 24/7 pour incidents critiques (SLA contractuel au devis).',
    highlight: true,
  },
]

const trustPoints = [
  {
    title: 'Formé aux transmissions militaires',
    text: 'Liaisons chiffrées, infrastructures sensibles : une culture de la sécurité issue de l’École nationale des transmissions.',
  },
  {
    title: 'Pensé pour les TPE/PME',
    text: 'Des mesures concrètes et priorisées, compatibles avec une petite structure. Sans jargon inutile.',
  },
  {
    title: '100% à distance',
    text: 'Audit, déploiement et suivi pilotés à distance, partout en France. Aucun déplacement à facturer.',
  },
  {
    title: 'Devis gratuit',
    text: 'Périmètre, calendrier et engagements (SLA) définis noir sur blanc avant tout démarrage.',
  },
]

const CybersecuritePme = () => {
  const { setProfile } = useProfile()
  const essentielle = getServiceByProfileAndId('entreprise', 'cybersecurite-essentielle')
  const abonnement = getServiceByProfileAndId('entreprise', 'abonnement-cybersecurite-pme')
  const faq = [...(essentielle?.landing.faq.slice(0, 2) ?? []), ...(abonnement?.landing.faq.slice(0, 2) ?? [])]

  useEffect(() => {
    setProfile('entreprise')
  }, [setProfile])

  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Cybersécurité TPE/PME',
      serviceType: SERVICE_TITLE,
      description:
        'Mise à niveau cybersécurité complète pour TPE/PME (audit, MFA, accès distants, sauvegardes, phishing) puis suivi continu en abonnement. 100% à distance, partout en France.',
      url: `${site.websiteUrl}/cybersecurite-pme`,
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
        title="Cybersécurité TPE/PME — mise à niveau en 1 mois | Transistor&CIE"
        description="Phishing, accès distants, sauvegardes : sécurisez votre PME en 1 mois, puis gardez un suivi continu. Sans équipe informatique interne. Devis gratuit, partout en France."
        image={heroCyber}
        structuredData={structuredData}
      />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 soft-grid" aria-hidden="true" />
        <div className="container-page relative grid items-center gap-10 py-10 sm:py-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <span className="chip bg-brand-cloud text-brand-ink">Cybersécurité TPE/PME · 100% à distance</span>
            <h1 className="text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl md:text-5xl">
              Sécurisez votre PME en 1 mois, sans équipe informatique.
            </h1>
            <p className="text-base text-slate-600 sm:text-lg">
              Phishing, mots de passe, accès distants, sauvegardes : on met votre entreprise à niveau avec des mesures
              concrètes — puis on assure le suivi dans la durée si vous le souhaitez.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a href="#form" className="btn-primary">
                Demander mon devis sécurité
              </a>
              <a href="#quiz-cyber" className="btn-cyber-quiz">
                <span>Évaluer mon risque cyber</span>
                <span className="btn-cyber-quiz-pill">Diagnostic 2-4 min</span>
              </a>
            </div>
            <p className="text-sm font-semibold text-slate-800">
              Mise à niveau : à partir de 530 € · Suivi mensuel : sur devis selon taille
            </p>
            <p className="text-xs font-medium text-slate-500">
              Tarifs indicatifs, devis gratuit personnalisé · TVA non applicable (art. 293 B du CGI) · Réponse sous 24–48h ouvrées
            </p>
          </div>
          <div className="relative">
            <div className="hero-panel rounded-3xl p-3 shadow-lift">
              <img
                src={heroCyber}
                alt="Cybersécurité TPE/PME Transistor&CIE"
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

      {/* FORMULES */}
      <section className="container-page space-y-5">
        <div>
          <p className="text-xs font-semibold uppercase text-slate-500">Deux formules complémentaires</p>
          <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">Mise à niveau, puis suivi si besoin</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {formules.map((formule) => (
            <div
              key={formule.name}
              className={`section-card h-full p-6 ${formule.highlight ? 'border-emerald-200 bg-emerald-50/60' : ''}`}
            >
              <h3 className="text-lg font-semibold text-slate-900">{formule.name}</h3>
              <p className="mt-1 text-sm font-semibold text-sky-800">{formule.price}</p>
              <p className="mt-3 text-sm text-slate-600">{formule.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* QUIZ */}
      <section className="container-page section-card p-6 sm:p-8">
        <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">Évaluer mon risque cyber</h2>
        <p className="mt-2 text-sm text-slate-600">
          Répondez à quelques questions : vous obtenez votre niveau de risque et une synthèse à joindre à votre demande.
        </p>
        <CyberRiskQuiz profile="entreprise" serviceId={QUIZ_SERVICE_ID} serviceTitle={SERVICE_TITLE} />
      </section>

      {/* FORMULAIRE */}
      <section id="form" className="container-page section-card p-6 sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold uppercase text-slate-500">Demande rapide</p>
              <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
                Décrivez votre situation, on vous répond vite
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Choisissez votre priorité en un clic et laissez vos coordonnées. Devis gratuit, sans engagement.
              </p>
            </div>
            <ContactForm
              express
              prefillProfile="entreprise"
              prefillService={SERVICE_TITLE}
              quickReasons={quickReasons}
              submitLabel="Recevoir mon devis sécurité"
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
        <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">Besoin d’autre chose pour votre entreprise ?</h2>
        <p className="mt-2 text-sm text-slate-600">Site web, infrastructure IT, Green IT : parlons-en.</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a href="#form" className="btn-primary">
            Demander mon devis sécurité
          </a>
          <Link to="/entreprise" className="btn-secondary">
            Voir les offres entreprises
          </Link>
        </div>
      </section>
    </div>
  )
}

export default CybersecuritePme
