function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Image with Blur */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&w=1920&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(3px)',
          transform: 'scale(1.05)',
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#FAF7F2]/95 via-[#FAF7F2]/85 to-[#FAF7F2]/70" />

      {/* Content */}
      <div className="container py-16 lg:py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <span className="badge badge-accent mb-6">
              Now Serving Los Angeles
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold text-[#1C1C1C] leading-[1.1] mb-6">
              Fresh, Organic Meals Delivered to Your Door
            </h1>

            <p className="text-lg text-[#525252] mb-8 max-w-lg">
              Chef-prepared meals using 100% organic ingredients.
              Customizable to your diet. Delivered fresh across LA.
            </p>

            {/* Stats */}
            <div className="flex gap-8 mb-8 pb-8 border-b border-[#E5E5E5]">
              <div>
                <div className="text-3xl font-semibold text-[#1C1C1C]">500+</div>
                <div className="text-sm text-[#737373]">Happy Customers</div>
              </div>
              <div>
                <div className="text-3xl font-semibold text-[#1C1C1C]">100%</div>
                <div className="text-sm text-[#737373]">Organic</div>
              </div>
              <div>
                <div className="text-3xl font-semibold text-[#1C1C1C]">5★</div>
                <div className="text-sm text-[#737373]">Rating</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#pricing" className="btn-primary">
                View Plans
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a href="#how-it-works" className="btn-secondary">
                How It Works
              </a>
            </div>
          </div>

          {/* Hero Image */}
          <div className="order-1 lg:order-2">
            <div className="relative">
              {/* Main Image Container */}
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80"
                  alt="Fresh healthy meal bowl with vegetables"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-4 shadow-lg border border-[#E5E5E5]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#6B8E6B]/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#6B8E6B]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-[#1C1C1C] text-sm">Certified Organic</div>
                    <div className="text-xs text-[#737373]">USDA Approved</div>
                  </div>
                </div>
              </div>

              {/* Floating Price Badge */}
              <div className="absolute -top-4 -right-4 bg-[#C65D3B] text-white rounded-xl px-4 py-3 shadow-lg">
                <div className="text-xs uppercase tracking-wide opacity-90">Starting at</div>
                <div className="text-xl font-semibold">$18/meal</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
