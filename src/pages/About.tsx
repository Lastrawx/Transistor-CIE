import { useMemo } from 'react'
import SEO from '../components/SEO'
import FAQ from '../components/FAQ'
import { faqItems } from '../content/faq'
import { site } from '../content/site'
import iconChip from '../assets/icon-chip.webp'

const About = () => {
  const faqEntries = useMemo(() => faqItems.slice(0, 7), [])
  const brandAliasesText = site.brandAliases.join(' , ')
  const faqStructuredData = useMemo(
    () => [
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
        publisher: {
          '@type': 'Organization',
          '@id': `${site.websiteUrl}/#organization`,
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': `${site.websiteUrl}/#organization`,
        name: site.brand,
        legalName: site.brand,
        alternateName: site.brandAliases,
      },
    ],
    [faqEntries],
  )

  return (
    <div className="space-y-16 pt-3 sm:pt-4">
      <SEO
        title="Transistor&CIE — À propos"
        description="Vision, valeurs et mode d'intervention 100% digital, partout en France."
        structuredData={faqStructuredData}
      />

      <section className="container-page section-card p-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase text-slate-500">Qui sommes-nous ?</p>
            <h1 className="text-3xl font-semibold text-slate-900">Un partenaire tech & Green IT</h1>
            <p className="text-sm text-slate-600">
              Transistor&CIE accompagne particuliers et entreprises avec une approche pédagogique, amicale et efficace.
              L'objectif est de vous simplifier la tech, améliorer votre quotidien et/ou vos performances et réduire
              votre empreinte numérique.
            </p>
            <p className="text-xs text-slate-500">
              Pour la recherche Google, notre marque peut aussi être écrite : {brandAliasesText}.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { title: 'Sobriété', text: 'Des solutions utiles, durables et responsables.' },
                { title: 'Pédagogie', text: 'Comprendre pour mieux décider.' },
                { title: 'Efficacité', text: 'Résultats concrets, sans complexité.' },
                { title: 'Clarté', text: 'Des conseils transparents et actionnables.' },
              ].map((value) => (
                <div key={value.title} className="rounded-2xl border border-slate-100 bg-white p-4">
                  <p className="text-sm font-semibold text-slate-800">{value.title}</p>
                  <p className="mt-2 text-xs text-slate-600">{value.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl bg-slate-900 p-4">
            <img src={iconChip} alt="Transistor&CIE" className="rounded-2xl" />
          </div>
        </div>
      </section>

      <section className="container-page section-card space-y-6 p-8">
        <div>
          <p className="text-xs font-semibold uppercase text-slate-500">Qualification & expérience</p>
          <h3 className="text-2xl font-semibold text-slate-900">Détails & références</h3>
        </div>

        <div className="grid gap-4">
          <details className="group rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <summary className="flex cursor-pointer items-center justify-between text-sm font-semibold text-slate-800">
              Diplômes & formation
              <span className="text-brand-cyan transition group-open:rotate-180">▾</span>
            </summary>
            <div className="mt-4 grid gap-3 text-sm text-slate-600">
              <div className="rounded-xl border border-slate-100 bg-white p-4">
                <p className="font-medium text-slate-800">
                  Licence sciences et technologies de la défense — Académie militaire de Saint-Cyr Coëtquidan
                </p>
              </div>
              <div className="rounded-xl border border-slate-100 bg-white p-4">
                <p className="font-medium text-slate-800">
                  Diplôme de spécialité, emplois des systèmes réseaux — École nationale des transmissions
                </p>
              </div>
              <div className="rounded-xl border border-slate-100 bg-white p-4">
                <p className="font-medium text-slate-800">
                  Formation technique en administration de routeurs — Allied Telesis
                </p>
              </div>
              <div className="rounded-xl border border-slate-100 bg-white p-4">
                <p className="font-medium text-slate-800">
                  Formation en administration de serveurs Windows (Windows Server)
                </p>
              </div>
              <div className="rounded-xl border border-slate-100 bg-white p-4">
                <p className="font-medium text-slate-800">
                  Formation technique chiffreurs et mise en oeuvre de liaisons chiffrées — Crypsis
                </p>
              </div>
              <div className="rounded-xl border border-slate-100 bg-white p-4">
                <p className="font-medium text-slate-800">Formation Java orientée objet</p>
              </div>
              <div className="rounded-xl border border-slate-100 bg-white p-4">
                <p className="font-medium text-slate-800">Formation développement web — HTML / CSS</p>
              </div>
              <div className="rounded-xl border border-slate-100 bg-white p-4">
                <p className="font-medium text-slate-800">Formation aux fondamentaux des bases de données</p>
              </div>
            </div>
          </details>

          <details className="group rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <summary className="flex cursor-pointer items-center justify-between text-sm font-semibold text-slate-800">
              Expériences professionnelles
              <span className="text-brand-cyan transition group-open:rotate-180">▾</span>
            </summary>
            <div className="mt-4 grid gap-3 text-sm text-slate-600">
              <div className="rounded-xl border border-slate-100 bg-white p-4">
                <p className="font-medium text-slate-800">Administrateur de réseaux informatiques</p>
                <p className="mt-2">
                  Administration, sécurisation et maintenance de réseaux ; conception d’infrastructures ; gestion de
                  projets de déploiement de nouveaux réseaux.
                </p>
              </div>
              <div className="rounded-xl border border-slate-100 bg-white p-4">
                <p className="font-medium text-slate-800">
                  Administrateur des systèmes d’informations
                </p>
                <p className="mt-2">
                  Gestion de serveurs et systèmes d’exploitation ; sécurité et sauvegarde des données utilisateur ;
                  optimisation et évolution des infrastructures.
                </p>
              </div>
              <div className="rounded-xl border border-slate-100 bg-white p-4">
                <p className="font-medium text-slate-800">Pilotage & coordination opérationnelle</p>
                <p className="mt-2">
                  Management opérationnel, suivi de compétences, mises en formation, planification et gestion de
                  projets, garant de la sécurité des personnes et des biens.
                </p>
                <p className="mt-2">Volume en gestion : 30 à 50 personnes</p>
              </div>
            </div>
          </details>

          <details className="group rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <summary className="flex cursor-pointer items-center justify-between text-sm font-semibold text-slate-800">
              Méthode d’intervention (comment l’entreprise travaille)
              <span className="text-brand-cyan transition group-open:rotate-180">▾</span>
            </summary>
            <div className="mt-4 grid gap-3 text-sm text-slate-600 md:grid-cols-2">
              {[
                { title: 'Diagnostic', text: 'Symptômes, contexte, priorités.' },
                { title: 'Résolution', text: 'Actions ciblées, explication simple.' },
                { title: 'Sécurisation', text: 'Mises à jour, sauvegarde, bonnes pratiques.' },
                { title: 'Prévention', text: 'Conseils et plan d’entretien.' },
              ].map((step) => (
                <div key={step.title} className="rounded-xl border border-slate-100 bg-white p-4">
                  <p className="font-medium text-slate-800">{step.title}</p>
                  <p className="mt-2">{step.text}</p>
                </div>
              ))}
            </div>
          </details>
        </div>
      </section>

      <section className="container-page space-y-6">
        <div>
          <p className="text-xs font-semibold uppercase text-slate-500">FAQ</p>
          <h2 className="text-3xl font-semibold text-slate-900">Questions fréquentes</h2>
        </div>
        <FAQ items={faqEntries} />
      </section>
    </div>
  )
}

export default About
