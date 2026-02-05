import pricingParticulier from '../assets/pricing-particulier-cover.webp'
import pricingEntreprise from '../assets/pricing-entreprise-cover.webp'
import iconChip from '../assets/icon-chip.webp'

export type InstagramPost = {
  id: string
  title: string
  image: string
  url: string
}

export const instagram = {
  handle: '@Transistor_CIE',
  url: 'https://www.instagram.com/Transistor_CIE/',
  ctaText: 'Suivez-nous sur Instagram pour nos conseils et actus.',
  posts: [
    {
      id: 'tarifs-particuliers',
      title: 'Tarifs Particuliers (indicatif)',
      image: pricingParticulier,
      url: 'https://www.instagram.com/Transistor_CIE/',
    },
    {
      id: 'tarifs-entreprises',
      title: 'Tarifs Entreprises (indicatif)',
      image: pricingEntreprise,
      url: 'https://www.instagram.com/Transistor_CIE/',
    },
    {
      id: 'tech-green',
      title: 'Tech & Green IT au quotidien',
      image: iconChip,
      url: 'https://www.instagram.com/Transistor_CIE/',
    },
  ],
}
