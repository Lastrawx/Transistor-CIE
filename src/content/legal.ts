import { site } from './site'

const LAST_UPDATED = '12 février 2026'

export type LegalSection = {
  title: string
  content: string[]
}

export type TermsGroup = {
  title: string
  items: string[]
}

export type TermsSection = {
  id?: string
  title: string
  paragraphs: string[]
  items?: string[]
  groups?: TermsGroup[]
  postParagraphs?: string[]
}

export type PrivacySection = {
  title: string
  paragraphs: string[]
  items?: string[]
  postParagraphs?: string[]
}

export const mentionsLegales: LegalSection[] = [
  {
    title: 'Éditeur du site',
    content: [
      'Transistor&CIE - Entrepreneur individuel (EI) au régime micro-entreprise',
      'Nom et prénom : Quentin Xavier Jérôme CAGNAT',
      'Adresse professionnelle : 3 boulevard Tourasse, 64000 Pau - France (domiciliation de l’entreprise)',
      'SIREN : 100 810 647',
      'SIRET : 100 810 647 00014',
      'Ville d’immatriculation : Pau',
      'Registre : Inscrit au RNE (Registre National des Entreprises)',
      'Code APE : 6202A - Conseil en systèmes et logiciels informatiques',
      'TVA : non applicable, article 293 B du CGI',
      `Téléphone : ${site.phoneDisplay} (appel direct et WhatsApp)`,
      `Email : ${site.contactEmail}`,
      `Site web : ${site.websiteUrl}`,
    ],
  },
  {
    title: 'Directeur de la publication',
    content: ['Quentin Xavier Jérôme CAGNAT'],
  },
  {
    title: 'Activité',
    content: ['Conseil et assistance informatique, cybersécurité, Green IT et accompagnement numérique en digital, partout en France.'],
  },
  {
    title: 'Hébergement',
    content: [
      'Netlify, Inc.',
      '2325 3rd Street, Suite 296, San Francisco, California 94107, USA',
      'Contact support : support@netlify.com',
      'Site web : https://www.netlify.com',
    ],
  },
  {
    title: 'Propriété intellectuelle',
    content: [
      'Les contenus (textes, visuels, logos, chartes, supports) sont la propriété de Transistor&CIE, sauf mention contraire.',
      'Toute reproduction, extraction ou réutilisation sans autorisation écrite est interdite.',
    ],
  },
  {
    title: 'Mise à jour',
    content: [`Dernière mise à jour des mentions légales : ${LAST_UPDATED}`],
  },
]

