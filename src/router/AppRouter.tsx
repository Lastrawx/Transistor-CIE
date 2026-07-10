import { Routes, Route, Navigate, useLocation, useParams } from 'react-router-dom'
import { Suspense, lazy, useEffect } from 'react'

const Home = lazy(() => import('../pages/Home'))
const Particulier = lazy(() => import('../pages/Particulier'))
const Entreprise = lazy(() => import('../pages/Entreprise'))
const About = lazy(() => import('../pages/About'))
const Contact = lazy(() => import('../pages/Contact'))
const Admin = lazy(() => import('../pages/Admin'))
const Merci = lazy(() => import('../pages/Merci'))
const MentionsLegales = lazy(() => import('../pages/MentionsLegales'))
const Confidentialite = lazy(() => import('../pages/Confidentialite'))
const CgvCgu = lazy(() => import('../pages/CgvCgu'))
const DepannagePc = lazy(() => import('../pages/DepannagePc'))
const AbonnementFamille = lazy(() => import('../pages/AbonnementFamille'))
const CybersecuritePme = lazy(() => import('../pages/CybersecuritePme'))
const SiteWebPro = lazy(() => import('../pages/SiteWebPro'))
const NotFound = lazy(() => import('../pages/NotFound'))

// Anciennes pages services (12 URLs) redirigées vers les offres phares.
// Les redirections 301 côté serveur sont dans public/_redirects ; cette map
// couvre les navigations internes côté client.
const legacyServiceRedirects: Record<string, string> = {
  'assistance-depannage': '/depannage-pc',
  'support-connectes-mobiles': '/depannage-pc',
  'optimisation-budget-reseau': '/particulier',
  'support-digital-familial-abonnement': '/abonnement-famille',
  'coaching-montage-pc': '/particulier',
  'formation-culture-numerique': '/particulier',
  'conseil-energie-green-it': '/particulier',
  'cybersecurite-essentielle': '/cybersecurite-pme',
  'abonnement-cybersecurite-pme': '/cybersecurite-pme',
  'creation-site-web': '/site-web-pro',
  'conseil-infrastructure-it': '/entreprise',
  'transition-numerique-verte': '/entreprise',
}

const LegacyServiceRedirect = ({ fallback }: { fallback: string }) => {
  const { serviceId } = useParams<{ serviceId: string }>()
  return <Navigate to={legacyServiceRedirects[serviceId ?? ''] ?? fallback} replace />
}

const ScrollToTop = () => {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [pathname, hash])
  return null
}

const AppRouter = () => {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<div className="container-page py-16 text-sm text-slate-600">Chargement...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/particulier" element={<Particulier />} />
          <Route path="/depannage-pc" element={<DepannagePc />} />
          <Route path="/abonnement-famille" element={<AbonnementFamille />} />
          <Route path="/cybersecurite-pme" element={<CybersecuritePme />} />
          <Route path="/site-web-pro" element={<SiteWebPro />} />
          <Route path="/particulier/:serviceId" element={<LegacyServiceRedirect fallback="/particulier" />} />
          <Route path="/entreprise" element={<Entreprise />} />
          <Route path="/entreprise/:serviceId" element={<LegacyServiceRedirect fallback="/entreprise" />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin-cagnat" element={<Admin />} />
          <Route path="/merci" element={<Merci />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/confidentialite" element={<Confidentialite />} />
          <Route path="/cgv-cgu" element={<CgvCgu />} />
          <Route path="/cgv" element={<CgvCgu />} />
          <Route path="/cgu" element={<CgvCgu />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default AppRouter
