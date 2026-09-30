import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ArrowRight, Plus, Minus, Check, Heart, ChevronDown, X, Sparkles, ShieldCheck } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'
import { useWishlist } from '../context/WishlistContext.jsx'
import ProductCard from '../components/product/ProductCard.jsx'
import { getProductBySlug, products } from '../data/products.js'
import { formatPrice } from '../lib/format.js'
import { DoodleStar, AnimatedSketchArrow, RetroStampBadge, WavyUnderline } from '../components/common/Doodles.jsx'

export default function Product() {
  const { slug } = useParams()
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
        <Search className="w-16 h-16 text-espresso/40 mb-4" />
        <h2 className="font-display font-black text-3xl text-espresso mb-2">
          Piece Not Found In Archive
        </h2>
        <p className="text-sm font-medium text-espresso/70 mb-6">
          This piece might have sold out or the link has changed.
        </p>
        <Link to="/shop" className="retro-btn-primary inline-flex items-center gap-2">
          <span>BACK TO ATELIER SHOP</span>
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
    setTimeout(() => setAdded(false), 2200)
  }

  return (
    <div className="bg-[#FFF1DF] min-h-screen">
      {/* ── Breadcrumb ────────────────────────────────────── */}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 pt-6 pb-4">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-bold text-espresso/60 flex-wrap">
          <Link to="/" className="hover:text-espresso">HOME</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-espresso">SHOP</Link>
          <span>/</span>
          <Link
            to={`/collection/${product.collection.toLowerCase()}`}
            className="hover:text-espresso uppercase"
          >
            {product.collection}
          </Link>
          <span>/</span>
          <span className="text-espresso font-black truncate max-w-[200px] sm:max-w-none">
            {product.name}
          </span>
        </nav>
      </div>

      {/* ── Main Product Detail Section (Section 6: Clean cream/neutral + strong color accents) ── */}
      <section className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 pb-16 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* ── Left: Image Gallery (7 cols) ── */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Main Image Frame with Layered Retro Border */}
            <div className="retro-card bg-white p-3 sm:p-4 shadow-retro-xl relative overflow-hidden">
              <div className="relative aspect-[4/5] w-full rounded-2xl border-2 border-espresso overflow-hidden bg-cream-dark">
                <img
                  src={product.images[mainImgIdx] || product.images[0]}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />

                {/* Badge Overlay */}
                {product.badge && (
                  <div className="absolute top-3 left-3">
                    <span className="retro-pill bg-butter text-espresso shadow-retro">
                      <DoodleStar className="w-3 h-3" />
                      {product.badge}
                    </span>
                  </div>
                )}

                {/* Floating Stamp */}
                <div className="absolute bottom-3 right-3 hidden sm:block">
                  <div className="px-3 py-1.5 rounded-xl border-2 border-espresso bg-white/95 backdrop-blur-xs text-[10px] font-black uppercase text-espresso shadow-[2px_2px_0px_#241B16]">
                    240 GSM HEAVYWEIGHT
                  </div>
                </div>
              </div>
            </div>

            {/* Thumbnail Row */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setMainImgIdx(idx)}
                    className={`relative aspect-square w-20 sm:w-24 rounded-xl border-2 overflow-hidden transition-all ${
                      mainImgIdx === idx
                        ? 'border-espresso shadow-retro ring-2 ring-coral'
                        : 'border-espresso/40 opacity-70 hover:opacity-100 hover:border-espresso'
                    }`}
                  >
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Right: Product Info & Buy Box (5 cols) ── */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="retro-card bg-white p-6 sm:p-8 shadow-retro-lg">
              {/* Collection & Drop Tag */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-black uppercase tracking-wider text-coral">
                  {product.collection} COLLECTION
                </span>
                <span className="text-[11px] font-bold text-espresso/60 uppercase">
                  DROP 04 / ARCHIVE
                </span>
              </div>

              {/* Title */}
              <h1 className="font-display font-black text-3xl sm:text-4xl text-espresso mb-3 leading-tight">
                {product.name}
              </h1>

              {/* Price & Stock info */}
              <div className="flex items-baseline gap-3 mb-6 pb-4 border-b-2 border-dashed border-espresso/20">
                <span className="font-display font-black text-2xl sm:text-3xl text-espresso">
                  {formatPrice(product.price)}
                </span>
                <span className="text-xs font-bold text-espresso/50 line-through">
                  {formatPrice(Math.round(product.price * 1.35))}
                </span>
                <span className="text-[11px] font-black uppercase text-teal px-2 py-0.5 rounded-full border border-teal bg-teal/10">
                  IN STOCK • SHIPS IN 24H
                </span>
              </div>

              {/* Description */}
              <p className="font-sans text-sm text-espresso/80 font-medium leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Color Selector */}
              {product.colors && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-xs font-black uppercase tracking-wider text-espresso">
                      COLOR: <span className="font-normal text-espresso/80">{selectedColor}</span>
                    </span>
                  </div>
                  <div className="flex gap-2">
                    {product.colors.map((color, idx) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border-2 border-espresso text-xs font-bold transition-all ${
                          selectedColor === color
                            ? 'bg-butter shadow-[2px_2px_0px_#241B16]'
                            : 'bg-white hover:bg-cream-dark shadow-none'
                        }`}
                      >
                        <span
                          className="h-3.5 w-3.5 rounded-full border border-espresso"
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
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-black uppercase tracking-wider text-espresso">
                    SIZE (MEN'S BOXY FIT):
                  </span>
                  <button
                    onClick={() => setShowSizeGuide(true)}
                    className="text-xs font-black text-coral underline hover:text-espresso"
                  >
                    SIZE GUIDE ?
                  </button>
                </div>
                <div className="grid grid-cols-6 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 rounded-xl border-2 border-espresso font-bold text-xs uppercase tracking-wider transition-all ${
                        selectedSize === size
                          ? 'bg-coral text-white shadow-[2px_2px_0px_#241B16]'
                          : 'bg-white text-espresso hover:bg-butter shadow-none'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Stepper & Add to Bag */}
              <div className="flex items-center gap-3 mb-6">
                {/* Stepper with Lucide Icons */}
                <div className="flex items-center rounded-xl border-2 border-espresso bg-white shadow-retro shrink-0">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-3 font-black text-espresso hover:bg-cream-dark transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 font-display font-black text-sm text-espresso">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-3 font-black text-espresso hover:bg-cream-dark transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Primary Add to Bag */}
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 retro-btn-primary flex items-center justify-center gap-2 ${
                    added ? '!bg-sage text-espresso' : ''
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>ADDED TO BAG!</span>
                    </>
                  ) : (
                    <>
                      <span>ADD TO BAG</span>
                      <span>•</span>
                      <span>{formatPrice(product.price * quantity)}</span>
                    </>
                  )}
                </button>

                {/* Wishlist Button with Lucide Heart */}
                <button
                  onClick={() => toggle(product.id)}
                  aria-label="Save to Wishlist"
                  className={`flex h-12 w-12 items-center justify-center rounded-xl border-2 border-espresso shadow-retro transition-transform active:scale-95 shrink-0 ${
                    wished ? 'bg-coral text-white' : 'bg-white text-espresso hover:bg-butter'
                  }`}
                >
                  <Heart
                    className={`w-5 h-5 ${wished ? 'fill-white text-white' : 'text-espresso'}`}
                    strokeWidth={2.5}
                  />
                </button>
              </div>

              {/* Guarantees Box */}
              <div className="p-3.5 rounded-xl border-2 border-dashed border-espresso/30 bg-[#FFF1DF] flex flex-col gap-2 text-xs font-bold text-espresso/80">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-coral shrink-0" />
                  <span>Free express shipping on orders over ₹1,999</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal shrink-0" />
                  <span>Hassle-free 15-day exchange & return policy</span>
                </div>
                <div className="flex items-center gap-2">
                  <DoodleStar className="w-3.5 h-3.5 text-burnt-orange shrink-0" />
                  <span>100% Pre-shrunk cotton with no color bleeding</span>
                </div>
              </div>
            </div>

            {/* ── Accordion Specifications ── */}
            <div className="retro-card bg-white p-4 shadow-retro">
              {/* Accordion 1: Fabric & Care */}
              <div className="border-b-2 border-espresso/15 pb-3">
                <button
                  onClick={() =>
                    setOpenAccordion(openAccordion === 'fabric' ? '' : 'fabric')
                  }
                  className="w-full flex items-center justify-between text-left py-2 font-display font-bold text-sm text-espresso"
                >
                  <span>FABRIC & CRAFT SPECIFICATIONS</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      openAccordion === 'fabric' ? 'rotate-180 text-coral' : ''
                    }`}
                  />
                </button>
                {openAccordion === 'fabric' && (
                  <div className="pt-2 text-xs text-espresso/80 font-medium space-y-1.5 leading-relaxed">
                    <p>• 240 GSM 100% Combed Organic Cotton.</p>
                    <p>• Enzyme stone-washed for authentic vintage hand-feel.</p>
                    <p>• 1.25" heavy ribbed crewneck collar that never sags.</p>
                    <p>• Machine wash cold inside out, hang dry in shade.</p>
                  </div>
                )}
              </div>

              {/* Accordion 2: Sizing & Fit */}
              <div className="border-b-2 border-espresso/15 py-3">
                <button
                  onClick={() =>
                    setOpenAccordion(openAccordion === 'fit' ? '' : 'fit')
                  }
                  className="w-full flex items-center justify-between text-left py-2 font-display font-bold text-sm text-espresso"
                >
                  <span>FIT & SILHOUETTE GUIDE</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      openAccordion === 'fit' ? 'rotate-180 text-coral' : ''
                    }`}
                  />
                </button>
                {openAccordion === 'fit' && (
                  <div className="pt-2 text-xs text-espresso/80 font-medium space-y-1.5 leading-relaxed">
                    <p>• Cut: Boxy oversized with dropped shoulder seams.</p>
                    <p>• True to streetwear size — stick to your regular size for intended drape.</p>
                    <p>• Model is 6'1" wearing size L.</p>
                  </div>
                )}
              </div>

              {/* Accordion 3: Shipping */}
              <div className="pt-3">
                <button
                  onClick={() =>
                    setOpenAccordion(openAccordion === 'shipping' ? '' : 'shipping')
                  }
                  className="w-full flex items-center justify-between text-left py-2 font-display font-bold text-sm text-espresso"
                >
                  <span>SHIPPING & RETURNS</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      openAccordion === 'shipping' ? 'rotate-180 text-coral' : ''
                    }`}
                  />
                </button>
                {openAccordion === 'shipping' && (
                  <div className="pt-2 text-xs text-espresso/80 font-medium space-y-1.5 leading-relaxed">
                    <p>• Dispatched within 24–48 hours from Mumbai Atelier.</p>
                    <p>• Delivered in 3–5 business days nationwide via BlueDart/Delhivery.</p>
                    <p>• 15-day exchanges for size swaps at zero extra cost.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Related Products ──────────────────────────────── */}
      {related.length > 0 && (
        <section className="border-t-3 border-espresso bg-[#FDF6EE] py-14 sm:py-20">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-coral">
                  MORE FROM {product.collection}
                </span>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-espresso">
                  You Might Also Like
                </h3>
              </div>
              <Link to="/shop" className="retro-btn-outline text-xs flex items-center gap-1.5">
                <span>VIEW ALL</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((item, idx) => (
                <ProductCard key={item.id} product={item} index={idx} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Size Guide Modal ──────────────────────────────── */}
      <AnimatePresence>
        {showSizeGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-espresso/50 backdrop-blur-xs"
              onClick={() => setShowSizeGuide(false)}
            />
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="relative z-10 w-full max-w-lg rounded-3xl border-3 border-espresso bg-white p-6 sm:p-8 shadow-retro-xl"
            >
              <div className="flex items-center justify-between pb-4 mb-4 border-b-2 border-espresso">
                <div>
                  <h3 className="font-display font-black text-xl text-espresso">
                    MEN'S STREETWEAR SIZING CHART (INCHES)
                  </h3>
                  <span className="text-xs font-bold text-espresso/60">
                    Measurements taken flat across garment
                  </span>
                </div>
                <button
                  onClick={() => setShowSizeGuide(false)}
                  className="h-8 w-8 rounded-lg border-2 border-espresso bg-butter font-black text-sm flex items-center justify-center hover:bg-coral hover:text-white transition-colors"
                  aria-label="Close size guide"
                >
                  <X className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>

              <div className="overflow-x-auto mb-6">
                <table className="w-full text-left text-xs font-bold text-espresso border-collapse">
                  <thead>
                    <tr className="bg-cream-dark border-b-2 border-espresso">
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
                        className={`border-b border-espresso/15 ${
                          i % 2 === 0 ? 'bg-white' : 'bg-cream-card'
                        }`}
                      >
                        <td className="p-2.5 font-black text-coral">{row.size}</td>
                        <td className="p-2.5">{row.chest}</td>
                        <td className="p-2.5">{row.length}</td>
                        <td className="p-2.5">{row.shoulder}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <button
                onClick={() => setShowSizeGuide(false)}
                className="w-full retro-btn-secondary py-2.5"
              >
                GOT IT, CLOSE GUIDE
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
