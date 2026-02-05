import { useEffect, useState } from 'react'
import Hero from '../components/Hero'
import PillBanner from '../components/PillBanner'
import ServiceGrid from '../components/ServiceGrid'
import ContactModal from '../components/ContactModal'
import SEO from '../components/SEO'
import { entrepriseServices, type Service } from '../content/services'
import heroEntreprise from '../assets/hero-entreprise.webp'
import pricingCover from '../assets/pricing-entreprise-cover.webp'
import pricingTable from '../assets/pricing-entreprise-table.webp'
import { useProfile } from '../utils/profile'

const Entreprise = () => {
  const { setProfile } = useProfile()
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<Service | null>(null)

  useEffect(() => {
    setProfile('entreprise')
  }, [setProfile])

  const handleQuote = (service: Service) => {
    setSelectedService(service)
    setModalOpen(true)
  }

  return (
    <div className="space-y-16">
      <SEO
        title="Transistor&CIE — Entreprises"
        description="Performance, Green IT et cybersécurité pour les entreprises. 100% à distance, devis gratuit."
        image={heroEntreprise}
      />

      <Hero
        title="Performance & Responsabilité"
        subtitle="Optimisez vos coûts, votre image RSE et votre sécurité avec un accompagnement à distance."
        kicker="Pôle Entreprises"
        ctaLabel="Demander un devis"
        ctaLink="/contact"
        secondaryLabel="Voir les services"
        secondaryLink="#services"
        image={heroEntreprise}
        imageAlt="Pôle Entreprises"
      />

      <section className="container-page space-y-6">
        <PillBanner />
        <div id="services" className="space-y-6">
          <h2 className="text-3xl font-semibold text-slate-900">Services pour entreprises</h2>
          <p className="text-sm text-slate-600">
            Une approche claire pour des résultats mesurables : sobriété numérique, infrastructure, sécurité.
          </p>
          <ServiceGrid services={entrepriseServices} onQuote={handleQuote} />
        </div>
      </section>

      <section className="container-page section-card p-8">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <img src={pricingCover} alt="Tarifs Entreprises" className="rounded-2xl border border-slate-100" />
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-900">Grille tarifaire indicative (HT)</h2>
            <p className="text-sm text-slate-600">
              Les tarifs sont donnés à titre indicatif. Le devis gratuit et personnalisé est fourni avant toute intervention.
            </p>
            <img
              src={pricingTable}
              alt="Grille tarifaire Entreprises"
              className="rounded-2xl border border-slate-100"
            />
          </div>
        </div>
      </section>

      <ContactModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        service={selectedService}
        profile="entreprise"
      />
    </div>
  )
}

export default Entreprise
