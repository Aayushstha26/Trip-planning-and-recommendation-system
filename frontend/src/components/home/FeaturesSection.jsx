import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const features = [
  {
    icon: '🤖',
    title: 'AI-Powered Planning',
    desc: 'Our intelligent engine crafts personalised itineraries based on your preferences, budget, and travel style.',
  },
  {
    icon: '🗺️',
    title: 'Smart Itineraries',
    desc: 'Day-by-day schedules with optimal routing, local tips, and hidden gems you would never find on your own.',
  },
  {
    icon: '👥',
    title: 'Group Coordination',
    desc: 'Plan with friends and family effortlessly — voting on destinations, splitting costs, and syncing schedules.',
  },
  {
    icon: '⭐',
    title: 'Curated Recommendations',
    desc: 'Restaurants, stays, and activities handpicked by locals and verified by thousands of travellers.',
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-20 px-4" style={{ background: 'var(--theme-elevated)' }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--theme-primary)' }}>
            Why TravelAI
          </p>
          <h2 className="text-3xl font-bold" style={{ letterSpacing: '-0.01em' }}>
            Everything you need to travel smarter
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((f) => (
            <Card key={f.title} className="hover:-translate-y-1">
              <CardHeader>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-2"
                  style={{ background: 'var(--theme-elevated)' }}
                >
                  {f.icon}
                </div>
                <CardTitle>{f.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription>{f.desc}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
