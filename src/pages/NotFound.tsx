import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

const NotFound = () => {
  return (
    <div className="container-page py-16">
      <SEO
        title="Transistor&CIE — Page introuvable"
        description="La page demandée est introuvable."
        noIndex
      />
      <div className="section-card p-10 text-center">
        <h1 className="text-3xl font-semibold text-slate-900">Page introuvable</h1>
        <p className="mt-3 text-sm text-slate-600">
          Cette page n’existe pas ou n’est plus disponible. Mais on peut sûrement vous aider :
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link to="/depannage-pc" className="btn-primary">
            Dépannage informatique
          </Link>
          <Link to="/contact" className="btn-secondary">
            Demander un devis gratuit
          </Link>
          <Link to="/" className="btn-ghost">
            Retour à l’accueil
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
