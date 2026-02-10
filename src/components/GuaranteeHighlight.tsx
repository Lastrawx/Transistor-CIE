import { useState } from 'react'
import GuaranteeDetailsModal from './GuaranteeDetailsModal'

type GuaranteeHighlightProps = {
  compact?: boolean
}

const GuaranteeHighlight = ({ compact = false }: GuaranteeHighlightProps) => {
  const [detailsOpen, setDetailsOpen] = useState(false)

  return (
    <>
      <div className={`rounded-2xl border border-emerald-200 bg-emerald-50/70 ${compact ? 'p-4' : 'p-5'}`}>
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase text-emerald-700">Garantie satisfaction</p>
          <h3 className={`${compact ? 'text-lg' : 'text-xl'} font-semibold text-slate-900`}>Vous gardez le contrôle</h3>
          <p className="text-sm text-slate-700">
            En intervention à distance, si le résultat défini au devis n&apos;est pas atteint, nous appliquons la garantie
            selon les conditions prévues.
          </p>
        </div>
        <div className="mt-4">
          <button type="button" onClick={() => setDetailsOpen(true)} className="btn-ghost">
            Afficher les détails
          </button>
        </div>
      </div>
      <GuaranteeDetailsModal open={detailsOpen} onClose={() => setDetailsOpen(false)} />
    </>
  )
}

export default GuaranteeHighlight
