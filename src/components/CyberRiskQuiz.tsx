import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { buildServiceQuoteLink, type ServiceProfile } from '../content/services'

type CyberRiskQuizProps = {
  profile: ServiceProfile
  serviceId: string
  serviceTitle: string
}

type AnswerValue = 'yes' | 'partial' | 'no'

type QuizQuestion = {
  id: string
  question: string
  why: string
  deficiencySignal: string
}

type RiskLevel = {
  label: string
  summary: string
  assistance: string
  toneClasses: string
}

const questions: QuizQuestion[] = [
  {
    id: 'mfa',
    question: 'L’authentification multifacteur (MFA) est-elle active sur vos comptes sensibles ?',
    why: 'La MFA bloque une grande partie des compromissions de comptes.',
    deficiencySignal: 'Couverture MFA insuffisante sur les comptes sensibles.',
  },
  {
    id: 'password-policy',
    question: 'Utilisez-vous des mots de passe uniques (et idéalement un gestionnaire) ?',
    why: 'Les mots de passe réutilisés facilitent les attaques en cascade.',
    deficiencySignal: 'Politique de mots de passe jugée fragile.',
  },
  {
    id: 'patching',
    question: 'Les systèmes et logiciels critiques sont-ils mis à jour rapidement ?',
    why: 'Les failles non corrigées sont un point d’entrée fréquent.',
    deficiencySignal: 'Retards potentiels de mises à jour de sécurité.',
  },
  {
    id: 'backup',
    question: 'Disposez-vous de sauvegardes régulières, isolées, et testées ?',
    why: 'Une sauvegarde non testée ne protège pas réellement contre un incident.',
    deficiencySignal: 'Niveau de résilience sauvegarde insuffisant.',
  },
  {
    id: 'phishing-awareness',
    question: 'Vos équipes sont-elles sensibilisées au phishing et aux fraudes email ?',
    why: 'Le phishing reste l’un des vecteurs d’attaque les plus courants.',
    deficiencySignal: 'Maturité de sensibilisation phishing à renforcer.',
  },
  {
    id: 'endpoint-protection',
    question: 'Vos postes et mobiles pro ont-ils une protection active (antivirus/EDR) ?',
    why: 'Les appareils non protégés exposent les données et les accès.',
    deficiencySignal: 'Couverture de protection des terminaux incomplète.',
  },
  {
    id: 'admin-rights',
    question: 'Les droits administrateur sont-ils limités au strict nécessaire ?',
    why: 'Trop de privilèges augmentent l’impact d’une compromission.',
    deficiencySignal: 'Gestion des privilèges administrateur exposée.',
  },
  {
    id: 'remote-access',
    question: 'Les accès à distance (RDP, VPN, outils distants) sont-ils sécurisés ?',
    why: 'Les accès distants mal configurés sont des cibles privilégiées.',
    deficiencySignal: 'Sécurisation des accès distants à consolider.',
  },
  {
    id: 'network-segmentation',
    question: 'Votre réseau est-il segmenté (ex: VLAN) pour limiter la propagation ?',
    why: 'La segmentation réduit les mouvements latéraux en cas d’incident.',
    deficiencySignal: 'Segmentation réseau potentiellement insuffisante.',
  },
  {
    id: 'router-hardening',
    question: 'Le routeur/pare-feu est-il durci et surveillé (admin, règles, mises à jour) ?',
    why: 'Le périmètre réseau est une barrière clé de votre sécurité.',
    deficiencySignal: 'Niveau de durcissement périmétrique à vérifier.',
  },
  {
    id: 'asset-inventory',
    question: 'Tenez-vous un inventaire à jour des appareils, comptes et logiciels ?',
    why: 'On ne peut pas protéger correctement ce qui n’est pas identifié.',
    deficiencySignal: 'Visibilité des actifs numériques incomplète.',
  },
  {
    id: 'logging-alerting',
    question: 'Avez-vous des journaux et alertes en cas d’activité anormale ?',
    why: 'Sans visibilité, les incidents sont détectés trop tard.',
    deficiencySignal: 'Capacité de détection/alerte limitée.',
  },
  {
    id: 'incident-plan',
    question: 'Disposez-vous d’un plan de réponse en cas d’incident cyber ?',
    why: 'Un plan réduit le temps d’arrêt et les erreurs en situation de crise.',
    deficiencySignal: 'Préparation opérationnelle à l’incident insuffisante.',
  },
  {
    id: 'continuity',
    question: 'Avez-vous un plan de continuité/reprise d’activité testé ?',
    why: 'La reprise doit être préparée avant l’incident, pas pendant.',
    deficiencySignal: 'Continuité/reprise d’activité peu cadrée.',
  },
  {
    id: 'suppliers',
    question: 'Les accès de prestataires et outils tiers sont-ils revus régulièrement ?',
    why: 'La chaîne de sous-traitance peut introduire des vulnérabilités.',
    deficiencySignal: 'Risque tiers et accès prestataires à surveiller.',
  },
]

