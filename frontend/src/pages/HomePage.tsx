import React from 'react';
import { LandingSection } from '../components/sections/LandingSection';
import { AboutSection } from '../components/sections/AboutSection';
import { FarmerSection } from '../components/sections/FarmerSection';
import { MarketplaceSection } from '../components/sections/MarketplaceSection';
import { RewardsSection } from '../components/sections/RewardsSection';
import { ImpactSection } from '../components/sections/ImpactSection';
import { ContactSection } from '../components/sections/ContactSection';
import { Footer } from '../components/Footer';

export const HomePage: React.FC = () => {
  return (
    <main>
      <LandingSection />
      <AboutSection />
      <FarmerSection />
      <MarketplaceSection />
      <RewardsSection />
      <ImpactSection />
      <ContactSection />
      <Footer />
    </main>
  );
};