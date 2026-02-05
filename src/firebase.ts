import { initializeApp } from 'firebase/app'
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyA9IhkKYCleb072gj719HN3vPuLSIxr1Ds',
  authDomain: 'transistor-cie.firebaseapp.com',
  projectId: 'transistor-cie',
  storageBucket: 'transistor-cie.firebasestorage.app',
  messagingSenderId: '706380056349',
  appId: '1:706380056349:web:dc72faf811fa215952c3f4',
  measurementId: 'G-LT4CK7RD67',
}

const app = initializeApp(firebaseConfig)

if (import.meta.env.DEV) {
  // App Check debug token for local dev only.
  // After running once, Firebase will log a debug token to use in the console.
  // @ts-expect-error - Firebase sets this on window in dev
  self.FIREBASE_APPCHECK_DEBUG_TOKEN = true
}

initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('6Lf82GEsAAAAAHWHtjFh3pqc0-viDr2xeEmX7nR3'),
  isTokenAutoRefreshEnabled: true,
})

export const db = getFirestore(app)
export const auth = getAuth(app)
