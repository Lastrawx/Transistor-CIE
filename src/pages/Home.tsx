import { useState } from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import GuaranteeHighlight from '../components/GuaranteeHighlight'
import ContactForm from '../components/ContactForm'
import PriceEstimator from '../components/PriceEstimator'
import FounderNote from '../components/FounderNote'
import SEO from '../components/SEO'
import { instagram } from '../content/instagram'
import heroHome from '../assets/hero-home.webp'
import { site } from '../content/site'

const offresPhares = [
  {
    badge: 'Particuliers',
    title: 'Dépannage & Assistance',
    text: 'PC lent, virus, Wi-Fi, imprimante, smartphone : diagnostic et réparation à distance, souvent sous 24h.',
    price: 'Diagnostic 45 € — déduit si intervention · Forfaits dès 59 €',
    to: '/depannage-pc',
    cta: 'Décrire mon problème',
  },
  {
    badge: 'Particuliers',
    title: 'Abonnement Sérénité Famille',
    text: 'Assistance toute l’année pour tout le foyer, seniors inclus. Un interlocuteur unique pour toute la tech.',
    price: 'À partir de 39 €/mois',
    to: '/abonnement-famille',
    cta: 'Découvrir la formule',
  },
  {
    badge: 'Entreprises',
    title: 'Cybersécurité TPE/PME',
    text: 'Mise à niveau complète en 1 mois, puis suivi continu si besoin. Sans équipe informatique interne.',
    price: 'Mise à niveau dès 530 € · Suivi dès 119 €/mois',
    to: '/cybersecurite-pme',
    cta: 'Sécuriser mon entreprise',
  },
  {
    badge: 'Entreprises',
    title: 'Site Web Essentiel',
    text: 'Un site clair, professionnel et orienté demandes de devis, prêt à convertir dès la mise en ligne.',
    price: 'À partir de 800 €',
    to: '/site-web-pro',
    cta: 'Décrire mon projet',
  },
]

const trustBadges = [
  {
    title: 'Devis gratuit',
    text: 'Diagnostic clair avant toute intervention. Vous validez le prix d’abord, sans engagement.',
  },
  {
    title: '100% à distance',
    text: 'Visio ou prise en main sécurisée, partout en France. Aucun déplacement à prévoir.',
  },
  {
    title: 'Expert systèmes & réseaux',
    text: 'Ex-administrateur réseaux & systèmes, formé à l’École nationale des transmissions.',
  },
  {
    title: 'Garantie satisfaction',
    text: 'Si le résultat défini au devis n’est pas atteint, la garantie s’applique.',
  },
]

