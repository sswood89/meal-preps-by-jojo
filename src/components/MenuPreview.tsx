import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from './ui/AnimatedSection';

interface Meal {
  id: string;
  name: string;
  category: string;
  emoji: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  tags: string[];
}

interface DayMenu {
  day: string;
  meals: Meal[];
}

const weeklyMenu: DayMenu[] = [
  {
    day: 'Monday',
    meals: [
      { id: '1', name: 'Grilled Salmon Bowl', category: 'Protein', emoji: '🐟', calories: 450, protein: 35, carbs: 30, fat: 18, tags: ['Keto-Friendly', 'High Protein'] },
      { id: '2', name: 'Mediterranean Quinoa', category: 'Balanced', emoji: '🥗', calories: 380, protein: 15, carbs: 45, fat: 12, tags: ['Vegan Option'] },
    ],
  },
  {
    day: 'Tuesday',
    meals: [
      { id: '3', name: 'Herb Chicken Breast', category: 'Protein', emoji: '🍗', calories: 420, protein: 40, carbs: 25, fat: 15, tags: ['High Protein', 'Gluten-Free'] },
      { id: '4', name: 'Thai Peanut Tofu', category: 'Plant-Based', emoji: '🥜', calories: 350, protein: 20, carbs: 35, fat: 14, tags: ['Vegan', 'High Protein'] },
    ],
  },
  {
    day: 'Wednesday',
    meals: [
      { id: '5', name: 'Grass-Fed Beef Stir Fry', category: 'Protein', emoji: '🥩', calories: 480, protein: 38, carbs: 28, fat: 22, tags: ['High Protein', 'Low Carb'] },
      { id: '6', name: 'Buddha Bowl', category: 'Balanced', emoji: '🥬', calories: 320, protein: 12, carbs: 42, fat: 10, tags: ['Vegan', 'Fiber-Rich'] },
    ],
  },
  {
    day: 'Thursday',
    meals: [
      { id: '7', name: 'Lemon Garlic Shrimp', category: 'Seafood', emoji: '🦐', calories: 380, protein: 32, carbs: 22, fat: 16, tags: ['Keto-Friendly', 'Low Carb'] },
      { id: '8', name: 'Chickpea Curry', category: 'Plant-Based', emoji: '🍛', calories: 340, protein: 14, carbs: 48, fat: 8, tags: ['Vegan', 'High Fiber'] },
    ],
  },
  {
    day: 'Friday',
    meals: [
      { id: '9', name: 'Turkey Meatballs', category: 'Protein', emoji: '🧆', calories: 400, protein: 35, carbs: 30, fat: 14, tags: ['High Protein', 'Family Favorite'] },
      { id: '10', name: 'Asian Veggie Bowl', category: 'Plant-Based', emoji: '🥡', calories: 310, protein: 10, carbs: 50, fat: 8, tags: ['Vegan', 'Low Fat'] },
    ],
  },
];

const dietaryTags = ['All', 'High Protein', 'Vegan', 'Keto-Friendly', 'Gluten-Free'];

function MenuPreview() {
  const [selectedDay, setSelectedDay] = useState(0);
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredMeals = weeklyMenu[selectedDay].meals.filter(
    (meal) => activeFilter === 'All' || meal.tags.includes(activeFilter)
  );

  return (
    <section className="py-24 lg:py-32 bg-gradient-to-b from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection className="text-center mb-12">
          <span className="inline-block text-[#D4AF37] text-sm font-semibold tracking-widest uppercase mb-4">
            Sample Menu
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-display">
            This Week's Menu
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Fresh, rotating menu with meals crafted for every dietary preference
          </p>
        </AnimatedSection>

        {/* Day Selector */}
        <AnimatedSection delay={0.1} className="mb-8">
          <div className="flex justify-center gap-2 flex-wrap">
            {weeklyMenu.map((day, index) => (
              <button
                key={day.day}
                onClick={() => setSelectedDay(index)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedDay === index
                    ? 'bg-[#D4AF37] text-[#0f0f0f]'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {day.day}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Dietary Filters */}
        <AnimatedSection delay={0.2} className="mb-10">
          <div className="flex justify-center gap-2 flex-wrap">
            {dietaryTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 border ${
                  activeFilter === tag
                    ? 'border-[#22C55E] bg-[#22C55E]/10 text-[#22C55E]'
                    : 'border-gray-700 text-gray-500 hover:border-gray-600 hover:text-gray-400'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Meal Cards */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedDay}-${activeFilter}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 gap-6"
            >
              {filteredMeals.length > 0 ? (
                filteredMeals.map((meal, index) => (
                  <motion.div
                    key={meal.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -4 }}
                    className="bg-[#242424] rounded-2xl p-6 border border-gray-800 hover:border-[#D4AF37]/30 transition-all group"
                  >
                    {/* Meal Header */}
                    <div className="flex items-start gap-4 mb-4">
                      {/* Emoji placeholder for image */}
                      <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center text-4xl shadow-lg group-hover:scale-105 transition-transform">
                        {meal.emoji}
                      </div>
                      <div className="flex-1">
                        <span className="text-[#D4AF37] text-xs font-medium uppercase tracking-wider">
                          {meal.category}
                        </span>
                        <h3 className="text-white text-lg font-bold mt-1">
                          {meal.name}
                        </h3>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {meal.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-gray-400"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Macros */}
                    <div className="grid grid-cols-4 gap-2 pt-4 border-t border-gray-700/50">
                      <div className="text-center">
                        <div className="text-white font-bold text-lg">{meal.calories}</div>
                        <div className="text-gray-500 text-xs">cal</div>
                      </div>
                      <div className="text-center">
                        <div className="text-[#22C55E] font-bold text-lg">{meal.protein}g</div>
                        <div className="text-gray-500 text-xs">protein</div>
                      </div>
                      <div className="text-center">
                        <div className="text-[#D4AF37] font-bold text-lg">{meal.carbs}g</div>
                        <div className="text-gray-500 text-xs">carbs</div>
                      </div>
                      <div className="text-center">
                        <div className="text-[#FF6B6B] font-bold text-lg">{meal.fat}g</div>
                        <div className="text-gray-500 text-xs">fat</div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-2 text-center py-12 text-gray-500">
                  No meals match the selected filter for this day.
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CTA */}
        <AnimatedSection delay={0.3} className="text-center mt-12">
          <p className="text-gray-400 mb-4">
            Menu rotates weekly. Customize any meal to your preferences.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-[#D4AF37]/50 text-[#D4AF37] rounded-full hover:bg-[#D4AF37]/10 transition-all font-medium"
          >
            <span>Request Full Menu</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}

export default MenuPreview;
