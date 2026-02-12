import { type FormEvent, useEffect, useMemo, useState } from 'react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { Link, useNavigate } from 'react-router-dom'
import { db } from '../firebase'
import { buildSubject, profileLabel } from '../utils/format'
import { useProfile } from '../utils/useProfile'
import type { UserProfile } from '../utils/storage'
import { markQuoteConversionPending } from '../utils/ads'

const profileOptions: { value: UserProfile; label: string }[] = [
  { value: 'particulier', label: 'Particulier' },
  { value: 'entreprise', label: 'Entreprise' },
]

const contactPreferenceOptions = [
  { value: 'mail', label: 'mail' },
  { value: 'appel', label: 'appel' },
  { value: 'sms', label: 'sms' },
  { value: 'whatsapp', label: 'whatsapp' },
] as const

type ContactPreference = (typeof contactPreferenceOptions)[number]['value']

type ContactFormProps = {
  prefillProfile?: UserProfile | null
  prefillService?: string
  prefillSubject?: string
  prefillMessage?: string
  compact?: boolean
}

const MIN_EMAIL_LENGTH = 5
const MAX_EMAIL_LENGTH = 200
const MIN_SUBJECT_LENGTH = 5
const MAX_SUBJECT_LENGTH = 200
const MAX_NAME_LENGTH = 100
const MAX_SERVICE_LENGTH = 160
const MAX_PHONE_LENGTH = 30
const MIN_MESSAGE_LENGTH = 20
const MAX_MESSAGE_LENGTH = 3000
const PHONE_PATTERN = /^$|^[0-9+(). -]{6,25}$/

