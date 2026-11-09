import React from 'react';

const features = [
  {
    icon: '🤖',
    title: 'AI-Powered Planning',
    desc: 'Our intelligent engine crafts personalised Nepal itineraries based on your travel style, budget, and fitness level — from easy cultural tours to intense Himalayan treks.',
  },
  {
    icon: '🗺️',
    title: 'Smart Itineraries',
    desc: 'Day-by-day schedules with optimal trekking routes, teahouse stops, altitude acclimatisation days, and hidden trails that only locals know.',
  },
  {
    icon: '👥',
    title: 'Group Coordination',
    desc: 'Plan with friends effortlessly — vote on destinations, sync departure dates, share permits, and split expenses all in one place.',
  },
  {
    icon: '⭐',
    title: 'Curated Recommendations',
    desc: 'From the best dal bhat spots in Namche Bazaar to boutique lodges in Thamel — every recommendation is verified by real travellers.',
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-24 px-4" style={{ background: 'var(--theme-bg)' }}>
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--theme-primary)' }}>
            Why WanderAI
          </p>
          <h2 className="text-3xl font-extrabold" style={{ letterSpacing: '-0.02em' }}>
            Everything you need to travel smarter in Nepal
          </h2>
          <p className="mt-3 text-sm max-w-xl mx-auto" style={{ color: 'var(--theme-text-muted)' }}>
            We handle the complexity of Himalayan travel — permits, logistics, weather windows — so you focus on the experience.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="group flex gap-5 p-6 rounded-2xl border transition-all duration-200 hover:-translate-y-1"
              style={{
                background: 'var(--theme-surface)',
                borderColor: 'var(--theme-border-subtle)',
                boxShadow: 'var(--theme-card-shadow)',
              }}
            >
              <div
                className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                style={{ background: 'var(--theme-elevated)' }}
              >
                {f.icon}
              </div>
              <div>
                <h3 className="font-bold text-base mb-1" style={{ color: 'var(--theme-text-main)' }}>
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--theme-text-muted)' }}>
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
