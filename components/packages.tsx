"use client";

import React from "react";
import { packagesData, PackageItem } from "@/data/packages";
import { PackageCard } from "./package-card";
import { Info } from "lucide-react";

interface PackagesProps {
  onSelectPackage?: (pkg: PackageItem) => void;
}

export function Packages({ onSelectPackage }: PackagesProps) {
  const handleSelect = (pkg: PackageItem) => {
    if (onSelectPackage) {
      onSelectPackage(pkg);
    } else {
      const contactEl = document.getElementById("contact");
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section id="packages" className="py-16 sm:py-24 relative overflow-hidden bg-gradient-to-b from-transparent via-[#ECEAE1]/40 to-transparent">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] gradient-orb-olive blur-3xl pointer-events-none -z-10 opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-[1.5px] bg-[#C9A86A]" />
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#344031]">
              Curated Investment
            </span>
            <span className="w-8 h-[1.5px] bg-[#C9A86A]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#121811] tracking-tight">
            Crafted for <span className="italic text-[#2D3F28]">every story</span>.
          </h2>

          <p className="mt-3 text-sm sm:text-base text-[#464E43] font-normal max-w-xl leading-relaxed">
            Choose from customizable demo packages designed for weddings, personal portraiture, and family celebrations.
          </p>

          {/* Transparent Demo Indicator Banner */}
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/85 border border-white shadow-xs text-[11px] text-[#464E43]">
            <Info className="w-3.5 h-3.5 text-[#C9A86A]" />
            <span>Demo pricing & deliverables — custom quotes tailored upon inquiry.</span>
          </div>
        </div>

        {/* 3 Package Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {packagesData.map((item) => (
            <PackageCard
              key={item.id}
              item={item}
              onSelect={handleSelect}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
