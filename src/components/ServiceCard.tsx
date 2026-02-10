import type { Service } from '../content/services'
import { Link } from 'react-router-dom'

const ServiceCard = ({
  service,
  onQuote,
  profile,
}: {
  service: Service
  onQuote: (service: Service) => void
  profile: 'particulier' | 'entreprise'
}) => {
  return (
    <article className="section-card overflow-hidden p-6">
      <div className="flex flex-col gap-6">
        {service.image && (
          <div className="overflow-hidden rounded-2xl border border-slate-100 bg-slate-900">
            <img src={service.image} alt={service.title} className="w-full" />
          </div>
        )}
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-slate-900">{service.title}</h3>
          <p className="text-sm text-slate-600">{service.offer}</p>
          {service.tags && (
            <div className="flex flex-wrap gap-2">
              {service.tags.map((tag) => (
                <span key={tag} className="chip">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="space-y-3">
          <div className="flex flex-col gap-2">
            <Link to={`/${profile}/${service.id}`} className="btn-secondary w-full">
              Voir l&apos;offre
            </Link>
            <button type="button" onClick={() => onQuote(service)} className="btn-primary w-full">
              Demander un devis
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

export default ServiceCard
