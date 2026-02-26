import { type FormEvent, useEffect, useMemo, useState } from 'react'
import type { User } from 'firebase/auth'
import { getIdTokenResult, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import type { Timestamp } from 'firebase/firestore'
import { collection, deleteDoc, doc, getDocs, limit, onSnapshot, orderBy, query, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'
import { auth, db } from '../firebase'
import SEO from '../components/SEO'
import {
  SITE_METRIC_FIELDS,
  SITE_METRIC_LABELS,
  createEmptySiteMetricCounters,
  type SiteMetricCounters,
  type SiteMetricField,
} from '../utils/site-metrics'

const formatDate = (value?: Timestamp | null) => {
  if (!value) return ''
  const date = value.toDate()
  return date.toLocaleString('fr-FR')
}

type DevisItem = {
  id: string
  type?: string
  source?: string
  profil?: string
  objet?: string
  nom?: string
  prenom?: string
  email?: string
  telephone?: string
  preferenceRecontact?: string
  service?: string
  message?: string
  statut?: string
  consentement?: boolean
  website?: string
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

const statusLabelMap = Object.fromEntries(statusOptions.map((option) => [option.value, option.label])) as Record<
  string,
  string
>

const toMillis = (value?: Timestamp | null) => {
  return value?.toMillis?.() ?? 0
}

const toDate = (value?: Timestamp | null) => {
  if (!value || typeof value.toDate !== 'function') return null
  return value.toDate()
}

const normalize = (value?: string | null) => {
  return value?.toString().trim() ?? ''
}

type SiteMetricsState = SiteMetricCounters & {
  updatedAt?: Timestamp | null
}

const createEmptySiteMetricsState = (): SiteMetricsState => ({
  ...createEmptySiteMetricCounters(),
  updatedAt: null,
})

const toMetricCounter = (value: unknown) =>
  typeof value === 'number' && Number.isFinite(value) && value >= 0 ? Math.floor(value) : 0

type SiteOpeningEvent = {
  id: string
  openedAt?: Timestamp | null
}

type ContactChannel = 'mail' | 'appel' | 'sms' | 'whatsapp'

const contactChannelLabelMap: Record<ContactChannel, string> = {
  mail: 'Mail',
  appel: 'Appel',
  sms: 'SMS',
  whatsapp: 'WhatsApp',
}

const formatContactChannel = (value?: string | null) => {
  const normalized = normalize(value).toLowerCase()
  if (normalized === 'appel' || normalized === 'sms' || normalized === 'whatsapp') {
    return contactChannelLabelMap[normalized]
  }
  return contactChannelLabelMap.mail
}

const Admin = () => {
  const [user, setUser] = useState<User | null>(null)
  const [hasAdminClaim, setHasAdminClaim] = useState<boolean | null>(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState<string | null>(null)
  const [listError, setListError] = useState<string | null>(null)
  const [isLoadingList, setIsLoadingList] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [exportFeedback, setExportFeedback] = useState<string | null>(null)
  const [items, setItems] = useState<DevisItem[]>([])
  const [updatingIds, setUpdatingIds] = useState<Record<string, boolean>>({})
  const [deletingIds, setDeletingIds] = useState<Record<string, boolean>>({})
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [siteMetrics, setSiteMetrics] = useState<SiteMetricsState>(() => createEmptySiteMetricsState())
  const [metricsError, setMetricsError] = useState<string | null>(null)
  const [resettingMetric, setResettingMetric] = useState<SiteMetricField | 'all' | null>(null)
  const [siteOpenings, setSiteOpenings] = useState<SiteOpeningEvent[]>([])
  const [siteOpeningsError, setSiteOpeningsError] = useState<string | null>(null)

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
      const aTime = toMillis(a.updatedAt ?? a.createdAt)
      const bTime = toMillis(b.updatedAt ?? b.createdAt)
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

  const fetchAllDevis = async () => {
    const snapshot = await getDocs(collection(db, 'devis'))
    const allItems: DevisItem[] = []
    snapshot.forEach((entry) => {
      const data = entry.data() as Omit<DevisItem, 'id'>
      allItems.push({ id: entry.id, ...data })
    })

    allItems.sort((a, b) => {
      const aTime = toMillis(a.createdAt ?? a.updatedAt)
      const bTime = toMillis(b.createdAt ?? b.updatedAt)
      return bTime - aTime
    })

    return allItems
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

  useEffect(() => {
    if (!user || hasAdminClaim !== true) {
      setSiteMetrics(createEmptySiteMetricsState())
      setMetricsError(null)
      return
    }

    const metricsRef = doc(db, 'site_metrics', 'global')
    const unsubscribe = onSnapshot(
      metricsRef,
      (snapshot) => {
        if (!snapshot.exists()) {
          setSiteMetrics(createEmptySiteMetricsState())
          setMetricsError(null)
          return
        }

        const data = snapshot.data()
        setSiteMetrics({
          siteOpens: toMetricCounter(data.siteOpens),
          totalClicks: toMetricCounter(data.totalClicks),
          quoteClicks: toMetricCounter(data.quoteClicks),
          poleParticulierClicks: toMetricCounter(data.poleParticulierClicks),
          poleEntrepriseClicks: toMetricCounter(data.poleEntrepriseClicks),
          updatedAt: (data.updatedAt as Timestamp | undefined) ?? null,
        })
        setMetricsError(null)
      },
      (error) => {
        console.error('Site metrics subscription failed', error)
        setMetricsError('Impossible de charger les compteurs du site.')
      },
    )

    return () => {
      unsubscribe()
    }
  }, [hasAdminClaim, user])

  useEffect(() => {
    if (!user || hasAdminClaim !== true) {
      setSiteOpenings([])
      setSiteOpeningsError(null)
      return
    }

    const openingsQuery = query(
      collection(db, 'site_metrics', 'global', 'openings'),
      orderBy('openedAt', 'desc'),
      limit(50),
    )

    const unsubscribe = onSnapshot(
      openingsQuery,
      (snapshot) => {
        const nextOpenings: SiteOpeningEvent[] = []
        snapshot.forEach((entry) => {
          const data = entry.data()
          nextOpenings.push({
            id: entry.id,
            openedAt: (data.openedAt as Timestamp | undefined) ?? null,
          })
        })
        setSiteOpenings(nextOpenings)
        setSiteOpeningsError(null)
      },
      (error) => {
        console.error('Site openings subscription failed', error)
        setSiteOpenings([])
        const code = (error as { code?: string } | undefined)?.code
        if (code === 'permission-denied') {
          setSiteOpeningsError(
            "Accès refusé à l'historique des ouvertures. Déployez les règles Firestore mises à jour.",
          )
          return
        }
        setSiteOpeningsError("Impossible de charger l'historique des ouvertures du site.")
      },
    )

    return () => {
      unsubscribe()
    }
  }, [hasAdminClaim, user])

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

  const handleResetMetric = async (metric: SiteMetricField | 'all') => {
    const metricLabel = metric === 'all' ? 'tous les compteurs' : SITE_METRIC_LABELS[metric]
    const confirmed = window.confirm(`Réinitialiser ${metricLabel} ?`)
    if (!confirmed) return

    setResettingMetric(metric)
    setMetricsError(null)

    const payload: Record<string, unknown> = {
      updatedAt: serverTimestamp(),
    }

    if (metric === 'all') {
      SITE_METRIC_FIELDS.forEach((field) => {
        payload[field] = 0
      })
    } else {
      payload[metric] = 0
    }

    try {
      await setDoc(doc(db, 'site_metrics', 'global'), payload, { merge: true })
    } catch (error) {
      console.error('Site metrics reset failed', error)
      setMetricsError('Impossible de réinitialiser les compteurs.')
    } finally {
      setResettingMetric(null)
    }
  }

  const handleExportExcel = async () => {
    setIsExporting(true)
    setExportFeedback(null)
    setListError(null)

    try {
      const allItems = await fetchAllDevis()
      const { Workbook } = await import('exceljs')
      const workbook = new Workbook()
      workbook.creator = 'Transistor&CIE'
      workbook.created = new Date()
      workbook.modified = new Date()

      const sheet = workbook.addWorksheet('Demandes de devis', {
        views: [{ state: 'frozen', ySplit: 3 }],
      })

      const columns = [
        { header: 'Date de réception', key: 'createdAt', width: 22 },
        { header: 'Dernière mise à jour', key: 'updatedAt', width: 22 },
        { header: 'Statut', key: 'statusLabel', width: 18 },
        { header: 'Profil', key: 'profil', width: 14 },
        { header: 'Service', key: 'service', width: 34 },
        { header: 'Objet', key: 'objet', width: 40 },
        { header: 'Nom', key: 'nom', width: 18 },
        { header: 'Prénom', key: 'prenom', width: 18 },
        { header: 'Email', key: 'email', width: 34 },
        { header: 'Téléphone', key: 'telephone', width: 18 },
        { header: 'Canal recontact', key: 'preferenceRecontact', width: 18 },
        { header: 'Message', key: 'message', width: 62 },
        { header: 'Consentement', key: 'consentement', width: 14 },
        { header: 'Source', key: 'source', width: 18 },
        { header: 'Type', key: 'type', width: 12 },
        { header: 'ID Firestore', key: 'id', width: 34 },
      ] as const

      sheet.columns = columns.map((column) => ({ key: column.key, width: column.width }))

      const titleCell = sheet.getCell('A1')
      titleCell.value = 'Demandes de devis — Transistor&CIE'
      titleCell.font = { bold: true, size: 16, color: { argb: 'FFFFFFFF' } }
      titleCell.alignment = { vertical: 'middle', horizontal: 'left' }
      titleCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '0F172A' } }
      sheet.mergeCells(1, 1, 1, columns.length)
      sheet.getRow(1).height = 26

      const exportInfoCell = sheet.getCell('A2')
      exportInfoCell.value = `Export généré le ${new Date().toLocaleString('fr-FR')} — ${allItems.length} demandes`
      exportInfoCell.font = { italic: true, color: { argb: '475569' } }
      exportInfoCell.alignment = { vertical: 'middle', horizontal: 'left' }
      sheet.mergeCells(2, 1, 2, columns.length)
      sheet.getRow(2).height = 22

      const headerRow = sheet.getRow(3)
      headerRow.values = columns.map((column) => column.header)
      headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } }
      headerRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1D4ED8' } }
      headerRow.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
      headerRow.height = 24

      allItems.forEach((item) => {
        const statusValue = normalize(item.statut) || 'nouveau'
        const statusLabel = statusLabelMap[statusValue] ?? statusValue
        sheet.addRow({
          createdAt: toDate(item.createdAt) ?? '',
          updatedAt: toDate(item.updatedAt) ?? '',
          statusLabel,
          profil: normalize(item.profil),
          service: normalize(item.service),
          objet: normalize(item.objet),
          nom: normalize(item.nom),
          prenom: normalize(item.prenom),
          email: normalize(item.email),
          telephone: normalize(item.telephone),
          preferenceRecontact: formatContactChannel(item.preferenceRecontact),
          message: normalize(item.message),
          consentement: item.consentement ? 'Oui' : 'Non',
          source: normalize(item.source),
          type: normalize(item.type) || 'devis',
          id: item.id,
        })
      })

      const lastRowNumber = Math.max(sheet.rowCount, 3)
      sheet.autoFilter = {
        from: { row: 3, column: 1 },
        to: { row: lastRowNumber, column: columns.length },
      }

      for (let rowNumber = 4; rowNumber <= lastRowNumber; rowNumber += 1) {
        const row = sheet.getRow(rowNumber)
        row.getCell(1).numFmt = 'dd/mm/yyyy hh:mm'
        row.getCell(2).numFmt = 'dd/mm/yyyy hh:mm'
        row.getCell(12).alignment = { vertical: 'top', wrapText: true }
        row.alignment = { vertical: 'top' }

        const messageText = row.getCell(12).value?.toString() ?? ''
        if (messageText.length > 0) {
          row.height = Math.min(120, Math.max(20, Math.ceil(messageText.length / 95) * 18))
        }
      }

      const fileStamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-')
      const fileName = `devis_transistor_cie_${fileStamp}.xlsx`
      const buffer = await workbook.xlsx.writeBuffer()
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = fileName
      document.body.append(link)
      link.click()
      link.remove()
      URL.revokeObjectURL(url)

      setExportFeedback(`Export Excel généré: ${allItems.length} demandes.`)
    } catch (error) {
      console.error('Excel export failed', error)
      setExportFeedback('Échec de l’export Excel. Vérifiez vos droits et réessayez.')
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="space-y-10 pt-3 sm:pt-4">
      <SEO title="Admin — Devis" description="Administration des demandes de devis Transistor&CIE" noIndex />

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
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase text-slate-500">Module compteurs</p>
                  <h2 className="text-xl font-semibold text-slate-900">Compteurs du site (base de données)</h2>
                </div>
                <button
                  type="button"
                  onClick={() => handleResetMetric('all')}
                  className="btn-ghost text-rose-600 hover:text-rose-700"
                  disabled={resettingMetric !== null}
                >
                  {resettingMetric === 'all' ? 'Réinitialisation...' : 'Réinitialiser tous les compteurs'}
                </button>
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
                {SITE_METRIC_FIELDS.map((field) => (
                  <article key={field} className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-xs font-semibold uppercase text-slate-500">{SITE_METRIC_LABELS[field]}</p>
                    <p className="mt-2 text-2xl font-semibold text-slate-900">
                      {siteMetrics[field].toLocaleString('fr-FR')}
                    </p>
                    {field === 'siteOpens' && (
                      <p className="mt-2 text-xs text-slate-500">
                        Dernière ouverture :{' '}
                        {siteOpenings[0]?.openedAt ? formatDate(siteOpenings[0].openedAt) : 'aucune donnée'}
                      </p>
                    )}
                    <button
                      type="button"
                      onClick={() => handleResetMetric(field)}
                      className="btn-ghost mt-3 w-full text-xs"
                      disabled={resettingMetric !== null}
                    >
                      {resettingMetric === field ? 'Réinitialisation...' : 'Réinitialiser'}
                    </button>
                  </article>
                ))}
              </div>

              <div className="mt-3 text-xs text-slate-500">
                Dernière mise à jour : {siteMetrics.updatedAt ? formatDate(siteMetrics.updatedAt) : 'aucune donnée'}
              </div>
              {metricsError && <p className="mt-2 text-sm text-rose-600">{metricsError}</p>}

              <details className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
                <summary className="cursor-pointer text-sm font-semibold text-slate-800">
                  Voir date/heure des 50 dernières ouvertures du site
                </summary>
                {siteOpenings.length === 0 ? (
                  <p className="mt-3 text-sm text-slate-500">Aucune ouverture enregistrée.</p>
                ) : (
                  <div className="mt-3 max-h-64 overflow-auto rounded-xl border border-slate-100">
                    <ul className="divide-y divide-slate-100">
                      {siteOpenings.map((opening, index) => (
                        <li key={opening.id} className="flex items-center justify-between px-3 py-2 text-sm text-slate-700">
                          <span className="text-slate-500">#{index + 1}</span>
                          <span>{opening.openedAt ? formatDate(opening.openedAt) : 'Date indisponible'}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </details>
              {siteOpeningsError && <p className="mt-2 text-sm text-rose-600">{siteOpeningsError}</p>}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button type="button" onClick={loadDevis} className="btn-secondary" disabled={isLoadingList}>
                {isLoadingList ? 'Chargement...' : 'Rafraîchir la liste'}
              </button>
              <button
                type="button"
                onClick={handleExportExcel}
                className="btn-secondary"
                disabled={isExporting}
              >
                {isExporting ? 'Export en cours...' : 'Exporter Excel'}
              </button>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                Total : {counts.total}
              </span>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                Nouveaux : {counts.nouveau}
              </span>
              {listError && <p className="text-sm text-rose-600">{listError}</p>}
              {exportFeedback && (
                <p
                  className={`text-sm ${
                    exportFeedback.startsWith('Échec') ? 'text-rose-600' : 'text-emerald-700'
                  }`}
                >
                  {exportFeedback}
                </p>
              )}
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
                      <span>— Recontact : {formatContactChannel(item.preferenceRecontact)}</span>
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
