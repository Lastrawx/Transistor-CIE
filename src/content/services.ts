import assistanceImg from '../assets/service-assistance.webp'
import coachingImg from '../assets/service-coaching-pc.webp'
import supportImg from '../assets/service-support-connectes.webp'
import formationImg from '../assets/service-formation.webp'
import budgetImg from '../assets/service-budget-reseau.webp'
import energieImg from '../assets/service-energie-green.webp'
import greenItImg from '../assets/service-greenit.webp'
import infraImg from '../assets/service-infra.webp'
import cyberImg from '../assets/service-cyber.webp'
import webImg from '../assets/service-web.png'

export type Service = {
  id: string
  title: string
  offer: string
  includes: string[]
  benefits: string[]
  modalities: string
  tags?: string[]
  defaultSubject: string
  image?: string
}

const commonTags = ['100% à distance', 'Devis gratuit']

export const particulierServices: Service[] = [
  {
    id: 'assistance-depannage',
    title: 'Assistance & Dépannage Informatique',
    offer:
      'Diagnostic précis + résolution rapide pannes logicielles. Prise en main à distance ou guidage visio.',
    includes: [
      'Nettoyage virus/malwares',
      'Réinstallation système (Windows/MacOS)',
      'Résolution bugs',
      'Rétablissement connexion',
    ],
    benefits: ['Ordinateur performant et sécurisé sans déplacement.'],
    modalities: '100% à distance — Devis Gratuit.',
    tags: commonTags,
    defaultSubject: 'Demande de devis — Assistance & Dépannage Informatique — Particulier',
    image: assistanceImg,
  },
  {
    id: 'coaching-montage-pc',
    title: 'Coaching Montage PC Sur-Mesure',
    offer:
      'Conseil composants selon budget/besoins (Gaming/Bureautique/Création), assistance visio pendant montage + configuration.',
    includes: [
      'Liste composants personnalisée',
      'Assistance montage étape par étape',
      'Pilotes + premier démarrage',
    ],
    benefits: ['Fierté + compatibilité assurée + meilleur rapport qualité/prix.'],
    modalities: '100% à distance — Devis Gratuit.',
    tags: commonTags,
    defaultSubject: 'Demande de devis — Coaching Montage PC Sur-Mesure — Particulier',
    image: coachingImg,
  },
  {
    id: 'support-connectes-mobiles',
    title: 'Support Appareils Connectés & Mobiles',
    offer:
      'Aide paramétrage/sécurisation/dépannage smartphones, tablettes, imprimantes, TV connectées.',
    includes: [
      'Configuration initiale',
      'Suppression apps indésirables',
      'Connexion périphériques (imprimantes/box)',
      'Résolution bugs courants',
    ],
    benefits: ['Tout fonctionne ensemble, usage sans stress.'],
    modalities: '100% à distance — Devis Gratuit.',
    tags: commonTags,
    defaultSubject: 'Demande de devis — Support Appareils Connectés & Mobiles — Particulier',
    image: supportImg,
  },
  {
    id: 'formation-culture-numerique',
    title: 'Formation & Culture Numérique',
    offer:
      'Sessions pédagogiques (webinaires / ateliers individuels) : IA, cybersécurité, etc.',
    includes: [
      'Explications claires',
      'Démonstrations',
      'Q/R',
      'Tutoriels vidéos personnalisés',
    ],
    benefits: ['Comprendre au lieu de subir, éviter les pièges, rester à la page.'],
    modalities: '100% en ligne — Devis Gratuit.',
    tags: commonTags,
    defaultSubject: 'Demande de devis — Formation & Culture Numérique — Particulier',
    image: formationImg,
  },
  {
    id: 'optimisation-budget-reseau',
    title: 'Optimisation Budget & Réseau',
    offer: 'Audit dépenses + installation : factures télécoms + optimisation couverture Wi-Fi.',
    includes: [
      'Comparatif offres internet/mobile',
      'Réglages box',
      'Conseils placement équipements',
    ],
    benefits: ['Économies + connexion plus fluide.'],
    modalities: '100% à distance — Devis Gratuit.',
    tags: commonTags,
    defaultSubject: 'Demande de devis — Optimisation Budget & Réseau — Particulier',
    image: budgetImg,
  },
  {
    id: 'conseil-energie-green-it',
    title: 'Conseil Énergie & Green IT (Maison)',
    offer:
      'Réduire empreinte écologique numérique/domestique, recommandations équipements économes, solutions énergie (kits solaires plug & play).',
    includes: [
      'Sélection appareils basse conso',
      'Conseils petits panneaux solaires',
      'Bonnes pratiques',
    ],
    benefits: ['Geste planète + baisse facture électricité.'],
    modalities: '100% à distance — Devis Gratuit.',
    tags: commonTags,
    defaultSubject: 'Demande de devis — Conseil Énergie & Green IT (Maison) — Particulier',
    image: energieImg,
  },
]