export const confidentialite: PrivacySection[] = [
  {
    title: '1. Responsable du traitement',
    paragraphs: [
      'Le responsable du traitement des données personnelles collectées sur le site Transistor&CIE est :',
      'Transistor&CIE - Entrepreneur individuel (micro-entreprise).',
      'Adresse postale : 3 boulevard Tourasse, 64000 Pau - France.',
      `Email de contact : ${site.contactEmail}`,
      `Téléphone de contact : ${site.phoneDisplay}`,
      'Délégué à la protection des données (DPO) : non désigné (désignation non obligatoire au regard de la nature et de l’échelle des traitements réalisés).',
    ],
  },
  {
    title: '2. Catégories de données traitées',
    paragraphs: [
      'Dans le cadre des demandes de devis et de la relation client, les catégories de données suivantes peuvent être traitées :',
    ],
    items: [
      'Profil (particulier / entreprise), service, objet de la demande.',
      'Identité et coordonnées : nom, prénom, adresse email, téléphone.',
      'Contenu des échanges : message libre et informations utiles à l’intervention.',
      'Données de préqualification cyber (si questionnaire utilisé) : réponses, score, niveau de risque et synthèse transmise dans la demande de devis.',
      'Données techniques anti-abus et sécurité (horodatage, contrôles de sécurité, journaux techniques).',
      'Consentements : consentement de contact, préférences cookies, preuve de choix (date, statut, version des textes légaux applicables).',
      'Le cas échéant, justificatif d’identité strictement nécessaire en cas de contestation ou suspicion de fraude.',
    ],
  },
  {
    title: '3. Finalités et bases légales',
    paragraphs: [
      'Les traitements sont réalisés pour des finalités déterminées, explicites et légitimes.',
    ],
    items: [
      'Gestion des demandes de devis et échanges précontractuels : exécution de mesures précontractuelles.',
      'Préqualification des demandes cybersécurité via questionnaire optionnel : exécution de mesures précontractuelles et intérêt légitime d’orientation de la réponse.',
      'Exécution des prestations, gestion administrative, support client : exécution du contrat.',
      'Facturation, obligations comptables et fiscales : obligation légale.',
      'Prévention de la fraude, sécurité du site et défense des droits : intérêt légitime.',
      'Amélioration du service et traçabilité opérationnelle interne : intérêt légitime.',
      'Mesure d’audience et conversion Google Ads : consentement (aucun chargement publicitaire avant consentement).',
    ],
    postParagraphs: [
      'Les données ne sont ni vendues, ni cédées à des tiers à des fins commerciales.',
    ],
  },
  {
    title: '4. Destinataires, sous-traitants et transferts hors UE',
    paragraphs: [
      'Les données sont accessibles uniquement aux personnes habilitées de Transistor&CIE.',
      'Des sous-traitants techniques peuvent intervenir strictement pour l’hébergement, la sécurité et l’exploitation du service.',
    ],
    items: [
      'Hébergement et infrastructure web : Netlify.',
      'Base de données et sécurité applicative : Firebase / Google Cloud (Firestore, App Check).',
      'Mesure de conversion publicitaire : Google Ads (uniquement après consentement).',
    ],
    postParagraphs: [
      'Certains sous-traitants pouvant opérer hors de l’Espace économique européen (notamment aux États-Unis), des transferts hors UE peuvent exister selon les services activés.',
      'Dans ce cas, Transistor&CIE s’appuie sur les mécanismes juridiques prévus au chapitre V du RGPD (décision d’adéquation, clauses contractuelles types, ou garanties équivalentes selon le service activé).',
    ],
  },
  {
    title: '5. Durées de conservation',
    paragraphs: ['Les données sont conservées pendant des durées proportionnées à la finalité de traitement :'],
    items: [
      'Demandes de devis sans suite commerciale : 3 ans maximum à compter du dernier contact.',
      'Dossiers clients et pièces contractuelles/comptables : durée contractuelle puis archivage légal (jusqu’à 10 ans pour les pièces comptables).',
      'Journaux techniques de sécurité : jusqu’à 12 mois.',
      'Journaux de preuve de consentement cookies (date, statut, version légale) : 13 mois maximum.',
      'Choix de consentement cookies : jusqu’à 6 mois avant nouvelle sollicitation.',
      'Justificatif d’identité en prévention de fraude : durée strictement nécessaire au traitement du dossier, puis suppression.',
    ],
  },
  {
    title: '6. Cookies, stockage local et mesure',
    paragraphs: [
      'Le site utilise des mécanismes strictement nécessaires au fonctionnement (sécurité, préférences d’interface, continuité de service).',
      'Le stockage local du navigateur (localStorage/sessionStorage) peut être utilisé pour mémoriser des préférences (profil choisi, état de certains bandeaux, suivi du parcours de formulaire).',
      'Les traceurs Google Ads de mesure d’audience/conversion sont désactivés par défaut et ne sont activés qu’après consentement explicite via le bandeau cookies.',
      'En cas de choix explicite sur le bandeau cookies, un journal technique minimal de preuve peut être conservé (statut, horodatage, version des textes légaux), sans donnée de contenu client.',
      'Le consentement peut être retiré à tout moment via l’option "Gérer mes cookies" en bas de page.',
    ],
  },
  {
    title: '7. Droits des personnes',
    paragraphs: [
      'Conformément au RGPD, vous disposez des droits suivants sur vos données :',
    ],
    items: [
      'Droit d’accès.',
      'Droit de rectification.',
      'Droit à l’effacement.',
      'Droit à la limitation du traitement.',
      'Droit d’opposition.',
      'Droit à la portabilité (lorsqu’il est applicable).',
      'Droit de retirer votre consentement à tout moment (sans effet rétroactif sur les traitements déjà réalisés).',
    ],
  },
  {
    title: '8. Exercice des droits',
    paragraphs: [
      `Toute demande peut être adressée à ${site.contactEmail}, ou par courrier postal à l’adresse du siège mentionnée dans les Mentions légales.`,
      'Une réponse est apportée dans un délai d’un mois à compter de la réception de la demande (prolongeable de deux mois en cas de complexité).',
      'En cas de difficulté non résolue, vous pouvez introduire une réclamation auprès de la CNIL : https://www.cnil.fr/fr/plaintes.',
    ],
  },
  {
    title: '9. Caractère obligatoire des informations et absence de décision automatisée',
    paragraphs: [
      'Les champs marqués comme obligatoires dans les formulaires sont nécessaires pour traiter votre demande. Si ces informations ne sont pas fournies, la demande ne peut pas être instruite correctement.',
      'Aucune décision automatisée produisant des effets juridiques ou significatifs n’est prise exclusivement sur la base des données collectées via le site.',
    ],
  },
  {
    title: '10. Sécurité des données',
    paragraphs: [
      'Transistor&CIE met en œuvre des mesures techniques et organisationnelles raisonnables (contrôles d’accès, validation des entrées, journalisation, mécanismes anti-abus) pour limiter les risques de perte, d’altération et d’accès non autorisé.',
    ],
  },
  {
    title: '11. Mise à jour de la politique',
    paragraphs: [
      `La présente politique peut évoluer en fonction des exigences légales, techniques ou organisationnelles. Dernière mise à jour : ${LAST_UPDATED}.`,
    ],
  },
  {
    title: '12. Droit applicable',
    paragraphs: [
      'La présente politique de confidentialité est soumise au droit français.',
    ],
  },
]

