import React from 'react';

const destinations = [
  {
    name: 'Everest Region',
    region: 'Khumbu, Solukhumbu',
    tag: 'Trekking',
    tagColor: '#1e6bd4',
    description: 'The world\'s highest peak and its legendary base camp trail. Namche Bazaar, Tengboche monastery, and breathtaking Himalayan vistas await.',
    img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
    duration: '12–18 days',
  },
  {
    name: 'Pokhara',
    region: 'Gandaki Province',
    tag: 'Lake & Mountains',
    tagColor: '#2a9d5c',
    description: 'Nepal\'s adventure capital. Phewa Lake\'s mirror-like reflection of Annapurna, paragliding over rice terraces, and a vibrant lakeside culture.',
    img: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&q=80',
    duration: '3–5 days',
  },
  {
    name: 'Kathmandu Valley',
    region: 'Bagmati Province',
    tag: 'Cultural',
    tagColor: '#c0392b',
    description: 'Seven UNESCO World Heritage sites in one valley. Ancient durbar squares, Boudhanath stupa, Pashupatinath temple, and centuries of living history.',
    img: 'https://images.unsplash.com/photo-1571893544028-34d2c17f8ac3?w=600&q=80',
    duration: '2–4 days',
  },
  {
    name: 'Chitwan National Park',
    region: 'Narayani, Bagmati',
    tag: 'Wildlife',
    tagColor: '#7b4f12',
    description: 'Explore dense jungle on elephant back or dugout canoe. One-horned rhinos, Royal Bengal tigers, gharials, and over 500 species of birds.',
    img: 'https://images.unsplash.com/photo-1549366021-9f761d450615?w=600&q=80',
    duration: '2–3 days',
  },
];

export default function DestinationsSection() {
  return (
    <section className="py-24 px-4" style={{ background: 'var(--theme-elevated)' }}>
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--theme-primary)' }}>
            Top Destinations
          </p>
          <h2 className="text-3xl font-extrabold" style={{ letterSpacing: '-0.02em' }}>
            Discover Nepal's finest destinations
          </h2>
          <p className="mt-3 text-sm max-w-xl mx-auto" style={{ color: 'var(--theme-text-muted)' }}>
            From Himalayan giants to jungle safaris — Nepal packs an extraordinary range of experiences into one small country.
          </p>
        </div>

        {/* Destination grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {destinations.map((d) => (
            <div
              key={d.name}
              className="group rounded-2xl overflow-hidden border transition-all duration-250 hover:-translate-y-2 hover:shadow-2xl"
              style={{
                background: 'var(--theme-surface)',
                borderColor: 'var(--theme-border-subtle)',
                boxShadow: 'var(--theme-card-shadow)',
              }}
            >
              {/* Photo */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={d.img}
                  alt={d.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                {/* Tag pill on photo */}
                <span
                  className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider text-white"
                  style={{ background: d.tagColor }}
                >
                  {d.tag}
                </span>
                {/* Duration pill */}
                <span
                  className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold text-white"
                  style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
                >
                  🕐 {d.duration}
                </span>
              </div>

              {/* Text */}
              <div className="p-4">
                <div className="mb-0.5">
                  <h3 className="font-extrabold text-sm" style={{ color: 'var(--theme-text-main)' }}>
                    {d.name}
                  </h3>
                  <p className="text-[11px] font-medium" style={{ color: 'var(--theme-text-muted)' }}>
                    📍 {d.region}
                  </p>
                </div>
                <p className="mt-2 text-xs leading-relaxed" style={{ color: 'var(--theme-text-muted)' }}>
                  {d.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
