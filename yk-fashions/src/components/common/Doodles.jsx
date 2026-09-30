import React from 'react'
import { motion } from 'framer-motion'

// Editorial sharp arrow
export function SketchArrow({ className = 'w-8 h-4 text-espresso', flip = false }) {
  return (
    <svg
      viewBox="0 0 74 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${flip ? '-scale-x-100' : ''}`}
    >
      <path
        d="M3 17.5C22 16.5 48 15.5 69 17.5M69 17.5C59 13.5 53 8 49 3M69 17.5C59 21.5 53 27 49 31"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// Animated version of SketchArrow that draws itself on view
export function AnimatedSketchArrow({ className = 'w-8 h-4 text-espresso', flip = false, delay = 0.3 }) {
  return (
    <svg
      viewBox="0 0 74 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${flip ? '-scale-x-100' : ''}`}
    >
      <motion.path
        d="M3 17.5C22 16.5 48 15.5 69 17.5M69 17.5C59 13.5 53 8 49 3M69 17.5C59 21.5 53 27 49 31"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  )
}

// Subtle curved editorial cue
export function CurvedDoodleArrow({ className = 'w-12 h-10 text-terracotta' }) {
  return (
    <svg
      viewBox="0 0 100 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M10 25 C 40 10, 75 18, 80 50 C 82 62, 75 66, 68 64"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M60 56 L 68 64 L 78 54"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function AnimatedCurvedDoodleArrow({ className = 'w-12 h-10 text-burnt-orange', delay = 0.4 }) {
  return (
    <svg
      viewBox="0 0 100 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <motion.path
        d="M10 25 C 40 10, 75 18, 80 50 C 82 62, 75 66, 68 64"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.path
        d="M60 56 L 68 64 L 78 54"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35, delay: delay + 0.5, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  )
}

// Refined 4-Point Fashion Editorial Star / Sparkle
export function DoodleStar({ className = 'w-4 h-4 text-coral', fill = 'currentColor' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12 0C12.5 7 17 11.5 24 12C17 12.5 12.5 17 12 24C11.5 17 7 12.5 0 12C7 11.5 11.5 7 12 0Z"
        fill="currentColor"
      />
    </svg>
  )
}

// Delicate Inked Calligraphic Underline
export function WavyUnderline({ className = 'w-full h-2.5 text-coral' }) {
  return (
    <svg
      viewBox="0 0 280 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="none"
    >
      <path
        d="M2 9C30 3 50 12 75 7C100 2 120 12 145 7C170 2 190 12 215 7C240 2 260 11 278 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

// Animated Inked Wavy Underline
export function AnimatedWavyUnderline({ className = 'w-full h-2.5 text-coral', delay = 0.2 }) {
  return (
    <svg
      viewBox="0 0 280 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="none"
    >
      <motion.path
        d="M2 9C30 3 50 12 75 7C100 2 120 12 145 7C170 2 190 12 215 7C240 2 260 11 278 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  )
}

// Atelier Registration Crosshair Mark
export function EditorialMark({ className = 'w-3 h-3 text-espresso/40' }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <line x1="8" y1="1" x2="8" y2="15" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="1" y1="8" x2="15" y2="8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="8" cy="8" r="4.5" stroke="currentColor" strokeWidth="1" strokeDasharray="1.5 1.5" />
    </svg>
  )
}

// High-Fashion Atelier Circular Seal
export function RetroStampBadge({
  text = "100% HEAVY COTTON • YK MENS FASHION • ",
  centerText = 'YK',
  className = 'w-24 h-24',
}) {
  return (
    <div className={`relative flex items-center justify-center ${className} select-none`}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full animate-[spin_32s_linear_infinite]"
      >
        <path
          id="stampCirclePath"
          d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
          fill="none"
        />
        <text className="text-[8.5px] font-bold uppercase tracking-[0.18em] fill-current">
          <textPath href="#stampCirclePath" startOffset="0%">
            {text}
          </textPath>
        </text>
      </svg>
      <div className="absolute inset-2.5 rounded-full border border-dashed border-current/40 flex items-center justify-center">
        <span className="font-serif italic text-base font-bold text-current">
          {centerText}
        </span>
      </div>
    </div>
  )
}
