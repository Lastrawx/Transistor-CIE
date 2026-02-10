import { Link } from 'react-router-dom'
import logo from '../assets/logo.webp'
import { instagram } from '../content/instagram'
import { site } from '../content/site'
import { resetAdsConsentStatus } from '../utils/cookie-consent'

const Footer = () => {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white">
      <div className="container-page grid gap-10 py-12 md:grid-cols-[1.2fr_1fr_1fr]">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Transistor&CIE" width={80} height={80} className="h-10 w-auto" />
            <div>
              <p className="text-sm font-semibold text-slate-900">Transistor&CIE</p>
              <p className="text-xs text-slate-500">La tech au quotidien, simplifiée</p>
            </div>
          </div>
          <p className="text-sm text-slate-600">
            Particuliers & entreprises. Conseil, assistance et Green IT. 100% digital, partout en France. Devis gratuit.
          </p>
        </div>

        <div className="space-y-3 text-sm">
          <p className="font-semibold text-slate-900">Navigation</p>
          <div className="flex flex-col gap-2 text-slate-600">
            <Link to="/particulier">Pôle Particuliers</Link>
            <Link to="/entreprise">Pôle Entreprises</Link>
            <Link to="/a-propos">À propos</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>

        <div className="space-y-3 text-sm">
          <p className="font-semibold text-slate-900">Réseaux</p>
          <a
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900"
            href={instagram.url}
            target="_blank"
            rel="noreferrer"
          >
            Instagram {instagram.handle}
          </a>
          <div className="flex flex-col gap-1 text-slate-600">
            <a className="hover:text-slate-900" href={`tel:${site.phoneHref}`}>
              {site.phoneDisplay} (appel & WhatsApp)
            </a>
            <a className="hover:text-slate-900" href={`mailto:${site.contactEmail}`}>
              {site.contactEmail}
            </a>
            <a className="hover:text-slate-900" href={site.websiteUrl} target="_blank" rel="noreferrer">
              {site.websiteUrl}
            </a>
          </div>
          <div className="flex flex-col gap-2 text-xs text-slate-500">
            <Link to="/mentions-legales">Mentions légales</Link>
            <Link to="/confidentialite">Politique de confidentialité</Link>
            <Link to="/cgv-cgu">CGV / CGU</Link>
            <button
              type="button"
              onClick={resetAdsConsentStatus}
              className="text-left transition hover:text-slate-700"
            >
              Gérer mes cookies
            </button>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-200 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Transistor&CIE. Tous droits réservés.
      </div>
    </footer>
  )
}

export default Footer
