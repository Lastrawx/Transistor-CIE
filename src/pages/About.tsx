import { useMemo } from 'react'
import SEO from '../components/SEO'
import FAQ from '../components/FAQ'
import { faqItems } from '../content/faq'
import { site } from '../content/site'
import iconChip from '../assets/icon-chip.webp'

const About = () => {
  const faqEntries = useMemo(() => faqItems.slice(0, 5), [])
  const faqStructuredData = useMemo(
    () => ({
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
    }),
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

      <section className="container-page section-card p-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">Zone d'intervention</h2>
          <p className="text-sm text-slate-600">
            Les interventions se font 100% digital, partout en France. Vous gagnez du temps, évitez les
            déplacements et bénéficiez d'un accompagnement flexible.
          </p>
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
