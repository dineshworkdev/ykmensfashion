import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ArrowRight, Plus, Minus, Check, Heart, ChevronDown, X, Sparkles, ShieldCheck } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'
import { useWishlist } from '../context/WishlistContext.jsx'
import ProductCard from '../components/product/ProductCard.jsx'
import { getProductBySlug, products } from '../data/products.js'
import { formatPrice } from '../lib/format.js'
import { DoodleStar, EditorialMark } from '../components/common/Doodles.jsx'

export default function Product() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const product = getProductBySlug(slug)

  const [mainImgIdx, setMainImgIdx] = useState(0)
  const [selectedSize, setSelectedSize] = useState('M')
  const [selectedColor, setSelectedColor] = useState(product ? product.colors[0] : '')
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const [showSizeGuide, setShowSizeGuide] = useState(false)
  const [openAccordion, setOpenAccordion] = useState('fabric')

  const { addToCart } = useCart()
  const { isWished, toggle } = useWishlist()
  const wished = product ? isWished(product.id) : false

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center bg-[#FFF1DF]">
        <Search className="w-12 h-12 text-espresso/30 mb-4" />
        <h2 className="font-display font-bold text-2xl text-espresso mb-2">
          Product Not Found
        </h2>
        <p className="text-xs font-normal text-espresso/60 mb-6">
          This piece may have sold out or the URL has changed.
        </p>
        <Link to="/shop" className="retro-btn-primary inline-flex items-center gap-2">
          <span>BACK TO SHOP</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    )
  }

  const related = products
    .filter((p) => p.collection === product.collection && p.id !== product.id)
    .slice(0, 4)

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        slug: product.slug,
        image: product.images[0],
        selectedSize,
        selectedColor: selectedColor || product.colors[0],
      })
    }
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const handleBuyNow = () => {
    handleAddToCart()
    navigate('/cart')
  }

  return (
    <div className="bg-[#FFF1DF] min-h-screen text-espresso">
      {/* ── 1. Clean Breadcrumb ────────────────────────────────────── */}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 pt-6 pb-4">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-espresso/50 flex-wrap">
          <Link to="/" className="hover:text-espresso transition-colors">HOME</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-espresso transition-colors">SHOP</Link>
          <span>/</span>
          <Link
            to={`/collection/${product.collection.toLowerCase()}`}
            className="hover:text-espresso transition-colors"
          >
            {product.collection}
          </Link>
          <span>/</span>
          <span className="text-espresso font-semibold truncate max-w-[200px] sm:max-w-none">
            {product.name}
          </span>
        </nav>
      </div>

      {/* ── 2. Product Showcase Layout ─────────────────────────────── */}
      <section className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 pb-16 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* ── Left Column: High-Res Image Gallery (7 cols) ── */}
          <div className="lg:col-span-7 flex flex-col gap-3.5">
            {/* Main Stage Image Frame */}
            <div className="relative bg-white rounded-[5px] border border-espresso/15 p-2 sm:p-2.5 shadow-[0_4px_20px_rgba(42,32,24,0.06)] overflow-hidden">
              <div className="relative aspect-[4/5] w-full rounded-[4px] overflow-hidden bg-[#F4EDE4] group">
                <img
                  src={product.images[mainImgIdx] || product.images[0]}
                  alt={product.name}
                  className="h-full w-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.025]"
                />

                {/* Subtle Archival Badge */}
                {product.badge && (
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-2.5 py-1 rounded-[3px] border border-espresso/20 bg-white/95 text-[10px] font-bold uppercase tracking-[0.14em] text-espresso shadow-xs backdrop-blur-xs">
                      {product.badge}
                    </span>
                  </div>
                )}

                {/* Subtle Atelier Spec Stamp */}
                <div className="absolute bottom-3 right-3 hidden sm:block">
                  <div className="px-2.5 py-1 rounded-[3px] border border-espresso/15 bg-white/90 backdrop-blur-xs text-[10px] font-mono uppercase tracking-wider text-espresso">
                    240 GSM COMBD COTTON
                  </div>
                </div>
              </div>
            </div>

            {/* Thumbnail Row */}
            {product.images.length > 1 && (
              <div className="flex gap-2.5">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setMainImgIdx(idx)}
                    className={`relative aspect-square w-20 sm:w-24 rounded-[4px] border overflow-hidden transition-all duration-300 ${
                      mainImgIdx === idx
                        ? 'border-espresso ring-1 ring-espresso shadow-xs'
                        : 'border-espresso/20 opacity-70 hover:opacity-100 hover:border-espresso/40'
                    }`}
                  >
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Right Column: Retail Buy Box & Specs (5 cols) ── */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-white rounded-[5px] border border-espresso/15 p-6 sm:p-8 shadow-[0_4px_24px_rgba(42,32,24,0.05)]">
              {/* Collection & Season metadata */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-coral">
                  {product.collection} COLLECTION
                </span>
                <span className="text-[10px] font-mono uppercase text-espresso/50">
                  DROP 04 • MUMBAI
                </span>
              </div>

              {/* Product Title */}
              <h1 className="font-display font-bold text-2xl sm:text-3xl text-espresso mb-3 leading-snug">
                {product.name}
              </h1>

              {/* Price & Availability Row */}
              <div className="flex items-baseline gap-3 mb-6 pb-4 border-b border-espresso/10">
                <span className="font-sans font-bold text-2xl sm:text-3xl text-espresso">
                  {formatPrice(product.price)}
                </span>
                <span className="text-xs font-normal text-espresso/40 line-through">
                  {formatPrice(Math.round(product.price * 1.35))}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal px-2 py-0.5 rounded-[3px] border border-teal/30 bg-teal/5">
                  IN STOCK • SHIPS IN 24H
                </span>
              </div>

              {/* Product Description */}
              <p className="font-sans text-xs sm:text-sm text-espresso/75 leading-relaxed font-normal mb-6">
                {product.description}
              </p>

              {/* Color Selector */}
              {product.colors && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-espresso">
                      COLOR: <span className="font-normal text-espresso/70">{selectedColor}</span>
                    </span>
                  </div>
                  <div className="flex gap-2">
                    {product.colors.map((color, idx) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-[3px] border text-xs font-semibold transition-all duration-200 ${
                          selectedColor === color
                            ? 'border-espresso bg-espresso text-cream'
                            : 'border-espresso/20 bg-white text-espresso hover:border-espresso/40'
                        }`}
                      >
                        <span
                          className="h-3 w-3 rounded-full border border-espresso/30"
                          style={{ backgroundColor: product.colorHex ? product.colorHex[idx] : '#FFF1DF' }}
                        />
                        <span>{color}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-espresso">
                    SELECT SIZE (MEN'S BOXY FIT):
                  </span>
                  <button
                    onClick={() => setShowSizeGuide(true)}
                    className="text-[11px] font-bold text-coral underline underline-offset-2 hover:text-espresso transition-colors"
                  >
                    SIZE GUIDE ?
                  </button>
                </div>
                <div className="grid grid-cols-6 gap-1.5 sm:gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 rounded-[3px] font-sans font-bold text-xs uppercase tracking-wider transition-all duration-200 ${
                        selectedSize === size
                          ? 'border border-espresso bg-espresso text-cream shadow-xs'
                          : 'border border-espresso/20 bg-white text-espresso hover:border-espresso/50'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stepper & Action CTAs */}
              <div className="flex flex-col gap-2.5 mb-6">
                <div className="flex items-center gap-2.5">
                  {/* Quantity Stepper */}
                  <div className="flex items-center rounded-[3px] border border-espresso/30 bg-white h-11 shrink-0 overflow-hidden">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-3 h-full flex items-center justify-center text-espresso hover:bg-[#F9F3EA] transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 font-sans font-bold text-xs text-espresso">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="px-3 h-full flex items-center justify-center text-espresso hover:bg-[#F9F3EA] transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Primary Add to Bag */}
                  <button
                    onClick={handleAddToCart}
                    className={`flex-1 h-11 retro-btn-primary flex items-center justify-center gap-2 ${
                      added ? '!bg-sage !border-sage !text-espresso' : ''
                    }`}
                  >
                    {added ? (
                      <>
                        <Check className="w-4 h-4 stroke-[2.5]" />
                        <span>ADDED TO BAG</span>
                      </>
                    ) : (
                      <>
                        <span>ADD TO BAG</span>
                        <span>•</span>
                        <span>{formatPrice(product.price * quantity)}</span>
                      </>
                    )}
                  </button>

                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggle(product.id)}
                    aria-label="Save to Wishlist"
                    className={`flex h-11 w-11 items-center justify-center rounded-[3px] border border-espresso/25 transition-all duration-200 active:scale-95 shrink-0 ${
                      wished ? 'bg-coral border-coral text-white' : 'bg-white text-espresso hover:border-espresso hover:bg-[#FAF6EE]'
                    }`}
                  >
                    <Heart
                      className={`w-4 h-4 ${wished ? 'fill-white text-white' : 'text-espresso'}`}
                      strokeWidth={1.8}
                    />
                  </button>
                </div>

                {/* Instant Buy Now Button */}
                <button
                  onClick={handleBuyNow}
                  className="w-full h-10 rounded-[3px] border border-espresso/30 bg-white text-espresso font-sans font-bold text-xs uppercase tracking-[0.14em] hover:bg-[#F9F3EA] hover:border-espresso transition-all duration-200"
                >
                  BUY NOW WITH 1-CLICK
                </button>
              </div>

              {/* Guarantees Box */}
              <div className="p-3.5 rounded-[4px] border border-espresso/15 bg-[#FFF1DF]/60 flex flex-col gap-2 text-xs text-espresso/80">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-coral shrink-0" />
                  <span>Free express shipping nationwide on orders over ₹1,999</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal shrink-0" />
                  <span>Hassle-free 15-day exchange & return policy</span>
                </div>
                <div className="flex items-center gap-2">
                  <DoodleStar className="w-3.5 h-3.5 text-burnt-orange shrink-0" />
                  <span>100% Pre-shrunk 240 GSM combed cotton with zero bleed</span>
                </div>
              </div>
            </div>

            {/* ── Accordion Specifications ── */}
            <div className="bg-white rounded-[5px] border border-espresso/15 p-4 shadow-[0_4px_20px_rgba(42,32,24,0.04)]">
              {/* Accordion 1: Fabric & Care */}
              <div className="border-b border-espresso/10 pb-3">
                <button
                  onClick={() =>
                    setOpenAccordion(openAccordion === 'fabric' ? '' : 'fabric')
                  }
                  className="w-full flex items-center justify-between text-left py-1.5 font-display font-bold text-xs sm:text-sm text-espresso uppercase tracking-wider"
                >
                  <span>FABRIC & CRAFT SPECIFICATIONS</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      openAccordion === 'fabric' ? 'rotate-180 text-coral' : ''
                    }`}
                  />
                </button>
                {openAccordion === 'fabric' && (
                  <div className="pt-2 text-xs text-espresso/70 space-y-1.5 leading-relaxed font-normal">
                    <p>• 240 GSM 100% Combed Long-Staple Organic Cotton.</p>
                    <p>• Enzyme stone-washed for authentic vintage hand-feel.</p>
                    <p>• 1.25" heavy reinforced ribbed collar that never sags.</p>
                    <p>• Machine wash cold inside out, hang dry in shade.</p>
                  </div>
                )}
              </div>

              {/* Accordion 2: Sizing & Fit */}
              <div className="border-b border-espresso/10 py-3">
                <button
                  onClick={() =>
                    setOpenAccordion(openAccordion === 'fit' ? '' : 'fit')
                  }
                  className="w-full flex items-center justify-between text-left py-1.5 font-display font-bold text-xs sm:text-sm text-espresso uppercase tracking-wider"
                >
                  <span>FIT & SILHOUETTE GUIDE</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      openAccordion === 'fit' ? 'rotate-180 text-coral' : ''
                    }`}
                  />
                </button>
                {openAccordion === 'fit' && (
                  <div className="pt-2 text-xs text-espresso/70 space-y-1.5 leading-relaxed font-normal">
                    <p>• Cut: Boxy oversized with dropped shoulder seams.</p>
                    <p>• True to streetwear size — stick to regular size for intended drape.</p>
                    <p>• Male model is 6'1" wearing size L.</p>
                  </div>
                )}
              </div>

              {/* Accordion 3: Shipping */}
              <div className="pt-3">
                <button
                  onClick={() =>
                    setOpenAccordion(openAccordion === 'shipping' ? '' : 'shipping')
                  }
                  className="w-full flex items-center justify-between text-left py-1.5 font-display font-bold text-xs sm:text-sm text-espresso uppercase tracking-wider"
                >
                  <span>SHIPPING & RETURNS</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      openAccordion === 'shipping' ? 'rotate-180 text-coral' : ''
                    }`}
                  />
                </button>
                {openAccordion === 'shipping' && (
                  <div className="pt-2 text-xs text-espresso/70 space-y-1.5 leading-relaxed font-normal">
                    <p>• Dispatched within 24 hours from Mumbai.</p>
                    <p>• Delivered in 3–5 business days nationwide via BlueDart/Delhivery.</p>
                    <p>• 15-day complimentary exchanges for size swaps.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Related Pieces ──────────────────────────────── */}
      {related.length > 0 && (
        <section className="border-t border-espresso/15 bg-[#F9F3EA] py-14 sm:py-20">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
            <div className="flex items-center justify-between mb-8 pb-3 border-b border-espresso/10">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-coral">
                  MORE FROM {product.collection}
                </span>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-espresso">
                  You Might Also Like
                </h3>
              </div>
              <Link to="/shop" className="text-xs font-bold uppercase tracking-wider text-espresso hover:text-coral flex items-center gap-1">
                <span>VIEW ALL</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {related.map((item, idx) => (
                <ProductCard key={item.id} product={item} index={idx} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 4. Size Guide Modal ──────────────────────────────── */}
      <AnimatePresence>
        {showSizeGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-espresso/60 backdrop-blur-xs"
              onClick={() => setShowSizeGuide(false)}
            />
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              className="relative z-10 w-full max-w-lg rounded-[6px] border border-espresso/20 bg-white p-6 sm:p-8 shadow-[0_20px_50px_rgba(42,32,24,0.18)]"
            >
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-espresso/15">
                <div>
                  <h3 className="font-display font-bold text-base sm:text-lg text-espresso uppercase tracking-wider">
                    MEN'S SIZING CHART (INCHES)
                  </h3>
                  <span className="text-xs text-espresso/60 font-normal">
                    Measurements taken flat across garment
                  </span>
                </div>
                <button
                  onClick={() => setShowSizeGuide(false)}
                  className="h-7 w-7 rounded-[3px] border border-espresso/20 text-espresso flex items-center justify-center hover:bg-espresso hover:text-white transition-colors"
                  aria-label="Close size guide"
                >
                  <X className="w-4 h-4 stroke-[2]" />
                </button>
              </div>

              <div className="overflow-x-auto mb-6">
                <table className="w-full text-left text-xs text-espresso border-collapse">
                  <thead>
                    <tr className="bg-[#F9F3EA] border-b border-espresso/15 text-[11px] font-bold uppercase tracking-wider">
                      <th className="p-2.5">SIZE</th>
                      <th className="p-2.5">CHEST</th>
                      <th className="p-2.5">LENGTH</th>
                      <th className="p-2.5">SHOULDER</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { size: 'XS', chest: '40"', length: '27"', shoulder: '19"' },
                      { size: 'S',  chest: '42"', length: '28"', shoulder: '20"' },
                      { size: 'M',  chest: '44"', length: '29"', shoulder: '21"' },
                      { size: 'L',  chest: '46"', length: '30"', shoulder: '22"' },
                      { size: 'XL', chest: '48"', length: '31"', shoulder: '23"' },
                      { size: 'XXL',chest: '50"', length: '32"', shoulder: '24"' },
                    ].map((row, i) => (
                      <tr
                        key={row.size}
                        className={`border-b border-espresso/10 ${
                          i % 2 === 0 ? 'bg-white' : 'bg-[#FAF6EE]'
                        }`}
                      >
                        <td className="p-2.5 font-bold text-coral">{row.size}</td>
                        <td className="p-2.5 font-medium">{row.chest}</td>
                        <td className="p-2.5 font-medium">{row.length}</td>
                        <td className="p-2.5 font-medium">{row.shoulder}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <button
                onClick={() => setShowSizeGuide(false)}
                className="w-full retro-btn-primary py-2.5"
              >
                CLOSE GUIDE
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
