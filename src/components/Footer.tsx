import { Link } from 'react-router-dom'
import logoIcon from '../assets/logo-icon-header.png'
import { instagram } from '../content/instagram'
import { site } from '../content/site'
import { resetAdsConsentStatus } from '../utils/cookie-consent'

const Footer = () => {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white" aria-label="Pied de page Transistor&CIE">
      <div className="container-page grid gap-10 py-12 md:grid-cols-[1.2fr_1fr_1fr]">
        <div className="space-y-4">
          <Link to="/" className="flex items-center gap-3 w-fit" aria-label="Accueil Transistor&CIE">
            <img
              src={logoIcon}
              alt="Logo Transistor&CIE"
              width={48}
              height={48}
              className="h-12 w-12 shrink-0 object-contain"
            />
            <div>
              <p className="text-sm font-semibold text-slate-900">Transistor&CIE</p>
              <p className="text-xs text-slate-500">La tech au quotidien, simplifiée</p>
            </div>
          </Link>
          <div className="space-y-1 text-sm text-slate-600">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-700">
              CYBERSECURITE - WEB - SUPPORT DIGITAL - RESEAU - GREEN IT
            </p>
            <p>Transistor&CIE accompagne particuliers et entreprises.</p>
            <p>100% digital, partout en France. Devis gratuit.</p>
          </div>
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
