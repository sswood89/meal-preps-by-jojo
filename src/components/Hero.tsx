import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function Hero() {
  const [scrollY, setScrollY] = useState(0);

  // Parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Image with Parallax */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&w=1920&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `translateY(${scrollY * 0.5}px) scale(1.1)`,
        }}
      />

      {/* Enhanced Gradient Overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[rgba(0,0,0,0.3)] to-[rgba(0,0,0,0.1)]" />
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#FAF7F2]/95 via-[#FAF7F2]/80 to-[#FAF7F2]/60" />

      {/* Subtle grain texture overlay */}
      <div
        className="absolute inset-0 z-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="container py-16 lg:py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            {/* Animated Tagline Bar */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6"
            >
              <span className="inline-block px-4 py-2 bg-[#E67E50]/10 border border-[#E67E50]/20 rounded-full text-[#E67E50] text-sm font-semibold tracking-[0.2em] uppercase">
                ORDER · SAVOR · THRIVE
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <span className="badge badge-accent mb-4">
                Now Serving Los Angeles
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-4xl sm:text-5xl lg:text-[3.5rem] font-display font-semibold text-[#1C1C1C] leading-[1.1] mb-6"
              style={{ textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
            >
              Fresh, Organic Meals Delivered to Your Door
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-lg text-[#525252] mb-8 max-w-lg leading-relaxed"
            >
              Premium meal prep crafted by Chef JoJo using 100% organic ingredients.
              Every dish is customizable to your lifestyle and delivered fresh across Los Angeles.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex gap-8 mb-8 pb-8 border-b border-[#E5E5E5]/60"
            >
              <div className="group">
                <div className="text-3xl font-semibold text-[#1C1C1C] transition-colors group-hover:text-[#E67E50]">500+</div>
                <div className="text-sm text-[#737373]">Happy Customers</div>
              </div>
              <div className="group">
                <div className="text-3xl font-semibold text-[#1C1C1C] transition-colors group-hover:text-[#7FB685]">100%</div>
                <div className="text-sm text-[#737373]">Organic</div>
              </div>
              <div className="group">
                <div className="text-3xl font-semibold text-[#1C1C1C] transition-colors group-hover:text-[#E67E50]">5★</div>
                <div className="text-sm text-[#737373]">Rating</div>
              </div>
            </motion.div>

            {/* CTA Buttons - 24px gap */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-6"
            >
              <a href="#pricing" className="btn-primary group">
                <span>View Plans</span>
                <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a href="#how-it-works" className="btn-secondary">
                <span>How It Works</span>
              </a>
            </motion.div>
          </div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="order-1 lg:order-2"
          >
            <div className="relative">
              {/* Decorative ring behind image */}
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-[#E67E50]/10 via-transparent to-[#7FB685]/10 blur-xl" />

              {/* Main Image Container */}
              <div className="relative aspect-square rounded-[2rem] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.15)] ring-1 ring-black/5">
                <img
                  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80"
                  alt="Fresh healthy meal bowl with vegetables"
                  className="w-full h-full object-cover"
                />
                {/* Subtle overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
              </div>

              {/* Floating Badge - Organic Certification */}
              <div className="absolute -bottom-4 -left-4 animate-float-slow">
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-white/50">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#7FB685]/15 to-[#7FB685]/5 flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#7FB685]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-[#1C1C1C] text-sm">Certified Organic</div>
                      <div className="text-xs text-[#737373]">USDA Approved</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Price Badge */}
              <div className="absolute -top-4 -right-4 animate-float-delay">
                <div className="bg-gradient-to-br from-[#E67E50] to-[#D86D40] text-white rounded-2xl px-5 py-3.5 shadow-[0_8px_30px_rgba(230,126,80,0.3)]">
                  <div className="text-[10px] uppercase tracking-widest opacity-80 mb-0.5">Starting at</div>
                  <div className="text-xl font-semibold">$18/meal</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