const answerChoices: Array<{ value: AnswerValue; label: string; helper: string }> = [
  {
    value: 'yes',
    label: 'Oui, en place',
    helper: 'Mesure appliquée de façon régulière.',
  },
  {
    value: 'partial',
    label: 'Partiellement',
    helper: 'Mesure présente mais incomplète.',
  },
  {
    value: 'no',
    label: 'Non / pas encore',
    helper: 'Mesure absente ou non maîtrisée.',
  },
]

const scoreMap: Record<AnswerValue, number> = {
  yes: 0,
  partial: 1,
  no: 2,
}

const getRiskLevel = (score: number): RiskLevel => {
  if (score <= 8) {
    return {
      label: 'Risque faible',
      summary: 'Vos bases sont déjà bien structurées.',
      assistance: 'Assistance optionnelle: un audit ponctuel peut renforcer les points restants.',
      toneClasses: 'border-emerald-200 bg-emerald-50 text-emerald-950',
    }
  }

  if (score <= 18) {
    return {
      label: 'Risque modéré',
      summary: 'Plusieurs protections existent, mais des écarts peuvent coûter cher en cas d’incident.',
      assistance: 'Assistance recommandée: sécuriser rapidement les priorités réduit fortement le risque.',
      toneClasses: 'border-amber-200 bg-amber-50 text-amber-950',
    }
  }

  return {
    label: 'Risque élevé',
    summary: 'Votre exposition est significative et nécessite une mise à niveau prioritaire.',
    assistance: 'Assistance prioritaire: intervenir vite limite les impacts opérationnels et financiers.',
    toneClasses: 'border-rose-200 bg-rose-50 text-rose-950',
  }
}

