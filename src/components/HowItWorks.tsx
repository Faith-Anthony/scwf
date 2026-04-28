import { useEffect, useRef } from 'react';

const steps = [
  {
    number: '01',
    title: 'Join the Community',
    description: 'Sign up and become part of our growing circle'
  },
  {
    number: '02',
    title: 'Participate in Conversations',
    description: 'Show up on the 2nd & last Sundays of each month and engage authentically'
  },
  {
    number: '03',
    title: 'Share & Grow',
    description: 'Express your thoughts and learn from others'
  }
];

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          const items = entry.target.querySelectorAll('[data-step]');
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
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/5 to-transparent pointer-events-none"></div>
      {/* Animated background elements */}
      <div className="absolute top-10 right-1/4 w-72 h-72 bg-gold/4 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      <div ref={containerRef} className="max-w-6xl mx-auto opacity-0 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">How It Works</h2>
          <p className="text-gray-400 text-lg">Three simple steps to get started</p>
        </div>

        <div className="relative">
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} data-step className="relative opacity-0">
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-20 left-[calc(50%+40px)] right-[calc(-50%)] h-0.5 bg-gradient-to-r from-gold to-transparent"></div>
                )}

                <div className="relative">
                  {/* Number circle */}
                  <div className="w-32 h-32 rounded-full border-2 border-gold/50 flex items-center justify-center mb-6 mx-auto bg-gradient-to-br from-gold/10 to-transparent group hover:border-gold transition-colors duration-300">
                    <span className="text-4xl font-bold typewriter-gold-inline">{step.number}</span>
                  </div>

                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
