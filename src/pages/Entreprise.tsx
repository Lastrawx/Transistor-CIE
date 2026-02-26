import { useEffect, useMemo, useState } from 'react'
import Hero from '../components/Hero'
import PillBanner from '../components/PillBanner'
import ServiceGrid from '../components/ServiceGrid'
import ContactModal from '../components/ContactModal'
import GuaranteeHighlight from '../components/GuaranteeHighlight'
import SEO from '../components/SEO'
import { entrepriseServices, type Service } from '../content/services'
import { site } from '../content/site'
import heroEntreprise from '../assets/hero-entreprise.webp'
import { useProfile } from '../utils/useProfile'

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

  const orderedEntrepriseServices = useMemo(() => {
    const services = [...entrepriseServices]
    const cyberEssentielleIndex = services.findIndex((service) => service.id === 'cybersecurite-essentielle')

    if (cyberEssentielleIndex === -1) return services

    const [cyberEssentielle] = services.splice(cyberEssentielleIndex, 1)
    services.splice(2, 0, cyberEssentielle)
    return services
  }, [])

  const structuredData = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Services Entreprises Transistor&CIE',
      numberOfItems: orderedEntrepriseServices.length,
      itemListElement: orderedEntrepriseServices.map((service, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${site.websiteUrl}/entreprise/${service.id}`,
        name: service.title,
      })),
    }),
    [orderedEntrepriseServices],
  )

  return (
    <div className="space-y-16 pt-3 sm:pt-4">
      <SEO
        title="Transistor&CIE — Entreprises"
        description="Création de sites web, Green IT, cybersécurité et infrastructure IT pour les entreprises. 100% digital, partout en France. Devis gratuit."
        image={heroEntreprise}
        structuredData={structuredData}
      />

      <Hero
        title="Sites Web, Performance & Responsabilité"
        subtitle="Lancez votre présence en ligne et sécurisez votre activité avec un accompagnement 100% digital, partout en France."
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
        <GuaranteeHighlight compact />
        <div id="services" className="space-y-6">
          <h2 className="text-3xl font-semibold text-slate-900">Services pour entreprises</h2>
          <p className="text-sm text-slate-600">
            Une approche claire pour des résultats mesurables : sites web essentiels, sobriété numérique, infrastructure et sécurité.
          </p>
          <ServiceGrid services={orderedEntrepriseServices} onQuote={handleQuote} profile="entreprise" />
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
