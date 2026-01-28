import Navigation from './components/Navigation'
import Hero from './components/Hero'
import TrustBadges from './components/TrustBadges'
import Pricing from './components/Pricing'
import HowItWorks from './components/HowItWorks'
import DesignedFor from './components/DesignedFor'
import About from './components/About'
import MenuPreview from './components/MenuPreview'
import Testimonials from './components/Testimonials'
import InstagramFeed from './components/InstagramFeed'
import Contact from './components/Contact'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import { TrackingProvider } from './providers/TrackingProvider'
import { CartProvider } from './providers/CartProvider'

function App() {
  return (
    <TrackingProvider>
      <CartProvider>
        <div className="min-h-screen bg-[#FAF7F2]">
          <Navigation />
          <main>
            <Hero />
            <TrustBadges />
            <Pricing />
            <HowItWorks />
            <DesignedFor />
            <About />
            <MenuPreview />
            <Testimonials />
            <InstagramFeed />
            <Contact />
            <FinalCTA />
          </main>
          <Footer />
          <WhatsAppButton />
        </div>
      </CartProvider>
    </TrackingProvider>
  )
}

export default App