const ContactForm = ({
  prefillProfile,
  prefillService,
  prefillSubject,
  prefillMessage,
  compact,
}: ContactFormProps) => {
  const navigate = useNavigate()
  const { profile: storedProfile } = useProfile()
  const initialProfile = prefillProfile ?? storedProfile ?? 'particulier'
  const [profile, setProfile] = useState<UserProfile>(() => initialProfile)
  const [service, setService] = useState(() => prefillService ?? '')
  const [phoneValue, setPhoneValue] = useState('')
  const [contactPreference, setContactPreference] = useState<ContactPreference>('mail')
  const [subjectTouched, setSubjectTouched] = useState(() => Boolean(prefillSubject))
  const [subject, setSubject] = useState(
    () => prefillSubject ?? buildSubject(prefillService || 'Demande de devis', initialProfile),
  )
  const [ready, setReady] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const profileLocked = Boolean(prefillProfile)
  const serviceLocked = Boolean(prefillService)

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 1200)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (phoneValue.trim().length === 0 && contactPreference !== 'mail') {
      setContactPreference('mail')
    }
  }, [contactPreference, phoneValue])

  const subjectValue = subjectTouched
    ? subject
    : prefillSubject ?? buildSubject(service || 'Demande de devis', profile)

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
    const subject = (formData.get('objet') ?? '').toString().trim()
    const firstName = (formData.get('prenom') ?? '').toString().trim()
    const lastName = (formData.get('nom') ?? '').toString().trim()
    const serviceValue = (formData.get('service') ?? '').toString().trim()
    const phone = (formData.get('telephone') ?? '').toString().trim()
    const contactPreferenceValue = (formData.get('preferenceRecontact') ?? '').toString().trim()
    const message = (formData.get('message') ?? '').toString().trim()

    if (email.length < MIN_EMAIL_LENGTH || email.length > MAX_EMAIL_LENGTH) {
      setSubmitError('Merci de renseigner un email valide.')
      setIsSubmitting(false)
      return
    }

    if (subject.length < MIN_SUBJECT_LENGTH || subject.length > MAX_SUBJECT_LENGTH) {
      setSubmitError('Merci de renseigner un objet entre 5 et 200 caractères.')
      setIsSubmitting(false)
      return
    }

    if (lastName.length === 0 || lastName.length > MAX_NAME_LENGTH) {
      setSubmitError('Merci de renseigner un nom valide.')
      setIsSubmitting(false)
      return
    }

    if (firstName.length === 0 || firstName.length > MAX_NAME_LENGTH) {
      setSubmitError('Merci de renseigner un prénom valide.')
      setIsSubmitting(false)
      return
    }

    if (serviceValue.length > MAX_SERVICE_LENGTH) {
      setSubmitError('Le champ service est trop long (160 caractères max).')
      setIsSubmitting(false)
      return
    }

    if (phone.length > MAX_PHONE_LENGTH || !PHONE_PATTERN.test(phone)) {
      setSubmitError('Merci de renseigner un téléphone valide ou de laisser ce champ vide.')
      setIsSubmitting(false)
      return
    }

    if (message.length < MIN_MESSAGE_LENGTH || message.length > MAX_MESSAGE_LENGTH) {
      setSubmitError('Merci de renseigner un message entre 20 et 3000 caractères.')
      setIsSubmitting(false)
      return
    }

    const preferredContactMethod: ContactPreference =
      phone.length > 0 && contactPreferenceOptions.some((option) => option.value === contactPreferenceValue)
        ? (contactPreferenceValue as ContactPreference)
        : 'mail'

    const payload = {
      type: 'devis',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      source: 'site-netlify',
      profil: (formData.get('profil') ?? '').toString().trim(),
      service: serviceValue,
      objet: subject,
      nom: lastName,
      prenom: firstName,
      email,
      telephone: phone,
      preferenceRecontact: preferredContactMethod,
      message,
      statut: 'nouveau',
      consentement: Boolean(formData.get('consentement')),
      website: '',
    }

    try {
      await addDoc(collection(db, 'devis'), payload)
      markQuoteConversionPending()
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

  const messagePrefill = useMemo(() => {
    if (!prefillMessage) return ''
    return prefillMessage.slice(0, MAX_MESSAGE_LENGTH)
  }, [prefillMessage])

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
            maxLength={MAX_SERVICE_LENGTH}
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
          value={subjectValue}
          minLength={MIN_SUBJECT_LENGTH}
          maxLength={MAX_SUBJECT_LENGTH}
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
          <input
            name="nom"
            required
            maxLength={MAX_NAME_LENGTH}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3"
          />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-700">Prénom *</span>
          <input
            name="prenom"
            required
            maxLength={MAX_NAME_LENGTH}
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
            maxLength={MAX_EMAIL_LENGTH}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3"
          />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-700">Téléphone</span>
          <input
            type="tel"
            name="telephone"
            value={phoneValue}
            onChange={(event) => setPhoneValue(event.target.value)}
            maxLength={MAX_PHONE_LENGTH}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3"
            placeholder="Optionnel mais recommandé"
          />
        </label>
      </div>

      {phoneValue.trim().length > 0 && (
        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-700">Je préfère être recontacté(e) par</span>
          <select
            name="preferenceRecontact"
            value={contactPreference}
            onChange={(event) => setContactPreference(event.target.value as ContactPreference)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3"
          >
            {contactPreferenceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      )}

      <label className="space-y-2">
        <span className="text-sm font-semibold text-slate-700">Message *</span>
        <textarea
          name="message"
          required
          minLength={MIN_MESSAGE_LENGTH}
          maxLength={MAX_MESSAGE_LENGTH}
          defaultValue={messagePrefill}
          rows={compact ? 4 : 6}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3"
          placeholder="Décrivez votre besoin en quelques lignes."
        ></textarea>
      </label>

      <label className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
        <input type="checkbox" name="consentement" required className="mt-1" />
        <span>
          J’accepte que mes données soient utilisées pour me recontacter dans le cadre de ma demande, conformément à la{' '}
          <Link to="/confidentialite" className="font-medium text-sky-700 underline underline-offset-2 hover:text-sky-800">
            Politique de confidentialité
          </Link>{' '}
          et aux{' '}
          <Link to="/cgv-cgu" className="font-medium text-sky-700 underline underline-offset-2 hover:text-sky-800">
            CGV/CGU
          </Link>
          .
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
