"use client";

import { motion } from 'motion/react';
import { Button } from './ui/button';
import { CheckCircle, Star } from 'lucide-react';

export function PricingSection() {
  const benefits = [
    "50% savings vs regular price",
    "Priority grid position selection",
    "Numbered authenticity certificate",
    "12-month creation timeline",
    "Monthly progress updates",
    "30-day money back guarantee"
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Carpet Pattern Background */}
      <div className="absolute inset-0 carpet-pattern opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-carpet-burgundy/10 to-carpet-black/20" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl mb-4">
            <span className="text-carpet-antique-gold">Heritage Collection</span> Pre-Order
          </h2>
          <p className="text-xl text-muted-foreground">
            Secure your piece of Persian history with exclusive pre-order pricing
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="glass-gold rounded-3xl p-8 md:p-12 relative overflow-hidden border-carpet-antique-gold/30"
        >
          {/* Luxury Border Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-carpet-antique-gold/20 via-carpet-deep-red/20 to-carpet-antique-gold/20 rounded-3xl blur-xl animate-glow -z-10" />

          <div className="relative z-10">
            {/* Pricing Structure */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 mb-6 glass-red rounded-full px-6 py-3 border-carpet-deep-red/30">
                <Star className="w-5 h-5 text-carpet-antique-gold fill-current" />
                <span className="text-sm uppercase tracking-wider text-carpet-antique-gold font-medium">Limited Time Offer</span>
                <Star className="w-5 h-5 text-carpet-antique-gold fill-current" />
              </div>

              <div className="space-y-6 mb-8">
                <div className="flex justify-between items-center py-4 border-b border-carpet-antique-gold/20">
                  <span className="text-xl text-carpet-cream">Reserve Now:</span>
                  <span className="text-3xl font-display text-carpet-antique-gold">$100</span>
                </div>
                <div className="flex justify-between items-center py-4 border-b border-carpet-antique-gold/20">
                  <span className="text-xl text-carpet-cream">Complete Later:</span>
                  <span className="text-3xl font-display text-carpet-cream">$150</span>
                </div>
                <div className="flex justify-between items-center py-6 border-b-2 border-carpet-antique-gold/50 bg-carpet-antique-gold/5 rounded-xl px-6 -mx-6">
                  <span className="text-2xl font-display text-carpet-antique-gold">Total Investment:</span>
                  <span className="text-4xl font-display text-carpet-antique-gold animate-shimmer bg-gradient-to-r from-carpet-antique-gold via-carpet-bright-gold to-carpet-antique-gold bg-clip-text">$250</span>
                </div>
              </div>

              <div className="glass-red rounded-xl p-6 mb-8 border-carpet-deep-red/30">
                <p className="text-carpet-deep-red text-lg">
                  <span className="line-through text-muted-foreground mr-3 text-xl">Regular Price: $500</span>
                  <span className="text-carpet-antique-gold font-display text-xl">Save 50%</span>
                </p>
              </div>
            </div>

            {/* Benefits List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 glass-dark rounded-xl p-4"
                >
                  <CheckCircle className="w-6 h-6 text-carpet-deep-red flex-shrink-0" />
                  <span className="text-carpet-cream">{benefit}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="text-center">
              <Button 
                size="lg" 
                className="bg-carpet-antique-gold text-carpet-black hover:bg-carpet-bright-gold px-12 py-6 h-auto text-xl animate-glow shadow-2xl border border-carpet-antique-gold/50"
              >
                Reserve Now - $100
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                No commitment • Full refund within 30 days • Secure payment
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}