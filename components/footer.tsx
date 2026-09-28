"use client";

import React from "react";
import { siteConfig } from "@/data/site-config";
import { Instagram, ArrowUp, Camera, Phone, Mail, MapPin, Heart, ArrowUpRight } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (href: string) => {
    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative bg-gradient-to-b from-[#182217] via-[#121811] to-[#0B0F0B] text-[#F8F7F2] overflow-hidden pt-16 sm:pt-20 pb-10 sm:pb-12 border-t border-[#C9A86A]/20">
      {/* Ambient Glow in Footer Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#C9A86A]/10 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-white/10">
          
          {/* Column 1: Brand & Association (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white leading-none">
                GM
              </span>
              <span className="text-xs uppercase tracking-[0.25em] font-medium text-[#C9A86A]">
                Photography
              </span>
            </div>

            <p className="text-sm text-white/75 font-normal leading-relaxed max-w-sm">
              Turning precious moments into timeless memories. Capturing weddings, romantic pre-wedding stories, and heartfelt celebrations across Shirpur &amp; beyond.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-[11px] text-white/90">
                <Camera className="w-3.5 h-3.5 text-[#C9A86A]" />
                <span>Shirpur Photographer Association</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#C9A86A]/15 text-[#C9A86A] text-[11px] font-medium">
                <Heart className="w-3 h-3" />
                <span>Frames of Forever</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-xs uppercase tracking-[0.22em] font-bold text-[#C9A86A]">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <button
                  onClick={() => scrollToSection("#about")}
                  className="hover:text-white transition-colors duration-200"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("#packages")}
                  className="hover:text-white transition-colors duration-200"
                >
                  Packages &amp; Pricing
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("#gallery")}
                  className="hover:text-white transition-colors duration-200"
                >
                  Visual Archive
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("#contact")}
                  className="hover:text-white transition-colors duration-200"
                >
                  Inquire &amp; Book
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Photography Genres (2 cols) */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-xs uppercase tracking-[0.22em] font-bold text-[#C9A86A]">
              Specialties
            </h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>Weddings &amp; Rituals</li>
              <li>Pre-Wedding Stories</li>
              <li>Bridal Portraiture</li>
              <li>Haldi &amp; Sangeet</li>
              <li>Cinematic Films</li>
            </ul>
          </div>

          {/* Column 4: Direct Connect (3 cols) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-xs uppercase tracking-[0.22em] font-bold text-[#C9A86A]">
              Direct Connect
            </h4>
            
            <div className="space-y-2.5 text-sm">
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="flex items-center gap-2.5 text-white/80 hover:text-white transition-colors group"
              >
                <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-[#C9A86A] group-hover:bg-[#C9A86A] group-hover:text-[#121811] transition-colors">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span className="font-semibold">{siteConfig.contact.phoneFormatted}</span>
              </a>

              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center gap-2.5 text-white/80 hover:text-white transition-colors group"
              >
                <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-[#C9A86A] group-hover:bg-[#C9A86A] group-hover:text-[#121811] transition-colors">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <span className="truncate">{siteConfig.contact.email}</span>
              </a>

              <div className="flex items-center gap-2.5 text-white/70">
                <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-[#C9A86A]">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <span>Shirpur, Maharashtra, India</span>
              </div>

              {/* Instagram Links */}
              <div className="pt-2 flex items-center gap-2">
                <a
                  href={siteConfig.brandInstagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/90 text-xs transition-all"
                >
                  <Instagram className="w-3.5 h-3.5 text-[#C9A86A]" />
                  <span>{siteConfig.brandInstagram.handle}</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/55">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <p>© {new Date().getFullYear()} {siteConfig.brandName}. All rights reserved.</p>
            <span className="hidden sm:inline text-white/30">•</span>
            <p>Lead Photographer: <span className="text-white/85 font-medium">{siteConfig.founder.name}</span></p>
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-[#C9A86A] hover:text-[#121811] text-white transition-all duration-300 active:scale-95 group shadow-sm"
            aria-label="Back to top"
          >
            <span className="text-xs uppercase tracking-wider font-semibold">Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
