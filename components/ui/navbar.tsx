"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface NavbarProps {
  onStartQuiz: () => void;
}

export function Navbar({ onStartQuiz }: NavbarProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Menu items gebaseerd op high-endmarketing.nl structuur
  const menuItems = [
    { href: "/", label: "Home" },
    { href: "/over-ons", label: "Over Ons" },
    { href: "/vacatures", label: "Vacatures" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact" },
  ];

  // Handle scroll to testimonials
  const handleScrollToTestimonials = () => {
    setIsMobileMenuOpen(false);
    
    if (pathname === "/") {
      const testimonialsSection = document.getElementById("testimonials-section");
      if (testimonialsSection) {
        const offset = 80; // Account for fixed navbar height
        const elementPosition = testimonialsSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    } else {
      // If not on homepage, navigate to home first then scroll
      window.location.href = "/#testimonials-section";
    }
  };

  // Handle hash navigation on page load
  useEffect(() => {
    if (pathname === "/" && window.location.hash === "#testimonials-section") {
      setTimeout(() => {
        const testimonialsSection = document.getElementById("testimonials-section");
        if (testimonialsSection) {
          const offset = 80;
          const elementPosition = testimonialsSection.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }, 100);
    }
  }, [pathname]);

  // Check scroll voor glassmorphism effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto">
        <motion.nav
          className={cn(
            "relative flex items-center justify-between h-16 px-6 md:backdrop-blur-xl border border-slate-800/50 transition-all duration-300",
            "bg-slate-900/95 md:bg-slate-900/80"
          )}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0 }}
        >
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image 
            src="/logo_met_tekst.png" 
            alt="The Sales Agency" 
            width={200}
            height={96}
            className="h-20 md:h-24 w-auto object-contain"
            priority
            sizes="(max-width: 768px) 160px, 200px"
          />
        </Link>

        {/* Desktop Menu Items */}
        <div className="hidden md:flex items-center space-x-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-4 py-2 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-slate-800/50 text-slate-100"
                    : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/50"
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <button
            onClick={handleScrollToTestimonials}
            className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-slate-100 hover:bg-slate-800/50 transition-all duration-200"
          >
            Wat Zegt Het Team
          </button>
        </div>

        {/* Desktop CTA Button */}
        <div className="hidden md:block">
          <Link href="/solliciteren">
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 font-semibold text-sm border-0 transition-all rounded-none"
            >
              Solliciteer Nu!
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-slate-100 hover:bg-slate-800/50 transition-all"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden absolute top-full left-0 right-0 mt-2 bg-slate-900/95 md:bg-slate-900/80 md:backdrop-blur-xl border border-slate-800/50 p-4 space-y-2 z-50"
            >
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "block px-4 py-3 text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-slate-800/50 text-slate-100"
                        : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/50"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <button
                onClick={handleScrollToTestimonials}
                className="block w-full text-left px-4 py-3 text-sm font-medium text-slate-400 hover:text-slate-100 hover:bg-slate-800/50 transition-all duration-200"
              >
                Wat Zegt Het Team
              </button>
              <Link href="/solliciteren" className="w-full">
                <Button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 font-semibold text-sm border-0 transition-all rounded-none"
                >
                  Solliciteer Nu!
                </Button>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
        </motion.nav>
      </div>
    </div>
  );
}

