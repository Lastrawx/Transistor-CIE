export type LegalSection = {
  title: string
  content: string[]
}

export type TermsGroup = {
  title: string
  items: string[]
}

export type TermsSection = {
  title: string
  paragraphs: string[]
  items?: string[]
  groups?: TermsGroup[]
}

export const mentionsLegales: LegalSection[] = [
  {
    title: 'Éditeur du site',
    content: [
      'Transistor&CIE – Entrepreneur individuel (micro-entreprise)',
      'Nom et prénom : Quentin Xavier Jérôme CAGNAT',
      'Adresse : 3 boulevard Tourasse, 64000 Pau – France (domiciliation de l’entreprise)',
      'SIREN : 100 810 647',
      'SIRET : 100 810 647 00014',
      'Ville d’immatriculation : Pau',
      'Registre : Inscrit au RNE (Registre National des Entreprises)',
      'Code APE : 6202A – Conseil en systèmes et logiciels informatiques',
      'TVA : non applicable, article 293B du CGI',
    ],
  },
  {
    title: 'Directeur de la publication',
    content: ['Quentin Xavier Jérôme CAGNAT'],
  },
  {
    title: 'Activité',
    content: [
      'Activité principale : Conseil et assistance informatique à distance.',
    ],
  },
  {
    title: 'Hébergement',
    content: [
      'Netlify, Inc.',
      '2325 3rd Street, Suite 296, San Francisco, California 94107, USA',
      'Site web : https://www.netlify.com',
    ],
  },
  {
    title: 'Propriété intellectuelle',
    content: [
      'Les contenus (textes, visuels, logos) sont la propriété de Transistor&CIE, sauf mention contraire.',
      'Toute reproduction sans autorisation est interdite.',
    ],
  },
]

export const confidentialite: LegalSection[] = [
  {
    title: 'Données collectées',
    content: [
      'Formulaire de contact : profil, service, objet, nom, prénom, email, téléphone (optionnel) et message.',
    ],
  },
  {
    title: 'Finalité',
    content: [
      'Répondre aux demandes de devis et de contact, assurer le suivi des échanges.',
    ],
  },
  {
    title: 'Base légale',
    content: [
      'Consentement via le formulaire et intérêt légitime à répondre aux sollicitations.',
    ],
  },
  {
    title: 'Durée de conservation',
    content: [
      'Les données sont conservées pendant la durée nécessaire au traitement de la demande, puis archivées selon les obligations légales.',
    ],
  },
  {
    title: 'Droits',
    content: [
      'Vous pouvez demander l’accès, la rectification ou la suppression de vos données.',
      'Contact : effectuer cette demande via le formulaire de contact du site.',
    ],
  },
  {
    title: 'Cookies',
    content: [
      'Ce site ne dépose pas de cookies publicitaires. Des cookies techniques peuvent être utilisés par la plateforme d’hébergement.',
    ],
  },
]

export const cgvCguSections: TermsSection[] = [
  {
    title: "1. Présentation de l'entreprise",
    paragraphs: [
      "Le présent site est édité par Transistor&CIE, entrepreneur individuel (micro-entreprise), exploitée par Quentin Xavier Jérôme CAGNAT, immatriculé au Registre National des Entreprises (RNE), exerçant une activité de conseil, assistance et services informatiques à distance.",
      "Les coordonnées complètes de l'éditeur figurent dans la page Mentions légales du site.",
    ],
  },
  {
    title: "2. Champ d'application",
    paragraphs: [
      "Les présentes Conditions Générales de Vente et d'Utilisation (CGV/CGU) s'appliquent à l'ensemble des prestations proposées par Transistor&CIE, à destination :",
      'Toute commande ou utilisation des services implique l’acceptation pleine et entière des présentes CGV/CGU.',
    ],
    items: [
      'des particuliers,',
      'des professionnels et entreprises.',
    ],
  },
  {
    title: '3. Services proposés',
    paragraphs: [
      'La liste des services est donnée à titre indicatif et peut évoluer.',
    ],
    groups: [
      {
        title: 'Services à destination des particuliers',
        items: [
          'Assistance & dépannage informatique à distance',
          'Coaching montage PC sur-mesure',
          'Support pour appareils connectés et mobiles',
          'Formation et accompagnement à la culture numérique',
          'Optimisation budget informatique et réseau domestique',
          "Conseil énergie & Green IT pour l'habitat",
        ],
      },
      {
        title: 'Services à destination des entreprises',
        items: [
          'Création de site web',
          'Transition numérique verte (Green IT)',
          'Conseil en infrastructure informatique',
          'Cybersécurité essentielle',
        ],
      },
    ],
  },
  {
    title: "4. Modalités d'intervention",
    paragraphs: [
      'Les prestations sont réalisées principalement à distance, par prise en main, visioconférence, téléphone ou outils numériques adaptés.',
      'Avant toute intervention :',
    ],
    items: [
      'un devis gratuit et personnalisé est proposé,',
      "aucune prestation n'est réalisée sans validation préalable du client.",
    ],
  },
  {
    title: '5. Tarifs',
    paragraphs: [
      'Les prix affichés sur le site sont indicatifs. Les tarifs définitifs sont communiqués via devis avant toute prestation.',
      'Transistor&CIE étant sous le régime de la micro-entreprise, la TVA est non applicable (article 293B du CGI).',
    ],
  },
  {
    title: '6. Obligations du client',
    paragraphs: [
      "Le client s'engage à :",
      "Transistor&CIE ne saurait être tenu responsable de pertes de données préexistantes ou résultant d'un défaut de sauvegarde du client.",
    ],
    items: [
      'fournir des informations exactes et complètes,',
      'disposer des droits nécessaires sur les équipements et logiciels concernés,',
      'sauvegarder ses données avant toute intervention.',
    ],
  },
  {
    title: '7. Responsabilité',
    paragraphs: [
      "Transistor&CIE s'engage à mettre en œuvre tous les moyens nécessaires pour fournir une prestation de qualité, dans une obligation de moyens et non de résultat.",
      "La responsabilité de Transistor&CIE ne saurait être engagée en cas :",
    ],
    items: [
      'de mauvaise utilisation des recommandations fournies,',
      "de défaillance matérielle ou logicielle indépendante de l'intervention,",
      "d'interruption de services tiers (hébergeurs, éditeurs, fournisseurs d'accès).",
    ],
  },
  {
    title: '8. Propriété intellectuelle',
    paragraphs: [
      'L’ensemble des contenus présents sur le site (textes, visuels, logos, supports pédagogiques) est protégé par le droit de la propriété intellectuelle.',
      'Toute reproduction, diffusion ou utilisation sans autorisation écrite est interdite.',
    ],
  },
  {
    title: '9. Données personnelles',
    paragraphs: [
      'Les données personnelles collectées via le site sont utilisées uniquement dans le cadre des échanges commerciaux et de la réalisation des prestations.',
      "Conformément à la réglementation en vigueur, le client dispose d'un droit d'accès, de rectification et de suppression de ses données, sur simple demande par email.",
    ],
  },
  {
    title: '10. Droit applicable',
    paragraphs: [
      'Les présentes CGV/CGU sont soumises au droit français.',
      'En cas de litige, une solution amiable sera recherchée avant toute action judiciaire.',
    ],
  },
]
