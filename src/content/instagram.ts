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
      id: 'tech-green',
      title: 'Tech & Green IT au quotidien',
      image: iconChip,
      url: 'https://www.instagram.com/Transistor_CIE/',
    },
  ],
}
