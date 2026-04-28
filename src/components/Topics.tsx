import { useEffect, useRef } from 'react';

const topics = [
  {
    title: 'Faith, Doubt & Growth',
    description: 'Exploring spirituality, questioning belief systems, and personal evolution',
    icon: '✨'
  },
  {
    title: 'Knowing Yourself & Identity',
    description: 'Understanding who you are, your values, and your unique path',
    icon: '🔍'
  },
  {
    title: 'Hustle, Pressure & Purpose',
    description: 'Navigating ambition, burnout, and finding meaningful work',
    icon: '💪'
  }
];

export default function Topics() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          const items = entry.target.querySelectorAll('[data-topic]');
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
      <div className="absolute top-0 left-1/3 w-80 h-80 bg-gold/5 rounded-full blur-3xl opacity-25 animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div ref={containerRef} className="max-w-6xl mx-auto opacity-0 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Topics We Explore</h2>
          <p className="text-gray-400 text-lg">Real conversations about what truly matters</p>
          <p className="typewriter-gold-inline text-sm mt-3">✨ More topics coming as our community grows</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {topics.map((topic, index) => (
            <div
              key={index}
              data-topic
              className="group relative p-8 rounded-lg border border-gold/20 bg-gradient-to-br from-white/5 to-transparent hover:border-gold/50 transition-all duration-300 opacity-0 overflow-hidden"
            >
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold/0 via-transparent to-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10">
                <div className="text-5xl mb-4 block">{topic.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-gold transition-colors duration-300">
                  {topic.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">{topic.description}</p>
              </div>

              {/* Accent line */}
              <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-gold to-transparent w-0 group-hover:w-full transition-all duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
