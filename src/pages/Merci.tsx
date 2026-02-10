import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { instagram } from '../content/instagram'
import { flushQuoteConversionIfPending } from '../utils/ads'

const Merci = () => {
  useEffect(() => {
    const sentImmediately = flushQuoteConversionIfPending()
    if (sentImmediately) return

    let attempts = 0
    const maxAttempts = 20
    const retryTimer = window.setInterval(() => {
      attempts += 1
      const sent = flushQuoteConversionIfPending()
      if (sent || attempts >= maxAttempts) {
        window.clearInterval(retryTimer)
      }
    }, 500)

    return () => {
      window.clearInterval(retryTimer)
    }
  }, [])

  return (
    <div className="container-page py-16">
      <SEO
        title="Transistor&CIE — Merci"
        description="Votre demande a bien été envoyée."
        noIndex
      />
      <div className="section-card p-10 text-center">
        <h1 className="text-3xl font-semibold text-slate-900">Merci pour votre demande</h1>
        <p className="mt-3 text-sm text-slate-600">
          Nous revenons vers vous rapidement (généralement sous 24 à 48h ouvrées).
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link to="/" className="btn-secondary">
            Retour à l'accueil
          </Link>
          <a href={instagram.url} target="_blank" rel="noreferrer" className="btn-primary">
            Suivre sur Instagram
          </a>
        </div>
      </div>
    </div>
  )
}

export default Merci
