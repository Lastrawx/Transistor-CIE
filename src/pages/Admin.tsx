import { type FormEvent, useEffect, useMemo, useState } from 'react'
import type { User } from 'firebase/auth'
import { getIdTokenResult, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import type { Timestamp } from 'firebase/firestore'
import { collection, deleteDoc, doc, getDocs, limit, orderBy, query, serverTimestamp, updateDoc } from 'firebase/firestore'
import { auth, db } from '../firebase'
import SEO from '../components/SEO'

const formatDate = (value?: Timestamp | null) => {
  if (!value) return ''
  const date = value.toDate()
  return date.toLocaleString('fr-FR')
}

type DevisItem = {
  id: string
  nom?: string
  prenom?: string
  email?: string
  telephone?: string
  service?: string
  message?: string
  statut?: string
  createdAt?: Timestamp | null
  updatedAt?: Timestamp | null
}

type Status =
  | 'nouveau'
  | 'lu'
  | 'devis_en_cours'
  | 'devis_envoye'
  | 'en_attente_client'
  | 'intervention_a_planifier'
  | 'facture_a_envoyer'
  | 'facture_envoyee'
  | 'termine'
  | 'rejete'

type StatusFilter = 'all' | Status

const statusOptions = [
  { value: 'nouveau', label: 'Nouveau' },
  { value: 'lu', label: 'Lu' },
  { value: 'devis_en_cours', label: 'Devis en cours' },
  { value: 'devis_envoye', label: 'Devis envoyé' },
  { value: 'en_attente_client', label: 'En attente client' },
  { value: 'intervention_a_planifier', label: 'Intervention à planifier' },
  { value: 'facture_a_envoyer', label: 'Facture à envoyer' },
  { value: 'facture_envoyee', label: 'Facture envoyée' },
  { value: 'termine', label: 'Terminé' },
  { value: 'rejete', label: 'Rejeté' },
]

const filterOptions: { value: StatusFilter; label: string }[] = [
  { value: 'all', label: 'Tous' },
  { value: 'nouveau', label: 'Nouveaux' },
  { value: 'lu', label: 'Lus' },
  { value: 'devis_en_cours', label: 'Devis en cours' },
  { value: 'devis_envoye', label: 'Devis envoyés' },
  { value: 'en_attente_client', label: 'En attente client' },
  { value: 'intervention_a_planifier', label: 'Intervention à planifier' },
  { value: 'facture_a_envoyer', label: 'Facture à envoyer' },
  { value: 'facture_envoyee', label: 'Facture envoyée' },
  { value: 'termine', label: 'Terminés' },
  { value: 'rejete', label: 'Rejetés' },
]

const Admin = () => {
  const [user, setUser] = useState<User | null>(null)
  const [hasAdminClaim, setHasAdminClaim] = useState<boolean | null>(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState<string | null>(null)
  const [listError, setListError] = useState<string | null>(null)
  const [isLoadingList, setIsLoadingList] = useState(false)
  const [items, setItems] = useState<DevisItem[]>([])
  const [updatingIds, setUpdatingIds] = useState<Record<string, boolean>>({})
  const [deletingIds, setDeletingIds] = useState<Record<string, boolean>>({})
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')

  const counts = useMemo(() => {
    return items.reduce(
      (acc, item) => {
        const key = (item.statut || 'nouveau') as Status
        acc[key] = (acc[key] ?? 0) + 1
        acc.total += 1
        return acc
      },
      {
        total: 0,
        nouveau: 0,
        lu: 0,
        devis_en_cours: 0,
        devis_envoye: 0,
        en_attente_client: 0,
        intervention_a_planifier: 0,
        facture_a_envoyer: 0,
        facture_envoyee: 0,
        termine: 0,
        rejete: 0,
      },
    )
  }, [items])

  const visibleItems = useMemo(() => {
    const list = [...items].sort((a, b) => {
      const aTime = (a.updatedAt ?? a.createdAt)?.toMillis?.() ?? 0
      const bTime = (b.updatedAt ?? b.createdAt)?.toMillis?.() ?? 0
      return bTime - aTime
    })

    if (statusFilter === 'all') {
      const nouveaux = list.filter((item) => (item.statut || 'nouveau') === 'nouveau')
      const autres = list.filter((item) => (item.statut || 'nouveau') !== 'nouveau')
      return [...nouveaux, ...autres]
    }

    return list.filter((item) => (item.statut || 'nouveau') === statusFilter)
  }, [items, statusFilter])

  const loadDevis = async () => {
    setIsLoadingList(true)
    setListError(null)
    try {
      const request = query(collection(db, 'devis'), orderBy('createdAt', 'desc'), limit(50))
      const snapshot = await getDocs(request)
      const nextItems: DevisItem[] = []
      snapshot.forEach((doc) => {
        const data = doc.data() as Omit<DevisItem, 'id'>
        nextItems.push({ id: doc.id, ...data })
      })
      setItems(nextItems)
    } catch (error) {
      console.error('Firestore read failed', error)
      setListError('Accès refusé ou impossible de charger les devis.')
    } finally {
      setIsLoadingList(false)
    }
  }

  useEffect(() => {
    let active = true

    const syncSession = async (nextUser: User | null) => {
      if (!active) return

      setUser(nextUser)
      setAuthLoading(true)
      setListError(null)

      if (!nextUser) {
        setHasAdminClaim(null)
        setItems([])
        setAuthLoading(false)
        return
      }

      try {
        const tokenResult = await getIdTokenResult(nextUser, true)
        const canAccessAdmin = tokenResult.claims.admin === true

        if (!active) return
        setHasAdminClaim(canAccessAdmin)

        if (canAccessAdmin) {
          await loadDevis()
          return
        }

        setItems([])
        setListError(
          'Compte connecté sans droit administrateur. Activez le claim admin puis reconnectez-vous.',
        )
      } catch (error) {
        console.error('Admin claim check failed', error)
        if (!active) return
        setHasAdminClaim(false)
        setItems([])
        setListError('Impossible de vérifier vos droits administrateur.')
      } finally {
        if (active) {
          setAuthLoading(false)
        }
      }
    }

    const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
      void syncSession(nextUser)
    })

    return () => {
      active = false
      unsubscribe()
    }
  }, [])

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setAuthError(null)
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      console.error('Firebase auth failed', error)
      setAuthError('Connexion impossible. Vérifiez vos identifiants.')
    }
  }

  const handleLogout = async () => {
    await signOut(auth)
  }

  const handleStatusChange = async (id: string, nextStatus: string) => {
    setUpdatingIds((current) => ({ ...current, [id]: true }))
    try {
      await updateDoc(doc(db, 'devis', id), { statut: nextStatus, updatedAt: serverTimestamp() })
      setItems((current) =>
        current.map((item) => (item.id === id ? { ...item, statut: nextStatus } : item)),
      )
    } catch (error) {
      console.error('Firestore status update failed', error)
      setListError('Impossible de mettre à jour le statut. Vérifiez vos droits.')
    } finally {
      setUpdatingIds((current) => ({ ...current, [id]: false }))
    }
  }

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm('Supprimer définitivement ce devis ?')
    if (!confirmed) return
    setDeletingIds((current) => ({ ...current, [id]: true }))
    try {
      await deleteDoc(doc(db, 'devis', id))
      setItems((current) => current.filter((item) => item.id !== id))
    } catch (error) {
      console.error('Firestore delete failed', error)
      setListError('Impossible de supprimer ce devis. Vérifiez vos droits.')
    } finally {
      setDeletingIds((current) => ({ ...current, [id]: false }))
    }
  }

  return (
    <div className="space-y-10">
      <SEO title="Admin — Devis" description="Administration des demandes de devis Transistor&CIE" />

      <section className="container-page section-card p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase text-slate-500">Administration</p>
              <h1 className="text-3xl font-semibold text-slate-900">Demandes de devis</h1>
            </div>
          {user && (
            <button type="button" onClick={handleLogout} className="btn-secondary">
              Se déconnecter
            </button>
          )}
        </div>

        {authLoading ? (
          <p className="mt-6 text-sm text-slate-600">Chargement...</p>
        ) : !user ? (
          <form onSubmit={handleLogin} className="mt-6 grid gap-4 md:max-w-md">
            <label className="space-y-2 text-sm">
              <span className="font-semibold text-slate-700">Email</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3"
                placeholder="admin@domaine.com"
                required
              />
            </label>
            <label className="space-y-2 text-sm">
              <span className="font-semibold text-slate-700">Mot de passe</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3"
                required
              />
            </label>
            <button type="submit" className="btn-primary">
              Se connecter
            </button>
            {authError && <p className="text-sm text-rose-600">{authError}</p>}
          </form>
        ) : hasAdminClaim === false ? (
          <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
            Ce compte est bien connecté mais ne possède pas le rôle <code>admin</code>. Mettez à jour le claim
            administrateur, puis déconnectez-vous et reconnectez-vous.
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <button type="button" onClick={loadDevis} className="btn-secondary" disabled={isLoadingList}>
                {isLoadingList ? 'Chargement...' : 'Rafraîchir la liste'}
              </button>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                Total : {counts.total}
              </span>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                Nouveaux : {counts.nouveau}
              </span>
              {listError && <p className="text-sm text-rose-600">{listError}</p>}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {filterOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setStatusFilter(option.value)}
                  className={statusFilter === option.value ? 'btn-secondary' : 'btn-ghost'}
                >
                  {option.label}
                </button>
              ))}
            </div>

            <div className="grid gap-4">
              {visibleItems.length === 0 && !isLoadingList ? (
                <p className="text-sm text-slate-600">Aucun devis pour le moment.</p>
              ) : (
                visibleItems.map((item) => (
                  <article key={item.id} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                    <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
                      <span className="font-semibold text-slate-800">
                        {[item.prenom, item.nom].filter(Boolean).join(' ') || 'Sans nom'}
                      </span>
                      <span>— {item.email || 'Sans email'}</span>
                      {item.telephone && <span>— {item.telephone}</span>}
                      {(item.statut || 'nouveau') === 'nouveau' && (
                        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                          Nouveau
                        </span>
                      )}
                    </div>
                    {item.service && <p className="mt-2 text-sm text-slate-700">Service : {item.service}</p>}
                    {item.message && <p className="mt-3 whitespace-pre-wrap text-sm text-slate-600">{item.message}</p>}
                    <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-500">
                      <div className="flex items-center gap-2">
                        <span>Statut :</span>
                        <select
                          value={item.statut || 'nouveau'}
                          onChange={(event) => handleStatusChange(item.id, event.target.value)}
                          className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs"
                          disabled={Boolean(updatingIds[item.id])}
                        >
                          {statusOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        {updatingIds[item.id] && <span>Enregistrement...</span>}
                      </div>
                      {item.createdAt && <span>Reçu : {formatDate(item.createdAt)}</span>}
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        className="btn-ghost text-rose-600 hover:text-rose-700"
                        disabled={Boolean(deletingIds[item.id])}
                      >
                        {deletingIds[item.id] ? 'Suppression...' : 'Supprimer'}
                      </button>
                    </div>
                  </article>
                ))
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  )
}

export default Admin