const CyberRiskQuiz = ({ profile, serviceId, serviceTitle }: CyberRiskQuizProps) => {
  const [answers, setAnswers] = useState<Partial<Record<string, AnswerValue>>>({})
  const [includeQuizSummaryInQuote, setIncludeQuizSummaryInQuote] = useState(true)

  const answeredCount = useMemo(
    () => questions.filter((question) => answers[question.id] !== undefined).length,
    [answers]
  )

  const isComplete = answeredCount === questions.length

  const totalScore = useMemo(() => {
    if (!isComplete) return null
    return questions.reduce((sum, question) => {
      const value = answers[question.id]
      if (!value) return sum
      return sum + scoreMap[value]
    }, 0)
  }, [answers, isComplete])

  const riskLevel = totalScore === null ? null : getRiskLevel(totalScore)

  const failingPoints = useMemo(() => {
    if (!isComplete) return []

    return questions
      .filter((question) => answers[question.id] !== 'yes')
      .map((question) => ({
        id: question.id,
        signal: question.deficiencySignal,
        status: answers[question.id] === 'partial' ? 'Partiellement couvert' : 'Non couvert',
      }))
  }, [answers, isComplete])

  const quoteSubject = useMemo(() => {
    if (!riskLevel || totalScore === null) return undefined
    return `Évaluation risque cyber (${riskLevel.label} ${totalScore}/30) — ${serviceTitle}`
  }, [riskLevel, serviceTitle, totalScore])

  const quoteMessage = useMemo(() => {
    if (!riskLevel || totalScore === null) return undefined

    const lines = [
      `Synthèse du test cyber — ${serviceTitle}`,
      `Niveau de risque: ${riskLevel.label}`,
      `Score: ${totalScore}/30`,
      '',
    ]

    if (failingPoints.length === 0) {
      lines.push('Récapitulatif des points défaillants signalés: aucun point signalé.')
    } else {
      lines.push('Récapitulatif des points défaillants signalés:')
      failingPoints.forEach((point, index) => {
        lines.push(`${index + 1}. ${point.signal} (${point.status})`)
      })
    }

    lines.push('', 'Merci de me proposer un devis adapté à ce niveau de risque.')
    return lines.join('\n')
  }, [failingPoints, riskLevel, serviceTitle, totalScore])

  const quoteLink = useMemo(() => {
    return buildServiceQuoteLink(profile, serviceId, {
      subject: quoteSubject,
      message: includeQuizSummaryInQuote ? quoteMessage : undefined,
      includeQuizSummary: includeQuizSummaryInQuote,
    })
  }, [includeQuizSummaryInQuote, profile, quoteMessage, quoteSubject, serviceId])
  const progressValue = Math.round((answeredCount / questions.length) * 100)

  const handleAnswer = (questionId: string, value: AnswerValue) => {
    setAnswers((previous) => ({
      ...previous,
      [questionId]: value,
    }))
  }

  return (
    <div id="quiz-cyber" className="scroll-mt-28 space-y-6">
      <p className="text-sm text-slate-600">
        Mini parcours de préqualification basé sur les fondamentaux cyber (MFA, mises à jour, sauvegardes, accès, plan
        incident). Durée: 2 à 4 minutes.
      </p>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-slate-700">
          <span>Progression</span>
          <span>
            {answeredCount}/{questions.length} questions
          </span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-brand-cyan transition-all duration-300"
            style={{ width: `${progressValue}%` }}
          />
        </div>
      </div>

      <div className="space-y-4">
        {questions.map((question, index) => (
          <fieldset key={question.id} className="rounded-2xl border border-slate-100 bg-white p-4">
            <legend className="text-sm font-semibold text-slate-900">
              {index + 1}. {question.question}
            </legend>
            <p className="mt-1 text-xs text-slate-500">{question.why}</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              {answerChoices.map((choice) => {
                const selected = answers[question.id] === choice.value
                return (
                  <label
                    key={choice.value}
                    className={`cursor-pointer rounded-xl border px-3 py-3 text-left transition ${
                      selected
                        ? 'border-brand-cyan bg-sky-50 text-slate-900 shadow-sm'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name={question.id}
                      value={choice.value}
                      checked={selected}
                      onChange={() => handleAnswer(question.id, choice.value)}
                      className="sr-only"
                    />
                    <span className="block text-sm font-semibold">{choice.label}</span>
                    <span className="mt-1 block text-xs">{choice.helper}</span>
                  </label>
                )
              })}
            </div>
          </fieldset>
        ))}
      </div>

      {!isComplete && (
        <p className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
          Complétez les {questions.length} questions pour obtenir votre niveau de risque.
        </p>
      )}

      {riskLevel && totalScore !== null && (
        <div className={`rounded-2xl border p-5 ${riskLevel.toneClasses}`}>
          <h3 className="text-xl font-semibold">{riskLevel.label}</h3>
          <p className="mt-2 text-sm">{riskLevel.summary}</p>
          <p className="mt-2 text-sm font-semibold">{riskLevel.assistance}</p>
          <p className="mt-3 text-sm">
            Score: <span className="font-semibold">{totalScore}/30</span> (plus le score est élevé, plus le risque est
            important).
          </p>

          {failingPoints.length > 0 && (
            <div className="mt-4 rounded-xl border border-white/60 bg-white/70 p-4">
              <p className="text-sm font-semibold text-slate-900">Récapitulatif des points défaillants signalés</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                {failingPoints.map((point) => (
                  <li key={point.id}>
                    {point.signal} ({point.status})
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-4 rounded-xl border border-slate-200 bg-white/80 p-4">
            <label className="flex items-start gap-3 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={includeQuizSummaryInQuote}
                onChange={(event) => setIncludeQuizSummaryInQuote(event.target.checked)}
                className="mt-0.5"
              />
              <span>Inclure la synthèse des points défaillants signalés dans cette demande de devis.</span>
            </label>
            <p className="mt-2 text-xs text-slate-500">
              Cette option s’applique uniquement au bouton devis ci-dessous, pas aux autres boutons du site.
            </p>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link to={quoteLink} className="btn-primary">
              {includeQuizSummaryInQuote ? 'Demander un devis avec la synthèse du test' : 'Demander un devis'}
            </Link>
            <span className="inline-flex items-center rounded-full border border-slate-300 bg-white/70 px-4 py-2 text-xs font-semibold text-slate-700">
              {includeQuizSummaryInQuote
                ? 'Objet + message préremplis avec votre niveau de risque'
                : 'Objet prérempli avec votre niveau de risque'}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default CyberRiskQuiz
