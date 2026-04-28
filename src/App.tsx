import { lazy, Suspense } from 'react';
import ScrollProgress from './components/ScrollProgress';
import Hero from './components/Hero';
import Footer from './components/Footer';

// Lazy load non-critical sections
const About = lazy(() => import('./components/About'));
const Host = lazy(() => import('./components/Host'));
const WhyJoin = lazy(() => import('./components/WhyJoin'));
const HowItWorks = lazy(() => import('./components/HowItWorks'));
const Topics = lazy(() => import('./components/Topics'));
const Registration = lazy(() => import('./components/Registration'));

// Loading placeholder with animated shimmer
function LoadingPlaceholder() {
  return (
    <div className="py-20 px-4 bg-stone-950">
      <div className="max-w-6xl mx-auto">
        <div className="h-12 bg-gradient-to-r from-gold/0 via-gold/10 to-gold/0 rounded-lg animate-pulse"></div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="bg-stone-950 text-white relative">
      {/* Subtle background gradients */}
      <div className="fixed inset-0 bg-gradient-to-b from-gold/4 via-stone-950 to-stone-950 pointer-events-none"></div>
      <div className="fixed inset-0 bg-gradient-to-r from-transparent via-stone-950 to-gold/3 pointer-events-none"></div>
      
      {/* Floating stars background - moves across entire site */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute text-2xl animate-float opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 4}s`,
              animationDuration: `${20 + i * 2}s`,
            }}
          >
            ✨
          </div>
        ))}
      </div>
      
      <div className="relative z-10">
        <ScrollProgress />
        <Hero />
        <Suspense fallback={<LoadingPlaceholder />}>
          <About />
        </Suspense>
        <Suspense fallback={<LoadingPlaceholder />}>
          <Host />
        </Suspense>
        <Suspense fallback={<LoadingPlaceholder />}>
          <WhyJoin />
        </Suspense>
        <Suspense fallback={<LoadingPlaceholder />}>
          <HowItWorks />
        </Suspense>
        <Suspense fallback={<LoadingPlaceholder />}>
          <Topics />
        </Suspense>
        <Suspense fallback={<LoadingPlaceholder />}>
          <Registration />
        </Suspense>
        <Footer />
      </div>
    </div>
  );
}
