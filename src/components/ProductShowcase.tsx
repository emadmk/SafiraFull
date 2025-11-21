"use client";

import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Star, Shield, Award, Crown } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import productImage from 'figma:asset/8c3457f6a3c82fd473701182876033759e4a1afc.png';
import carpetImage from 'figma:asset/dc6235d92fb2f15cd2b791e9f779412e31a24213.png';

export function ProductShowcase() {
  const features = [
    {
      icon: Shield,
      text: "Blockchain Verified"
    },
    {
      icon: Award,
      text: "Master Artisan Crafted"
    },
    {
      icon: Crown,
      text: "Limited Edition"
    }
  ];

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Carpet Pattern Background */}
      <div className="absolute inset-0 carpet-pattern opacity-30" />
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-carpet-burgundy/20 via-transparent to-carpet-burgundy/20" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-carpet-antique-gold/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative group">
              {/* Main Image Container */}
              <div className="glass-gold rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-carpet-antique-gold/20 via-transparent to-carpet-deep-red/20" />
                
                <ImageWithFallback
                  src={carpetImage}
                  alt="Luxury Persian Kerman Carpet Piece - Handwoven Heritage Collection"
                  className="w-full h-auto rounded-2xl shadow-2xl relative z-10 transform group-hover:scale-105 transition-transform duration-700"
                />

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 glass-red rounded-full p-3 animate-float">
                  <Crown className="w-6 h-6 text-carpet-antique-gold" />
                </div>
                
                <div className="absolute -bottom-4 -left-4 glass-blue rounded-full p-3 animate-float" style={{ animationDelay: '2s' }}>
                  <Shield className="w-6 h-6 text-carpet-antique-gold" />
                </div>
              </div>

              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-carpet-antique-gold/20 to-carpet-deep-red/20 rounded-3xl blur-xl animate-glow -z-10" />
            </div>

            {/* Product Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="absolute -top-6 left-8 glass-gold rounded-full px-6 py-2"
            >
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-carpet-antique-gold fill-current" />
                <span className="text-sm font-medium text-carpet-antique-gold">PA258-2025</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Header */}
            <div>
              <Badge variant="outline" className="border-carpet-antique-gold text-carpet-antique-gold mb-4 bg-carpet-antique-gold/10">
                Now Available for Pre-Order
              </Badge>
              
              <h2 className="font-display text-4xl lg:text-5xl mb-6 leading-tight">
                Authentic <span className="text-carpet-antique-gold">Persian Kerman</span>
                <br />
                Heritage Collection
              </h2>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                Own a piece of thousand-year-old Persian craftsmanship. Each 10×10cm segment 
                is meticulously hand-woven by master artisans using traditional techniques 
                passed down through generations.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.text}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4"
                >
                  <div className="w-12 h-12 glass-gold rounded-full flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-carpet-antique-gold" />
                  </div>
                  <span className="text-lg">{feature.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Pricing Highlight */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              className="glass-red rounded-2xl p-6 border-carpet-deep-red/30"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg text-carpet-cream">Pre-Order Price:</span>
                <div className="text-right">
                  <div className="text-3xl font-display text-carpet-antique-gold">$250</div>
                  <div className="text-sm text-muted-foreground line-through">$500</div>
                </div>
              </div>
              
              <div className="text-sm text-carpet-deep-red mb-4">
                ✓ Save 50% • ✓ Choose your position • ✓ Blockchain authenticated
              </div>
              
              <Button 
                size="lg" 
                className="w-full bg-carpet-antique-gold text-carpet-black hover:bg-carpet-bright-gold animate-glow text-lg py-6"
              >
                Reserve Your Heritage Piece
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              viewport={{ once: true }}
              className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-carpet-antique-gold rounded-full" />
                <span>Limited to 100 pieces</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-carpet-deep-red rounded-full" />
                <span>30-day guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-carpet-royal-blue rounded-full" />
                <span>International shipping</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}