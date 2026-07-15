// Estimateur de prix — données issues de la COUCHE 2 du modèle commercial.
// Sources de vérité :
//   03_COMMERCIAL/02_Offres_Particuliers_Transistor-CIE_2026.xlsx (Packs_devis, Abonnement_famille)
//   03_COMMERCIAL/03_Offres_Entreprises_Transistor-CIE_2026.xlsx (Packs_devis, Abonnement_cyber)
// MAJ 2026-07-15. Toute évolution tarifaire se fait D'ABORD dans les classeurs,
// puis se répercute ici (mêmes IDs de packs, mêmes montants).

/** PK-OPT-URG — prise en charge prioritaire sous 24h (dépannage uniquement). */
export const URGENCY_SURCHARGE = 30

/** Filet de sécurité affiché sous les forfaits dépannage (PK-P01-DIAG). */
export const DIAGNOSTIC_PRICE = 45

/**
 * Deux modes d'affichage du prix :
 *  - 'forfait' : montant one-shot en euros, option urgence applicable (dépannage).
 *  - 'fixe'    : texte prêt à afficher (abonnements, offres à deux composantes).
 */
export type ScenarioPricing =
  | { kind: 'forfait'; min: number; max: number; subLabel?: string }
  | { kind: 'fixe'; main: string; sub?: string }

/**
 * Une option = un pack de la couche 2. Un scénario en propose 1 ou 2
 * (« good-better ») : l'option recommandée est présélectionnée, l'autre
 * sert d'ancre basse et redonne le choix au visiteur.
 */
export type EstimatorOption = {
  id: string
  /** Nom du pack — identique à la couche 2. */
  title: string
  pricing: ScenarioPricing
  includes: string[]
  note: string
  recommended?: boolean
}

export type EstimatorScenario = {
  id: string
  emoji: string
  label: string
  options: EstimatorOption[]
  /** Remplace le micro-texte sous le bouton Appeler (prime à l'appel). */
  phoneHint?: string
  /** Affiche le filet « diagnostic seul 45 €, déduits » sous le détail. */
  safetyNet?: boolean
}

export type EstimatorOffer = {
  id: string
  emoji: string
  /** Puce de niveau 1 (« C’est pour quoi ? »). */
  label: string
  /** Question posée au niveau 2. */
  question: string
  /** Contexte inséré dans les messages WhatsApp / formulaire. */
  messageContext: string
  /** Rappel de délai affiché sur la carte résultat. */
  delayNote: string
  /** Page dédiée de l’offre (maillage interne depuis le résultat). */
  landing: string
  scenarios: EstimatorScenario[]
}

const NOTE_FORFAIT = 'Diagnostic et vérifications finales inclus dans le forfait.'
const NOTE_AJUSTE =
  'Si le diagnostic révèle un besoin plus large, le forfait est ajusté — vous validez toujours avant.'

// ---------------------------------------------------------------------------
// Dépannage — packs PK-P01-* (02_Offres_Particuliers / Packs_devis)
// ---------------------------------------------------------------------------
const OPTION_STD: EstimatorOption = {
  id: 'std',
  title: 'Résolution standard', // PK-P01-STD
  pricing: { kind: 'forfait', min: 89, max: 89 },
  includes: [
    'Diagnostic complet inclus',
    'Résolution du problème à distance',
    'Tests de bon fonctionnement',
  ],
  note: NOTE_FORFAIT,
}

const OPTION_OPTI: EstimatorOption = {
  id: 'opti',
  title: 'Nettoyage & optimisation complète', // PK-P01-OPTI
  pricing: { kind: 'forfait', min: 139, max: 139 },
  includes: [
    'Diagnostic complet inclus',
    'Suppression virus, malwares et pubs',
    'Nettoyage et accélération du système',
    'Vérifications finales',
  ],
  note: NOTE_FORFAIT,
  recommended: true,
}

