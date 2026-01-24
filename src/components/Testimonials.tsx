const testimonials = [
  {
    name: 'Sarah M.',
    role: 'Fitness Coach',
    quote: 'JoJo\'s meals have been a game-changer for my clients. Fresh, delicious, and perfectly portioned.',
    rating: 5,
  },
  {
    name: 'David R.',
    role: 'Busy Professional',
    quote: 'I no longer stress about meal prep. Everything arrives fresh and ready to heat. The quality is outstanding.',
    rating: 5,
  },
  {
    name: 'Michelle T.',
    role: 'Working Mom',
    quote: 'My whole family loves the meals. It\'s healthy food that actually tastes amazing. Worth every penny.',
    rating: 5,
  },
];

function Testimonials() {
  return (
    <section id="testimonials" className="section bg-[#F0EBE3]">
      <div className="container">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="badge badge-sage mb-4">Testimonials</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold text-[#1C1C1C] mb-4">
            What Our Customers Say
          </h2>
          <p className="text-[#525252] text-lg">
            Join 500+ happy customers eating healthier
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="card p-8"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-[#C65D3B]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-[#525252] mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#F0EBE3] flex items-center justify-center text-[#1C1C1C] font-semibold">
                  {testimonial.name[0]}
                </div>
                <div>
                  <div className="font-semibold text-[#1C1C1C] text-sm">
                    {testimonial.name}
                  </div>
                  <div className="text-[#737373] text-xs">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
