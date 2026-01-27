import SectionLabel from './ui/SectionLabel';

const highlights = [
  '100% USDA organic ingredients sourced from Southern California farms',
  'Fully customizable to keto, paleo, vegan, and medical diets',
  'Former private chef to Los Angeles entertainment industry',
  'ServSafe certified commercial kitchen facility',
  'Over 25,000 meals prepared and delivered since 2020',
];

function About() {
  return (
    <section id="about" className="section bg-[#FAF7F2]">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div className="relative">
            {/* Decorative background */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-[#E67E50]/5 via-transparent to-[#7FB685]/5 blur-xl" />

            <div className="relative aspect-[4/5] rounded-3xl bg-gradient-to-br from-[#F0EBE3] to-[#E5E0D8] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
              {/* Professional headshot placeholder - circular frame */}
              <div className="w-full h-full flex items-center justify-center p-12">
                <div className="w-full max-w-[280px] aspect-square rounded-full bg-gradient-to-br from-[#E5E0D8] to-[#D4CFC7] shadow-[inset_0_4px_20px_rgba(0,0,0,0.1)] overflow-hidden border-4 border-white/50">
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-8xl block animate-float-slow">👩‍🍳</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Experience Badge */}
            <div className="absolute -bottom-4 -right-4 animate-float-delay">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-5 shadow-[0_8px_30px_rgba(0,0,0,0.1)] border border-white/50">
                <div className="text-3xl font-semibold text-gradient">10+</div>
                <div className="text-sm text-[#737373]">Years Experience</div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <SectionLabel>MEET THE CHEF</SectionLabel>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold text-[#1C1C1C] mb-4">
              Meet Chef JoJo
            </h2>
            <p className="text-lg text-[#525252] mb-6">
              Hi, I'm Johanna — but everyone calls me JoJo. After years as an executive
              assistant to celebrities in Los Angeles, I discovered my true passion:
              creating nourishing, delicious meals that make people feel their best.
            </p>

            {/* Enhanced Pull Quote */}
            <blockquote className="relative pl-6 py-4 mb-8 bg-gradient-to-r from-[#E67E50]/8 to-transparent rounded-r-xl border-l-4 border-[#E67E50]">
              <p className="text-[1.5rem] text-[#2C2C2C] italic font-display leading-relaxed">
                "Every meal I create is an opportunity to nourish your body and elevate your day. That's the JoJo promise."
              </p>
            </blockquote>

            {/* Highlights - Expanded to 5 */}
            <ul className="space-y-3 mb-8">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
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
                  <span className="text-[#525252]">{item}</span>
                </li>
              ))}
            </ul>

            {/* Certifications */}
            <div className="flex flex-wrap gap-2">
              {['Organic Certified', 'ServSafe', 'Local Sourced'].map((cert) => (
                <span
                  key={cert}
                  className="px-4 py-2.5 bg-white rounded-xl border border-[#E5E5E5]/80 text-sm text-[#525252] shadow-sm hover:shadow-md hover:border-[#E67E50]/20 transition-all duration-300 cursor-default"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
