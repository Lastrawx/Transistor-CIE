import { initializeApp } from 'firebase/app'
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

export const db = getFirestore(app)
export const auth = getAuth(app)
