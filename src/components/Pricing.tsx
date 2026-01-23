import { motion, useInView } from 'framer-motion';
import { useState, useRef } from 'react';
import AnimatedSection, { StaggerContainer, StaggerItem } from './ui/AnimatedSection';

interface PricingFeature {
  text: string;
  icon: string;
}

interface PricingPlan {
  name: string;
  subtitle: string;
  meals: number;
  price: number;
  pricePerMeal: number;
  features: PricingFeature[];
  isRecommended?: boolean;
  badge?: string;
  savings?: string;
  weeklyComparison?: string;
}

type PlanPeriod = 'weekly' | 'bi-weekly' | 'monthly';

const pricingPlans: PricingPlan[] = [
  {
    name: 'Weekly Plan',
    subtitle: 'Perfect starter',
    meals: 15,
    price: 350,
    pricePerMeal: 23.33,
    features: [
      { text: '100% Organic Ingredients', icon: '🌱' },
      { text: 'Fresh Daily Preparation', icon: '✨' },
      { text: 'Choose Your Proteins', icon: '🍗' },
      { text: 'Choose Your Sides', icon: '🥗' },
      { text: 'Free LA Delivery', icon: '🚚' },
    ],
    isRecommended: false,
  },
  {
    name: '2-Week Plan',
    subtitle: 'Most popular',
    meals: 30,
    price: 600,
    pricePerMeal: 20,
    features: [
      { text: '100% Organic Ingredients', icon: '🌱' },
      { text: 'Fresh Daily Preparation', icon: '✨' },
      { text: 'Choose Your Proteins', icon: '🍗' },
      { text: 'Choose Your Sides', icon: '🥗' },
      { text: '5 Meals Per Day', icon: '📦' },
      { text: 'Free LA Delivery', icon: '🚚' },
      { text: 'Flexible Scheduling', icon: '📅' },
    ],
    isRecommended: true,
    badge: 'MOST POPULAR',
    savings: 'Save $100 vs weekly',
    weeklyComparison: 'vs $700 weekly',
  },
  {
    name: 'Monthly Plan',
    subtitle: 'Best value',
    meals: 60,
    price: 1080,
    pricePerMeal: 18,
    features: [
      { text: '100% Organic Ingredients', icon: '🌱' },
      { text: 'Fresh Daily Preparation', icon: '✨' },
      { text: 'Full Menu Customization', icon: '📝' },
      { text: 'Pick Your Proteins & Sides', icon: '🍗' },
      { text: 'Priority Support', icon: '⭐' },
      { text: 'Free LA Delivery', icon: '🚚' },
      { text: 'Nutrition Consultation', icon: '💪' },
      { text: 'First-Access to New Menus', icon: '🎯' },
    ],
    isRecommended: false,
    badge: 'Best Value',
    savings: 'Save $320 vs weekly',
    weeklyComparison: 'vs $1,400 weekly',
  },
];

const AnimatedCheckIcon: React.FC<{ delay?: number }> = ({ delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0, rotate: -180 }}
      animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
      transition={{ delay, duration: 0.5, type: 'spring', stiffness: 200 }}
    >
      <svg
        className="w-5 h-5 flex-shrink-0 text-[#22C55E]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2.5}
          d="M5 13l4 4L19 7"
        />
      </svg>
    </motion.div>
  );
};

interface MealPreviewProps {
  mealType: string;
}

const MealPreview: React.FC<MealPreviewProps> = ({ mealType }) => (
  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center text-lg shadow-sm">
    {mealType}
  </div>
);

