"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqItems } from "@/lib/content";
import { WaveDivider } from "@/components/wave-divider";

export default function FAQPage() {
  return (
    <main className="min-h-screen relative">
      {/* Header Section - Donkerblauw */}
      <section className="relative bg-[#0B0F19] pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              Veelgestelde Vragen
            </h1>
            <p className="text-xl md:text-2xl text-white/90">
              Alles wat je wilt weten over werken bij The Sales Agency
            </p>
          </motion.div>
        </div>
      </section>

      {/* Wave - Donkerblauw naar Wit */}
      <WaveDivider />

      {/* FAQ Accordion - Wit */}
      <section className="relative bg-white py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqItems.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-slate-50 border border-gray-200 px-6 py-2 hover:border-blue-500 transition-all shadow-sm"
                >
                  <AccordionTrigger className="text-left text-gray-900 text-lg font-semibold hover:no-underline py-4">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 text-base leading-relaxed pb-4">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>

          {/* Contact CTA */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="text-gray-600 text-lg mb-4">
              Staat jouw vraag er niet tussen?
            </p>
            <a
              href="/contact"
              className="text-blue-600 hover:text-blue-700 underline underline-offset-4 transition-colors font-semibold"
            >
              Neem contact met ons op
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

