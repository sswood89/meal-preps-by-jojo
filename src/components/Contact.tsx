import { useState, type FormEvent, type ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from './ui/AnimatedSection';

interface FormData {
  name: string;
  email: string;
  phone: string;
  planInterest: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
}

// Floating label input component
function FloatingInput({
  id,
  name,
  type,
  value,
  onChange,
  label,
  error,
  required,
}: {
  id: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  error?: string;
  required?: boolean;
}) {
  const [isFocused, setIsFocused] = useState(false);
  const isActive = isFocused || value;

  return (
    <div className="relative">
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`w-full px-4 pt-6 pb-2 bg-[#1a1a1a] text-white rounded-xl border-2 transition-all duration-300 focus:outline-none peer ${
          error
            ? 'border-red-500 focus:border-red-500'
            : 'border-gray-700 focus:border-[#D4AF37]'
        }`}
        placeholder=" "
      />
      <label
        htmlFor={id}
        className={`absolute left-4 transition-all duration-300 pointer-events-none ${
          isActive
            ? 'top-2 text-xs text-[#D4AF37]'
            : 'top-4 text-gray-400'
        }`}
      >
        {label} {required && <span className="text-[#D4AF37]">*</span>}
      </label>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-400 text-sm mt-1 flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </motion.p>
      )}
    </div>
  );
}

// Success animation component
function SuccessAnimation() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
    >
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="bg-[#1a1a1a] rounded-2xl p-8 max-w-md mx-4 text-center border border-[#D4AF37]/30"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="w-20 h-20 bg-[#22C55E]/20 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <motion.svg
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="w-10 h-10 text-[#22C55E]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <motion.path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </motion.svg>
        </motion.div>
        <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
        <p className="text-gray-400">
          Thank you! Chef Jojo will get back to you within 24 hours.
        </p>
      </motion.div>
    </motion.div>
  );
}

function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    planInterest: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Form submitted:', formData);

      setShowSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        planInterest: '',
        message: '',
      });

      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {showSuccess && <SuccessAnimation />}
      </AnimatePresence>

      <section id="contact" className="py-24 lg:py-32 bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a] relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#22C55E]/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          {/* Section Header */}
          <AnimatedSection className="text-center mb-12">
            <span className="inline-block text-[#D4AF37] text-sm font-semibold tracking-widest uppercase mb-4">
              Get In Touch
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-display">
              Start Your Journey
            </h2>

            {/* Urgency Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FF6B6B] to-[#D4AF37] text-white font-bold px-6 py-3 rounded-full shadow-lg mb-6"
            >
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                🔥
              </motion.span>
              <span>Limited Time: 10% OFF Your First Order</span>
            </motion.div>

            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Ready to transform your meals? Fill out the form below or contact us directly.
            </p>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <AnimatedSection animation="fadeInLeft">
              <div className="bg-[#242424] p-8 rounded-2xl border border-gray-800 shadow-xl">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <span className="text-2xl">📝</span>
                  Request Information
                </h3>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <FloatingInput
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    label="Full Name"
                    error={errors.name}
                    required
                  />

                  <FloatingInput
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    label="Email Address"
                    error={errors.email}
                    required
                  />

                  <FloatingInput
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    label="Phone Number"
                  />

                  {/* Plan Select */}
                  <div className="relative">
                    <select
                      id="planInterest"
                      name="planInterest"
                      value={formData.planInterest}
                      onChange={handleChange}
                      className="w-full px-4 py-4 bg-[#1a1a1a] text-white rounded-xl border-2 border-gray-700 focus:border-[#D4AF37] transition-all focus:outline-none appearance-none cursor-pointer"
                    >
                      <option value="">Select a plan...</option>
                      <option value="weekly">Weekly Plan</option>
                      <option value="2-week">2-Week Plan</option>
                      <option value="monthly">Monthly Plan</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  {/* Message Textarea */}
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-4 bg-[#1a1a1a] text-white rounded-xl border-2 border-gray-700 focus:border-[#D4AF37] transition-all focus:outline-none resize-none"
                      placeholder="Dietary restrictions, allergies, or questions..."
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-[#D4AF37] to-[#E5C453] text-[#0f0f0f] font-bold py-4 px-6 rounded-xl transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:shadow-[#D4AF37]/20"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-5 h-5 border-2 border-[#0f0f0f] border-t-transparent rounded-full"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </AnimatedSection>

            {/* Contact Information */}
            <AnimatedSection animation="fadeInRight" className="space-y-6">
              {/* Contact Info Card */}
              <div className="bg-[#242424] p-8 rounded-2xl border border-gray-800 shadow-xl">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <span className="text-2xl">📞</span>
                  Contact Information
                </h3>

                <div className="space-y-6">
                  {/* Phone */}
                  <motion.a
                    href="tel:+13057813406"
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 bg-[#D4AF37]/20 rounded-xl flex items-center justify-center group-hover:bg-[#D4AF37]/30 transition-colors">
                      <svg className="w-6 h-6 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">Phone</div>
                      <div className="text-white font-semibold text-lg group-hover:text-[#D4AF37] transition-colors">
                        (305) 781-3406
                      </div>
                    </div>
                  </motion.a>

                  {/* WhatsApp */}
                  <motion.a
                    href="https://wa.me/13057813406"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 bg-[#22C55E]/20 rounded-xl flex items-center justify-center group-hover:bg-[#22C55E]/30 transition-colors">
                      <svg className="w-6 h-6 text-[#22C55E]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">WhatsApp</div>
                      <div className="text-white font-semibold text-lg group-hover:text-[#22C55E] transition-colors">
                        Quick Message
                      </div>
                    </div>
                  </motion.a>

                  {/* Service Area */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#3B82F6]/20 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-[#3B82F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">Service Area</div>
                      <div className="text-white font-semibold text-lg">Los Angeles</div>
                      <div className="text-[#22C55E] text-sm font-medium">Free Delivery</div>
                    </div>
                  </div>

                  {/* Instagram */}
                  <motion.a
                    href="https://instagram.com/mealprepsbyjojo"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-pink-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" />
                        <circle cx="12" cy="12" r="3.5" />
                        <circle cx="18.5" cy="5.5" r="1.5" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">Instagram</div>
                      <div className="text-white font-semibold text-lg group-hover:text-pink-400 transition-colors">
                        @mealprepsbyjojo
                      </div>
                    </div>
                  </motion.a>
                </div>
              </div>

              {/* Why Choose Us Card */}
              <div className="bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/5 p-8 rounded-2xl border border-[#D4AF37]/30 shadow-xl">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="text-2xl">✨</span>
                  Why Choose Us?
                </h3>
                <ul className="space-y-3">
                  {[
                    'Fresh, locally-sourced ingredients',
                    'Customizable meal plans',
                    'Free delivery in Los Angeles',
                    'Flexible scheduling',
                    'Cancel anytime',
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 text-white"
                    >
                      <svg className="w-5 h-5 text-[#22C55E] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;
