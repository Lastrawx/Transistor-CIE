import type { Service } from '../content/services'

const ServiceDetails = ({ service }: { service: Service }) => {
  return (
    <details className="group rounded-2xl border border-slate-200 bg-white/80 p-4">
      <summary className="flex cursor-pointer items-center justify-between text-sm font-semibold text-slate-700">
        En savoir plus
        <span className="text-brand-cyan transition group-open:rotate-180">▾</span>
      </summary>
      <div className="mt-4 space-y-3 text-sm text-slate-600">
        <div>
          <p className="text-xs font-semibold uppercase text-slate-400">Ce que ça comprend</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {service.includes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase text-slate-400">Votre bénéfice</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {service.benefits.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl bg-emerald-50 px-3 py-2 text-emerald-800">
          {service.modalities}
        </div>
      </div>
    </details>
  )
}

export default ServiceDetails
