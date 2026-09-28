"use client";

import React, { useState } from "react";
import Image from "next/image";
import { galleryImages } from "@/data/gallery";
import { GalleryLightbox } from "./gallery-lightbox";
import { Maximize2, ChevronDown, ChevronUp, Images } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = ["All", "Weddings", "Portraits", "Candid", "Celebrations"] as const;
type CategoryType = (typeof categories)[number];

const INITIAL_DISPLAY_COUNT = 8;

export function Gallery() {
  const [activeCategory, setActiveCategory] = useState<CategoryType>("All");
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const filteredImages =
    activeCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  const displayedImages = isExpanded
    ? filteredImages
    : filteredImages.slice(0, INITIAL_DISPLAY_COUNT);

  const hasMore = filteredImages.length > INITIAL_DISPLAY_COUNT;

  const handleCategoryChange = (cat: CategoryType) => {
    setActiveCategory(cat);
    setIsExpanded(false);
  };

  return (
    <section id="gallery" className="py-14 sm:py-20 relative overflow-hidden">
      {/* Ambient Lighting Orbs */}
      <div className="absolute top-1/2 left-10 w-[500px] h-[500px] gradient-orb-warm blur-3xl pointer-events-none -z-10 opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12">
          <div>
            <div className="flex items-center gap-3 mb-2.5">
              <span className="w-8 h-[1.5px] bg-[#C9A86A]" />
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#464E43]">
                Visual Archive
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#121811] tracking-tight">
              Curated <span className="italic text-[#2D3F28]">frames &amp; moments</span>.
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider transition-all duration-150",
                  activeCategory === cat
                    ? "luxury-gradient-btn text-[#F8F7F2] shadow-sm"
                    : "luxury-glass-btn text-[#464E43] hover:text-[#121811]"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 100% Static Instant Grid (No rearranging/jumping animations) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4 md:gap-5 auto-rows-[200px] sm:auto-rows-[240px] md:auto-rows-[260px] lg:auto-rows-[280px]">
          {displayedImages.map((img, index) => {
            // PC View: vertical images span 2 rows, landscape images span 2 columns
            const isTall = img.span === "tall" || (index % 5 === 0 && img.aspectRatio !== "landscape");
            const isWide = img.span === "wide" || img.span === "large";

            return (
              <div
                key={img.id}
                onClick={() => setSelectedImageIndex(index)}
                className={cn(
                  "group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[#ECEAE1] cursor-pointer border border-white/85 shadow-card hover:shadow-card-hover transition-all duration-300",
                  // Desktop Asymmetric Spans
                  isTall ? "md:row-span-2" : "",
                  isWide ? "md:col-span-2" : ""
                )}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  loading="lazy"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover object-center transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-108 will-change-transform"
                />

                {/* Ambient Dark Scrim on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out flex flex-col justify-between p-3.5 sm:p-4 text-[#F8F7F2]" />

                {/* Top Category Badge on Hover */}
                <div className="absolute top-2.5 left-2.5 sm:top-3.5 sm:left-3.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                  <span className="px-2.5 py-0.5 rounded-full bg-black/45 backdrop-blur-md text-[9px] uppercase tracking-wider font-semibold text-[#F8F7F2] border border-white/20">
                    {img.category}
                  </span>
                </div>

                {/* Top Expand Icon */}
                <div className="absolute top-2.5 right-2.5 sm:top-3.5 sm:right-3.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                  <div className="p-1.5 rounded-full bg-black/45 backdrop-blur-md text-[#F8F7F2] hover:bg-black/65 transition-colors">
                    <Maximize2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </div>
                </div>

                {/* Bottom Caption on Hover */}
                <div className="absolute bottom-2.5 inset-x-2.5 sm:bottom-3.5 sm:inset-x-3.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                  <h3 className="font-serif text-sm sm:text-base md:text-lg font-semibold text-white tracking-tight leading-snug">
                    {img.title}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-white/80 font-normal mt-0.5 truncate">
                    {img.subtitle || img.alt}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* "See More Images" / "Show Less" Action Button */}
        {hasMore && (
          <div className="mt-10 sm:mt-12 flex flex-col items-center justify-center gap-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-xs font-semibold uppercase tracking-wider luxury-gradient-btn text-[#F8F7F2] active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg group"
            >
              <Images className="w-4 h-4 text-[#C9A86A]" />
              <span>
                {isExpanded
                  ? "Show Less"
                  : `See More Images (${filteredImages.length - INITIAL_DISPLAY_COUNT} More)`}
              </span>
              {isExpanded ? (
                <ChevronUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
              ) : (
                <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
              )}
            </button>
            <p className="text-[11px] text-[#464E43] font-medium tracking-wide">
              Showing {displayedImages.length} of {filteredImages.length} photographs
            </p>
          </div>
        )}

      </div>

      {/* Cinematic Lightbox Modal */}
      {selectedImageIndex !== null && (
        <GalleryLightbox
          images={filteredImages}
          currentIndex={selectedImageIndex}
          isOpen={selectedImageIndex !== null}
          onClose={() => setSelectedImageIndex(null)}
          onNavigate={(newIdx) => setSelectedImageIndex(newIdx)}
        />
      )}
    </section>
  );
}
