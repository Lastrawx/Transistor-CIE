import { useEffect, useRef, useState } from 'react'
import { site } from '../content/site'
import { URGENCY_SURCHARGE, estimatorScenarios, getPack } from '../content/estimator'

type PriceEstimatorProps = {
  /** Reçoit le message pré-rédigé quand le visiteur choisit « recevoir ce devis par écrit ». */
  onQuoteRequest?: (message: string) => void
}

const PriceEstimator = ({ onQuoteRequest }: PriceEstimatorProps) => {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [urgent, setUrgent] = useState(false)
  const resultRef = useRef<HTMLDivElement>(null)

  const scenario = estimatorScenarios.find((item) => item.id === selectedId) ?? null
  const pack = scenario ? getPack(scenario.packId) : null

  useEffect(() => {
    if (scenario) {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [scenario])

  const surcharge = urgent ? URGENCY_SURCHARGE : 0
  const priceMax = pack ? pack.price + surcharge : 0
  const priceMin = pack ? (scenario?.priceMin ?? pack.price) + surcharge : 0
  const isRange = priceMin !== priceMax
  const priceText = isRange ? `${priceMin} – ${priceMax} €` : `${priceMax} €`

  const summary =
    scenario && pack
      ? `« ${scenario.label} » → ${pack.name}, ${priceText}${urgent ? ' (urgence sous 24h incluse)' : ''}`
      : ''
  const whatsappHref = `${site.whatsappUrl}?text=${encodeURIComponent(
    `Bonjour ! J'ai fait une estimation sur votre site : ${summary}. Pouvez-vous me confirmer ce devis ?`,
  )}`
  const formMessage = `Estimation en ligne — ${summary}. Merci de me confirmer ce devis gratuitement.`

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {estimatorScenarios.map((item) => {
          const isActive = item.id === selectedId
          return (
            <button
              type="button"
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              aria-pressed={isActive}
              className={`rounded-2xl border p-4 text-left text-sm font-medium shadow-sm transition hover:-translate-y-0.5 ${
                isActive
                  ? 'border-brand-cyan bg-brand-cyan/10 text-slate-900'
                  : 'border-slate-100 bg-white text-slate-700 hover:border-brand-cyan hover:text-slate-900'
              }`}
            >
              <span aria-hidden="true" className="mr-2">
                {item.emoji}
              </span>
              {item.label}
            </button>
          )
        })}
      </div>

      <div ref={resultRef} aria-live="polite">
        {scenario && pack ? (
          <div className="rounded-3xl border border-brand-cyan/40 bg-sky-50/70 p-6 shadow-sm sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div className="space-y-4">
                <div>
                  <span className="chip bg-brand-cloud text-brand-ink">Forfait recommandé</span>
                  <p className="mt-3 text-lg font-semibold text-slate-900">{pack.name}</p>
                  <p className="mt-1 text-4xl font-bold tracking-tight text-slate-900">{priceText}</p>
                  {isRange && (
                    <p className="mt-1 text-xs font-medium text-slate-500">
                      Fourchette affinée au diagnostic — le prix exact est validé par vous avant toute intervention.
                    </p>
                  )}
                </div>
                <ul className="space-y-1.5 text-sm text-slate-700">
                  {pack.includes.map((item) => (
                    <li key={item}>✅ {item}</li>
                  ))}
                </ul>
                <p className="text-sm font-medium text-slate-600">💡 {pack.note}</p>
                <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">
                  <input
                    type="checkbox"
                    checked={urgent}
                    onChange={(event) => setUrgent(event.target.checked)}
                    className="mt-0.5"
                  />
                  <span>
                    ⚡ C’est urgent — prise en charge prioritaire sous 24h{' '}
                    <strong className="font-semibold">(+{URGENCY_SURCHARGE} €)</strong>
                  </span>
                </label>
                <p className="text-xs font-medium text-slate-500">
                  Prix nets — TVA non applicable (art. 293 B du CGI) · Confirmé par un devis gratuit avant toute
                  intervention · Garantie satisfaction
                </p>
              </div>

              <div className="space-y-2.5">
                <a
                  href={`tel:${site.phoneHref}`}
                  data-track-metric="quoteClicks"
                  className="btn-primary w-full justify-center py-3.5 text-base"
                >
                  📞 Appeler — {site.phoneDisplay}
                </a>
                <p className="text-center text-xs font-medium text-slate-500">
                  Le plus rapide : on confirme le prix ensemble en 2 minutes, sans engagement.
                </p>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  data-track-metric="quoteClicks"
                  className="btn-whatsapp-soft w-full justify-center"
                >
                  Envoyer mon estimation sur WhatsApp
                </a>
                <a
                  href="#form"
                  onClick={() => onQuoteRequest?.(formMessage)}
                  data-track-metric="quoteClicks"
                  className="btn-ghost w-full justify-center"
                >
                  Recevoir ce devis par écrit
                </a>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-slate-500">
            👆 Touchez votre situation : le forfait et son prix s’affichent aussitôt — sans laisser la moindre
            coordonnée.
          </p>
        )}
      </div>
    </div>
  )
}

export default PriceEstimator
