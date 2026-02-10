import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import App from './App.tsx'
import { initAdsTrackingFromConsent } from './utils/cookie-consent'
import { initQuoteConversionAutoFlush } from './utils/ads'

initAdsTrackingFromConsent()
initQuoteConversionAutoFlush()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
