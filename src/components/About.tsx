import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import AnimatedSection, { StaggerContainer, StaggerItem } from './ui/AnimatedSection';

interface HighlightItemProps {
  icon: string;
  text: string;
  delay: number;
}

function HighlightItem({ icon, text, delay }: HighlightItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="flex items-start space-x-4 group"
    >
      <span className="text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
        {icon}
      </span>
      <p className="text-gray-300 leading-relaxed">{text}</p>
    </motion.div>
  );
}

interface StatItemProps {
  value: number;
  label: string;
  delay: number;
  suffix?: string;
  prefix?: string;
}

function StatItem({ value, label, delay, suffix = '', prefix = '' }: StatItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 50,
    stiffness: 100,
  });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      setDisplayValue(Math.round(latest));
    });
    return unsubscribe;
  }, [springValue]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.1, type: 'spring' }}
        className="text-3xl md:text-4xl lg:text-5xl font-bold gold-text mb-2 font-display"
      >
        {prefix}
        <motion.span>{isInView ? displayValue : 0}</motion.span>
        {suffix}
      </motion.div>
      <div className="text-sm md:text-base text-gray-400">{label}</div>
    </motion.div>
  );
}

interface MilestoneItemProps {
  year: string;
  title: string;
  description: string;
  delay: number;
}

function MilestoneItem({ year, title, description, delay }: MilestoneItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      className="relative pl-8 pb-8 border-l-2 border-[#D4AF37]/30 last:border-l-0 last:pb-0"
    >
      {/* Timeline dot */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.2, type: 'spring' }}
        className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#D4AF37] shadow-lg shadow-[#D4AF37]/50"
      />
      <div className="gold-text text-sm font-bold mb-1">{year}</div>
      <h4 className="text-white text-lg font-semibold mb-2">{title}</h4>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}

interface ValueCardProps {
  icon: string;
  title: string;
  description: string;
  delay: number;
}

function ValueCard({ icon, title, description, delay }: ValueCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="card-premium p-6 text-center group"
    >
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        className="text-5xl mb-4 inline-block"
      >
        {icon}
      </motion.div>
      <h4 className="text-white text-xl font-bold mb-3 font-display">{title}</h4>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}

const highlights = [
  {
    icon: '🌱',
    text: '100% organic ingredients sourced from local farms and trusted suppliers',
  },
  {
    icon: '❤️',
    text: 'Every meal crafted with love, attention to detail, and culinary expertise',
  },
  {
    icon: '✨',
    text: 'Customizable to any dietary preference—vegan, keto, gluten-free, and more',
  },
  {
    icon: '⭐',
    text: 'Celebrity-level service and quality, now available for everyone',
  },
];

const certifications = [
  { name: 'ServSafe Certified', icon: '🛡️' },
  { name: 'Organic Certified', icon: '🌿' },
  { name: 'Local Sourced', icon: '🚜' },
];

const milestones = [
  {
    year: '2019',
    title: 'The Beginning',
    description: 'Started as a celebrity executive assistant, learning the art of perfection and attention to detail from the best.',
  },
  {
    year: '2021',
    title: 'Culinary Passion Ignited',
    description: 'Transitioned into personal chef services, combining hospitality expertise with culinary creativity.',
  },
  {
    year: '2022',
    title: 'Meal Preps by Jojo Born',
    description: 'Launched Meal Preps by Jojo to bring celebrity-quality meal prep services to everyone.',
  },
  {
    year: '2024',
    title: 'Community Growth',
    description: 'Served 500+ satisfied customers and prepared over 10,000 healthy, delicious meals.',
  },
];

const values = [
  {
    icon: '🌟',
    title: 'Quality First',
    description: 'Only the finest organic ingredients make it into our meals. No compromises, ever.',
  },
  {
    icon: '💚',
    title: 'Made with Love',
    description: 'Every dish is prepared with the same care and passion we bring to our own family meals.',
  },
  {
    icon: '🎯',
    title: 'Your Goals, Our Mission',
    description: 'Whether it\'s fitness, health, or convenience, we tailor every meal to support your journey.',
  },
];

