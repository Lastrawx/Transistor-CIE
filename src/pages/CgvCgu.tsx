import SEO from '../components/SEO'
import { cgvCguSections } from '../content/legal'

const CgvCgu = () => {
  return (
    <div className="container-page py-16">
      <SEO
        title="Transistor&CIE — CGV / CGU"
        description="Conditions générales de vente et d'utilisation (CGV/CGU) de Transistor&CIE."
      />
      <div className="section-card p-8 space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold text-slate-900">
            Conditions Générales de Vente et d&apos;Utilisation
          </h1>
          <p className="text-sm text-slate-600">Transistor&CIE</p>
        </div>

        {cgvCguSections.map((section) => (
          <section key={section.title} id={section.id} className="space-y-3 scroll-mt-28">
            <h2 className="text-xl font-semibold text-slate-800">{section.title}</h2>

            <div className="space-y-2 text-sm text-slate-600">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            {section.items && section.items.length > 0 && (
              <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}

            {section.groups && section.groups.length > 0 && (
              <div className="space-y-4">
                {section.groups.map((group) => (
                  <div key={group.title} className="space-y-2">
                    <h3 className="text-base font-semibold text-slate-800">{group.title}</h3>
                    <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1">
                      {group.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  )
}

export default CgvCgu
