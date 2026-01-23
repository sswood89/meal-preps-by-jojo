import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef } from 'react';
import AnimatedSection from './ui/AnimatedSection';

interface Testimonial {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  quote: string;
  location: string;
  image?: string;
  verified?: boolean;
  type?: 'text' | 'video';
  videoThumbnail?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Marcus Johnson',
    avatar: 'MJ',
    rating: 5,
    quote: "Chef Jojo's meals are absolutely incredible! Every dish is packed with flavor and made with the freshest ingredients. I've been ordering weekly for the past 3 months and haven't had a single meal that disappointed.",
    location: 'Beverly Hills',
    verified: true,
  },
  {
    id: 2,
    name: 'Sofia Martinez',
    avatar: 'SM',
    rating: 5,
    quote: "As a busy professional, Meal Preps by JoJo has been a game-changer. I save so much time not having to meal prep myself, and the meals are actually delicious—not like typical meal prep services.",
    location: 'Santa Monica',
    verified: true,
    type: 'video',
    videoThumbnail: '🎥',
  },
  {
    id: 3,
    name: 'David Chen',
    avatar: 'DC',
    rating: 5,
    quote: "What I love most is Chef Jojo's willingness to customize meals to my dietary needs. The personal touch really shows in every meal. It feels like having a private chef!",
    location: 'West Hollywood',
    verified: true,
  },
  {
    id: 4,
    name: 'Emily Rodriguez',
    avatar: 'ER',
    rating: 5,
    quote: "The quality is unmatched. I've tried many meal prep services, but this is the first one where I actually look forward to every meal. The organic ingredients make a real difference.",
    location: 'Bel Air',
    verified: true,
  },
  {
    id: 5,
    name: 'James Wilson',
    avatar: 'JW',
    rating: 5,
    quote: "My fitness journey transformed thanks to Chef Jojo's perfectly balanced meals. The macros are on point and everything tastes amazing. Highly recommend!",
    location: 'Venice Beach',
    verified: true,
    type: 'video',
    videoThumbnail: '🎬',
  },
  {
    id: 6,
    name: 'Priya Patel',
    avatar: 'PP',
    rating: 5,
    quote: "As someone with specific dietary restrictions, finding a meal prep service that caters to my needs was challenging. Chef Jojo not only accommodates but creates dishes that are restaurant-quality. My family loves them!",
    location: 'Pasadena',
    verified: true,
  },
];

