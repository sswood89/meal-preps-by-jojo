import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import AnimatedSection from './ui/AnimatedSection';

interface Step {
  number: number;
  title: string;
  description: string;
  icon: string;
  color: string;
}

const steps: Step[] = [
  {
    number: 1,
    title: 'Choose Your Plan',
    description: 'Select weekly, 2-week, or monthly. Easily pause or cancel anytime.',
    icon: '📋',
    color: '#D4AF37',
  },
  {
    number: 2,
    title: 'Customize Your Meals',
    description: 'Pick your proteins, sides, and dietary preferences. Vegan, keto, gluten-free—we have it all.',
    icon: '🎨',
    color: '#22C55E',
  },
  {
    number: 3,
    title: 'We Prepare Fresh',
    description: 'Chef Jojo crafts your meals daily with 100% organic ingredients from local farms.',
    icon: '👩‍🍳',
    color: '#3B82F6',
  },
  {
    number: 4,
    title: 'Free Delivery',
    description: 'Your meals arrive fresh at your door anywhere in Los Angeles. Free, always.',
    icon: '🚚',
    color: '#F59E0B',
  },
];

function StepCard({ step, index }: { step: Step; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="relative"
    >
      {/* Connection line to next step */}
      {index < steps.length - 1 && (
        <>
          {/* Desktop: Horizontal line */}
          <div className="hidden lg:block absolute top-12 left-full w-full h-0.5">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
              className="h-full bg-gradient-to-r from-gray-700 via-[#D4AF37]/50 to-gray-700 origin-left"
            />
          </div>
          {/* Mobile: Vertical line */}
          <div className="lg:hidden absolute left-1/2 top-full -translate-x-1/2 w-0.5 h-8">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
              className="h-full bg-gradient-to-b from-[#D4AF37]/50 to-transparent origin-top"
            />
          </div>
        </>
      )}

      {/* Step Card */}
      <motion.div
        whileHover={{ y: -8, transition: { duration: 0.2 } }}
        className="relative group"
      >
        {/* Glow effect */}
        <div
          className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"
          style={{ backgroundColor: step.color }}
        />

        <div className="relative bg-[#1a1a1a] rounded-2xl p-6 lg:p-8 border border-gray-800 group-hover:border-gray-700 transition-all">
          {/* Number badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.4, delay: index * 0.15 + 0.1, type: 'spring' }}
            className="absolute -top-4 -left-2 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-lg"
            style={{ backgroundColor: step.color, color: '#0f0f0f' }}
          >
            {step.number}
          </motion.div>

          {/* Icon */}
          <div className="flex justify-center mb-4 mt-2">
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: index * 0.5 }}
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-5xl"
              style={{ backgroundColor: `${step.color}15` }}
            >
              {step.icon}
            </motion.div>
          </div>

          {/* Title */}
          <h3 className="text-xl lg:text-2xl font-bold text-white mb-3 text-center">
            {step.title}
          </h3>

          {/* Description */}
          <p className="text-gray-400 text-sm lg:text-base leading-relaxed text-center">
            {step.description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 lg:py-32 bg-[#0f0f0f] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#22C55E]/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Section Title */}
        <AnimatedSection className="text-center mb-16 lg:mb-20">
          <span className="inline-block text-[#D4AF37] text-sm font-semibold tracking-widest uppercase mb-4">
            Simple Process
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-display">
            How It Works
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            From ordering to enjoying—it couldn't be easier
          </p>
        </AnimatedSection>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {steps.map((step, index) => (
            <StepCard key={step.number} step={step} index={index} />
          ))}
        </div>

        {/* CTA */}
        <AnimatedSection delay={0.6} className="text-center mt-16 lg:mt-20">
          <motion.a
            href="#pricing"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-[#D4AF37] to-[#E5C453] text-[#0f0f0f] font-bold px-8 py-4 rounded-full shadow-xl hover:shadow-2xl hover:shadow-[#D4AF37]/30 transition-all duration-300"
          >
            <span>Get Started Today</span>
            <motion.svg
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </motion.svg>
          </motion.a>
          <p className="text-gray-500 text-sm mt-4">
            No commitment required. Cancel anytime.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}

export default HowItWorks;
