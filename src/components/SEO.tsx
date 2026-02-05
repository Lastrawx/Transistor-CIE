import { useEffect } from 'react'

const ensureMeta = (key: string, value: string, attr: 'name' | 'property' = 'name') => {
  if (!value) return
  let element = document.querySelector(`meta[${attr}="${key}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attr, key)
    document.head.appendChild(element)
  }
  element.setAttribute('content', value)
}

type SEOProps = {
  title: string
  description: string
  image?: string
}

const SEO = ({ title, description, image }: SEOProps) => {
  useEffect(() => {
    document.title = title
    ensureMeta('description', description, 'name')
    ensureMeta('og:title', title, 'property')
    ensureMeta('og:description', description, 'property')
    ensureMeta('og:type', 'website', 'property')
    ensureMeta('og:url', window.location.href, 'property')
    if (image) {
      ensureMeta('og:image', image, 'property')
    }
  }, [title, description, image])

  return null
}

export default SEO
