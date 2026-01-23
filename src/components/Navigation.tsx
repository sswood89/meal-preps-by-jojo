import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavigationLink {
  label: string;
  href: string;
}

const navigationLinks: readonly NavigationLink[] = [
  { label: 'Pricing', href: '#pricing' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'About', href: '#about' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
] as const;

function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Update active section based on scroll position
      const sections = navigationLinks.map(link => link.href.replace('#', ''));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <>
      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 lg:hidden"
            onClick={handleMobileMenuToggle}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'glass-dark border-b border-[#D4AF37]/30 shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo with Pulse Animation */}
            <motion.a
              href="#"
              className="flex items-center space-x-3 group relative z-50"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.2,
                type: "spring",
                stiffness: 200
              }}
            >
              <motion.span
                className="text-3xl group-hover:scale-110 transition-transform duration-300"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
              >
                🍽️
              </motion.span>
              <div className="flex flex-col">
                <span className="text-xs text-gray-400 tracking-widest uppercase leading-none">
                  Meal Preps by
                </span>
                <span className="text-xl font-bold text-gradient-gold tracking-wide">
                  JOJO
                </span>
              </div>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigationLinks.map((link, index) => {
                const sectionId = link.href.replace('#', '');
                const isActive = activeSection === sectionId;

                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                    className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 group ${
                      isActive ? 'text-[#D4AF37]' : 'text-white'
                    }`}
                  >
                    {link.label}

                    {/* Gold Underline Animation on Hover */}
                    <motion.span
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-[#D4AF37] via-[#E5C453] to-[#D4AF37] rounded-full"
                      initial={{ scaleX: 0, opacity: 0 }}
                      whileHover={{ scaleX: 1, opacity: 1 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      style={{ originX: 0.5 }}
                    />

                    {/* Active Section Indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#D4AF37] rounded-full shadow-sm shadow-[#D4AF37]/50"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </motion.a>
                );
              })}
            </div>

            {/* Desktop CTA Button with Enhanced Glow */}
            <motion.div
              className="hidden lg:block"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <motion.a
                href="#contact"
                className="relative inline-flex items-center px-6 py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#E5C453] text-[#0f0f0f] font-semibold rounded-full transition-all duration-300 btn-glow group overflow-hidden"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 25px rgba(212, 175, 55, 0.5), 0 0 50px rgba(212, 175, 55, 0.3)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Animated Background Shine */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />

                <span className="relative z-10">Get Started</span>
                <motion.svg
                  className="w-4 h-4 ml-2 relative z-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  initial={{ x: 0 }}
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.3 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </motion.svg>
              </motion.a>
            </motion.div>

            {/* Mobile Menu Button - Animated Hamburger to X */}
            <motion.button
              type="button"
              onClick={handleMobileMenuToggle}
              className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-lg text-white hover:text-[#D4AF37] hover:bg-white/5 transition-all duration-200 z-50"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle navigation menu"
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative w-6 h-5">
                <motion.span
                  animate={isMobileMenuOpen ? {
                    rotate: 45,
                    y: 8,
                    backgroundColor: '#D4AF37'
                  } : {
                    rotate: 0,
                    y: 0,
                    backgroundColor: 'currentColor'
                  }}
                  className="absolute top-0 left-0 w-6 h-0.5 rounded-full"
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                />
                <motion.span
                  animate={isMobileMenuOpen ? {
                    opacity: 0,
                    x: 10
                  } : {
                    opacity: 1,
                    x: 0
                  }}
                  className="absolute top-2 left-0 w-6 h-0.5 bg-current rounded-full"
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                />
                <motion.span
                  animate={isMobileMenuOpen ? {
                    rotate: -45,
                    y: -8,
                    backgroundColor: '#D4AF37'
                  } : {
                    rotate: 0,
                    y: 0,
                    backgroundColor: 'currentColor'
                  }}
                  className="absolute top-4 left-0 w-6 h-0.5 rounded-full"
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                />
              </div>
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu - Slide in from Right */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30
            }}
            className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] glass-dark border-l border-[#D4AF37]/30 z-40 lg:hidden shadow-2xl shadow-black/50"
          >
            <div className="flex flex-col h-full pt-24 pb-8 px-6">
              {/* Mobile Navigation Links */}
              <nav className="flex-1 space-y-2">
                {navigationLinks.map((link, index) => {
                  const sectionId = link.href.replace('#', '');
                  const isActive = activeSection === sectionId;

                  return (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={handleLinkClick}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      transition={{
                        delay: 0.1 + index * 0.05,
                        duration: 0.3
                      }}
                      className={`block text-lg font-medium px-4 py-3 rounded-lg transition-all duration-200 ${
                        isActive
                          ? 'text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/30'
                          : 'text-white hover:text-[#D4AF37] hover:bg-white/5'
                      }`}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="flex items-center">
                        {link.label}
                        {isActive && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="ml-auto w-2 h-2 bg-[#D4AF37] rounded-full"
                          />
                        )}
                      </span>
                    </motion.a>
                  );
                })}
              </nav>

              {/* Mobile CTA */}
              <motion.a
                href="#contact"
                onClick={handleLinkClick}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.4 }}
                className="relative w-full text-center bg-gradient-to-r from-[#D4AF37] to-[#E5C453] text-[#0f0f0f] font-semibold px-6 py-3 rounded-full shadow-lg shadow-[#D4AF37]/30 btn-glow overflow-hidden group"
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
                <span className="relative z-10 flex items-center justify-center">
                  Get Started
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navigation;
