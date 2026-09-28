"use client";

import React, { useEffect } from "react";
import { RefreshCcw } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log client error safely without leaking sensitive information
    console.error("UI Error caught by boundary:", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center bg-[#F5F4ED] text-[#1F281E]">
      <div className="max-w-md mx-auto space-y-4">
        <h2 className="font-serif text-3xl font-normal text-[#1F281E]">
          Something went wrong.
        </h2>
        <p className="text-sm text-[#555A51] font-light">
          An unexpected error occurred while loading this view. Please try again.
        </p>
        <div className="pt-2">
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#3E4A3B] text-[#F5F4ED] text-xs font-semibold uppercase tracking-wider hover:bg-[#2F382D] transition-all"
          >
            <RefreshCcw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>
        </div>
      </div>
    </div>
  );
}
