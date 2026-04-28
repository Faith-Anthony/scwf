import { useEffect, useRef } from 'react';

export default function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <footer className="py-12 px-4 bg-stone-950/80 backdrop-blur-sm border-t border-gold/20 relative overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent pointer-events-none"></div>

      <div ref={containerRef} className="max-w-6xl mx-auto text-center opacity-0 relative z-10 space-y-4">
        <p className="text-2xl md:text-3xl font-semibold text-white">
          A safe place for <span className="typewriter-gold-inline">real conversations</span>
        </p>
        
        <p className="typewriter-gold-inline text-lg font-medium">
          2nd & Last Sundays
        </p>

        <p className="text-gray-400 text-sm">
          © 2026 SCWF. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
