import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const steps = [
  { num: '01', label: 'Tell Us Your Dream', desc: 'Enter your destination, dates, budget, and travel style preferences.' },
  { num: '02', label: 'AI Builds Your Plan', desc: 'Our engine generates a detailed, optimised itinerary in seconds.' },
  { num: '03', label: 'Customise & Refine', desc: 'Swap activities, add stops, and tailor every detail to your liking.' },
  { num: '04', label: 'Go & Explore', desc: 'Set off with confidence — your trip guide lives in your pocket.' },
];

export default function HowItWorksSection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--theme-primary)' }}>
            The Process
          </p>
          <h2 className="text-3xl font-bold" style={{ letterSpacing: '-0.01em' }}>
            Plan a trip in 4 easy steps
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s) => (
            <Card key={s.num} className="hover:-translate-y-1">
              <CardHeader>
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-extrabold mb-2"
                  style={{ background: 'var(--theme-btn-bg)', color: 'var(--theme-btn-text)' }}
                >
                  {s.num}
                </div>
                <CardTitle className="text-sm">{s.label}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-xs">{s.desc}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
