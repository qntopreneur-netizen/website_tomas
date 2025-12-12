"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { teamMembers } from "@/lib/content";
import Image from "next/image";

export function StoriesSection() {
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
          <h2 className="text-4xl md:text-6xl font-bold text-blue-600 uppercase tracking-widest">
            ONS TEAM
          </h2>
        </motion.div>

        {/* Team Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.firstName}
              className="relative group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Card with Image */}
              <div className="relative h-[400px] overflow-hidden bg-blue-900/20">
                {/* Afbeelding */}
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.firstName}
                    fill
                    className="object-cover"
                    priority={index < 2}
                  />
                ) : null}
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 z-10">
                  <div className="mb-2">
                    <span className="text-xs font-semibold text-white/80 uppercase tracking-widest">
                      DIRECT LEADER
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    {member.firstName}
                  </h3>
                  <p className="text-white/90 mb-4">{member.role}</p>
                  <div className="flex items-center text-white group-hover:translate-x-2 transition-transform">
                    <span className="text-sm font-semibold mr-2">Lees meer</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

