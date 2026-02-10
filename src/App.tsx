import { BrowserRouter } from 'react-router-dom'
import { useState } from 'react'
import AppRouter from './router/AppRouter'
import Header from './components/Header'
import Footer from './components/Footer'
import SatisfactionGuaranteeBanner from './components/SatisfactionGuaranteeBanner'
import CookieConsentBanner from './components/CookieConsentBanner'
import { ProfileProvider } from './utils/profile'

const App = () => {
  const [isGuaranteeBannerVisible, setIsGuaranteeBannerVisible] = useState(false)
  const [isCookieBannerVisible, setIsCookieBannerVisible] = useState(false)

  return (
    <ProfileProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className={`flex-1 ${isGuaranteeBannerVisible || isCookieBannerVisible ? 'pb-32 sm:pb-28' : ''}`}>
            <AppRouter />
          </main>
          {!isCookieBannerVisible && <SatisfactionGuaranteeBanner onVisibilityChange={setIsGuaranteeBannerVisible} />}
          <CookieConsentBanner onVisibilityChange={setIsCookieBannerVisible} />
          <Footer />
        </div>
      </BrowserRouter>
    </ProfileProvider>
  )
}

export default App