const Home = () => {
  const ctaLink = '/#devis'
  const ctaLabel = 'Demander un devis gratuit'
  // Message poussé par l'estimateur vers le formulaire (« Recevoir ce devis par écrit »).
  const [estimateMessage, setEstimateMessage] = useState('')

  return (
    <div className="space-y-20 pt-3 sm:pt-4">
      <SEO
        title="Transistor&CIE — La tech au quotidien, simplifiée"
        description="Particuliers et entreprises. Assistance, Green IT, cybersécurité. 100% digital, partout en France. Devis gratuit."
        image={heroHome}
      />

      <div className="space-y-8">
        <Hero
          title="La tech au quotidien, simplifiée"
          subtitle="Dépannage informatique, cybersécurité, sites web et Green IT — pour les particuliers et les TPE/PME. 100% à distance, partout en France."
          kicker="Transistor&CIE"
          ctaLabel={ctaLabel}
          ctaLink={ctaLink}
          secondaryLabel="⚡ Estimer mon prix en 2 clics"
          secondaryLink="/#estimation"
          image={heroHome}
          imageAlt="Bienvenue chez Transistor&CIE"
        >
          <div className="space-y-4 pt-2">
            <div className="flex flex-wrap items-center gap-2">
              <a href={`tel:${site.phoneHref}`} className="btn-ghost px-4 py-2 text-xs sm:text-sm">
                Appeler {site.phoneDisplay}
              </a>
              <a href={site.whatsappUrl} target="_blank" rel="noreferrer" className="btn-whatsapp-soft px-4 py-2 text-xs sm:text-sm">
                WhatsApp
              </a>
            </div>
            <p className="text-xs font-medium text-slate-500">
              Devis gratuit · Réponse sous 24–48h ouvrées · Garantie satisfaction
            </p>
          </div>
        </Hero>

        <section className="container-page">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {trustBadges.map((badge) => (
              <div key={badge.title} className="section-card h-full p-5">
                <h2 className="text-base font-semibold text-slate-900">{badge.title}</h2>
                <p className="mt-2 text-sm text-slate-600">{badge.text}</p>
              </div>
            ))}
          </div>
        </section>

      </div>

      <section id="poles" className="container-page space-y-6">
        <div>
          <p className="text-xs font-semibold uppercase text-slate-500">Nos offres phares</p>
          <h2 className="text-3xl font-semibold text-slate-900">Quel est votre besoin ?</h2>
        </div>
        <div className="grid items-stretch gap-4 sm:grid-cols-2">
          {offresPhares.map((offre) => (
            <article key={offre.title} className="section-card flex h-full flex-col p-6">
              <span className="chip w-fit">{offre.badge}</span>
              <h3 className="mt-3 text-xl font-semibold text-slate-900">{offre.title}</h3>
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
          Tarifs indicatifs — devis gratuit personnalisé. TVA non applicable, art. 293 B du CGI. On fait aussi :
          montage PC sur-mesure, formation numérique, Green IT, infrastructure IT —{' '}
          <Link to="/contact" className="font-medium text-sky-700 underline underline-offset-2 hover:text-sky-800">
            parlez-nous de votre besoin
          </Link>
          .
        </p>
      </section>

      {/* ESTIMATEUR DE PRIX MULTI-OFFRES */}
      <section id="estimation" className="container-page scroll-mt-24 space-y-5">
        <div>
          <p className="text-xs font-semibold uppercase text-slate-500">Estimation immédiate — sans coordonnées</p>
          <h2 className="text-3xl font-semibold text-slate-900">Votre prix en 2 clics</h2>
          <p className="mt-2 text-sm text-slate-600">
            Dites-nous pour quoi c’est, touchez votre situation : le prix s’affiche aussitôt. Confirmé ensuite par
            un devis gratuit — vous ne payez que ce que vous avez validé.
          </p>
        </div>
        <PriceEstimator formAnchor="#devis" onQuoteRequest={setEstimateMessage} />
      </section>

      <section id="devis" className="container-page section-card p-6 sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold uppercase text-slate-500">Devis gratuit</p>
              <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
                Décrivez votre besoin, réponse sous 24–48h
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Un clic sur votre situation, vos coordonnées, et c’est parti. Gratuit et sans engagement.
              </p>
            </div>
            <ContactForm
              express
              prefillSubject="Demande de devis — Formulaire accueil"
              quickReasons={[
                'Besoin d’un dépannage informatique',
                'Intéressé par l’abonnement famille',
                'Cybersécurité de mon entreprise',
                'Création d’un site web professionnel',
                'Autre besoin / question',
              ]}
              externalMessage={estimateMessage || undefined}
              submitLabel="Recevoir mon devis gratuit"
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
                <a href={`mailto:${site.contactEmail}`} className="btn-ghost justify-center">
                  {site.contactEmail}
                </a>
              </div>
            </div>
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-5">
              <p className="text-xs font-semibold uppercase text-emerald-700">Ce qui est toujours inclus</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                <li>✅ Devis gratuit avant toute intervention</li>
                <li>✅ 100% à distance, partout en France</li>
                <li>✅ Garantie satisfaction selon conditions</li>
                <li>✅ Explications claires, sans jargon</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="container-page section-card p-8">
        <div className="space-y-6">
          <div>
            <p className="text-xs font-semibold uppercase text-slate-500">Comment ça se passe ?</p>
            <h2 className="text-3xl font-semibold text-slate-900">Un parcours simple en 3 étapes</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: '1. Prise de contact',
                text: 'Vous décrivez votre besoin via le formulaire. Réponse rapide et claire.',
              },
              {
                title: '2. Diagnostic à distance',
                text: 'Nous définissons ensemble la meilleure solution et le périmètre d’intervention.',
              },
              {
                title: '3. Intervention & suivi',
                text: 'Mise en œuvre à distance avec accompagnement pédagogique et suivi.',
              },
            ].map((step) => (
              <div key={step.title} className="rounded-2xl border border-slate-100 bg-white p-5 shadow">
                <h3 className="text-lg font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{step.text}</p>
              </div>
            ))}
          </div>
          <GuaranteeHighlight />
        </div>
      </section>

      <section className="container-page space-y-8">
        <div className="section-card space-y-8 p-8">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase text-slate-500">Notre expertise</p>
            <h2 className="text-3xl font-semibold text-slate-900">Technique, méthode, transition responsable</h2>
            <p className="text-sm text-slate-600">
              Transistor&CIE s’appuie sur des intervenants expérimentés en systèmes & réseaux, sécurité & sauvegarde, et
              pilotage opérationnel. L’entreprise intervient avec une approche simple : diagnostic clair → actions
              prioritaires → stabilisation → prévention, pour des résultats concrets et durables.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {[
              {
                title: 'Systèmes & Réseaux',
                text: "Administration, sécurisation et maintenance de réseaux, conception d’infrastructures, déploiements et évolution d’environnements.",
              },
              {
                title: 'Sécurité & Continuité',
                text: "Sécurisation, sauvegarde des données, optimisation des systèmes, maintien d’un environnement fiable au quotidien.",
              },
              {
                title: 'Transition verte (IT + Énergie)',
                text: 'Green IT et accompagnement des organisations vers des plans complets de transition aux énergies renouvelables (cadrage, étapes, priorisation, accompagnement).',
              },
            ].map((item) => (
              <article key={item.title} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.text}</p>
              </article>
            ))}
          </div>

          <div className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-600">Un besoin précis ? Parlons-en.</p>
            <Link to="/contact" className="btn-primary">
              Demander un devis gratuit
            </Link>
          </div>
        </div>

        <FounderNote />
      </section>

      <section className="container-page space-y-8">
        <div className="section-card p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase text-slate-500">Instagram</p>
              <h2 className="text-3xl font-semibold text-slate-900">Suivez nos actus</h2>
              <p className="mt-2 text-sm text-slate-600">{instagram.ctaText}</p>
            </div>
            <a href={instagram.url} target="_blank" rel="noreferrer" className="btn-secondary">
              {instagram.handle}
            </a>
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {instagram.posts.map((post) => (
              <a
                key={post.id}
                href={post.url}
                target="_blank"
                rel="noreferrer"
                className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-1"
              >
                <div className="aspect-square w-full bg-slate-50">
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-contain transition duration-500 group-hover:scale-[1.02]"
                  />
                </div>
                <p className="px-3 pb-3 pt-2 text-sm font-semibold text-slate-800 group-hover:text-slate-900">
                  {post.title}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page section-card p-8">
        <figure className="mx-auto max-w-4xl text-center">
          <blockquote className="relative rounded-2xl border border-slate-100 bg-white/70 px-6 py-8 shadow-sm sm:px-10">
            <span aria-hidden="true" className="pointer-events-none absolute left-4 top-1 text-6xl leading-none text-brand-cyan/30 sm:left-6 sm:text-7xl">
              “
            </span>
            <p className="mx-auto max-w-3xl font-serif text-2xl italic leading-relaxed text-slate-900 sm:text-3xl">
              <span className="bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
                La simplicité est la condition préalable de la fiabilité.
              </span>
            </p>
            <span aria-hidden="true" className="pointer-events-none absolute bottom-1 right-4 text-6xl leading-none text-brand-cyan/30 sm:right-6 sm:text-7xl">
              ”
            </span>
          </blockquote>
          <figcaption className="mt-5 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            Edsger W. Dijkstra
          </figcaption>
        </figure>
      </section>
    </div>
  )
}

export default Home
