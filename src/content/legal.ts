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
}

export type PrivacySection = {
  title: string
  paragraphs: string[]
  items?: string[]
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

export const confidentialite: PrivacySection[] = [
  {
    title: '1. Responsable du traitement',
    paragraphs: [
      'Le responsable du traitement des données personnelles collectées sur le site Transistor&CIE est :',
      'Transistor&CIE',
      'Entrepreneur individuel (micro-entreprise)',
      'Email de contact : Quentin-cagnat@live.fr',
    ],
  },
  {
    title: '2. Données collectées',
    paragraphs: [
      'Dans le cadre de l’utilisation du site et des services proposés, Transistor&CIE peut collecter les données personnelles suivantes :',
      'Aucune donnée sensible n’est collectée volontairement.',
    ],
    items: [
      'Nom et prénom',
      'Adresse email',
      'Numéro de téléphone (si renseigné)',
      'Contenu des messages envoyés via le formulaire de contact',
    ],
  },
  {
    title: '3. Finalités de la collecte',
    paragraphs: [
      'Les données personnelles sont collectées uniquement pour :',
      'Les données ne sont ni vendues, ni cédées, ni transmises à des tiers à des fins commerciales.',
    ],
    items: [
      'répondre aux demandes de contact,',
      'établir des devis et échanges commerciaux,',
      'assurer la relation client et le suivi des prestations.',
    ],
  },
  {
    title: '4. Durée de conservation',
    paragraphs: [
      'Les données personnelles sont conservées uniquement pendant la durée nécessaire :',
    ],
    items: [
      'au traitement de la demande,',
      'à la relation commerciale,',
      'et au respect des obligations légales et comptables.',
    ],
  },
  {
    title: '5. Sécurité des données',
    paragraphs: [
      'Transistor&CIE met en œuvre des mesures techniques et organisationnelles raisonnables afin de protéger les données personnelles contre toute perte, accès non autorisé ou divulgation.',
    ],
  },
  {
    title: '6. Droits des utilisateurs',
    paragraphs: [
      'Conformément à la réglementation en vigueur (RGPD), l’utilisateur dispose des droits suivants :',
      'Toute demande peut être adressée par email à : Quentin-cagnat@live.fr',
    ],
    items: [
      'droit d’accès à ses données,',
      'droit de rectification,',
      'droit à l’effacement,',
      'droit d’opposition ou de limitation du traitement.',
    ],
  },
  {
    title: '7. Cookies',
    paragraphs: [
      'Le site Transistor&CIE n’utilise pas de cookies à des fins publicitaires ou de suivi avancé.',
      'Des cookies techniques strictement nécessaires au bon fonctionnement du site peuvent être utilisés.',
    ],
  },
  {
    title: '8. Modification de la politique de confidentialité',
    paragraphs: [
      'Transistor&CIE se réserve le droit de modifier la présente politique de confidentialité à tout moment afin de rester conforme aux évolutions légales ou techniques.',
    ],
  },
  {
    title: '9. Droit applicable',
    paragraphs: [
      'La présente politique de confidentialité est soumise au droit français.',
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
    id: 'garantie-satisfaction',
    title: 'Garantie satisfaction (conditions)',
    paragraphs: [
      'Transistor&CIE propose une garantie satisfaction sur certaines prestations à distance, conformément au périmètre défini au devis.',
      'La garantie est limitée aux devis d’un montant inférieur ou égal à 150 € TTC et s’apprécie uniquement au regard de critères objectifs mentionnés au devis (résultat attendu, livrables, actions prévues).',
      'En cas de non-atteinte du résultat défini au devis, le Client doit en informer Transistor&CIE dans un délai de 48 heures suivant la fin de l’intervention. Transistor&CIE pourra, selon la situation et dans la limite du périmètre du devis, proposer une reprise de l’intervention ou appliquer la garantie selon les présentes CGV.',
      'La garantie ne s’applique pas lorsque la difficulté rencontrée est externe au périmètre du devis, lorsque les pré-requis indiqués au devis n’ont pas été respectés, ou en cas d’intervention/modification par un tiers susceptible d’affecter le résultat.',
      'À des fins de prévention de la fraude et de sécurisation des transactions, Transistor&CIE peut demander au Client un justificatif d’identité strictement nécessaire, traité et conservé pour la durée strictement requise à cette finalité, conformément à la réglementation applicable.',
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