const depannageScenarios: EstimatorScenario[] = [
  {
    id: 'lent',
    emoji: '🐌',
    label: 'Mon PC est lent ou se fige',
    safetyNet: true,
    options: [
      { ...OPTION_STD, includes: ['Diagnostic complet inclus', 'Nettoyage ciblé du problème', 'Tests de bon fonctionnement'], note: NOTE_AJUSTE },
      OPTION_OPTI,
    ],
  },
  {
    id: 'virus',
    emoji: '🦠',
    label: 'Virus, pubs ou pop-ups suspects',
    safetyNet: true,
    options: [
      { ...OPTION_STD, includes: ['Diagnostic complet inclus', 'Suppression ciblée de la menace', 'Tests de bon fonctionnement'], note: NOTE_AJUSTE },
      OPTION_OPTI,
    ],
  },
  {
    id: 'demarrage',
    emoji: '💥',
    label: 'Écran bleu / plantages au démarrage',
    safetyNet: true,
    options: [
      {
        id: 'std',
        title: 'Réparation du démarrage', // PK-P01-STD
        pricing: { kind: 'forfait', min: 89, max: 89 },
        includes: [
          'Diagnostic complet inclus',
          'Réparation du système en place',
          'Tests de bon fonctionnement',
        ],
        note: NOTE_AJUSTE,
        recommended: true,
      },
      {
        id: 'reinst',
        title: 'Réinstallation complète', // PK-P01-REINST
        pricing: { kind: 'forfait', min: 169, max: 169 },
        includes: [
          'Diagnostic complet inclus',
          'Réinstallation propre du système',
          'Vos données et réglages restaurés',
          'Vérifications finales',
        ],
        note: NOTE_FORFAIT,
      },
    ],
  },
  {
    id: 'wifi',
    emoji: '📶',
    label: 'Wi-Fi ou connexion instable',
    safetyNet: true,
    options: [
      { ...OPTION_STD, includes: ['Diagnostic complet inclus', 'Résolution du problème de connexion', 'Tests de bon fonctionnement'] },
    ],
  },
  {
    id: 'comptes',
    emoji: '🔑',
    label: 'Impossible de me connecter (mots de passe)',
    safetyNet: true,
    options: [
      { ...OPTION_STD, includes: ['Diagnostic complet inclus', 'Récupération des accès et sécurisation', 'Tests de bon fonctionnement'] },
    ],
  },
  {
    id: 'logiciels',
    emoji: '🧩',
    label: 'Mises à jour ou logiciels qui bloquent',
    safetyNet: true,
    options: [OPTION_STD],
  },
  {
    id: 'appareil',
    emoji: '📱',
    label: 'Smartphone, imprimante ou TV connectée',
    options: [
      {
        id: 'dev',
        title: 'Appareil mobile / connecté', // PK-P01-DEV
        pricing: { kind: 'forfait', min: 59, max: 59, subLabel: 'Prix par appareil.' },
        includes: [
          'Configuration de l’appareil',
          'Synchronisation comptes et sauvegardes',
          'Sécurisation de base',
        ],
        note: 'Smartphone, tablette, imprimante, TV connectée ou objet connecté.',
      },
    ],
  },
  {
    id: 'autre',
    emoji: '🤔',
    label: 'Autre problème / je ne sais pas',
    phoneHint:
      'Le plus simple : décrivez-nous le souci au téléphone, on vous dit en 2 minutes quel forfait s’applique — gratuit et sans engagement.',
    options: [
      {
        id: 'diag',
        title: 'Diagnostic complet à distance', // PK-P01-DIAG
        pricing: { kind: 'forfait', min: DIAGNOSTIC_PRICE, max: DIAGNOSTIC_PRICE },
        includes: [
          'Analyse complète du problème à distance',
          'Cause identifiée et expliquée clairement',
          'Devis précis pour la réparation',
        ],
        note: 'Les 45 € sont déduits du montant si vous validez l’intervention ensuite.',
      },
    ],
  },
]

