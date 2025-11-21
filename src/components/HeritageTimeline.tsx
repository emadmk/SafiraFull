"use client";

import { motion } from 'motion/react';

export function HeritageTimeline() {
  // Beautiful Custom SVG Icons
  const YarnIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2"/>
      <path d="M8 8C10 6 14 6 16 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M8 16C10 18 14 18 16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M12 4V8M12 16V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.3"/>
      <path d="M4 12H8M16 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );

  const DyeIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 8C20.2091 8 22 9.79086 22 12C22 14.2091 20.2091 16 18 16H6C3.79086 16 2 14.2091 2 12C2 9.79086 3.79086 8 6 8H18Z" stroke="currentColor" strokeWidth="2"/>
      <path d="M12 2L10 8H14L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M8 8C8 10 10 12 12 12C14 12 16 10 16 8" fill="currentColor" opacity="0.3"/>
      <circle cx="8" cy="12" r="1" fill="currentColor"/>
      <circle cx="12" cy="12" r="1" fill="currentColor"/>
      <circle cx="16" cy="12" r="1" fill="currentColor"/>
    </svg>
  );

  const KnottingIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 12L15 6M15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="9" cy="12" r="2" stroke="currentColor" strokeWidth="2"/>
      <circle cx="15" cy="6" r="2" stroke="currentColor" strokeWidth="2"/>
      <circle cx="15" cy="18" r="2" stroke="currentColor" strokeWidth="2"/>
      <path d="M3 3L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.3"/>
      <circle cx="9" cy="12" r="1" fill="currentColor"/>
      <circle cx="15" cy="6" r="1" fill="currentColor"/>
      <circle cx="15" cy="18" r="1" fill="currentColor"/>
    </svg>
  );

  const FramingIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
      <rect x="6" y="6" width="12" height="12" rx="1" stroke="currentColor" strokeWidth="2"/>
      <path d="M9 9L15 15M15 9L9 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
      <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.3"/>
      <path d="M3 7H6M18 7H21M3 17H6M18 17H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );

  const AuthIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 1L3 5V11C3 16 6 20 12 23C18 20 21 16 21 11V5L12 1Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M9 12L11 14L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
      <path d="M12 1L21 5V11C21 13 20 15 18 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
    </svg>
  );

  const steps = [
    {
      icon: YarnIcon,
      title: "Natural Yarn",
      subtitle: "Hand-selected highland wool",
      description: "Premium wool sourced from highland sheep, selected for its exceptional quality and durability.",
      color: "text-carpet-antique-gold"
    },
    {
      icon: DyeIcon,
      title: "Natural Dye",
      subtitle: "Saffron, pomegranate, indigo",
      description: "Traditional plant-based dyes create vibrant, lasting colors using ancient Persian techniques.",
      color: "text-carpet-deep-red"
    },
    {
      icon: KnottingIcon,
      title: "Traditional Knotting",
      subtitle: "300+ knots per sq inch",
      description: "Master artisans hand-tie each knot with precision passed down through generations.",
      color: "text-carpet-royal-blue"
    },
    {
      icon: FramingIcon,
      title: "Professional Framing",
      subtitle: "Museum quality mounting",
      description: "Each piece is professionally mounted in a premium frame with archival materials.",
      color: "text-carpet-antique-gold"
    },
    {
      icon: AuthIcon,
      title: "Authentication",
      subtitle: "Blockchain verification",
      description: "Digital certificate ensures authenticity and provenance for your investment.",
      color: "text-carpet-deep-red"
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 carpet-pattern opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-carpet-navy/5 to-carpet-burgundy/10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl mb-4">
            From Ancient Technique to <span className="text-carpet-antique-gold">Modern Masterpiece</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Each piece follows a thousand-year-old process, enhanced with modern authentication
          </p>
        </motion.div>

        {/* Desktop Timeline */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-carpet-antique-gold/30 via-carpet-antique-gold to-carpet-antique-gold/30" />
            
            <div className="flex justify-between items-start">
              {steps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="flex-1 text-center relative"
                >
                  {/* Icon Circle */}
                  <div className={`relative z-10 mx-auto w-16 h-16 bg-gradient-to-br from-${step.color.replace('text-', '')}/80 to-${step.color.replace('text-', '')}/60 rounded-full flex items-center justify-center mb-6 shadow-lg border border-${step.color.replace('text-', '')}/30`}>
                    <div className="text-carpet-cream">
                      <step.icon />
                    </div>
                  </div>
                  
                  {/* Content - Uniform Height */}
                  <div className="glass rounded-xl max-w-xs mx-auto h-44 flex flex-col justify-between p-[21px] px-[7px] py-[21px]">
                    <div>
                      <h3 className="text-lg mb-2">{step.title}</h3>
                      <p className={`${step.color} text-sm mb-3`}>{step.subtitle}</p>
                    </div>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Timeline - Uniform Height Cards */}
        <div className="lg:hidden space-y-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex items-start gap-4"
            >
              {/* Icon */}
              <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-br from-${step.color.replace('text-', '')}/80 to-${step.color.replace('text-', '')}/60 rounded-full flex items-center justify-center border border-${step.color.replace('text-', '')}/30`}>
                <div className="text-carpet-cream">
                  <step.icon />
                </div>
              </div>
              
              {/* Content - Uniform Height */}
              <div className="flex-1 glass rounded-xl p-6 h-36 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg mb-1">{step.title}</h3>
                  <p className={`${step.color} text-sm mb-2`}>{step.subtitle}</p>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-6">
            This meticulous process takes 12+ months to complete each masterpiece
          </p>
        </motion.div>
      </div>
    </section>
  );
}