function About() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="about"
      className="relative py-24 lg:py-32 bg-gradient-to-b from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f] overflow-hidden"
    >
      {/* Background pattern texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#22C55E]/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#D4AF37]/3 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-16">
          <span className="inline-block text-[#D4AF37] text-sm font-semibold tracking-widest uppercase mb-4">
            The Chef
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-display">
            Meet Chef Jojo
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto" />
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
          {/* Photo Column with Parallax */}
          <AnimatedSection animation="fadeInLeft" className="flex justify-center lg:justify-end">
            <div className="relative" ref={parallaxRef}>
              {/* Decorative rotating ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-6 border-2 border-dashed border-[#D4AF37]/20 rounded-full"
              />

              {/* Decorative gold ring behind */}
              <div className="absolute -inset-4 rounded-full border-4 border-[#D4AF37]/20" />

              {/* Main photo frame with parallax effect */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                style={{
                  transformStyle: 'preserve-3d',
                }}
                className="relative w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full border-4 border-[#D4AF37] overflow-hidden shadow-2xl shadow-[#D4AF37]/20"
              >
                {/* Placeholder image with parallax inner */}
                <motion.div
                  initial={{ scale: 1.2 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                  className="w-full h-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="text-center">
                    <div className="text-7xl mb-4">👩‍🍳</div>
                    <p className="text-gray-700 font-medium px-4">
                      Chef Jojo's Photo
                    </p>
                  </div>
                </motion.div>

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </motion.div>

              {/* Decorative accent */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: 'spring' }}
                className="absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-br from-[#D4AF37] to-[#E5C453] rounded-full flex items-center justify-center shadow-lg"
              >
                <span className="text-3xl">✨</span>
              </motion.div>

              {/* Experience badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="absolute top-4 -left-4 bg-[#0f0f0f] border border-[#D4AF37]/30 rounded-lg px-4 py-2 shadow-xl"
              >
                <div className="text-[#D4AF37] font-bold text-lg">3+</div>
                <div className="text-gray-400 text-xs">Years Experience</div>
              </motion.div>
            </div>
          </AnimatedSection>

          {/* Content Column */}
          <AnimatedSection animation="fadeInRight" className="space-y-8">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 font-display">
                Johanna Lawrence
              </h3>
              <p className="text-xl text-[#D4AF37] mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                Los Angeles, California
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Former celebrity executive assistant turned passionate chef,
                bringing years of experience serving high-profile clients to
                every meal I create.
              </p>
            </div>

            {/* Handwritten-style Quote */}
            <motion.blockquote
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative pl-6 border-l-4 border-[#D4AF37] py-4 my-8"
            >
              <span className="absolute -left-4 -top-2 text-[#D4AF37]/20 text-6xl font-serif">"</span>
              <p className="text-xl md:text-2xl text-white italic font-light leading-relaxed font-script">
                "My mission is simple: to bring the quality, care, and attention
                to detail I provided for celebrities into your home. Every meal
                is a testament to my belief that everyone deserves to eat like a
                star."
              </p>
              <footer className="text-[#D4AF37] mt-4 font-medium flex items-center gap-2">
                <motion.span
                  initial={{ width: 0 }}
                  whileInView={{ width: 32 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="h-0.5 bg-[#D4AF37]"
                />
                <span className="font-script text-lg">Chef Jojo</span>
              </footer>
            </motion.blockquote>

            {/* Highlights */}
            <div className="space-y-4 pt-4">
              {highlights.map((highlight, index) => (
                <HighlightItem
                  key={index}
                  icon={highlight.icon}
                  text={highlight.text}
                  delay={0.1 * index}
                />
              ))}
            </div>

            {/* Certifications */}
            <div className="flex flex-wrap gap-3 pt-4">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2"
                >
                  <span>{cert.icon}</span>
                  <span className="text-gray-300 text-sm font-medium">{cert.name}</span>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>

        {/* Animated Stats Section with Counter */}
        <AnimatedSection delay={0.3} className="mt-20 pt-12 border-t border-gray-800">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h3 className="text-3xl font-bold text-white font-display">By the Numbers</h3>
            <p className="text-gray-400 mt-2">Our journey in numbers</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <StatItem value={500} suffix="+" label="Happy Customers" delay={0.4} />
            <StatItem value={10000} suffix="+" label="Meals Prepared" delay={0.5} />
            <StatItem value={3} suffix="+" label="Years of Excellence" delay={0.6} />
          </div>
        </AnimatedSection>

        {/* Journey Timeline */}
        <AnimatedSection delay={0.4} className="mt-24">
          <div className="text-center mb-12">
            <span className="inline-block text-[#D4AF37] text-sm font-semibold tracking-widest uppercase mb-4">
              The Journey
            </span>
            <h3 className="text-3xl md:text-4xl font-bold text-white font-display mb-4">
              Chef Jojo's Story
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              From celebrity executive assistant to your personal chef—a journey driven by passion, dedication, and love for good food.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <MilestoneItem
                key={milestone.year}
                year={milestone.year}
                title={milestone.title}
                description={milestone.description}
                delay={0.1 * index}
              />
            ))}
          </div>
        </AnimatedSection>

        {/* Our Mission & Promise Cards */}
        <AnimatedSection delay={0.5} className="mt-24">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Mission Card */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="card-premium p-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-2xl font-bold text-white font-display">Our Mission</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                To make nutritious, chef-quality meals accessible to everyone. We believe healthy eating shouldn't be a luxury—it should be a lifestyle. By combining culinary expertise with thoughtful meal planning, we empower you to achieve your health goals without sacrificing flavor or time.
              </p>
            </motion.div>

            {/* Promise Card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="card-premium p-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#22C55E]/20 flex items-center justify-center">
                  <span className="text-2xl">💎</span>
                </div>
                <h3 className="text-2xl font-bold text-white font-display">Our Promise</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Every meal is prepared with the same attention to detail and quality standards we've delivered to celebrities. We promise fresh, organic ingredients, customized nutrition, and flavors that make healthy eating something you'll actually look forward to. Your success is our success.
              </p>
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Team Values */}
        <AnimatedSection delay={0.6} className="mt-24">
          <div className="text-center mb-12">
            <span className="inline-block text-[#D4AF37] text-sm font-semibold tracking-widest uppercase mb-4">
              Our Values
            </span>
            <h3 className="text-3xl md:text-4xl font-bold text-white font-display">
              What We Stand For
            </h3>
          </div>

          <StaggerContainer className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {values.map((value, index) => (
              <StaggerItem key={value.title}>
                <ValueCard
                  icon={value.icon}
                  title={value.title}
                  description={value.description}
                  delay={0.1 * index}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </AnimatedSection>

        {/* Behind the Kitchen Section */}
        <AnimatedSection delay={0.7} className="mt-24">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white font-display mb-4">
              Behind the Kitchen
            </h3>
            <p className="text-gray-400">See where the magic happens</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {['Fresh Prep', 'Quality Check', 'Ready to Go'].map((label, index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 * index }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="relative aspect-square rounded-2xl overflow-hidden group cursor-pointer"
              >
                {/* Placeholder */}
                <div className="w-full h-full bg-gradient-to-br from-[#242424] to-[#1a1a1a] flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                  <span className="text-6xl">
                    {index === 0 ? '🥬' : index === 1 ? '👩‍🍳' : '📦'}
                  </span>
                </div>
                {/* Label overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6">
                  <span className="text-white text-lg font-semibold font-display">{label}</span>
                </div>
                {/* Hover border effect */}
                <div className="absolute inset-0 border-2 border-[#D4AF37]/0 group-hover:border-[#D4AF37]/50 transition-colors duration-300 rounded-2xl" />
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

export default About;
