import React from 'react';

const steps = [
  {
    num: '01',
    emoji: '🎯',
    label: 'Tell Us Your Dream',
    desc: 'Choose your Nepal destination, travel dates, group size, budget, and fitness level. We tailor everything to you.',
  },
  {
    num: '02',
    emoji: '🤖',
    label: 'AI Builds Your Plan',
    desc: 'Our engine generates a detailed, day-by-day Nepal itinerary in seconds — with permits, transport, and accommodation.',
  },
  {
    num: '03',
    emoji: '✏️',
    label: 'Customise & Refine',
    desc: 'Swap trekking routes, add a side trip to Lumbini, adjust rest days — tailor every detail to your liking.',
  },
  {
    num: '04',
    emoji: '🏔️',
    label: 'Go & Explore',
    desc: 'Set off with your complete Nepal travel guide in your pocket. Real-time tips, offline maps, and emergency contacts included.',
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-24 px-4" style={{ background: 'var(--theme-bg)' }}>
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--theme-primary)' }}>
            How It Works
          </p>
          <h2 className="text-3xl font-extrabold" style={{ letterSpacing: '-0.02em' }}>
            Your Nepal adventure in 4 steps
          </h2>
          <p className="mt-3 text-sm max-w-md mx-auto" style={{ color: 'var(--theme-text-muted)' }}>
            Planning a complex Himalayan trip is hard. We make it simple.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connector line on large screens */}
          <div
            className="hidden lg:block absolute top-9 left-[12.5%] right-[12.5%] h-px"
            style={{ background: 'var(--theme-border)' }}
          />

          {steps.map((s, i) => (
            <div key={s.num} className="relative flex flex-col items-center text-center">
              {/* Step circle */}
              <div
                className="relative z-10 w-16 h-16 rounded-2xl flex flex-col items-center justify-center mb-5 font-extrabold shadow-md"
                style={{
                  background: 'var(--theme-btn-bg, #c8ff00)',
                  color: 'var(--theme-btn-text, #06110d)',
                }}
              >
                <span className="text-xl leading-none">{s.emoji}</span>
                <span className="text-[9px] font-extrabold mt-0.5 uppercase tracking-wider opacity-70">{s.num}</span>
              </div>
              <h3 className="font-bold text-sm mb-2" style={{ color: 'var(--theme-text-main)' }}>
                {s.label}
              </h3>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--theme-text-muted)' }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
