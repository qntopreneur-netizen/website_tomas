"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, Bot } from "lucide-react";
import { SalesQuiz } from "@/components/sales-quiz";

export function HeroSection() {
  const [quizOpen, setQuizOpen] = useState(false);
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Background overlay for better text readability */}
      <div className="absolute inset-0 bg-slate-950/40 z-0" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* AI Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/20 border border-blue-500/30 text-blue-300 text-sm font-medium md:backdrop-blur-sm">
            <Sparkles className="h-4 w-4" />
            Powered by AI Analysis
          </span>
        </motion.div>

        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight text-slate-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Hoeveel kun jij
          <br />
          <span className="text-blue-600">
            per dag verdienen?
          </span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Laat onze AI je persoonlijkheid analyseren, ontdek je verborgen talenten en bereken direct wat je per dag kunt bijverdienen naast je studie.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Button
            onClick={() => setQuizOpen(true)}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg font-semibold border-0 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all"
          >
            Start AI Analyse & Bereken je Loon
            <Bot className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
      <SalesQuiz open={quizOpen} onOpenChange={setQuizOpen} />
    </section>
  );
}

