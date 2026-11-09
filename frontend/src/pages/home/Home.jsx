import React from 'react';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import HowItWorksSection from './components/HowItWorksSection';
import DestinationsSection from './components/DestinationsSection';
import AIBannerSection from './components/AIBannerSection';

export default function Home() {
  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{ background: 'var(--theme-bg)', color: 'var(--theme-text-main)' }}
    >
      <HeroSection />
      <FeaturesSection />
      <DestinationsSection />
      <HowItWorksSection />
      <AIBannerSection />
    </div>
  );
}