import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import heroBg from '@/assets/hero_nepal.jpg';

export default function HeroSection() {
  const { isAuthenticated } = useSelector((s) => s.auth);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      className="relative flex flex-col items-center justify-center text-center overflow-hidden"
      style={{ minHeight: '96vh' }}
    >
      {/* Full-screen Nepal photo background with parallax */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `translateY(${scrollY * 0.3}px)`,
          willChange: 'transform',
        }}
      />

      {/* Gradient overlay — dark at bottom for text, lighter at top */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.72) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 pt-28 pb-20">
        {/* Label pill */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-8 border border-white/20"
          style={{ background: 'rgba(255,255,255,0.12)', color: '#fff', backdropFilter: 'blur(8px)' }}
        >
          <span>🏔️</span> Nepal Trip Planner & Recommender
        </div>

        {/* Headline */}
        <h1
          className="font-extrabold leading-tight mb-6 text-white"
          style={{ fontSize: 'clamp(2.4rem, 6.5vw, 4.5rem)', letterSpacing: '-0.025em', textShadow: '0 2px 20px rgba(0,0,0,0.4)' }}
        >
          Discover the Magic<br />
          of <span style={{ color: 'var(--theme-btn-bg, #c8ff00)' }}>Nepal</span> with AI
        </h1>

        {/* Subtext */}
        <p
          className="mx-auto mb-10 leading-relaxed text-white/80"
          style={{ maxWidth: '580px', fontSize: '1.1rem' }}
        >
          From the Everest Base Camp to the tranquil lakes of Pokhara — get
          personalised itineraries, group trip coordination, and AI-powered
          recommendations for your perfect Himalayan adventure.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <Link
            to={isAuthenticated ? '/dashboard/planner' : '/register'}
            className="px-8 py-3.5 rounded-xl font-bold text-sm transition-all hover:scale-105 active:scale-100 shadow-lg"
            style={{
              backgroundColor: 'var(--theme-btn-bg, #c8ff00)',
              color: 'var(--theme-btn-text, #06110d)',
              boxShadow: '0 8px 28px -4px rgba(200,255,0,0.5)',
            }}
          >
            Plan My Nepal Trip →
          </Link>
          <Link
            to="/explore"
            className="px-8 py-3.5 rounded-xl font-bold text-sm border border-white/30 text-white transition-all hover:bg-white/10 active:scale-100"
            style={{ backdropFilter: 'blur(8px)' }}
          >
            Explore Destinations
          </Link>
        </div>
      </div>
    </section>
  );
}
