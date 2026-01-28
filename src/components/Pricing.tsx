import { useState } from 'react';
import SectionLabel from './ui/SectionLabel';
import { useTracking } from '../providers/TrackingProvider';
import { useCart } from '../providers/CartProvider';
import { CheckoutModal } from './Checkout';

const plans = [
  {
    name: 'Weekly',
    meals: 15,
    price: 350,
    pricePerMeal: 23,
    features: [
      '15 meals per week',
      'Organic ingredients',
      'Choose your proteins',
      'Free LA delivery',
    ],
  },
  {
    name: '2-Week',
    meals: 30,
    price: 600,
    pricePerMeal: 20,
    popular: true,
    features: [
      '30 meals over 2 weeks',
      'Organic ingredients',
      'Full customization',
      'Free LA delivery',
      'Flexible scheduling',
    ],
  },
  {
    name: 'Monthly',
    meals: 60,
    price: 1080,
    pricePerMeal: 18,
    savings: 180,
    urgency: 'Only 15 slots available this month',
    features: [
      '60 meals per month',
      'Organic ingredients',
      'Full customization',
      'Free LA delivery',
      'Priority support',
      'Nutrition consultation',
    ],
  },
];

function Pricing() {
  const { trackPlanSelect } = useTracking();
  const { setSelectedPlan } = useCart();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedPlanName, setSelectedPlanName] = useState<string | undefined>();

  const handlePlanSelect = (plan: typeof plans[0]) => {
    trackPlanSelect(plan.name, plan.price);
    setSelectedPlan({ name: plan.name, price: plan.price, meals: plan.meals });
    setSelectedPlanName(plan.name);
    setCheckoutOpen(true);
  };

  return (
    <section id="pricing" className="section bg-[#F0EBE3]">
      <div className="container">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <SectionLabel>OUR PLANS</SectionLabel>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold text-[#1C1C1C] mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-[#525252] text-lg">
            Choose the plan that fits your lifestyle. Cancel anytime.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`card p-8 card-hover-lift overflow-hidden ${
                plan.popular
                  ? 'ring-premium scale-[1.02] z-10'
                  : ''
              }`}
            >
              {/* Ribbon Badge for Popular */}
              {plan.popular && (
                <div className="badge-ribbon">
                  Most Popular
                </div>
              )}

              {/* Savings Badge for Monthly */}
              {plan.savings && (
                <div className="absolute top-4 left-4">
                  <span className="bg-[#7FB685]/15 text-[#7FB685] text-[11px] font-bold px-3 py-1.5 rounded-full border border-[#7FB685]/30">
                    SAVE ${plan.savings}/MONTH
                  </span>
                </div>
              )}

              <div className={`mb-6 ${plan.savings ? 'mt-8' : ''}`}>
                <h3 className="text-xl font-semibold text-[#1C1C1C] mb-1">
                  {plan.name}
                </h3>
                <p className="text-sm text-[#737373]">
                  {plan.meals} meals
                </p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-semibold text-[#1C1C1C]">
                    ${plan.price}
                  </span>
                  <span className="text-[#737373]">total</span>
                </div>
                <p className="text-[#7FB685] font-medium mt-1">
                  ${plan.pricePerMeal}/meal
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-[#7FB685] flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-[#525252] text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handlePlanSelect(plan)}
                className={`w-full ${
                  plan.popular ? 'btn-primary' : 'btn-secondary'
                }`}
              >
                <span>Get Started</span>
              </button>

              {/* Urgency Text */}
              {plan.urgency && (
                <p className="text-center text-xs text-[#E67E50] font-medium mt-4">
                  {plan.urgency}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Enhanced Trust Note */}
        <div className="text-center mt-12">
          <p className="text-[#525252] text-sm max-w-2xl mx-auto mb-4">
            All plans include free delivery, flexible scheduling, and our satisfaction guarantee. Cancel anytime with no penalties.
          </p>
          <p className="text-[#737373] text-sm flex items-center justify-center gap-2">
            <svg className="w-4 h-4 text-[#7FB685]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            30-day money-back guarantee
          </p>
        </div>
      </div>

      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        planName={selectedPlanName}
      />
    </section>
  );
}

export default Pricing;
