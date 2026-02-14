import postDUvQY15AZ2E from '../assets/instagram/instagram-duvqy15az2e.jpg'
import postDUsrnPj1sJ from '../assets/instagram/instagram-dusrnpj1sj.jpg'
import postDUpum7HDoDh from '../assets/instagram/instagram-dupum7hdodh.jpg'

export type InstagramPost = {
  id: string
  title: string
  image: string
  url: string
}

export const instagram = {
  handle: '@Transistor_CIE',
  url: 'https://www.instagram.com/transistor_cie/',
  ctaText: 'Conseils concrets, cybersécurité et coulisses Transistor&CIE.',
  posts: [
    {
      id: 'duvqy15az2e',
      title: 'Deepfake: 4 réflexes simples',
      image: postDUvQY15AZ2E,
      url: 'https://www.instagram.com/p/DUvQY15AZ2E/',
    },
    {
      id: 'dusrnpj1sj',
      title: 'Une faille peut tout arrêter',
      image: postDUsrnPj1sJ,
      url: 'https://www.instagram.com/p/DUsrnP_j1sJ/',
    },
    {
      id: 'dupum7hdodh',
      title: 'Météo: sécuriser le foyer connecté',
      image: postDUpum7HDoDh,
      url: 'https://www.instagram.com/p/DUpum7HDoDh/',
    },
  ],
}
