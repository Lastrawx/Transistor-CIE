import { useEffect, useRef } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import logoIcon from '../assets/logo-icon-header.png'
import logoWordmark from '../assets/logo-wordmark-header.png'
import { useProfile } from '../utils/useProfile'
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
  const location = useLocation()
  const menuRef = useRef<HTMLDetailsElement | null>(null)
  const profileContactQuery = profile ? `?profile=${profile}` : ''
  const ctaTarget = `/contact${profileContactQuery}`
  const ctaLabel = 'Demander un devis'
  const ctaLabelShort = 'Devis'

  useEffect(() => {
    if (menuRef.current) {
      menuRef.current.open = false
    }
  }, [location.pathname])

  const closeMobileMenu = () => {
    if (menuRef.current) {
      menuRef.current.open = false
    }
  }

  return (
    <header className="sticky top-0 z-40 border-b border-white/60 bg-white/80 backdrop-blur">
      <div className="container-page flex h-[64px] items-center justify-between gap-3 sm:h-[72px] sm:gap-6">
        <Link to="/" className="flex min-w-0 items-center gap-2">
          <img
            src={logoIcon}
            alt="Transistor&CIE"
            width={62}
            height={62}
            className="h-[48px] w-[48px] shrink-0 sm:h-[58px] sm:w-[58px] md:h-[62px] md:w-[62px]"
          />
          <img
            src={logoWordmark}
            alt="Transistor&CIE"
            width={240}
            height={58}
            className="h-[26px] w-auto max-w-[110px] sm:h-[54px] sm:max-w-none md:h-[58px]"
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
          <Link
            className="btn-primary shrink-0 whitespace-nowrap px-3 py-2 text-[11px] leading-tight sm:px-5 sm:py-3 sm:text-sm sm:leading-none"
            to={ctaTarget}
          >
            <span className="sm:hidden">{ctaLabelShort}</span>
            <span className="hidden sm:inline">{ctaLabel}</span>
          </Link>
          <details ref={menuRef} className="relative shrink-0 lg:hidden">
            <summary className="btn-ghost cursor-pointer whitespace-nowrap">Menu</summary>
            <div className="absolute right-0 top-16 w-56 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl sm:right-5 sm:top-[4.5rem]">
              <div className="flex flex-col gap-3 text-sm font-medium">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={closeMobileMenu}
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
                  onClick={closeMobileMenu}
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
