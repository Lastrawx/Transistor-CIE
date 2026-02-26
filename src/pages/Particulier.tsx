import { useEffect, useMemo, useState } from 'react'
import Hero from '../components/Hero'
import PillBanner from '../components/PillBanner'
import ServiceGrid from '../components/ServiceGrid'
import ContactModal from '../components/ContactModal'
import GuaranteeHighlight from '../components/GuaranteeHighlight'
import SEO from '../components/SEO'
import { particulierServices, type Service } from '../content/services'
import { site } from '../content/site'
import heroParticulier from '../assets/hero-particulier.webp'
import { useProfile } from '../utils/useProfile'

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

  const structuredData = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Services Particuliers Transistor&CIE',
      numberOfItems: particulierServices.length,
      itemListElement: particulierServices.map((service, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${site.websiteUrl}/particulier/${service.id}`,
        name: service.title,
      })),
    }),
    [],
  )

  return (
    <div className="space-y-16 pt-3 sm:pt-4">
      <SEO
        title="Transistor&CIE — Particuliers"
        description="Assistance, optimisation, formation et Green IT pour la maison. 100% digital, partout en France. Devis gratuit."
        image={heroParticulier}
        structuredData={structuredData}
      />

      <Hero
        title="La Tech au quotidien, simplifiée"
        subtitle="Rapide, pédagogique et 100% digital, partout en France pour retrouver un usage sans stress."
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
        <GuaranteeHighlight compact />
        <div id="services" className="space-y-6">
          <h2 className="text-3xl font-semibold text-slate-900">Services pour particuliers</h2>
          <p className="text-sm text-slate-600">
            Un accompagnement clair, accessible et sans déplacement. Choisissez votre service et demandez un devis gratuit.
          </p>
          <ServiceGrid services={particulierServices} onQuote={handleQuote} profile="particulier" />
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
