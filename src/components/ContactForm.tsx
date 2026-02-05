import { useEffect, useMemo, useState } from 'react'
import { buildSubject, profileLabel } from '../utils/format'
import { useProfile } from '../utils/profile'
import type { UserProfile } from '../utils/storage'

const profileOptions: { value: UserProfile; label: string }[] = [
  { value: 'particulier', label: 'Particulier' },
  { value: 'entreprise', label: 'Entreprise' },
]

type ContactFormProps = {
  prefillProfile?: UserProfile | null
  prefillService?: string
  prefillSubject?: string
  compact?: boolean
}

const ContactForm = ({ prefillProfile, prefillService, prefillSubject, compact }: ContactFormProps) => {
  const { profile: storedProfile } = useProfile()
  const initialProfile = prefillProfile ?? storedProfile ?? 'particulier'
  const [profile, setProfile] = useState<UserProfile>(initialProfile)
  const [service, setService] = useState(prefillService ?? '')
  const [subject, setSubject] = useState(
    prefillSubject ?? buildSubject(prefillService || 'Demande de devis', initialProfile),
  )
  const [subjectTouched, setSubjectTouched] = useState(false)
  const [ready, setReady] = useState(false)

  const profileLocked = Boolean(prefillProfile)
  const serviceLocked = Boolean(prefillService)

  useEffect(() => {
    setProfile(prefillProfile ?? storedProfile ?? 'particulier')
  }, [prefillProfile, storedProfile])

  useEffect(() => {
    setService(prefillService ?? '')
  }, [prefillService])

  useEffect(() => {
    if (!subjectTouched) {
      setSubject(buildSubject(service || 'Demande de devis', profile))
    }
  }, [service, profile, subjectTouched])

  useEffect(() => {
    if (!subjectTouched && prefillSubject) {
      setSubject(prefillSubject)
    }
  }, [prefillSubject, subjectTouched])

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 1200)
    return () => window.clearTimeout(timer)
  }, [])

  const helperText = useMemo(() => {
    if (serviceLocked) {
      return `Service sélectionné : ${service}`
    }
    return 'Précisez votre besoin, nous vous répondons rapidement.'
  }, [service, serviceLocked])

  return (
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      action="/merci"
      className={`grid gap-4 ${compact ? 'text-sm' : 'text-base'}`}
    >
      <input type="hidden" name="form-name" value="contact" />
      <p className="hidden">
        <label>
          Don’t fill this out: <input name="bot-field" />
        </label>
      </p>

      {profileLocked ? (
        <div className="rounded-xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700">
          Profil : {profileLabel(profile)}
          <input type="hidden" name="profil" value={profile} />
        </div>
      ) : (
        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-700">Profil *</span>
          <select
            name="profil"
            required
            value={profile}
            onChange={(event) => setProfile(event.target.value as UserProfile)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3"
          >
            {profileOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      )}

      {serviceLocked ? (
        <div className="rounded-xl bg-slate-100 px-4 py-3 text-sm text-slate-700">
          {helperText}
          <input type="hidden" name="service" value={service} />
        </div>
      ) : (
        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-700">Service (optionnel)</span>
          <input
            name="service"
            value={service}
            onChange={(event) => setService(event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3"
            placeholder="Ex: Assistance & dépannage"
          />
        </label>
      )}

      <label className="space-y-2">
        <span className="text-sm font-semibold text-slate-700">Objet *</span>
        <input
          name="objet"
          required
          value={subject}
          onChange={(event) => {
            setSubjectTouched(true)
            setSubject(event.target.value)
          }}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3"
        />
      </label>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-700">Nom *</span>
          <input name="nom" required className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3" />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-700">Prénom *</span>
          <input
            name="prenom"
            required
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3"
          />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-700">Email *</span>
          <input
            type="email"
            name="email"
            required
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3"
          />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-700">Téléphone</span>
          <input
            type="tel"
            name="telephone"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3"
            placeholder="Optionnel mais recommandé"
          />
        </label>
      </div>

      <label className="space-y-2">
        <span className="text-sm font-semibold text-slate-700">Message *</span>
        <textarea
          name="message"
          required
          minLength={20}
          rows={compact ? 4 : 6}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3"
          placeholder="Décrivez votre besoin en quelques lignes."
        ></textarea>
      </label>

      <label className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
        <input type="checkbox" name="consentement" required className="mt-1" />
        <span>
          J’accepte que mes données soient utilisées pour me recontacter dans le cadre de ma demande.
        </span>
      </label>

      <button type="submit" className="btn-primary" disabled={!ready}>
        {ready ? 'Envoyer ma demande' : 'Préparation...'}
      </button>
    </form>
  )
}

export default ContactForm
