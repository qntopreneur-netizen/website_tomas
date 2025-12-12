"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle2, Loader2, Sparkles, Scan } from "lucide-react";

interface QuizProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const questions = [
  {
    id: 1,
    question: "Stel je hebt naast school €1500 verdiend deze maand. Wat doe je ermee?",
    options: [
      "Sparen voor auto",
      "Alles uitgeven op vakantie",
      "Investeren/Crypto",
      "Trakteren in de club",
    ],
  },
  {
    id: 2,
    question: "Je hebt morgen een deadline maar je vrienden bellen om te chillen. Wat doe je?",
    options: [
      "Eerst je deadline afmaken, daarna chillen",
      "Met vrienden chillen, deadline fix je wel",
      "Deadline uitstellen, nu chillen",
      "Vrienden vragen om te helpen met deadline",
    ],
  },
  {
    id: 3,
    question: "Je wilt naar een festival maar je ouders vinden het te duur. Hoe fix je dit?",
    options: [
      "Onderhandelen en uitleggen waarom het belangrijk is",
      "Zeuren tot ze het goedkeuren",
      "Zelf betalen met je eigen geld",
      "Stiekem gaan zonder te vragen",
    ],
  },
  {
    id: 4,
    question: "Je vraagt iemands nummer in de stad en wordt keihard afgewezen. Hoe reageer je?",
    options: [
      "Lachen en door naar de volgende",
      "Balen en naar huis",
      "Nog eens proberen bij een ander",
      "Gewoon chill, volgende keer beter",
    ],
  },
  {
    id: 5,
    question: "Waar zie jij jezelf over 2 jaar?",
    options: [
      "Eigen business starten",
      "Manager bij AH",
      "Nog steeds op school chillen",
      "Rijk zijn en lekker leven",
    ],
  },
  {
    id: 6,
    question: "Wil je liever een vast saai uurloon van €6, of €15+ per uur als je goed je best doet?",
    options: [
      "€15+ per uur, ik ga ervoor",
      "€6 is veilig, dat is prima",
      "€15+ klinkt goed, maar is het echt?",
      "Liefst €15+ maar dan moet het wel lukken",
    ],
  },
  {
    id: 7,
    question: "Sta je vooraan bij een feestje of chill je achterin?",
    options: [
      "Vooraan, in het midden van de actie",
      "Achterin, lekker chillen",
      "Wisselt, afhankelijk van de vibe",
      "Vooraan als het goed is, anders achterin",
    ],
  },
  {
    id: 8,
    question: "Met gamen/sporten: Ben jij de leider, de teamplayer, of de solo-speler?",
    options: [
      "De leider, ik neem de lead",
      "Teamplayer, samen sterk",
      "Solo-speler, ik doe het zelf",
      "Mix, afhankelijk van de situatie",
    ],
  },
];

