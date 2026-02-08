import { createContext } from 'react'
import type { UserProfile } from './storage'

export type ProfileContextValue = {
  profile: UserProfile | null
  setProfile: (profile: UserProfile) => void
  clearProfile: () => void
}

export const ProfileContext = createContext<ProfileContextValue>({
  profile: null,
  setProfile: () => {},
  clearProfile: () => {},
})
