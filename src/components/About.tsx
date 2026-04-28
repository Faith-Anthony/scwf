import { useEffect, useRef } from 'react';

const features = [
  {
    title: 'Real Conversations',
    description: 'Genuine dialogues without pretense or performance'
  },
  {
    title: 'No Hierarchy',
    description: 'Everyone\'s voice matters equally'
  },
  {
    title: 'Open Expression',
    description: 'Share your thoughts, doubts, and dreams freely'
  },
  {
    title: 'Growth-Focused',
    description: 'We learn and evolve together'
  }
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          const items = entry.target.querySelectorAll('[data-animate]');
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
      <div className="absolute top-20 left-10 w-64 h-64 bg-gold/5 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold/3 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div ref={containerRef} className="max-w-6xl mx-auto opacity-0 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">What We're About</h2>
          <p className="text-gray-400 text-lg">Building a community centered on authenticity and growth</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              data-animate
              className="p-8 rounded-lg border border-gold/20 bg-gradient-to-br from-white/5 to-transparent hover:border-gold/50 transition-all duration-300 opacity-0"
            >
              <h3 className="text-xl font-semibold typewriter-gold-inline mb-3">{feature.title}</h3>
              <p className="text-gray-300 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
