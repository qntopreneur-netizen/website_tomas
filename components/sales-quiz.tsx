"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle2, Loader2, Sparkles, Scan, X } from "lucide-react";

interface QuizProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const questions = [
  {
    id: 1,
    question: "Stel je hebt naast school €1500 verdiend deze maand. Wat doe je ermee?",
    options: ["Sparen voor auto", "Alles uitgeven op vakantie", "Investeren/Crypto", "Trakteren in de club"],
  },
  {
    id: 2,
    question: "Je hebt morgen een deadline maar je vrienden bellen om te chillen. Wat doe je?",
    options: ["Eerst je deadline afmaken, daarna chillen", "Met vrienden chillen, deadline fix je wel", "Deadline uitstellen, nu chillen", "Vrienden vragen om te helpen met deadline"],
  },
  {
    id: 3,
    question: "Je wilt naar een festival maar je ouders vinden het te duur. Hoe fix je dit?",
    options: ["Onderhandelen en uitleggen waarom het belangrijk is", "Zeuren tot ze het goedkeuren", "Zelf betalen met je eigen geld", "Stiekem gaan zonder te vragen"],
  },
  {
    id: 4,
    question: "Je vraagt iemands nummer in de stad en wordt keihard afgewezen. Hoe reageer je?",
    options: ["Lachen en door naar de volgende", "Balen en naar huis", "Nog eens proberen bij een ander", "Gewoon chill, volgende keer beter"],
  },
  {
    id: 5,
    question: "Waar zie jij jezelf over 2 jaar?",
    options: ["Eigen business starten", "Manager bij AH", "Nog steeds op school chillen", "Rijk zijn en lekker leven"],
  },
  {
    id: 6,
    question: "Wil je liever een vast saai uurloon van €6, of €15+ per uur als je goed je best doet?",
    options: ["€15+ per uur, ik ga ervoor", "€6 is veilig, dat is prima", "€15+ klinkt goed, maar is het echt?", "Liefst €15+ maar dan moet het wel lukken"],
  },
  {
    id: 7,
    question: "Sta je vooraan bij een feestje of chill je achterin?",
    options: ["Vooraan, in het midden van de actie", "Achterin, lekker chillen", "Wisselt, afhankelijk van de vibe", "Vooraan als het goed is, anders achterin"],
  },
  {
    id: 8,
    question: "Met gamen/sporten: Ben jij de leider, de teamplayer, of de solo-speler?",
    options: ["De leider, ik neem de lead", "Teamplayer, samen sterk", "Solo-speler, ik doe het zelf", "Mix, afhankelijk van de situatie"],
  },
];

