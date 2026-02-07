export type LegalSection = {
  title: string
  content: string[]
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
