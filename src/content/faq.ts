export type FAQItem = {
  question: string
  answer: string
}

export const faqItems: FAQItem[] = [
  {
    question: 'Combien de temps pour recevoir un devis ?',
    answer:
      'Le devis est gratuit. Dans la majorité des cas, vous recevez une réponse sous 24 à 48h ouvrées après réception des éléments utiles.',
  },
  {
    question: 'Comment écrire le nom Transistor&CIE ?',
    answer:
      'Le nom officiel est Transistor&CIE. Selon les usages, vous pouvez aussi voir : Transistor et CIE, Transistor CIE, Transistor et compagnie, Transistor & compagnie.',
  },
  {
    question: 'Les interventions sont-elles vraiment 100% digital, partout en France ?',
    answer:
      'Oui. Les diagnostics, conseils et accompagnements se font en visio et/ou prise en main à distance, sans déplacement.',
  },
  {
    question: 'Quels outils utilisez-vous pour intervenir ?',
    answer:
      'Des outils sécurisés de visio et, si nécessaire, de prise en main à distance (TeamViewer ou équivalent), uniquement avec votre accord.',
  },
  {
    question: 'Mes données sont-elles protégées ?',
    answer:
      'Oui. Seules les données nécessaires au traitement de la demande sont utilisées, avec des accès limités au périmètre convenu. Les détails sont précisés dans la politique de confidentialité.',
  },
  {
    question: 'Puis-je demander un accompagnement récurrent ?',
    answer:
      'Oui. Vous pouvez choisir une intervention ponctuelle ou un accompagnement récurrent (abonnement), selon vos besoins et le périmètre défini au devis.',
  },
  {
    question: 'L’acompte est-il toujours demandé ?',
    answer:
      'Non. Si le montant TTC du devis est strictement inférieur à 150 euros, aucun acompte n’est demandé et la totalité reste à payer selon l’échéance prévue.',
  },
  {
    question: 'Comment arrêter un abonnement ?',
    answer:
      'Les modalités de résiliation (préavis, date de fin, prorata éventuel) sont précisées dans le devis et les CGV/CGU.',
  },
]
