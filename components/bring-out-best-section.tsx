"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function BringOutBestSection() {
  return (
    <section className="relative bg-[#0B0F19] py-24 md:py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content - Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
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
          </motion.div>

          {/* Right Content - Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}

