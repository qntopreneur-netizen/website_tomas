import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { NavbarWrapper } from "@/components/navbar-wrapper";
import { Footer } from "@/components/footer";
import { CyberBackground } from "@/components/cyber-background";
import { PasswordLock } from "@/components/password-lock";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "The Sales Agency - Sales is een Lifestyle",
  description: "The Sales Agency - Verander sales in jouw lifestyle",
  icons: {
    icon: [
      { url: "/logo_tomas.png", sizes: "any" },
      { url: "/logo_tomas.png", type: "image/png" },
    ],
    apple: [
      { url: "/logo_tomas.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/logo_tomas.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <PasswordLock>
          {/* Background Image - Fixed achtergrond voor hele pagina */}
          <div 
            className="fixed inset-0 z-0"
            style={{
              backgroundImage: "url('/paintball-bg.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundAttachment: "scroll", // Changed from fixed for better mobile performance
            }}
          >
            {/* Overlay for consistent tint and better text readability */}
            <div className="absolute inset-0 bg-slate-950/50" />
          </div>
          <div className="fixed inset-0 z-[1] pointer-events-none">
            <CyberBackground />
          </div>
          <div className="flex-1 relative z-10">
            {children}
          </div>
          <div className="relative z-10">
            <Footer />
          </div>
        </PasswordLock>
      </body>
    </html>
  );
}
