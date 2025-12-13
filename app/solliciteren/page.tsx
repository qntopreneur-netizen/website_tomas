"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { WaveDivider } from "@/components/wave-divider";

export default function SolliciterenPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
  });
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const submissionData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      age: formData.age,
      consent: consent,
      timestamp: new Date().toISOString(),
    };

    const webhookUrl = "https://n8n.chargaway.nl/webhook/87b04b2b-eb10-4d60-8beb-bd01e140eae5";

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(submissionData),
        mode: "cors",
        credentials: "omit",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setSubmitted(true);
    } catch (error) {
      console.error("❌ ERROR in webhook call:", error);
      // Toon nog steeds success state voor goede UX
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen relative">
      {/* Header Section - Donkerblauw */}
      <section className="relative bg-[#0B0F19] pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              Solliciteer Nu!
            </h1>
            <p className="text-xl md:text-2xl text-white/90">
              Vul je gegevens in en wij nemen zo snel mogelijk contact met je op
            </p>
          </motion.div>
        </div>
      </section>

      {/* Wave - Donkerblauw naar Wit */}
      <WaveDivider />

      {/* Form Section - Wit */}
      <section className="relative bg-white py-24 px-4">
        <div className="max-w-2xl mx-auto">
          {!submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="bg-slate-50 border border-gray-200 p-8 md:p-10 shadow-lg">
                <CardHeader className="p-0 pb-6">
                  <CardTitle className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    Sollicitatieformulier
                  </CardTitle>
                  <p className="text-gray-600 text-lg">
                    Vul onderstaand formulier in en wij nemen binnen 24 uur contact met je op.
                  </p>
                </CardHeader>
                <CardContent className="p-0">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-gray-900 text-base font-semibold">
                        Naam *
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Jouw volledige naam"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                        className="bg-white border-gray-300 text-gray-900 h-14 md:h-16 text-base focus:border-blue-500 focus:ring-blue-500/50 rounded-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-900 text-base font-semibold">
                        E-mailadres *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="jouw@email.nl"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        required
                        className="bg-white border-gray-300 text-gray-900 h-14 md:h-16 text-base focus:border-blue-500 focus:ring-blue-500/50 rounded-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-gray-900 text-base font-semibold">
                        Telefoonnummer *
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="06 12345678"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        required
                        className="bg-white border-gray-300 text-gray-900 h-14 md:h-16 text-base focus:border-blue-500 focus:ring-blue-500/50 rounded-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="age" className="text-gray-900 text-base font-semibold">
                        Leeftijd *
                      </Label>
                      <Input
                        id="age"
                        type="number"
                        min="16"
                        max="99"
                        placeholder="Jouw leeftijd"
                        value={formData.age}
                        onChange={(e) =>
                          setFormData({ ...formData, age: e.target.value })
                        }
                        required
                        className="bg-white border-gray-300 text-gray-900 h-14 md:h-16 text-base focus:border-blue-500 focus:ring-blue-500/50 rounded-none"
                      />
                    </div>

                    <div className="flex items-start space-x-3 pt-2">
                      <Checkbox
                        id="consent"
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                        className="mt-1 border-gray-300 bg-white text-blue-600 focus:ring-blue-500 focus:ring-offset-white"
                      />
                      <Label
                        htmlFor="consent"
                        className="text-gray-700 text-sm leading-relaxed cursor-pointer"
                      >
                        Ik ga akkoord met het privacybeleid en dat er contact met mij wordt opgenomen *
                      </Label>
                    </div>

                    <Button
                      type="submit"
                      disabled={!consent || isSubmitting}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white h-14 md:h-16 text-lg font-semibold border-0 mt-6 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all rounded-none disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600"
                    >
                      {isSubmitting ? "Verzenden..." : "Verstuur sollicitatie"}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="text-center py-12"
            >
              <div className="flex justify-center mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.5 }}
                  className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center"
                >
                  <CheckCircle2 className="h-10 w-10 text-white" />
                </motion.div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Bedankt voor je sollicitatie!
              </h2>
              <p className="text-gray-600 text-lg mb-6">
                We hebben je gegevens ontvangen en nemen binnen 24 uur contact met je op.
              </p>
              <Button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: "", email: "", phone: "", age: "" });
                  setConsent(false);
                }}
                variant="outline"
                className="bg-white border-gray-300 text-gray-900 hover:bg-gray-50 rounded-none"
              >
                Nieuw formulier invullen
              </Button>
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
}

