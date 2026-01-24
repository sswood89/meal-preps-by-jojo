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
          <span className="badge badge-sage mb-4">How It Works</span>
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
            <div key={step.number} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-px bg-[#E5E5E5] -translate-y-1/2 z-0" />
              )}

              <div className="relative z-10">
                {/* Icon */}
                <div className="w-24 h-24 rounded-2xl bg-white border border-[#E5E5E5] flex items-center justify-center text-4xl mb-6 shadow-sm">
                  {step.icon}
                </div>

                {/* Step Number */}
                <div className="text-[#C65D3B] font-semibold text-sm mb-2">
                  Step {step.number}
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-[#1C1C1C] mb-2">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-[#525252] text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <a href="#pricing" className="btn-primary">
            Start Your Plan Today
          </a>
          <p className="text-[#737373] text-sm mt-4">
            No commitment required. Cancel anytime.
          </p>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
