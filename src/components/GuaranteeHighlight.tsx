import { Link } from 'react-router-dom'

type GuaranteeHighlightProps = {
  compact?: boolean
}

const GuaranteeHighlight = ({ compact = false }: GuaranteeHighlightProps) => {
  return (
    <div className={`rounded-2xl border border-emerald-200 bg-emerald-50/70 ${compact ? 'p-4' : 'p-5'}`}>
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase text-emerald-700">Garantie satisfaction</p>
        <h3 className={`${compact ? 'text-lg' : 'text-xl'} font-semibold text-slate-900`}>Vous gardez le contrôle</h3>
        <p className="text-sm text-slate-700">
          En intervention à distance, si le résultat défini au devis n&apos;est pas atteint, nous appliquons la garantie
          selon les conditions prévues (devis ≤ 150 € TTC).
        </p>
      </div>
      <div className="mt-4">
        <Link to="/cgv-cgu#garantie-satisfaction" className="btn-ghost">
          Voir la garantie dans les CGV
        </Link>
      </div>
    </div>
  )
}

export default GuaranteeHighlight
