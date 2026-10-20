import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function AIBannerSection() {
  const { isAuthenticated } = useSelector((s) => s.auth);

  return (
    <section className="py-24 px-4" style={{ background: 'var(--theme-elevated)' }}>
      <div className="max-w-5xl mx-auto">
        {/* Two-column layout: text left, facts right */}
        <div
          className="rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-2"
          style={{ boxShadow: 'var(--theme-card-shadow)' }}
        >
          {/* Left – dark panel */}
          <div
            className="p-10 flex flex-col justify-center"
            style={{
              background: 'var(--theme-primary)',
              color: 'var(--theme-primary-text)',
            }}
          >
            <div className="text-3xl mb-4">🤖</div>
            <h2
              className="text-2xl sm:text-3xl font-extrabold mb-4 leading-tight"
              style={{ letterSpacing: '-0.02em' }}
            >
              Let AI plan your<br />Nepal adventure
            </h2>
            <p className="text-sm leading-relaxed opacity-75 mb-8">
              Just tell us where you want to go in Nepal and when. Our AI handles trekking permits, teahouse bookings, altitude schedules, and local dining — so you can focus on making memories in the Himalayas.
            </p>
            <Link
              to={isAuthenticated ? '/dashboard/planner' : '/register'}
              className="self-start px-7 py-3 rounded-xl font-bold text-sm transition-all hover:scale-105 active:scale-100"
              style={{
                background: 'var(--theme-primary-text)',
                color: 'var(--theme-primary)',
              }}
            >
              Start Planning Free →
            </Link>
          </div>

          {/* Right – Nepal facts */}
          <div
            className="p-10 flex flex-col justify-center gap-6"
            style={{ background: 'var(--theme-surface)' }}
          >
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--theme-primary)' }}>
              Nepal by the numbers
            </p>
            {[
              ['8', 'of the world\'s 14 eight-thousanders are in Nepal', '🏔️'],
              ['1,400+', 'trekking routes and trails across Nepal', '🥾'],
              ['3', 'climate zones from tropical jungle to arctic peaks', '🌿'],
              ['10M+', 'tourists visit Nepal every year', '✈️'],
            ].map(([num, label, icon]) => (
              <div key={num} className="flex items-start gap-4">
                <div
                  className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                  style={{ background: 'var(--theme-elevated)' }}
                >
                  {icon}
                </div>
                <div>
                  <div className="font-extrabold text-xl leading-none" style={{ color: 'var(--theme-primary)' }}>
                    {num}
                  </div>
                  <div className="text-xs mt-1 leading-snug" style={{ color: 'var(--theme-text-muted)' }}>
                    {label}
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
