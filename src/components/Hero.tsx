import { Link } from 'react-router-dom'

type HeroProps = {
  title: string
  subtitle?: string
  kicker?: string
  ctaLabel?: string
  ctaLink?: string
  secondaryLabel?: string
  secondaryLink?: string
  image: string
  imageAlt: string
  children?: React.ReactNode
}

const Hero = ({
  title,
  subtitle,
  kicker,
  ctaLabel,
  ctaLink,
  secondaryLabel,
  secondaryLink,
  image,
  imageAlt,
  children,
}: HeroProps) => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 soft-grid" aria-hidden="true" />
      <div className="container-page relative grid items-center gap-10 py-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6 animate-fadeUp">
          {kicker && (
            <span className="chip bg-brand-cloud text-brand-ink">{kicker}</span>
          )}
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold leading-tight text-slate-900 md:text-5xl">{title}</h1>
            {subtitle && <p className="text-lg text-slate-600">{subtitle}</p>}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {ctaLabel && ctaLink && (
              <Link to={ctaLink} className="btn-primary">
                {ctaLabel}
              </Link>
            )}
            {secondaryLabel && secondaryLink && (
              <Link to={secondaryLink} className="btn-secondary">
                {secondaryLabel}
              </Link>
            )}
          </div>
          {children}
        </div>
        <div className="relative">
          <div className="hero-panel rounded-3xl p-3 shadow-lift">
            <img src={image} alt={imageAlt} className="w-full rounded-2xl" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
