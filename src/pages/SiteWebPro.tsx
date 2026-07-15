import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import ContactForm from '../components/ContactForm'
import FounderNote from '../components/FounderNote'
import { site } from '../content/site'
import { getServiceByProfileAndId } from '../content/services'
import { useProfile } from '../utils/useProfile'
import heroWeb from '../assets/service-web-essentiels.jpg'

const SERVICE_TITLE = 'Création de sites Web Essentiels'

// Chaque libellé fait > 20 caractères pour être utilisé tel quel comme
// message (contrainte serveur Firestore).
const quickReasons = [
  'Je lance mon activité, il me faut un site',
  'Moderniser mon site vitrine actuel',
  'Obtenir des demandes de devis en ligne',
  'Améliorer mon image professionnelle',
  'Être visible sur Google localement',
  'Autre projet web',
]

const trustPoints = [
  {
    title: 'Orienté conversion',
    text: 'Un site pensé pour générer des demandes de devis, pas seulement pour faire joli.',
  },
  {
    title: 'La preuve : ce site',
    text: 'Le site que vous êtes en train de lire a été conçu et développé par Transistor&CIE.',
  },
  {
    title: 'SEO de base inclus',
    text: 'Structure, balises, sitemap et performances : les fondations pour être trouvé sur Google.',
  },
  {
    title: 'Simple à faire évoluer',
    text: 'Contenus centralisés et structure claire : votre site reste modifiable sans tout casser.',
  },
]

const steps = [
  { title: 'Cadrage', text: 'Objectifs, cibles, pages nécessaires et messages clés. On définit ce qui doit convertir.' },
  { title: 'Design & développement', text: 'Maquette moderne et responsive, intégration technique, formulaires et suivi.' },
  { title: 'Mise en ligne & prise en main', text: 'Déploiement, SEO de base, et accompagnement pour que vous soyez autonome.' },
]

const SiteWebPro = () => {
  const { setProfile } = useProfile()
  const service = getServiceByProfileAndId('entreprise', 'creation-site-web')
  const faq = service?.landing.faq ?? []

  useEffect(() => {
    setProfile('entreprise')
  }, [setProfile])

  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Création de site web professionnel',
      serviceType: SERVICE_TITLE,
      description:
        'Création de sites web clairs, professionnels et orientés conversion pour TPE/PME et indépendants. À partir de 800 €. 100% à distance, partout en France.',
      url: `${site.websiteUrl}/site-web-pro`,
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
        title="Création de site web professionnel — à partir de 800 € | Transistor&CIE"
        description="Un site clair, professionnel et orienté demandes de devis pour lancer ou moderniser votre présence en ligne. À partir de 800 €, devis gratuit, partout en France."
        image={heroWeb}
        structuredData={structuredData}
      />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 soft-grid" aria-hidden="true" />
        <div className="container-page relative grid items-center gap-10 py-10 sm:py-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <span className="chip bg-brand-cloud text-brand-ink">Site Web Essentiel · 100% à distance</span>
            <h1 className="text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl md:text-5xl">
              Un site web professionnel qui vous ramène des clients.
            </h1>
            <p className="text-base text-slate-600 sm:text-lg">
              Conception, design responsive, SEO de base et mise en ligne : une vitrine crédible et
              <strong className="font-semibold text-slate-800"> orientée demandes de devis</strong>, exploitable dès le
              premier jour.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a href="#form" className="btn-primary">
                Décrire mon projet
              </a>
              <a href={`tel:${site.phoneHref}`} className="btn-secondary">
                Appeler {site.phoneDisplay}
              </a>
            </div>
            <p className="text-sm font-semibold text-slate-800">À partir de 800 €</p>
            <p className="text-xs font-medium text-slate-500">
              Tarif indicatif selon pages et fonctionnalités · Devis gratuit · TVA non applicable
            </p>
          </div>
          <div className="relative">
            <div className="hero-panel rounded-3xl p-3 shadow-lift">
              <img
                src={heroWeb}
                alt="Création de site web professionnel Transistor&CIE"
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
                Décrivez votre projet, on chiffre gratuitement
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Choisissez votre situation en un clic et laissez vos coordonnées. Devis gratuit, sans engagement.
              </p>
            </div>
            <ContactForm
              express
              prefillProfile="entreprise"
              prefillService={SERVICE_TITLE}
              quickReasons={quickReasons}
              submitLabel="Recevoir mon devis web"
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
        <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">Et la sécurité de votre entreprise ?</h2>
        <p className="mt-2 text-sm text-slate-600">Site web + cybersécurité : les deux fondations de votre présence numérique.</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a href="#form" className="btn-primary">
            Décrire mon projet web
          </a>
          <Link to="/cybersecurite-pme" className="btn-secondary">
            Découvrir l’offre cybersécurité
          </Link>
        </div>
      </section>
    </div>
  )
}

export default SiteWebPro
