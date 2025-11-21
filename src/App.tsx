"use client";

import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { ProductShowcase } from './components/ProductShowcase';
import { CountdownTimer } from './components/CountdownTimer';
import { CustomerTestimonials } from './components/CustomerTestimonials';
import { ProvenanceCards } from './components/ProvenanceCards';
import { PricingSection } from './components/PricingSection';
import { InvestmentCalculator } from './components/InvestmentCalculator';
import { HeritageTimeline } from './components/HeritageTimeline';
import { GridSelection } from './components/GridSelection';
import { CarpetHeritageSection } from './components/CarpetHeritageSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative">
        {/* Hero Section */}
        <HeroSection />

        {/* Product Showcase - Desktop only */}
        <div className="hidden lg:block">
          <ProductShowcase />
        </div>

        {/* Countdown Timer - Desktop only */}
        <div className="hidden lg:block">
          <CountdownTimer />
        </div>

        {/* Customer Testimonials */}
        <CustomerTestimonials />

        {/* Pricing Section - Desktop only */}
        <div className="hidden lg:block">
          <PricingSection />
        </div>

        {/* Investment Calculator - Desktop only */}
        <div className="hidden lg:block">
          <InvestmentCalculator />
        </div>

        {/* Heritage Timeline - Desktop only */}
        <div className="hidden lg:block">
          <HeritageTimeline />
        </div>

        {/* Grid Selection */}
        <GridSelection />

        {/* Persian Carpet Heritage - Desktop only */}
        <div className="hidden lg:block">
          <CarpetHeritageSection />
        </div>

        {/* FAQ Section - Desktop only */}
        <div className="hidden lg:block">
          <FAQSection />
        </div>

        {/* Provenance Cards */}
        <ProvenanceCards />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}