"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/ui/navbar";
import { SalesQuiz } from "@/components/sales-quiz";

export function NavbarWrapper() {
  const [quizOpen, setQuizOpen] = useState(false);

  useEffect(() => {
    const handleOpenQuiz = () => {
      setQuizOpen(true);
    };

    window.addEventListener("openQuiz", handleOpenQuiz);
    return () => window.removeEventListener("openQuiz", handleOpenQuiz);
  }, []);

  return (
    <>
      <Navbar onStartQuiz={() => setQuizOpen(true)} />
      <SalesQuiz open={quizOpen} onOpenChange={setQuizOpen} />
    </>
  );
}

