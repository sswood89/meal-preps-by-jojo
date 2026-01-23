import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection, { StaggerContainer, StaggerItem } from './ui/AnimatedSection';

type Category = 'All' | 'Proteins' | 'Bowls' | 'Salads' | 'Keto' | 'Vegan';
type DietaryTag = 'Keto' | 'Vegan' | 'Gluten-Free' | 'High-Protein' | 'Low-Carb' | 'Dairy-Free';

interface Meal {
  id: string;
  name: string;
  category: Category;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  fiber: number;
  tags: DietaryTag[];
  isChefsPick?: boolean;
  isWeeklySpecial?: boolean;
  imageGradient: string;
}

const meals: Meal[] = [
  {
    id: '1',
    name: 'Mediterranean Power Bowl',
    category: 'Bowls',
    calories: 485,
    protein: 42,
    carbs: 38,
    fats: 18,
    fiber: 8,
    tags: ['High-Protein', 'Gluten-Free'],
    isChefsPick: true,
    imageGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  {
    id: '2',
    name: 'Teriyaki Salmon Delight',
    category: 'Proteins',
    calories: 425,
    protein: 38,
    carbs: 28,
    fats: 16,
    fiber: 4,
    tags: ['High-Protein', 'Gluten-Free'],
    isWeeklySpecial: true,
    imageGradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  },
  {
    id: '3',
    name: 'Keto Green Goddess',
    category: 'Keto',
    calories: 380,
    protein: 32,
    carbs: 12,
    fats: 24,
    fiber: 6,
    tags: ['Keto', 'Low-Carb', 'Gluten-Free'],
    isChefsPick: true,
    imageGradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  },
  {
    id: '4',
    name: 'Vegan Rainbow Stack',
    category: 'Vegan',
    calories: 350,
    protein: 18,
    carbs: 45,
    fats: 12,
    fiber: 12,
    tags: ['Vegan', 'Gluten-Free', 'High-Protein'],
    imageGradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  },
  {
    id: '5',
    name: 'Grilled Chicken Supreme',
    category: 'Proteins',
    calories: 445,
    protein: 46,
    carbs: 32,
    fats: 14,
    fiber: 5,
    tags: ['High-Protein', 'Gluten-Free'],
    imageGradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  },
  {
    id: '6',
    name: 'Caesar Protein Salad',
    category: 'Salads',
    calories: 395,
    protein: 36,
    carbs: 22,
    fats: 18,
    fiber: 6,
    tags: ['High-Protein', 'Gluten-Free'],
    isChefsPick: true,
    imageGradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
  },
  {
    id: '7',
    name: 'Asian Fusion Bowl',
    category: 'Bowls',
    calories: 465,
    protein: 34,
    carbs: 48,
    fats: 16,
    fiber: 7,
    tags: ['High-Protein', 'Dairy-Free'],
    imageGradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
  },
  {
    id: '8',
    name: 'Keto Beef & Broccoli',
    category: 'Keto',
    calories: 420,
    protein: 40,
    carbs: 14,
    fats: 22,
    fiber: 5,
    tags: ['Keto', 'Low-Carb', 'High-Protein'],
    imageGradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
  },
  {
    id: '9',
    name: 'Plant-Based Power',
    category: 'Vegan',
    calories: 385,
    protein: 22,
    carbs: 52,
    fats: 10,
    fiber: 14,
    tags: ['Vegan', 'High-Protein', 'Gluten-Free'],
    imageGradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
  },
  {
    id: '10',
    name: 'Southwest Chicken Fiesta',
    category: 'Proteins',
    calories: 475,
    protein: 44,
    carbs: 36,
    fats: 16,
    fiber: 8,
    tags: ['High-Protein', 'Gluten-Free'],
    imageGradient: 'linear-gradient(135deg, #ff6e7f 0%, #bfe9ff 100%)',
  },
  {
    id: '11',
    name: 'Greek Goddess Salad',
    category: 'Salads',
    calories: 365,
    protein: 28,
    carbs: 26,
    fats: 16,
    fiber: 7,
    tags: ['High-Protein', 'Gluten-Free'],
    isWeeklySpecial: true,
    imageGradient: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
  },
  {
    id: '12',
    name: 'Thai Basil Chicken',
    category: 'Bowls',
    calories: 455,
    protein: 38,
    carbs: 42,
    fats: 14,
    fiber: 6,
    tags: ['High-Protein', 'Dairy-Free'],
    isChefsPick: true,
    imageGradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  },
];

const categories: Category[] = ['All', 'Proteins', 'Bowls', 'Salads', 'Keto', 'Vegan'];

const tagColors: Record<DietaryTag, string> = {
  'Keto': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  'Vegan': 'bg-green-500/20 text-green-300 border-green-500/30',
  'Gluten-Free': 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  'High-Protein': 'bg-red-500/20 text-red-300 border-red-500/30',
  'Low-Carb': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  'Dairy-Free': 'bg-teal-500/20 text-teal-300 border-teal-500/30',
};

function MenuGallery() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [hoveredMeal, setHoveredMeal] = useState<string | null>(null);

  const filteredMeals = selectedCategory === 'All'
    ? meals
    : meals.filter(meal => meal.category === selectedCategory);

  return (
    <section id="menu" className="py-24 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[var(--gold)] rounded-full blur-[120px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[var(--gold-light)] rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <AnimatedSection animation="fadeInDown" className="text-center mb-16">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="inline-block mb-4"
          >
            <span className="inline-block px-6 py-2 bg-[var(--gold)]/10 border border-[var(--gold)]/30 rounded-full text-[var(--gold)] text-sm font-medium tracking-wider">
              CHEF-CRAFTED MEALS
            </span>
          </motion.div>
          <h2 className="font-display text-5xl md:text-6xl font-bold mb-6">
            Our Premium <span className="text-gradient-gold">Menu</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Expertly prepared, nutrition-balanced meals designed to fuel your goals and delight your taste buds
          </p>
        </AnimatedSection>

        {/* Category Filter */}
        <AnimatedSection animation="fadeInUp" delay={0.2} className="mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`
                  px-6 py-3 rounded-full font-medium transition-all duration-300
                  ${selectedCategory === category
                    ? 'bg-[var(--gold)] text-black shadow-lg shadow-[var(--gold)]/30'
                    : 'bg-[var(--dark-card)] text-gray-300 hover:bg-[var(--dark-elevated)] border border-gray-700'
                  }
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                layout
              >
                {category}
              </motion.button>
            ))}
          </div>
        </AnimatedSection>

        {/* Meals Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <AnimatePresence mode="wait">
            {filteredMeals.map((meal) => (
              <StaggerItem key={meal.id}>
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="card-premium relative overflow-hidden group cursor-pointer h-full"
                  onMouseEnter={() => setHoveredMeal(meal.id)}
                  onMouseLeave={() => setHoveredMeal(null)}
                  whileHover={{ y: -8 }}
                >
                  {/* Badges */}
                  <div className="absolute top-4 left-4 z-20 flex gap-2">
                    {meal.isChefsPick && (
                      <motion.span
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="px-3 py-1 bg-[var(--gold)] text-black text-xs font-bold rounded-full shadow-lg flex items-center gap-1"
                      >
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        Chef's Pick
                      </motion.span>
                    )}
                    {meal.isWeeklySpecial && (
                      <motion.span
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full shadow-lg animate-pulse-glow"
                      >
                        Weekly Special
                      </motion.span>
                    )}
                  </div>

                  {/* Image Area with Gradient */}
                  <div className="relative h-56 overflow-hidden rounded-t-3xl">
                    <motion.div
                      className="absolute inset-0"
                      style={{ background: meal.imageGradient }}
                      animate={{
                        scale: hoveredMeal === meal.id ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.4 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60" />

                    {/* Quick Stats Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                      <div className="flex gap-2">
                        <div className="glass px-3 py-1.5 rounded-lg">
                          <p className="text-xs text-gray-400">Calories</p>
                          <p className="text-white font-bold">{meal.calories}</p>
                        </div>
                        <div className="glass px-3 py-1.5 rounded-lg">
                          <p className="text-xs text-gray-400">Protein</p>
                          <p className="text-white font-bold">{meal.protein}g</p>
                        </div>
                        <div className="glass px-3 py-1.5 rounded-lg">
                          <p className="text-xs text-gray-400">Carbs</p>
                          <p className="text-white font-bold">{meal.carbs}g</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-display text-2xl font-bold mb-3 text-white group-hover:text-[var(--gold)] transition-colors">
                      {meal.name}
                    </h3>

                    {/* Dietary Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {meal.tags.slice(0, hoveredMeal === meal.id ? meal.tags.length : 2).map((tag) => (
                        <motion.span
                          key={tag}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className={`px-2.5 py-1 text-xs font-medium rounded-full border ${tagColors[tag]}`}
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>

                    {/* Expanded Nutrition Info (on hover) */}
                    <AnimatePresence>
                      {hoveredMeal === meal.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 border-t border-gray-700">
                            <p className="text-xs text-gray-400 mb-2 font-semibold">Complete Nutrition</p>
                            <div className="grid grid-cols-2 gap-3">
                              <div className="flex justify-between items-center">
                                <span className="text-xs text-gray-400">Fats</span>
                                <span className="text-sm font-bold text-white">{meal.fats}g</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-xs text-gray-400">Fiber</span>
                                <span className="text-sm font-bold text-white">{meal.fiber}g</span>
                              </div>
                              <div className="flex justify-between items-center col-span-2">
                                <span className="text-xs text-gray-400">Category</span>
                                <span className="text-sm font-bold gold-text">{meal.category}</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--gold)]/5 to-transparent" />
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </AnimatePresence>
        </StaggerContainer>

        {/* View Full Menu CTA */}
        <AnimatedSection animation="fadeInUp" delay={0.4} className="text-center">
          <motion.button
            className="btn-glow px-10 py-4 bg-[var(--gold)] text-black font-bold text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 inline-flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Full Menu
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.button>
          <p className="text-gray-400 text-sm mt-4">
            Over 50+ chef-crafted meals updated weekly
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}

export default MenuGallery;
