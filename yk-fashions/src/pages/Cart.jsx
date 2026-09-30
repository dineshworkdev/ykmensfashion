import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ShoppingBag, Sparkles, Plus, Minus, Trash2, ArrowLeft, ArrowRight, ShieldCheck, Check } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'
import { formatPrice } from '../lib/format.js'
import { DoodleStar, AnimatedSketchArrow } from '../components/common/Doodles.jsx'

export default function Cart() {
  const { cart, removeItem, increment, decrement, totalQty, totalPrice } = useCart()
  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)
  const [promoError, setPromoError] = useState('')

  const freeShippingThreshold = 1999
  const qualifiesForFreeShipping = totalPrice >= freeShippingThreshold
  const shippingAmount = qualifiesForFreeShipping ? 0 : 99
  const discountAmount = promoApplied ? Math.round(totalPrice * 0.1) : 0
  const finalTotal = Math.max(0, totalPrice - discountAmount + shippingAmount)

  const handleApplyPromo = (e) => {
    e.preventDefault()
    if (promoCode.trim().toUpperCase() === 'DROP04' || promoCode.trim().toUpperCase() === 'RETRO10') {
      setPromoApplied(true)
      setPromoError('')
    } else {
      setPromoError('Invalid code. Try "DROP04" for 10% off.')
    }
  }

  return (
    <div className="bg-[#FFF1DF] min-h-screen py-10 sm:py-16">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        {/* ── Cart Header ─────────────────────────────────── */}
        <div className="mb-10">
          <span className="retro-pill bg-butter text-white mb-3">
            <ShoppingBag className="w-3.5 h-3.5" />
            MEN'S SHOPPING BAG
          </span>
          <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-espresso">
            YOUR BAG{' '}
            <span className="text-coral">({totalQty})</span>
          </h1>
        </div>

        {cart.length === 0 ? (
          /* Empty Bag State */
          <div className="retro-card bg-white p-10 sm:p-16 text-center max-w-xl mx-auto shadow-retro-xl">
            <ShoppingBag className="w-16 h-16 text-espresso/40 mx-auto mb-4" />
            <h2 className="font-display font-black text-2xl sm:text-3xl text-espresso mb-2">
              Your Bag is Currently Empty
            </h2>
            <p className="font-sans text-sm sm:text-base text-espresso/70 font-medium mb-8">
              Looks like you haven't added any heavyweight blanks or graphic prints yet.
            </p>
            <Link to="/shop" className="retro-btn-primary inline-flex items-center gap-2">
              <span>EXPLORE ATELIER COLLECTION</span>
              <AnimatedSketchArrow className="w-6 h-3 text-white" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* ── Left Column: Line Items (7 cols) ── */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              {/* Free Shipping Alert Bar (Teal Accent) */}
              <div className="retro-card bg-[#F0F7F6] border-2 border-[#4F8F87] p-4 shadow-retro">
                <div className="flex items-center justify-between text-xs font-bold mb-2">
                  <span className="text-espresso flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-teal" />
                    {qualifiesForFreeShipping
                      ? 'You unlocked Free Express Shipping!'
                      : `Add ${formatPrice(freeShippingThreshold - totalPrice)} more for Free Shipping`}
                  </span>
                  <span className="font-black text-coral">
                    {qualifiesForFreeShipping ? 'FREE' : '₹99'}
                  </span>
                </div>
                <div className="h-3 w-full rounded-full border border-espresso bg-white overflow-hidden">
                  <div
                    className="h-full bg-teal border-r border-espresso transition-all duration-500"
                    style={{
                      width: `${Math.min(100, (totalPrice / freeShippingThreshold) * 100)}%`,
                    }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="flex flex-col gap-4">
                <AnimatePresence>
                  {cart.map((item) => (
                    <motion.div
                      key={item.key}
                      layout
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="retro-card bg-white p-4 sm:p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between shadow-retro"
                    >
                      {/* Product Thumbnail */}
                      <div className="flex items-center gap-4 min-w-0">
                        <Link
                          to={`/product/${item.slug}`}
                          className="relative aspect-[3/4] w-20 sm:w-24 rounded-xl border-2 border-espresso overflow-hidden bg-cream-dark shrink-0"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </Link>

                        <div className="min-w-0">
                          <span className="text-[10px] font-black uppercase tracking-wider text-coral block mb-0.5">
                            SIZE: {item.selectedSize} • {item.selectedColor}
                          </span>
                          <Link
                            to={`/product/${item.slug}`}
                            className="font-display font-bold text-base sm:text-lg text-espresso line-clamp-1 hover:text-coral transition-colors"
                          >
                            {item.name}
                          </Link>
                          <span className="font-display font-black text-base text-espresso block mt-1">
                            {formatPrice(item.price)}
                          </span>
                        </div>
                      </div>

                      {/* Quantity Stepper & Remove */}
                      <div className="flex items-center justify-between w-full sm:w-auto gap-4 pt-3 sm:pt-0 border-t sm:border-0 border-espresso/15">
                        <div className="flex items-center rounded-xl border-2 border-espresso bg-[#FFF1DF] shadow-[2px_2px_0px_#241B16]">
                          <button
                            onClick={() => decrement(item.key)}
                            className="p-2 font-black text-espresso hover:bg-butter transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-3 py-1 font-display font-black text-xs text-espresso">
                            {item.qty}
                          </span>
                          <button
                            onClick={() => increment(item.key)}
                            className="p-2 font-black text-espresso hover:bg-butter transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="text-right">
                          <span className="font-display font-black text-sm text-espresso block">
                            {formatPrice(item.price * item.qty)}
                          </span>
                          <button
                            onClick={() => removeItem(item.key)}
                            className="text-[11px] font-bold text-coral hover:underline inline-flex items-center gap-1"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <div className="flex items-center justify-between pt-2">
                <Link
                  to="/shop"
                  className="text-xs font-black uppercase text-espresso hover:text-coral flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>CONTINUE SHOPPING</span>
                </Link>
              </div>
            </div>

            {/* ── Right Column: Order Summary (5 cols) ── */}
            <div className="lg:col-span-5">
              <div className="retro-card bg-white p-6 sm:p-8 shadow-retro-xl sticky top-28">
                <h3 className="font-display font-black text-2xl text-espresso mb-6 pb-3 border-b-2 border-dashed border-espresso/20">
                  ORDER SUMMARY
                </h3>

                {/* Subtotals */}
                <div className="flex flex-col gap-3 pb-6 border-b-2 border-espresso/15 mb-6 text-sm font-bold text-espresso">
                  <div className="flex justify-between">
                    <span className="text-espresso/70">Subtotal ({totalQty} items)</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-espresso/70">Express Delivery</span>
                    <span>{qualifiesForFreeShipping ? 'FREE' : formatPrice(shippingAmount)}</span>
                  </div>

                  {promoApplied && (
                    <div className="flex justify-between text-teal">
                      <span>Promo Discount (10%)</span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-baseline pt-4 border-t-2 border-espresso/15 text-lg font-black">
                    <span className="font-display">ESTIMATED TOTAL</span>
                    <span className="font-display text-2xl text-coral">
                      {formatPrice(finalTotal)}
                    </span>
                  </div>
                </div>

                {/* Promo Code Input */}
                <form onSubmit={handleApplyPromo} className="mb-6">
                  <label className="text-[11px] font-black uppercase tracking-wider text-espresso/60 block mb-1.5">
                    HAVE A VOUCHER CODE?
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="e.g. DROP04"
                      className="flex-1 px-3 py-2 rounded-xl border-2 border-espresso bg-[#FFF1DF] text-xs font-bold uppercase text-espresso placeholder-espresso/40 focus:outline-none focus:bg-white shadow-[2px_2px_0px_#241B16]"
                    />
                    <button type="submit" className="retro-btn-secondary py-2 px-4 text-xs">
                      APPLY
                    </button>
                  </div>
                  {promoApplied && (
                    <p className="text-xs font-bold text-teal mt-1.5 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      <span>Coupon DROP04 applied (10% Off)!</span>
                    </p>
                  )}
                  {promoError && (
                    <p className="text-xs font-bold text-coral mt-1.5">
                      {promoError}
                    </p>
                  )}
                </form>

                {/* Checkout CTA with Lucide Arrow */}
                <Link
                  to="/checkout"
                  className="w-full retro-btn-primary py-3.5 mb-3 text-center flex items-center justify-center gap-2"
                >
                  <span>PROCEED TO CHECKOUT</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <p className="text-[10px] font-bold text-center text-espresso/60 uppercase tracking-widest flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal" />
                  <span>100% SECURE CHECKOUT • ATELIER QUALITY GUARANTEE</span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
