export type UserProfile = 'particulier' | 'entreprise'

const STORAGE_KEY = 'userProfile'
const EVENT_NAME = 'userProfileChange'

export const getUserProfile = (): UserProfile | null => {
  if (typeof window === 'undefined') return null
  const value = window.localStorage.getItem(STORAGE_KEY)
  if (value === 'particulier' || value === 'entreprise') return value
  return null
}

export const setUserProfile = (profile: UserProfile) => {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEY, profile)
  window.dispatchEvent(new Event(EVENT_NAME))
}

export const clearUserProfile = () => {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(STORAGE_KEY)
  window.dispatchEvent(new Event(EVENT_NAME))
}

export const subscribeUserProfile = (callback: () => void) => {
  if (typeof window === 'undefined') return () => {}
  window.addEventListener(EVENT_NAME, callback)
  return () => window.removeEventListener(EVENT_NAME, callback)
}
