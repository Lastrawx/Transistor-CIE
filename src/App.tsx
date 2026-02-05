import { BrowserRouter } from 'react-router-dom'
import AppRouter from './router/AppRouter'
import Header from './components/Header'
import Footer from './components/Footer'
import { ProfileProvider } from './utils/profile'

const App = () => {
  return (
    <ProfileProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <AppRouter />
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </ProfileProvider>
  )
}

export default App
