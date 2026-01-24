import { useState, type FormEvent, type ChangeEvent } from 'react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setIsSubmitting(false);
    setFormData({ name: '', email: '', phone: '', message: '' });

    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="section bg-[#1C1C1C]">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left - Info */}
          <div>
            <span className="badge bg-[#C65D3B]/10 text-[#D97B5C] mb-4">Contact</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold text-white mb-4">
              Get Started Today
            </h2>
            <p className="text-[#A3A3A3] text-lg mb-8">
              Ready to transform your meals? Reach out and we'll help you find
              the perfect plan.
            </p>

            {/* Contact Info */}
            <div className="space-y-6">
              <a
                href="tel:+13057813406"
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#2A2A2A] flex items-center justify-center group-hover:bg-[#3A3A3A] transition-colors">
                  <svg className="w-5 h-5 text-[#C65D3B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <div className="text-[#737373] text-sm">Phone</div>
                  <div className="text-white font-medium group-hover:text-[#C65D3B] transition-colors">
                    (305) 781-3406
                  </div>
                </div>
              </a>

              <a
                href="https://wa.me/13057813406"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#2A2A2A] flex items-center justify-center group-hover:bg-[#3A3A3A] transition-colors">
                  <svg className="w-5 h-5 text-[#6B8E6B]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div>
                  <div className="text-[#737373] text-sm">WhatsApp</div>
                  <div className="text-white font-medium group-hover:text-[#6B8E6B] transition-colors">
                    Message Us
                  </div>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#2A2A2A] flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#C65D3B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-[#737373] text-sm">Service Area</div>
                  <div className="text-white font-medium">
                    Los Angeles, CA
                    <span className="text-[#6B8E6B] text-sm ml-2">Free Delivery</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div className="bg-[#2A2A2A] rounded-2xl p-8 border border-[#3A3A3A]">
            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-[#6B8E6B]/10 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#6B8E6B]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Message Sent!</h3>
                <p className="text-[#A3A3A3]">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#A3A3A3] mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#1C1C1C] text-white rounded-lg border border-[#3A3A3A] focus:border-[#C65D3B] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#A3A3A3] mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#1C1C1C] text-white rounded-lg border border-[#3A3A3A] focus:border-[#C65D3B] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-[#A3A3A3] mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#1C1C1C] text-white rounded-lg border border-[#3A3A3A] focus:border-[#C65D3B] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[#A3A3A3] mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us about your dietary preferences or questions..."
                    className="w-full px-4 py-3 bg-[#1C1C1C] text-white rounded-lg border border-[#3A3A3A] focus:border-[#C65D3B] focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
