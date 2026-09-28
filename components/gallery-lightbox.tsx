"use client";

import React, { useEffect, useCallback, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { GalleryImage } from "@/data/gallery";

interface LightboxProps {
  images: GalleryImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 120 : -120,
    opacity: 0,
    scale: 0.96,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 },
      scale: { duration: 0.2 },
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -120 : 120,
    opacity: 0,
    scale: 0.96,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 },
      scale: { duration: 0.2 },
    },
  }),
};

export function GalleryLightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}: LightboxProps) {
  const [direction, setDirection] = useState(0);
  const currentImage = images[currentIndex];

  const handleNext = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setDirection(1);
      if (currentIndex < images.length - 1) {
        onNavigate(currentIndex + 1);
      } else {
        onNavigate(0); // Loop back to start
      }
    },
    [currentIndex, images.length, onNavigate]
  );

  const handlePrev = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setDirection(-1);
      if (currentIndex > 0) {
        onNavigate(currentIndex - 1);
      } else {
        onNavigate(images.length - 1); // Loop to end
      }
    },
    [currentIndex, images.length, onNavigate]
  );

  // Swipe drag handler
  const handleDragEnd = (_: any, info: PanInfo) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold || info.velocity.x < -300) {
      handleNext();
    } else if (info.offset.x > swipeThreshold || info.velocity.x > 300) {
      handlePrev();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose, handleNext, handlePrev]);

  if (!isOpen || !currentImage) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[90] flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-[#182017]/60 backdrop-blur-md transition-all select-none"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label="Photo Preview Dialog"
      >
        {/* Floating Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-4xl rounded-2xl sm:rounded-3xl bg-[#FAF9F3] border border-white/80 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] p-4 sm:p-6 flex flex-col gap-4 overflow-hidden"
        >
          {/* Top Header Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-[#182017]/8">
            <div className="flex items-center gap-3">
              <span className="font-serif text-lg sm:text-2xl font-semibold text-[#182017] tracking-tight">
                {currentImage.title}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#344031]/10 text-[#344031] text-[10px] uppercase tracking-widest font-semibold">
                {currentImage.category}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono tracking-widest text-[#4A5146]">
                {String(currentIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
              </span>
              <button
                onClick={onClose}
                className="p-1.5 sm:p-2 rounded-full bg-[#182017]/5 hover:bg-[#182017]/10 text-[#182017] transition-colors focus:outline-none focus:ring-2 focus:ring-[#344031]"
                aria-label="Close Preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Photo Viewport with Swipe Drag */}
          <div className="relative w-full h-[360px] sm:h-[460px] md:h-[520px] rounded-xl sm:rounded-2xl overflow-hidden bg-[#ECEAE1] border border-black/5 shadow-inner touch-pan-y">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={currentImage.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.3}
                onDragEnd={handleDragEnd}
                className="relative w-full h-full cursor-grab active:cursor-grabbing flex items-center justify-center"
              >
                <Image
                  src={currentImage.src}
                  alt={currentImage.alt}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 900px"
                  className="object-contain sm:object-cover transition-all duration-300 pointer-events-none"
                  draggable={false}
                />
              </motion.div>
            </AnimatePresence>

            {/* Left Navigation Arrow */}
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-white/85 hover:bg-white text-[#182017] shadow-lg backdrop-blur-md transition-all active:scale-95 z-30 focus:outline-none hover:shadow-xl"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Right Navigation Arrow */}
            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-white/85 hover:bg-white text-[#182017] shadow-lg backdrop-blur-md transition-all active:scale-95 z-30 focus:outline-none hover:shadow-xl"
              aria-label="Next photo"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Bottom Info Bar & Quick CTA */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 text-xs text-[#4A5146]">
            <p className="font-light italic">
              {currentImage.alt}
            </p>

            <div className="flex items-center gap-3 self-end sm:self-auto">
              <a
                href="#contact"
                onClick={() => {
                  onClose();
                  const el = document.getElementById("contact");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full luxury-gradient-btn text-[#F8F7F2] text-[11px] font-semibold uppercase tracking-wider shadow-sm hover:opacity-95 transition-all"
              >
                <span>Book Shoot</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
