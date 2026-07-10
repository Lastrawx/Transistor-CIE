import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import FounderNote from '../components/FounderNote'
import SEO from '../components/SEO'
import { buildServiceQuoteLink } from '../content/services'
import { site } from '../content/site'
import heroEntreprise from '../assets/hero-entreprise.webp'
import { useProfile } from '../utils/useProfile'

const offres = [
  {
    title: '🛡️ Cybersécurité TPE/PME',
    text: 'Mise à niveau complète en 1 mois (audit, MFA, accès distants, sauvegardes, phishing), puis suivi continu si besoin.',
    price: 'À partir de 530 €',
    to: '/cybersecurite-pme',
    cta: 'Sécuriser mon entreprise',
  },
  {
    title: '🌐 Site Web Essentiel',
    text: 'Un site clair, professionnel et orienté demandes de devis, avec SEO de base et mise en ligne incluse.',
    price: 'À partir de 800 €',
    to: '/site-web-pro',
    cta: 'Décrire mon projet',
  },
]

const autresPrestations = [
  {
    title: 'Conseil en infrastructure IT (réseau, serveurs, cloud)',
    link: buildServiceQuoteLink('entreprise', 'conseil-infrastructure-it'),
  },
  {
    title: 'Transition numérique verte / Green IT & RSE',
    link: buildServiceQuoteLink('entreprise', 'transition-numerique-verte'),
  },
]

const Entreprise = () => {
  const { setProfile } = useProfile()

  useEffect(() => {
    setProfile('entreprise')
  }, [setProfile])

  return (
    <div className="space-y-14 pt-3 sm:pt-4">
      <SEO
        title="Transistor&CIE — Entreprises"
        description="Cybersécurité TPE/PME dès 530 € et création de site web professionnel dès 800 €. 100% digital, partout en France. Devis gratuit."
        image={heroEntreprise}
      />

      <Hero
        title="Sécurisez et développez votre activité."
        subtitle="Cybersécurité pragmatique et site web orienté conversion : deux fondations pour votre TPE/PME, 100% à distance."
        kicker="Entreprises"
        ctaLabel="Cybersécurité TPE/PME"
        ctaLink="/cybersecurite-pme"
        secondaryLabel="Site Web Essentiel"
        secondaryLink="/site-web-pro"
        image={heroEntreprise}
        imageAlt="Services entreprises Transistor&CIE"
      />

      <section className="container-page space-y-6">
        <div className="grid items-stretch gap-4 sm:grid-cols-2">
          {offres.map((offre) => (
            <article key={offre.title} className="section-card flex h-full flex-col p-6">
              <h2 className="text-xl font-semibold text-slate-900">{offre.title}</h2>
              <p className="mt-2 text-sm text-slate-600">{offre.text}</p>
              <p className="mt-3 text-sm font-semibold text-sky-800">{offre.price}</p>
              <div className="mt-auto pt-4">
                <Link to={offre.to} className="btn-primary">
                  {offre.cta}
                </Link>
              </div>
            </article>
          ))}
        </div>
        <p className="text-xs text-slate-500">
          Tarifs indicatifs — devis gratuit personnalisé. TVA non applicable, art. 293 B du CGI.
        </p>
      </section>

      <section className="container-page section-card p-6 sm:p-8">
        <h2 className="text-2xl font-semibold text-slate-900">On fait aussi</h2>
        <p className="mt-2 text-sm text-slate-600">
          Des missions de conseil à la demande, chiffrées gratuitement selon votre contexte :
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {autresPrestations.map((prestation) => (
            <Link
              key={prestation.title}
              to={prestation.link}
              className="rounded-2xl border border-slate-100 bg-white p-4 text-sm font-medium text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-cyan hover:text-slate-900"
            >
              {prestation.title} →
            </Link>
          ))}
        </div>
      </section>

      <section className="container-page grid gap-4 lg:grid-cols-2">
        <FounderNote />
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase text-slate-500">Une question avant de vous lancer ?</p>
          <p className="mt-2 text-sm text-slate-700">Appelez ou écrivez sur WhatsApp, on vous oriente gratuitement.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <a href={`tel:${site.phoneHref}`} className="btn-primary">
              Appeler {site.phoneDisplay}
            </a>
            <a href={site.whatsappUrl} target="_blank" rel="noreferrer" className="btn-whatsapp-soft">
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Entreprise
