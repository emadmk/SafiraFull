"use client";

import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Card, CardContent } from './ui/card';
import { DollarSign, Package, CreditCard } from 'lucide-react';

export function InvestmentCalculator() {
  const [investment, setInvestment] = useState([100]);
  const currentInvestment = investment[0];

  const getCalculationResult = () => {
    if (currentInvestment === 100) {
      return {
        completeOption: {
          additionalPayment: 150,
          totalOwned: 250,
          description: "Own the complete artwork forever"
        },
        creditOption: {
          creditReceived: 120,
          description: "Receive store credit for future purchases"
        }
      };
    } else {
      const ratio = currentInvestment / 100;
      return {
        completeOption: {
          additionalPayment: Math.round(150 * (2 - ratio)),
          totalOwned: currentInvestment + Math.round(150 * (2 - ratio)),
          description: "Own the complete artwork forever"
        },
        creditOption: {
          creditReceived: Math.round(currentInvestment * 1.2),
          description: "Receive store credit for future purchases"
        }
      };
    }
  };

  const result = getCalculationResult();

  return (
    <section className="py-20 bg-gradient-to-b from-background/80 to-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl mb-4">
            Your <span className="text-primary">Investment</span> Calculator
          </h2>
          <p className="text-xl text-muted-foreground">
            Explore your options and see the value of your heritage investment
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-8"
        >
          {/* Investment Slider */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <label className="text-lg">Investment Amount:</label>
              <span className="text-2xl font-display text-primary">
                ${currentInvestment}
              </span>
            </div>
            
            <Slider
              value={investment}
              onValueChange={setInvestment}
              max={200}
              min={100}
              step={25}
              className="mb-4"
            />
            
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>$100</span>
              <span>$200</span>
            </div>
          </div>

          {/* Options Display */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Complete Artwork Option */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="bg-secondary/50 border-primary/30 h-full">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Package className="w-8 h-8 text-primary" />
                    <h3 className="text-xl">Complete Artwork</h3>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span>Current Investment:</span>
                      <span className="text-primary">${currentInvestment}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Additional Payment:</span>
                      <span className="text-primary">+${result.completeOption.additionalPayment}</span>
                    </div>
                    <div className="border-t border-white/10 pt-3">
                      <div className="flex justify-between text-lg">
                        <span>Total Owned:</span>
                        <span className="text-primary font-display text-xl">
                          ${result.completeOption.totalOwned}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4">
                    {result.completeOption.description}
                  </p>
                  
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                    Complete Purchase
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Store Credit Option */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="bg-secondary/50 border-accent/30 h-full">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <CreditCard className="w-8 h-8 text-accent" />
                    <h3 className="text-xl">Store Credit Option</h3>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span>Current Investment:</span>
                      <span className="text-accent">${currentInvestment}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Bonus (20%):</span>
                      <span className="text-accent">+${result.creditOption.creditReceived - currentInvestment}</span>
                    </div>
                    <div className="border-t border-white/10 pt-3">
                      <div className="flex justify-between text-lg">
                        <span>Total Credit:</span>
                        <span className="text-accent font-display text-xl">
                          ${result.creditOption.creditReceived}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4">
                    {result.creditOption.description}
                  </p>
                  
                  <Button 
                    variant="outline" 
                    className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                  >
                    Choose Credit
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground">
              All calculations are estimates. Final terms will be provided at time of completion.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}