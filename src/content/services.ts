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
import familialSubscriptionImg from '../assets/service-support-familial-abonnement.jpg'
import cyberSubscriptionImg from '../assets/service-abonnement-cyber-pme.jpg'

export type ServiceProfile = 'particulier' | 'entreprise'

export type ServiceFaq = {
  question: string
  answer: string
}

export type ServiceLanding = {
  heroTitle: string
  heroSubtitle: string
  useCases: string[]
  processSteps: string[]
  faq: ServiceFaq[]
  pricingNote?: string
  relatedOffer?: {
    text: string
    buttonLabel: string
    profile: ServiceProfile
    serviceId: string
  }
  finalSecondaryCta?: {
    label: string
    subject: string
  }
}

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
  landing: ServiceLanding
}

const commonTags = ['100% digital, partout en France', 'Devis gratuit']
const digitalModalities = '100% digital, partout en France — Devis gratuit'

export const particulierServices: Service[] = [
  {
    id: 'support-digital-familial-abonnement',
    title: 'Support Digital Familial (Abonnement foyer)',
    offer:
      'Un abonnement mensuel pour tout le foyer : audit initial, assistance au quotidien, projets numériques et accompagnement personnalisé.',
    includes: [
      'Audit initial des appareils et des usages',
      'Sécurisation de base (comptes, sauvegardes, bonnes pratiques)',
      'Accompagnement projets (nouvel appareil, organisation, cloud, imprimantes...)',
      'Mini-formations adaptées (adultes/seniors/ados)',
      'Hotline IT dédiée',
    ],
    benefits: [
      'Un foyer plus autonome, plus serein et mieux sécurisé.',
      'Un interlocuteur unique pour tous les sujets numériques du quotidien.',
    ],
    modalities: digitalModalities,
    tags: ['Abonnement', 'Foyer', 'Sérénité', ...commonTags],
    defaultSubject: 'Demande de devis — Support Digital Familial (Abonnement foyer) — Particulier',
    image: familialSubscriptionImg,
    landing: {
      heroTitle: 'Votre foyer accompagné toute l’année.',
      heroSubtitle:
        'Un abonnement simple : audit initial, aide au quotidien, projets et assistance pour tous les appareils de la famille.',
      useCases: [
        'Plusieurs appareils à gérer dans le foyer',
        'Besoin d’aide régulière sans stress',
        'Accompagner un parent/senior à distance',
        'Sécuriser les comptes et les sauvegardes',
        'Être conseillé pour chaque nouvel achat numérique',
      ],
      processSteps: ['Diagnostic/Audit', 'Intervention', 'Conseils/compte-rendu'],
      pricingNote: 'Tarif sur devis selon la composition du foyer et le périmètre.',
      faq: [
        {
          question: 'Combien d’appareils sont inclus ?',
          answer:
            'Le périmètre est défini au devis selon la composition du foyer et vos besoins réels.',
        },
        {
          question: 'Peut-on inclure un senior à distance ?',
          answer:
            'Oui, l’abonnement est conçu pour inclure aussi les proches, avec un accompagnement pédagogique.',
        },
        {
          question: 'Quels sont les délais de réponse ?',
          answer:
            'Les délais sont définis selon la formule retenue. Ils sont précisés noir sur blanc dans le devis.',
        },
      ],
    },
  },
  {
    id: 'assistance-depannage',
    title: 'Assistance & Dépannage Informatique',
    offer:
      'Diagnostic précis et résolution rapide des pannes logicielles. Assistance en visio ou prise en main à distance (TeamViewer ou équivalent).',
    includes: [
      'Diagnostic de la panne logicielle',
      'Suppression virus/malwares et nettoyage système',
      'Corrections et rétablissement des fonctions critiques',
      'Sécurisation de base après intervention',
    ],
    benefits: [
      'Votre ordinateur refonctionne rapidement.',
      'Moins de stress, plus de clarté sur les causes et les bons réflexes.',
    ],
    modalities: digitalModalities,
    tags: commonTags,
    defaultSubject: 'Demande de devis — Assistance & Dépannage Informatique — Particulier',
    image: assistanceImg,
    landing: {
      heroTitle: 'Votre ordinateur refonctionne, sans stress.',
      heroSubtitle:
        'Diagnostic rapide, correction des pannes logicielles, accompagnement en visio ou prise en main à distance (TeamViewer ou équivalent).',
      useCases: [
        'PC lent/instable',
        'Erreur au démarrage',
        'Virus ou pub',
        'Wi-Fi qui décroche',
        'Besoin d’un avis pro avant de réinstaller',
      ],
      processSteps: ['Diagnostic', 'Correction', 'Conseils + sécurisation'],
      faq: [
        {
          question: 'Est-ce que vous intervenez sur Mac/Windows ?',
          answer: 'Oui, selon le problème rencontré et la version du système.',
        },
        {
          question: 'Dois-je installer un logiciel ?',
          answer:
            'Si une prise en main est nécessaire, nous vous guidons pour installer un outil type TeamViewer (ou équivalent).',
        },
        {
          question: 'Combien de temps dure une intervention ?',
          answer:
            'La durée dépend de la panne. Une estimation claire est donnée après le diagnostic initial.',
        },
      ],
    },
  },
  {
    id: 'coaching-montage-pc',
    title: 'Coaching Montage PC Sur-Mesure',
    offer:
      'Choix des composants, vérification de compatibilité, montage guidé en visio, configuration et premier démarrage.',
    includes: [
      'Sélection composants selon objectifs et budget',
      'Validation de compatibilité complète',
      'Montage assisté étape par étape',
      'Configuration BIOS, pilotes et tests initiaux',
    ],
    benefits: [
      'Un PC cohérent, stable et adapté à vos usages.',
      'Un meilleur rapport performance/prix avec un accompagnement expert.',
    ],
    modalities: digitalModalities,
    tags: commonTags,
    defaultSubject: 'Demande de devis — Coaching Montage PC Sur-Mesure — Particulier',
    image: coachingImg,
    landing: {
      heroTitle: 'Montez votre PC sur-mesure, accompagné de A à Z.',
      heroSubtitle:
        'Choix des composants, compatibilité, montage guidé en visio, configuration et premier démarrage.',
      useCases: ['Gaming', 'Création', 'Bureautique', 'Budget optimisé', 'Upgrade d’un PC existant'],
      processSteps: ['Sélection composants', 'Montage assisté', 'Configuration + tests'],
      faq: [
        {
          question: 'Pouvez-vous valider un panier ?',
          answer: 'Oui, nous validons la compatibilité et la cohérence globale avant achat.',
        },
        {
          question: 'Que faire si un composant ne marche pas ?',
          answer: 'Nous aidons à diagnostiquer la cause et à enclencher la bonne solution (SAV, échange, réglages).',
        },
        {
          question: 'Vous aidez pour BIOS/pilotes ?',
          answer: 'Oui, cela fait partie de la phase de configuration et de stabilisation.',
        },
      ],
    },
  },
  {
    id: 'support-connectes-mobiles',
    title: 'Support Appareils Connectés & Mobiles',
    offer:
      'Paramétrage, sécurité et dépannage smartphone, tablette, imprimante, TV, box et appareils connectés du quotidien.',
    includes: [
      'Configuration initiale et synchronisation des appareils',
      'Résolution des incidents de connexion',
      'Optimisation des comptes, sauvegardes et sécurité de base',
      'Accompagnement pratique pour l’usage quotidien',
    ],
    benefits: [
      'Tous vos appareils fonctionnent ensemble.',
      'Un usage plus fluide et moins de blocages au quotidien.',
    ],
    modalities: digitalModalities,
    tags: commonTags,
    defaultSubject: 'Demande de devis — Support Appareils Connectés & Mobiles — Particulier',
    image: supportImg,
    landing: {
      heroTitle: 'Tous vos appareils fonctionnent ensemble.',
      heroSubtitle:
        'Paramétrage, sécurité et dépannage smartphone, tablette, imprimante, TV, box…',
      useCases: ['Nouvel appareil', 'Imprimante introuvable', 'Sauvegardes', 'Comptes', 'Connexions'],
      processSteps: ['Diagnostic', 'Paramétrage', 'Optimisation + conseils'],
      faq: [
        {
          question: 'Vous aidez iPhone/Android ?',
          answer: 'Oui, l’accompagnement couvre les deux environnements.',
        },
        {
          question: 'Imprimantes et box internet inclus ?',
          answer: 'Oui, dès lors que c’est dans le périmètre défini ensemble au départ.',
        },
        {
          question: 'Peut-on sécuriser les comptes ?',
          answer: 'Oui, nous mettons en place les bonnes pratiques essentielles (mots de passe, sauvegarde, MFA).',
        },
      ],
    },
  },
  {
    id: 'formation-culture-numerique',
    title: 'Formation & Culture Numérique',
    offer:
      'Ateliers clairs et concrets sur l’IA utile, la cybersécurité et les outils numériques du quotidien.',
    includes: [
      'Évaluation du niveau et des objectifs',
      'Session guidée (individuelle ou petit groupe)',
      'Cas pratiques concrets',
      'Support récapitulatif après session',
    ],
    benefits: [
      'Comprendre la tech simplement et gagner en autonomie.',
      'Réduire les erreurs courantes et mieux sécuriser ses usages.',
    ],
    modalities: digitalModalities,
    tags: commonTags,
    defaultSubject: 'Demande de devis — Formation & Culture Numérique — Particulier',
    image: formationImg,
    landing: {
      heroTitle: 'Comprendre la tech, simplement.',
      heroSubtitle:
        'Ateliers clairs et concrets : IA, cybersécurité, bonnes pratiques, outils du quotidien.',
      useCases: [
        'Débutant',
        'Seniors',
        'Parent',
        'Besoin de sécurité',
        'Envie d’apprendre l’IA utile',
      ],
      processSteps: ['Évaluation du niveau', 'Session guidée', 'Support + récap'],
      faq: [
        {
          question: 'Cours individuel ou en petit groupe ?',
          answer: 'Les deux formats sont possibles selon votre besoin.',
        },
        {
          question: 'Peut-on enregistrer ?',
          answer: 'Oui, selon le format de session et votre accord préalable.',
        },
        {
          question: 'Support après la séance ?',
          answer: 'Oui, un récapitulatif est fourni pour faciliter la mise en pratique.',
        },
      ],
    },
  },
  {
    id: 'optimisation-budget-reseau',
    title: 'Optimisation Budget Internet & Réseau',
    offer:
      'Réduction de votre facture Internet et optimisation de votre installation : objectif moyen jusqu’à -30% selon votre situation.',
    includes: [
      'Analyse de votre contrat et de vos options',
      'Comparatif des meilleures alternatives selon votre adresse',
      'Accompagnement au changement d’offre si pertinent',
      'Optimisation des réglages box/Wi-Fi (si nécessaire)',
    ],
    benefits: [
      'Baisse de facture + service plus adapté à vos usages.',
      'Connexion plus stable (optimisation box/Wi-Fi si nécessaire).',
    ],
    modalities: digitalModalities,
    tags: commonTags,
    defaultSubject: 'Demande de devis — Optimisation Budget Internet & Réseau — Particulier',
    image: budgetImg,
    landing: {
      heroTitle: 'Payez moins cher votre Internet, sans perdre en qualité.',
      heroSubtitle:
        'Analyse de votre abonnement, alternatives adaptées, accompagnement : objectif moyen jusqu’à -30% selon éligibilité.',
      useCases: [
        'Facture trop élevée',
        'Offre plus adaptée',
        'Déménagement',
        'Box instable',
        'Besoin de meilleur débit',
      ],
      processSteps: [
        'Analyse contrat + éligibilité',
        'Comparatif & recommandation',
        'Accompagnement au changement + réglages',
      ],
      faq: [
        {
          question: 'Le -30% est garanti ?',
          answer:
            'Non. C’est un objectif moyen constaté selon éligibilité, zone et offres disponibles au moment de l’analyse.',
        },
        {
          question: 'Vous gérez le changement d’opérateur ?',
          answer:
            'Nous vous accompagnons pas à pas sur la décision et les démarches, selon le périmètre convenu.',
        },
        {
          question: 'Optimisation Wi-Fi incluse ?',
          answer: 'Oui, si nécessaire, après traitement du sujet principal de facture et d’offre.',
        },
      ],
    },
  },
  {
    id: 'conseil-energie-green-it',
    title: 'Conseil Énergie & Green IT (Maison)',
    offer:
      'Conseils conso, équipements plus sobres et mini-audit sobriété numérique pour réduire facture et impact.',
    includes: [
      'État des lieux conso numérique et usages',
      'Mini-audit sobriété numérique (appareils, usages, stockage)',
      'Recommandations pour réduire l’impact et la consommation',
      'Plan d’action simple et priorisé',
    ],
    benefits: [
      'Moins de dépenses énergétiques liées au numérique.',
      'Des choix concrets, adaptés à votre budget et votre logement.',
    ],
    modalities: digitalModalities,
    tags: ['Green IT', ...commonTags],
    defaultSubject: 'Demande de devis — Conseil Énergie & Green IT (Maison) — Particulier',
    image: energieImg,
    landing: {
      heroTitle: 'Réduisez vos dépenses et l’impact de votre numérique.',
      heroSubtitle:
        'Conseils conso, équipements plus sobres, mini-audit sobriété numérique et recommandations simples.',
      useCases: [
        'Baisser la facture',
        'Équipements énergivores',
        'Optimiser l’usage',
        'Solutions plug & play (selon cas)',
      ],
      processSteps: ['État des lieux', 'Recommandations', 'Plan d’action'],
      faq: [
        {
          question: 'Est-ce compatible avec une maison/appartement ?',
          answer: 'Oui, l’accompagnement s’adapte à votre type de logement et à vos équipements.',
        },
        {
          question: 'Vous recommandez du matériel ?',
          answer: 'Oui, uniquement si pertinent et avec des options adaptées à votre budget.',
        },
        {
          question: 'C’est adapté aux petits budgets ?',
          answer: 'Oui, la méthode privilégie d’abord les actions à faible coût et à impact rapide.',
        },
      ],
    },
  },
]

