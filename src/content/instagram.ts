import iconChip from '../assets/icon-chip.webp'
import serviceGreenIt from '../assets/service-greenit.webp'
import serviceFormation from '../assets/service-formation.webp'

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
      id: 'duy97-pjfzg',
      title: 'Publication Instagram récente #1',
      image: iconChip,
      url: 'https://www.instagram.com/p/DUY97-pjFzg/',
    },
    {
      id: 'duvxytodj3r',
      title: 'Publication Instagram récente #2',
      image: serviceGreenIt,
      url: 'https://www.instagram.com/p/DUVxytODJ3R/?img_index=1',
    },
    {
      id: 'duvv-ildgto',
      title: 'Publication Instagram récente #3',
      image: serviceFormation,
      url: 'https://www.instagram.com/p/DUVv-IlDGTO/?img_index=1',
    },
  ],
}
