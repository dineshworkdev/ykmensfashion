import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Package, Zap, CreditCard, Banknote, ShieldCheck, Check, Sparkles } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'
import { formatPrice } from '../lib/format.js'
import { DoodleStar, RetroStampBadge } from '../components/common/Doodles.jsx'

export default function Checkout() {
  const { cart, totalQty, totalPrice, clearCart } = useCart()

  const [activeStep, setActiveStep] = useState(1) // 1: Contact, 2: Delivery, 3: Payment, 4: Review
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderId, setOrderId] = useState('')

  // Form State
  const [form, setForm] = useState({
    email: 'alex.rivera@example.com',
    phone: '+91 98765 43210',
    firstName: 'Alex',
    lastName: 'Rivera',
    address: 'Flat 402, Lotus Residency, 14th Road',
    landmark: 'Opposite Bandra Post Office',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400050',
    paymentMethod: 'upi', // upi, card, cod
    upiId: 'alexrivera@okhdfcbank',
    cardNumber: '•••• •••• •••• 4242',
    cardExpiry: '12/28',
    cardCvv: '•••',
  })

  const freeShippingThreshold = 1999
  const shippingAmount = totalPrice >= freeShippingThreshold ? 0 : 99
  const finalTotal = totalPrice + shippingAmount

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handlePlaceOrder = (e) => {
    e.preventDefault()
    const generatedId = `YK-${Math.floor(100000 + Math.random() * 900000)}`
    setOrderId(generatedId)
    setOrderPlaced(true)
    clearCart()
  }

  // Order confirmation state
  if (orderPlaced) {
    return (
      <div className="bg-[#FFF1DF] min-h-screen py-16 sm:py-24 text-espresso">
        <div className="mx-auto max-w-xl px-4 sm:px-6">
          <div className="bg-white rounded-sm border border-espresso/20 p-8 sm:p-12 text-center shadow-md relative overflow-hidden">
            {/* Atelier Stamp */}
            <div className="flex justify-center mb-6">
              <RetroStampBadge className="w-20 h-20 text-forest" centerText="PAID" />
            </div>

            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[2px] border border-teal/30 bg-teal/10 text-teal text-[10px] font-bold uppercase tracking-[0.16em] mb-3">
              <Sparkles className="w-3 h-3" />
              ORDER CONFIRMED
            </span>

            <h1 className="font-display font-bold text-2xl sm:text-4xl text-espresso mb-3 tracking-tight">
              THANK YOU, {form.firstName.toUpperCase()}.
            </h1>

            <p className="font-sans text-xs sm:text-sm text-espresso/70 mb-8 max-w-md mx-auto leading-relaxed">
              Your pieces are being prepared for dispatch from our Mumbai atelier.
              A confirmation receipt and tracking link will be sent to <strong>{form.email}</strong>.
            </p>

            {/* Order Specs Box */}
            <div className="p-4 rounded-[2px] border border-espresso/15 bg-[#FFF1DF]/60 max-w-md mx-auto text-left mb-8 text-xs font-medium text-espresso">
              <div className="flex justify-between py-1.5 border-b border-espresso/10">
                <span className="text-espresso/60 uppercase">ORDER NUMBER</span>
                <span className="font-mono font-bold text-coral">#{orderId}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-espresso/10">
                <span className="text-espresso/60 uppercase">DESTINATION</span>
                <span>{form.city}, {form.state}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-espresso/10">
                <span className="text-espresso/60 uppercase">ESTIMATED DELIVERY</span>
                <span className="text-teal font-bold">3–5 Business Days</span>
              </div>
              <div className="flex justify-between py-1.5 font-bold">
                <span className="text-espresso/60 uppercase">TOTAL PAID</span>
                <span className="text-sm font-sans">{formatPrice(finalTotal)}</span>
              </div>
            </div>

            <Link to="/shop" className="retro-btn-primary inline-flex items-center gap-2">
              <span>EXPLORE MORE PIECES</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // If cart is empty and order wasn't placed
  if (cart.length === 0) {
    return (
      <div className="bg-[#FFF1DF] min-h-screen py-20 text-center px-4 text-espresso">
        <Package className="w-12 h-12 text-espresso/30 mx-auto mb-4" />
        <h2 className="font-display font-bold text-2xl text-espresso mb-2">
          Your bag is empty
        </h2>
        <p className="text-xs font-normal text-espresso/60 mb-6">
          Add pieces to your bag before proceeding to checkout.
        </p>
        <Link to="/shop" className="retro-btn-primary inline-flex items-center gap-2">
          <span>BROWSE CATALOGUE</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-[#FFF1DF] min-h-screen py-10 sm:py-16 text-espresso">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        {/* ── Checkout Header ─────────────────────────────── */}
        <div className="mb-8 pb-4 border-b border-espresso/15">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[2px] border border-espresso/20 bg-white text-[10px] font-bold uppercase tracking-[0.16em] text-espresso mb-2">
            <ShieldCheck className="w-3 h-3 text-teal" />
            DISPATCH CHECKOUT
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-5xl text-espresso tracking-tight">
            CHECKOUT
          </h1>
        </div>

        {/* ── 4-Step Indicator Bar ─────────────────────────── */}
        <div className="grid grid-cols-4 gap-2 max-w-2xl mb-8">
          {[
            { num: 1, label: 'CONTACT' },
            { num: 2, label: 'DELIVERY' },
            { num: 3, label: 'PAYMENT' },
            { num: 4, label: 'REVIEW' },
          ].map((s) => (
            <button
              key={s.num}
              onClick={() => setActiveStep(s.num)}
              className={`p-2 rounded-[2px] border text-center transition-all ${
                activeStep === s.num
                  ? 'border-espresso bg-espresso text-cream shadow-xs font-bold'
                  : activeStep > s.num
                  ? 'border-espresso/30 bg-white text-espresso font-semibold'
                  : 'border-espresso/15 bg-white/50 text-espresso/40'
              }`}
            >
              <div className="flex items-center justify-center gap-1">
                {activeStep > s.num && <Check className="w-3 h-3 stroke-[2.5] text-teal" />}
                <span className="text-[9px] uppercase tracking-wider block">
                  STEP 0{s.num}
                </span>
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider hidden sm:block">
                {s.label}
              </span>
            </button>
          ))}
        </div>

        {/* ── Form & Order Summary Layout ──────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left: Step Form Content (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-sm border border-espresso/20 p-6 sm:p-8 shadow-sm">
              {/* Step 1: Contact Details */}
              {activeStep === 1 && (
                <div>
                  <h3 className="font-display font-bold text-lg sm:text-xl text-espresso mb-4 pb-2 border-b border-espresso/15 flex items-center justify-between">
                    <span>1. CONTACT INFORMATION</span>
                    <span className="text-[10px] font-bold text-espresso/50 uppercase tracking-wider">STEP 1 OF 4</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-espresso/60 block mb-1">
                        EMAIL ADDRESS *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-[2px] border border-espresso/25 bg-white text-xs font-medium text-espresso focus:outline-none focus:border-espresso"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-espresso/60 block mb-1">
                        PHONE NUMBER *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-[2px] border border-espresso/25 bg-white text-xs font-medium text-espresso focus:outline-none focus:border-espresso"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveStep(2)}
                    className="retro-btn-primary w-full sm:w-auto flex items-center justify-center gap-2"
                  >
                    <span>CONTINUE TO DELIVERY</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Step 2: Delivery Address */}
              {activeStep === 2 && (
                <div>
                  <h3 className="font-display font-bold text-lg sm:text-xl text-espresso mb-4 pb-2 border-b border-espresso/15 flex items-center justify-between">
                    <span>2. SHIPPING DESTINATION</span>
                    <span className="text-[10px] font-bold text-espresso/50 uppercase tracking-wider">STEP 2 OF 4</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-espresso/60 block mb-1">
                        FIRST NAME *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-[2px] border border-espresso/25 bg-white text-xs font-medium text-espresso focus:outline-none focus:border-espresso"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-espresso/60 block mb-1">
                        LAST NAME *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-[2px] border border-espresso/25 bg-white text-xs font-medium text-espresso focus:outline-none focus:border-espresso"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-espresso/60 block mb-1">
                      STREET ADDRESS *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-[2px] border border-espresso/25 bg-white text-xs font-medium text-espresso focus:outline-none focus:border-espresso"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-espresso/60 block mb-1">
                        CITY *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-[2px] border border-espresso/25 bg-white text-xs font-medium text-espresso focus:outline-none focus:border-espresso"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-espresso/60 block mb-1">
                        STATE *
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={form.state}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-[2px] border border-espresso/25 bg-white text-xs font-medium text-espresso focus:outline-none focus:border-espresso"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-espresso/60 block mb-1">
                        PINCODE *
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        value={form.pincode}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-[2px] border border-espresso/25 bg-white text-xs font-medium text-espresso focus:outline-none focus:border-espresso"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setActiveStep(1)}
                      className="retro-btn-outline flex items-center gap-1.5"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>BACK</span>
                    </button>
                    <button
                      onClick={() => setActiveStep(3)}
                      className="retro-btn-primary flex items-center gap-1.5"
                    >
                      <span>CONTINUE TO PAYMENT</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Payment Method */}
              {activeStep === 3 && (
                <div>
                  <h3 className="font-display font-bold text-lg sm:text-xl text-espresso mb-4 pb-2 border-b border-espresso/15 flex items-center justify-between">
                    <span>3. SELECT PAYMENT METHOD</span>
                    <span className="text-[10px] font-bold text-espresso/50 uppercase tracking-wider">STEP 3 OF 4</span>
                  </h3>

                  <div className="space-y-2.5 mb-6">
                    {/* UPI Option */}
                    <label
                      className={`flex items-center justify-between p-3.5 rounded-[2px] border cursor-pointer transition-all ${
                        form.paymentMethod === 'upi'
                          ? 'border-espresso bg-[#F9F3EA] shadow-xs'
                          : 'border-espresso/20 bg-white hover:border-espresso/40'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="upi"
                          checked={form.paymentMethod === 'upi'}
                          onChange={handleChange}
                          className="accent-coral h-4 w-4"
                        />
                        <div>
                          <span className="font-sans font-bold text-xs sm:text-sm text-espresso block">
                            UPI (Google Pay, PhonePe, Paytm, BHIM)
                          </span>
                          <span className="text-[11px] text-espresso/60">
                            Instant zero-fee transfer
                          </span>
                        </div>
                      </div>
                      <Zap className="w-4 h-4 text-coral" />
                    </label>

                    {/* Card Option */}
                    <label
                      className={`flex items-center justify-between p-3.5 rounded-[2px] border cursor-pointer transition-all ${
                        form.paymentMethod === 'card'
                          ? 'border-espresso bg-[#F9F3EA] shadow-xs'
                          : 'border-espresso/20 bg-white hover:border-espresso/40'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="card"
                          checked={form.paymentMethod === 'card'}
                          onChange={handleChange}
                          className="accent-coral h-4 w-4"
                        />
                        <div>
                          <span className="font-sans font-bold text-xs sm:text-sm text-espresso block">
                            Credit / Debit Card
                          </span>
                          <span className="text-[11px] text-espresso/60">
                            Visa, Mastercard, RuPay
                          </span>
                        </div>
                      </div>
                      <CreditCard className="w-4 h-4 text-teal" />
                    </label>

                    {/* COD Option */}
                    <label
                      className={`flex items-center justify-between p-3.5 rounded-[2px] border cursor-pointer transition-all ${
                        form.paymentMethod === 'cod'
                          ? 'border-espresso bg-[#F9F3EA] shadow-xs'
                          : 'border-espresso/20 bg-white hover:border-espresso/40'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cod"
                          checked={form.paymentMethod === 'cod'}
                          onChange={handleChange}
                          className="accent-coral h-4 w-4"
                        />
                        <div>
                          <span className="font-sans font-bold text-xs sm:text-sm text-espresso block">
                            Cash on Delivery (COD)
                          </span>
                          <span className="text-[11px] text-espresso/60">
                            Pay upon parcel arrival
                          </span>
                        </div>
                      </div>
                      <Banknote className="w-4 h-4 text-espresso/70" />
                    </label>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setActiveStep(2)}
                      className="retro-btn-outline flex items-center gap-1.5"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>BACK</span>
                    </button>
                    <button
                      onClick={() => setActiveStep(4)}
                      className="retro-btn-primary flex items-center gap-1.5"
                    >
                      <span>REVIEW ORDER</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Final Review */}
              {activeStep === 4 && (
                <div>
                  <h3 className="font-display font-bold text-lg sm:text-xl text-espresso mb-4 pb-2 border-b border-espresso/15 flex items-center justify-between">
                    <span>4. FINAL ORDER REVIEW</span>
                    <span className="text-[10px] font-bold text-coral uppercase tracking-wider">STEP 4 OF 4</span>
                  </h3>

                  <div className="p-4 rounded-[2px] border border-espresso/15 bg-[#FFF1DF]/60 mb-6 space-y-2.5 text-xs text-espresso">
                    <div className="flex justify-between">
                      <span className="text-espresso/60 uppercase">RECIPIENT:</span>
                      <span className="font-semibold">{form.firstName} {form.lastName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-espresso/60 uppercase">CONTACT:</span>
                      <span>{form.email} • {form.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-espresso/60 uppercase">DESTINATION:</span>
                      <span className="text-right max-w-xs">{form.address}, {form.city}, {form.pincode}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-espresso/60 uppercase">PAYMENT METHOD:</span>
                      <span className="uppercase text-coral font-bold">{form.paymentMethod}</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setActiveStep(3)}
                      className="retro-btn-outline flex items-center gap-1.5"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>BACK</span>
                    </button>
                    <button
                      onClick={handlePlaceOrder}
                      className="retro-btn-primary flex-1 flex items-center justify-center gap-2"
                    >
                      <span>CONFIRM & PLACE ORDER</span>
                      <span>•</span>
                      <span>{formatPrice(finalTotal)}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Order Summary Sidebar (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-sm border border-espresso/20 p-6 shadow-sm sticky top-24">
              <h4 className="font-display font-bold text-base text-espresso mb-4 pb-2 border-b border-espresso/15">
                PACKAGE CONTENTS ({totalQty})
              </h4>

              <div className="flex flex-col gap-3 mb-5 max-h-60 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.key} className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-12 w-10 rounded-[2px] border border-espresso/15 object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h5 className="font-display font-medium text-xs text-espresso truncate">
                        {item.name}
                      </h5>
                      <span className="text-[10px] text-espresso/60 block">
                        Size: {item.selectedSize} • Qty: {item.qty}
                      </span>
                    </div>
                    <span className="font-sans font-bold text-xs text-espresso">
                      {formatPrice(item.price * item.qty)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-espresso/15 pt-4 flex flex-col gap-2 text-xs text-espresso">
                <div className="flex justify-between">
                  <span className="text-espresso/60">Subtotal</span>
                  <span className="font-semibold">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-espresso/60">Shipping</span>
                  <span className="font-semibold">{shippingAmount === 0 ? 'FREE' : formatPrice(shippingAmount)}</span>
                </div>
                <div className="flex justify-between text-base font-bold pt-3 border-t border-espresso/15">
                  <span>TOTAL PAYABLE</span>
                  <span className="text-coral text-lg font-sans">
                    {formatPrice(finalTotal)}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-espresso/10 flex items-center justify-center gap-1.5 text-[10px] font-medium text-espresso/60 uppercase">
                <ShieldCheck className="w-3.5 h-3.5 text-teal" />
                <span>SSL Encrypted Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
