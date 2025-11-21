"use client";

import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Badge } from './ui/badge';
import { Clock, MapPin, Users, Award } from 'lucide-react';

export function CarpetHeritageSection() {
  const heritageStats = [
    {
      icon: Clock,
      number: "1000+",
      label: "Years of Tradition",
      color: "text-carpet-antique-gold"
    },
    {
      icon: MapPin,
      number: "Kerman",
      label: "Province Origin",
      color: "text-carpet-deep-red"
    },
    {
      icon: Users,
      number: "5-10",
      label: "Artisans per Carpet",
      color: "text-carpet-royal-blue"
    },
    {
      icon: Award,
      number: "UNESCO",
      label: "Recognized Heritage",
      color: "text-carpet-antique-gold"
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 carpet-pattern opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-carpet-navy/10 to-carpet-burgundy/10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="border-carpet-antique-gold text-carpet-antique-gold mb-4 bg-carpet-antique-gold/10">
            Persian Heritage
          </Badge>
          <h2 className="font-display text-4xl md:text-5xl mb-6">
            The <span className="text-carpet-antique-gold">Art of Persian</span> Carpet Weaving
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover the thousand-year-old tradition behind every thread, knot, and pattern in our exclusive Kerman collection.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="prose prose-lg max-w-none text-carpet-cream/90 leading-relaxed">
              <p>
                Persian carpets represent one of humanity's most sophisticated artistic traditions, with the Kerman region 
                being renowned as the pinnacle of carpet craftsmanship for over a millennium. Each carpet is a testament 
                to the cultural heritage of ancient Persia, where master weavers have passed down their techniques through 
                countless generations.
              </p>
              
              <p>
                The intricate patterns you see are not merely decorative—they tell stories of Persian mythology, represent 
                elements of nature, and embody spiritual symbolism. The famous paisley motif, known as "boteh" in Persian, 
                symbolizes life and eternity, while the intricate floral borders represent the gardens of paradise.
              </p>
              
              <p>
                Kerman carpets are distinguished by their exceptionally fine knotting, with some pieces containing over 
                1,000 knots per square inch. The wool is hand-spun from the finest sheep in the region, and the natural 
                dyes are extracted from plants, minerals, and insects using recipes guarded for centuries.
              </p>
              
              <p>
                What makes these carpets truly extraordinary is the collaborative nature of their creation. Multiple 
                master artisans work together—pattern designers, dyers, weavers, and finishers—each contributing their 
                specialized expertise to create a single masterpiece that can take months or even years to complete.
              </p>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="glass-gold rounded-3xl p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-carpet-antique-gold/10 via-transparent to-carpet-deep-red/10" />
              
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1671576414507-d229f3211069?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzaWFuJTIwY2FycGV0JTIwd2VhdmluZyUyMGxvb20lMjB0cmFkaXRpb25hbHxlbnwxfHx8fDE3NTUzNjU0MzN8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Traditional Persian carpet weaving loom showing the intricate hand-weaving process"
                className="w-full h-auto rounded-2xl shadow-2xl relative z-10"
              />

              {/* Floating Badge */}
              <div className="absolute top-4 right-4 glass-red rounded-full px-4 py-2">
                <span className="text-sm font-medium text-carpet-deep-red">Traditional Craft</span>
              </div>
            </div>

            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-carpet-antique-gold/20 to-carpet-deep-red/20 rounded-3xl blur-xl animate-glow -z-10" />
          </motion.div>
        </div>

        {/* Heritage Statistics - Uniform Boxes with Small Gaps */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {heritageStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              viewport={{ once: true }}
              className="glass-dark rounded-2xl p-6 text-center h-40 flex flex-col justify-center"
            >
              <div className={`w-12 h-12 ${stat.color} mx-auto mb-3 flex items-center justify-center`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className={`text-2xl font-display mb-1 ${stat.color}`}>
                {stat.number}
              </div>
              <div className="text-sm text-carpet-cream/70">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Final Heritage Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="glass rounded-2xl p-8 max-w-4xl mx-auto">
            <p className="text-lg text-carpet-cream/90 leading-relaxed">
              By owning a piece of our Kerman Heritage Collection, you become part of this ancient tradition. 
              Each 10×10cm segment represents not just exquisite craftsmanship, but a connection to the rich 
              cultural tapestry of Persian civilization that has inspired artists and collectors for millennia.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}