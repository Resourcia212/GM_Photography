"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Instagram, ExternalLink } from "lucide-react";
import { siteConfig } from "@/data/site-config";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (href: string) => void;
}

export function MobileMenu({ isOpen, onClose, onNavigate }: MobileMenuProps) {
  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[80] bg-[#1F281E]/40 backdrop-blur-xl flex flex-col justify-between p-6 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
        >
          {/* Header in Overlay */}
          <div className="flex items-center justify-between">
            <span className="font-serif text-xl tracking-tight text-[#F5F4ED]">
              {siteConfig.shortName}
            </span>
            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-white/10 text-[#F5F4ED] hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-[#F5F4ED]"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col space-y-5 my-auto py-8">
            <p className="text-xs uppercase tracking-[0.25em] text-[#F5F4ED]/60 font-medium">
              Navigation
            </p>
            {siteConfig.navLinks.map((link, index) => (
              <motion.button
                key={link.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.08 * (index + 1), duration: 0.35 }}
                onClick={() => {
                  onClose();
                  onNavigate(link.href);
                }}
                className="text-left font-serif text-3xl sm:text-4xl text-[#F5F4ED] hover:text-white/80 transition-colors flex items-center justify-between group"
              >
                <span>{link.label}</span>
                <ArrowRight className="w-6 h-6 opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#F5F4ED]/60" />
              </motion.button>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.35 }}
              className="pt-4"
            >
              <button
                onClick={() => {
                  onClose();
                  onNavigate("#contact");
                }}
                className="w-full py-3.5 px-6 rounded-full bg-[#F5F4ED] text-[#1F281E] font-medium text-base tracking-wide flex items-center justify-center gap-2 hover:bg-white transition-all shadow-lg active:scale-98"
              >
                <span>Book a Session</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>

          {/* Footer Social & Info in Overlay */}
          <div className="pt-6 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#F5F4ED]/75">
            <div className="flex items-center gap-4">
              <a
                href={siteConfig.brandInstagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Instagram className="w-4 h-4" />
                <span>{siteConfig.brandInstagram.handle}</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            </div>
            <p className="text-[#F5F4ED]/60">
              {siteConfig.association.name}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
