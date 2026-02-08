import { applicationDefault, cert, getApps, initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'

const usage = () => {
  console.error('Usage: npm run set-admin-claim -- <email> <true|false>')
  process.exit(1)
}

const [email, adminFlag = 'true'] = process.argv.slice(2)

if (!email) {
  usage()
}

const admin = adminFlag.toLowerCase() === 'true'

const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON
const credential = serviceAccountJson
  ? cert(JSON.parse(serviceAccountJson))
  : applicationDefault()

if (getApps().length === 0) {
  initializeApp({ credential })
}

const auth = getAuth()
const user = await auth.getUserByEmail(email)
const nextClaims = { ...(user.customClaims ?? {}), admin }

await auth.setCustomUserClaims(user.uid, nextClaims)

console.log(`Claim admin mis à jour pour ${email}: ${admin}`)
console.log('Le compte doit se déconnecter/reconnecter pour rafraîchir le token.')
