import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import SEO from '../components/SEO'
import CyberRiskQuiz from '../components/CyberRiskQuiz'
import { buildServiceQuoteLink, getServiceByProfileAndId, type ServiceProfile } from '../content/services'
import { site } from '../content/site'
import { useProfile } from '../utils/useProfile'

type ServiceOfferProps = {
  profile: ServiceProfile
}

const ServiceOffer = ({ profile }: ServiceOfferProps) => {
  const { setProfile } = useProfile()
  const { serviceId } = useParams<{ serviceId: string }>()

  useEffect(() => {
    setProfile(profile)
  }, [profile, setProfile])

  if (!serviceId) {
    return <Navigate to={`/${profile}`} replace />
  }

  const service = getServiceByProfileAndId(profile, serviceId)

  if (!service) {
    return <Navigate to={`/${profile}`} replace />
  }

  const quoteLink = buildServiceQuoteLink(profile, service.id)
  const finalSecondaryCta = service.landing.finalSecondaryCta
  const hasCyberQuiz =
    profile === 'entreprise' &&
    (service.id === 'cybersecurite-essentielle' || service.id === 'abonnement-cybersecurite-pme')
  const secondaryCtaToQuiz =
    hasCyberQuiz && finalSecondaryCta?.label.toLowerCase().includes('évaluer') === true
  const secondaryQuoteLink =
    finalSecondaryCta && !secondaryCtaToQuiz ? buildServiceQuoteLink(profile, service.id, finalSecondaryCta.subject) : null
  const relatedOffer = service.landing.relatedOffer
  const relatedOfferLink = relatedOffer ? `/${relatedOffer.profile}/${relatedOffer.serviceId}` : null
  const profileLabel = profile === 'particulier' ? 'Particuliers' : 'Entreprises'
  const faqEntries = service.landing.faq.slice(0, 3)
  const profilePath = `/${profile}`
  const profileUrl = `${site.websiteUrl}${profilePath}`
  const serviceUrl = `${site.websiteUrl}/${profile}/${service.id}`
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: service.title,
      serviceType: service.title,
      description: service.offer,
      url: serviceUrl,
      areaServed: 'FR',
      audience: {
        '@type': 'Audience',
        audienceType: profileLabel,
      },
      provider: {
        '@type': 'Organization',
        '@id': `${site.websiteUrl}/#organization`,
        name: site.brand,
        url: site.websiteUrl,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqEntries.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Accueil',
          item: site.websiteUrl,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: `Pôle ${profileLabel}`,
          item: profileUrl,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: service.title,
          item: serviceUrl,
        },
      ],
    },
  ]

  return (
    <div className="space-y-12 pt-3 sm:pt-4">
      <SEO
        title={`Transistor&CIE — ${service.title}`}
        description={`${service.offer} ${service.modalities}.`}
        image={service.image}
        structuredData={structuredData}
      />

      <section className="container-page section-card p-8">
        <div className="space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="chip">Pôle {profileLabel}</span>
            <span className="inline-flex items-center rounded-full bg-emerald-100 px-4 py-2 text-xs font-semibold text-emerald-800">
              {service.modalities}
            </span>
          </div>
          <h1 className="text-3xl font-semibold leading-tight text-slate-900 md:text-4xl">{service.title}</h1>
          <h2 className="text-2xl font-semibold leading-tight text-slate-900 md:text-3xl">{service.landing.heroTitle}</h2>
          <p className="text-base text-slate-600 md:text-lg">{service.landing.heroSubtitle}</p>
          <div className="flex flex-wrap gap-3">
            <Link to={quoteLink} className="btn-primary">
              Demander un devis
            </Link>
            <Link to={profilePath} className="btn-secondary">
              Retour aux offres
            </Link>
          </div>
          {hasCyberQuiz && (
            <div className="pt-1">
              <a href="#quiz-cyber" className="btn-cyber-quiz">
                <span>Évaluer mon risque cyber</span>
                <span className="btn-cyber-quiz-pill">Diagnostic 2-4 min</span>
              </a>
            </div>
          )}
        </div>
      </section>

      <section className="container-page grid gap-6 lg:grid-cols-2">
        <article className="section-card p-6">
          <h2 className="text-2xl font-semibold text-slate-900">Pour qui / Cas d’usage</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600">
            {service.landing.useCases.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="section-card p-6">
          <h2 className="text-2xl font-semibold text-slate-900">Ce que comprend l’offre</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600">
            {service.includes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="section-card p-6">
          <h2 className="text-2xl font-semibold text-slate-900">Résultats / Bénéfices</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600">
            {service.benefits.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="section-card p-6">
          <h2 className="text-2xl font-semibold text-slate-900">Déroulé en 3 étapes</h2>
          <div className="mt-4 grid gap-3">
            {service.landing.processSteps.slice(0, 3).map((step, index) => (
              <div key={step} className="rounded-2xl border border-slate-100 bg-white p-4 text-sm text-slate-700">
                <p className="font-semibold text-slate-900">{index + 1}. {step}</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="container-page section-card p-6">
        <h2 className="text-2xl font-semibold text-slate-900">Modalités</h2>
        <p className="mt-3 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-900">{service.modalities}</p>
        {service.landing.pricingNote && (
          <p className="mt-3 text-sm text-slate-600">{service.landing.pricingNote}</p>
        )}
      </section>

      {relatedOffer && relatedOfferLink && (
        <section className="container-page section-card p-6">
          <h2 className="text-2xl font-semibold text-slate-900">Suivi continu</h2>
          <p className="mt-3 text-sm text-slate-600">{relatedOffer.text}</p>
          <div className="mt-4">
            <Link to={relatedOfferLink} className="btn-secondary">
              {relatedOffer.buttonLabel}
            </Link>
          </div>
        </section>
      )}

      {hasCyberQuiz && (
        <section className="container-page section-card p-6">
          <h2 className="text-2xl font-semibold text-slate-900">Évaluer mon risque cyber</h2>
          <CyberRiskQuiz profile={profile} serviceId={service.id} serviceTitle={service.title} />
        </section>
      )}

      <section className="container-page section-card p-6">
        <h2 className="text-2xl font-semibold text-slate-900">FAQ</h2>
        <div className="mt-4 grid gap-3">
          {faqEntries.map((item) => (
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

      <section className="container-page section-card p-8 text-center">
        <h2 className="text-3xl font-semibold text-slate-900">Besoin d’un devis sur ce sujet ?</h2>
        <p className="mt-2 text-sm text-slate-600">Objet prérempli : {service.defaultSubject}</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link to={quoteLink} className="btn-primary">
            Demander un devis
          </Link>
          {secondaryQuoteLink && finalSecondaryCta && !secondaryCtaToQuiz && (
            <Link to={secondaryQuoteLink} className="btn-secondary">
              {finalSecondaryCta.label}
            </Link>
          )}
        </div>
        {secondaryCtaToQuiz && finalSecondaryCta && (
          <div className="mt-4 flex justify-center">
            <a href="#quiz-cyber" className="btn-cyber-quiz">
              <span>{finalSecondaryCta.label}</span>
              <span className="btn-cyber-quiz-pill">Auto-évaluation</span>
            </a>
          </div>
        )}
      </section>
    </div>
  )
}

export default ServiceOffer
