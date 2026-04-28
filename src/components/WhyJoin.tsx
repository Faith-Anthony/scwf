import { useEffect, useRef } from 'react';

const benefits = [
  {
    title: 'Express Yourself Freely',
    description: 'No judgment, no filters. Your voice matters.',
    icon: '🎤'
  },
  {
    title: 'Gain New Perspectives',
    description: 'Learn from diverse experiences and viewpoints.',
    icon: '🌟'
  },
  {
    title: 'Grow Mentally & Spiritually',
    description: 'Explore what matters most to you.',
    icon: '🌱'
  },
  {
    title: 'Connect with Like-Minded People',
    description: 'Build meaningful relationships that last.',
    icon: '🤝'
  }
];

export default function WhyJoin() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          const items = entry.target.querySelectorAll('[data-card]');
          items.forEach((item, i) => {
            setTimeout(() => {
              item.classList.add('animate-slide-up');
            }, i * 400);
          });
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 md:py-32 px-4 bg-stone-950 relative overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-gold/5 via-transparent to-transparent pointer-events-none"></div>
      {/* Animated background elements */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gold/4 rounded-full blur-3xl opacity-25 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      <div ref={containerRef} className="max-w-6xl mx-auto opacity-0 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Why Join?</h2>
          <p className="text-gray-400 text-lg">Discover what makes this community special</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              data-card
              className="relative group p-8 rounded-lg border border-gold/20 bg-gradient-to-br from-white/5 to-transparent hover:border-gold/50 transition-all duration-300 opacity-0 overflow-hidden"
            >
              {/* Hover gradient effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold/0 to-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative z-10">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-gold transition-colors duration-300">
                  {benefit.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
