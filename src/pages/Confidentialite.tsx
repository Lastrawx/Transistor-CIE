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
        <p className="text-sm text-slate-600">Transistor&CIE</p>
        {confidentialite.map((section) => (
          <div key={section.title} className="space-y-2">
            <h2 className="text-xl font-semibold text-slate-800">{section.title}</h2>
            {section.paragraphs.length > 0 && (
              <div className="space-y-2 text-sm text-slate-600">
                {section.paragraphs.map((paragraph, paragraphIndex) => (
                  <p key={`${section.title}-paragraph-${paragraphIndex}`}>{paragraph}</p>
                ))}
              </div>
            )}
            {section.items && section.items.length > 0 && (
              <ul className="list-disc pl-5 text-sm text-slate-600">
                {section.items.map((item, itemIndex) => (
                  <li key={`${section.title}-item-${itemIndex}`}>{item}</li>
                ))}
              </ul>
            )}
            {section.postParagraphs && section.postParagraphs.length > 0 && (
              <div className="space-y-2 text-sm text-slate-600">
                {section.postParagraphs.map((paragraph, paragraphIndex) => (
                  <p key={`${section.title}-post-paragraph-${paragraphIndex}`}>{paragraph}</p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Confidentialite
