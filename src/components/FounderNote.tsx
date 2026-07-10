import { Link } from 'react-router-dom'

const FounderNote = () => {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase text-slate-500">Qui est derrière Transistor&CIE ?</p>
      <p className="mt-2 text-sm text-slate-700">
        <strong className="font-semibold text-slate-900">Quentin Cagnat</strong> — ex-administrateur systèmes &
        réseaux, formé à l’École nationale des transmissions et à l’Académie militaire de Saint-Cyr Coëtquidan
        (infrastructures sécurisées, liaisons chiffrées). Cette rigueur est aujourd’hui au service des foyers et des
        TPE/PME, 100% à distance.
      </p>
      <div className="mt-3">
        <Link to="/a-propos" className="text-sm font-semibold text-sky-700 underline underline-offset-2 hover:text-sky-800">
          En savoir plus sur la méthode
        </Link>
      </div>
    </div>
  )
}

export default FounderNote
