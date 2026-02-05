import { type FormEvent, useEffect, useMemo, useState } from 'react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { db } from '../firebase'
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

const MIN_EMAIL_LENGTH = 5
const MAX_EMAIL_LENGTH = 200
const MIN_MESSAGE_LENGTH = 5
const MAX_MESSAGE_LENGTH = 3000

const ContactForm = ({ prefillProfile, prefillService, prefillSubject, compact }: ContactFormProps) => {
  const navigate = useNavigate()
  const { profile: storedProfile } = useProfile()
  const initialProfile = prefillProfile ?? storedProfile ?? 'particulier'
  const [profile, setProfile] = useState<UserProfile>(initialProfile)
  const [service, setService] = useState(prefillService ?? '')
  const [subject, setSubject] = useState(
    prefillSubject ?? buildSubject(prefillService || 'Demande de devis', initialProfile),
  )
  const [subjectTouched, setSubjectTouched] = useState(false)
  const [ready, setReady] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isSubmitting) return
    setIsSubmitting(true)
    setSubmitError(null)

    const form = event.currentTarget
    const formData = new FormData(form)
    const honeypot = (formData.get('website') ?? '').toString().trim()

    if (honeypot) {
      setIsSubmitting(false)
      return
    }

    const email = (formData.get('email') ?? '').toString().trim()
    const message = (formData.get('message') ?? '').toString().trim()

    if (email.length < MIN_EMAIL_LENGTH || email.length > MAX_EMAIL_LENGTH) {
      setSubmitError('Merci de renseigner un email valide.')
      setIsSubmitting(false)
      return
    }

    if (message.length < MIN_MESSAGE_LENGTH || message.length > MAX_MESSAGE_LENGTH) {
      setSubmitError('Merci de renseigner un message entre 5 et 3000 caractères.')
      setIsSubmitting(false)
      return
    }

    const payload = {
      type: 'devis',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      source: 'site-netlify',
      profil: (formData.get('profil') ?? '').toString().trim(),
      service: (formData.get('service') ?? '').toString().trim(),
      objet: (formData.get('objet') ?? '').toString().trim(),
      nom: (formData.get('nom') ?? '').toString().trim(),
      prenom: (formData.get('prenom') ?? '').toString().trim(),
      email,
      telephone: (formData.get('telephone') ?? '').toString().trim(),
      message,
      statut: 'nouveau',
      consentement: Boolean(formData.get('consentement')),
      website: '',
    }

    try {
      await addDoc(collection(db, 'devis'), payload)
      form.reset()
      navigate('/merci')
    } catch (error) {
      console.error('Firestore submission failed', error)
      setSubmitError('Erreur lors de l’envoi. Merci de réessayer.')
      setIsSubmitting(false)
    }
  }

  const helperText = useMemo(() => {
    if (serviceLocked) {
      return `Service sélectionné : ${service}`
    }
    return 'Précisez votre besoin, nous vous répondons rapidement.'
  }, [service, serviceLocked])

  return (
    <form
      id="devis-form"
      name="contact"
      method="POST"
      action="/merci"
      onSubmit={handleSubmit}
      className={`grid gap-4 ${compact ? 'text-sm' : 'text-base'}`}
    >
      <input
        type="text"
        name="website"
        autoComplete="off"
        tabIndex={-1}
        aria-hidden="true"
        style={{ display: 'none' }}
      />

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

      <button type="submit" className="btn-primary" disabled={!ready || isSubmitting}>
        {ready ? (isSubmitting ? 'Envoi en cours...' : 'Envoyer ma demande') : 'Préparation...'}
      </button>
      {submitError && <p className="text-sm text-rose-600">{submitError}</p>}
    </form>
  )
}

export default ContactForm
