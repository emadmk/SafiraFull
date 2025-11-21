"use client";

import { motion } from 'motion/react';
import { Shield, RotateCcw, Truck, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  const trustBadges = [
    { icon: Shield, text: "SSL Secured" },
    { icon: RotateCcw, text: "30-Day Guarantee" },
    { icon: Truck, text: "International Shipping" }
  ];

  const links = {
    legal: [
      { name: "Terms & Conditions", href: "#" },
      { name: "Privacy Policy", href: "#" },
      { name: "Authenticity Guarantee", href: "#" },
      { name: "Shipping & Returns", href: "#" }
    ],
    support: [
      { name: "Contact Support", href: "#" },
      { name: "Track Your Order", href: "#" },
      { name: "Investment Guide", href: "#" },
      { name: "Care Instructions", href: "#" }
    ]
  };

  return (
    <footer className="border-t border-white/10 bg-gradient-to-b from-background to-background/90">
      {/* Trust Badges */}
      <div className="border-b border-white/10 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-8">
            {trustBadges.map((badge, index) => (
              <motion.div
                key={badge.text}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 text-muted-foreground"
              >
                <badge.icon className="w-6 h-6 text-accent" />
                <span>{badge.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src="figma:asset/d3935e4ca5955af1343d8bcabb52536d2f9ae833.png" 
                  alt="Safiralux Logo" 
                  className="w-10 h-10 object-contain"
                />
                <h3 className="font-display text-2xl text-primary">
                  Safiralux
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6 max-w-md">
                Preserving thousand-year-old Persian carpet traditions through limited 
                edition collections. Each piece connects you to centuries of master craftsmanship.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  info@safiralux.com
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  +1 (555) SAFIRA
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  New York, NY • Kerman, IR
                </div>
              </div>
            </motion.div>

            {/* Legal Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg mb-4">Legal</h4>
              <ul className="space-y-2">
                {links.legal.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Support Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg mb-4">Support</h4>
              <ul className="space-y-2">
                {links.support.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 Safiralux. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              Handcrafted with ❤️ for cultural preservation
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}