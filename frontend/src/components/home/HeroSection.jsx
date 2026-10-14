import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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
      style={{ minHeight: '92vh', paddingTop: '6rem', paddingBottom: '4rem' }}
    >
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute rounded-full blur-3xl opacity-30"
          style={{
            width: 520, height: 520,
            background: 'radial-gradient(circle, var(--theme-primary) 0%, transparent 70%)',
            top: '-80px', left: '10%',
            transform: `translateY(${scrollY * 0.2}px)`,
            transition: 'transform 0.1s linear',
          }}
        />
        <div
          className="absolute rounded-full blur-3xl opacity-20"
          style={{
            width: 380, height: 380,
            background: 'radial-gradient(circle, var(--theme-accent) 0%, transparent 70%)',
            bottom: '60px', right: '8%',
            transform: `translateY(${-scrollY * 0.15}px)`,
            transition: 'transform 0.1s linear',
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <Badge variant="theme" className="mb-6 tracking-widest uppercase text-xs">
          ✈️ AI-Powered Travel Planning
        </Badge>

        <h1
          className="font-extrabold leading-tight mb-5"
          style={{ fontSize: 'clamp(2.4rem, 6vw, 4.2rem)', letterSpacing: '-0.02em' }}
        >
          Plan Your{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, var(--theme-primary) 0%, var(--theme-accent-contrast, var(--theme-primary)) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Perfect Journey
          </span>
          <br />
          with Intelligent AI
        </h1>

        <p
          className="mx-auto mb-10 leading-relaxed"
          style={{ maxWidth: '580px', fontSize: '1.05rem', color: 'var(--theme-text-muted)' }}
        >
          Discover destinations, get personalised itineraries, and coordinate group travel — all in one place. Your next adventure starts here.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="rounded-xl px-7 hover:scale-105 active:scale-100"
            style={{ boxShadow: '0 8px 28px -4px var(--theme-glow)' }}
          >
            <Link to={isAuthenticated ? '/plan-trip' : '/register'}>
              Start Planning Free →
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-xl px-7 hover:scale-105 active:scale-100"
            style={{
              border: '1.5px solid var(--theme-border)',
              background: 'var(--theme-surface)',
              color: 'var(--theme-text-main)',
            }}
          >
            <Link to="/login">Sign In</Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-14 grid grid-cols-3 gap-6 max-w-xs mx-auto">
          {[['50K+', 'Trips Planned'], ['120+', 'Destinations'], ['4.9★', 'User Rating']].map(([val, lbl]) => (
            <div key={lbl} className="text-center">
              <div className="text-xl font-extrabold" style={{ color: 'var(--theme-primary)' }}>{val}</div>
              <div className="text-xs mt-0.5" style={{ color: 'var(--theme-text-muted)' }}>{lbl}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
