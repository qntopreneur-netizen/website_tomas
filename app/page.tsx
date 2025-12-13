"use client";

import { useState } from "react";
import { NewHeroSection } from "@/components/new-hero-section";
import { WaveDivider } from "@/components/wave-divider";
import { BringOutBestSection } from "@/components/bring-out-best-section";
import { WerverVanDeMaand } from "@/components/werver-van-de-maand";
import { TestimonialsSection } from "@/components/testimonials-section";
import { Navbar } from "@/components/ui/navbar";

export default function Home() {
  const [quizOpen, setQuizOpen] = useState(false);

  return (
    <main className="min-h-screen relative">
      {/* Navbar - Sticky at page level with top-4 spacing */}
      <div className="sticky top-4 z-50 w-full px-4 -mb-20">
        <Navbar onStartQuiz={() => setQuizOpen(true)} />
      </div>

      {/* Hero Section - Starts from top, navbar overlaps */}
      <NewHeroSection quizOpen={quizOpen} setQuizOpen={setQuizOpen} />
      
      {/* Bring Out The Best Section */}
      <BringOutBestSection />
      
      {/* Wave Divider */}
      <WaveDivider />
      
      {/* Werver van de maand Section */}
      <WerverVanDeMaand />
      
      {/* Testimonials Section */}
      <TestimonialsSection />
      
      {/* Wave Divider - Wit naar Donkerblauw */}
      <div className="relative w-full h-24 md:h-32 overflow-hidden bg-white -mb-px">
        <svg
          className="absolute bottom-0 w-full h-full"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,120 L0,80 Q180,40 360,60 T720,50 T1080,70 T1440,50 L1440,120 Z"
            fill="#020617"
            className="transition-all"
          />
        </svg>
      </div>
    </main>
  );
}
