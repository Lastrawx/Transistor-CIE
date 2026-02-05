import { NavLink, Link } from 'react-router-dom'
import logoIcon from '../assets/logo-icon.png'
import logoWordmark from '../assets/logo-wordmark.png'
import { useProfile } from '../utils/profile'
import { instagram } from '../content/instagram'

const navItems = [
  { label: 'Accueil', to: '/' },
  { label: 'Particuliers', to: '/particulier' },
  { label: 'Entreprises', to: '/entreprise' },
  { label: 'À propos', to: '/a-propos' },
  { label: 'Contact', to: '/contact' },
]

const Header = () => {
  const { profile } = useProfile()
  const ctaTarget = profile === 'entreprise' ? '/entreprise' : profile === 'particulier' ? '/particulier' : '/contact'
  const ctaLabel = profile ? 'Voir le pôle' : 'Demander un devis'

  return (
    <header className="sticky top-0 z-40 border-b border-white/60 bg-white/80 backdrop-blur">
      <div className="container-page flex h-[64px] items-center justify-between gap-3 sm:h-[72px] sm:gap-6">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src={logoIcon} alt="Transistor&CIE" className="h-[48px] w-[48px] sm:h-[58px] sm:w-[58px] md:h-[62px] md:w-[62px]" />
          <img
            src={logoWordmark}
            alt="Transistor&CIE"
            className="hidden h-[44px] w-auto sm:block sm:h-[54px] md:h-[58px]"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `transition hover:text-slate-900 ${isActive ? 'text-slate-900' : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <a href={instagram.url} target="_blank" rel="noreferrer" className="transition hover:text-slate-900">
            Instagram
          </a>
        </nav>

        <div className="flex items-center gap-2 shrink-0 sm:gap-3">
          <Link className="btn-primary shrink-0 whitespace-nowrap px-4 py-2 text-xs sm:px-5 sm:py-3 sm:text-sm" to={ctaTarget}>
            {ctaLabel}
          </Link>
          <details className="relative shrink-0 lg:hidden">
            <summary className="btn-ghost cursor-pointer whitespace-nowrap">Menu</summary>
            <div className="absolute right-0 top-16 w-56 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl sm:right-5 sm:top-[4.5rem]">
              <div className="flex flex-col gap-3 text-sm font-medium">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `transition hover:text-slate-900 ${isActive ? 'text-slate-900' : 'text-slate-600'}`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
                <a
                  href={instagram.url}
                  target="_blank"
                  rel="noreferrer"
                  className="transition hover:text-slate-900 text-slate-600"
                >
                  Instagram
                </a>
              </div>
            </div>
          </details>
        </div>
      </div>
    </header>
  )
}

export default Header
