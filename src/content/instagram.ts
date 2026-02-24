import postDVIXLfPjlXY from '../assets/instagram/instagram-dvixlfpjlxy.jpg'
import postDVGsxbOjd3H from '../assets/instagram/instagram-dvgsxbojd3h.jpg'
import postDVEIENgDeOQ from '../assets/instagram/instagram-dveiengdeoq.jpg'

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
      id: 'dvixlfpjlxy',
      title: 'Accessibilité numérique: levier business',
      image: postDVIXLfPjlXY,
      url: 'https://www.instagram.com/p/DVIXLfPjlXY/',
    },
    {
      id: 'dvgsxbojd3h',
      title: 'Électricité: réduire le gaspillage numérique',
      image: postDVGsxbOjd3H,
      url: 'https://www.instagram.com/p/DVGsxbOjd3H/',
    },
    {
      id: 'dveiengdeoq',
      title: 'Wi-Fi maison: optimiser budget réseau',
      image: postDVEIENgDeOQ,
      url: 'https://www.instagram.com/p/DVEIENgDeOQ/',
    },
  ],
}
