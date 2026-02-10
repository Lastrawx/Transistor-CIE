import type { Service } from '../content/services'
import ServiceCard from './ServiceCard'

const ServiceGrid = ({
  services,
  onQuote,
  profile,
}: {
  services: Service[]
  onQuote: (service: Service) => void
  profile: 'particulier' | 'entreprise'
}) => {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} onQuote={onQuote} profile={profile} />
      ))}
    </div>
  )
}

export default ServiceGrid
