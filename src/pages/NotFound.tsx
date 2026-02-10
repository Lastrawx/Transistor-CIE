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
          Cette page n’existe pas ou n’est plus disponible.
        </p>
        <div className="mt-6">
          <Link to="/" className="btn-primary">
            Retour à l’accueil
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
