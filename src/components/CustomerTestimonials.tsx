"use client";

import { motion } from 'motion/react';
import { Quote } from 'lucide-react';
import { Card } from './ui/card';
import { StarRating } from './ui/star-rating';
import { VerifiedBadge } from './ui/verified-badge';
import { testimonialsData, testimonialStats } from './constants/testimonials';

export function CustomerTestimonials() {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-carpet-black via-carpet-navy/20 to-carpet-black" />
        <div className="absolute inset-0 carpet-pattern opacity-10" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-carpet-antique-gold" />
            <Quote className="w-6 h-6 text-carpet-antique-gold" />
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-carpet-antique-gold" />
          </div>
          
          <h2 className="font-display text-carpet-cream mb-4 text-4xl lg:text-5xl">
            Collector Testimonials
          </h2>
          
          <p className="text-carpet-cream/80 max-w-2xl mx-auto text-lg">
            Discover what our discerning collectors say about their Persian Heritage pieces
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonialsData.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.2,
                ease: "easeOut"
              }}
              viewport={{ once: true }}
            >
              <Card className="relative group glass-dark border-carpet-antique-gold/20 p-6 h-full hover:border-carpet-antique-gold/40 transition-all duration-300">
                {/* Quote Icon */}
                <div className="absolute top-4 right-4 opacity-20">
                  <Quote className="w-8 h-8 text-carpet-antique-gold transform rotate-12" />
                </div>

                {/* Rating */}
                <div className="mb-4">
                  <StarRating rating={testimonial.rating} />
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-carpet-cream/90 leading-relaxed mb-6 relative z-10">
                  "{testimonial.text}"
                </blockquote>

                {/* Customer Info */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-carpet-antique-gold font-medium">
                        {testimonial.name}
                      </div>
                      <div className="text-carpet-cream/60 text-sm">
                        {testimonial.location}
                      </div>
                    </div>
                    <div className="text-carpet-antique-gold/70 text-sm font-mono">
                      {testimonial.pieceNumber}
                    </div>
                  </div>

                  {/* Verified Badge */}
                  {testimonial.verified && <VerifiedBadge />}
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-carpet-antique-gold/5 via-transparent to-carpet-deep-red/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16 pt-8 border-t border-carpet-antique-gold/20"
        >
          <div className="flex flex-wrap justify-center items-center gap-8 text-carpet-cream/70">
            <div className="flex items-center gap-2">
              <StarRating rating={1} maxRating={1} size="sm" />
              <span className="text-carpet-antique-gold font-medium">{testimonialStats.averageRating}/5</span>
              <span>Average Rating</span>
            </div>
            <div className="w-px h-6 bg-carpet-antique-gold/30" />
            <div>
              <span className="text-carpet-antique-gold font-medium">{testimonialStats.recommendationRate}%</span>
              <span> of collectors recommend to friends</span>
            </div>
            <div className="w-px h-6 bg-carpet-antique-gold/30" />
            <div>
              <span className="text-carpet-antique-gold font-medium">{testimonialStats.authenticityGuarantee}%</span>
              <span> authenticity guaranteed</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}