export const cgvCguSections: TermsSection[] = [
  {
    title: '1. Présentation de l’entreprise',
    paragraphs: [
      'Le présent site est édité par Transistor&CIE, entrepreneur individuel (micro-entreprise), exploitée par Quentin Xavier Jérôme CAGNAT, immatriculé au Registre National des Entreprises (RNE).',
      'Les coordonnées complètes figurent sur la page Mentions légales.',
    ],
  },
  {
    title: '2. Champ d’application',
    paragraphs: [
      'Les présentes conditions s’appliquent à l’ensemble des prestations proposées par Transistor&CIE, à destination des particuliers et des professionnels.',
      'Toute commande ou utilisation des services implique l’acceptation pleine et entière des présentes CGV/CGU.',
    ],
  },
  {
    title: '3. Services proposés',
    paragraphs: [],
    groups: [
      {
        title: 'Services à destination des particuliers :',
        items: [
          'Support Digital Familial (abonnement foyer)',
          'Assistance & dépannage informatique à distance',
          'Coaching montage PC sur-mesure',
          'Support appareils connectés et mobiles',
          'Formation et culture numérique',
          'Optimisation budget Internet & réseau',
          'Conseil Énergie & Green IT (maison)',
        ],
      },
      {
        title: 'Services à destination des entreprises :',
        items: [
          'Abonnement Cybersécurité PME (service continu)',
          'Création de sites Web Essentiels',
          'Transition Numérique Verte (Green IT)',
          'Conseil en Infrastructure IT',
          'Cybersécurité Essentielle',
        ],
      },
    ],
    postParagraphs: [
      'La liste des services est indicative et peut évoluer.',
    ],
  },
  {
    title: '4. Modalités d’intervention',
    paragraphs: [
      'Les prestations sont réalisées 100% digital, partout en France, par visioconférence, téléphone, prise en main à distance ou outils numériques adaptés.',
      'Avant toute intervention, un devis gratuit et personnalisé est remis au client.',
      'Aucune prestation n’est exécutée sans validation préalable du devis.',
      'Transistor&CIE peut décider d’interrompre ou d’arrêter une intervention à tout moment, sans obligation de motivation.',
      'En cas d’arrêt d’intervention à l’initiative de Transistor&CIE, les sommes versées par le client pour l’intervention concernée sont remboursées intégralement (y compris acompte), sans frais.',
      'Le remboursement est effectué dans un délai maximal de 14 jours calendaires à compter de la notification d’arrêt.',
    ],
  },
  {
    title: '5. Devis, formation du contrat et tarifs',
    paragraphs: [
      'Les tarifs et le périmètre d’intervention sont communiqués sur devis.',
      'Le devis accepté (signature, validation écrite ou tout autre accord explicite) vaut formation du contrat.',
      'Pour les clients consommateurs, la confirmation du contrat est transmise sur support durable (email ou PDF), avec les informations précontractuelles utiles.',
      'Le devis fait foi pour le prix, le périmètre, les livrables et les modalités d’exécution.',
      'TVA non applicable, article 293 B du CGI.',
    ],
  },
  {
    title: '6. Conditions de règlement et retards de paiement (clients professionnels)',
    paragraphs: [
      'Les modalités de règlement (acompte, échéance, paiement unique ou périodique) sont précisées au devis et/ou à la facture.',
      'Pour tout devis dont le montant TTC est strictement inférieur à 150 euros, aucun acompte n’est appliqué : la totalité du montant reste à payer selon l’échéance indiquée au devis/facture.',
      'Pour les clients professionnels, tout retard de paiement entraîne, de plein droit et sans rappel, des pénalités de retard exigibles dès le lendemain de la date d’échéance.',
    ],
    items: [
      'Taux des pénalités : taux de refinancement de la BCE majoré de 10 points (sans être inférieur à 3 fois le taux d’intérêt légal).',
      'Indemnité forfaitaire pour frais de recouvrement : 40 euros par facture impayée.',
      'Si les frais de recouvrement réellement engagés sont supérieurs, une indemnisation complémentaire peut être demandée sur justificatifs.',
      'Aucun escompte pour paiement anticipé, sauf mention contraire au devis.',
    ],
  },
  {
    title: '7. Offres d’abonnement et hotline',
    paragraphs: [
      'Pour les offres d’abonnement, les modalités de facturation, d’engagement, de fréquence de suivi et de niveau de service (SLA) sont définies au devis.',
      'La mention "Hotline 24/7 (H24)" signifie un canal de signalement disponible en continu pour incidents critiques.',
      'Les délais de prise en charge, canaux utilisables, priorisation, exclusions et engagements de résolution sont détaillés contractuellement au devis/SLA.',
      'Transistor&CIE peut mettre fin à un abonnement en cours avec un préavis de 14 jours calendaires, notifié au client par écrit (email ou tout autre support durable).',
      'En cas de résiliation à l’initiative de Transistor&CIE, la période mensuelle payée d’avance et non exécutée est remboursée au prorata temporis des jours calendaires non couverts.',
      'Le remboursement prorata est versé dans un délai maximal de 14 jours calendaires suivant la date d’effet de la résiliation.',
    ],
  },
  {
    title: '8. Droit de rétractation (clients consommateurs)',
    paragraphs: [
      'Conformément au droit de la consommation, le client consommateur dispose d’un délai de rétractation de 14 jours à compter de la conclusion du contrat à distance.',
      'Pour exercer ce droit, le client adresse une déclaration dénuée d’ambiguïté (email ou courrier) ou utilise le formulaire type ci-dessous.',
      'Si le client demande expressément l’exécution avant la fin du délai de rétractation, il reste redevable du montant correspondant au service déjà exécuté jusqu’à la date de notification de rétractation.',
      'Lorsque le client souhaite un démarrage avant la fin du délai de rétractation, sa demande expresse ainsi que la reconnaissance de la perte du droit de rétractation après exécution complète sont recueillies sur support durable.',
      'Le droit de rétractation ne peut plus être exercé lorsque la prestation de service a été pleinement exécutée avant la fin du délai de 14 jours, après demande expresse du client et reconnaissance de la perte de son droit de rétractation.',
    ],
    items: [
      'Formulaire type : "À l’attention de Transistor&CIE - 3 boulevard Tourasse, 64000 Pau - France - contact@transistor-cie.fr".',
      'Je vous notifie par la présente ma rétractation du contrat portant sur la prestation suivante : [à compléter].',
      'Commandé le : [date] / Nom du client : [nom] / Adresse : [adresse] / Date et signature (si envoi papier).',
    ],
  },
  {
    id: 'garantie-satisfaction',
    title: '9. Garantie satisfaction (conditions)',
    paragraphs: [
      'Transistor&CIE propose une garantie satisfaction sur certaines prestations à distance, conformément au périmètre défini au devis.',
      'La garantie s’apprécie au regard de critères objectifs mentionnés au devis (résultat attendu, livrables, actions prévues).',
      'En cas de non-atteinte du résultat défini au devis, le client informe Transistor&CIE dans un délai de 48 heures suivant la fin de l’intervention.',
      'Selon la situation et dans la limite du devis, Transistor&CIE peut proposer une reprise, un ajustement ou l’application de la garantie contractuelle prévue.',
      'La garantie ne s’applique pas si la difficulté est externe au périmètre, si les prérequis n’ont pas été respectés, ou en cas d’intervention tierce altérant le résultat.',
    ],
  },
  {
    title: '10. Obligations du client',
    paragraphs: ['Le client s’engage à :'],
    items: [
      'fournir des informations exactes et complètes,',
      'disposer des droits nécessaires sur les équipements et logiciels concernés,',
      'sauvegarder ses données avant intervention.',
    ],
    postParagraphs: [
      'Transistor&CIE ne peut être tenu responsable de pertes de données préexistantes ou liées à un défaut de sauvegarde du client.',
    ],
  },
  {
    title: '11. Responsabilité',
    paragraphs: [
      'Transistor&CIE est tenue à une obligation de moyens et non de résultat, sauf engagement contractuel spécifique plus favorable.',
      'La responsabilité de Transistor&CIE ne peut être engagée en cas de :',
    ],
    items: [
      'mauvaise utilisation des recommandations remises,',
      'défaillance matérielle ou logicielle indépendante de la prestation,',
      'interruption de services tiers (hébergeur, éditeur, opérateur, fournisseur d’accès).',
    ],
  },
  {
    title: '12. Données personnelles',
    paragraphs: [
      'Les données collectées dans le cadre des demandes de devis et prestations sont traitées uniquement pour la relation commerciale, l’exécution des services et le respect des obligations légales.',
      'Les modalités de traitement, bases légales, durées de conservation, droits des personnes et gestion des cookies sont détaillées dans la Politique de confidentialité.',
    ],
  },
  {
    title: '13. Conditions générales d’utilisation du site (CGU)',
    paragraphs: [
      'L’utilisateur s’engage à utiliser le site de manière loyale et conforme aux lois en vigueur.',
      'Sont notamment interdits : les tentatives d’intrusion, l’extraction massive de données, l’usurpation d’identité, la diffusion de contenus illicites et l’usage détourné du formulaire de contact.',
      'Le site peut être modifié, suspendu ou mis à jour sans préavis pour maintenance, sécurité ou évolution des services.',
      'Transistor&CIE ne garantit pas une disponibilité continue sans interruption, notamment en cas de maintenance ou de panne de services tiers.',
    ],
  },
  {
    title: '14. Droit applicable et litiges',
    paragraphs: [
      'Les présentes CGV/CGU sont soumises au droit français.',
      'Pour les clients consommateurs, le recours amiable (réclamation préalable) est privilégié avant toute action contentieuse.',
      'À défaut d’accord amiable, les juridictions françaises territorialement compétentes seront saisies selon la qualité des parties (consommateur ou professionnel).',
    ],
  },
]
