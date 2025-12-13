"use client";

import Link from "next/link";
import Image from "next/image";
import { Linkedin, Instagram } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const navigationLinks = [
    { href: "/", label: "Home" },
    { href: "/over-ons", label: "Over Ons" },
    { href: "/vacatures", label: "Vacatures" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <footer className="bg-slate-950 mt-auto relative z-10">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        {/* Three columns: Logo/Contact/Socials | Map | Navigatie/Legal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Links: Logo + Contact + Socials */}
          <div className="flex flex-col justify-start space-y-8">
            {/* Brand */}
            <div>
              <Link href="/" className="inline-block">
                <Image
                  src="/logo_met_tekst.png"
                  alt="The Sales Agency - Sales is een Lifestyle"
                  width={200}
                  height={60}
                  className="h-auto w-auto max-w-[200px]"
                  priority={false}
                />
              </Link>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-sm font-semibold text-slate-100 uppercase tracking-wider mb-4">
                Contact
              </h4>
              <div className="flex flex-col space-y-3 text-sm text-slate-400">
                <a
                  href="mailto:info@thesales-agency.nl"
                  className="hover:text-slate-100 transition-colors"
                >
                  info@thesales-agency.nl
                </a>
                <p className="hover:text-slate-100 transition-colors">
                  Akerkhof 16
                  <br />
                  Groningen, Nederland
                </p>
              </div>
            </div>

            {/* Social Media Icons */}
            <div>
              <h4 className="text-sm font-semibold text-slate-100 uppercase tracking-wider mb-4">
                Volg ons
              </h4>
              <div className="flex items-center space-x-4">
                <a
                  href="https://www.linkedin.com/company/thesales-agency"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-blue-400 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
                <a
                  href="https://instagram.com/thesalesagency"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-blue-400 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>

          {/* Midden: Map (vierkant) */}
          <div className="w-full aspect-square overflow-hidden border border-slate-800 hover:border-blue-500 transition-colors rounded-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2388.5!2d6.567!3d53.219!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c9d2a8c8c8c8c9%3A0x8c8c8c8c8c8c8c8c!2sAkerkhof%2016%2C%209711%20Groningen!5e0!3m2!1snl!2snl!4v1234567890123!5m2!1snl!2snl"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
              title="The Sales Agency locatie - Akerkhof 16, Groningen"
            />
          </div>

          {/* Rechts: Navigatie + Legal */}
          <div className="flex flex-col justify-start space-y-8">
            <div className="pt-[88px]">
              <h4 className="text-sm font-semibold text-slate-100 uppercase tracking-wider mb-4">
                Navigatie
              </h4>
              <nav className="flex flex-col space-y-3">
                {navigationLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-slate-100 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-sm font-semibold text-slate-100 uppercase tracking-wider mb-4">
                Legal
              </h4>
              <div className="flex flex-col space-y-3 text-sm text-slate-400">
                <Link
                  href="/privacy"
                  className="hover:text-slate-100 transition-colors"
                >
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/50">
          <p className="text-sm text-slate-500 text-center">
            © {currentYear} The Sales Agency. Alle rechten voorbehouden.
          </p>
        </div>
      </div>
    </footer>
  );
}

