"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { SalesQuiz } from "@/components/sales-quiz";
import { Navbar } from "@/components/ui/navbar";
import Image from "next/image";

interface NewHeroSectionProps {
  quizOpen?: boolean;
  setQuizOpen?: (open: boolean) => void;
}

export function NewHeroSection({ quizOpen, setQuizOpen }: NewHeroSectionProps = {}) {
  const [internalQuizOpen, setInternalQuizOpen] = useState(false);
  const isQuizOpen = quizOpen !== undefined ? quizOpen : internalQuizOpen;
  const handleSetQuizOpen = setQuizOpen || setInternalQuizOpen;
  
  return (
    <section className="relative min-h-screen w-full overflow-hidden flex flex-col">
      {/* Background Image - Starts from very top, covers entire section */}
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
      <div className="relative z-20 flex-1 flex items-center py-16 md:py-24 pt-24 md:pt-32 pb-8">
        <div className="max-w-7xl mx-auto px-4 md:px-8 w-full">
          <div className="max-w-2xl">
            <motion.h1
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 text-white uppercase tracking-wider md:tracking-widest leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              WORD JIJ ONS
              <br />
              NIEUWE SALES TALENT?
            </motion.h1>

            <motion.p
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-6 md:mb-8 leading-relaxed"
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
              className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4"
            >
              <Button
                onClick={() => handleSetQuizOpen(true)}
                size="lg"
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold border border-white/20 shadow-lg hover:shadow-xl transition-all rounded-none justify-center"
              >
                Start AI Analyse
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <span className="text-white/80 text-center md:text-left">of</span>
              <Link href="/solliciteren" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold border-0 shadow-lg hover:shadow-xl transition-all rounded-none justify-center"
                >
                  Solliciteer Nu!
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
      
      <SalesQuiz open={isQuizOpen} onOpenChange={handleSetQuizOpen} />
    </section>
  );
}

