import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import FounderNote from '../components/FounderNote'
import SEO from '../components/SEO'
import { buildServiceQuoteLink } from '../content/services'
import { site } from '../content/site'
import heroParticulier from '../assets/hero-particulier.webp'
import { useProfile } from '../utils/useProfile'

const offres = [
  {
    title: '🔧 Dépannage & Assistance',
    text: 'PC lent, virus, Wi-Fi, imprimante, smartphone : diagnostic et réparation à distance, souvent sous 24h.',
    price: 'Diagnostic 45 € — déduit si intervention · Forfaits dès 59 €',
    to: '/depannage-pc',
    cta: 'Décrire mon problème',
  },
  {
    title: '🏠 Abonnement Sérénité Famille',
    text: 'Assistance toute l’année pour tout le foyer, seniors inclus. Audit, sécurisation, hotline dédiée.',
    price: 'À partir de 39 €/mois',
    to: '/abonnement-famille',
    cta: 'Découvrir la formule',
  },
]

const autresPrestations = [
  {
    title: 'Coaching montage PC sur-mesure',
    link: buildServiceQuoteLink('particulier', 'coaching-montage-pc'),
  },
  {
    title: 'Formation & culture numérique (IA, cybersécurité, outils)',
    link: buildServiceQuoteLink('particulier', 'formation-culture-numerique'),
  },
  {
    title: 'Optimisation budget Internet & réseau',
    link: buildServiceQuoteLink('particulier', 'optimisation-budget-reseau'),
  },
  {
    title: 'Conseil énergie & Green IT pour la maison',
    link: buildServiceQuoteLink('particulier', 'conseil-energie-green-it'),
  },
]

const Particulier = () => {
  const { setProfile } = useProfile()

  useEffect(() => {
    setProfile('particulier')
  }, [setProfile])

  return (
    <div className="space-y-14 pt-3 sm:pt-4">
      <SEO
        title="Transistor&CIE — Particuliers"
        description="Dépannage informatique à distance dès 45 € et abonnement d'assistance famille dès 39 €/mois. 100% digital, partout en France. Devis gratuit."
        image={heroParticulier}
      />

      <Hero
        title="Votre tech qui marche, sans stress."
        subtitle="Dépannage ponctuel ou accompagnement toute l’année : deux formules simples, 100% à distance, partout en France."
        kicker="Particuliers"
        ctaLabel="Dépannage express"
        ctaLink="/depannage-pc"
        secondaryLabel="Abonnement famille"
        secondaryLink="/abonnement-famille"
        image={heroParticulier}
        imageAlt="Services particuliers Transistor&CIE"
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
          Des prestations à la demande, chiffrées gratuitement selon votre besoin :
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

export default Particulier