export const entrepriseServices: Service[] = [
  {
    id: 'abonnement-cybersecurite-pme',
    title: 'Abonnement Cybersécurité PME (Service continu)',
    offer:
      'Abonnement mensuel de cybersécurité adapté à votre taille : audit initial, plan de sécurisation, suivi régulier et assistance continue.',
    includes: [
      'Audit initial et plan de sécurisation',
      'Sensibilisation phishing (formation + simulations si possible)',
      'Mises à jour des protections et contrôles réguliers',
      'Recommandations d’amélioration continue',
      'Hotline 24/7 (H24) pour incidents critiques (SLA contractuel au devis)',
    ],
    benefits: [
      'Un niveau de sécurité piloté dans la durée.',
      'Une réponse structurée même sans équipe IT interne.',
    ],
    modalities: digitalModalities,
    tags: ['Abonnement', 'PME/TPE', 'Service continu', ...commonTags],
    defaultSubject: 'Demande de devis — Abonnement Cybersécurité PME (Service continu) — Entreprise',
    image: cyberSubscriptionImg,
    landing: {
      heroTitle: 'La cybersécurité en continu, sans équipe interne.',
      heroSubtitle:
        'Abonnement mensuel adapté à votre taille : audit initial, mise à niveau, sensibilisation, suivi et assistance.',
      useCases: [
        'Pas de service IT interne dédié',
        'Besoin de suivi sécurité régulier',
        'Exposition au phishing',
        'Accès distants à encadrer',
        'Volonté de professionnaliser rapidement la sécurité',
      ],
      processSteps: ['Diagnostic/Audit', 'Intervention', 'Conseils/compte-rendu'],
      pricingNote: 'Tarif sur devis selon taille de l’entreprise et périmètre.',
      finalSecondaryCta: {
        label: 'Évaluer mon niveau de risque',
        subject: 'Évaluation du niveau de risque — Abonnement Cybersécurité PME — Entreprise',
      },
      faq: [
        {
          question: 'Qu’est-ce qui est inclus / hors périmètre ?',
          answer:
            'Le périmètre exact est défini au devis (inclus, exclusions, niveau de service, fréquence de suivi).',
        },
        {
          question: 'Délais de mise en route ?',
          answer: 'Le démarrage est planifié après validation du devis, avec un calendrier clair.',
        },
        {
          question: 'Engagement ?',
          answer:
            'Les engagements (fréquence, canaux, priorisation, délais de prise en charge et périmètre) sont précisés dans le devis/SLA et les CGV/CGU.',
        },
      ],
    },
  },
  {
    id: 'creation-site-web',
    title: 'Création de sites Web Essentiels',
    offer:
      'Un site web clair, professionnel et orienté conversion pour lancer ou renforcer votre présence en ligne rapidement.',
    includes: [
      'Cadrage du besoin et structure des pages',
      'Design moderne et responsive',
      'Développement et intégration des fonctionnalités clés',
      'Optimisation SEO de base',
      'Mise en ligne et prise en main',
    ],
    benefits: [
      'Une vitrine crédible pour attirer de nouveaux prospects.',
      'Un site exploitable rapidement avec des bases solides.',
    ],
    modalities: digitalModalities,
    tags: ['Site web', 'Conversion', ...commonTags],
    defaultSubject: 'Demande de devis — Création de sites Web Essentiels — Entreprise',
    image: webImg,
    landing: {
      heroTitle: 'Votre site web professionnel, prêt à convertir.',
      heroSubtitle:
        'Conception, rédaction orientée clarté, intégration technique et mise en ligne pour une présence digitale utile dès le départ.',
      useCases: [
        'Lancement d’activité',
        'Site vitrine à moderniser',
        'Besoin de demandes de devis qualifiées',
        'Image de marque plus professionnelle',
        'Site administrable simplement',
      ],
      processSteps: ['Diagnostic/Audit', 'Intervention', 'Conseils/compte-rendu'],
      faq: [
        {
          question: 'Combien de pages pouvez-vous créer ?',
          answer: 'Le nombre de pages et modules est défini au devis selon vos objectifs.',
        },
        {
          question: 'Le site est-il modifiable ensuite ?',
          answer: 'Oui, la structure est prévue pour rester simple à faire évoluer.',
        },
        {
          question: 'Pouvez-vous accompagner le contenu ?',
          answer: 'Oui, avec un cadrage éditorial et une aide à la priorisation des messages.',
        },
      ],
    },
  },
  {
    id: 'transition-numerique-verte',
    title: 'Transition Numérique Verte (Green IT)',
    offer:
      'Audit de vos usages numériques, estimation des émissions carbone et plan d’actions pour réduire coûts et impact.',
    includes: [
      'Audit des émissions carbone numériques (poste, usages, stockage, outils)',
      'Plan d’actions sobriété numérique (quick wins + long terme)',
      'Optimisation des équipements et des pratiques',
      'Accompagnement RSE et suivi d’indicateurs',
    ],
    benefits: [
      'Moins de gaspillage numérique et une trajectoire RSE claire.',
      'Réduction des coûts opérationnels liés aux usages IT.',
    ],
    modalities: digitalModalities,
    tags: ['Green IT', 'RSE', ...commonTags],
    defaultSubject: 'Demande de devis — Transition Numérique Verte (Green IT) — Entreprise',
    image: greenItImg,
    landing: {
      heroTitle: 'Sobriété numérique : moins de coûts, plus d’impact.',
      heroSubtitle:
        'Audit, estimation des émissions carbone numériques, plan d’actions et accompagnement RSE.',
      useCases: [
        'TPE/PME',
        'Matériel vieillissant',
        'Outils dispersés',
        'Objectif RSE',
        'Réduire stockage et gaspillage numérique',
      ],
      processSteps: ['Audit + état des lieux', 'Plan sobriété (quick wins + structurel)', 'Suivi & mesure'],
      faq: [
        {
          question: 'Quel livrable ?',
          answer:
            'Un état des lieux, un plan d’actions priorisé et des recommandations opérationnelles adaptées à votre contexte.',
        },
        {
          question: 'Combien de temps ?',
          answer: 'Le délai dépend du périmètre, généralement précisé dès le devis.',
        },
        {
          question: 'Intervention sur site nécessaire ? (non)',
          answer: 'Non, l’offre est pilotée en digital, partout en France.',
        },
      ],
    },
  },
  {
    id: 'conseil-infrastructure-it',
    title: 'Conseil en Infrastructure IT',
    offer:
      'Architecture réseau/serveurs, choix cloud ou local, organisation et bonnes pratiques pour une base IT fiable.',
    includes: [
      'Analyse de l’existant et des besoins métiers',
      'Recommandations d’architecture réseau/systèmes',
      'Choix cloud, local ou hybride',
      'Plan de mise en œuvre et documentation',
    ],
    benefits: [
      'Une infrastructure robuste, évolutive et plus simple à exploiter.',
      'Moins d’imprévus techniques et une meilleure continuité d’activité.',
    ],
    modalities: digitalModalities,
    tags: ['Infrastructure', 'Architecture', ...commonTags],
    defaultSubject: 'Demande de devis — Conseil en Infrastructure IT — Entreprise',
    image: infraImg,
    landing: {
      heroTitle: 'Une infrastructure fiable, pensée pour durer.',
      heroSubtitle:
        'Architecture réseau/serveurs, choix cloud ou local, organisation et bonnes pratiques.',
      useCases: ['Croissance', 'Réorganisation', 'Télétravail', 'Sécurité', 'Réseau instable'],
      processSteps: ['Analyse besoins', 'Recommandations', 'Plan de mise en œuvre'],
      faq: [
        {
          question: 'Vous travaillez avec Google/Microsoft ?',
          answer: 'Oui, et plus largement avec les environnements adaptés à votre contexte.',
        },
        {
          question: 'Pouvez-vous documenter ?',
          answer: 'Oui, la documentation fait partie des livrables recommandés.',
        },
        {
          question: 'Possibilité d’accompagnement ?',
          answer: 'Oui, un accompagnement à la mise en œuvre peut être prévu au devis.',
        },
      ],
    },
  },
  {
    id: 'cybersecurite-essentielle',
    title: 'Cybersécurité Essentielle',
    offer:
      'Pour les PME/TPE peu équipées : sécurisation rapide et structurée des accès, postes, données et usages.',
    includes: [
      'Audit sécurité initial',
      'Mise en place MFA',
      'Gestion des droits & comptes (AD/équivalents)',
      'VPN et sécurisation des accès distants',
      'Segmentation réseau (VLAN si pertinent) et sécurisation routeur/box',
      'Sauvegardes et sensibilisation phishing',
    ],
    benefits: [
      'Réduction du risque cyber avec des mesures concrètes rapidement déployées.',
      'Sécurité compatible avec une petite structure, sans jargon inutile.',
    ],
    modalities: digitalModalities,
    tags: ['PME/TPE', 'Sécurité', ...commonTags],
    defaultSubject: 'Demande de devis — Cybersécurité Essentielle — Entreprise',
    image: cyberImg,
    landing: {
      heroTitle: 'Votre PME sécurisée en 1 mois.',
      heroSubtitle:
        'Pour les PME/TPE peu équipées : mise à niveau rapide, concrète et sans jargon.',
      useCases: [
        'Phishing',
        'Mots de passe',
        'Accès distants',
        'Postes mobiles',
        'Besoin de sécuriser vite',
      ],
      processSteps: ['Audit sécurité', 'Plan + mise en place', 'Validation + recommandations'],
      relatedOffer: {
        text: 'Besoin d’un suivi continu ? Découvrez l’Abonnement Cybersécurité PME Transistor&CIE.',
        buttonLabel: 'Découvrir l’abonnement',
        profile: 'entreprise',
        serviceId: 'abonnement-cybersecurite-pme',
      },
      faq: [
        {
          question: 'Est-ce compatible avec une petite équipe ?',
          answer: 'Oui, l’offre est pensée pour TPE/PME avec des mesures pragmatiques et prioritaires.',
        },
        {
          question: 'Sans service informatique interne ?',
          answer: 'Oui, l’accompagnement est justement conçu pour ce cas.',
        },
        {
          question: 'Délais ?',
          answer: 'Un planning de déploiement est proposé dès validation du devis.',
        },
      ],
    },
  },
]

export const servicesByProfile: Record<ServiceProfile, Service[]> = {
  particulier: particulierServices,
  entreprise: entrepriseServices,
}

export const getServiceByProfileAndId = (profile: ServiceProfile, serviceId: string) =>
  servicesByProfile[profile].find((service) => service.id === serviceId)

type QuoteLinkOptions = {
  subject?: string
  message?: string
  includeQuizSummary?: boolean
}

export const buildServiceQuoteLink = (
  profile: ServiceProfile,
  serviceId: string,
  options?: string | QuoteLinkOptions,
) => {
  const normalizedOptions: QuoteLinkOptions =
    typeof options === 'string' ? { subject: options } : options ?? {}

  const params = new URLSearchParams({ profile, serviceId })
  if (normalizedOptions.subject) {
    params.set('subject', normalizedOptions.subject)
  }
  if (normalizedOptions.message) {
    params.set('message', normalizedOptions.message)
  }
  if (normalizedOptions.includeQuizSummary) {
    params.set('includeQuizSummary', '1')
  }
  return `/contact?${params.toString()}`
}
