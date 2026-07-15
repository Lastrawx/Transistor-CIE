import { type FormEvent, useMemo, useState } from 'react'
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
  /** Mode allégé : message optionnel, en-têtes masqués, libellé d'envoi orienté contact. */
  express?: boolean
  /** Boutons "symptôme" rapides (mode express) qui pré-remplissent le message en un clic. */
  quickReasons?: string[]
  /** Libellé personnalisé du bouton d'envoi. */
  submitLabel?: string
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
  express = false,
  quickReasons,
  submitLabel,
}: ContactFormProps) => {
  const navigate = useNavigate()
  const { profile: storedProfile } = useProfile()
  const initialProfile = prefillProfile ?? storedProfile ?? 'particulier'
  const [profile, setProfile] = useState<UserProfile>(() => initialProfile)
  const service = prefillService ?? ''
  const [phoneValue, setPhoneValue] = useState('')
  const [contactPreference, setContactPreference] = useState<ContactPreference>('mail')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [messageText, setMessageText] = useState(() =>
    prefillMessage ? prefillMessage.slice(0, MAX_MESSAGE_LENGTH) : '',
  )

  const profileLocked = Boolean(prefillProfile)
  const serviceLocked = Boolean(prefillService)
  const hasObjectPrefill = Boolean(prefillSubject || prefillService)

  const subjectValue = useMemo(
    () => prefillSubject ?? buildSubject(service || 'Demande de devis', profile),
    [prefillSubject, profile, service],
  )

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
    const rawSubject = (formData.get('objet') ?? '').toString().trim()
    const subject = rawSubject.length > 0 ? rawSubject : subjectValue
    const firstName = (formData.get('prenom') ?? '').toString().trim()
    const lastName = (formData.get('nom') ?? '').toString().trim()
    const serviceValue = (formData.get('service') ?? '').toString().trim()
    const phone = (formData.get('telephone') ?? '').toString().trim()
    const contactPreferenceValue = (formData.get('preferenceRecontact') ?? '').toString().trim()
    const message = messageText.trim()

    if (email.length === 0 && phone.length === 0) {
      setSubmitError('Merci de laisser au moins un moyen de vous recontacter : email ou téléphone.')
      setIsSubmitting(false)
      return
    }

    if (email.length > 0 && (email.length < MIN_EMAIL_LENGTH || email.length > MAX_EMAIL_LENGTH)) {
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

    if (message.length > MAX_MESSAGE_LENGTH) {
      setSubmitError('Votre message est trop long (3000 caractères max).')
      setIsSubmitting(false)
      return
    }

    if (!express && message.length < MIN_MESSAGE_LENGTH) {
      setSubmitError('Merci de renseigner un message entre 20 et 3000 caractères.')
      setIsSubmitting(false)
      return
    }

    // En mode express le message est optionnel : si l'utilisateur n'écrit rien
    // (ou trop court), on compose un message valide à partir de l'objet/service
    // pour respecter la contrainte serveur (message >= 20 caractères).
    const messageToSend =
      message.length >= MIN_MESSAGE_LENGTH ? message : `${subject}${message ? ` — ${message}` : ''}`

    let preferredContactMethod: ContactPreference =
      phone.length > 0 && contactPreferenceOptions.some((option) => option.value === contactPreferenceValue)
        ? (contactPreferenceValue as ContactPreference)
        : 'mail'
    // Sans email, le recontact ne peut pas être « mail » : on bascule sur l'appel.
    if (email.length === 0 && preferredContactMethod === 'mail') {
      preferredContactMethod = 'appel'
    }

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
      message: messageToSend,
      statut: 'nouveau',
      consentement: Boolean(formData.get('consentement')),
      website: '',
    }

    try {
      await addDoc(collection(db, 'devis'), payload)
      markQuoteConversionPending()
      form.reset()
      setMessageText('')
      navigate('/merci')
    } catch (error) {
      console.error('Firestore submission failed', error)
      setSubmitError('Erreur lors de l’envoi. Merci de réessayer.')
      setIsSubmitting(false)
    }
  }

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
        express ? (
          <input type="hidden" name="profil" value={profile} />
        ) : (
          <div className="rounded-xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700">
            Profil : {profileLabel(profile)}
            <input type="hidden" name="profil" value={profile} />
          </div>
        )
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

      <input type="hidden" name="service" value={service} />
      {hasObjectPrefill ? (
        <>
          <input type="hidden" name="objet" value={subjectValue} />
          {!express && (
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
              {serviceLocked
                ? `Service sélectionné : ${service}`
                : 'Objet prérempli automatiquement pour accélérer votre demande.'}
            </div>
          )}
        </>
      ) : (
        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-700">Objet (optionnel)</span>
          <input
            name="objet"
            minLength={MIN_SUBJECT_LENGTH}
            maxLength={MAX_SUBJECT_LENGTH}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3"
            placeholder="Ex: Besoin d'assistance informatique"
          />
          <p className="text-xs text-slate-500">Si vide, un objet sera généré automatiquement.</p>
        </label>
      )}

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

      <div className="space-y-2">
        <p className="text-sm font-semibold text-slate-700">
          Comment vous recontacter ? *{' '}
          <span className="font-normal text-slate-500">Email ou téléphone — un seul suffit.</span>
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">Email</span>
            <input
              type="email"
              name="email"
              required={phoneValue.trim().length === 0}
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
              placeholder="Si vous préférez être appelé(e)"
            />
          </label>
        </div>
        <p className="text-xs text-slate-500">
          🔒 Vos coordonnées servent uniquement à répondre à cette demande. Pas de newsletter, pas de
          démarchage, jamais transmises à des tiers.
        </p>
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

      {express && quickReasons && quickReasons.length > 0 && (
        <div className="space-y-2">
          <span className="text-sm font-semibold text-slate-700">Quel est votre souci ? (1 clic)</span>
          <div className="flex flex-wrap gap-2">
            {quickReasons.map((reason) => {
              const isActive = messageText.trim() === reason
              return (
                <button
                  type="button"
                  key={reason}
                  onClick={() => setMessageText(reason)}
                  aria-pressed={isActive}
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                    isActive
                      ? 'border-brand-cyan bg-brand-cyan/10 text-brand-ink'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-brand-cyan hover:text-slate-900'
                  }`}
                >
                  {reason}
                </button>
              )
            })}
          </div>
        </div>
      )}

      <label className="space-y-2">
        <span className="text-sm font-semibold text-slate-700">
          {express ? 'Détails (optionnel)' : 'Message *'}
        </span>
        <textarea
          name="message"
          required={!express}
          minLength={express ? undefined : MIN_MESSAGE_LENGTH}
          maxLength={MAX_MESSAGE_LENGTH}
          value={messageText}
          onChange={(event) => setMessageText(event.target.value)}
          rows={compact ? 4 : 6}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3"
          placeholder={
            express
              ? 'Ajoutez un détail si besoin (marque du PC, message d’erreur…). Facultatif.'
              : 'Décrivez votre besoin en quelques lignes.'
          }
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

      <button type="submit" data-track-metric="quoteClicks" className="btn-primary" disabled={isSubmitting}>
        {isSubmitting ? 'Envoi en cours...' : submitLabel ?? 'Demander mon devis'}
      </button>
      {submitError && <p className="text-sm text-rose-600">{submitError}</p>}
    </form>
  )
}

export default ContactForm
