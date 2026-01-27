import { motion } from 'framer-motion';
import SectionLabel from './ui/SectionLabel';

interface Badge {
  icon: string;
  title: string;
  description: string;
}

const badges: Badge[] = [
  {
    icon: '🌱',
    title: '100% USDA Organic',
    description: 'Certified organic ingredients',
  },
  {
    icon: '🛡️',
    title: 'ServSafe Certified',
    description: 'Commercial kitchen standards',
  },
  {
    icon: '🚜',
    title: 'Farm-to-Table',
    description: 'Local SoCal farms',
  },
  {
    icon: '⭐',
    title: '500+ Happy Customers',
    description: '5-star average rating',
  },
  {
    icon: '📍',
    title: 'Based in Los Angeles',
    description: 'Free delivery across LA',
  },
];

function TrustBadges() {
  return (
    <section className="py-12 bg-white border-y border-[#E5E5E5]/50">
      <div className="container">
        {/* Section Label - Centered */}
        <div className="text-center mb-8">
          <SectionLabel>TRUSTED BY LA'S HEALTH-CONSCIOUS COMMUNITY</SectionLabel>
        </div>

        {/* Horizontal Badge Row */}
        <div className="flex flex-wrap justify-center gap-6 lg:gap-10">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group flex items-center gap-3 p-3 rounded-xl grayscale-hover"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-[#F9F9F9] flex items-center justify-center text-2xl group-hover:bg-[#E67E50]/10 transition-colors">
                <span>{badge.icon}</span>
              </div>

              {/* Text */}
              <div>
                <h3 className="text-[#1C1C1C] font-semibold text-sm">
                  {badge.title}
                </h3>
                <p className="text-[#737373] text-xs">
                  {badge.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrustBadges;
