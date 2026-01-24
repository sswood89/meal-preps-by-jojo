import { useState, useRef, useEffect } from 'react';

// Placeholder posts - replace with real Instagram API data
const instagramPosts = [
  {
    id: '1',
    image: '🥗',
    alt: 'Grilled salmon with roasted vegetables',
    likes: 234,
    caption: 'Fresh grilled salmon bowl with seasonal veggies 🐟',
  },
  {
    id: '2',
    image: '🍗',
    alt: 'Herb roasted chicken meal prep',
    likes: 189,
    caption: 'Herb chicken prep ready for the week! 💪',
  },
  {
    id: '3',
    image: '🥩',
    alt: 'Grass-fed beef stir fry',
    likes: 312,
    caption: 'Grass-fed beef stir fry with organic broccoli 🥦',
  },
  {
    id: '4',
    image: '🥬',
    alt: 'Buddha bowl with quinoa',
    likes: 156,
    caption: 'Plant-powered Buddha bowl 🌱',
  },
  {
    id: '5',
    image: '🍤',
    alt: 'Garlic shrimp with zucchini noodles',
    likes: 278,
    caption: 'Garlic shrimp zoodles - low carb perfection! 🍤',
  },
  {
    id: '6',
    image: '🥙',
    alt: 'Mediterranean chicken wrap',
    likes: 198,
    caption: 'Mediterranean flavors in every bite 🌿',
  },
  {
    id: '7',
    image: '🍲',
    alt: 'Thai coconut curry',
    likes: 245,
    caption: 'Cozy Thai coconut curry for cold nights 🥥',
  },
  {
    id: '8',
    image: '🥑',
    alt: 'Avocado toast with poached eggs',
    likes: 321,
    caption: 'Breakfast prep done right 🍳',
  },
  {
    id: '9',
    image: '🌮',
    alt: 'Healthy taco bowls',
    likes: 287,
    caption: 'Taco Tuesday meal prep edition 🌮',
  },
  {
    id: '10',
    image: '🍜',
    alt: 'Asian-inspired noodle bowl',
    likes: 203,
    caption: 'Slurp-worthy noodle bowls 🍜',
  },
];

function InstagramFeed() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
      setScrollPosition(scrollLeft);
    }
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', updateScrollButtons);
      updateScrollButtons();
      return () => carousel.removeEventListener('scroll', updateScrollButtons);
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 320;
      const newPosition = direction === 'left'
        ? scrollPosition - scrollAmount
        : scrollPosition + scrollAmount;
      carouselRef.current.scrollTo({
        left: newPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="section bg-[#FAF7F2]">
      <div className="container">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <span className="badge badge-accent mb-4">Follow Along</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold text-[#1C1C1C]">
              Fresh From Our Kitchen
            </h2>
          </div>
          <a
            href="https://instagram.com/mealprepsbyjojo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#C65D3B] font-medium hover:text-[#A84E30] transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" />
              <circle cx="12" cy="12" r="3.5" />
              <circle cx="18.5" cy="5.5" r="1.5" />
            </svg>
            @mealprepsbyjojo
          </a>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full bg-white shadow-lg border border-[#E5E5E5] flex items-center justify-center transition-all ${
              canScrollLeft
                ? 'opacity-100 hover:bg-[#F0EBE3] cursor-pointer'
                : 'opacity-0 cursor-default'
            }`}
            aria-label="Scroll left"
          >
            <svg className="w-5 h-5 text-[#1C1C1C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full bg-white shadow-lg border border-[#E5E5E5] flex items-center justify-center transition-all ${
              canScrollRight
                ? 'opacity-100 hover:bg-[#F0EBE3] cursor-pointer'
                : 'opacity-0 cursor-default'
            }`}
            aria-label="Scroll right"
          >
            <svg className="w-5 h-5 text-[#1C1C1C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Carousel */}
          <div
            ref={carouselRef}
            className="flex gap-5 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {instagramPosts.map((post) => (
              <a
                key={post.id}
                href="https://instagram.com/mealprepsbyjojo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 w-72 group snap-start"
              >
                <div className="relative aspect-square rounded-2xl bg-[#F0EBE3] overflow-hidden border border-[#E5E5E5] group-hover:border-[#C65D3B] transition-colors">
                  {/* Placeholder Image */}
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-7xl">{post.image}</span>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-[#1C1C1C]/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="flex items-center gap-6 text-white">
                      <div className="flex items-center gap-2">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                        <span className="font-semibold">{post.likes}</span>
                      </div>
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Caption */}
                <p className="mt-3 text-sm text-[#525252] line-clamp-2">
                  {post.caption}
                </p>
              </a>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <a
            href="https://instagram.com/mealprepsbyjojo"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" />
              <circle cx="12" cy="12" r="3.5" />
              <circle cx="18.5" cy="5.5" r="1.5" />
            </svg>
            Follow Us on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}

export default InstagramFeed;
