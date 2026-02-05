import SEO from '../components/SEO'
import ContactForm from '../components/ContactForm'
import PillBanner from '../components/PillBanner'
import { instagram } from '../content/instagram'

const Contact = () => {
  return (
    <div className="space-y-16">
      <SEO
        title="Transistor&CIE — Contact"
        description="Demandez un devis gratuit, 100% à distance."
      />

      <section className="container-page section-card p-8">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase text-slate-500">Contact</p>
            <h1 className="text-3xl font-semibold text-slate-900">Demandez votre devis gratuit</h1>
            <p className="text-sm text-slate-600">
              Décrivez votre besoin et recevez une proposition claire. Interventions 100% à distance.
            </p>
            <PillBanner />
            <div className="rounded-2xl border border-slate-100 bg-white p-5">
              <p className="text-sm font-semibold text-slate-800">Instagram</p>
              <a
                href={instagram.url}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900"
              >
                {instagram.handle}
              </a>
            </div>
          </div>
          <div>
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