function StarRating({ rating, animated = false }: { rating: number; animated?: boolean }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
      {[...Array(5)].map((_, index) => (
        <motion.svg
          key={index}
          initial={animated ? { opacity: 0, scale: 0, rotate: -180 } : { opacity: 1, scale: 1 }}
          animate={isInView && animated ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
          className={`w-5 h-5 ${
            index < rating ? 'text-[#D4AF37] drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]' : 'text-gray-600'
          }`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </motion.svg>
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const isVideo = testimonial.type === 'video';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      className="card-premium bg-[#1a1a1a] rounded-2xl p-8 border border-gray-800 hover:border-[#D4AF37]/30 transition-all duration-300 h-full flex flex-col relative overflow-hidden"
    >
      {/* Video Overlay for Video Testimonials */}
      {isVideo && (
        <div className="absolute top-4 right-4 z-10">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-12 h-12 rounded-full bg-[#D4AF37]/20 backdrop-blur-sm border border-[#D4AF37]/50 flex items-center justify-center cursor-pointer group"
          >
            <svg className="w-6 h-6 text-[#D4AF37] group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
            </svg>
          </motion.div>
        </div>
      )}

      {/* Quote Mark */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-[#D4AF37]/30 text-7xl font-serif leading-none mb-2"
      >
        "
      </motion.div>

      {/* Quote */}
      <p className="text-gray-300 text-lg leading-relaxed mb-6 flex-grow">
        {testimonial.quote}
      </p>

      {/* Rating */}
      <div className="mb-4">
        <StarRating rating={testimonial.rating} animated />
      </div>

      {/* Customer Info */}
      <div className="flex items-center gap-4">
        {/* Avatar with Gold Ring Border */}
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#E5C453] animate-pulse-glow" style={{ padding: '3px' }}>
            <div className="w-full h-full rounded-full bg-[#1a1a1a]"></div>
          </div>
          <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#E5C453] flex items-center justify-center text-[#0f0f0f] font-bold text-lg shadow-lg border-2 border-[#D4AF37]">
            {testimonial.avatar}
          </div>
        </div>

        {/* Name and Location */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-white font-semibold text-lg">
              {testimonial.name}
            </h4>
            {testimonial.verified && (
              <motion.svg
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="w-5 h-5 text-[#D4AF37]"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-label="Verified Customer"
              >
                <title>Verified Customer</title>
                <path
                  fillRule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </motion.svg>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {/* Location Badge */}
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-medium">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              {testimonial.location}
            </span>
            {/* Verified Badge */}
            {testimonial.verified && (
              <span className="inline-flex items-center px-2 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-medium">
                Verified Customer
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Instagram feed placeholder
function InstagramFeed() {
  const posts = [
    { emoji: '🥗', likes: '234' },
    { emoji: '🍗', likes: '189' },
    { emoji: '🥦', likes: '156' },
    { emoji: '🍛', likes: '312' },
    { emoji: '🥩', likes: '278' },
    { emoji: '🥙', likes: '201' },
  ];

  return (
    <AnimatedSection delay={0.3} className="mt-20">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">Follow Our Journey</h3>
        <a
          href="https://instagram.com/mealprepsbyjojo"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[#D4AF37] hover:text-[#E5C453] transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" />
            <path d="M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8z" />
            <circle cx="18.406" cy="5.594" r="1.44" />
          </svg>
          @mealprepsbyjojo
        </a>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
        {posts.map((post, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.05 }}
            className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
          >
            {/* Placeholder image */}
            <div className="w-full h-full bg-gradient-to-br from-[#242424] to-[#1a1a1a] flex items-center justify-center">
              <span className="text-4xl">{post.emoji}</span>
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="flex items-center gap-1 text-white">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">{post.likes}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </AnimatedSection>
  );
}

// Trust Logos Component
function TrustLogos() {
  const logos = [
    { name: 'LA Times', icon: '📰' },
    { name: 'Eater LA', icon: '🍴' },
    { name: 'Organic Certified', icon: '🌱' },
    { name: 'Health Dept A+', icon: '✓' },
  ];

  return (
    <AnimatedSection delay={0.2} className="mt-16">
      <div className="text-center mb-6">
        <p className="text-gray-400 text-sm uppercase tracking-wider">As Featured In</p>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
        {logos.map((logo, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10"
          >
            <span className="text-2xl">{logo.icon}</span>
            <span className="text-gray-300 font-medium text-sm">{logo.name}</span>
          </motion.div>
        ))}
      </div>
    </AnimatedSection>
  );
}

// Overall Rating Summary Component
function RatingSummary() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayRating, setDisplayRating] = useState(0);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        let current = 0;
        const interval = setInterval(() => {
          current += 0.1;
          if (current >= 4.9) {
            setDisplayRating(4.9);
            clearInterval(interval);
          } else {
            setDisplayRating(current);
          }
        }, 30);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  return (
    <AnimatedSection delay={0.1} className="mt-12 mb-16">
      <motion.div
        ref={ref}
        className="card-premium bg-gradient-to-br from-[#1a1a1a] to-[#242424] rounded-2xl p-8 border border-[#D4AF37]/30 max-w-2xl mx-auto"
      >
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          {/* Rating Number */}
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="text-6xl md:text-7xl font-bold gold-text mb-2"
            >
              {displayRating.toFixed(1)}
            </motion.div>
            <StarRating rating={5} animated />
            <p className="text-gray-400 text-sm mt-2">Overall Rating</p>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px h-24 bg-gradient-to-b from-transparent via-[#D4AF37]/30 to-transparent" />

          {/* Stats */}
          <div className="text-center md:text-left">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-4xl font-bold text-white">500+</span>
              <span className="text-gray-400">Reviews</span>
            </div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-2xl font-bold gold-text">98%</span>
              <span className="text-gray-400">Would Recommend</span>
            </div>
            <div className="flex items-center gap-2 text-green-400">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">All Reviews Verified</span>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatedSection>
  );
}

function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const testimonialsPerPage = 3;
  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage);

  const visibleTestimonials = testimonials.slice(
    currentIndex * testimonialsPerPage,
    (currentIndex + 1) * testimonialsPerPage
  );

  const nextPage = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextPage();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying]);

  // Touch handlers for swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsAutoPlaying(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextPage();
    }
    if (isRightSwipe) {
      prevPage();
    }

    setTouchStart(0);
    setTouchEnd(0);

    // Resume autoplay after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section id="testimonials" className="py-24 lg:py-32 bg-[#0f0f0f] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-[#22C55E]/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-16">
          <span className="inline-block text-[#D4AF37] text-sm font-semibold tracking-widest uppercase mb-4">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-display">
            What Our Customers Say
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto" />
        </AnimatedSection>

        {/* Rating Summary */}
        <RatingSummary />

        {/* Testimonials Grid with Carousel Controls */}
        <div
          className="relative"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Navigation Arrows - Desktop */}
          <div className="hidden lg:flex absolute -left-16 top-1/2 -translate-y-1/2 z-10">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={prevPage}
              className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-all"
              aria-label="Previous testimonials"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
          </div>

          <div className="hidden lg:flex absolute -right-16 top-1/2 -translate-y-1/2 z-10">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={nextPage}
              className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-all"
              aria-label="Next testimonials"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>

          {/* Testimonials Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {visibleTestimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Pagination Dots */}
          <div className="flex justify-center items-center gap-3 mt-8">
            {Array.from({ length: totalPages }).map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsAutoPlaying(false);
                  setTimeout(() => setIsAutoPlaying(true), 10000);
                }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className={`rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-[#D4AF37] w-8 h-2.5 shadow-[0_0_12px_rgba(212,175,55,0.6)]'
                    : 'bg-gray-600 hover:bg-gray-500 w-2.5 h-2.5'
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
            {/* Auto-play indicator */}
            <div className="ml-2 flex items-center gap-2">
              <motion.button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-400 hover:text-[#D4AF37] transition-colors"
                aria-label={isAutoPlaying ? "Pause autoplay" : "Resume autoplay"}
              >
                {isAutoPlaying ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                )}
              </motion.button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="flex lg:hidden justify-center gap-4 mt-6">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={prevPage}
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm"
            >
              Previous
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={nextPage}
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm"
            >
              Next
            </motion.button>
          </div>
        </div>

        {/* Trust Logos */}
        <TrustLogos />

        {/* Instagram Feed Section */}
        <InstagramFeed />
      </div>
    </section>
  );
}

export default Testimonials;
