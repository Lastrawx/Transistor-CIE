import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import ProfileChoice from '../components/ProfileChoice'
import PillBanner from '../components/PillBanner'
import SEO from '../components/SEO'
import { instagram } from '../content/instagram'
import heroHome from '../assets/hero-home.webp'
import heroParticulier from '../assets/hero-particulier.webp'
import heroEntreprise from '../assets/hero-entreprise.webp'
import { useProfile } from '../utils/profile'

const Home = () => {
  const { profile } = useProfile()
  const ctaLink = profile === 'entreprise' ? '/entreprise' : profile === 'particulier' ? '/particulier' : '/contact'
  const ctaLabel = profile ? 'Voir mon pôle' : 'Demander un devis'

  return (
    <div className="space-y-20">
      <SEO
        title="Transistor&CIE — La tech au quotidien, simplifiée"
        description="Particuliers et entreprises. Assistance, Green IT, cybersécurité. 100% à distance, devis gratuit."
        image={heroHome}
      />

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

      <section id="poles" className="container-page space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase text-slate-500">Deux pôles</p>
            <h2 className="text-3xl font-semibold text-slate-900">Choisissez votre accompagnement</h2>
          </div>
          <PillBanner />
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <article className="section-card overflow-hidden p-6">
            <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-slate-900">Particuliers</h3>
                <p className="text-sm text-slate-600">
                  Assistance, optimisation, formation et Green IT pour la maison. Simple, rapide, sans déplacement.
                </p>
                <Link to="/particulier" className="btn-primary">
                  Voir les services
                </Link>
              </div>
              <img src={heroParticulier} alt="Pôle Particuliers" className="rounded-2xl border border-slate-100" />
            </div>
          </article>
          <article className="section-card overflow-hidden p-6">
            <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-slate-900">Entreprises</h3>
                <p className="text-sm text-slate-600">
                  Performance, RSE, cybersécurité et infrastructure IT pour sécuriser et accélérer votre activité.
                </p>
                <Link to="/entreprise" className="btn-primary">
                  Voir les services
                </Link>
              </div>
              <img src={heroEntreprise} alt="Pôle Entreprises" className="rounded-2xl border border-slate-100" />
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
        </div>
      </section>

      <section className="container-page">
        <div className="rounded-3xl bg-brand-ink px-8 py-6 text-white shadow-lift md:flex md:items-center md:justify-between">
          <div className="space-y-2">
            <p className="text-sm uppercase text-white/70">Bénéfice clé</p>
            <h2 className="text-2xl font-semibold">100% à distance — Devis gratuit</h2>
            <p className="text-sm text-white/70">Un accompagnement flexible, transparent et sans déplacement.</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link to={ctaLink} className="btn-secondary">
              {ctaLabel}
            </Link>
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
                <img src={post.image} alt={post.title} className="h-44 w-full rounded-xl object-cover" />
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
        <p className="mt-2 text-sm text-slate-600">Demandez un devis gratuit. Réponse rapide et accompagnement 100% à distance.</p>
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
