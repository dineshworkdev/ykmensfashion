import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, Plus, Check, X, ArrowRight } from 'lucide-react'
import { useWishlist } from '../../context/WishlistContext.jsx'
import { useCart } from '../../context/CartContext.jsx'
import { formatPrice } from '../../lib/format.js'
import { DoodleStar } from '../common/Doodles.jsx'

export default function ProductCard({ product, index = 0 }) {
  const [hovered, setHovered] = useState(false)
  const [selectedQuickSize, setSelectedQuickSize] = useState('M')
  const [showQuickSizes, setShowQuickSizes] = useState(false)
  const [justAdded, setJustAdded] = useState(false)
  const { isWished, toggle } = useWishlist()
  const { addToCart } = useCart()
  const wished = isWished(product.id)

  const img1 = product.images[0]
  const img2 = product.images[1] || product.images[0]

  function handleQuickAdd(e, size) {
    e.preventDefault()
    e.stopPropagation()
    const sizeToAdd = size || selectedQuickSize
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      slug: product.slug,
      image: img1,
      selectedSize: sizeToAdd,
      selectedColor: product.colors[0],
    })
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1600)
    setShowQuickSizes(false)
  }

  function handleWishlist(e) {
    e.preventDefault()
    e.stopPropagation()
    toggle(product.id)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
      className="group"
    >
      <div
        className="retro-card bg-white p-3 flex flex-col justify-between h-full relative"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false)
          setShowQuickSizes(false)
        }}
      >
        <div>
          {/* ── Image Container ─────────────────────────── */}
          <Link
            to={`/product/${product.slug}`}
            className="relative block aspect-[4/5] w-full overflow-hidden rounded-xl border-2 border-espresso bg-cream-dark"
          >
            {/* Primary Image */}
            <img
              src={img1}
              alt={product.name}
              loading="lazy"
              className={`absolute inset-0 h-full w-full object-cover transition-all duration-500 ${
                hovered ? 'scale-105 opacity-0' : 'scale-100 opacity-100'
              }`}
            />

            {/* Hover Secondary Image */}
            {img2 && (
              <img
                src={img2}
                alt={`${product.name} on body`}
                loading="lazy"
                className={`absolute inset-0 h-full w-full object-cover transition-all duration-500 ${
                  hovered ? 'scale-105 opacity-100' : 'scale-100 opacity-0'
                }`}
              />
            )}

            {/* Badges */}
            <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
              {product.badge && (
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border-2 border-espresso text-[10px] font-black uppercase tracking-wider shadow-[2px_2px_0px_#2E221B] ${
                    product.badge === 'NEW DROP'
                      ? 'bg-butter text-espresso'
                      : product.badge === 'LIMITED'
                      ? 'bg-coral text-white'
                      : 'bg-teal text-white'
                  }`}
                >
                  <DoodleStar className="w-2.5 h-2.5" />
                  {product.badge}
                </span>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              onClick={handleWishlist}
              aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
              className="absolute top-2.5 right-2.5 z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-espresso bg-white shadow-[2px_2px_0px_#2E221B] hover:scale-110 active:scale-95 transition-transform"
            >
              <Heart
                className={`w-4 h-4 transition-colors ${
                  wished ? 'text-coral fill-[#D96B5F]' : 'text-espresso'
                }`}
                strokeWidth={2.5}
              />
            </button>

            {/* Quick Add Overlay */}
            <div
              className={`absolute inset-x-2 bottom-2 z-10 transition-all duration-300 ${
                hovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'
              }`}
            >
              {showQuickSizes ? (
                <div className="p-2 rounded-xl border-2 border-espresso bg-cream-card shadow-retro flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-[10px] font-black text-espresso px-1">
                    <span>SELECT SIZE:</span>
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        setShowQuickSizes(false)
                      }}
                      className="p-0.5 hover:text-coral transition-colors"
                      aria-label="Close size selector"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-6 gap-1">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={(e) => handleQuickAdd(e, s)}
                        className="py-1 rounded border border-espresso bg-white hover:bg-butter text-espresso font-bold text-[10px] transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setShowQuickSizes(true)
                  }}
                  className={`w-full py-2 px-3 rounded-xl border-2 border-espresso font-bold text-xs uppercase tracking-wider shadow-[2px_2px_0px_#2E221B] flex items-center justify-center gap-1.5 transition-all ${
                    justAdded
                      ? 'bg-sage text-espresso'
                      : 'bg-butter hover:bg-[#fae082] text-espresso'
                  }`}
                >
                  {justAdded ? (
                    <>
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      <span>ADDED TO BAG!</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>QUICK ADD</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </Link>

          {/* ── Product Info ───────────────────────────── */}
          <div className="mt-3 px-1">
            {/* Category tag & color dots */}
            <div className="flex items-center justify-between gap-1 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-espresso/70 bg-cream-dark px-2 py-0.5 rounded-md border border-espresso/20">
                {product.category}
              </span>
              {product.colorHex && (
                <div className="flex items-center gap-1">
                  {product.colorHex.map((hex, i) => (
                    <span
                      key={i}
                      className="h-3 w-3 rounded-full border border-espresso"
                      style={{ backgroundColor: hex }}
                      title={product.colors[i]}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Name */}
            <Link to={`/product/${product.slug}`}>
              <h3 className="font-display font-bold text-base text-espresso line-clamp-1 group-hover:text-coral transition-colors">
                {product.name}
              </h3>
            </Link>
          </div>
        </div>

        {/* Price & Arrow Footer */}
        <div className="mt-3 pt-2.5 border-t border-espresso/15 flex items-center justify-between px-1">
          <div className="flex items-baseline gap-1.5">
            <span className="font-display font-black text-lg text-espresso">
              {formatPrice(product.price)}
            </span>
            <span className="text-[11px] font-bold text-espresso/50 line-through">
              {formatPrice(Math.round(product.price * 1.35))}
            </span>
          </div>

          <Link
            to={`/product/${product.slug}`}
            className="flex items-center gap-1 text-xs font-black text-espresso group-hover:text-coral group-hover:translate-x-1 transition-all"
          >
            <span>VIEW</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
