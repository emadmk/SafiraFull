"use client";

import { motion } from 'motion/react';

export function ProvenanceCards() {
  // Beautiful Custom SVG Icons
  const ShieldIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M9 12L11 14L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.3"/>
      <path d="M12 2L4 5V12C4 15 6 17 9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
    </svg>
  );

  const CraftsmanIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z" fill="currentColor"/>
      <path d="M21 9V7L15 1L9 7V9C9 10 9 11 11 13L10.5 18.5C10.5 19.6 11.4 20.5 12.5 20.5S14.5 19.6 14.5 18.5L14 13C16 11 17 10 17 9H21Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <circle cx="12" cy="15" r="1.5" fill="currentColor" opacity="0.5"/>
      <path d="M8 11L16 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );

  const CrownIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 18L7 3L12 8L17 3L22 18H2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M5 21H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="7" cy="3" r="2" fill="currentColor"/>
      <circle cx="12" cy="8" r="2" fill="currentColor"/>
      <circle cx="17" cy="3" r="2" fill="currentColor"/>
      <path d="M12 13L10 18H14L12 13Z" fill="currentColor" opacity="0.3"/>
    </svg>
  );

  const HeritageIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
      <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 4L12 6L16 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M4 8L6 12L4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M20 8L18 12L20 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.3"/>
    </svg>
  );

  const OriginIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 10C21 17 12 23 12 23S3 17 3 10C3 5.02944 7.02944 1 12 1S21 5.02944 21 10Z" stroke="currentColor" strokeWidth="2"/>
      <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
      <path d="M12 1C15.866 1 19 4.134 19 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
      <circle cx="12" cy="10" r="1" fill="currentColor"/>
      <path d="M8 16L12 20L16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.3"/>
    </svg>
  );

  const LimitedIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
      <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 2L12 6L16 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M22 12C22 17.5228 17.5228 22 12 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
      <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.3"/>
    </svg>
  );

  const features = [
    {
      icon: ShieldIcon,
      title: "Blockchain Verified",
      description: "Each piece verified on blockchain",
      detail: "Immutable proof of authenticity and ownership",
      color: "text-carpet-antique-gold"
    },
    {
      icon: CraftsmanIcon,
      title: "Master Craftsman",
      description: "300+ knots per sq inch natural only",
      detail: "Hand-selected artisans with generational expertise",
      color: "text-carpet-deep-red"
    },
    {
      icon: CrownIcon,
      title: "Collector's Edition",
      description: "Numbered with silver plaque",
      detail: "Museum-quality mounting and certification",
      color: "text-carpet-royal-blue"
    },
    {
      icon: HeritageIcon,
      title: "Heritage Guarantee",
      description: "1000-year tradition preserved",
      detail: "Authentic Kerman weaving techniques",
      color: "text-carpet-antique-gold"
    },
    {
      icon: OriginIcon,
      title: "Persian Origin",
      description: "Sourced from Kerman region",
      detail: "Direct from traditional weaving communities",
      color: "text-carpet-deep-red"
    },
    {
      icon: LimitedIcon,
      title: "Limited Time",
      description: "100 pieces worldwide only",
      detail: "Exclusive pre-order opportunity",
      color: "text-carpet-royal-blue"
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 carpet-pattern opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-carpet-burgundy/5 to-carpet-navy/10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl mb-4">
            Unparalleled <span className="text-carpet-antique-gold">Authenticity</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Every piece is a testament to centuries of Persian craftsmanship
          </p>
        </motion.div>

        {/* Uniform Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass rounded-xl p-6 hover:border-carpet-antique-gold/30 transition-all duration-300 group h-48 flex flex-col"
            >
              <div className="flex items-start gap-4 flex-1">
                <div className="flex-shrink-0">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br from-${feature.color.replace('text-', '')}/20 to-${feature.color.replace('text-', '')}/30 flex items-center justify-center group-hover:from-${feature.color.replace('text-', '')}/30 group-hover:to-${feature.color.replace('text-', '')}/40 transition-all duration-300`}>
                    <div className={feature.color}>
                      <feature.icon />
                    </div>
                  </div>
                </div>
                
                <div className="flex-1">
                  <h4 className={`text-lg mb-2 group-hover:${feature.color} transition-colors duration-300`}>
                    {feature.title}
                  </h4>
                  <p className="text-muted-foreground text-sm mb-2">
                    {feature.description}
                  </p>
                  <p className="text-xs text-muted-foreground/80">
                    {feature.detail}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}