import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ShoppingBag, Sparkles, Plus, Minus, Trash2, ArrowLeft, ArrowRight, ShieldCheck, Check } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'
import { formatPrice } from '../lib/format.js'
import { DoodleStar } from '../components/common/Doodles.jsx'

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
    <div className="bg-[#FFF1DF] min-h-screen py-10 sm:py-16 text-espresso">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        {/* ── Cart Header ─────────────────────────────────── */}
        <div className="mb-8 sm:mb-12 pb-4 border-b border-espresso/15">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[2px] border border-espresso/20 bg-white text-[10px] font-bold uppercase tracking-[0.16em] text-espresso mb-2">
            <ShoppingBag className="w-3 h-3 text-coral" />
            MEN'S SHOPPING BAG
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-5xl text-espresso tracking-tight">
            YOUR BAG <span className="font-sans text-coral font-medium">({totalQty})</span>
          </h1>
        </div>

        {cart.length === 0 ? (
          /* Empty Bag State */
          <div className="bg-white rounded-sm border border-espresso/20 p-10 sm:p-16 text-center max-w-lg mx-auto shadow-sm">
            <ShoppingBag className="w-12 h-12 text-espresso/30 mx-auto mb-4" />
            <h2 className="font-display font-bold text-xl sm:text-2xl text-espresso mb-2">
              Your Bag is Currently Empty
            </h2>
            <p className="font-sans text-xs sm:text-sm text-espresso/60 mb-6 font-normal">
              You haven't added any heavyweight blanks or limited graphic pieces yet.
            </p>
            <Link to="/shop" className="retro-btn-primary inline-flex items-center gap-2">
              <span>EXPLORE THE COLLECTION</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* ── Left Column: Line Items (7 cols) ── */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              {/* Free Shipping Alert Bar */}
              <div className="bg-white rounded-[5px] border border-espresso/15 p-4 shadow-[0_2px_10px_rgba(42,32,24,0.03)]">
                <div className="flex items-center justify-between text-xs font-semibold mb-2">
                  <span className="text-espresso flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-teal" />
                    {qualifiesForFreeShipping
                      ? 'You have unlocked Free Express Shipping'
                      : `Add ${formatPrice(freeShippingThreshold - totalPrice)} more for Free Shipping`}
                  </span>
                  <span className="font-bold text-coral">
                    {qualifiesForFreeShipping ? 'FREE' : '₹99'}
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-[#F4EDE4] overflow-hidden">
                  <div
                    className="h-full bg-teal transition-all duration-500 rounded-full"
                    style={{
                      width: `${Math.min(100, (totalPrice / freeShippingThreshold) * 100)}%`,
                    }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="flex flex-col gap-3">
                <AnimatePresence>
                  {cart.map((item) => (
                    <motion.div
                      key={item.key}
                      layout
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      className="bg-white rounded-[5px] border border-espresso/15 p-4 sm:p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between shadow-[0_2px_12px_rgba(42,32,24,0.04)]"
                    >
                      {/* Product Thumbnail & Meta */}
                      <div className="flex items-center gap-4 min-w-0">
                        <Link
                          to={`/product/${item.slug}`}
                          className="relative aspect-[3/4] w-20 sm:w-22 rounded-[3px] border border-espresso/15 overflow-hidden bg-[#F4EDE4] shrink-0"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </Link>

                        <div className="min-w-0">
                          <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-espresso/50 block mb-1">
                            SIZE: {item.selectedSize} • {item.selectedColor}
                          </span>
                          <Link
                            to={`/product/${item.slug}`}
                            className="font-display font-medium text-sm sm:text-base text-espresso line-clamp-1 hover:text-coral transition-colors"
                          >
                            {item.name}
                          </Link>
                          <span className="font-sans font-bold text-sm text-espresso block mt-1">
                            {formatPrice(item.price)}
                          </span>
                        </div>
                      </div>

                      {/* Quantity Stepper & Price */}
                      <div className="flex items-center justify-between w-full sm:w-auto gap-4 pt-3 sm:pt-0 border-t sm:border-0 border-espresso/10">
                        <div className="flex items-center rounded-[3px] border border-espresso/25 bg-white overflow-hidden">
                          <button
                            onClick={() => decrement(item.key)}
                            className="p-1.5 text-espresso hover:bg-[#F9F3EA] transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 py-0.5 font-sans font-bold text-xs text-espresso">
                            {item.qty}
                          </span>
                          <button
                            onClick={() => increment(item.key)}
                            className="p-1.5 text-espresso hover:bg-[#F9F3EA] transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="text-right">
                          <span className="font-sans font-bold text-sm text-espresso block">
                            {formatPrice(item.price * item.qty)}
                          </span>
                          <button
                            onClick={() => removeItem(item.key)}
                            className="text-[11px] font-semibold text-coral hover:underline inline-flex items-center gap-1 mt-0.5"
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
                  className="text-xs font-bold uppercase tracking-wider text-espresso hover:text-coral flex items-center gap-1.5 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>CONTINUE SHOPPING</span>
                </Link>
              </div>
            </div>

            {/* ── Right Column: Order Summary (5 cols) ── */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-[5px] border border-espresso/15 p-6 sm:p-8 shadow-[0_4px_24px_rgba(42,32,24,0.06)] sticky top-24">
                <h3 className="font-display font-bold text-lg sm:text-xl text-espresso mb-5 pb-3 border-b border-espresso/15">
                  ORDER SUMMARY
                </h3>

                {/* Subtotals Breakdown */}
                <div className="flex flex-col gap-3 pb-5 border-b border-espresso/15 mb-5 text-xs sm:text-sm text-espresso">
                  <div className="flex justify-between">
                    <span className="text-espresso/70">Subtotal ({totalQty} items)</span>
                    <span className="font-semibold">{formatPrice(totalPrice)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-espresso/70">Express Delivery</span>
                    <span className="font-semibold">
                      {qualifiesForFreeShipping ? (
                        <span className="text-teal uppercase font-bold">FREE</span>
                      ) : (
                        formatPrice(shippingAmount)
                      )}
                    </span>
                  </div>

                  {promoApplied && (
                    <div className="flex justify-between text-teal">
                      <span>Promo Discount (10%)</span>
                      <span className="font-bold">-{formatPrice(discountAmount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-baseline pt-4 border-t border-espresso/15 text-base sm:text-lg font-bold">
                    <span>ESTIMATED TOTAL</span>
                    <span className="text-xl sm:text-2xl text-coral font-sans">
                      {formatPrice(finalTotal)}
                    </span>
                  </div>
                </div>

                {/* Promo Code Input */}
                <form onSubmit={handleApplyPromo} className="mb-5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-espresso/60 block mb-1.5">
                    HAVE A VOUCHER CODE?
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="e.g. DROP04"
                      className="flex-1 px-3 py-2 rounded-[3px] border border-espresso/25 bg-white text-xs font-bold uppercase text-espresso placeholder-espresso/40 focus:outline-none focus:border-espresso transition-colors"
                    />
                    <button type="submit" className="retro-btn-outline py-2 px-3 text-xs font-bold">
                      APPLY
                    </button>
                  </div>
                  {promoApplied && (
                    <p className="text-xs font-bold text-teal mt-1.5 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>Coupon DROP04 applied (10% Off)!</span>
                    </p>
                  )}
                  {promoError && (
                    <p className="text-xs font-semibold text-coral mt-1.5">
                      {promoError}
                    </p>
                  )}
                </form>

                {/* Checkout CTA */}
                <Link
                  to="/checkout"
                  className="w-full retro-btn-primary py-3 mb-4 text-center flex items-center justify-center gap-2"
                >
                  <span>PROCEED TO CHECKOUT</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <p className="text-[10px] font-medium text-center text-espresso/60 uppercase tracking-widest flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal" />
                  <span>100% SECURE ENCRYPTED CHECKOUT</span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