// ---------------------------------------------------------------------------
// Abonnement famille — paliers 39/59/89 (02_Offres_Particuliers / Abonnement_famille)
// ---------------------------------------------------------------------------
const NOTE_FAMILLE = 'Sans engagement, résiliable à tout moment. Mise en place 99 € : audit du foyer + sécurisation.'

const familleScenarios: EstimatorScenario[] = [
  {
    id: 'solo',
    emoji: '👤',
    label: 'Pour 1 ou 2 personnes',
    options: [
      {
        id: 'essentiel',
        title: 'Palier Essentiel',
        pricing: { kind: 'fixe', main: '39 €/mois', sub: '+ mise en place 99 €' },
        includes: [
          'Hotline famille (usage raisonnable)',
          'Sauvegardes vérifiées',
          'Jusqu’à 3 appareils couverts',
        ],
        note: NOTE_FAMILLE,
      },
    ],
  },
  {
    id: 'foyer',
    emoji: '👨‍👩‍👧',
    label: 'Pour toute la famille',
    options: [
      {
        id: 'confort',
        title: 'Palier Confort',
        pricing: { kind: 'fixe', main: '59 €/mois', sub: '+ mise en place 99 €' },
        includes: [
          'Hotline famille (usage raisonnable)',
          '1 session d’assistance par mois (1h)',
          'Suivi mensuel & plan d’action',
          'Jusqu’à 6 appareils couverts',
        ],
        note: NOTE_FAMILLE,
      },
    ],
  },
  {
    id: 'elargie',
    emoji: '👵',
    label: 'Avec les parents / grands-parents',
    options: [
      {
        id: 'premium',
        title: 'Palier Premium',
        pricing: { kind: 'fixe', main: '89 €/mois', sub: '+ mise en place 99 €' },
        includes: [
          'Hotline prioritaire (réponse <24h)',
          '2 sessions d’assistance par mois',
          'Mini-formation familiale chaque trimestre',
          'Appareils du foyer élargi couverts',
        ],
        note: NOTE_FAMILLE,
      },
    ],
  },
]

// ---------------------------------------------------------------------------
// Cybersécurité PME — packs PK-E04-* + paliers S/M/L (03_Offres_Entreprises)
// ---------------------------------------------------------------------------
const NOTE_CYBER = 'Suivi sans engagement après 3 mois. Périmètre et SLA définis noir sur blanc au devis gratuit.'

const cyberScenarios: EstimatorScenario[] = [
  {
    id: 'postes-s',
    emoji: '🖥️',
    label: '1 à 5 postes',
    options: [
      {
        id: 'ess-s',
        title: 'Mise à niveau Essentielle + Suivi S', // PK-E04-ESS + palier S
        pricing: { kind: 'fixe', main: '530 €', sub: 'puis suivi 119 €/mois' },
        includes: [
          'Audit, MFA, sauvegardes, sensibilisation phishing',
          'Jusqu’à 5 postes sécurisés',
          'Contrôles réguliers + reporting mensuel + hotline',
        ],
        note: NOTE_CYBER,
      },
    ],
  },
  {
    id: 'postes-m',
    emoji: '🏢',
    label: '6 à 15 postes',
    options: [
      {
        id: 'avc-m',
        title: 'Mise à niveau Avancée + Suivi M', // PK-E04-AVC + palier M
        pricing: { kind: 'fixe', main: '890 €', sub: 'puis suivi 199 €/mois' },
        includes: [
          'Tout l’Essentielle + VPN et segmentation réseau',
          'Jusqu’à 10 postes inclus (au-delà : ajusté au devis)',
          '1 session de sensibilisation par trimestre',
        ],
        note: NOTE_CYBER,
      },
    ],
  },
  {
    id: 'postes-l',
    emoji: '🏭',
    label: '16 à 30 postes',
    options: [
      {
        id: 'mesure-l',
        title: 'Sécurisation sur mesure + Suivi L', // dès PK-E04-AVC + palier L
        pricing: { kind: 'fixe', main: 'dès 890 €', sub: 'puis suivi 319 €/mois' },
        includes: [
          'Périmètre défini ensemble au devis',
          'Hotline prioritaire (<4h) + reporting mensuel',
          'Revue trimestrielle avec le dirigeant',
        ],
        note: NOTE_CYBER,
      },
    ],
  },
]

