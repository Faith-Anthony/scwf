import { useEffect, useRef } from 'react';

export default function Hero() {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      },
      { threshold: 0.1 }
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToSection = () => {
    const registrationSection = document.getElementById('registration');
    registrationSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center px-4 py-20 bg-stone-950 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-gold/30 to-transparent rounded-full blur-3xl animate-pulse\"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-gold/20 to-transparent rounded-full blur-3xl animate-pulse\" style={{ animationDelay: '2s' }}></div>
      </div>

      <div ref={textRef} className="relative z-10 text-center max-w-4xl mx-auto opacity-0">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight overflow-hidden">
          <span className="inline-block animate-typewriter">Sunday Conversations with </span>
          <span className="typewriter-gold" style={{ animationDelay: '2.4s' }}>Fainoch</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-300 mb-12 leading-relaxed max-w-2xl mx-auto">
          A safe space for real, honest conversations about life, growth, faith, purpose, and everything in between.
        </p>

        <button
          onClick={scrollToSection}
          className="inline-block px-8 md:px-10 py-4 md:py-5 bg-gold text-black font-semibold rounded-lg transition-all duration-300 hover:bg-white hover:shadow-xl hover:shadow-gold/20 transform hover:scale-105 active:scale-95"
        >
          Join the Community
        </button>
      </div>
    </section>
  );
}
