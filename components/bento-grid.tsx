"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Gift, GraduationCap, Users, TrendingUp, LucideIcon } from "lucide-react";
import { benefits } from "@/lib/content";

const iconMap: Record<string, LucideIcon> = {
  Gift,
  GraduationCap,
  Users,
  TrendingUp,
};

export function BentoGrid() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-4xl md:text-6xl font-bold text-center mb-16 text-slate-100"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Waarom The Sales Agency?
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = iconMap[benefit.icon] || Gift;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-slate-900 border border-slate-800 p-8 h-full card-glow-emerald hover:border-blue-500 transition-all group">
                  <CardContent className="p-0">
                    <div className="flex flex-col items-start space-y-4">
                      <div className="p-3 bg-white/5">
                        <Icon className="h-8 w-8 text-slate-100" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-100">
                        {benefit.title}
                      </h3>
                      <p className="text-slate-400 text-lg leading-relaxed">
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
  );
}

