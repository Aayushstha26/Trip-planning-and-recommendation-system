import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';

export default function AIBannerSection() {
  const { isAuthenticated } = useSelector((s) => s.auth);

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div
          className="rounded-3xl p-10 text-center relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, var(--theme-primary) 0%, var(--theme-accent-contrast, var(--theme-primary)) 100%)',
            color: '#fff',
          }}
        >
          {/* Decorative blobs */}
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-white/10 blur-2xl pointer-events-none" />

          <div className="relative z-10">
            <div className="text-4xl mb-4">🤖</div>
            <h2
              className="text-2xl sm:text-3xl font-extrabold mb-3"
              style={{ letterSpacing: '-0.01em' }}
            >
              Let AI do the heavy lifting
            </h2>
            <p className="text-sm sm:text-base opacity-85 max-w-lg mx-auto mb-8 leading-relaxed">
              Just tell us where you want to go and when. Our AI handles flights, hotels, activities, and local dining — so you can focus on making memories.
            </p>
            <Button
              asChild
              className="rounded-xl px-8 hover:scale-105 active:scale-100"
              style={{ background: '#fff', color: 'var(--theme-primary)' }}
            >
              <Link to={isAuthenticated ? '/plan-trip' : '/register'}>
                Try It Free →
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
