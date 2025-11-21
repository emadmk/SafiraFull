"use client";

import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';

export function HeroSection() {
  // Beautiful Custom SVG Icons for Social Proof
  const EyeIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 12C1 12 5 4 12 4S23 12 23 12S19 20 12 20S1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
      <path d="M12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );

  const UsersIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="8.5" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
      <path d="M23 21V19C23 18.1645 22.7155 17.3737 22.2094 16.7336C21.7033 16.0934 20.9983 15.6394 20.2 15.4373" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 3.46997C16.8003 3.67191 17.5064 4.12616 18.0129 4.7668C18.5194 5.40743 18.8043 6.19854 18.8043 7.03497C18.8043 7.87141 18.5194 8.66252 18.0129 9.30315C17.5064 9.94379 16.8003 10.398 16 10.6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const TrendingIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polyline points="22,7 13.5,15.5 8.5,10.5 2,17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="16,7 22,7 22,13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="13.5" cy="15.5" r="2" fill="currentColor" opacity="0.3"/>
      <circle cx="8.5" cy="10.5" r="2" fill="currentColor" opacity="0.3"/>
    </svg>
  );

  // Custom SVG Icons for Features
  const BlockchainIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M12 22V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M22 7L12 12L2 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 9.5L12 12L17 9.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.3"/>
    </svg>
  );

  const MuseumIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 21H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5 21V7L12 4L19 7V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 9V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 9V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M15 9V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="4" r="2" fill="currentColor"/>
      <rect x="6" y="19" width="12" height="2" fill="currentColor" opacity="0.3"/>
    </svg>
  );

  const CraftIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z" fill="currentColor"/>
      <path d="M21 9V7L15 1L9 7V9C9 10 9 11 11 13L10.5 18.5C10.5 19.6 11.4 20.5 12.5 20.5S14.5 19.6 14.5 18.5L14 13C16 11 17 10 17 9H21Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M7.5 8.5L4.5 11.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M16.5 8.5L19.5 11.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="12" cy="15" r="1.5" fill="currentColor" opacity="0.5"/>
    </svg>
  );

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-70"
          style={{ filter: 'blur(2px) brightness(0.3)' }}
        >
          <source src="https://melisa.ae/00_1.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-carpet-black/90 via-carpet-navy/70 to-carpet-black/95" />
      </div>

      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 carpet-pattern opacity-20" />

      {/* Content - Different layout for mobile vs desktop */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Ultra Minimal Version - Same for both Mobile and Desktop */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="space-y-12 lg:space-y-16"
        >
          {/* Beautiful Large Headline */}
          <div className="space-y-4 lg:space-y-6">
            <h1 className="font-display text-carpet-cream leading-[0.95] text-4xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tight">
              Persian
              <br />
              <span className="text-carpet-antique-gold animate-shimmer bg-gradient-to-r from-carpet-antique-gold via-carpet-bright-gold to-carpet-antique-gold bg-clip-text inline-block">
                Heritage
              </span>
            </h1>
            
            <div className="h-px w-24 lg:w-32 bg-gradient-to-r from-transparent via-carpet-antique-gold to-transparent mx-auto opacity-60" />
            
            <p className="text-carpet-antique-gold font-display text-lg md:text-xl lg:text-2xl tracking-widest uppercase opacity-90">
              Handwoven Legacy
            </p>
          </div>

          {/* Single CTA Button */}
          <div className="space-y-4">
            <Button 
              size="lg" 
              className="bg-carpet-antique-gold text-carpet-black hover:bg-carpet-bright-gold animate-glow px-12 lg:px-16 py-6 lg:py-8 h-auto text-lg lg:text-xl shadow-2xl border border-carpet-antique-gold/50 transition-all duration-300 hover:scale-105"
            >
              Reserve Your Piece - $100
            </Button>
            
            {/* Small scroll hint */}
            <p className="text-carpet-cream/60 text-xs lg:text-sm font-light tracking-wide">
              Scroll down for more information
            </p>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator - Desktop Only */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float hidden lg:block"
      >
        <div className="w-6 h-10 border-2 border-carpet-antique-gold/50 rounded-full flex justify-center backdrop-blur-sm">
          <div className="w-1 h-3 bg-carpet-antique-gold rounded-full mt-2 animate-pulse" />
        </div>
      </motion.div>
    </section>
  );
}