import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import ProfileChoice from '../components/ProfileChoice'
import PillBanner from '../components/PillBanner'
import GuaranteeHighlight from '../components/GuaranteeHighlight'
import SEO from '../components/SEO'
import { instagram } from '../content/instagram'
import heroHome from '../assets/hero-home.webp'
import heroParticulier from '../assets/hero-particulier.webp'
import heroEntreprise from '../assets/hero-entreprise.webp'
import { useProfile } from '../utils/useProfile'
import { site } from '../content/site'

const Home = () => {
  const { profile } = useProfile()
  const ctaLink = profile === 'entreprise' ? '/entreprise' : profile === 'particulier' ? '/particulier' : '/contact'
  const ctaLabel = profile ? 'Voir mon pôle' : 'Demander un devis'

  return (
    <div className="space-y-20 pt-3 sm:pt-4">
      <SEO
        title="Transistor&CIE — La tech au quotidien, simplifiée"
        description="Particuliers et entreprises. Assistance, Green IT, cybersécurité. 100% digital, partout en France. Devis gratuit."
        image={heroHome}
      />

      <div className="space-y-8">
        <section className="container-page pt-2">
          <div className="section-card flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <div>
              <p className="text-xs font-semibold uppercase text-slate-500">Contact rapide</p>
              <p className="mt-1 text-sm text-slate-600">Besoin d&apos;une réponse immédiate ? Appelez-nous ou écrivez sur WhatsApp.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <a href={`tel:${site.phoneHref}`} className="btn-ghost px-4 py-2 text-xs sm:text-sm">
                Appeler {site.phoneDisplay}
              </a>
              <a href={site.whatsappUrl} target="_blank" rel="noreferrer" className="btn-whatsapp-soft px-4 py-2 text-xs sm:text-sm">
                WhatsApp
              </a>
            </div>
          </div>
        </section>

        <Hero
          title="La tech au quotidien, simplifiée"
          subtitle="Performance & Responsabilité"
          kicker="Transistor&CIE"
          ctaLabel={ctaLabel}
          ctaLink={ctaLink}
          secondaryLabel="Découvrir les services"
          secondaryLink="/#poles"
          image={heroHome}
          imageAlt="Bienvenue chez Transistor&CIE"
        >
          <div className="pt-4">
            <ProfileChoice />
          </div>
        </Hero>
      </div>

      <section id="poles" className="container-page space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase text-slate-500">Deux pôles</p>
            <h2 className="text-3xl font-semibold text-slate-900">Choisissez votre accompagnement</h2>
          </div>
          <PillBanner />
        </div>
        <div className="grid items-stretch gap-6 lg:grid-cols-2">
          <article className="section-card h-full overflow-hidden p-6">
            <div className="grid h-full gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-stretch">
              <div className="flex h-full flex-col gap-3">
                <h3 className="text-xl font-semibold text-slate-900">Particuliers</h3>
                <p className="text-sm text-slate-600">
                  Assistance, optimisation, formation et Green IT pour la maison. Simple, rapide, sans déplacement.
                </p>
                <Link to="/particulier" className="btn-primary mt-auto">
                  Voir les services
                </Link>
              </div>
              <div className="flex h-full items-center">
                <img
                  src={heroParticulier}
                  alt="Pôle Particuliers"
                  loading="lazy"
                  decoding="async"
                  className="aspect-square h-full w-full rounded-2xl border border-slate-100 object-cover object-center"
                />
              </div>
            </div>
          </article>
          <article className="section-card h-full overflow-hidden p-6">
            <div className="grid h-full gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-stretch">
              <div className="flex h-full flex-col gap-3">
                <h3 className="text-xl font-semibold text-slate-900">Entreprises</h3>
                <p className="text-sm text-slate-600">
                  Création de sites web essentiels, performance, RSE, cybersécurité et infrastructure IT pour sécuriser et accélérer votre activité.
                </p>
                <Link to="/entreprise" className="btn-primary mt-auto">
                  Voir les services
                </Link>
              </div>
              <div className="flex h-full items-center">
                <img
                  src={heroEntreprise}
                  alt="Pôle Entreprises"
                  loading="lazy"
                  decoding="async"
                  className="aspect-square h-full w-full rounded-2xl border border-slate-100 object-cover object-center"
                />
              </div>
            </div>
          </article>
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

        <div className="section-card space-y-6 p-8">
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
        </div>
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
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {instagram.posts.map((post) => (
              <a
                key={post.id}
                href={post.url}
                target="_blank"
                rel="noreferrer"
                className="group rounded-2xl border border-slate-100 bg-white p-3 transition hover:-translate-y-1"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                  decoding="async"
                  className="h-44 w-full rounded-xl object-cover"
                />
                <p className="mt-3 text-sm font-semibold text-slate-800 group-hover:text-slate-900">
                  {post.title}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page section-card p-8 text-center">
        <h2 className="text-3xl font-semibold text-slate-900">Prêt à simplifier votre tech ?</h2>
        <p className="mt-2 text-sm text-slate-600">Demandez un devis gratuit. Réponse rapide et accompagnement 100% digital, partout en France.</p>
        <div className="mt-6 flex justify-center">
          <Link to={ctaLink} className="btn-primary">
            {ctaLabel}
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
