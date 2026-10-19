import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import DestinationsSection from '@/components/home/DestinationsSection';
import AIBannerSection from '@/components/home/AIBannerSection';

export default function Home() {
  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{ background: 'var(--theme-bg)', color: 'var(--theme-text-main)' }}
    >
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <DestinationsSection />
      <AIBannerSection />
    </div>
  );
}