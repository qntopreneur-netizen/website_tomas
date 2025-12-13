"use client";

import { useState } from "react";
import { Navbar } from "@/components/ui/navbar";
import { SalesQuiz } from "@/components/sales-quiz";

export function NavbarWrapper() {
  const [quizOpen, setQuizOpen] = useState(false);

  return (
    <>
      <div className="sticky top-4 z-50 w-full px-4 -mb-20">
        <Navbar onStartQuiz={() => setQuizOpen(true)} />
      </div>
      <SalesQuiz open={quizOpen} onOpenChange={setQuizOpen} />
    </>
  );
}