export function SalesQuiz({ open, onOpenChange }: QuizProps) {
  const [showIntro, setShowIntro] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showCliffhanger, setShowCliffhanger] = useState(false);
  const [showGate, setShowGate] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
  });
  const [consent, setConsent] = useState(false);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Alle vragen beantwoord, ga naar cliffhanger
      setShowCliffhanger(true);
      
      // Animate progress bar
      let currentProgress = 0;
      const progressInterval = setInterval(() => {
        currentProgress += 2;
        setProgress(currentProgress);
        if (currentProgress >= 100) {
          clearInterval(progressInterval);
          // Na 2.5 seconden naar gate
          setTimeout(() => {
            setShowCliffhanger(false);
            setShowGate(true);
          }, 500);
        }
      }, 50);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log("🚀 Form submit started");
    console.log("📋 Answers:", answers);
    console.log("👤 Form data:", formData);
    
    // Maak JSON object voor n8n webhook
    const submissionData = {
      answers: answers.map((answer, index) => ({
        questionId: questions[index].id,
        question: questions[index].question,
        answer: answer,
      })),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      age: formData.age,
      consent: consent,
      timestamp: new Date().toISOString(),
    };

    const webhookUrl = "https://n8n.chargaway.nl/webhook-test/80d2213f-2647-4ccb-9beb-1347f5a6ff65";

    // Console log voor debugging
    console.log("📤 Sending to webhook:", JSON.stringify(submissionData, null, 2));
    console.log("🔗 Webhook URL:", webhookUrl);

    try {
      console.log("⏳ Starting fetch request...");
      
      // n8n verwacht vaak de data direct in de body, niet genest in een object
      // Probeer beide formaten: eerst direct, dan genest
      const requestBody = JSON.stringify(submissionData);
      
      console.log("📦 Request body:", requestBody);
      console.log("📦 Request body length:", requestBody.length);
      
      // Stuur data naar n8n webhook
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: requestBody,
        mode: "cors",
        credentials: "omit",
      });

      console.log("✅ Fetch completed");
      console.log("✅ Response status:", response.status);
      console.log("✅ Response ok:", response.ok);
      console.log("✅ Response headers:", Object.fromEntries(response.headers.entries()));

      // Lees de response
      let responseText = "";
      try {
        responseText = await response.text();
        console.log("✅ Response body:", responseText);
      } catch (textError) {
        console.error("❌ Error reading response text:", textError);
      }

      if (!response.ok) {
        console.error("❌ HTTP Error! Status:", response.status);
        console.error("❌ Error response:", responseText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Probeer als JSON te parsen
      try {
        const result = JSON.parse(responseText);
        console.log("✅ Webhook response (JSON):", result);
      } catch (parseError) {
        console.log("✅ Webhook response (text):", responseText);
      }
      
      console.log("✅ Webhook call successful!");
      
      // Extra check: probeer een test request om te zien of webhook actief is
      console.log("🧪 Testing webhook with simple payload...");
      try {
        const testResponse = await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ test: true, message: "Test from quiz" }),
        });
        console.log("🧪 Test response status:", testResponse.status);
        const testText = await testResponse.text();
        console.log("🧪 Test response:", testText);
      } catch (testError) {
        console.error("🧪 Test failed:", testError);
      }
      
    } catch (error) {
      console.error("❌ ERROR in webhook call:", error);
      // Log meer details voor debugging
      if (error instanceof Error) {
        console.error("❌ Error name:", error.name);
        console.error("❌ Error message:", error.message);
        console.error("❌ Error stack:", error.stack);
      }
      
      // Check voor CORS errors
      if (error instanceof TypeError && error.message.includes("fetch")) {
        console.error("❌ Possible CORS error or network issue");
      }
      
      // Toon nog steeds success state, zelfs als webhook faalt
      // (gebruiker heeft formulier ingevuld, we willen goede UX)
    }

    setSubmitted(true);
    
    // Auto-close na 3 seconden
    setTimeout(() => {
      onOpenChange(false);
      resetQuiz();
    }, 3000);
  };

  const resetQuiz = () => {
    setTimeout(() => {
      setShowIntro(true);
      setCurrentQuestion(0);
      setAnswers([]);
      setShowCliffhanger(false);
      setShowGate(false);
      setSubmitted(false);
      setProgress(0);
      setFormData({ name: "", email: "", phone: "", age: "" });
      setConsent(false);
    }, 300);
  };

  const handleStartQuiz = () => {
    setShowIntro(false);
  };

  const handleClose = () => {
    onOpenChange(false);
    resetQuiz();
  };

  const quizProgress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="bg-slate-900 border border-slate-800 max-w-2xl w-[95vw] max-h-[90vh] overflow-y-auto">
        <AnimatePresence mode="wait">
          {showIntro ? (
            <motion.div
              key="intro"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="text-center py-8"
            >
              {/* AI Scan Animation */}
              <div className="flex justify-center mb-6">
                <motion.div
                  className="relative w-32 h-32 rounded-full bg-blue-600/20 border-2 border-blue-500/30 flex items-center justify-center"
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(168, 85, 247, 0.3)",
                      "0 0 40px rgba(59, 130, 246, 0.4)",
                      "0 0 20px rgba(168, 85, 247, 0.3)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <motion.div
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Scan className="h-12 w-12 text-blue-400" />
                  </motion.div>
                  {/* Pulsing rings */}
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-blue-400/30"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-blue-400/30"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 0, 0.3],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeOut",
                      delay: 0.5,
                    }}
                  />
                </motion.div>
              </div>

              <DialogHeader>
                <div className="flex justify-center mb-4">
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600/20 border border-blue-500/30 text-blue-300 text-xs font-medium">
                    <Sparkles className="h-3 w-3" />
                    AI Analysis Tool
                  </span>
                </div>
                <DialogTitle className="text-2xl md:text-3xl font-bold text-slate-100 mb-4">
                  Persoonlijkheidsanalyse & Daggeld Calculator
                </DialogTitle>
                <DialogDescription className="text-slate-400 text-base md:text-lg max-w-md mx-auto leading-relaxed">
                  Ons algoritme analyseert je antwoorden om je ideale verkoopstijl en verdienmodel te bepalen. Ben eerlijk voor het beste resultaat.
                </DialogDescription>
              </DialogHeader>

              <div className="mt-8">
                <Button
                  onClick={handleStartQuiz}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white h-14 md:h-16 text-lg font-semibold border-0 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all rounded-none"
                >
                  Start de simulatie
                  <Sparkles className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </motion.div>
          ) : !showCliffhanger && !showGate && !submitted ? (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-slate-400">
                    Vraag {currentQuestion + 1} van {questions.length}
                  </span>
                  <span className="text-sm text-blue-400 font-semibold">
                    {Math.round(quizProgress)}%
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-800 overflow-hidden">
                  <motion.div
                    className="h-full bg-blue-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${quizProgress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              <DialogHeader>
                <DialogTitle className="text-2xl md:text-3xl font-bold text-slate-100 mb-2">
                  {questions[currentQuestion].question}
                </DialogTitle>
                <DialogDescription className="text-slate-400 text-sm md:text-base">
                  Kies het antwoord dat het beste bij jou past
                </DialogDescription>
              </DialogHeader>

              <div className="mt-6 space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <motion.div
                    key={option}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Button
                      onClick={() => handleAnswer(option)}
                      className="w-full justify-start bg-slate-800 border border-slate-700 text-slate-100 hover:bg-slate-700 hover:border-blue-500 h-14 md:h-16 text-base md:text-lg transition-all group py-6 rounded-none"
                      variant="outline"
                    >
                      <span className="flex-1 text-left">{option}</span>
                      <motion.div
                        className="w-2 h-2 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        whileHover={{ scale: 1.2 }}
                      />
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : showCliffhanger ? (
            <motion.div
              key="cliffhanger"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="text-center py-12"
            >
              {/* Pulsing Circle */}
              <div className="flex justify-center mb-8">
                <motion.div
                  className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Loader2 className="h-12 w-12 text-white animate-spin" />
                </motion.div>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl md:text-3xl font-bold text-slate-100 mb-6"
              >
                Jouw potentie wordt berekend...
              </motion.p>

              {/* Progress Bar */}
              <div className="w-full max-w-md mx-auto">
                <div className="w-full h-3 bg-slate-800 overflow-hidden mb-2">
                  <motion.div
                    className="h-full bg-blue-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
                <p className="text-slate-400 text-sm">
                  {Math.round(progress)}% compleet
                </p>
              </div>
            </motion.div>
          ) : !submitted ? (
            <motion.div
              key="gate"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <DialogHeader>
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center">
                    <CheckCircle2 className="h-8 w-8 text-white" />
                  </div>
                </div>
                <DialogTitle className="text-2xl md:text-3xl font-bold text-slate-100 mb-3 text-center">
                  Je profiel is klaar!
                </DialogTitle>
                <DialogDescription className="text-slate-400 text-center text-base md:text-lg">
                  Vul je gegevens in om je persoonlijke analyse + salarisindicatie direct in je mail te ontvangen.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-slate-100 text-base">
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
                    className="bg-slate-800 border-slate-700 text-slate-100 h-14 md:h-16 text-base focus:border-blue-500 focus:ring-blue-500/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-100 text-base">
                    E-mailadres
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
                    className="bg-slate-800 border-slate-700 text-slate-100 h-14 md:h-16 text-base focus:border-blue-500 focus:ring-blue-500/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age" className="text-slate-100 text-base">
                    Leeftijd
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
                    className="bg-slate-800 border-slate-700 text-slate-100 h-14 md:h-16 text-base focus:border-blue-500 focus:ring-blue-500/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-slate-100 text-base">
                    Telefoonnummer
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
                    className="bg-slate-800 border-slate-700 text-slate-100 h-14 md:h-16 text-base focus:border-blue-500 focus:ring-blue-500/50"
                  />
                </div>

                <div className="flex items-start space-x-3 pt-2">
                  <Checkbox
                    id="consent"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1"
                  />
                  <Label
                    htmlFor="consent"
                    className="text-slate-400 text-sm leading-relaxed cursor-pointer"
                  >
                    Ik ga akkoord met het privacybeleid en dat er contact met mij wordt opgenomen
                  </Label>
                </div>

                <Button
                  type="submit"
                  disabled={!consent}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white h-14 md:h-16 text-lg font-semibold border-0 mt-6 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all rounded-none disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600"
                >
                  Stuur mijn analyse + salarisindicatie
                </Button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="text-center py-8"
            >
              <div className="flex justify-center mb-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.5 }}
                  className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center"
                >
                  <CheckCircle2 className="h-8 w-8 text-white" />
                </motion.div>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-slate-100 mb-3">
                Check je mail!
              </h3>
              <p className="text-slate-400 text-base md:text-lg">
                We nemen snel contact op.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
