"use client";

import React from "react";
import { motion } from "framer-motion";

export function BotanicalDecorations() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      
      {/* ========================================================================= */}
      {/* 1. TOP-LEFT BOKEH FOLIAGE CANOPY (FOREGROUND BLUR VIGNETTE)               */}
      {/* ========================================================================= */}
      <motion.div
        animate={{
          y: [0, -6, 0],
          rotate: [-1, 1, -1],
        }}
        transition={{
          repeat: Infinity,
          duration: 12,
          ease: "easeInOut",
        }}
        className="absolute -top-12 -left-12 sm:-top-16 sm:-left-16 w-72 sm:w-[480px] md:w-[560px] h-72 sm:h-[420px] md:h-[480px]"
      >
        <svg
          viewBox="0 0 600 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <defs>
            {/* Rich natural botanical gradients */}
            <linearGradient id="deep-leaf-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4A6341" stopOpacity="0.95" />
              <stop offset="40%" stopColor="#2F4428" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#182614" stopOpacity="0.95" />
            </linearGradient>
            <linearGradient id="deep-leaf-2" x1="20%" y1="0%" x2="80%" y2="100%">
              <stop offset="0%" stopColor="#67845A" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#3E5434" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#1E2C1B" stopOpacity="0.95" />
            </linearGradient>
            <linearGradient id="deep-leaf-3" x1="0%" y1="20%" x2="100%" y2="80%">
              <stop offset="0%" stopColor="#557049" stopOpacity="0.85" />
              <stop offset="60%" stopColor="#324729" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#162313" stopOpacity="0.95" />
            </linearGradient>
            <linearGradient id="stem-branch" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#33422C" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#1B2516" stopOpacity="0.9" />
            </linearGradient>

            {/* Gaussian Blur Filters for DSLR Depth-of-Field Foreground Bokeh */}
            <filter id="bokeh-heavy" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="16" />
            </filter>
            <filter id="bokeh-med" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="8" />
            </filter>
            <filter id="bokeh-soft" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" />
            </filter>
          </defs>

          {/* LAYER 1: Deep Macro Blurred Foreground Leaves */}
          <g filter="url(#bokeh-heavy)" opacity="0.85">
            <path
              d="M-20 -10 C 80 30, 180 120, 190 220 C 120 260, 20 200, -30 110 Z"
              fill="url(#deep-leaf-1)"
            />
            <path
              d="M 50 -30 C 170 10, 260 80, 290 180 C 220 210, 110 150, 40 70 Z"
              fill="url(#deep-leaf-2)"
            />
            <path
              d="M -30 100 C 50 160, 100 270, 70 380 C 10 370, -40 280, -50 180 Z"
              fill="url(#deep-leaf-3)"
            />
          </g>

          {/* LAYER 2: Mid-distance Bokeh Foliage Branches */}
          <g filter="url(#bokeh-med)" opacity="0.9">
            <path
              d="M 0 0 Q 180 120 340 180"
              stroke="url(#stem-branch)"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M 120 70 C 180 60, 240 100, 270 150 C 210 170, 150 140, 120 70 Z"
              fill="url(#deep-leaf-2)"
            />
            <path
              d="M 210 110 C 280 100, 350 140, 380 200 C 310 230, 240 190, 210 110 Z"
              fill="url(#deep-leaf-1)"
            />
            <path
              d="M 280 150 C 350 140, 430 180, 450 240 C 390 270, 320 230, 280 150 Z"
              fill="url(#deep-leaf-3)"
            />
            <path
              d="M 160 110 C 170 180, 140 260, 90 320 C 60 270, 80 190, 160 110 Z"
              fill="url(#deep-leaf-2)"
            />
          </g>

          {/* LAYER 3: Soft-focus Edge Leaves */}
          <g filter="url(#bokeh-soft)" opacity="0.8">
            <path
              d="M 250 80 C 310 50, 380 70, 410 120 C 350 145, 290 130, 250 80 Z"
              fill="url(#deep-leaf-1)"
            />
            <path
              d="M 360 140 C 420 120, 490 150, 520 210 C 450 240, 390 200, 360 140 Z"
              fill="url(#deep-leaf-2)"
            />
          </g>
        </svg>
      </motion.div>

      {/* ========================================================================= */}
      {/* 2. TOP-RIGHT BOKEH FOLIAGE CANOPY                                        */}
      {/* ========================================================================= */}
      <motion.div
        animate={{
          y: [0, -8, 0],
          rotate: [1, -1, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 14,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute -top-12 -right-12 sm:-top-16 sm:-right-16 w-72 sm:w-[480px] md:w-[560px] h-72 sm:h-[420px] md:h-[480px]"
      >
        <svg
          viewBox="0 0 600 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full scale-x-[-1]"
        >
          <g filter="url(#bokeh-heavy)" opacity="0.85">
            <path
              d="M-20 -10 C 80 30, 180 120, 190 220 C 120 260, 20 200, -30 110 Z"
              fill="url(#deep-leaf-1)"
            />
            <path
              d="M 50 -30 C 170 10, 260 80, 290 180 C 220 210, 110 150, 40 70 Z"
              fill="url(#deep-leaf-2)"
            />
            <path
              d="M -30 100 C 50 160, 100 270, 70 380 C 10 370, -40 280, -50 180 Z"
              fill="url(#deep-leaf-3)"
            />
          </g>

          <g filter="url(#bokeh-med)" opacity="0.9">
            <path
              d="M 0 0 Q 180 120 340 180"
              stroke="url(#stem-branch)"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M 120 70 C 180 60, 240 100, 270 150 C 210 170, 150 140, 120 70 Z"
              fill="url(#deep-leaf-2)"
            />
            <path
              d="M 210 110 C 280 100, 350 140, 380 200 C 310 230, 240 190, 210 110 Z"
              fill="url(#deep-leaf-1)"
            />
            <path
              d="M 280 150 C 350 140, 430 180, 450 240 C 390 270, 320 230, 280 150 Z"
              fill="url(#deep-leaf-3)"
            />
            <path
              d="M 160 110 C 170 180, 140 260, 90 320 C 60 270, 80 190, 160 110 Z"
              fill="url(#deep-leaf-2)"
            />
          </g>

          <g filter="url(#bokeh-soft)" opacity="0.8">
            <path
              d="M 250 80 C 310 50, 380 70, 410 120 C 350 145, 290 130, 250 80 Z"
              fill="url(#deep-leaf-1)"
            />
            <path
              d="M 360 140 C 420 120, 490 150, 520 210 C 450 240, 390 200, 360 140 Z"
              fill="url(#deep-leaf-2)"
            />
          </g>
        </svg>
      </motion.div>

      {/* ========================================================================= */}
      {/* 3. SIDE VIEWPORT BOKEH LEAVES (LEFT & RIGHT MID BORDERS)                  */}
      {/* ========================================================================= */}
      {/* Left Mid Bokeh Leaves */}
      <div className="absolute top-1/2 -translate-y-1/2 -left-10 w-44 sm:w-64 h-64 sm:h-96 opacity-65 pointer-events-none">
        <svg viewBox="0 0 250 400" fill="none" className="w-full h-full">
          <g filter="url(#bokeh-heavy)">
            <path
              d="M -30 50 C 40 90, 110 170, 90 260 C 20 280, -20 210, -40 140 Z"
              fill="url(#deep-leaf-1)"
            />
            <path
              d="M -20 180 C 60 220, 130 300, 100 370 C 40 390, -10 320, -30 250 Z"
              fill="url(#deep-leaf-2)"
            />
          </g>
          <g filter="url(#bokeh-soft)">
            <path
              d="M 10 140 C 60 170, 110 220, 95 280 C 45 295, 10 245, 10 140 Z"
              fill="url(#deep-leaf-3)"
            />
          </g>
        </svg>
      </div>

      {/* Right Mid Bokeh Leaves */}
      <div className="absolute top-1/2 -translate-y-1/2 -right-10 w-44 sm:w-64 h-64 sm:h-96 opacity-65 pointer-events-none">
        <svg viewBox="0 0 250 400" fill="none" className="w-full h-full scale-x-[-1]">
          <g filter="url(#bokeh-heavy)">
            <path
              d="M -30 50 C 40 90, 110 170, 90 260 C 20 280, -20 210, -40 140 Z"
              fill="url(#deep-leaf-1)"
            />
            <path
              d="M -20 180 C 60 220, 130 300, 100 370 C 40 390, -10 320, -30 250 Z"
              fill="url(#deep-leaf-2)"
            />
          </g>
          <g filter="url(#bokeh-soft)">
            <path
              d="M 10 140 C 60 170, 110 220, 95 280 C 45 295, 10 245, 10 140 Z"
              fill="url(#deep-leaf-3)"
            />
          </g>
        </svg>
      </div>

      {/* ========================================================================= */}
      {/* 4. BOTTOM-LEFT & BOTTOM-RIGHT BOKEH FOLIAGE (FOREST VIGNETTE)             */}
      {/* ========================================================================= */}
      {/* Bottom-Left Foliage */}
      <motion.div
        animate={{
          y: [0, 6, 0],
          rotate: [-1, 1, -1],
        }}
        transition={{
          repeat: Infinity,
          duration: 11,
          ease: "easeInOut",
        }}
        className="absolute -bottom-10 -left-10 sm:-bottom-14 sm:-left-14 w-60 sm:w-96 md:w-[460px] h-60 sm:h-80 md:h-[380px] opacity-75"
      >
        <svg viewBox="0 0 500 400" fill="none" className="w-full h-full">
          <g filter="url(#bokeh-heavy)">
            <path
              d="M -20 420 C 60 320, 160 260, 240 280 C 200 360, 100 410, -10 430 Z"
              fill="url(#deep-leaf-1)"
            />
            <path
              d="M 80 430 C 140 330, 250 290, 330 320 C 290 390, 190 430, 80 430 Z"
              fill="url(#deep-leaf-2)"
            />
          </g>
          <g filter="url(#bokeh-med)">
            <path
              d="M 180 370 C 240 290, 330 260, 400 290 C 360 360, 270 390, 180 370 Z"
              fill="url(#deep-leaf-3)"
            />
          </g>
        </svg>
      </motion.div>

      {/* Bottom-Right Foliage */}
      <motion.div
        animate={{
          y: [0, 5, 0],
          rotate: [1, -1, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 13,
          ease: "easeInOut",
          delay: 1.5,
        }}
        className="absolute -bottom-10 -right-10 sm:-bottom-14 sm:-right-14 w-60 sm:w-96 md:w-[460px] h-60 sm:h-80 md:h-[380px] opacity-75"
      >
        <svg viewBox="0 0 500 400" fill="none" className="w-full h-full scale-x-[-1]">
          <g filter="url(#bokeh-heavy)">
            <path
              d="M -20 420 C 60 320, 160 260, 240 280 C 200 360, 100 410, -10 430 Z"
              fill="url(#deep-leaf-1)"
            />
            <path
              d="M 80 430 C 140 330, 250 290, 330 320 C 290 390, 190 430, 80 430 Z"
              fill="url(#deep-leaf-2)"
            />
          </g>
          <g filter="url(#bokeh-med)">
            <path
              d="M 180 370 C 240 290, 330 260, 400 290 C 360 360, 270 390, 180 370 Z"
              fill="url(#deep-leaf-3)"
            />
          </g>
        </svg>
      </motion.div>

      {/* Fine Golden Geometric Arcs for editorial framing */}
      <div className="absolute top-20 sm:top-28 left-4 sm:left-12 w-64 sm:w-[420px] h-64 sm:h-[420px] pointer-events-none opacity-30">
        <svg viewBox="0 0 400 400" fill="none" className="w-full h-full">
          <path
            d="M 20 380 A 300 300 0 0 1 380 20"
            stroke="url(#gold-arc-1)"
            strokeWidth="1.2"
            strokeDasharray="4 4"
          />
          <defs>
            <linearGradient id="gold-arc-1" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#C9A86A" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#C9A86A" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#C9A86A" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="absolute top-28 sm:top-36 right-4 sm:right-12 w-60 sm:w-[380px] h-60 sm:h-[380px] pointer-events-none opacity-30">
        <svg viewBox="0 0 400 400" fill="none" className="w-full h-full">
          <path
            d="M 380 380 A 300 300 0 0 0 20 20"
            stroke="url(#gold-arc-2)"
            strokeWidth="1"
          />
          <defs>
            <linearGradient id="gold-arc-2" x1="100%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#C9A86A" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#C9A86A" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#C9A86A" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

    </div>
  );
}
