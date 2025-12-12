"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { WaveDivider } from "@/components/wave-divider";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen relative bg-slate-950">
      {/* Header Section - Donkerblauw */}
      <section className="relative bg-[#0B0F19] pt-32 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              Privacybeleid
            </h1>
            <p className="text-xl md:text-2xl text-white/90">
              The Sales Agency
            </p>
          </motion.div>
        </div>
      </section>

      {/* Wave - Donkerblauw naar Donker */}
      <WaveDivider />

      {/* Content Section - Donker */}
      <section className="relative bg-slate-950 py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-invert prose-lg max-w-none"
          >
            <div className="text-white space-y-8">
              <p className="text-white/90 text-lg leading-relaxed">
                Bij The Sales Agency hechten wij groot belang aan de privacy van onze websitebezoekers, kandidaten en klanten. In dit privacybeleid leggen wij uit welke gegevens wij verzamelen via onze website en AI Analyse, en hoe wij deze gebruiken.
              </p>

              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold text-white mt-12 mb-6">
                  Welke gegevens verzamelen wij?
                </h2>
                <p className="text-white/90 text-lg leading-relaxed">
                  Wanneer je onze AI Analyse doet of contact met ons opneemt, verwerken wij de volgende gegevens:
                </p>
                <ul className="list-disc list-inside space-y-2 text-white/90 text-lg leading-relaxed ml-4">
                  <li>Naam</li>
                  <li>E-mailadres</li>
                  <li>Telefoonnummer</li>
                  <li>Leeftijd</li>
                  <li>De antwoorden die je geeft in de AI Analyse/Calculator</li>
                  <li>Technische gegevens (zoals IP-adres en browserinformatie)</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold text-white mt-12 mb-6">
                  Waarvoor gebruiken wij deze gegevens?
                </h2>
                <p className="text-white/90 text-lg leading-relaxed">
                  De verzamelde gegevens worden uitsluitend gebruikt voor:
                </p>
                <ul className="list-disc list-inside space-y-2 text-white/90 text-lg leading-relaxed ml-4">
                  <li>Het berekenen en sturen van de uitslag van de AI Analyse.</li>
                  <li>Het telefonisch of per mail contact opnemen om de uitslag en carrièremogelijkheden te bespreken.</li>
                  <li>Het beoordelen of je geschikt bent voor een functie binnen ons sales team.</li>
                  <li>Het verbeteren van onze website en analyse-ervaring.</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold text-white mt-12 mb-6">
                  Bewaartermijn
                </h2>
                <p className="text-white/90 text-lg leading-relaxed mb-4">
                  Wij bewaren persoonsgegevens niet langer dan noodzakelijk.
                </p>
                <ul className="list-disc list-inside space-y-2 text-white/90 text-lg leading-relaxed ml-4">
                  <li><strong className="text-white">Zonder sollicitatie:</strong> Gegevens worden maximaal 4 weken bewaard.</li>
                  <li><strong className="text-white">Met toestemming:</strong> Als je aangeeft in onze database te willen blijven (via het vinkje in het formulier), bewaren wij je gegevens maximaal 1 jaar om je te benaderen voor passende vacatures.</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold text-white mt-12 mb-6">
                  Delen met derden
                </h2>
                <p className="text-white/90 text-lg leading-relaxed">
                  Wij verkopen jouw gegevens nooit aan derden. Wij delen gegevens alleen als dit strikt noodzakelijk is voor onze bedrijfsvoering (bijvoorbeeld met onze softwareleveranciers die de analyse verwerken) of als wij hier wettelijk toe verplicht zijn.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold text-white mt-12 mb-6">
                  Cookies
                </h2>
                <p className="text-white/90 text-lg leading-relaxed">
                  Onze website gebruikt functionele cookies om de AI Analyse goed te laten werken en analytische cookies (geanonimiseerd) om te zien hoeveel mensen de site bezoeken.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold text-white mt-12 mb-6">
                  Jouw rechten
                </h2>
                <p className="text-white/90 text-lg leading-relaxed mb-4">
                  Jij bent de baas over je eigen data. Je hebt het recht om:
                </p>
                <ul className="list-disc list-inside space-y-2 text-white/90 text-lg leading-relaxed ml-4">
                  <li>Je gegevens in te zien, te corrigeren of te laten verwijderen.</li>
                  <li>Je toestemming voor het bellen in te trekken.</li>
                  <li>Bezwaar te maken tegen de verwerking.</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold text-white mt-12 mb-6">
                  Contact
                </h2>
                <p className="text-white/90 text-lg leading-relaxed mb-4">
                  Heb je vragen over je privacy of wil je uit ons systeem verwijderd worden? Neem contact met ons op:
                </p>
                <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-lg">
                  <p className="text-white text-lg leading-relaxed">
                    <strong className="text-white">The Sales Agency</strong>
                    <br />
                    Akerkhof 16
                    <br />
                    9711 JB Groningen
                    <br />
                    E-mail: <a href="mailto:info@thesales-agency.nl" className="text-blue-400 hover:text-blue-300 underline">info@thesales-agency.nl</a>
                  </p>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-slate-800">
                <p className="text-white/70 text-base">
                  Laatste update: 12-12-2025
                </p>
              </div>

              {/* Terug naar Home knop */}
              <div className="mt-12 pt-8">
                <Link href="/">
                  <Button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold border-0 shadow-lg hover:shadow-xl transition-all rounded-none"
                  >
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    Terug naar Home
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

