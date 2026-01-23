import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection, { StaggerContainer, StaggerItem } from './ui/AnimatedSection';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  {
    question: 'How does meal prep delivery work?',
    answer: 'Simply choose your plan, select your meals, and we\'ll prepare them fresh. Meals are delivered to your door twice weekly in insulated packaging to maintain freshness. Each meal comes with detailed reheating instructions and nutritional information.',
    category: 'Ordering',
  },
  {
    question: 'What areas do you deliver to?',
    answer: 'We currently deliver throughout the Los Angeles metropolitan area, including Downtown LA, Beverly Hills, Santa Monica, Pasadena, and surrounding neighborhoods. Enter your zip code during checkout to confirm delivery availability in your area.',
    category: 'Delivery',
  },
  {
    question: 'Can I customize my meals?',
    answer: 'Absolutely! You can fully customize your weekly menu by selecting from our rotating menu of 20+ chef-crafted meals. You can also add special preparation notes for dietary preferences or modify portion sizes for most dishes.',
    category: 'Meals',
  },
  {
    question: 'What dietary options are available?',
    answer: 'We offer a wide range of dietary options including keto, paleo, vegan, vegetarian, gluten-free, and dairy-free meals. Each meal is clearly labeled with dietary tags, and you can filter by your preferences when selecting your weekly menu.',
    category: 'Meals',
  },
  {
    question: 'How do I cancel or pause my subscription?',
    answer: 'You can pause or cancel your subscription anytime from your account dashboard. Pausing is perfect for vacations or busy weeks - simply select the weeks you want to skip. Cancellations take effect after your current delivery cycle completes.',
    category: 'Account',
  },
  {
    question: 'Are ingredients organic?',
    answer: 'We prioritize organic, locally-sourced ingredients whenever possible. All our proteins are hormone-free and humanely raised. Our produce is sourced from local California farms, with 80% organic certification. We\'re committed to transparency - ingredient sourcing details are available for every meal.',
    category: 'Meals',
  },
  {
    question: 'How should I store and reheat meals?',
    answer: 'Meals stay fresh in the refrigerator for up to 5 days. For reheating, remove the lid, microwave for 2-3 minutes, or heat in the oven at 350°F for 10-12 minutes. Specific instructions are included with each meal. Meals can also be frozen for up to 2 months.',
    category: 'Meals',
  },
  {
    question: 'What\'s your refund policy?',
    answer: 'We stand behind our quality 100%. If you\'re not satisfied with any meal, contact us within 24 hours of delivery for a full refund or replacement. First-time customers get a satisfaction guarantee on their first order - love it or your money back.',
    category: 'Account',
  },
  {
    question: 'Can I skip a week?',
    answer: 'Yes! You can skip any week without penalty. Just log into your account at least 3 days before your delivery date and select "Skip Week". Your subscription will automatically resume the following week. You can skip as many weeks as you need.',
    category: 'Account',
  },
  {
    question: 'Do you accommodate allergies?',
    answer: 'We take allergies very seriously. All meals are prepared in a facility that handles common allergens, but we have strict protocols to prevent cross-contamination. You can note allergies in your profile, and meals containing allergens are clearly labeled. For severe allergies, please contact our team directly.',
    category: 'Meals',
  },
];

const categories = ['All', 'Ordering', 'Delivery', 'Meals', 'Account'];

function FAQ() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filteredFAQs = faqData.filter((faq) => {
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold-light rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <AnimatedSection animation="fadeInUp" className="text-center mb-16">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4"
          >
            <span className="text-gold text-sm font-semibold tracking-wider uppercase">
              Got Questions?
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            Frequently Asked{' '}
            <span className="text-gradient-gold">Questions</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Everything you need to know about Meal Preps by Jojo
          </p>
        </AnimatedSection>

        {/* Search Bar */}
        <AnimatedSection animation="scaleIn" delay={0.2} className="mb-12">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 pl-14 bg-dark-card border border-gold/20 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-gold/50 transition-all"
              />
              <svg
                className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gold/50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </AnimatedSection>

        {/* Category Tabs */}
        <AnimatedSection animation="fadeInUp" delay={0.3} className="mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  activeCategory === category
                    ? 'bg-gold text-dark-bg shadow-lg shadow-gold/30'
                    : 'bg-dark-card text-gray-400 hover:text-white border border-gold/20 hover:border-gold/40'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* FAQ Accordion */}
        <StaggerContainer className="max-w-4xl mx-auto mb-16">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq, index) => (
              <StaggerItem key={index}>
                <motion.div
                  className="mb-4"
                  initial={false}
                  animate={{
                    backgroundColor: openIndex === index ? 'rgba(212, 175, 55, 0.05)' : 'rgba(36, 36, 36, 1)',
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <button
                    onClick={() => toggleQuestion(index)}
                    className="w-full text-left p-6 rounded-2xl border border-gold/10 hover:border-gold/30 transition-all group"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-xs font-semibold text-gold/70 uppercase tracking-wider">
                            {faq.category}
                          </span>
                        </div>
                        <h3 className="text-lg md:text-xl font-semibold text-white group-hover:text-gold transition-colors">
                          {faq.question}
                        </h3>
                      </div>
                      <motion.div
                        animate={{ rotate: openIndex === index ? 45 : 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="flex-shrink-0"
                      >
                        <div className="w-8 h-8 rounded-full bg-gold/10 group-hover:bg-gold/20 flex items-center justify-center transition-colors">
                          <svg
                            className="w-5 h-5 text-gold"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 4v16m8-8H4"
                            />
                          </svg>
                        </div>
                      </motion.div>
                    </div>

                    <AnimatePresence>
                      {openIndex === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{
                            height: 'auto',
                            opacity: 1,
                            transition: {
                              height: { duration: 0.3, ease: 'easeInOut' },
                              opacity: { duration: 0.2, delay: 0.1 }
                            }
                          }}
                          exit={{
                            height: 0,
                            opacity: 0,
                            transition: {
                              height: { duration: 0.3, ease: 'easeInOut' },
                              opacity: { duration: 0.2 }
                            }
                          }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 pr-12">
                            <p className="text-gray-400 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </motion.div>
              </StaggerItem>
            ))
          ) : (
            <AnimatedSection animation="fadeIn" className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-dark-card border border-gold/20 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-gold/50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-gray-400 text-lg">No questions match your search</p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-4 text-gold hover:text-gold-light transition-colors"
              >
                Clear search
              </button>
            </AnimatedSection>
          )}
        </StaggerContainer>

        {/* Contact CTA */}
        <AnimatedSection animation="scaleIn" delay={0.4}>
          <div className="max-w-3xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-dark-card to-dark-elevated border border-gold/20 p-8 md:p-12">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold-light/5 rounded-full blur-3xl" />

              <div className="relative z-10 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-gold"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl md:text-3xl font-display font-bold mb-4">
                  Still Have Questions?
                </h3>
                <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                  Our friendly team is here to help. Reach out and we'll get back to you within 24 hours.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="mailto:hello@mealprepasbyjojo.com"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold text-dark-bg font-semibold rounded-full hover:bg-gold-light transition-all shadow-lg shadow-gold/30 hover:shadow-gold/50 hover:scale-105"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    Email Us
                  </a>
                  <a
                    href="tel:+1234567890"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-dark-elevated border border-gold/30 text-white font-semibold rounded-full hover:border-gold hover:bg-dark-card transition-all"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    Call Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

export default FAQ;
