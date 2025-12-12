"use client";

import { motion } from "framer-motion";
import { Coins, Clock, Users, TrendingUp } from "lucide-react";

const directItems = [
  {
    icon: Coins,
    label: "TOP SALARIS",
  },
  {
    icon: Clock,
    label: "JE EIGEN BAAS",
  },
  {
    icon: Users,
    label: "TEAM SPIRIT",
  },
  {
    icon: TrendingUp,
    label: "DOORGROEIEN",
  },
];

export function DirectYourLifeSection() {
  return (
    <section className="relative bg-white py-24 md:py-32 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold text-blue-600 uppercase tracking-widest mb-4">
            DIRECT YOUR LIFE
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </motion.div>

        {/* Icon Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-5xl mx-auto">
          {directItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Circle */}
                <div className="w-32 h-32 rounded-full bg-white border-2 border-blue-600 flex items-center justify-center mb-4 shadow-lg">
                  <Icon className="h-12 w-12 text-blue-600" strokeWidth={1.5} />
                </div>
                {/* Label */}
                <p className="text-xs font-bold text-blue-600 uppercase tracking-widest text-center">
                  {item.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

