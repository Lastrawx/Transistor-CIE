import { useEffect, useState } from 'react'
import Hero from '../components/Hero'
import PillBanner from '../components/PillBanner'
import ServiceGrid from '../components/ServiceGrid'
import ContactModal from '../components/ContactModal'
import SEO from '../components/SEO'
import { particulierServices, type Service } from '../content/services'
import heroParticulier from '../assets/hero-particulier.webp'
import pricingCover from '../assets/pricing-particulier-cover.webp'
import pricingTable from '../assets/pricing-particulier-table.webp'
import { useProfile } from '../utils/profile'

const Particulier = () => {
  const { setProfile } = useProfile()
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<Service | null>(null)

  useEffect(() => {
    setProfile('particulier')
  }, [setProfile])

  const handleQuote = (service: Service) => {
    setSelectedService(service)
    setModalOpen(true)
  }

  return (
    <div className="space-y-16">
      <SEO
        title="Transistor&CIE — Particuliers"
        description="Assistance, optimisation, formation et Green IT pour la maison. 100% à distance, devis gratuit."
        image={heroParticulier}
      />

      <Hero
        title="La Tech au quotidien, simplifiée"
        subtitle="Rapide, pédagogique et 100% à distance pour retrouver un usage sans stress."
        kicker="Pôle Particuliers"
        ctaLabel="Demander un devis"
        ctaLink="/contact"
        secondaryLabel="Voir les services"
        secondaryLink="#services"
        image={heroParticulier}
        imageAlt="Pôle Particuliers"
      />

      <section className="container-page space-y-6">
        <PillBanner />
        <div id="services" className="space-y-6">
          <h2 className="text-3xl font-semibold text-slate-900">Services pour particuliers</h2>
          <p className="text-sm text-slate-600">
            Un accompagnement clair, accessible et sans déplacement. Choisissez votre service et demandez un devis gratuit.
          </p>
          <ServiceGrid services={particulierServices} onQuote={handleQuote} />
        </div>
      </section>

      <section className="container-page section-card p-8">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <img src={pricingCover} alt="Tarifs Particuliers" className="rounded-2xl border border-slate-100" />
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-900">Grille tarifaire indicative</h2>
            <p className="text-sm text-slate-600">
              Les tarifs sont donnés à titre indicatif. Le devis gratuit et personnalisé est fourni avant toute intervention.
            </p>
            <img
              src={pricingTable}
              alt="Grille tarifaire Particuliers"
              className="rounded-2xl border border-slate-100"
            />
          </div>
        </div>
      </section>

      <ContactModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        service={selectedService}
        profile="particulier"
      />
    </div>
  )
}

export default Particulier
