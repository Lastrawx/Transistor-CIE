import { Routes, Route, useLocation } from 'react-router-dom'
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
          <Route path="/entreprise" element={<Entreprise />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin-cagnat" element={<Admin />} />
          <Route path="/merci" element={<Merci />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/confidentialite" element={<Confidentialite />} />
          <Route path="/cgv-cgu" element={<CgvCgu />} />
          <Route path="/cgv" element={<CgvCgu />} />
          <Route path="/cgu" element={<CgvCgu />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default AppRouter
