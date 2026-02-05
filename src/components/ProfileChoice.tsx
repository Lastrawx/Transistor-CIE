import { useNavigate } from 'react-router-dom'
import { useProfile } from '../utils/profile'

const ProfileChoice = () => {
  const navigate = useNavigate()
  const { setProfile } = useProfile()

  const handleChoice = (profile: 'particulier' | 'entreprise') => {
    setProfile(profile)
    navigate(profile === 'particulier' ? '/particulier' : '/entreprise')
  }

  return (
    <div className="section-card p-6 md:p-8">
      <p className="text-sm font-semibold text-slate-500">Vous êtes ?</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => handleChoice('particulier')}
          className="group flex flex-col items-start gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-left transition hover:-translate-y-0.5 hover:border-brand-cyan"
        >
          <span className="text-lg font-semibold text-slate-900">Je suis un particulier</span>
          <span className="text-sm text-slate-500">
            Assistance, optimisation, formation et Green IT pour la maison.
          </span>
        </button>
        <button
          type="button"
          onClick={() => handleChoice('entreprise')}
          className="group flex flex-col items-start gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-left transition hover:-translate-y-0.5 hover:border-brand-cyan"
        >
          <span className="text-lg font-semibold text-slate-900">Je suis une entreprise</span>
          <span className="text-sm text-slate-500">
            Performance, infrastructure, cybersécurité et stratégie Green IT.
          </span>
        </button>
      </div>
    </div>
  )
}

export default ProfileChoice
