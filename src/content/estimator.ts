// Estimateur de prix — données issues de la COUCHE 2 du modèle commercial.
// Source de vérité : 03_COMMERCIAL/02_Offres_Particuliers_Transistor-CIE_2026.xlsx
// (feuille Packs_devis) — MAJ 2026-07-15. Toute évolution tarifaire se fait
// D'ABORD dans le classeur, puis se répercute ici (mêmes IDs de packs).

export type EstimatorPack = {
  /** ID identique à la colonne « Pack ID » du classeur (couche 2). */
  id: string
  name: string
  /** Prix public net en euros (TVA non applicable, art. 293 B du CGI). */
  price: number
  includes: string[]
  note: string
}

/** PK-OPT-URG — prise en charge prioritaire sous 24h. */
export const URGENCY_SURCHARGE = 30

const packs: Record<string, EstimatorPack> = {
  'PK-P01-DIAG': {
    id: 'PK-P01-DIAG',
    name: 'Diagnostic complet à distance',
    price: 45,
    includes: [
      'Analyse complète du problème à distance',
      'Cause identifiée et expliquée clairement',
      'Devis précis pour la réparation',
    ],
    note: 'Les 45 € sont déduits du montant si vous validez l’intervention ensuite.',
  },
  'PK-P01-STD': {
    id: 'PK-P01-STD',
    name: 'Résolution standard',
    price: 89,
    includes: [
      'Diagnostic complet inclus',
      'Résolution du problème à distance',
      'Tests de bon fonctionnement',
    ],
    note: 'Diagnostic et vérifications finales inclus dans le forfait.',
  },
  'PK-P01-OPTI': {
    id: 'PK-P01-OPTI',
    name: 'Nettoyage & optimisation complète',
    price: 139,
    includes: [
      'Diagnostic complet inclus',
      'Suppression virus, malwares et pubs',
      'Nettoyage et accélération du système',
      'Vérifications finales',
    ],
    note: 'Diagnostic et vérifications finales inclus dans le forfait.',
  },
  'PK-P01-REINST': {
    id: 'PK-P01-REINST',
    name: 'Réinstallation complète',
    price: 169,
    includes: [
      'Diagnostic complet inclus',
      'Réinstallation propre du système',
      'Restauration de vos données et réglages',
      'Vérifications finales',
    ],
    note: 'Diagnostic et vérifications finales inclus dans le forfait.',
  },
  'PK-P01-DEV': {
    id: 'PK-P01-DEV',
    name: 'Appareil mobile / connecté',
    price: 59,
    includes: [
      'Configuration de l’appareil',
      'Synchronisation comptes et sauvegardes',
      'Sécurisation de base',
    ],
    note: 'Smartphone, tablette, imprimante, TV connectée ou objet connecté.',
  },
}

export const getPack = (id: string): EstimatorPack => {
  const pack = packs[id]
  if (!pack) throw new Error(`Pack estimateur inconnu : ${id}`)
  return pack
}

export type EstimatorScenario = {
  id: string
  emoji: string
  label: string
  /** Pack recommandé (prix affiché = borne haute de la fourchette). */
  packId: string
  /**
   * Borne basse si l'issue dépend du diagnostic (ex. un écran bleu peut se
   * régler en résolution standard 89 € comme finir en réinstallation 169 €).
   * Absente = forfait unique.
   */
  priceMin?: number
}

export const estimatorScenarios: EstimatorScenario[] = [
  { id: 'lent', emoji: '🐌', label: 'Mon PC est lent ou se fige', packId: 'PK-P01-OPTI', priceMin: 89 },
  { id: 'virus', emoji: '🦠', label: 'Virus, pubs ou pop-ups suspects', packId: 'PK-P01-OPTI', priceMin: 89 },
  { id: 'demarrage', emoji: '💥', label: 'Écran bleu / plantages au démarrage', packId: 'PK-P01-REINST', priceMin: 89 },
  { id: 'wifi', emoji: '📶', label: 'Wi-Fi ou connexion instable', packId: 'PK-P01-STD' },
  { id: 'comptes', emoji: '🔑', label: 'Impossible de me connecter (mots de passe)', packId: 'PK-P01-STD' },
  { id: 'logiciels', emoji: '🧩', label: 'Mises à jour ou logiciels qui bloquent', packId: 'PK-P01-STD' },
  { id: 'appareil', emoji: '📱', label: 'Smartphone, imprimante ou TV connectée', packId: 'PK-P01-DEV' },
  { id: 'autre', emoji: '🤔', label: 'Autre problème / je ne sais pas', packId: 'PK-P01-DIAG' },
]
