"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Packages } from "@/components/packages";
import { Gallery } from "@/components/gallery";
import { Booking } from "@/components/booking";
import { Footer } from "@/components/footer";
import { BotanicalDecorations } from "@/components/ui/botanical-decorations";
import { GalleryLightbox } from "@/components/gallery-lightbox";
import { galleryImages, GalleryImage } from "@/data/gallery";
import { PackageItem } from "@/data/packages";
import { siteConfig } from "@/data/site-config";
import { Phone, Instagram, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Home() {
  const [selectedHeroImage, setSelectedHeroImage] = useState<GalleryImage | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<PackageItem | null>(null);
  const [showStickyBook, setShowStickyBook] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show floating quick connect dock as user scrolls past hero
      setShowStickyBook(window.scrollY > 180);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handlePackageSelect = (pkg: PackageItem) => {
    setSelectedPackage(pkg);
    scrollToSection("contact");
  };

  // Find index for lightbox
  const currentHeroIndex = selectedHeroImage
    ? galleryImages.findIndex((img) => img.id === selectedHeroImage.id)
    : 0;

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F7F1] text-[#161D15] relative selection:bg-[#344031] selection:text-[#F8F7F2] overflow-x-hidden">
      
      {/* Blurred Foliage & Golden Decorative Overlays from Reference */}
      <BotanicalDecorations />

      {/* Floating Glassmorphism Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 w-full relative z-10">
        
        {/* 1. Hero Section */}
        <Hero
          onSelectImage={(img) => setSelectedHeroImage(img)}
        />

        {/* 2. About Section */}
        <About />

        {/* 3. Packages Section */}
        <Packages onSelectPackage={handlePackageSelect} />

        {/* 4. Gallery Section */}
        <Gallery />

        {/* 5. Booking / Contact Section */}
        <Booking selectedPackage={selectedPackage} />

      </main>

      {/* 6. Footer */}
      <Footer />

      {/* Hero Lightbox Modal */}
      {selectedHeroImage && (
        <GalleryLightbox
          images={galleryImages}
          currentIndex={currentHeroIndex >= 0 ? currentHeroIndex : 0}
          isOpen={selectedHeroImage !== null}
          onClose={() => setSelectedHeroImage(null)}
          onNavigate={(newIdx) => setSelectedHeroImage(galleryImages[newIdx])}
        />
      )}

      {/* Floating Quick Connect Dock (Desktop & Mobile - Call, Instagram & WhatsApp) */}
      <div
        className={cn(
          "fixed bottom-3 right-3 sm:bottom-4 sm:right-4 z-30 transition-all duration-300 transform",
          showStickyBook
            ? "opacity-100 translate-y-0 pointer-events-auto scale-100"
            : "opacity-0 translate-y-3 pointer-events-none scale-95"
        )}
      >
        <div className="flex items-center gap-1 p-1 rounded-full bg-[#121811]/90 backdrop-blur-xl border border-[#C9A86A]/40 shadow-[0_6px_20px_rgba(0,0,0,0.28)]">
          {/* Call Photographer */}
          <a
            href={`tel:${siteConfig.contact.phone}`}
            aria-label="Call Photographer"
            className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full bg-white/10 hover:bg-white/20 text-[#F8F7F2] flex items-center justify-center transition-all active:scale-90 border border-white/10"
            title="Call Gaurav More"
          >
            <Phone className="w-3.5 h-3.5 text-[#F8F7F2]" />
          </a>

          {/* Instagram Studio Profile */}
          <a
            href={siteConfig.brandInstagram.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram Profile"
            className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full bg-white/10 hover:bg-white/20 text-[#F8F7F2] flex items-center justify-center transition-all active:scale-90 border border-white/10"
            title="Studio Instagram"
          >
            <Instagram className="w-3.5 h-3.5 text-[#F8F7F2]" />
          </a>

          {/* WhatsApp Direct Chat Button */}
          <a
            href={`https://wa.me/918625015012?text=${encodeURIComponent("Hello Gaurav More, I would like to inquire about booking a photography session.")}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white text-[11px] font-bold tracking-wide shadow-sm hover:shadow-md active:scale-95 transition-all group"
            title="Chat on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-current text-white group-hover:scale-110 transition-transform" />
            <span className="font-semibold text-[10.5px] sm:text-[11px]">WhatsApp</span>
          </a>
        </div>
      </div>

    </div>
  );
}
