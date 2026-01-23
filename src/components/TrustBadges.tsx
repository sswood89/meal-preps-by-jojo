import { motion } from 'framer-motion';
import AnimatedSection from './ui/AnimatedSection';

interface Badge {
  icon: string;
  title: string;
  description: string;
  color: string;
}

const badges: Badge[] = [
  {
    icon: '🌱',
    title: 'Certified Organic',
    description: 'USDA organic certified ingredients',
    color: '#22C55E',
  },
  {
    icon: '🛡️',
    title: 'Food Safety',
    description: 'ServSafe certified kitchen',
    color: '#3B82F6',
  },
  {
    icon: '🚜',
    title: 'Local Farms',
    description: 'Partnered with LA farmers',
    color: '#D4AF37',
  },
  {
    icon: '⭐',
    title: '500+ Customers',
    description: '5-star average rating',
    color: '#F59E0B',
  },
];

function TrustBadges() {
  return (
    <section className="py-16 bg-[#0f0f0f] border-y border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {badges.map((badge, index) => (
              <motion.div
                key={badge.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="flex flex-col items-center text-center p-4 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/5 hover:border-white/10 transition-all"
              >
                {/* Icon with glow */}
                <div
                  className="relative w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-3"
                  style={{ backgroundColor: `${badge.color}15` }}
                >
                  <span>{badge.icon}</span>
                  <div
                    className="absolute inset-0 rounded-2xl opacity-50 blur-md"
                    style={{ backgroundColor: `${badge.color}20` }}
                  />
                </div>

                {/* Title */}
                <h3 className="text-white font-semibold text-sm lg:text-base mb-1">
                  {badge.title}
                </h3>

                {/* Description */}
                <p className="text-gray-500 text-xs lg:text-sm">
                  {badge.description}
                </p>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

export default TrustBadges;
