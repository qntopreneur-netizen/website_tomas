"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";

const testimonials = [
  {
    name: "Annabel",
    text: "Ik ben bij The Sales Agency gestart als student en heb in korte tijd enorm veel bijgeleerd. Naast goede verdiensten werk ik met een super leuk team!",
  },
  {
    name: "Renee",
    text: "De coaching en training heeft mijn sales skills naar een hoger niveau gebracht. Ik had nooit gedacht dat ik hier goed in zou worden.",
  },
  {
    name: "Hugo",
    text: "De flexibele werktijden combineren perfect met mijn studie. Daarnaast is de sfeer onderling fantastisch en leer ik elke dag bij.",
  },
  {
    name: "Noah",
    text: "Na mijn sollicitatie werd ik direct warm ontvangen. De trainingen zijn intensief maar leerzaam. Inmiddels verdien ik bovengemiddeld en heb ik super veel leuke mensen leren kennen.",
  },
  {
    name: "Lucas",
    text: "Ik dacht eerst eigenlijk dat sales niks voor mij zou zijn, maar The Sales Agency heeft me toch het tegendeel bewezen.",
  },
  {
    name: "Nina",
    text: "De sfeer in het team is geweldig en de begeleiding is top. Ik leer elke dag nieuwe verkooptechnieken die ik direct kan toepassen in de praktijk.",
  },
];

export function TestimonialsSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Duplicate testimonials voor seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section id="testimonials-section" className="relative bg-white py-24 md:py-32 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <BlurFade delay={0} duration={0.6} className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-blue-600 uppercase tracking-widest mb-4">
            Wat zeggen onze teamleden?
          </h2>
          <p className="text-gray-700 text-base md:text-xl max-w-3xl mx-auto leading-relaxed">
            Ontdek hoe jouw toekomstige collega's de vrijheid, het teamgevoel en de lekkere verdiensten bij The Sales Agency elke dag beleven.
          </p>
        </BlurFade>

        {/* Scrolling Testimonials */}
        <div className="relative">
          {/* Desktop: Left Gradient Overlay */}
          <div className="hidden md:block absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          
          {/* Desktop: Right Gradient Overlay */}
          <div className="hidden md:block absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          {/* Scrolling Container - Using CSS animation for smooth performance */}
          <div className="overflow-hidden">
            <div
              className="testimonials-marquee flex gap-3 md:gap-4"
              style={{ width: "max-content" }}
            >
              {duplicatedTestimonials.map((testimonial, index) => (
                <Card
                  key={`${testimonial.name}-${index}`}
                  className="bg-slate-50 border border-gray-200 p-3 md:p-5 w-[200px] md:w-[360px] flex-shrink-0 shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden"
                >
                  {/* Only show BorderBeam on desktop */}
                  {!isMobile && (
                    <BorderBeam
                      size={100}
                      duration={8}
                      colorFrom="#3b82f6"
                      colorTo="#8b5cf6"
                      borderWidth={2}
                    />
                  )}
                  <CardContent className="p-0">
                    <div className="flex flex-col h-full">
                      {/* Quote Icon */}
                      <div className="mb-2 md:mb-3">
                        <Quote className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
                      </div>
                      
                      {/* Testimonial Text */}
                      <p className="text-gray-700 text-xs md:text-base leading-relaxed mb-3 md:mb-4 flex-grow">
                        {testimonial.text}
                      </p>
                      
                      {/* Name */}
                      <div className="flex items-center">
                        <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-blue-600/10 border-2 border-blue-600/20 flex items-center justify-center mr-2">
                          <span className="text-blue-600 font-bold text-[10px] md:text-xs">
                            {testimonial.name[0]}
                          </span>
                        </div>
                        <p className="text-gray-900 font-semibold text-xs md:text-base">
                          {testimonial.name}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

