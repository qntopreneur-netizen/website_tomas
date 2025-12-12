"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { teamHierarchy } from "@/lib/content";
import { WaveDivider } from "@/components/wave-divider";
import Image from "next/image";
import { Crown, Users, Award, Star } from "lucide-react";

export default function OverOnsPage() {
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
              Over The Sales Agency
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Wij geloven dat sales meer is dan alleen verkopen. Het is een
              lifestyle, een manier van denken en een pad naar succes. Bij The Sales Agency
              helpen we ambitieuze mensen om hun volledige potentieel te
              bereiken.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Wave - Donkerblauw naar Wit */}
      <WaveDivider />

      {/* Team Section - Wit */}
      <section className="relative bg-white py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-4xl md:text-6xl font-bold text-center mb-16 text-blue-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Ons Team
          </motion.h2>

          <div className="space-y-12 md:space-y-16">
            {teamHierarchy.map((level, levelIndex) => {
              // Icon per level
              const levelIcons = {
                1: Crown,
                2: Users,
                3: Award,
                4: Star,
              };
              const LevelIcon = levelIcons[level.level as keyof typeof levelIcons] || Users;

              // Grid layout per level
              const gridClasses = {
                1: "max-w-xs mx-auto", // Owner: centered, single (kleiner)
                2: "grid grid-cols-2 gap-4 max-w-2xl mx-auto", // Managers: 2 columns (ook op mobiel)
                3: "max-w-xs mx-auto", // Team Captains: centered, single (kleiner)
                4: "grid grid-cols-3 gap-3 max-w-3xl mx-auto", // Poule Captains: 3 columns (ook op mobiel)
              };

              return (
                <motion.div
                  key={level.level}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: levelIndex * 0.2 }}
                  className="space-y-6"
                >
                  {/* Level Title */}
                  <div className="flex items-center justify-center gap-2 md:gap-3 mb-6">
                    <LevelIcon className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 uppercase tracking-wider">
                      {level.title}
                    </h3>
                  </div>

                  {/* Team Members Grid */}
                  <div className={gridClasses[level.level as keyof typeof gridClasses]}>
                    {level.members.map((member, memberIndex) => (
                      <motion.div
                        key={member.firstName}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.5,
                          delay: levelIndex * 0.2 + memberIndex * 0.1,
                        }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="h-full"
                      >
                        <Card className="bg-slate-50 border-2 border-gray-200 p-4 md:p-6 hover:border-blue-500 transition-all h-full shadow-lg hover:shadow-xl">
                          <CardHeader className="p-0 pb-3">
                            <div className="flex flex-col items-center text-center">
                              {/* Avatar */}
                              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-blue-600/10 border-2 border-blue-600/20 mb-3 flex items-center justify-center overflow-hidden">
                                {member.image ? (
                                  <Image
                                    src={member.image}
                                    alt={member.firstName}
                                    width={80}
                                    height={80}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <span className="text-2xl md:text-3xl font-bold text-blue-600">
                                    {member.firstName[0]}
                                  </span>
                                )}
                              </div>
                              <CardTitle className="text-lg md:text-xl font-bold text-gray-900 mb-1">
                                {member.firstName}
                              </CardTitle>
                              <p className="text-blue-600 text-sm md:text-base font-medium">
                                {member.role}
                              </p>
                            </div>
                          </CardHeader>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
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

      {/* Mission Section - Donkerblauw */}
      <section className="relative bg-[#0B0F19] py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card className="bg-slate-800/50 border border-slate-700 p-10 hover:border-blue-500 transition-all">
              <CardHeader className="p-0 pb-6">
                <CardTitle className="text-4xl font-bold text-white mb-4">
                  Onze Missie
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-white/90 text-lg leading-relaxed mb-6">
                  Bij The Sales Agency zijn we gepassioneerd over het ontwikkelen
                  van sales talent. We geloven dat iedereen met de juiste
                  training, begeleiding en mindset kan uitgroeien tot een
                  topverkoper.
                </p>
                <p className="text-white/90 text-lg leading-relaxed">
                  Onze missie is om ambitieuze mensen te helpen hun carrière in
                  sales te starten of te versnellen. We bieden niet alleen een
                  baan, maar een complete ontwikkelingstraject met training,
                  coaching en onbeperkte groeimogelijkheden.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

