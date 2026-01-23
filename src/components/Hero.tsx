import { motion } from 'framer-motion';
import { FloatingElement } from './ui/AnimatedSection';

// Meal container placeholder component
function MealContainer({
  delay = 0,
  className = '',
  mealType = 'Chicken Bowl'
}: {
  delay?: number;
  className?: string;
  mealType?: string;
}) {
  return (
    <FloatingElement delay={delay} duration={5 + delay} yOffset={15}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: delay + 0.3 }}
        className={`relative ${className}`}
      >
        {/* Container body */}
        <div className="relative bg-gradient-to-br from-[#242424] to-[#1a1a1a] rounded-2xl p-1 shadow-2xl border border-[#D4AF37]/20">
          {/* Image placeholder area */}
          <div className="aspect-square rounded-xl bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center overflow-hidden">
            <div className="text-center p-4">
              <span className="text-4xl block mb-2">🥗</span>
              <span className="text-xs text-gray-600 font-medium">{mealType}</span>
            </div>
          </div>
          {/* Lid effect */}
          <div className="absolute -top-1 left-2 right-2 h-2 bg-gradient-to-b from-[#D4AF37]/40 to-transparent rounded-t-xl" />
        </div>
        {/* Glow effect */}
        <div className="absolute inset-0 bg-[#D4AF37]/10 rounded-2xl blur-xl -z-10" />
      </motion.div>
    </FloatingElement>
  );
}

// Trust indicator component
function TrustIndicator({
  value,
  label,
  delay
}: {
  value: string;
  label: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col items-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4, delay: delay + 0.2, type: 'spring' }}
        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gradient-gold mb-1"
      >
        {value}
      </motion.div>
      <div className="text-xs sm:text-sm text-gray-400 text-center">{label}</div>
    </motion.div>
  );
}

function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0f0f0f] pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-[#22C55E]/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-[#D4AF37]/3 rounded-full blur-3xl" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(#D4AF37 1px, transparent 1px), linear-gradient(90deg, #D4AF37 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Column - Text Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            {/* Discount Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center mb-6"
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B6B] to-[#D4AF37] rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
                <div className="relative flex items-center gap-2 bg-gradient-to-r from-[#FF6B6B] to-[#D4AF37] text-white font-bold px-5 py-2.5 rounded-full shadow-xl">
                  <span className="animate-pulse">🔥</span>
                  <span className="text-sm sm:text-base">10% OFF First Order</span>
                  <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">Limited Time</span>
                </div>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-[1.1]"
            >
              <span className="block">Eat Clean,</span>
              <span className="block font-display gradient-text-animated">
                Stay Lean
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-3 font-light"
            >
              With Chef JoJo's Premium Meal Prep Service
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-base sm:text-lg text-gray-400 mb-8 max-w-xl mx-auto lg:mx-0"
            >
              100% organic, fresh daily meals delivered to your door in Los Angeles.
              Join <span className="text-[#D4AF37] font-semibold">500+ happy customers</span> eating better.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
            >
              <button
                onClick={() => scrollToSection('#pricing')}
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#E5C453] text-[#0f0f0f] font-bold rounded-full shadow-xl hover:shadow-2xl hover:shadow-[#D4AF37]/30 transform hover:scale-105 transition-all duration-300 text-base sm:text-lg btn-glow"
              >
                <span>View Plans</span>
                <svg
                  className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              <button
                onClick={() => scrollToSection('#how-it-works')}
                className="group inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0f0f0f] font-bold rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-base sm:text-lg"
              >
                <span>How It Works</span>
                <svg
                  className="w-5 h-5 ml-2 group-hover:translate-y-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="grid grid-cols-3 gap-4 sm:gap-8 max-w-md mx-auto lg:mx-0"
            >
              <TrustIndicator value="100%" label="Organic Ingredients" delay={0.6} />
              <TrustIndicator value="500+" label="Happy Customers" delay={0.7} />
              <TrustIndicator value="Fresh" label="Daily Preparation" delay={0.8} />
            </motion.div>
          </div>

          {/* Right Column - Floating Meal Grid */}
          <div className="relative order-1 lg:order-2 h-[400px] sm:h-[500px] lg:h-[600px]">
            {/* Main featured meal */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 sm:w-48 lg:w-56">
              <MealContainer delay={0} mealType="Signature Bowl" />
            </div>

            {/* Floating meals around */}
            <div className="absolute top-4 left-4 sm:top-8 sm:left-8 w-24 sm:w-28 lg:w-32">
              <MealContainer delay={0.2} mealType="Keto Plate" />
            </div>

            <div className="absolute top-0 right-8 sm:right-16 w-20 sm:w-24 lg:w-28">
              <MealContainer delay={0.4} mealType="Vegan Mix" />
            </div>

            <div className="absolute bottom-8 left-0 sm:left-4 w-24 sm:w-28 lg:w-32">
              <MealContainer delay={0.6} mealType="Protein Plus" />
            </div>

            <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 w-24 sm:w-28 lg:w-32">
              <MealContainer delay={0.8} mealType="Fresh Greens" />
            </div>

            <div className="absolute top-1/4 right-0 w-20 sm:w-24">
              <MealContainer delay={1} mealType="Power Bowl" />
            </div>

            {/* Decorative elements */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[400px] lg:w-[500px] h-[300px] sm:h-[400px] lg:h-[500px] border border-[#D4AF37]/10 rounded-full pointer-events-none"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[500px] lg:w-[600px] h-[400px] sm:h-[500px] lg:h-[600px] border border-[#D4AF37]/5 rounded-full pointer-events-none"
            />

            {/* Organic badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.2, type: 'spring' }}
              className="absolute bottom-1/4 left-1/4 bg-[#22C55E] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1"
            >
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              100% Organic
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0f0f0f] to-transparent pointer-events-none" />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 text-gray-500"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-gray-600 rounded-full flex items-start justify-center p-1"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-3 bg-[#D4AF37] rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Hero;
