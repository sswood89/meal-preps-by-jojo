import Navigation from './components/Navigation'
import Hero from './components/Hero'
import TrustBadges from './components/TrustBadges'
import Pricing from './components/Pricing'
import MenuPreview from './components/MenuPreview'
import HowItWorks from './components/HowItWorks'
import About from './components/About'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <Navigation />
      <main>
        <Hero />
        <TrustBadges />
        <Pricing />
        <MenuPreview />
        <HowItWorks />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