const Pricing: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<PlanPeriod>('bi-weekly');

  return (
    <section id="pricing" className="py-24 lg:py-32 px-4 bg-[#0f0f0f] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#22C55E]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Title */}
        <AnimatedSection className="text-center mb-12">
          <span className="inline-block text-[#D4AF37] text-sm font-semibold tracking-widest uppercase mb-4">
            Pricing Plans
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-display">
            Choose Your Plan
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Premium organic meals starting at just <span className="text-gradient-gold font-bold">$18/meal</span>.
            Cancel anytime.
          </p>
        </AnimatedSection>

        {/* Period Toggle */}
        <AnimatedSection delay={0.2} className="flex justify-center mb-12">
          <div className="inline-flex items-center gap-2 p-2 bg-[#1a1a1a] rounded-full border border-gray-800">
            {(['weekly', 'bi-weekly', 'monthly'] as PlanPeriod[]).map((period) => (
              <motion.button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  selectedPeriod === period
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#E5C453] text-[#0f0f0f]'
                    : 'text-gray-400 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {period === 'bi-weekly' ? 'Bi-Weekly' : period.charAt(0).toUpperCase() + period.slice(1)}
              </motion.button>
            ))}
          </div>
        </AnimatedSection>

        {/* Pricing Cards Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto items-end">
          {pricingPlans.map((plan, index) => (
            <StaggerItem key={plan.name}>
              <motion.div
                whileHover={{
                  y: -12,
                  transition: { duration: 0.3, ease: 'easeOut' }
                }}
                className={`card-premium relative rounded-3xl transition-all duration-300 ${
                  plan.isRecommended
                    ? 'ring-2 ring-[#D4AF37] shadow-2xl shadow-[#D4AF37]/30 scale-105 md:scale-110 z-10'
                    : 'border border-gray-800 hover:border-[#D4AF37]/30 hover:shadow-xl hover:shadow-[#D4AF37]/10'
                }`}
              >
                {/* Pulsing glow effect for recommended plan */}
                {plan.isRecommended && (
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37] to-[#E5C453] rounded-3xl blur-lg opacity-30 animate-pulse-glow -z-10" />
                )}

                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                    <motion.div
                      animate={{
                        scale: [1, 1.05, 1],
                        boxShadow: [
                          '0 0 20px rgba(212, 175, 55, 0.3)',
                          '0 0 30px rgba(212, 175, 55, 0.5)',
                          '0 0 20px rgba(212, 175, 55, 0.3)',
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      className="relative"
                    >
                      <div className="absolute inset-0 bg-[#D4AF37] blur-md opacity-50" />
                      <span className="relative bg-gradient-to-r from-[#D4AF37] to-[#E5C453] text-[#0f0f0f] text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider shadow-lg block">
                        {plan.badge}
                      </span>
                    </motion.div>
                  </div>
                )}

                {/* Savings badge */}
                {plan.savings && (
                  <motion.div
                    initial={{ scale: 0, rotate: -10 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3 + index * 0.1, type: 'spring', stiffness: 200 }}
                    className="absolute -top-3 right-4"
                  >
                    <span className="bg-gradient-to-r from-[#22C55E] to-[#16a34a] text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      {plan.savings}
                    </span>
                  </motion.div>
                )}

                <div className={`p-8 ${plan.isRecommended ? 'pt-12' : 'pt-8'}`}>
                  {/* Meal previews */}
                  <div className="flex -space-x-2 mb-4">
                    <MealPreview mealType="🥗" />
                    <MealPreview mealType="🍗" />
                    <MealPreview mealType="🥦" />
                    <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] text-xs font-bold">
                      +{plan.meals - 3}
                    </div>
                  </div>

                  {/* Plan Name */}
                  <h3
                    className={`text-2xl lg:text-3xl font-bold mb-1 ${
                      plan.isRecommended ? 'text-[#D4AF37]' : 'text-white'
                    }`}
                  >
                    {plan.name}
                  </h3>

                  {/* Subtitle */}
                  <p className="text-gray-500 text-sm mb-6">
                    {plan.subtitle} • {plan.meals} meals
                  </p>

                  {/* Pricing */}
                  <div className="mb-8">
                    <div className="flex items-baseline gap-2">
                      <span className={`text-5xl lg:text-6xl font-bold ${plan.isRecommended ? 'text-[#D4AF37]' : 'text-white'}`}>
                        ${plan.price}
                      </span>
                      <span className="text-gray-500 text-lg">total</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`text-xl font-semibold ${plan.isRecommended ? 'text-[#D4AF37]' : 'text-[#22C55E]'}`}>
                        ${plan.pricePerMeal}
                      </span>
                      <span className="text-gray-400">per meal</span>
                    </div>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + featureIndex * 0.05 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3"
                      >
                        <AnimatedCheckIcon delay={0.4 + featureIndex * 0.05} />
                        <span className="text-gray-300 text-sm leading-relaxed">
                          {feature.text}
                        </span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`btn-glow w-full py-4 px-6 rounded-xl font-bold text-base transition-all duration-300 ${
                      plan.isRecommended
                        ? 'bg-gradient-to-r from-[#D4AF37] to-[#E5C453] text-[#0f0f0f] hover:shadow-lg hover:shadow-[#D4AF37]/30'
                        : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
                    }`}
                  >
                    Get Started
                  </motion.button>

                  {/* Money back guarantee - now on all plans */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center text-gray-500 text-xs mt-4 flex items-center justify-center gap-1"
                  >
                    <svg className="w-4 h-4 text-[#22C55E]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    100% Money-back guarantee
                  </motion.p>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Comparison Table */}
        <AnimatedSection delay={0.5} className="mt-20 max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-3 font-display">
              Compare Plans
            </h3>
            <p className="text-gray-400">See what's included in each plan</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-4 px-4 text-gray-400 font-semibold text-sm">Features</th>
                  <th className="text-center py-4 px-4">
                    <div className="text-white font-bold">Weekly</div>
                    <div className="text-[#D4AF37] text-sm">$350</div>
                  </th>
                  <th className="text-center py-4 px-4 bg-[#D4AF37]/5 rounded-t-xl">
                    <div className="text-[#D4AF37] font-bold">2-Week</div>
                    <div className="text-white text-sm">$600</div>
                  </th>
                  <th className="text-center py-4 px-4">
                    <div className="text-white font-bold">Monthly</div>
                    <div className="text-[#22C55E] text-sm">$1080</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Number of Meals', weekly: '15 meals', biweekly: '30 meals', monthly: '60 meals' },
                  { feature: 'Price per Meal', weekly: '$23.33', biweekly: '$20.00', monthly: '$18.00' },
                  { feature: 'Menu Customization', weekly: 'Standard', biweekly: 'Standard', monthly: 'Full' },
                  { feature: 'Priority Support', weekly: false, biweekly: false, monthly: true },
                  { feature: 'Nutrition Consultation', weekly: false, biweekly: false, monthly: true },
                  { feature: 'First-Access to New Menus', weekly: false, biweekly: false, monthly: true },
                  { feature: 'Free LA Delivery', weekly: true, biweekly: true, monthly: true },
                  { feature: 'Cancel Anytime', weekly: true, biweekly: true, monthly: true },
                ].map((row, index) => (
                  <motion.tr
                    key={row.feature}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.05 }}
                    viewport={{ once: true }}
                    className="border-b border-gray-800/50 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-4 px-4 text-gray-300 font-medium">{row.feature}</td>
                    <td className="py-4 px-4 text-center text-gray-400">
                      {typeof row.weekly === 'boolean' ? (
                        row.weekly ? (
                          <svg className="w-5 h-5 text-[#22C55E] mx-auto" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-gray-600 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        )
                      ) : (
                        row.weekly
                      )}
                    </td>
                    <td className="py-4 px-4 text-center bg-[#D4AF37]/5">
                      {typeof row.biweekly === 'boolean' ? (
                        row.biweekly ? (
                          <svg className="w-5 h-5 text-[#22C55E] mx-auto" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-gray-600 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        )
                      ) : (
                        <span className="text-white font-semibold">{row.biweekly}</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center text-gray-400">
                      {typeof row.monthly === 'boolean' ? (
                        row.monthly ? (
                          <svg className="w-5 h-5 text-[#22C55E] mx-auto" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-gray-600 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        )
                      ) : (
                        row.monthly
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </AnimatedSection>

        {/* Money-Back Guarantee Badge */}
        <AnimatedSection delay={0.6} className="mt-16 text-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#22C55E]/10 to-[#16a34a]/10 border border-[#22C55E]/30 rounded-2xl"
          >
            <svg className="w-12 h-12 text-[#22C55E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <div className="text-left">
              <div className="text-white font-bold text-lg">30-Day Money-Back Guarantee</div>
              <div className="text-gray-400 text-sm">Try risk-free. Not satisfied? Get a full refund.</div>
            </div>
          </motion.div>
        </AnimatedSection>

        {/* Bottom trust indicators */}
        <AnimatedSection delay={0.7} className="mt-12 text-center">
          <div className="flex flex-wrap justify-center gap-8 text-gray-500">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#22C55E]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#22C55E]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Free delivery in LA</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#22C55E]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>100% organic guaranteed</span>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Pricing;
