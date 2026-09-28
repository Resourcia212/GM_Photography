"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
  badge?: string;
}

interface LuxurySelectProps {
  label: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}

export function LuxurySelect({
  label,
  options,
  value,
  onChange,
  placeholder = "Select an option",
  required = false,
}: LuxurySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div ref={containerRef} className="relative w-full">
      <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#182017] mb-1.5">
        {label} {required && "*"}
      </label>

      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "w-full px-4 py-3 rounded-xl bg-white/80 border text-sm text-left flex items-center justify-between transition-all duration-200 shadow-xs",
          isOpen
            ? "border-[#344031] ring-2 ring-[#344031]/15 bg-white"
            : "border-[#182017]/12 hover:border-[#182017]/25 hover:bg-white"
        )}
      >
        <span
          className={cn(
            "truncate font-normal",
            selectedOption ? "text-[#182017]" : "text-[#4A5146]/60"
          )}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>

        <ChevronDown
          className={cn(
            "w-4 h-4 text-[#4A5146] transition-transform duration-200 ml-2 flex-shrink-0",
            isOpen && "rotate-180 text-[#344031]"
          )}
        />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 4, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute z-50 left-0 right-0 max-h-60 overflow-y-auto rounded-xl bg-white/95 backdrop-blur-xl border border-white/80 shadow-[0_12px_36px_rgba(24,32,23,0.15)] p-1.5 no-scrollbar divide-y divide-black/5"
          >
            {options.map((option) => {
              const isSelected = option.value === value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "w-full px-3.5 py-2.5 rounded-lg text-xs text-left flex items-center justify-between transition-colors",
                    isSelected
                      ? "bg-[#344031]/10 text-[#344031] font-semibold"
                      : "text-[#182017] hover:bg-black/5 font-normal"
                  )}
                >
                  <div className="flex items-center gap-2 truncate pr-2">
                    <span className="truncate">{option.label}</span>
                    {option.badge && (
                      <span className="px-2 py-0.5 rounded-full bg-[#344031]/10 text-[#344031] text-[9px] uppercase tracking-wider font-semibold">
                        {option.badge}
                      </span>
                    )}
                  </div>

                  {isSelected && (
                    <Check className="w-4 h-4 text-[#344031] flex-shrink-0 ml-2 stroke-[2.5]" />
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
