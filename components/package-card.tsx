"use client";

import React from "react";
import { PackageItem } from "@/data/packages";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface PackageCardProps {
  item: PackageItem;
  onSelect: (pkg: PackageItem) => void;
}

export function PackageCard({ item, onSelect }: PackageCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 group",
        item.isPopular
          ? "luxury-card-featured sm:-translate-y-2"
          : "luxury-card hover:-translate-y-1"
      )}
    >
      {/* Featured Header Pill */}
      {item.isPopular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full luxury-gradient-btn text-[#F8F7F2] text-[10px] uppercase tracking-widest font-semibold flex items-center gap-1.5 shadow-md border border-[#C9A86A]/40">
          <Sparkles className="w-3 h-3 text-[#C9A86A]" />
          <span>{item.badge}</span>
        </div>
      )}

      <div>
        {/* Top Number & Demo Tag */}
        <div className="flex items-center justify-between pb-4 border-b border-[#182017]/8">
          <span className="font-serif text-2xl sm:text-3xl font-normal bg-gradient-to-r from-[#182017] to-[#4A5146] bg-clip-text text-transparent opacity-60">
            {item.number}
          </span>
          <span className="text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-black/5 text-[#4A5146] font-medium border border-black/5">
            Demo Tier
          </span>
        </div>

        {/* Title & Description */}
        <div className="pt-5 pb-6">
          <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#121811] tracking-tight">
            {item.title}
          </h3>
          <p className="text-xs sm:text-sm text-[#464E43] mt-2 font-light leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Price Placeholder */}
        <div className="py-4 border-y border-[#182017]/8 my-2">
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#121811] via-[#2A3927] to-[#121811] bg-clip-text text-transparent">
              {item.price}
            </span>
            <span className="text-xs text-[#464E43] uppercase tracking-wider font-medium">
              / Session
            </span>
          </div>
          <p className="text-[11px] text-[#464E43]/80 mt-1 italic">
            {item.priceSubtitle}
          </p>
        </div>

        {/* Deliverables Checklist */}
        <div className="py-5 space-y-3">
          <p className="text-[11px] uppercase tracking-wider text-[#121811] font-semibold">
            Included Deliverables (Demo):
          </p>
          <ul className="space-y-2.5">
            {item.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-[#333C30]">
                <div className="w-4 h-4 rounded-full bg-[#344031]/10 text-[#2D3F28] flex items-center justify-center flex-shrink-0 mt-0.5 border border-[#C9A86A]/30">
                  <Check className="w-2.5 h-2.5 stroke-[2.5] text-[#C9A86A]" />
                </div>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Action Button */}
      <div className="pt-6 mt-4 border-t border-[#182017]/8">
        <button
          onClick={() => onSelect(item)}
          className={cn(
            "w-full py-3.5 px-5 rounded-full font-medium text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 active:scale-98 group/btn shadow-sm hover:shadow-md",
            item.isPopular
              ? "luxury-gradient-btn text-[#F8F7F2]"
              : "luxury-glass-btn text-[#121811]"
          )}
        >
          <span>{item.ctaLabel}</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
        </button>
      </div>
    </div>
  );
}
