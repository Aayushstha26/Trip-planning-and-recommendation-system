import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const destinations = [
  {
    name: 'Santorini',
    country: 'Greece',
    tag: 'Romantic',
    emoji: '🌅',
    bg: 'from-blue-400 to-indigo-600',
    description: 'Clifftop villages with volcanic beaches and stunning sunsets.',
  },
  {
    name: 'Kyoto',
    country: 'Japan',
    tag: 'Cultural',
    emoji: '⛩️',
    bg: 'from-pink-400 to-rose-600',
    description: 'Ancient temples, bamboo forests, and vibrant cherry blossoms.',
  },
  {
    name: 'Banff',
    country: 'Canada',
    tag: 'Adventure',
    emoji: '🏔️',
    bg: 'from-teal-400 to-emerald-600',
    description: 'Turquoise lakes and snow-capped peaks in pristine wilderness.',
  },
  {
    name: 'Marrakech',
    country: 'Morocco',
    tag: 'Explorer',
    emoji: '🕌',
    bg: 'from-orange-400 to-amber-600',
    description: 'Vibrant souks, palatial riads, and Saharan adventures.',
  },
];

export default function DestinationsSection() {
  return (
    <section className="py-20 px-4" style={{ background: 'var(--theme-elevated)' }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--theme-primary)' }}>
            Discover
          </p>
          <h2 className="text-3xl font-bold" style={{ letterSpacing: '-0.01em' }}>
            Trending destinations
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {destinations.map((d) => (
            <Card key={d.name} className="group overflow-hidden hover:-translate-y-2 p-0">
              <div
                className={`h-40 bg-gradient-to-br ${d.bg} flex items-center justify-center text-5xl relative overflow-hidden`}
              >
                <span className="drop-shadow-lg z-10">{d.emoji}</span>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-300" />
              </div>
              <CardHeader className="pb-1">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm">{d.name}</CardTitle>
                  <Badge variant="theme" className="text-xs">{d.tag}</Badge>
                </div>
                <CardDescription className="text-xs">{d.country}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-xs">{d.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
