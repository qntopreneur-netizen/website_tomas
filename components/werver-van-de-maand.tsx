"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Trophy, TrendingUp, Award } from "lucide-react";
import Image from "next/image";

function useCountUp(end: number, start: number, duration: number = 2000, isInView: boolean) {
  const [count, setCount] = useState(start);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const startValue = start;
    const endValue = end;
    const hasDecimals = endValue % 1 !== 0 || startValue % 1 !== 0;

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function voor smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = startValue + (endValue - startValue) * easeOutQuart;
      
      if (hasDecimals) {
        setCount(parseFloat(current.toFixed(1)));
      } else {
        setCount(Math.floor(current));
      }
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(endValue);
      }
    };

    requestAnimationFrame(animate);
  }, [end, start, duration, isInView]);

  return count;
}

export function WerverVanDeMaand() {
  const statsRef = useRef(null);
  const isInView = useInView(statsRef, { once: true, margin: "-100px" });
  
  const salesCount = useCountUp(46, 0, 2000, isInView);
  const uitvalCount = useCountUp(2.5, 0, 2000, isInView);
  
  return (
    <section className="relative bg-white py-24 md:py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-4xl md:text-6xl font-bold text-center mb-16 text-blue-600 uppercase tracking-widest"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Werver van de maand
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-0 max-w-6xl mx-auto overflow-hidden shadow-2xl"
        >
          {/* Foto sectie - Links */}
          <div className="relative h-[400px] md:h-[600px] lg:h-auto overflow-hidden bg-blue-900/20">
            <Image
              src="/wolfffie.webp"
              alt="Werver van de maand"
              fill
              className="object-cover"
              priority
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-black/60" />
          </div>

          {/* Content sectie - Rechts */}
          <div className="bg-white p-8 md:p-12 flex flex-col justify-center">
            {/* Trophy Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center gap-2 mb-6"
            >
              <div className="p-2 bg-blue-600/10 border border-blue-600/20">
                <Trophy className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest">
                Werver van de maand
              </span>
            </motion.div>

            {/* Naam en Rol */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-8"
            >
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
                Noah
              </h3>
              <p className="text-xl md:text-2xl text-blue-600 font-semibold">
                Team Captain
              </p>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              ref={statsRef}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid grid-cols-2 gap-6 mb-8"
            >
              {/* Sales Stat */}
              <div className="bg-blue-600/5 border border-blue-600/20 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600/10 border border-blue-600/20 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                    Sales
                  </span>
                </div>
                <p className="text-4xl font-bold text-blue-600">{salesCount}</p>
              </div>

              {/* Uitval Stat */}
              <div className="bg-blue-600/5 border border-blue-600/20 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600/10 border border-blue-600/20 flex items-center justify-center">
                    <Award className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                    Uitval
                  </span>
                </div>
                <p className="text-4xl font-bold text-blue-600">{uitvalCount}%</p>
              </div>
            </motion.div>

            {/* Beschrijving */}
            <motion.p
              className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Wat een epische strijd deze maand! Maar er kan er maar één bovenaan staan… en dat is <span className="font-semibold text-blue-600">Noah</span>! Hard gewerkt, scherp gebleven en verdiend op de top van het podium.
            </motion.p>

            {/* Bonus Badge */}
            <motion.div
              className="bg-blue-600/10 border-2 border-blue-600/30 p-6 text-center"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-2">
                Gefeliciteerd met je
              </p>
              <p className="text-2xl md:text-3xl font-bold text-gray-900">
                €200 BIJENKORF TEGOED BON
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

