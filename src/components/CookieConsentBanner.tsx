import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  getAdsConsentStatus,
  setAdsConsentStatus,
  subscribeAdsConsent,
  type AdsConsentStatus,
} from '../utils/cookie-consent'

type CookieConsentBannerProps = {
  onVisibilityChange?: (visible: boolean) => void
}

const CookieConsentBanner = ({ onVisibilityChange }: CookieConsentBannerProps) => {
  const [status, setStatus] = useState<AdsConsentStatus>(() => getAdsConsentStatus())

  useEffect(() => {
    return subscribeAdsConsent(setStatus)
  }, [])

  const visible = status === 'unset'

  useEffect(() => {
    onVisibilityChange?.(visible)
  }, [onVisibilityChange, visible])

  if (!visible) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-[70] px-3 pb-3 sm:px-4 sm:pb-4">
      <div className="container-page">
        <div className="rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-2xl backdrop-blur">
          <div className="flex flex-col gap-3 sm:gap-4">
            <div className="space-y-1">
              <p className="text-sm font-semibold text-slate-900">Préférences cookies</p>
              <p className="text-sm text-slate-600">
                Nous utilisons des traceurs de mesure d&apos;audience et de conversion Google Ads uniquement avec votre
                consentement. Votre choix est horodaté avec version de politique pour preuve de conformité. Vous pouvez
                le modifier à tout moment.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className="btn-ghost px-4 py-2 text-sm"
                onClick={() => setAdsConsentStatus('denied')}
              >
                Refuser
              </button>
              <button
                type="button"
                className="btn-primary px-4 py-2 text-sm"
                onClick={() => setAdsConsentStatus('granted')}
              >
                Accepter
              </button>
              <Link to="/confidentialite" className="btn-secondary px-4 py-2 text-sm">
                En savoir plus
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CookieConsentBanner
