import { useState } from 'react';

const meals = [
  {
    id: 1,
    name: 'Grilled Salmon Bowl',
    category: 'High Protein',
    emoji: '🐟',
    calories: 450,
    protein: 35,
  },
  {
    id: 2,
    name: 'Mediterranean Quinoa',
    category: 'Balanced',
    emoji: '🥗',
    calories: 380,
    protein: 15,
  },
  {
    id: 3,
    name: 'Herb Chicken Breast',
    category: 'High Protein',
    emoji: '🍗',
    calories: 420,
    protein: 40,
  },
  {
    id: 4,
    name: 'Thai Peanut Tofu',
    category: 'Plant-Based',
    emoji: '🥜',
    calories: 350,
    protein: 20,
  },
  {
    id: 5,
    name: 'Grass-Fed Beef Stir Fry',
    category: 'High Protein',
    emoji: '🥩',
    calories: 480,
    protein: 38,
  },
  {
    id: 6,
    name: 'Buddha Bowl',
    category: 'Plant-Based',
    emoji: '🥬',
    calories: 320,
    protein: 12,
  },
];

const filters = ['All', 'High Protein', 'Plant-Based', 'Balanced'];

function MenuPreview() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredMeals = meals.filter(
    (meal) => activeFilter === 'All' || meal.category === activeFilter
  );

  return (
    <section id="menu" className="section bg-[#1C1C1C]">
      <div className="container">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="badge bg-[#C65D3B]/10 text-[#D97B5C] mb-4">Sample Menu</span>
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
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeFilter === filter
                  ? 'bg-[#C65D3B] text-white'
                  : 'bg-[#2A2A2A] text-[#A3A3A3] hover:bg-[#3A3A3A] hover:text-white'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Meal Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMeals.map((meal) => (
            <div
              key={meal.id}
              className="bg-[#2A2A2A] rounded-2xl p-6 border border-[#3A3A3A] hover:border-[#525252] transition-colors"
            >
              {/* Meal Icon */}
              <div className="w-16 h-16 rounded-xl bg-[#3A3A3A] flex items-center justify-center text-3xl mb-4">
                {meal.emoji}
              </div>

              {/* Category */}
              <span className="text-[#6B8E6B] text-xs font-medium uppercase tracking-wide">
                {meal.category}
              </span>

              {/* Name */}
              <h3 className="text-white text-lg font-semibold mt-1 mb-3">
                {meal.name}
              </h3>

              {/* Macros */}
              <div className="flex gap-4 pt-4 border-t border-[#3A3A3A]">
                <div>
                  <div className="text-white font-semibold">{meal.calories}</div>
                  <div className="text-[#737373] text-xs">cal</div>
                </div>
                <div>
                  <div className="text-[#6B8E6B] font-semibold">{meal.protein}g</div>
                  <div className="text-[#737373] text-xs">protein</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-[#737373] mb-4">
            Menu rotates weekly. All meals fully customizable.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-[#D97B5C] font-medium hover:text-[#C65D3B] transition-colors"
          >
            Request Full Menu
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

export default MenuPreview;
