"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift, GraduationCap, Users, TrendingUp, Coffee, Trophy, LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { WaveDivider } from "@/components/wave-divider";
import { SalesQuiz } from "@/components/sales-quiz";
import Link from "next/link";

const iconMap: Record<string, LucideIcon> = {
  Gift,
  GraduationCap,
  Users,
  TrendingUp,
  Coffee,
  Trophy,
};

const vacatureBenefits = [
  {
    title: "Lucratieve Bonussen",
    description: "Verdien extra met onze uitgebreide bonusstructuur. Hoe meer je verkoopt, hoe meer je verdient. Onbeperkte groeimogelijkheden en maandelijkse bonusuitkeringen.",
    icon: "Gift",
  },
  {
    title: "Intensieve Training",
    description: "Professionele sales training van ervaren professionals. Leer de beste technieken, scripts en methodes om succesvol te zijn in sales.",
    icon: "GraduationCap",
  },
  {
    title: "Persoonlijke Begeleiding",
    description: "Altijd ondersteuning van ervaren coaches. We helpen je groeien, analyseren je prestaties en zorgen dat je je doelen behaalt.",
    icon: "Users",
  },
  {
    title: "Carrière Groei",
    description: "Ontwikkel jezelf en groei binnen het bedrijf. Van junior naar senior, de mogelijkheden zijn eindeloos. We belonen ambitie en resultaat.",
    icon: "TrendingUp",
  },
  {
    title: "Gezellige Borrels",
    description: "Regelmatige teamuitjes, borrels en events. Een gezellige werksfeer waar je collega's ook je vrienden worden.",
    icon: "Coffee",
  },
  {
    title: "Competities & Beloningen",
    description: "Neem deel aan maandelijkse competities en win extra beloningen. We vieren successen en belonen toppresteerders.",
    icon: "Trophy",
  },
];

export default function VacaturesPage() {
  const [quizOpen, setQuizOpen] = useState(false);

  return (
    <main className="min-h-screen relative">
      {/* Header Section - Donkerblauw */}
      <section className="relative bg-[#0B0F19] pt-32 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              Werken bij The Sales Agency
          </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8">
              Ontdek waarom werken bij The Sales Agency meer is dan alleen een baan.
            Het is een carrièrepad vol groei, beloningen en mogelijkheden.
          </p>
        </motion.div>
        </div>
      </section>

      {/* Wave - Donkerblauw naar Wit */}
      <WaveDivider />

      {/* Bento Grid - Voordelen - Wit */}
      <section className="relative bg-white py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-4xl md:text-6xl font-bold text-center mb-12 text-blue-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Wat bieden wij?
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vacatureBenefits.map((benefit, index) => {
              const Icon = iconMap[benefit.icon] || Gift;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                >
                  <Card className="bg-slate-50 border border-gray-200 p-8 h-full hover:border-blue-500 transition-all shadow-lg">
                    <CardContent className="p-0">
                      <div className="flex flex-col items-start space-y-4">
                        <div className="p-3 bg-blue-600/10 border border-blue-600/20">
                          <Icon className="h-8 w-8 text-blue-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">
                          {benefit.title}
                        </h3>
                        <p className="text-gray-700 text-lg leading-relaxed">
                          {benefit.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Wave - Wit naar Donkerblauw */}
      <div className="relative w-full h-24 md:h-32 overflow-hidden bg-[#0B0F19]">
        <svg
          className="absolute top-0 w-full h-full"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,0 L0,40 Q180,80 360,60 T720,70 T1080,50 T1440,70 L1440,0 Z"
            fill="white"
            className="transition-all"
          />
        </svg>
      </div>

      {/* CTA Section - Donkerblauw */}
      <section className="relative bg-[#0B0F19] py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.85 }}
            >
              Klaar om te starten?
            </motion.h2>
            <motion.p
              className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              Laat AI een persoonlijkheidsanalyse doen en check hoeveel geld jij per dag zou verdienen als je bij ons zou komen werken
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
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
          </motion.div>
        </div>
      </section>

      <SalesQuiz open={quizOpen} onOpenChange={setQuizOpen} />
    </main>
  );
}

