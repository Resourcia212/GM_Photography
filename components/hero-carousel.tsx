"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, animate, PanInfo } from "framer-motion";
import { heroRailImages, GalleryImage } from "@/data/gallery";
import { ChevronLeft, ChevronRight, Sparkles, MoveHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroCarouselProps {
  onSelectImage?: (image: GalleryImage) => void;
}

export function HeroCarousel({ onSelectImage }: HeroCarouselProps) {
  const images = heroRailImages;
  const [activeIndex, setActiveIndex] = useState(2); // Start with image in the center
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(260);

  // Measure card width responsively
  useEffect(() => {
    const updateSize = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setCardWidth(190);
      } else if (w < 1024) {
        setCardWidth(240);
      } else {
        setCardWidth(280);
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Motion value representing the continuous offset
  const dragX = useMotionValue(0);
  const springX = useSpring(dragX, { stiffness: 280, damping: 30 });

  // Update target when activeIndex changes
  useEffect(() => {
    const target = -activeIndex * cardWidth;
    animate(dragX, target, {
      type: "spring",
      stiffness: 280,
      damping: 30,
    });
  }, [activeIndex, cardWidth, dragX]);

  // Handle drag end with inertia and snapping
  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    const currentOffset = dragX.get();
    const velocity = info.velocity.x;

    // Projected landing spot taking velocity into account
    const projectedOffset = currentOffset + velocity * 0.2;
    let targetIndex = Math.round(-projectedOffset / cardWidth);

    // Clamp within bounds
    targetIndex = Math.max(0, Math.min(images.length - 1, targetIndex));
    setActiveIndex(targetIndex);
  };

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => Math.min(images.length - 1, prev + 1));
  }, [images.length]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => Math.max(0, prev - 1));
  }, []);

  return (
    <div className="relative w-full overflow-hidden select-none py-2 sm:py-4">
      
      {/* Visual Slide Cue Indicator */}
      <div className="flex items-center justify-center mb-2 pointer-events-none">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 backdrop-blur-md border border-white/80 text-[10px] uppercase tracking-widest text-[#464E43] font-medium shadow-xs">
          <MoveHorizontal className="w-3 h-3 text-[#C9A86A] animate-pulse" />
          <span>Swipe or Drag to Explore</span>
        </span>
      </div>

      {/* Carousel Track Container */}
      <div
        ref={containerRef}
        className="relative w-full flex items-center justify-center min-h-[320px] sm:min-h-[420px] md:min-h-[480px]"
      >
        {/* Floating Left Arrow Overlay (Visual cue & easy touch navigation) */}
        <button
          onClick={handlePrev}
          disabled={activeIndex === 0}
          aria-label="Previous slide"
          className="absolute left-2 sm:left-6 z-30 p-2.5 sm:p-3 rounded-full bg-white/85 hover:bg-white backdrop-blur-xl border border-white shadow-[0_8px_25px_rgba(20,30,20,0.12)] text-[#161D15] disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-200 active:scale-90 hover:scale-105"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Floating Right Arrow Overlay */}
        <button
          onClick={handleNext}
          disabled={activeIndex === images.length - 1}
          aria-label="Next slide"
          className="absolute right-2 sm:right-6 z-30 p-2.5 sm:p-3 rounded-full bg-white/85 hover:bg-white backdrop-blur-xl border border-white shadow-[0_8px_25px_rgba(20,30,20,0.12)] text-[#161D15] disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-200 active:scale-90 hover:scale-105"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <motion.div
          drag="x"
          dragConstraints={{
            left: -(images.length - 1) * cardWidth - 60,
            right: 60,
          }}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={handleDragEnd}
          style={{ x: springX }}
          className={cn(
            "flex items-center absolute left-1/2 cursor-grab active:cursor-grabbing touch-pan-y",
            isDragging && "cursor-grabbing"
          )}
        >
          {images.map((img, index) => {
            return (
              <HeroCard
                key={img.id}
                image={img}
                index={index}
                activeIndex={activeIndex}
                cardWidth={cardWidth}
                springX={springX}
                onClick={() => {
                  if (activeIndex === index) {
                    if (onSelectImage) onSelectImage(img);
                  } else {
                    setActiveIndex(index);
                  }
                }}
              />
            );
          })}
        </motion.div>
      </div>

      {/* Clean Bottom Image Details (Without Pagination Numbers) */}
      <div className="mt-3 sm:mt-4 flex items-center justify-center max-w-xl mx-auto px-4 text-center">
        <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#464E43] bg-white/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/70 shadow-xs">
          <span className="font-serif font-bold text-[#161D15] text-xs sm:text-sm tracking-normal">
            {images[activeIndex]?.title}
          </span>
          <span className="text-[#C9A86A]">•</span>
          <span className="text-[#344031] font-medium">{images[activeIndex]?.subtitle}</span>
        </div>
      </div>

    </div>
  );
}

