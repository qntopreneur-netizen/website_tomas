"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { teamMembers } from "@/lib/content";

export function TeamSection() {
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
          Ons Team
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="bg-slate-900 border border-slate-800 p-8 card-glow-emerald hover:border-blue-500 transition-all h-full group">
                <CardHeader className="p-0 pb-6">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-white/20 to-white/5 mb-4 flex items-center justify-center">
                    <span className="text-3xl font-bold text-slate-100">
                      {member.name.split(" ").map(n => n[0]).join("")}
                    </span>
                  </div>
                  <CardTitle className="text-2xl font-bold text-slate-100 mb-2">
                    {member.name}
                  </CardTitle>
                  <p className="text-slate-400 text-lg font-medium">
                    {member.role}
                  </p>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-slate-300 leading-relaxed">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

