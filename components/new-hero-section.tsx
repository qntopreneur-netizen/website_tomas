"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { SalesQuiz } from "@/components/sales-quiz";
import Image from "next/image";

export function NewHeroSection() {
  const [quizOpen, setQuizOpen] = useState(false);
  
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/tablet.jpg"
          alt="Hero background"
          fill
          className="object-cover"
          priority
          quality={90}
        />
      </div>

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-black/70 to-black/80" />

      {/* Content */}
      <div className="relative z-20 h-full flex items-center pt-20 md:pt-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8 w-full">
          <div className="max-w-2xl">
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white uppercase tracking-widest leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              WORD JIJ ONS
              <br />
              NIEUWE SALES TALENT?
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Laat AI een persoonlijkheidsanalyse doen en check hoeveel geld jij per dag zou verdienen als je bij ons zou komen werken
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center gap-4"
            >
              <Button
                onClick={() => setQuizOpen(true)}
                size="lg"
                className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 text-lg font-semibold border border-white/20 shadow-lg hover:shadow-xl transition-all rounded-none"
              >
                Start AI Analyse
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <span className="text-white/80">of</span>
              <Link href="/solliciteren">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold border-0 shadow-lg hover:shadow-xl transition-all rounded-none"
                >
                  Solliciteer Nu!
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
      
      <SalesQuiz open={quizOpen} onOpenChange={setQuizOpen} />
    </section>
  );
}

