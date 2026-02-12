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
  structuredData?: Record<string, unknown> | Array<Record<string, unknown>>
}

const removeRouteStructuredDataScripts = () => {
  document.querySelectorAll('script[data-seo-ld="route"]').forEach((element) => element.remove())
}

const SEO = ({ title, description, image, noIndex = false, structuredData }: SEOProps) => {
  useEffect(() => {
    const canonicalBase = site.websiteUrl.replace(/\/$/, '')
    const canonicalUrl = `${canonicalBase}${window.location.pathname}`
    const imageUrl = image ? new URL(image, canonicalBase).toString() : `${canonicalBase}/og-home.webp`
    const structuredDataEntries = structuredData ? (Array.isArray(structuredData) ? structuredData : [structuredData]) : []

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

    removeRouteStructuredDataScripts()
    structuredDataEntries.forEach((entry) => {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.setAttribute('data-seo-ld', 'route')
      script.text = JSON.stringify(entry)
      document.head.appendChild(script)
    })

    return () => {
      removeRouteStructuredDataScripts()
    }
  }, [title, description, image, noIndex, structuredData])

  return null
}

export default SEO
