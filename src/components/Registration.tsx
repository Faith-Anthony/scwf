import { useState, useRef, useEffect } from 'react';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  interest: string;
}

interface FormState {
  data: FormData;
  errors: Partial<FormData>;
  isSubmitting: boolean;
  isSuccess: boolean;
  errorMessage: string;
}

export default function Registration() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [formState, setFormState] = useState<FormState>({
    data: { fullName: '', email: '', phone: '', interest: '' },
    errors: {},
    isSubmitting: false,
    isSuccess: false,
    errorMessage: ''
  });

  // Get sensitive data from environment variables (stored in .env.local - NOT committed to GitHub)
  const GOOGLE_SHEET_ENDPOINT = import.meta.env.VITE_GOOGLE_SHEET_ENDPOINT || '';
  const WHATSAPP_GROUP_LINK = import.meta.env.VITE_WHATSAPP_GROUP_LINK || 'https://wa.link/q5yrin';

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formState.data.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formState.data.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formState.data.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    setFormState(prev => ({ ...prev, errors: newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      data: { ...prev.data, [name]: value },
      errors: { ...prev.errors, [name]: '' }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setFormState(prev => ({ ...prev, isSubmitting: true, errorMessage: '' }));

    try {
      const timestamp = new Date().toISOString();
      const payload = {
        fullName: formState.data.fullName,
        email: formState.data.email,
        phone: formState.data.phone,
        interest: formState.data.interest,
        timestamp: timestamp
      };

      // Only submit if endpoint is configured
      if (GOOGLE_SHEET_ENDPOINT !== 'https://script.google.com/macros/s/AKfycbzLEGYI6e0rYApzW3Yd452dUaEbFAXfcs4kNntuVEbXE93MfUwiJ_MXIOeur9NWmOYs/exec') {
        const response = await fetch(GOOGLE_SHEET_ENDPOINT, {
          method: 'POST',
          mode: 'no-cors',
          body: JSON.stringify(payload)
        });

        if (!response.ok && response.status !== 0) {
          throw new Error('Network error');
        }
      }

      // Simulate successful submission
      setFormState(prev => ({
        ...prev,
        isSubmitting: false,
        isSuccess: true,
        data: { fullName: '', email: '', phone: '', interest: '' }
      }));

      // Reset form after 3 seconds
      setTimeout(() => {
        setFormState(prev => ({ ...prev, isSuccess: false }));
      }, 3000);
    } catch (error) {
      setFormState(prev => ({
        ...prev,
        isSubmitting: false,
        errorMessage: 'Something went wrong. Please try again.'
      }));
    }
  };

  return (
    <section id="registration" className="py-20 md:py-32 px-4 bg-stone-950 relative overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-gold/5 via-transparent to-transparent pointer-events-none"></div>
      {/* Animated background elements */}
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gold/4 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div ref={containerRef} className="max-w-2xl mx-auto opacity-0 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Join Us</h2>
          <p className="text-gray-400 text-lg">Be part of something meaningful</p>
        </div>

        {formState.isSuccess ? (
          <div className="text-center py-12 px-8 rounded-xl border border-gold/50 bg-gradient-to-br from-gold/20 via-gold/5 to-transparent animate-fade-in shadow-lg shadow-gold/10">
            <div className="text-6xl mb-4">🤍</div>
            <h3 className="text-2xl font-bold text-white mb-4">You're In!</h3>
            <p className="text-gray-300 mb-8">Thank you for joining our community. We can't wait to see you on Sunday.</p>

            <a
              href={WHATSAPP_GROUP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-green-600 text-white font-semibold rounded-lg transition-all duration-300 hover:bg-green-700 hover:shadow-lg hover:shadow-green-600/20 transform hover:scale-105"
            >
              👉 Join WhatsApp Group
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 p-8 rounded-xl border border-gold/20 bg-gradient-to-br from-white/8 via-white/3 to-transparent shadow-lg shadow-gold/5">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Full Name <span className="typewriter-gold-inline">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formState.data.fullName}
                onChange={handleInputChange}
                disabled={formState.isSubmitting}
                className="w-full px-4 py-3 bg-white/5 border border-gold/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gold/50 transition-colors duration-300 disabled:opacity-50"
                placeholder="Your full name"
              />
              {formState.errors.fullName && (
                <p className="text-red-400 text-sm mt-1">{formState.errors.fullName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Email Address <span className="typewriter-gold-inline">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formState.data.email}
                onChange={handleInputChange}
                disabled={formState.isSubmitting}
                className="w-full px-4 py-3 bg-white/5 border border-gold/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gold/50 transition-colors duration-300 disabled:opacity-50"
                placeholder="your@email.com"
              />
              {formState.errors.email && (
                <p className="text-red-400 text-sm mt-1">{formState.errors.email}</p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Phone Number <span className="text-gray-500 text-xs">(optional)</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formState.data.phone}
                onChange={handleInputChange}
                disabled={formState.isSubmitting}
                className="w-full px-4 py-3 bg-white/5 border border-gold/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gold/50 transition-colors duration-300 disabled:opacity-50"
                placeholder="+234 (555) 123-4567"
              />
            </div>

            {/* Interest Message */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                What made you interested in joining? <span className="text-gray-500 text-xs">(optional)</span>
              </label>
              <textarea
                name="interest"
                value={formState.data.interest}
                onChange={handleInputChange}
                disabled={formState.isSubmitting}
                rows={4}
                className="w-full px-4 py-3 bg-white/5 border border-gold/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gold/50 transition-colors duration-300 disabled:opacity-50 resize-none"
                placeholder="Share what resonates with you about this community..."
              />
            </div>

            {/* Error Message */}
            {formState.errorMessage && (
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                {formState.errorMessage}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={formState.isSubmitting}
              className="w-full px-6 py-4 bg-gold text-black font-semibold rounded-lg transition-all duration-300 hover:bg-white hover:shadow-xl hover:shadow-gold/20 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gold disabled:hover:scale-100"
            >
              {formState.isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="inline-block w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></span>
                  Submitting...
                </span>
              ) : (
                'Join the Community'
              )}
            </button>

            <p className="text-center text-gray-400 text-sm">
              We respect your privacy. Your information will only be used to connect you with our community.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
