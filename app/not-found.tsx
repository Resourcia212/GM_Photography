"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";
import { siteConfig } from "@/data/site-config";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5F4ED] text-[#1F281E] p-6 text-center">
      <div className="max-w-md mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1F281E]/5 text-xs uppercase tracking-widest text-[#555A51] font-medium">
          <Compass className="w-3.5 h-3.5 text-[#3E4A3B]" />
          <span>Page Not Found</span>
        </div>

        <h1 className="font-serif text-5xl sm:text-6xl font-normal text-[#1F281E] tracking-tight">
          404
        </h1>

        <p className="text-sm text-[#555A51] font-light leading-relaxed">
          The moment or page you are looking for doesn&apos;t seem to exist. Return to the visual archive.
        </p>

        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#3E4A3B] text-[#F5F4ED] text-xs font-semibold uppercase tracking-wider hover:bg-[#2F382D] transition-all shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Portfolio</span>
          </Link>
        </div>

        <p className="text-xs text-[#555A51]/60 pt-6">
          {siteConfig.brandName} • Shirpur
        </p>
      </div>
    </div>
  );
}