export function SalesQuiz({ open, onOpenChange }: QuizProps) {
  const [mounted, setMounted] = useState(false); // Fix voor hydration errors
  const [showIntro, setShowIntro] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showCliffhanger, setShowCliffhanger] = useState(false);
  const [showGate, setShowGate] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [calculationStep, setCalculationStep] = useState(0);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", age: "" });
  const [consent, setConsent] = useState(false);

  // Zorg dat we alleen op de client renderen (nodig voor Portal)
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // SCROLL LOCK EFFECT: Voorkomt scrollen op de achtergrond
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      // Voor iOS Safari:
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.position = 'unset';
      document.body.style.width = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.position = 'unset';
      document.body.style.width = 'unset';
    };
  }, [open]);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowCliffhanger(true);
      setCalculationStep(0);
      setProgress(0);
      
      const steps = [
        "Antwoorden analyseren...",
        "Persoonlijkheidsprofiel berekenen...",
        "Verdienpotentieel bepalen...",
        "Dagsalaris berekenen...",
        "Rapportage genereren...",
      ];
      
      let currentProgress = 0;
      let stepIndex = 0;
      
      const progressInterval = setInterval(() => {
        currentProgress += 1;
        setProgress(currentProgress);
        
        // Update stap elke 20%
        const newStepIndex = Math.min(Math.floor((currentProgress / 100) * steps.length), steps.length - 1);
        if (newStepIndex !== stepIndex) {
          stepIndex = newStepIndex;
          setCalculationStep(stepIndex);
        }
        
        if (currentProgress >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            setShowCliffhanger(false);
            setShowGate(true);
          }, 500);
        }
      }, 80); // Langzamer gemaakt (van 50ms naar 80ms)
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const submissionData = {
      answers: answers.map((answer, index) => ({
        questionId: questions[index].id,
        question: questions[index].question,
        answer: answer,
      })),
      ...formData,
      consent,
      timestamp: new Date().toISOString(),
    };

    const webhookUrl = "https://n8n.chargaway.nl/webhook/80d2213f-2647-4ccb-9beb-1347f5a6ff65";

    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
        mode: "cors",
      });
    } catch (error) {
      console.error("Error", error);
    }

    setSubmitted(true);
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
      setCalculationStep(0);
      setFormData({ name: "", email: "", phone: "", age: "" });
      setConsent(false);
    }, 300);
  };

  const handleStartQuiz = () => setShowIntro(false);

  const handleClose = () => { onOpenChange(false); resetQuiz(); };

  const quizProgress = ((currentQuestion + 1) / questions.length) * 100;

  // Render niets als we niet mounted zijn of als de modal dicht is
  if (!mounted || !open) return null;

  // Dit is de 'Hybride' structuur: Ziet eruit als Dialog, maar gebruikt Portal
  const modalContent = (
    <div className="fixed top-0 left-0 w-full h-[100dvh] z-[99999] flex items-center justify-center p-0 sm:p-6 overflow-hidden touch-none">
      
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
        onClick={handleClose}
      />

      {/* Content Container (Lijkt op DialogContent) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="relative z-10 w-full h-full sm:h-auto sm:max-h-[95vh] sm:max-w-2xl bg-slate-900 sm:border sm:border-slate-800 rounded-none shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Scrollable Area Binnenin */}
        <div className="overflow-y-auto p-6">
            

            {/* Close X Button */}
            <button 
                onClick={handleClose} 
                className="absolute right-4 top-2 p-2 text-slate-400 hover:text-white transition-colors z-50"
            >
                <X className="h-5 w-5" />
            </button>

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
                <div className="flex justify-center mb-6">
                    <motion.div
                    className="relative w-32 h-32 rounded-full bg-blue-600/20 border-2 border-blue-500/30 flex items-center justify-center"
                    animate={{ boxShadow: ["0 0 20px rgba(168, 85, 247, 0.3)", "0 0 40px rgba(59, 130, 246, 0.4)", "0 0 20px rgba(168, 85, 247, 0.3)"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>
                        <Scan className="h-12 w-12 text-blue-400" />
                    </motion.div>
                    <motion.div className="absolute inset-0 rounded-full border-2 border-blue-400/30" animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }} transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }} />
                    </motion.div>
                </div>

                <div className="mb-4">
                     <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600/20 border border-blue-500/30 text-blue-300 text-xs font-medium rounded-none">
                        <Sparkles className="h-3 w-3" /> AI Analysis Tool
                     </span>
                </div>
                
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-100 mb-4">Persoonlijkheidsanalyse & Daggeld Calculator</h2>
                <p className="text-slate-400 text-sm md:text-base lg:text-lg max-w-md mx-auto leading-relaxed mb-8">
                    Ons algoritme analyseert je antwoorden om je ideale verkoopstijl en verdienmodel te bepalen.
                </p>

                <Button onClick={handleStartQuiz} className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 md:h-14 lg:h-16 text-base md:text-lg font-semibold border-0 shadow-lg shadow-blue-500/20 transition-all rounded-none">
                    Start de simulatie <Sparkles className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                </Button>
                </motion.div>
            ) : !showCliffhanger && !showGate && !submitted ? (
                <motion.div
                key="quiz"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="pt-8 sm:pt-4"
                >
                <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-slate-400">Vraag {currentQuestion + 1} van {questions.length}</span>
                    <span className="text-sm text-blue-400 font-semibold">{Math.round(quizProgress)}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-800 overflow-hidden rounded-none">
                    <motion.div className="h-full bg-blue-600" initial={{ width: 0 }} animate={{ width: `${quizProgress}%` }} transition={{ duration: 0.3 }} />
                    </div>
                </div>

                <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-slate-100 mb-2">{questions[currentQuestion].question}</h2>
                <p className="text-slate-400 text-xs md:text-sm lg:text-base mb-4 md:mb-6">Kies het antwoord dat het beste bij jou past</p>

                <div className="space-y-2 md:space-y-3">
                    {questions[currentQuestion].options.map((option, index) => (
                    <motion.div key={option} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
                        <Button onClick={() => handleAnswer(option)} className="w-full justify-start bg-slate-800 border border-slate-700 text-slate-100 hover:bg-slate-700 hover:border-blue-500 h-auto py-3 md:py-4 text-sm md:text-base lg:text-lg transition-all group rounded-none whitespace-normal text-left" variant="outline">
                        <span className="flex-1">{option}</span>
                        <motion.div className="w-2 h-2 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" whileHover={{ scale: 1.2 }} />
                        </Button>
                    </motion.div>
                    ))}
                </div>
                </motion.div>
            ) : showCliffhanger ? (
                <motion.div key="cliffhanger" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                <div className="flex justify-center mb-8">
                    <motion.div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center" animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }} transition={{ duration: 2, repeat: Infinity }}>
                    <Loader2 className="h-12 w-12 text-white animate-spin" />
                    </motion.div>
                </div>
                <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-slate-100 mb-4 md:mb-6">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={calculationStep}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      {calculationStep === 0 && "Antwoorden analyseren..."}
                      {calculationStep === 1 && "Persoonlijkheidsprofiel berekenen..."}
                      {calculationStep === 2 && "Verdienpotentieel bepalen..."}
                      {calculationStep === 3 && "Dagsalaris berekenen..."}
                      {calculationStep === 4 && "Rapportage genereren..."}
                    </motion.span>
                  </AnimatePresence>
                </h2>
                <div className="w-full max-w-md mx-auto">
                    <div className="w-full h-3 bg-slate-800 overflow-hidden mb-2 rounded-none">
                    <motion.div className="h-full bg-blue-600" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.1 }} />
                    </div>
                    <p className="text-slate-400 text-sm">{Math.round(progress)}% compleet</p>
                </div>
                </motion.div>
            ) : !submitted ? (
                <motion.div key="gate" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
                <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center">
                    <CheckCircle2 className="h-8 w-8 text-white" />
                    </div>
                </div>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-100 mb-3 text-center">Je profiel is klaar!</h2>
                <p className="text-slate-400 text-center text-sm md:text-base lg:text-lg mb-4 md:mb-6">Vul je gegevens in om je persoonlijke analyse + salarisindicatie direct in je mail te ontvangen.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2"><Label className="text-slate-100">Naam</Label><Input required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="bg-slate-800 border-slate-700 text-slate-100 h-12" /></div>
                    <div className="space-y-2"><Label className="text-slate-100">E-mailadres</Label><Input required type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="bg-slate-800 border-slate-700 text-slate-100 h-12" /></div>
                    <div className="space-y-2"><Label className="text-slate-100">Leeftijd</Label><Input required type="number" min="16" value={formData.age} onChange={(e) => setFormData({ ...formData, age: e.target.value })} className="bg-slate-800 border-slate-700 text-slate-100 h-12" /></div>
                    <div className="space-y-2"><Label className="text-slate-100">Telefoonnummer</Label><Input required type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="bg-slate-800 border-slate-700 text-slate-100 h-12" /></div>
                    
                    <div className="flex items-start space-x-3 pt-2">
                    <Checkbox id="consent" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1" />
                    <Label htmlFor="consent" className="text-slate-400 text-sm cursor-pointer">Ik ga akkoord met het privacybeleid en dat er contact met mij wordt opgenomen</Label>
                    </div>

                    <Button type="submit" disabled={!consent} className="w-full bg-blue-600 hover:bg-blue-700 text-white h-14 text-sm md:text-lg font-semibold mt-6 rounded-none">Stuur mijn analyse + salarisindicatie</Button>
                </form>
                </motion.div>
            ) : (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                <div className="flex justify-center mb-4"><motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", duration: 0.5 }} className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center"><CheckCircle2 className="h-8 w-8 text-white" /></motion.div></div>
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-100 mb-3">Check je mail!</h3>
                <p className="text-slate-400 text-sm md:text-base lg:text-lg">We nemen snel contact op.</p>
                </motion.div>
            )}
            </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
