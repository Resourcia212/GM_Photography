"use client";

import React, { useState, useEffect } from "react";
import { siteConfig } from "@/data/site-config";
import { Menu, ArrowUpRight } from "lucide-react";
import { MobileMenu } from "./mobile-menu";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ["about", "packages", "gallery", "contact"];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-3 sm:top-5 inset-x-0 z-40 mx-auto max-w-5xl px-4 sm:px-6 transition-all duration-300"
        )}
      >
        <nav
          aria-label="Main Navigation"
          className={cn(
            "w-full flex items-center justify-between px-4 sm:px-6 py-1.5 sm:py-2 rounded-full transition-all duration-300",
            "bg-white/45 backdrop-blur-2xl border border-white/70 shadow-[0_8px_30px_rgba(20,30,20,0.06),_inset_0_1px_1px_rgba(255,255,255,0.85)]",
            isScrolled ? "py-1.5 shadow-[0_10px_35px_rgba(20,30,20,0.09)] bg-white/65" : ""
          )}
        >
          {/* Brand Logo with GM on the Left side of Photography */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2 group"
          >
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#161D15] leading-none group-hover:opacity-85 transition-opacity">
              GM
            </span>
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.22em] font-medium text-[#464E43] opacity-85">
              Photography
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-7">
            {siteConfig.navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className={cn(
                    "relative text-xs sm:text-sm tracking-wide text-[#161D15] transition-all duration-200 py-1 hover-editorial-line",
                    isActive ? "opacity-100 font-semibold text-[#161D15]" : "opacity-75 hover:opacity-100 font-normal"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-gradient-to-r from-[#344031] to-[#C9A86A] rounded-full" />
                  )}
                </a>
              );
            })}
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => scrollToSection("#contact")}
              className="relative inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider luxury-gradient-btn text-[#F8F7F2] active:scale-95 transition-all shadow-sm group hover:shadow-md"
            >
              <span>Book Now</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => scrollToSection("#contact")}
              className="px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider luxury-gradient-btn text-[#F8F7F2]"
            >
              Book
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-1.5 rounded-full hover:bg-black/5 active:bg-black/10 transition-colors"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5 text-[#161D15]" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Modal */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onNavigate={(href) => scrollToSection(href)}
      />
    </>
  );
}
