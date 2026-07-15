import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { site } from '../content/site'
import {
  DIAGNOSTIC_PRICE,
  URGENCY_SURCHARGE,
  estimatorOffers,
  getOffer,
  type EstimatorOption,
} from '../content/estimator'

type PriceEstimatorProps = {
  /** Mode mono-offre (ex. « depannage » sur /depannage-pc) : masque le choix du besoin. */
  fixedOfferId?: string
  /** Ancre du formulaire de la page hôte (« #form » sur /depannage-pc, « #devis » sur l’accueil). */
  formAnchor?: string
  /** Reçoit le message pré-rédigé quand le visiteur choisit « recevoir ce devis par écrit ». */
  onQuoteRequest?: (message: string) => void
}

/** Prix affiché pour une option, urgence incluse le cas échéant. */
const optionPriceText = (option: EstimatorOption, urgent: boolean): string => {
  if (option.pricing.kind === 'fixe') return option.pricing.main
  const surcharge = urgent ? URGENCY_SURCHARGE : 0
  const min = option.pricing.min + surcharge
  const max = option.pricing.max + surcharge
  return min === max ? `${max} €` : `${min} – ${max} €`
}

const PriceEstimator = ({ fixedOfferId, formAnchor = '#form', onQuoteRequest }: PriceEstimatorProps) => {
  const [selectedOfferId, setSelectedOfferId] = useState<string | null>(fixedOfferId ?? null)
  const [selectedScenarioId, setSelectedScenarioId] = useState<string | null>(null)
  const [chosenOptionId, setChosenOptionId] = useState<string | null>(null)
  const [urgent, setUrgent] = useState(false)
  const resultRef = useRef<HTMLDivElement>(null)

  const offer = selectedOfferId ? getOffer(selectedOfferId) : null
  const scenario = offer?.scenarios.find((item) => item.id === selectedScenarioId) ?? null
  const option =
    scenario?.options.find((item) => item.id === chosenOptionId) ??
    scenario?.options.find((item) => item.recommended) ??
    scenario?.options[0] ??
    null

  const selectOffer = (id: string) => {
    setSelectedOfferId(id)
    setSelectedScenarioId(null)
    setChosenOptionId(null)
    setUrgent(false)
  }

  const selectScenario = (id: string) => {
    setSelectedScenarioId(id)
    setChosenOptionId(null)
  }

  useEffect(() => {
    if (scenario) {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [scenario])

  const isForfait = option?.pricing.kind === 'forfait'
  const priceMain = option ? optionPriceText(option, isForfait && urgent) : ''
  let priceSub: string | undefined
  if (option) {
    if (option.pricing.kind === 'forfait') {
      priceSub =
        option.pricing.min !== option.pricing.max
          ? 'Fourchette affinée au diagnostic — le prix exact est validé par vous avant toute intervention.'
          : option.pricing.subLabel
    } else {
      priceSub = option.pricing.sub
    }
  }

  const priceForMessage = option?.pricing.kind === 'fixe' && option.pricing.sub
    ? `${priceMain} ${option.pricing.sub}`
    : priceMain
  const summary =
    offer && scenario && option
      ? `${offer.messageContext} — « ${scenario.label} » → ${option.title}, ${priceForMessage}${
          isForfait && urgent ? ' (urgence sous 24h incluse)' : ''
        }`
      : ''
  const whatsappHref = `${site.whatsappUrl}?text=${encodeURIComponent(
    `Bonjour ! J'ai fait une estimation sur votre site : ${summary}. Pouvez-vous me confirmer ce devis ?`,
  )}`
  const formMessage = `Estimation en ligne — ${summary}. Merci de me confirmer ce devis gratuitement.`

  // Filet de sécurité : proposé dès que le forfait sélectionné dépasse nettement
  // le diagnostic seul (jamais sur le diagnostic lui-même ni les petits forfaits).
  const showSafetyNet =
    Boolean(scenario?.safetyNet) &&
    option?.pricing.kind === 'forfait' &&
    option.pricing.min > DIAGNOSTIC_PRICE + 30

  return (
    <div className="space-y-5">
      {!fixedOfferId && (
        <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
          {estimatorOffers.map((item) => {
            const isActive = item.id === selectedOfferId
            return (
              <button
                type="button"
                key={item.id}
                onClick={() => selectOffer(item.id)}
                aria-pressed={isActive}
                className={`rounded-2xl border p-4 text-left text-sm font-semibold shadow-sm transition hover:-translate-y-0.5 ${
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
      )}

      {offer ? (
        <div className="space-y-3">
          {!fixedOfferId && <p className="text-sm font-semibold text-slate-800">{offer.question}</p>}
          <div
            className={`grid gap-3 sm:grid-cols-2 ${
              offer.scenarios.length > 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'
            }`}
          >
            {offer.scenarios.map((item) => {
              const isActive = item.id === selectedScenarioId
              return (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => selectScenario(item.id)}
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
        </div>
      ) : (
        <p className="text-sm text-slate-500">
          👆 Commencez par choisir votre besoin : deux clics suffisent pour voir votre prix — sans laisser la
          moindre coordonnée.
        </p>
      )}

      <div ref={resultRef} aria-live="polite">
        {offer && scenario && option ? (
          <div className="rounded-3xl border border-brand-cyan/40 bg-sky-50/70 p-6 shadow-sm sm:p-8">
            {scenario.options.length > 1 && (
              <div className="mb-6 grid gap-3 sm:grid-cols-2">
                {scenario.options.map((item) => {
                  const isActive = item.id === option.id
                  return (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => setChosenOptionId(item.id)}
                      aria-pressed={isActive}
                      className={`rounded-2xl border p-4 text-left shadow-sm transition ${
                        isActive
                          ? 'border-brand-cyan bg-white ring-2 ring-brand-cyan/40'
                          : 'border-slate-200 bg-white/70 hover:border-brand-cyan'
                      }`}
                    >
                      <span className="flex items-center justify-between gap-2">
                        <span className="text-sm font-semibold text-slate-900">{item.title}</span>
                        {item.recommended && (
                          <span className="chip bg-brand-cloud text-brand-ink shrink-0">Recommandé</span>
                        )}
                      </span>
                      <span className="mt-1 block text-xl font-bold text-slate-900">
                        {optionPriceText(item, urgent)}
                      </span>
                    </button>
                  )
                })}
              </div>
            )}

            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div className="space-y-4">
                <div>
                  <span className="chip bg-brand-cloud text-brand-ink">
                    {scenario.options.length > 1
                      ? 'Votre sélection'
                      : isForfait
                        ? 'Forfait recommandé'
                        : 'Formule recommandée'}
                  </span>
                  <p className="mt-3 text-lg font-semibold text-slate-900">{option.title}</p>
                  <p className="mt-1 text-4xl font-bold tracking-tight text-slate-900">{priceMain}</p>
                  {priceSub && <p className="mt-1 text-xs font-medium text-slate-500">{priceSub}</p>}
                </div>
                <ul className="space-y-1.5 text-sm text-slate-700">
                  {option.includes.map((item) => (
                    <li key={item}>✅ {item}</li>
                  ))}
                </ul>
                <p className="text-sm font-medium text-slate-600">💡 {option.note}</p>
                {isForfait && (
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
                )}
                {showSafetyNet && (
                  <p className="rounded-xl border border-emerald-200 bg-emerald-50/70 px-4 py-3 text-sm text-slate-700">
                    🛟 Pas encore sûr ? Commencez par le diagnostic seul —{' '}
                    <strong className="font-semibold">{DIAGNOSTIC_PRICE} €, déduits</strong> si vous validez la
                    réparation.
                  </p>
                )}
                <p className="text-xs font-medium text-slate-500">
                  {offer.delayNote} · Prix nets — TVA non applicable (art. 293 B du CGI) · Confirmé par un devis
                  gratuit avant tout engagement · Garantie satisfaction
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
                  {scenario.phoneHint ??
                    'Le plus rapide : on confirme le prix ensemble en 2 minutes, sans engagement.'}
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
                  href={formAnchor}
                  onClick={() => onQuoteRequest?.(formMessage)}
                  data-track-metric="quoteClicks"
                  className="btn-ghost w-full justify-center"
                >
                  Recevoir ce devis par écrit
                </a>
                {!fixedOfferId && (
                  <p className="text-center text-xs font-medium text-slate-500">
                    <Link
                      to={offer.landing}
                      className="text-sky-700 underline underline-offset-2 hover:text-sky-800"
                    >
                      Tout savoir sur cette offre →
                    </Link>
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default PriceEstimator
