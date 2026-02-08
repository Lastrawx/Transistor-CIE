import { useEffect, useMemo, useState } from 'react'
import {
  clearUserProfile,
  getUserProfile,
  setUserProfile,
  subscribeUserProfile,
  type UserProfile,
} from './storage'
import { type ProfileContextValue, ProfileContext } from './profile-context'

export const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const [profile, setProfileState] = useState<UserProfile | null>(() => getUserProfile())

  useEffect(() => {
    const update = () => setProfileState(getUserProfile())
    const unsubscribe = subscribeUserProfile(update)
    window.addEventListener('storage', update)
    return () => {
      unsubscribe()
      window.removeEventListener('storage', update)
    }
  }, [])

  const value = useMemo<ProfileContextValue>(
    () => ({
      profile,
      setProfile: (nextProfile) => {
        setUserProfile(nextProfile)
        setProfileState(nextProfile)
      },
      clearProfile: () => {
        clearUserProfile()
        setProfileState(null)
      },
    }),
    [profile],
  )

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
}
