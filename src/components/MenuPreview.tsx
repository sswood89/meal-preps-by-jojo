import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionLabel from './ui/SectionLabel';

const meals = [
  {
    id: 1,
    name: 'Grilled Salmon Bowl',
    description: 'Wild-caught Atlantic salmon with quinoa, edamame, and sesame ginger dressing',
    category: 'High Protein',
    emoji: '🐟',
    calories: 450,
    protein: 35,
    badge: 'CHEF\'S FAVORITE',
  },
  {
    id: 2,
    name: 'Mediterranean Quinoa',
    description: 'Fluffy quinoa with roasted vegetables, feta, olives, and lemon herb vinaigrette',
    category: 'Balanced',
    emoji: '🥗',
    calories: 380,
    protein: 15,
    badge: null,
  },
  {
    id: 3,
    name: 'Herb Chicken Breast',
    description: 'Free-range chicken with roasted sweet potato and seasonal greens',
    category: 'High Protein',
    emoji: '🍗',
    calories: 420,
    protein: 40,
    badge: 'CUSTOMER TOP PICK',
  },
  {
    id: 4,
    name: 'Thai Peanut Tofu',
    description: 'Crispy organic tofu with peanut sauce, jasmine rice, and stir-fried vegetables',
    category: 'Plant-Based',
    emoji: '🥜',
    calories: 350,
    protein: 20,
    badge: null,
  },
  {
    id: 5,
    name: 'Grass-Fed Beef Stir Fry',
    description: 'Tender grass-fed beef with broccoli, bell peppers, and garlic soy glaze',
    category: 'High Protein',
    emoji: '🥩',
    calories: 480,
    protein: 38,
    badge: null,
  },
  {
    id: 6,
    name: 'Buddha Bowl',
    description: 'Roasted chickpeas, avocado, purple cabbage, and tahini drizzle over brown rice',
    category: 'Plant-Based',
    emoji: '🥬',
    calories: 320,
    protein: 12,
    badge: 'CHEF\'S FAVORITE',
  },
];

const filters = ['All', 'High Protein', 'Plant-Based', 'Balanced'];

function MenuPreview() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [hoveredMeal, setHoveredMeal] = useState<number | null>(null);

  const filteredMeals = meals.filter(
    (meal) => activeFilter === 'All' || meal.category === activeFilter
  );

  const getCategoryBadgeClass = (category: string) => {
    if (category === 'Plant-Based') return 'badge-plant-based';
    if (category === 'High Protein') return 'badge-high-protein';
    return 'bg-[#525252]/20 text-[#A3A3A3] border border-[#525252]/30';
  };

  return (
    <section id="menu" className="section bg-[#1C1C1C]">
      <div className="container">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <SectionLabel className="text-[#F09670]">THIS WEEK'S OFFERINGS</SectionLabel>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold text-white mb-4">
            This Week's Menu
          </h2>
          <p className="text-[#A3A3A3] text-lg">
            Fresh, rotating menu crafted for every dietary preference
          </p>
        </div>

        {/* Filters */}
        <div className="flex justify-center gap-2 flex-wrap mb-10">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-gradient-to-r from-[#E67E50] to-[#F09670] text-white shadow-[0_4px_15px_rgba(230,126,80,0.3)]'
                  : 'bg-[#252525] text-[#A3A3A3] hover:bg-[#333] hover:text-white border border-[#333] hover:border-[#444]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Meal Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMeals.map((meal, index) => (
            <motion.div
              key={meal.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onMouseEnter={() => setHoveredMeal(meal.id)}
              onMouseLeave={() => setHoveredMeal(null)}
              className="group relative bg-gradient-to-br from-[#252525] to-[#1C1C1C] rounded-2xl p-6 border border-[#333] hover:border-[#E67E50]/30 transition-all duration-300 hover:shadow-[0_12px_24px_rgba(0,0,0,0.3)] hover:scale-[1.03] overflow-hidden"
            >
              {/* Badge */}
              {meal.badge && (
                <div className="absolute top-4 right-4 z-10">
                  <span className="px-2 py-1 bg-[#E67E50] text-white text-[9px] font-bold rounded-md shadow-lg">
                    {meal.badge}
                  </span>
                </div>
              )}

              {/* Meal Icon */}
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#333] to-[#2A2A2A] flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-inner">
                {meal.emoji}
              </div>

              {/* Dietary Badge */}
              <span className={`badge-dietary ${getCategoryBadgeClass(meal.category)}`}>
                {meal.category}
              </span>

              {/* Name */}
              <h3 className="text-white text-lg font-semibold mt-2 mb-2 group-hover:text-[#F09670] transition-colors duration-300">
                {meal.name}
              </h3>

              {/* Description */}
              <p className="text-[#737373] text-sm mb-4 line-clamp-2">
                {meal.description}
              </p>

              {/* Macros */}
              <div className="flex gap-6 pt-4 border-t border-[#333]">
                <div>
                  <div className="text-white font-semibold">{meal.calories}</div>
                  <div className="text-[#737373] text-[10px] uppercase tracking-wider">cal</div>
                </div>
                <div>
                  <div className="text-[#7FB685] font-semibold">{meal.protein}g</div>
                  <div className="text-[#737373] text-[10px] uppercase tracking-wider">protein</div>
                </div>
              </div>

              {/* View Details Button (appears on hover) */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: hoveredMeal === meal.id ? 1 : 0, y: hoveredMeal === meal.id ? 0 : 10 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-6 right-6"
              >
                <button className="px-4 py-2 bg-[#E67E50] text-white text-xs font-semibold rounded-lg hover:bg-[#D86D40] transition-colors shadow-lg">
                  View Details
                </button>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-[#737373] mb-4">
            Menu rotates weekly. All meals fully customizable.
          </p>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 text-[#F09670] font-medium hover:text-[#E67E50] transition-colors"
          >
            Request Full Menu
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

export default MenuPreview;
