import { motion } from 'framer-motion';
import SectionLabel from './ui/SectionLabel';

function DesignedFor() {
  return (
    <section className="py-20 lg:py-24 bg-[#F9F9F9]">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative group"
          >
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-[#E67E50]/5 via-transparent to-[#7FB685]/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
              <img
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80"
                alt="Busy professionals enjoying healthy meals"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <SectionLabel>WHO WE SERVE</SectionLabel>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold text-[#1C1C1C] mb-8">
              Organic Meal Prep for Busy Los Angeles Professionals
            </h2>

            <div className="grid sm:grid-cols-2 gap-8 mb-10">
              {/* Target Audience */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-[#E67E50] mb-3">
                  BUILT FOR
                </h3>
                <p className="text-[#525252] leading-relaxed">
                  Busy entrepreneurs, fitness enthusiasts, and health-conscious families
                  who demand premium nutrition without the time commitment of meal planning
                  and cooking.
                </p>
              </div>

              {/* Benefits */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-[#7FB685] mb-3">
                  EXPERIENCE
                </h3>
                <p className="text-[#525252] leading-relaxed">
                  Enjoy restaurant-quality meals with precise macro tracking and customizable
                  options. Every dish reflects Chef JoJo's commitment to organic ingredients
                  and bold, satisfying flavors.
                </p>
              </div>
            </div>

            {/* CTA */}
            <a href="#pricing" className="btn-primary inline-flex">
              <span>Discover Your Perfect Plan</span>
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default DesignedFor;
