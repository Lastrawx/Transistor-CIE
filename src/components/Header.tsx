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
      <div className="container-page flex h-[72px] items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-2">
          <img src={logoIcon} alt="Transistor&CIE" className="h-[58px] w-[58px] sm:h-[62px] sm:w-[62px]" />
          <img src={logoWordmark} alt="Transistor&CIE" className="h-[48px] w-auto sm:h-[54px] md:h-[58px]" />
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

        <div className="flex items-center gap-3">
          <Link className="btn-primary" to={ctaTarget}>
            {ctaLabel}
          </Link>
          <details className="relative lg:hidden">
            <summary className="btn-ghost cursor-pointer">Menu</summary>
            <div className="absolute right-5 top-[4.5rem] w-56 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl">
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
