"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

const CORRECT_PASSWORD = "MasjBottomG";

export function PasswordLock({ children }: { children: React.ReactNode }) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Check if password was already entered in this session
    const sessionPassword = sessionStorage.getItem("site_unlocked");
    if (sessionPassword === "true") {
      setIsUnlocked(true);
    }
    setIsChecking(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      sessionStorage.setItem("site_unlocked", "true");
      setIsUnlocked(true);
      setError(false);
    } else {
      setError(true);
      setPassword("");
    }
  };

  // Show loading state while checking session
  if (isChecking) {
    return (
      <div className="fixed inset-0 z-[9999] bg-slate-950 flex items-center justify-center">
        <div className="text-white">Laden...</div>
      </div>
    );
  }

  // Show password lock if not unlocked
  if (!isUnlocked) {
    return (
      <div className="fixed inset-0 z-[9999] bg-slate-950 flex items-center justify-center">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/paintball-bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="absolute inset-0 bg-slate-950/80" />
        </div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="relative z-10 w-full max-w-md px-6"
        >
          <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800/50 p-8 rounded-lg shadow-2xl">
            <div className="flex flex-col items-center mb-6">
              <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-4">
                <Lock className="h-8 w-8 text-slate-300" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">
                Beveiligde Website
              </h1>
              <p className="text-slate-400 text-sm text-center">
                Voer het wachtwoord in om toegang te krijgen
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(false);
                  }}
                  placeholder="Wachtwoord"
                  className={`bg-slate-800 border-slate-700 text-white h-12 ${
                    error ? "border-red-500 focus:border-red-500" : ""
                  }`}
                  autoFocus
                />
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-2"
                  >
                    Onjuist wachtwoord. Probeer opnieuw.
                  </motion.p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 font-semibold"
              >
                Toegang Verkrijgen
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  // Show children if unlocked
  return <>{children}</>;
}

