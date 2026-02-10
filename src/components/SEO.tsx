import { useEffect } from 'react'
import { site } from '../content/site'

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

const ensureLink = (rel: string, href: string) => {
  if (!href) return
  let element = document.querySelector(`link[rel="${rel}"]`)
  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', rel)
    document.head.appendChild(element)
  }
  element.setAttribute('href', href)
}

type SEOProps = {
  title: string
  description: string
  image?: string
  noIndex?: boolean
}

const SEO = ({ title, description, image, noIndex = false }: SEOProps) => {
  useEffect(() => {
    const canonicalBase = site.websiteUrl.replace(/\/$/, '')
    const canonicalUrl = `${canonicalBase}${window.location.pathname}`
    const imageUrl = image ? new URL(image, canonicalBase).toString() : `${canonicalBase}/og-home.webp`

    document.title = title
    ensureMeta('description', description, 'name')
    ensureMeta('og:title', title, 'property')
    ensureMeta('og:description', description, 'property')
    ensureMeta('og:type', 'website', 'property')
    ensureMeta('og:site_name', 'Transistor&CIE', 'property')
    ensureMeta('og:locale', 'fr_FR', 'property')
    ensureMeta('og:url', canonicalUrl, 'property')
    ensureMeta('og:image', imageUrl, 'property')
    ensureMeta('twitter:card', 'summary_large_image', 'name')
    ensureMeta('twitter:title', title, 'name')
    ensureMeta('twitter:description', description, 'name')
    ensureMeta('twitter:image', imageUrl, 'name')
    ensureMeta('robots', noIndex ? 'noindex, nofollow' : 'index, follow', 'name')
    ensureLink('canonical', canonicalUrl)
  }, [title, description, image, noIndex])

  return null
}

export default SEO
