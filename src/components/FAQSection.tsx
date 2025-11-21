"use client";

import { motion } from 'motion/react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

export function FAQSection() {
  const faqs = [
    {
      question: "What exactly am I purchasing?",
      answer: "You're purchasing a unique 10×10cm piece of authentic Persian Kerman carpet, hand-woven by master artisans. Each piece is part of a larger masterwork, professionally framed with museum-quality mounting, and comes with a numbered silver plaque and blockchain certificate of authenticity."
    },
    {
      question: "How does the pre-order process work?",
      answer: "Reserve your piece with $100 today to secure your position and lock in the pre-order pricing. You'll have 12 months to decide whether to complete your purchase for an additional $150 (total $250) or convert to store credit with a 20% bonus. No commitment until you're ready."
    },
    {
      question: "What if I change my mind?",
      answer: "We offer a 30-day full refund policy from your initial reservation. If you decide not to complete your purchase after 12 months, you can receive store credit worth up to 120% of your initial investment for future heritage collection purchases."
    },
    {
      question: "How do I know it's authentic?",
      answer: "Each piece comes with multiple authenticity guarantees: blockchain verification providing immutable proof of provenance, a certificate from the master weaver detailing the creation process, third-party authentication by textile experts, and our company guarantee backed by insurance."
    },
    {
      question: "Can I choose my specific piece position?",
      answer: "Yes! Pre-order customers get priority selection from our interactive grid. You can choose your preferred position in the master tapestry, with each location offering its own unique pattern and story. Popular positions are reserved on a first-come, first-served basis."
    },
    {
      question: "When will I receive my piece?",
      answer: "The complete creation process takes approximately 12 months from order to delivery. You'll receive monthly progress updates with photos and videos of your piece being created. Once completed, pieces are professionally framed and shipped with full insurance and tracking."
    },
    {
      question: "What makes this investment valuable?",
      answer: "Persian Kerman carpets are considered among the world's finest textiles, with values historically appreciating over time. This limited collection of 100 pieces worldwide combines authentic thousand-year-old craftsmanship with modern authentication technology, creating a unique investment opportunity in cultural heritage."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship worldwide with full insurance and professional packaging. Shipping costs are included in your purchase price for most countries. Each piece is carefully packaged in a custom crate designed for fine art transport, and we handle all customs documentation."
    }
  ];

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl mb-4">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about your heritage investment
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-8"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border-b border-white/10 last:border-b-0"
              >
                <AccordionTrigger className="text-left hover:text-primary transition-colors duration-200 py-4 text-lg">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4">
            Still have questions? We're here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:heritage@persiancarpets.com" 
              className="text-primary hover:text-primary/80 transition-colors"
            >
              heritage@persiancarpets.com
            </a>
            <span className="hidden sm:inline text-muted-foreground">•</span>
            <a 
              href="tel:+1-555-HERITAGE" 
              className="text-primary hover:text-primary/80 transition-colors"
            >
              +1 (555) HERITAGE
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}