export const entrepriseServices: Service[] = [
  {
    id: 'creation-site-web',
    title: 'Création de site web',
    offer:
      'Site vitrine moderne, rapide et orienté conversion. Conception d’un site professionnel (vitrine) adapté mobile & desktop, avec vos services, une page contact et un référencement de base pour être trouvable sur Google.',
    includes: [
      'Maquette simple & structure claire (Accueil / Services / À propos / Contact)',
      'Design responsive + optimisation performance',
      'Formulaire de contact fonctionnel + protection anti-spam',
      'SEO de base : titres, métadonnées, mots-clés, indexation',
    ],
    benefits: ['Un site crédible qui rassure et génère des demandes de devis.'],
    modalities: '100% à distance — Devis Gratuit.',
    tags: ['Site web', ...commonTags],
    defaultSubject: 'Demande de devis — Création de site web — Entreprise',
    image: webImg,
  },
  {
    id: 'transition-numerique-verte',
    title: 'Transition Numérique Verte (Green IT)',
    offer: 'Stratégie sobriété numérique + télétravail éco-responsable.',
    includes: [
      'Audit équipements',
      'Stratégie sobriété',
      'Outils collaboratifs éco-responsables',
      'Allongement durée de vie matériel',
    ],
    benefits: ['Baisse coûts + image RSE + transition écologique.'],
    modalities: '100% à distance — Devis Gratuit.',
    tags: ['RSE', ...commonTags],
    defaultSubject: 'Demande de devis — Transition Numérique Verte (Green IT) — Entreprise',
    image: greenItImg,
  },
  {
    id: 'conseil-infrastructure-it',
    title: 'Conseil en Infrastructure IT',
    offer: 'Conception/organisation logique SI, architecture réseau, choix serveurs (cloud/local).',
    includes: [
      'Définition besoins (setup)',
      'Choix solutions serveurs',
      'Organisation systèmes réseaux',
    ],
    benefits: ['Infrastructure robuste et évolutive.'],
    modalities: '100% à distance — Devis Gratuit.',
    tags: ['Architecture', ...commonTags],
    defaultSubject: 'Demande de devis — Conseil en Infrastructure IT — Entreprise',
    image: infraImg,
  },
  {
    id: 'cybersecurite-essentielle',
    title: 'Cybersécurité Essentielle',
    offer: 'Fondamentaux sécurité pour protéger l’activité (données, clients).',
    includes: [
      'Politiques mots de passe',
      'Sécurisation accès distants',
      'Antivirus',
      'Sensibilisation phishing',
    ],
    benefits: ['Sérénité + continuité d’activité.'],
    modalities: '100% à distance — Devis Gratuit.',
    tags: ['Sécurité', ...commonTags],
    defaultSubject: 'Demande de devis — Cybersécurité Essentielle — Entreprise',
    image: cyberImg,
  },
]
