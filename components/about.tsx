"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Instagram, ArrowUpRight, Camera, Phone, Sparkles, Heart, MapPin } from "lucide-react";
import { siteConfig } from "@/data/site-config";

export function About() {
  return (
    <section id="about" className="pt-6 sm:pt-10 pb-16 sm:pb-24 relative overflow-hidden">
      {/* Background Ambient Warm Glow */}
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-[#EAE2D1]/40 blur-3xl pointer-events-none -z-10 rounded-full" />
      <div className="absolute top-1/3 -left-20 w-[400px] h-[400px] bg-[#F4EFE6]/50 blur-3xl pointer-events-none -z-10 rounded-full" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header Tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-6 sm:mb-8"
        >
          <span className="w-8 h-[1.5px] bg-[#C9A86A]" />
          <span className="text-xs uppercase tracking-[0.28em] font-semibold text-[#344031]">
            About GM Photography
          </span>
        </motion.div>

        {/* 2-Column Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Big Serif Statement & Narrative Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 bg-white/92 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white shadow-[0_15px_40px_rgba(20,30,20,0.06)] space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#344031]/8 border border-[#344031]/10 text-[11px] font-medium text-[#1E281C]">
              <Camera className="w-3.5 h-3.5 text-[#C9A86A]" />
              <span>GM Photography • Shirpur Photographer Association</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#121811] leading-[1.15] tracking-tight">
              Turning precious moments into{" "}
              <span className="italic text-[#2D3F28]">timeless memories</span>.
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[#242E22] font-normal leading-relaxed">
              <p>
                From beautiful weddings <span className="inline-block">💍</span> to romantic pre-wedding stories <span className="inline-block">❤️</span>, 
                we capture every smile, emotion &amp; celebration with creativity and passion.
              </p>
              <p>
                Based in <strong className="font-semibold text-[#121811]">Shirpur, Maharashtra</strong>, we preserve your most unforgettable moments through authentic, cinematic &amp; heartfelt photography. <span className="inline-block">🤍📷</span>
              </p>
            </div>

            {/* Feature Badges */}
            <div className="pt-2 flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white border border-[#161D15]/8 shadow-xs text-xs text-[#121811] font-semibold">
                <MapPin className="w-3.5 h-3.5 text-[#C9A86A]" />
                <span>Shirpur, Maharashtra</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white border border-[#161D15]/8 shadow-xs text-xs text-[#121811] font-semibold">
                <Heart className="w-3.5 h-3.5 text-[#A84E3C]" />
                <span>Weddings &amp; Pre-Weddings</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#344031]/10 text-[#242E22] text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-[#C9A86A]" />
                <span>Cinematic &amp; Heartfelt</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Founder Arch Card & Direct Connect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-white/95 via-white/90 to-white/95 backdrop-blur-2xl border border-white shadow-[0_20px_50px_rgba(20,30,20,0.08)]">
              
              {/* Founder Profile Row */}
              <div className="flex items-center gap-5 pb-6 border-b border-[#161D15]/8">
                <div className="relative w-24 h-28 sm:w-28 sm:h-32 rounded-2xl overflow-hidden bg-[#ECEAE1] flex-shrink-0 border-2 border-white shadow-md group">
                  <Image
                    src="/images/gaurav-more.webp"
                    alt="Gaurav More - Founder & Lead Photographer"
                    fill
                    className="object-cover object-top transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-108 will-change-transform"
                    sizes="150px"
                    priority
                  />
                </div>
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#121811]">
                    {siteConfig.founder.name}
                  </h3>
                  <p className="text-xs uppercase tracking-widest text-[#464E43] mt-1 font-medium">
                    {siteConfig.founder.role}
                  </p>
                  <p className="text-xs text-[#2D3F28] mt-1.5 font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#C9A86A]" />
                    {siteConfig.association.name}
                  </p>
                </div>
              </div>

              {/* Direct Connect Quick Actions */}
              <div className="pt-6 space-y-3">
                <p className="text-[10px] uppercase tracking-wider text-[#464E43] font-bold">
                  Connect Directly
                </p>

                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-white hover:bg-white/90 border border-white shadow-xs transition-all duration-300 group hover:shadow-md hover:border-[#C9A86A]/40"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#344031]/10 text-[#344031] flex items-center justify-center group-hover:bg-[#344031] group-hover:text-[#F8F7F2] transition-colors">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] uppercase tracking-wider text-[#464E43]">Call / WhatsApp</p>
                      <p className="text-xs font-semibold text-[#121811]">{siteConfig.contact.phoneFormatted}</p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#464E43] group-hover:text-[#121811] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>

                <a
                  href={siteConfig.brandInstagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-white hover:bg-white/90 border border-white shadow-xs transition-all duration-300 group hover:shadow-md hover:border-[#C9A86A]/40"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#344031]/10 text-[#344031] flex items-center justify-center group-hover:bg-[#344031] group-hover:text-[#F8F7F2] transition-colors">
                      <Instagram className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] uppercase tracking-wider text-[#464E43]">Studio Instagram</p>
                      <p className="text-xs font-semibold text-[#121811]">{siteConfig.brandInstagram.handle}</p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#464E43] group-hover:text-[#121811] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
