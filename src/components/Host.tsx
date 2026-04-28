import { useEffect, useRef } from 'react';

export default function Host() {
  const containerRef = useRef<HTMLDivElement>(null);

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

  return (
    <section className="py-20 md:py-32 px-4 bg-stone-950 relative overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/3 to-transparent pointer-events-none"></div>
      {/* Animated background elements */}
      <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-gold/4 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div ref={containerRef} className="max-w-6xl mx-auto opacity-0 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image side */}
          <div className="flex justify-center md:justify-start">
            <div className="relative w-80 h-80 md:w-96 md:h-96">
              {/* Gradient ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold/30 to-transparent blur-2xl"></div>
              {/* Image with elegant styling - fills circle completely with centered positioning */}
              <img 
                src="/images/fainoch.jpg" 
                alt="Fainoch - Community Host"
                className="w-full h-full rounded-full object-cover object-center border-2 border-gold/50"
              />
            </div>
          </div>

          {/* Text side */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Meet Your Host</h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              <span className="text-gold font-semibold">Fainoch</span> is dedicated to creating spaces where real conversations thrive. With a passion for authentic dialogue and human connection, Fainoch brings intentionality, empathy, and depth to every Sunday gathering.
            </p>
            <p className="text-gray-400 leading-relaxed">
              "My mission is simple: foster spaces where people can explore life's big questions, support one another's growth, and remember that we're not alone in our journeys."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
