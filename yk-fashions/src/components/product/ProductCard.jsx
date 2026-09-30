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
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.35, delay: (index % 4) * 0.04 }}
      className="group flex flex-col justify-between"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={`flex flex-col h-full rounded-sm transition-all duration-300 p-2 sm:p-2.5 ${
          dark
            ? 'bg-[#221C18] border border-white/10 hover:border-white/30 text-white shadow-[0_4px_16px_rgba(0,0,0,0.3)]'
            : 'bg-white border border-espresso/15 hover:border-espresso/35 text-espresso shadow-[0_2px_8px_-2px_rgba(36,27,22,0.04)] hover:shadow-[0_12px_24px_-6px_rgba(36,27,22,0.08)]'
        }`}
      >
        {/* ── 1. Dominant Product Image ───────────────────────────── */}
        <Link
          to={`/product/${product.slug}`}
          className={`relative block aspect-[3/4] w-full overflow-hidden rounded-[2px] ${
            dark ? 'bg-[#2E2520]' : 'bg-[#F4EDE4]'
          }`}
        >
          {/* Primary View */}
          <img
            src={img1}
            alt={product.name}
            loading="lazy"
            className={`absolute inset-0 h-full w-full object-cover object-center transition-all duration-500 ease-out ${
              hovered ? 'scale-[1.03] opacity-0' : 'scale-100 opacity-100'
            }`}
          />

          {/* Alternate Angle View */}
          {img2 && (
            <img
              src={img2}
              alt={`${product.name} alternate angle`}
              loading="lazy"
              className={`absolute inset-0 h-full w-full object-cover object-center transition-all duration-500 ease-out ${
                hovered ? 'scale-[1.03] opacity-100' : 'scale-100 opacity-0'
              }`}
            />
          )}

          {/* Subtle Archival Badge */}
          {product.badge && (
            <div className="absolute top-2.5 left-2.5 z-10">
              <span
                className={`inline-block px-2 py-0.5 rounded-[2px] text-[9px] font-bold uppercase tracking-[0.14em] shadow-xs backdrop-blur-xs ${
                  dark
                    ? 'border border-white/20 bg-black/80 text-white'
                    : 'border border-espresso/20 bg-white/95 text-espresso'
                }`}
              >
                {product.badge}
              </span>
            </div>
          )}

          {/* Wishlist Button */}
          <button
            onClick={handleWishlist}
            aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
            className={`absolute top-2.5 right-2.5 z-10 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full border transition-all active:scale-95 shadow-xs ${
              dark
                ? 'border-white/20 bg-black/60 text-white hover:bg-black/90'
                : 'border-espresso/15 bg-white/90 text-espresso hover:bg-white'
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
          <div className="absolute inset-x-2.5 bottom-2.5 z-10 opacity-0 group-hover:opacity-100 transition-all duration-200 hidden sm:block translate-y-1 group-hover:translate-y-0">
            <button
              onClick={handleQuickAdd}
              className={`w-full py-2 px-3 rounded-[2px] font-sans font-bold text-xs uppercase tracking-[0.12em] flex items-center justify-center gap-1.5 transition-all shadow-sm ${
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
              <span className="text-[9px] opacity-75">HEAVYWEIGHT</span>
            </div>

            <Link to={`/product/${product.slug}`}>
              <h3
                className={`font-display font-medium text-xs sm:text-[14px] leading-snug line-clamp-1 group-hover:text-coral transition-colors ${
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
              className={`sm:hidden flex items-center gap-1 py-1 px-2 rounded-[2px] text-[10px] font-bold uppercase tracking-wider border transition-colors ${
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
              className={`hidden sm:inline text-[11px] font-semibold tracking-wide underline underline-offset-2 transition-colors ${
                dark ? 'text-white/60 hover:text-white' : 'text-espresso/60 hover:text-espresso'
              }`}
            >
              Details
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
