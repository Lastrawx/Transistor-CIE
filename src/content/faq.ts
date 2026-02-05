export type FAQItem = {
  question: string
  answer: string
}

export const faqItems: FAQItem[] = [
  {
    question: 'Combien de temps pour recevoir un devis ?',
    answer:
      'Le devis est gratuit et envoyé rapidement après votre demande. Comptez généralement 24 à 48h ouvrées.',
  },
  {
    question: 'Les interventions sont-elles vraiment 100% à distance ?',
    answer:
      'Oui. Les diagnostics, conseils et accompagnements se font en visio ou prise en main à distance, sans déplacement.',
  },
  {
    question: 'Quels outils utilisez-vous pour intervenir ?',
    answer:
      'Des outils sécurisés de visio et de prise en main à distance, choisis selon votre contexte (particulier ou entreprise).',
  },
  {
    question: 'Les tarifs affichés sont-ils fixes ?',
    answer:
      'Ils sont indicatifs. Chaque besoin est unique, le devis gratuit précise un prix personnalisé avant toute intervention.',
  },
  {
    question: 'Mes données sont-elles protégées ?',
    answer:
      'La confidentialité est une priorité. Les accès sont sécurisés et limités à l’intervention convenue.',
  },
  {
    question: 'Puis-je demander un accompagnement récurrent ?',
    answer:
      'Oui. Il est possible de planifier un suivi régulier, selon vos besoins et votre budget.',
  },
  {
    question: 'Travaillez-vous partout en France ?',
    answer:
      'Oui, l’accompagnement à distance permet d’intervenir partout en France et au-delà.',
  },
]