// ---------------------------------------------------------------------------
// Site web — packs PK-E01-* (03_Offres_Entreprises / Packs_devis)
// ---------------------------------------------------------------------------
const NOTE_SITEWEB = 'Prix nets, tout compris — de l’atelier de cadrage à la mise en ligne.'

const sitewebScenarios: EstimatorScenario[] = [
  {
    id: 'essentiel',
    emoji: '📄',
    label: 'Site essentiel — 1 à 3 pages',
    options: [
      {
        id: 'ess',
        title: 'Site Essentiel', // PK-E01-ESS
        pricing: { kind: 'fixe', main: '800 €' },
        includes: [
          'Design responsive orienté demandes de devis',
          'Formulaire + SEO technique de base',
          'Mise en ligne complète (domaine, SSL)',
        ],
        note: NOTE_SITEWEB,
      },
    ],
  },
  {
    id: 'vitrine',
    emoji: '🗂️',
    label: 'Site vitrine — 5 pages',
    options: [
      {
        id: 'vit',
        title: 'Site Vitrine', // PK-E01-VIT
        pricing: { kind: 'fixe', main: '1 190 €' },
        includes: [
          '5 pages structurées + formulaire de devis',
          'SEO technique de base',
          'Formation prise en main (2h) incluse',
        ],
        note: NOTE_SITEWEB,
      },
    ],
  },
  {
    id: 'vitrine-plus',
    emoji: '📰',
    label: 'Vitrine + blog / actualités',
    options: [
      {
        id: 'vitp',
        title: 'Site Vitrine+', // PK-E01-VITP
        pricing: { kind: 'fixe', main: '1 490 €' },
        includes: [
          'Tout le site Vitrine',
          'Espace actualités pour votre référencement',
          'Coordination renforcée du projet',
        ],
        note: NOTE_SITEWEB,
      },
    ],
  },
]

// ---------------------------------------------------------------------------
export const estimatorOffers: EstimatorOffer[] = [
  {
    id: 'depannage',
    emoji: '🔧',
    label: 'Dépanner un appareil',
    question: 'Quel est votre souci ?',
    messageContext: 'Dépannage',
    delayNote: 'Prise en charge souvent sous 24h',
    landing: '/depannage-pc',
    scenarios: depannageScenarios,
  },
  {
    id: 'famille',
    emoji: '🏠',
    label: 'Un abonnement famille',
    question: 'Pour qui ?',
    messageContext: 'Abonnement Sérénité Famille',
    delayNote: 'Réponse sous 24–48h ouvrées',
    landing: '/abonnement-famille',
    scenarios: familleScenarios,
  },
  {
    id: 'cyber',
    emoji: '🛡️',
    label: 'Sécuriser mon entreprise',
    question: 'Combien de postes de travail ?',
    messageContext: 'Cybersécurité TPE/PME',
    delayNote: 'Réponse sous 24–48h ouvrées',
    landing: '/cybersecurite-pme',
    scenarios: cyberScenarios,
  },
  {
    id: 'siteweb',
    emoji: '🌐',
    label: 'Créer mon site web',
    question: 'Quel site vous faut-il ?',
    messageContext: 'Site web professionnel',
    delayNote: 'Réponse sous 24–48h ouvrées',
    landing: '/site-web-pro',
    scenarios: sitewebScenarios,
  },
]

export const getOffer = (id: string): EstimatorOffer => {
  const offer = estimatorOffers.find((item) => item.id === id)
  if (!offer) throw new Error(`Offre estimateur inconnue : ${id}`)
  return offer
}
