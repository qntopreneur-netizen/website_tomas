"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Mail, Phone, MapPin } from "lucide-react";
import { WaveDivider } from "@/components/wave-divider";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to an API
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: "", email: "", message: "" });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <main className="min-h-screen relative">
      {/* Header Section - Donkerblauw */}
      <section className="relative bg-[#0B0F19] pt-32 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">Contact</h1>
            <p className="text-xl md:text-2xl text-white/90">
              Heb je vragen? Neem contact met ons op!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Wave - Donkerblauw naar Wit */}
      <WaveDivider />

      {/* Contact Form & Info - Wit */}
      <section className="relative bg-white py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="bg-slate-50 border border-gray-200 p-8 hover:border-blue-500 transition-all shadow-lg">
                <CardHeader className="p-0 pb-6">
                  <CardTitle className="text-3xl font-bold text-gray-900">
                    Stuur ons een bericht
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8"
                    >
                      <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center">
                          <CheckCircle2 className="h-8 w-8 text-blue-500" />
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        Bedankt!
                      </h3>
                      <p className="text-gray-600">
                        We hebben je bericht ontvangen en nemen zo snel mogelijk
                        contact met je op.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-gray-900">
                          Naam
                        </Label>
                        <Input
                          id="name"
                          type="text"
                          placeholder="Jouw naam"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          required
                          className="bg-white border-gray-300 text-gray-900 h-12"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-900">
                          Email
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
                          className="bg-white border-gray-300 text-gray-900 h-12"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-gray-900">
                          Bericht
                        </Label>
                        <textarea
                          id="message"
                          placeholder="Jouw bericht..."
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({ ...formData, message: e.target.value })
                          }
                          required
                          rows={6}
                          className="flex w-full border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 ring-offset-background placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 text-lg font-semibold mt-6"
                      >
                        Verstuur bericht
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-6"
            >
              <Card className="bg-slate-50 border border-gray-200 p-8 hover:border-blue-500 transition-all shadow-lg">
                <CardHeader className="p-0 pb-6">
                  <CardTitle className="text-3xl font-bold text-gray-900">
                    Contactgegevens
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-blue-600/10 border border-blue-600/20">
                      <Mail className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-gray-900 font-semibold mb-1">Email</h3>
                      <a
                        href="mailto:info@thesalesagency.nl"
                        className="text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        info@thesalesagency.nl
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-blue-600/10 border border-blue-600/20">
                      <Phone className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-gray-900 font-semibold mb-1">Telefoon</h3>
                      <a
                        href="tel:+31612345678"
                        className="text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        +31 6 12 34 56 78
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-blue-600/10 border border-blue-600/20">
                      <MapPin className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-gray-900 font-semibold mb-1">Adres</h3>
                      <p className="text-gray-600">
                        Amsterdam, Nederland
                        <br />
                        (Kantoor op afspraak)
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-50 border border-gray-200 p-8 hover:border-blue-500 transition-all shadow-lg">
                <CardContent className="p-0">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Openingstijden
                  </h3>
                  <div className="space-y-2 text-gray-700">
                    <p>Maandag - Vrijdag: 09:00 - 18:00</p>
                    <p>Zaterdag: 10:00 - 16:00</p>
                    <p>Zondag: Gesloten</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}

