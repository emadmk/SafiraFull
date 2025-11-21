"use client";

import { useState } from 'react';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';
import logoImage from 'figma:asset/d3935e4ca5955af1343d8bcabb52536d2f9ae833.png';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-dark border-b border-carpet-antique-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="flex items-center gap-3">
              <img 
                src={logoImage} 
                alt="Safiralux Logo" 
                className="w-8 h-8 object-contain"
              />
              <h2 className="font-display text-xl text-carpet-antique-gold">
                Safiralux
              </h2>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Button 
              variant="outline" 
              className="bg-transparent border-carpet-antique-gold text-carpet-antique-gold hover:bg-carpet-antique-gold hover:text-carpet-black transition-all duration-300"
            >
              View Collection
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-carpet-cream hover:text-carpet-antique-gold"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-carpet-antique-gold/20 glass-dark">
              <Button 
                variant="outline" 
                className="w-full bg-transparent border-carpet-antique-gold text-carpet-antique-gold hover:bg-carpet-antique-gold hover:text-carpet-black transition-all duration-300"
                onClick={() => setIsOpen(false)}
              >
                View Collection
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}