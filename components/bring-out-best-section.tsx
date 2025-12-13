"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import Image from "next/image";

export function BringOutBestSection() {
  return (
    <section className="relative bg-[#0B0F19] py-24 md:py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content - Text */}
          <BlurFade
            direction="right"
            delay={0}
            duration={0.8}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white uppercase tracking-widest mb-6">
              WORD DE BESTE VERSIE
              <br />
              VAN JEZELF!
            </h2>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              The Sales Agency investeert in jouw ontwikkeling om de beste versie van jezelf te worden! 
              Er zijn volop mogelijkheden om je talenten te ontdekken, ambities te laten groeien en 
              nieuwe carrièrekansen te grijpen. Alles draait om de juiste mindset en motivatie! 
              Waar wacht je nog op? Pak die carrièrekansen, juist nu!
            </p>
          </BlurFade>

          {/* Right Content - Image */}
          <BlurFade
            direction="left"
            delay={0.2}
            duration={0.8}
            className="relative"
          >
            <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden bg-blue-900/20 border border-white/10">
              <Image
                src="/training.jpg"
                alt="Training bij The Sales Agency"
                fill
                className="object-cover"
                priority
              />
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}

