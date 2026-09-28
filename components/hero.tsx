"use client";

import React from "react";
import { motion } from "framer-motion";
import { HeroCarousel } from "./hero-carousel";
import { GalleryImage } from "@/data/gallery";

interface HeroProps {
  onSelectImage?: (image: GalleryImage) => void;
}

export function Hero({ onSelectImage }: HeroProps) {
  return (
    <section className="relative pt-24 sm:pt-28 md:pt-32 pb-4 sm:pb-6 overflow-hidden">
      {/* Warm Golden Sun Burst Glow in Hero Background */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1000px] h-[400px] sm:h-[550px] bg-gradient-to-b from-[#F2E8D5]/60 via-[#E8E2D2]/30 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Floating Side Vertical Editorial Tag */}
      <div className="hidden xl:flex flex-col items-center gap-3 absolute top-32 right-8 text-[10px] tracking-[0.3em] uppercase text-[#464E43]/70 font-semibold select-none">
        <span className="w-[1.5px] h-12 bg-gradient-to-b from-[#C9A86A] to-transparent" />
        <span className="writing-vertical [writing-mode:vertical-rl] rotate-180">
          Love Stories Beyond Time
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Tagline: WEDDINGS • STORIES • EMOTIONS • FOREVER (Properly bounded on mobile) */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex items-center justify-center gap-2 sm:gap-3 text-[9px] sm:text-xs uppercase tracking-[0.14em] sm:tracking-[0.26em] font-semibold text-[#464E43] mb-3 sm:mb-4 text-center px-4 max-w-sm sm:max-w-none mx-auto"
        >
          <span>Weddings</span>
          <span className="text-[#C9A86A]">•</span>
          <span>Stories</span>
          <span className="text-[#C9A86A]">•</span>
          <span>Emotions</span>
          <span className="text-[#C9A86A]">•</span>
          <span>Forever</span>
        </motion.div>

        {/* Main Hero Headline */}
        <div className="text-center max-w-4xl mx-auto px-2">
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-3xl sm:text-6xl md:text-7xl lg:text-[5.2rem] font-normal tracking-tight text-[#161D15] leading-[1.12] sm:leading-[1.08]"
          >
            Capturing your wedding&apos;s magic, <br />
            <span className="italic font-normal text-[#364332] relative inline-block">
              one moment at a time
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-3.5 sm:mt-5 text-xs sm:text-base md:text-lg text-[#333C30] max-w-2xl mx-auto font-normal leading-relaxed px-2"
          >
            Capturing the love, joy, and magic of your wedding day, preserving timeless memories to cherish forever.
          </motion.p>
        </div>

        {/* 3D Curved Interactive Physics Image Rail */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.4 }}
          className="w-full mt-4 sm:mt-6 mb-0"
        >
          <HeroCarousel onSelectImage={onSelectImage} />
        </motion.div>

      </div>
    </section>
  );
}
