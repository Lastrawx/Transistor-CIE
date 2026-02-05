import type { UserProfile } from './storage'

export const profileLabel = (profile: UserProfile | null | undefined) =>
  profile === 'entreprise' ? 'Entreprise' : 'Particulier'

export const buildSubject = (serviceTitle: string, profile: UserProfile | null | undefined) =>
  `Demande de devis — ${serviceTitle} — ${profileLabel(profile)}`

export const toKebab = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
