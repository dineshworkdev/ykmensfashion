import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, Plus, Check } from 'lucide-react'
import { useWishlist } from '../../context/WishlistContext.jsx'
import { useCart } from '../../context/CartContext.jsx'
import { formatPrice } from '../../lib/format.js'

export default function ProductCard({ product, index = 0 }) {
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
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.4, delay: (index % 4) * 0.05 }}
      className="group flex flex-col justify-between"
    >
      <div
        className="rounded-2xl border-2 border-espresso bg-white p-2 sm:p-3 flex flex-col justify-between h-full shadow-[2px_2px_0px_#241B16] hover:shadow-[3px_3px_0px_#241B16] hover:-translate-y-0.5 transition-all"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div>
          {/* ── Image Container (Dominates the card) ─────────────────────────── */}
          <Link
            to={`/product/${product.slug}`}
            className="relative block aspect-[4/5] w-full overflow-hidden rounded-xl border border-espresso/30 bg-[#F7EFE5]"
          >
            {/* Primary Image */}
            <img
              src={img1}
              alt={product.name}
              loading="lazy"
              className={`absolute inset-0 h-full w-full object-cover transition-all duration-300 ${
                hovered ? 'scale-105 opacity-0' : 'scale-100 opacity-100'
              }`}
            />

            {/* Hover Secondary Image */}
            {img2 && (
              <img
                src={img2}
                alt={`${product.name} alternate view`}
                loading="lazy"
                className={`absolute inset-0 h-full w-full object-cover transition-all duration-300 ${
                  hovered ? 'scale-105 opacity-100' : 'scale-100 opacity-0'
                }`}
              />
            )}

            {/* Subtle Badge */}
            {product.badge && (
              <div className="absolute top-2 left-2 z-10">
                <span
                  className={`inline-block px-2 py-0.5 rounded-full border border-espresso text-[9px] font-black uppercase tracking-wider ${
                    product.badge === 'NEW DROP'
                      ? 'bg-butter text-espresso'
                      : product.badge === 'LIMITED'
                      ? 'bg-coral text-white'
                      : 'bg-teal text-white'
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
              className="absolute top-2 right-2 z-10 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full border border-espresso bg-white/95 shadow-[1px_1px_0px_#241B16] active:scale-95 transition-transform"
            >
              <Heart
                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors ${
                  wished ? 'text-coral fill-[#D96B5F]' : 'text-espresso'
                }`}
                strokeWidth={2.5}
              />
            </button>

            {/* Quick Add Button on Desktop Hover / Clean Touch on Mobile */}
            <div className="absolute inset-x-2 bottom-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block">
              <button
                onClick={handleQuickAdd}
                className={`w-full py-1.5 px-2 rounded-lg border-2 border-espresso font-bold text-xs uppercase tracking-wider shadow-[2px_2px_0px_#241B16] flex items-center justify-center gap-1 transition-all ${
                  justAdded
                    ? 'bg-sage text-espresso'
                    : 'bg-butter hover:bg-[#fae082] text-espresso'
                }`}
              >
                {justAdded ? (
                  <>
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    <span>ADDED</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>QUICK ADD</span>
                  </>
                )}
              </button>
            </div>
          </Link>

          {/* ── Product Info ───────────────────────────── */}
          <div className="mt-2.5 px-0.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-espresso/60 block mb-0.5">
              {product.category}
            </span>
            <Link to={`/product/${product.slug}`}>
              <h3 className="font-display font-bold text-xs sm:text-sm text-espresso line-clamp-1 group-hover:text-coral transition-colors">
                {product.name}
              </h3>
            </Link>
          </div>
        </div>

        {/* ── Price Row ───────────────────────────── */}
        <div className="mt-2 pt-2 border-t border-espresso/10 flex items-center justify-between px-0.5">
          <span className="font-display font-black text-sm sm:text-base text-espresso">
            {formatPrice(product.price)}
          </span>
          <Link
            to={`/product/${product.slug}`}
            className="text-[11px] font-bold text-coral hover:underline"
          >
            Details
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
