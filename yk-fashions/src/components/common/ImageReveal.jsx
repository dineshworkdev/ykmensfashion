import { motion } from 'framer-motion'
import { imageReveal, subtleScale, viewportOnce } from '../../lib/motion.js'

// Wipes an image into view with a subtle inner scale settle.
// Sizing/aspect comes entirely from className.
export default function ImageReveal({ src, alt = '', className = '' }) {
  return (
    <motion.div
      className={`overflow-hidden img-placeholder ${className}`}
      variants={imageReveal}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      {src ? (
        <motion.img
          src={src}
          alt={alt}
          loading="lazy"
          className="h-full w-full object-cover"
          variants={subtleScale}
        />
      ) : (
        /* Placeholder shimmer if no src */
        <div className="h-full w-full" />
      )}
    </motion.div>
  )
}
