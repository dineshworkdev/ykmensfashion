import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, Plus, Check } from 'lucide-react'
import { useWishlist } from '../../context/WishlistContext.jsx'
import { useCart } from '../../context/CartContext.jsx'
import { formatPrice } from '../../lib/format.js'

export default function ProductCard({ product, index = 0, dark = false }) {
  const [hovered, setHovered] = useState(false)
  const [justAdded, setJustAdded] = useState(false)
  const { isWished, toggle } = useWishlist()
  const { addToCart } = useCart()
  const wished = isWished(product.id)

  const img1 = product.images[0]
  const img2 = product.images[1] || product.images[0]

  function handleQuickAdd(e) {
    e.preventDefault()
    e.stopPropagation()
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      slug: product.slug,
      image: img1,
      selectedSize: 'M',
      selectedColor: product.colors[0],
    })
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1400)
  }

  function handleWishlist(e) {
    e.preventDefault()
    e.stopPropagation()
    toggle(product.id)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: (index % 4) * 0.05 }}
      className="group flex flex-col justify-between"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={`flex flex-col h-full rounded-[5px] transition-all duration-350 p-2 sm:p-2.5 ${
          dark
            ? 'bg-[#201A16] border border-white/10 hover:border-white/25 text-white shadow-[0_4px_16px_rgba(0,0,0,0.3)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.45)]'
            : 'bg-white border border-espresso/12 hover:border-espresso/30 text-espresso shadow-[0_2px_8px_-2px_rgba(36,27,22,0.04)] hover:shadow-[0_16px_32px_-8px_rgba(36,27,22,0.1),0_4px_12px_-2px_rgba(36,27,22,0.04)]'
        }`}
      >
        {/* ── 1. Dominant Product Image ───────────────────────────── */}
        <Link
          to={`/product/${product.slug}`}
          className={`relative block aspect-[3/4] w-full overflow-hidden rounded-[3px] ${
            dark ? 'bg-[#2A221D]' : 'bg-[#F4EDE4]'
          }`}
        >
          {/* Primary View with Luxurious Settle */}
          <img
            src={img1}
            alt={product.name}
            loading="lazy"
            className={`absolute inset-0 h-full w-full object-cover object-center transition-all duration-700 ease-[0.25,1,0.5,1] ${
              hovered ? 'scale-[1.035] opacity-0' : 'scale-100 opacity-100'
            }`}
          />

          {/* Alternate Angle View */}
          {img2 && (
            <img
              src={img2}
              alt={`${product.name} alternate angle`}
              loading="lazy"
              className={`absolute inset-0 h-full w-full object-cover object-center transition-all duration-700 ease-[0.25,1,0.5,1] ${
                hovered ? 'scale-[1.035] opacity-100' : 'scale-100 opacity-0'
              }`}
            />
          )}

          {/* Subtle Archival Badge */}
          {product.badge && (
            <div className="absolute top-2.5 left-2.5 z-10">
              <span
                className={`inline-block px-2 py-0.5 rounded-[3px] text-[9px] font-bold uppercase tracking-[0.14em] shadow-xs backdrop-blur-md ${
                  dark
                    ? 'border border-white/20 bg-black/75 text-white'
                    : 'border border-espresso/15 bg-white/90 text-espresso'
                }`}
              >
                {product.badge}
              </span>
            </div>
          )}

          {/* Wishlist Button — Glassmorphic, subtle hover lift */}
          <button
            onClick={handleWishlist}
            aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
            className={`absolute top-2.5 right-2.5 z-10 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full border transition-all duration-200 hover:scale-105 active:scale-95 shadow-xs backdrop-blur-md ${
              dark
                ? 'border-white/20 bg-black/60 text-white hover:bg-black/90'
                : 'border-espresso/15 bg-white/85 text-espresso hover:bg-white'
            }`}
          >
            <Heart
              className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors ${
                wished ? 'text-coral fill-[#D96B5F]' : dark ? 'text-white/80' : 'text-espresso/70'
              }`}
              strokeWidth={2}
            />
          </button>

          {/* Desktop Hover Quick Add Pill Overlay */}
          <div className="absolute inset-x-2.5 bottom-2.5 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-[0.22,1,0.36,1] hidden sm:block translate-y-2 group-hover:translate-y-0">
            <button
              onClick={handleQuickAdd}
              className={`w-full py-2 px-3 rounded-[3px] font-sans font-bold text-xs uppercase tracking-[0.12em] flex items-center justify-center gap-1.5 transition-all duration-200 shadow-sm ${
                justAdded
                  ? 'bg-sage text-espresso'
                  : dark
                  ? 'bg-white text-espresso hover:bg-coral hover:text-white'
                  : 'bg-espresso text-cream hover:bg-coral hover:text-white'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>ADDED TO BAG</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5 stroke-[2]" />
                  <span>QUICK ADD</span>
                </>
              )}
            </button>
          </div>
        </Link>

        {/* ── 2. Clean Product Information ───────────────────────────── */}
        <div className="pt-3 pb-1 px-1 flex flex-col justify-between flex-1">
          <div>
            <div
              className={`flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.16em] mb-1 ${
                dark ? 'text-white/50' : 'text-espresso/50'
              }`}
            >
              <span>{product.category}</span>
              <span className="text-[9px] opacity-75">240 GSM</span>
            </div>

            <Link to={`/product/${product.slug}`}>
              <h3
                className={`font-display font-medium text-xs sm:text-[14px] leading-snug line-clamp-1 group-hover:text-coral transition-colors duration-200 ${
                  dark ? 'text-white' : 'text-espresso'
                }`}
              >
                {product.name}
              </h3>
            </Link>
          </div>

          {/* Price & Action Row */}
          <div
            className={`mt-2.5 pt-2 border-t flex items-center justify-between ${
              dark ? 'border-white/10' : 'border-espresso/10'
            }`}
          >
            <div className="flex items-baseline gap-1.5">
              <span className={`font-sans font-bold text-sm sm:text-[15px] ${dark ? 'text-white' : 'text-espresso'}`}>
                {formatPrice(product.price)}
              </span>
            </div>

            {/* Mobile Touch Quick Add Button */}
            <button
              onClick={handleQuickAdd}
              className={`sm:hidden flex items-center gap-1 py-1 px-2.5 rounded-[3px] text-[10px] font-bold uppercase tracking-wider border transition-colors active:scale-95 ${
                justAdded
                  ? 'bg-sage border-sage text-espresso'
                  : dark
                  ? 'border-white/30 bg-white text-espresso'
                  : 'border-espresso bg-espresso text-white'
              }`}
            >
              {justAdded ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
              <span>{justAdded ? 'ADDED' : 'BAG'}</span>
            </button>

            <Link
              to={`/product/${product.slug}`}
              className={`hidden sm:inline-flex items-center gap-0.5 text-[11px] font-semibold tracking-wide transition-colors ${
                dark ? 'text-white/60 hover:text-white' : 'text-espresso/60 hover:text-espresso'
              }`}
            >
              <span className="underline underline-offset-4 decoration-current/30 hover:decoration-current">Details</span>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
