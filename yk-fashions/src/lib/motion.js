// Shared motion vocabulary — controlled, artistic, editorial retro feel
export const ease = [0.22, 1, 0.36, 1]
export const easeIn = [0.36, 0, 1, 0]
export const easeSlow = [0.16, 1, 0.3, 1]

// ─── Basic fades ────────────────────────────────────────────────────────────

export const fadeIn = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.7, ease } },
}

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
}

export const fadeDown = {
  hidden: { opacity: 0, y: -20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
}

export const popIn = {
  hidden: { opacity: 0, scale: 0.92 },
  show:   { opacity: 1, scale: 1, transition: { duration: 0.55, ease } },
}

// ─── Stagger container ───────────────────────────────────────────────────────

export const stagger = (delay = 0.08, start = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: delay, delayChildren: start } },
})

// ─── Sketch Line Draw ────────────────────────────────────────────────────────

export const sketchDraw = {
  hidden: { pathLength: 0, opacity: 0 },
  show:   { pathLength: 1, opacity: 1, transition: { duration: 1.1, ease: easeSlow } },
}

// ─── Image clip-path wipe ────────────────────────────────────────────────────

export const imageReveal = {
  hidden: { clipPath: 'inset(0 0 100% 0)' },
  show:   { clipPath: 'inset(0 0 0% 0)', transition: { duration: 1.1, ease: easeSlow } },
}

export const imageRevealLeft = {
  hidden: { clipPath: 'inset(0 100% 0 0)' },
  show:   { clipPath: 'inset(0 0% 0 0)', transition: { duration: 1.1, ease: easeSlow } },
}

export const subtleScale = {
  hidden: { scale: 1.05 },
  show:   { scale: 1, transition: { duration: 1.4, ease: easeSlow } },
}

// ─── Page enter/exit ─────────────────────────────────────────────────────────

export const pageTransition = {
  initial:  { opacity: 0, y: 12 },
  animate:  { opacity: 1, y: 0,  transition: { duration: 0.5, ease } },
  exit:     { opacity: 0,        transition: { duration: 0.2, ease: easeIn } },
}

// ─── Hero line reveal ────────────────────────────────────────────────────────

export const heroLine = {
  hidden: { opacity: 0, y: '100%' },
  show:   { opacity: 1, y: '0%', transition: { duration: 0.85, ease: easeSlow } },
}

// ─── Viewport helpers ────────────────────────────────────────────────────────

export const viewportOnce  = { once: true, margin: '-40px' }
export const viewportEarly = { once: true, margin: '-20px' }

// ─── Hover micro-interactions ────────────────────────────────────────────────

export const hoverLift = {
  whileHover: { y: -3 },
  transition:  { duration: 0.25, ease },
}

// ─── Accordion & Drawers ─────────────────────────────────────────────────────

export const accordionContent = {
  hidden: { height: 0, opacity: 0 },
  show:   { height: 'auto', opacity: 1, transition: { duration: 0.4, ease } },
  exit:   { height: 0, opacity: 0, transition: { duration: 0.25, ease: easeIn } },
}

export const slideInRight = {
  hidden: { x: '100%' },
  show:   { x: 0, transition: { duration: 0.45, ease } },
  exit:   { x: '100%', transition: { duration: 0.3, ease: easeIn } },
}
