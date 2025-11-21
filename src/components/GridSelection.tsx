"use client";

import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Users, Clock } from 'lucide-react';
import carpetImage from 'figma:asset/b2946ab53eb6013f2cd8ca9142a95d21f60e4b34.png';

export function GridSelection() {
  const [selectedPosition, setSelectedPosition] = useState<number | null>(null);
  const [hoveredPosition, setHoveredPosition] = useState<number | null>(null);

  // Generate 100 positions (10x10 grid)
  const totalPositions = 100;
  const reservedPositions = new Set([1, 2, 3, 11, 12, 23, 34, 45, 56, 67, 78, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 13, 24, 35, 46, 57, 68, 79, 14, 25, 36, 47, 58, 69, 15, 26, 37, 48, 59, 16, 27, 38, 49, 17, 28, 39, 18, 29, 19]);
  
  const recentActivity = [
    { name: "Michael", location: "NYC", position: 48, time: "2 hours ago" },
    { name: "Sarah", location: "London", position: 23, time: "viewing now" },
    { name: "David", location: "Paris", position: 67, time: "1 hour ago" }
  ];

  const isReserved = (position: number) => reservedPositions.has(position);
  const isSelected = (position: number) => selectedPosition === position;
  const isHovered = (position: number) => hoveredPosition === position;

  const getPositionClass = (position: number) => {
    if (isReserved(position)) {
      return "bg-gray-500/40 border-gray-400/60 text-gray-300 cursor-not-allowed backdrop-blur-sm";
    }
    if (isSelected(position)) {
      return "bg-carpet-antique-gold/80 border-carpet-antique-gold text-carpet-black animate-glow backdrop-blur-sm";
    }
    if (isHovered(position)) {
      return "bg-carpet-antique-gold/40 border-carpet-antique-gold scale-110 backdrop-blur-sm text-carpet-cream";
    }
    return "bg-emerald-500/30 border-emerald-400/50 text-emerald-100 hover:border-emerald-300 hover:bg-emerald-400/40 cursor-pointer backdrop-blur-sm";
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-background/90">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl mb-4">
            Choose Your Position in <span className="text-primary">History</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Select your unique piece from the master tapestry. Each position tells its own story.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Grid Selection */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-6"
            >
              {/* Grid Stats */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                  <Badge variant="secondary" className="bg-muted">
                    <Users className="w-4 h-4 mr-1" />
                    {reservedPositions.size} Reserved
                  </Badge>
                  <Badge variant="secondary" className="bg-accent/20 text-accent">
                    {totalPositions - reservedPositions.size} Available
                  </Badge>
                </div>
                {selectedPosition && (
                  <Badge variant="outline" className="border-primary text-primary">
                    Position #{selectedPosition} Selected
                  </Badge>
                )}
              </div>

              {/* 10x10 Grid with Carpet Background */}
              <div 
                className="grid grid-cols-10 gap-2 mb-6 p-4 rounded-xl relative overflow-hidden"
                style={{
                  backgroundImage: `url(${carpetImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              >
                {/* Faded overlay to make numbers visible */}
                <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" />
                
                {/* Grid buttons */}
                <div className="relative z-10 contents">
                  {Array.from({ length: totalPositions }, (_, i) => i + 1).map((position) => (
                    <motion.button
                      key={position}
                      whileHover={!isReserved(position) ? { scale: 1.1 } : {}}
                      whileTap={!isReserved(position) ? { scale: 0.95 } : {}}
                      onClick={() => !isReserved(position) && setSelectedPosition(position)}
                      onMouseEnter={() => !isReserved(position) && setHoveredPosition(position)}
                      onMouseLeave={() => setHoveredPosition(null)}
                      disabled={isReserved(position)}
                      className={`
                        aspect-square border-2 rounded-md text-xs font-medium transition-all duration-200
                        ${getPositionClass(position)}
                      `}
                      title={isReserved(position) ? `Position ${position} - Reserved` : `Position ${position} - Available`}
                    >
                      {position}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Legend */}
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-500/40 border border-gray-400/60 rounded backdrop-blur-sm" />
                  <span className="text-muted-foreground">Reserved</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-emerald-500/30 border border-emerald-400/50 rounded backdrop-blur-sm" />
                  <span className="text-muted-foreground">Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-carpet-antique-gold/80 border border-carpet-antique-gold rounded backdrop-blur-sm" />
                  <span className="text-muted-foreground">Selected</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Selection Info & Activity */}
          <div className="space-y-6">
            {/* Selection Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="glass rounded-xl p-6"
            >
              <h3 className="text-xl mb-4">Selection Details</h3>
              {selectedPosition ? (
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Position:</span>
                    <span className="text-primary">#{selectedPosition}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Grid Location:</span>
                    <span className="text-muted-foreground">
                      Row {Math.ceil(selectedPosition / 10)}, Col {((selectedPosition - 1) % 10) + 1}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Value:</span>
                    <span className="text-accent">$250</span>
                  </div>
                  <Button className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90">
                    Reserve Position #{selectedPosition}
                  </Button>
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  Click on an available position to see details
                </p>
              )}
            </motion.div>

            {/* Live Activity */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="glass rounded-xl p-6"
            >
              <h3 className="text-xl mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-accent" />
                Live Updates
              </h3>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="flex items-center justify-between text-sm border-b border-white/10 pb-2 last:border-b-0"
                  >
                    <div>
                      <span className="text-foreground">{activity.name}</span>
                      <span className="text-muted-foreground"> from {activity.location}</span>
                      <span className="text-primary"> #{activity.position}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Map of Pateh 101 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              className="glass rounded-xl p-6"
            >
              <h3 className="text-xl mb-4 text-[rgba(255,255,255,1)] font-[Inria_Serif]">Map of Pateh 101</h3>
              <div className="relative overflow-hidden rounded-lg">
                <img 
                  src={carpetImage} 
                  alt="Persian Pateh Carpet Map" 
                  className="w-full h-auto object-cover rounded-lg shadow-lg my-[27px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}