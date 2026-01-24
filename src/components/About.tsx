const highlights = [
  '100% organic ingredients from local farms',
  'Customizable to any dietary preference',
  'Former celebrity personal chef',
  'ServSafe certified kitchen',
];

function About() {
  return (
    <section id="about" className="section bg-[#FAF7F2]">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl bg-[#F0EBE3] overflow-hidden">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center p-8">
                  <span className="text-8xl block mb-4">👩‍🍳</span>
                  <p className="text-[#737373] text-lg">Chef JoJo Photo</p>
                </div>
              </div>
            </div>

            {/* Experience Badge */}
            <div className="absolute -bottom-4 -right-4 bg-white rounded-xl p-5 shadow-lg border border-[#E5E5E5]">
              <div className="text-3xl font-semibold text-[#C65D3B]">10+</div>
              <div className="text-sm text-[#737373]">Years Experience</div>
            </div>
          </div>

          {/* Content */}
          <div>
            <span className="badge badge-accent mb-4">About the Chef</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold text-[#1C1C1C] mb-4">
              Meet Chef JoJo
            </h2>
            <p className="text-lg text-[#525252] mb-6">
              Hi, I'm Johanna — but everyone calls me JoJo. After years as an executive
              assistant to celebrities in Los Angeles, I discovered my true passion:
              creating nourishing, delicious meals that make people feel their best.
            </p>

            <blockquote className="border-l-4 border-[#C65D3B] pl-6 py-2 mb-8">
              <p className="text-xl text-[#1C1C1C] italic font-display">
                "I believe everyone deserves to eat like a star — fresh, organic,
                and made with love."
              </p>
            </blockquote>

            {/* Highlights */}
            <ul className="space-y-3 mb-8">
              {highlights.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-[#6B8E6B] flex-shrink-0"
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
            <div className="flex flex-wrap gap-3">
              {['Organic Certified', 'ServSafe', 'Local Sourced'].map((cert) => (
                <span
                  key={cert}
                  className="px-4 py-2 bg-white rounded-lg border border-[#E5E5E5] text-sm text-[#525252]"
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
