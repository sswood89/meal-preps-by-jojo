import { motion } from 'framer-motion';
import SectionLabel from './ui/SectionLabel';

const steps = [
  {
    number: '01',
    title: 'Choose Your Plan',
    description: 'Select weekly, bi-weekly, or monthly. Pause or cancel anytime.',
    icon: '📋',
  },
  {
    number: '02',
    title: 'Customize Your Meals',
    description: 'Pick proteins, sides, and dietary preferences. We accommodate all diets.',
    icon: '🎯',
  },
  {
    number: '03',
    title: 'We Prepare Fresh',
    description: 'Chef JoJo crafts your meals daily with 100% organic ingredients.',
    icon: '👩‍🍳',
  },
  {
    number: '04',
    title: 'Free Delivery',
    description: 'Your meals arrive fresh at your door anywhere in Los Angeles.',
    icon: '🚚',
  },
];

function HowItWorks() {
  return (
    <section id="how-it-works" className="section bg-[#FAF7F2]">
      <div className="container">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <SectionLabel>THE PROCESS</SectionLabel>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold text-[#1C1C1C] mb-4">
            Getting Started is Easy
          </h2>
          <p className="text-[#525252] text-lg">
            From ordering to enjoying — it couldn't be simpler
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className="relative group"
            >
              {/* Dotted Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-full w-full z-0 px-4">
                  <div className="w-full border-t-2 border-dashed border-[#E67E50]/30" />
                </div>
              )}

              <div className="relative z-10">
                {/* Step Number Circle */}
                <div className="w-20 h-20 rounded-full border-2 border-[#E67E50] bg-white flex items-center justify-center mb-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all duration-300 group-hover:shadow-[0_8px_30px_rgba(230,126,80,0.15)] group-hover:scale-105 group-hover:bg-[#E67E50]/5 mx-auto lg:mx-0">
                  <span className="text-3xl">{step.icon}</span>
                </div>

                {/* Step Number Badge */}
                <div className="text-[#E67E50] font-semibold text-xs uppercase tracking-widest mb-2">
                  Step {step.number}
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-[#1C1C1C] mb-2 group-hover:text-[#E67E50] transition-colors duration-300">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-[#525252] text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced CTA */}
        <div className="text-center mt-16">
          <p className="text-[#1C1C1C] text-lg font-medium mb-4">
            Ready to transform your weekly meal routine?
          </p>
          <a href="#pricing" className="btn-primary">
            Choose Your First Week
          </a>
          <p className="text-[#737373] text-sm mt-4">
            No contracts. Cancel anytime. First week satisfaction guaranteed.
          </p>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
