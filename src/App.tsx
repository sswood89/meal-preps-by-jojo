import Navigation from './components/Navigation'
import Hero from './components/Hero'
import Pricing from './components/Pricing'
import MenuPreview from './components/MenuPreview'
import HowItWorks from './components/HowItWorks'
import About from './components/About'
import Testimonials from './components/Testimonials'
import InstagramFeed from './components/InstagramFeed'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Navigation />
      <main>
        <Hero />
        <Pricing />
        <HowItWorks />
        <About />
        <MenuPreview />
        <Testimonials />
        <InstagramFeed />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
