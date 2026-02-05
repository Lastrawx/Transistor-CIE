import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Home from '../pages/Home'
import Particulier from '../pages/Particulier'
import Entreprise from '../pages/Entreprise'
import About from '../pages/About'
import Contact from '../pages/Contact'
import Merci from '../pages/Merci'
import MentionsLegales from '../pages/MentionsLegales'
import Confidentialite from '../pages/Confidentialite'

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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/particulier" element={<Particulier />} />
        <Route path="/entreprise" element={<Entreprise />} />
        <Route path="/a-propos" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/merci" element={<Merci />} />
        <Route path="/mentions-legales" element={<MentionsLegales />} />
        <Route path="/confidentialite" element={<Confidentialite />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  )
}

export default AppRouter
