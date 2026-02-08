import assistanceImg from '../assets/service-assistance.webp'
import coachingImg from '../assets/service-coaching-pc.webp'
import supportImg from '../assets/service-support-connectes.webp'
import formationImg from '../assets/service-formation.webp'
import budgetImg from '../assets/service-budget-reseau.webp'
import energieImg from '../assets/service-energie-green.webp'
import greenItImg from '../assets/service-greenit.webp'
import infraImg from '../assets/service-infra.webp'
import cyberImg from '../assets/service-cyber.webp'
import webImg from '../assets/service-web-essentiels.jpg'

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
    title: 'Création de sites Web Essentiels',
    offer:
      'Accompagnement complet pour les jeunes entreprises. Conception et mise en place d’un site web percutant, fonctionnel et fiable, taillé pour lancer et faire tourner votre activité.',
    includes: [
      'Design moderne et responsive',
      'Développement sur mesure',
      'Intégration de fonctionnalités clés (e-commerce, blog, contact)',
      'Optimisation SEO de base',
      'Formation à la gestion de contenu',
    ],
    benefits: [
      'Une présence en ligne professionnelle immédiate.',
      'Attraction de nouveaux clients.',
      'Crédibilité renforcée.',
      'Un outil de travail fiable pour accélérer votre croissance.',
    ],
    modalities: 'Étude et devis 100% à distance — Devis Gratuit.',
    tags: ['Web Essentiels', 'Site web', ...commonTags],
    defaultSubject: 'Demande de devis — Création de sites Web Essentiels — Entreprise',
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
