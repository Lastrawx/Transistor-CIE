const PillBanner = ({ text = '100% à distance — Devis gratuit' }: { text?: string }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-6 py-2 text-sm font-semibold text-emerald-800 shadow">
        <span aria-hidden="true">●</span>
        {text}
      </div>
    </div>
  )
}

export default PillBanner
