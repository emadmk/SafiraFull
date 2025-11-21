"use client";

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 23,
    hours: 14,
    minutes: 32,
    seconds: 45
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds }
  ];

  return (
    <section className="py-16 border-y border-white/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="font-display text-2xl md:text-3xl mb-2 text-primary">
            ⏰ Pre-order ends in:
          </h3>
          
          <div className="flex justify-center items-center gap-4 md:gap-8 mt-8">
            {timeUnits.map((unit, index) => (
              <motion.div
                key={unit.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass rounded-xl p-4 md:p-6 min-w-[80px] md:min-w-[100px]"
              >
                <div className="text-2xl md:text-4xl font-display text-primary mb-1">
                  {String(unit.value).padStart(2, '0')}
                </div>
                <div className="text-sm md:text-base text-muted-foreground uppercase tracking-wider">
                  {unit.label}
                </div>
              </motion.div>
            ))}
          </div>

          <p className="text-muted-foreground mt-6">
            Limited time pre-order pricing • Only 53 pieces remaining
          </p>
        </motion.div>
      </div>
    </section>
  );
}