import SEO from '../components/SEO'
import { confidentialite } from '../content/legal'

const Confidentialite = () => {
  return (
    <div className="container-page py-16">
      <SEO
        title="Transistor&CIE — Politique de confidentialité"
        description="Politique de confidentialité et données personnelles."
      />
      <div className="section-card p-8 space-y-6">
        <h1 className="text-3xl font-semibold text-slate-900">Politique de confidentialité</h1>
        {confidentialite.map((section) => (
          <div key={section.title} className="space-y-2">
            <h2 className="text-xl font-semibold text-slate-800">{section.title}</h2>
            <ul className="list-disc pl-5 text-sm text-slate-600">
              {section.content.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Confidentialite
