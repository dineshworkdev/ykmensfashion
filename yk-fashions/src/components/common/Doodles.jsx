import React from 'react'
import { motion } from 'framer-motion'

// Hand-drawn arrow pointing right or slightly downward
export function SketchArrow({ className = 'w-10 h-6 text-espresso', flip = false }) {
  return (
    <svg
      viewBox="0 0 74 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${flip ? '-scale-x-100' : ''}`}
    >
      <path
        d="M3 17.5C18.5 15.2 46.2 13.8 68 18.5M68 18.5C57.8 13.2 50.4 7.4 46.5 2M68 18.5C58.2 22.8 51.5 28.1 48 32.5"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// Animated version of SketchArrow that draws itself on view
export function AnimatedSketchArrow({ className = 'w-12 h-6 text-espresso', flip = false, delay = 0.4 }) {
  return (
    <svg
      viewBox="0 0 74 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${flip ? '-scale-x-100' : ''}`}
    >
      <motion.path
        d="M3 17.5C18.5 15.2 46.2 13.8 68 18.5M68 18.5C57.8 13.2 50.4 7.4 46.5 2M68 18.5C58.2 22.8 51.5 28.1 48 32.5"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  )
}

// Hand-drawn curved arrow looping from text to visual
export function CurvedDoodleArrow({ className = 'w-16 h-14 text-terracotta' }) {
  return (
    <svg
      viewBox="0 0 100 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M10 25 C 40 5, 80 15, 85 55 C 87 68, 80 72, 72 68"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="1 0"
      />
      <path
        d="M62 60 L 72 70 L 84 58"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// Animated curved doodle arrow
export function AnimatedCurvedDoodleArrow({ className = 'w-16 h-14 text-burnt-orange', delay = 0.5 }) {
  return (
    <svg
      viewBox="0 0 100 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <motion.path
        d="M10 25 C 40 5, 80 15, 85 55 C 87 68, 80 72, 72 68"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.path
        d="M62 60 L 72 70 L 84 58"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: delay + 0.6, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  )
}

// Playful hand-drawn star / sparkle
export function DoodleStar({ className = 'w-6 h-6 text-butter', fill = 'currentColor' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12 2C12.5 7.5 16.5 11.5 22 12C16.5 12.5 12.5 16.5 12 22C11.5 16.5 7.5 12.5 2 12C7.5 11.5 11.5 7.5 12 2Z"
        stroke="#241B16"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// Imperfect scribble circle to encircle key words
export function ScribbleCircle({ className = 'w-32 h-16 text-coral' }) {
  return (
    <svg
      viewBox="0 0 160 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M15 42C12 22 45 8 85 8C130 8 152 25 148 48C144 70 110 75 65 74C25 73 5 56 12 36C18 18 55 12 92 14"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
    </svg>
  )
}

// Wavy underline for headlines
export function WavyUnderline({ className = 'w-full h-4 text-butter' }) {
  return (
    <svg
      viewBox="0 0 280 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="none"
    >
      <path
        d="M3 11C28 3 45 16 70 8C95 1 115 15 140 8C165 2 185 16 210 9C235 2 255 15 277 8"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  )
}

// Animated Wavy Underline
export function AnimatedWavyUnderline({ className = 'w-full h-4 text-butter', delay = 0.3 }) {
  return (
    <svg
      viewBox="0 0 280 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="none"
    >
      <motion.path
        d="M3 11C28 3 45 16 70 8C95 1 115 15 140 8C165 2 185 16 210 9C235 2 255 15 277 8"
        stroke="currentColor"
        strokeWidth="4.2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.0, delay, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  )
}

// Retro Circular Stamp Badge
export function RetroStampBadge({
  text = "100% HEAVY COTTON • YK MEN'S ARCHIVE • ",
  centerText = 'YK',
  className = 'w-24 h-24',
}) {
  return (
    <div className={`relative flex items-center justify-center ${className} select-none`}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full animate-[spin_24s_linear_infinite]"
      >
        <path
          id="stampCirclePath"
          d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
          fill="none"
        />
        <text className="text-[9px] font-extrabold uppercase tracking-[0.16em] fill-espresso">
          <textPath href="#stampCirclePath" startOffset="0%">
            {text}
          </textPath>
        </text>
      </svg>
      <div className="absolute inset-2.5 rounded-full border-2 border-dashed border-espresso flex items-center justify-center bg-butter/40">
        <span className="font-display font-extrabold text-sm text-espresso">
          {centerText}
        </span>
      </div>
    </div>
  )
}
