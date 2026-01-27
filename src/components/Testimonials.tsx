import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionLabel from './ui/SectionLabel';

const testimonials = [
  {
    name: 'Sarah M.',
    role: 'Fitness Coach',
    quote: "JoJo's meal prep has transformed how my clients reach their goals. Every meal arrives perfectly portioned with accurate macros. My athletes love the taste, and I love the results we're seeing.",
    rating: 5,
    verified: true,
    image: null,
  },
  {
    name: 'Marcus T.',
    role: 'Tech Entrepreneur',
    quote: "As a startup founder working 80-hour weeks, JoJo's service is my secret weapon. I'm eating healthier than ever without spending a minute in the kitchen. The convenience is unmatched.",
    rating: 5,
    verified: true,
    image: null,
  },
  {
    name: 'Jennifer L.',
    role: 'Working Parent of 3',
    quote: "Our entire household is now on the family plan. My kids actually ask for seconds on the healthy meals! JoJo's flavors are restaurant-quality, and knowing everything is organic gives me peace of mind.",
    rating: 5,
    verified: true,
    image: null,
  },
  {
    name: 'David R.',
    role: 'Busy Professional',
    quote: 'I no longer stress about meal prep. Everything arrives fresh and ready to heat. The quality is outstanding and the variety keeps me excited about healthy eating.',
    rating: 5,
    verified: true,
    image: null,
  },
  {
    name: 'Michelle T.',
    role: 'Working Mom',
    quote: "My whole family loves the meals. It's healthy food that actually tastes amazing. Worth every penny for the time and stress it saves me.",
    rating: 5,
    verified: true,
    image: null,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: rating }).map((_, i) => (
        <svg
          key={i}
          className="w-4 h-4 text-[#E67E50]"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function VerifiedBadge() {
  return (
    <span className="verified-badge">
      <svg viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
      Verified Customer
    </span>
  );
}

function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-rotate every 5 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Get visible testimonials (3 at a time on desktop)
  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      visible.push(testimonials[(activeIndex + i) % testimonials.length]);
    }
    return visible;
  };

  return (
    <section id="testimonials" className="section bg-[#F0EBE3]">
      <div className="container">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <SectionLabel>CLIENT STORIES</SectionLabel>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold text-[#1C1C1C] mb-4">
            What Our Customers Say
          </h2>
          <p className="text-[#525252] text-lg">
            Join 500+ happy customers eating healthier
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Desktop: 3 cards */}
          <div className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8">
            <AnimatePresence mode="wait">
              {getVisibleTestimonials().map((testimonial, index) => (
                <motion.div
                  key={`${testimonial.name}-${activeIndex}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="card p-8 group"
                >
                  {/* Quote mark decorative */}
                  <div className="absolute top-6 right-6 text-6xl text-[#E67E50]/10 font-display leading-none select-none">
                    "
                  </div>

                  {/* Stars */}
                  <div className="mb-5">
                    <StarRating rating={testimonial.rating} />
                  </div>

                  {/* Quote */}
                  <p className="text-[#525252] mb-6 leading-relaxed text-[15px] relative z-10">
                    "{testimonial.quote}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 border-t border-[#E5E5E5]/60">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#E67E50]/20 to-[#7FB685]/20 flex items-center justify-center text-[#1C1C1C] font-semibold text-sm shadow-inner border-2 border-white">
                      {testimonial.name[0]}
                    </div>
                    <div>
                      <div className="font-semibold text-[#1C1C1C] text-sm flex items-center gap-2">
                        {testimonial.name}
                      </div>
                      <div className="text-[#737373] text-xs mb-1">
                        {testimonial.role}
                      </div>
                      {testimonial.verified && <VerifiedBadge />}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Mobile: Single card carousel */}
          <div className="md:hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="card p-8"
              >
                {/* Quote mark decorative */}
                <div className="absolute top-6 right-6 text-6xl text-[#E67E50]/10 font-display leading-none select-none">
                  "
                </div>

                {/* Stars */}
                <div className="mb-5">
                  <StarRating rating={testimonials[activeIndex].rating} />
                </div>

                {/* Quote */}
                <p className="text-[#525252] mb-6 leading-relaxed text-[15px] relative z-10">
                  "{testimonials[activeIndex].quote}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-[#E5E5E5]/60">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#E67E50]/20 to-[#7FB685]/20 flex items-center justify-center text-[#1C1C1C] font-semibold text-sm shadow-inner border-2 border-white">
                    {testimonials[activeIndex].name[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-[#1C1C1C] text-sm">
                      {testimonials[activeIndex].name}
                    </div>
                    <div className="text-[#737373] text-xs mb-1">
                      {testimonials[activeIndex].role}
                    </div>
                    {testimonials[activeIndex].verified && <VerifiedBadge />}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? 'bg-[#E67E50] w-8'
                    : 'bg-[#D4D4D4] hover:bg-[#A3A3A3]'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
