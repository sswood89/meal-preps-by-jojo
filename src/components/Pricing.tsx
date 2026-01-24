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
  return (
    <section id="pricing" className="section bg-[#F0EBE3]">
      <div className="container">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="badge badge-accent mb-4">Pricing</span>
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
              className={`card p-8 ${
                plan.popular
                  ? 'ring-2 ring-[#C65D3B] relative'
                  : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-[#C65D3B] text-white text-xs font-semibold px-4 py-1.5 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
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
                <p className="text-[#6B8E6B] font-medium mt-1">
                  ${plan.pricePerMeal}/meal
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-[#6B8E6B] flex-shrink-0 mt-0.5"
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
                className={`w-full ${
                  plan.popular ? 'btn-primary' : 'btn-secondary'
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>

        {/* Trust Note */}
        <div className="text-center mt-12">
          <p className="text-[#737373] text-sm flex items-center justify-center gap-2">
            <svg className="w-4 h-4 text-[#6B8E6B]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            30-day money-back guarantee • Cancel anytime • Free delivery in LA
          </p>
        </div>
      </div>
    </section>
  );
}

export default Pricing;