interface HeroCardProps {
  image: GalleryImage;
  index: number;
  activeIndex: number;
  cardWidth: number;
  springX: any;
  onClick: () => void;
}

function HeroCard({
  image,
  index,
  activeIndex,
  cardWidth,
  springX,
  onClick,
}: HeroCardProps) {
  // Center anchor for this specific card
  const cardCenter = index * cardWidth;

  // Compute dynamic transform based on springX distance
  const distance = useTransform(springX, (val: number) => {
    const currentCenter = -val;
    return (cardCenter - currentCenter) / cardWidth;
  });

  // Scale: 1 at center, tapering down smoothly
  const scale = useTransform(distance, [-3, -2, -1, 0, 1, 2, 3], [0.78, 0.86, 0.95, 1.02, 0.95, 0.86, 0.78]);

  // Rotation: fan-out curve matching editorial composition
  const rotateZ = useTransform(distance, [-3, -2, -1, 0, 1, 2, 3], [-7, -4.5, -2, 0, 2, 4.5, 7]);

  // Y Curve: subtle arched hanging curve
  const y = useTransform(distance, [-3, -2, -1, 0, 1, 2, 3], [24, 12, 3, 0, 3, 12, 24]);

  // Opacity
  const opacity = useTransform(distance, [-3, -2, -1, 0, 1, 2, 3], [0.55, 0.8, 0.96, 1, 0.96, 0.8, 0.55]);

  // Z-Index priority
  const zIndex = useTransform(distance, (d: number) => Math.round(50 - Math.abs(d) * 10));

  const isCurrent = activeIndex === index;

  return (
    <motion.div
      style={{
        width: cardWidth,
        scale,
        rotateZ,
        y,
        opacity,
        zIndex,
        transformOrigin: "bottom center",
      }}
      onClick={onClick}
      className={cn(
        "flex-shrink-0 -mx-3 sm:-mx-5 transition-shadow duration-300 group",
        "relative rounded-2xl sm:rounded-3xl p-1.5 bg-gradient-to-b from-white/90 via-white/70 to-white/90 backdrop-blur-md shadow-[0_15px_35px_-5px_rgba(30,40,25,0.16)] hover:shadow-[0_20px_45px_-5px_rgba(30,40,25,0.22)] border border-white/80"
      )}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl sm:rounded-2xl bg-[#ECEAE1]">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority={index <= 3}
          sizes="(max-width: 640px) 190px, (max-width: 1024px) 240px, 280px"
          className={cn(
            "object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform",
            isCurrent ? "scale-100 group-hover:scale-108" : "scale-105 filter brightness-[0.94]"
          )}
          draggable={false}
        />

        {/* Subtle gradient scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Floating badge for active image */}
        {isCurrent && (
          <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-[#182017]/70 backdrop-blur-md text-[#F8F7F2] text-[8px] sm:text-[9px] uppercase tracking-widest font-semibold flex items-center gap-1 border border-white/20">
            <Sparkles className="w-2.5 h-2.5 text-[#C9A86A]" />
            <span>Featured</span>
          </div>
        )}

        {/* Caption overlay on hover */}
        <div className="absolute bottom-3 inset-x-3 text-[#F8F7F2] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="font-serif text-xs sm:text-sm font-semibold leading-snug">{image.title}</p>
          <p className="text-[9px] sm:text-[10px] uppercase tracking-wider text-white/80">{image.subtitle}</p>
        </div>
      </div>
    </motion.div>
  );
}
