import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Package, Zap, CreditCard, Banknote, ShieldCheck, Check, Sparkles } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'
import { formatPrice } from '../lib/format.js'
import { DoodleStar, RetroStampBadge, AnimatedSketchArrow } from '../components/common/Doodles.jsx'

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

  // If order was placed, display celebration screen
  if (orderPlaced) {
    return (
      <div className="bg-[#FFF1DF] min-h-screen py-16 sm:py-24">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <div className="retro-card bg-white p-8 sm:p-12 text-center shadow-retro-xl relative overflow-hidden">
            {/* Stamp Badge */}
            <div className="flex justify-center mb-6">
              <RetroStampBadge className="w-24 h-24 text-forest" centerText="PAID" text="100% HEAVY COTTON • YK MENS FASHION • " />
            </div>

            <span className="retro-pill bg-butter text-white mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              ORDER CONFIRMED
            </span>

            <h1 className="font-display font-black text-3xl sm:text-5xl text-espresso mb-3">
              ORDER RECEIVED!
            </h1>

            <p className="font-sans text-sm sm:text-base text-espresso/80 font-medium max-w-md mx-auto mb-6">
              Thank you, <strong>{form.firstName}</strong>. Your streetwear pieces
              are being pulled from the drying racks at our Mumbai atelier.
            </p>

            {/* Order Specs Box */}
            <div className="p-4 rounded-2xl border-2 border-espresso bg-[#FFF1DF] max-w-md mx-auto text-left mb-8 shadow-retro">
              <div className="flex justify-between py-1 border-b border-espresso/15 text-xs font-bold">
                <span className="text-espresso/60">ORDER ID</span>
                <span className="font-display font-black text-coral">#{orderId}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-espresso/15 text-xs font-bold">
                <span className="text-espresso/60">SHIPPING TO</span>
                <span className="text-espresso">{form.city}, {form.state}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-espresso/15 text-xs font-bold">
                <span className="text-espresso/60">ESTIMATED DELIVERY</span>
                <span className="text-teal font-black">3–5 Business Days</span>
              </div>
              <div className="flex justify-between py-1 text-xs font-bold">
                <span className="text-espresso/60">TOTAL PAID</span>
                <span className="font-black text-espresso">{formatPrice(finalTotal)}</span>
              </div>
            </div>

            <Link to="/shop" className="retro-btn-primary inline-flex items-center gap-2">
              <span>CONTINUE EXPLORING ATELIER</span>
              <AnimatedSketchArrow className="w-6 h-3 text-white" />
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // If cart is empty and order wasn't placed
  if (cart.length === 0) {
    return (
      <div className="bg-[#FFF1DF] min-h-screen py-20 text-center px-4">
        <Package className="w-16 h-16 text-espresso/40 mx-auto mb-4" />
        <h2 className="font-display font-black text-3xl text-espresso mb-3">
          Your bag is empty.
        </h2>
        <p className="text-sm font-medium text-espresso/70 mb-6">
          Add pieces to your bag before proceeding to checkout.
        </p>
        <Link to="/shop" className="retro-btn-primary inline-flex items-center gap-2">
          <span>BROWSE ARCHIVE</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    )
  }

  // Color mappings for step states (Section 6 Requirement: color used for steps and states)
  const stepColors = {
    1: 'bg-burnt-orange text-white',
    2: 'bg-teal text-white',
    3: 'bg-dusty-blue text-white',
    4: 'bg-coral text-white',
  }

  return (
    <div className="bg-[#FFF1DF] min-h-screen py-10 sm:py-16">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        {/* ── Checkout Header ─────────────────────────────── */}
        <div className="mb-8">
          <span className="retro-pill bg-butter text-white mb-3">
            <DoodleStar className="w-3.5 h-3.5" />
            ATELIER DISPATCH
          </span>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-espresso">
            CHECKOUT
          </h1>
        </div>

        {/* ── 4-Step Indicator Bar with Color States ─────────────────────────── */}
        <div className="grid grid-cols-4 gap-2.5 max-w-2xl mb-10">
          {[
            { num: 1, label: 'CONTACT' },
            { num: 2, label: 'DELIVERY' },
            { num: 3, label: 'PAYMENT' },
            { num: 4, label: 'REVIEW' },
          ].map((s) => (
            <button
              key={s.num}
              onClick={() => setActiveStep(s.num)}
              className={`p-2.5 rounded-xl border-2 border-espresso text-center transition-all ${
                activeStep === s.num
                  ? `${stepColors[s.num]} shadow-retro`
                  : activeStep > s.num
                  ? 'bg-butter text-espresso font-bold'
                  : 'bg-white text-espresso/50'
              }`}
            >
              <div className="flex items-center justify-center gap-1">
                {activeStep > s.num && <Check className="w-3 h-3 stroke-[3]" />}
                <span className="text-[10px] font-black uppercase tracking-wider block">
                  STEP 0{s.num}
                </span>
              </div>
              <span className="font-display font-bold text-xs hidden sm:block">
                {s.label}
              </span>
            </button>
          ))}
        </div>

        {/* ── Form & Order Summary Layout ──────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left: Step Form Content (7 cols) */}
          <div className="lg:col-span-7">
            <div className="retro-card bg-white p-6 sm:p-8 shadow-retro-xl">
              {/* Step 1: Contact Details */}
              {activeStep === 1 && (
                <div>
                  <h3 className="font-display font-black text-2xl text-espresso mb-4 pb-2 border-b-2 border-espresso/15 flex items-center justify-between">
                    <span>1. CONTACT INFORMATION</span>
                    <span className="text-xs font-bold text-burnt-orange px-2.5 py-0.5 rounded-md border border-burnt-orange bg-burnt-orange/10">STEP 1 OF 4</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="text-[11px] font-black uppercase text-espresso/70 block mb-1">
                        EMAIL ADDRESS *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-xl border-2 border-espresso bg-[#FFF1DF] font-bold text-xs text-espresso focus:bg-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-black uppercase text-espresso/70 block mb-1">
                        PHONE NUMBER *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-xl border-2 border-espresso bg-[#FFF1DF] font-bold text-xs text-espresso focus:bg-white focus:outline-none"
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
                  <h3 className="font-display font-black text-2xl text-espresso mb-4 pb-2 border-b-2 border-espresso/15 flex items-center justify-between">
                    <span>2. SHIPPING DESTINATION</span>
                    <span className="text-xs font-bold text-teal px-2.5 py-0.5 rounded-md border border-teal bg-teal/10">STEP 2 OF 4</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="text-[11px] font-black uppercase text-espresso/70 block mb-1">
                        FIRST NAME *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-xl border-2 border-espresso bg-[#FFF1DF] font-bold text-xs text-espresso focus:bg-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-black uppercase text-espresso/70 block mb-1">
                        LAST NAME *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-xl border-2 border-espresso bg-[#FFF1DF] font-bold text-xs text-espresso focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="text-[11px] font-black uppercase text-espresso/70 block mb-1">
                      STREET ADDRESS *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border-2 border-espresso bg-[#FFF1DF] font-bold text-xs text-espresso focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div>
                      <label className="text-[11px] font-black uppercase text-espresso/70 block mb-1">
                        CITY *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-xl border-2 border-espresso bg-[#FFF1DF] font-bold text-xs text-espresso focus:bg-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-black uppercase text-espresso/70 block mb-1">
                        STATE *
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={form.state}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-xl border-2 border-espresso bg-[#FFF1DF] font-bold text-xs text-espresso focus:bg-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-black uppercase text-espresso/70 block mb-1">
                        PINCODE *
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        value={form.pincode}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-xl border-2 border-espresso bg-[#FFF1DF] font-bold text-xs text-espresso focus:bg-white focus:outline-none"
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

              {/* Step 3: Payment Method with Lucide Icons */}
              {activeStep === 3 && (
                <div>
                  <h3 className="font-display font-black text-2xl text-espresso mb-4 pb-2 border-b-2 border-espresso/15 flex items-center justify-between">
                    <span>3. SELECT PAYMENT METHOD</span>
                    <span className="text-xs font-bold text-dusty-blue px-2.5 py-0.5 rounded-md border border-dusty-blue bg-dusty-blue/10">STEP 3 OF 4</span>
                  </h3>

                  <div className="space-y-3 mb-6">
                    {/* UPI Option */}
                    <label
                      className={`flex items-center justify-between p-4 rounded-2xl border-2 border-espresso cursor-pointer transition-all ${
                        form.paymentMethod === 'upi'
                          ? 'bg-butter shadow-retro'
                          : 'bg-white hover:bg-cream-dark'
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
                          <span className="font-display font-black text-sm text-espresso block">
                            UPI (Google Pay, PhonePe, Paytm, BHIM)
                          </span>
                          <span className="text-[11px] font-medium text-espresso/70">
                            Instant zero-fee transfer
                          </span>
                        </div>
                      </div>
                      <Zap className="w-5 h-5 text-coral" />
                    </label>

                    {/* Card Option */}
                    <label
                      className={`flex items-center justify-between p-4 rounded-2xl border-2 border-espresso cursor-pointer transition-all ${
                        form.paymentMethod === 'card'
                          ? 'bg-butter shadow-retro'
                          : 'bg-white hover:bg-cream-dark'
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
                          <span className="font-display font-black text-sm text-espresso block">
                            Credit / Debit Card
                          </span>
                          <span className="text-[11px] font-medium text-espresso/70">
                            Visa, Mastercard, RuPay
                          </span>
                        </div>
                      </div>
                      <CreditCard className="w-5 h-5 text-teal" />
                    </label>

                    {/* COD Option */}
                    <label
                      className={`flex items-center justify-between p-4 rounded-2xl border-2 border-espresso cursor-pointer transition-all ${
                        form.paymentMethod === 'cod'
                          ? 'bg-butter shadow-retro'
                          : 'bg-white hover:bg-cream-dark'
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
                          <span className="font-display font-black text-sm text-espresso block">
                            Cash on Delivery (COD)
                          </span>
                          <span className="text-[11px] font-medium text-espresso/70">
                            Pay when your parcel arrives
                          </span>
                        </div>
                      </div>
                      <Banknote className="w-5 h-5 text-forest" />
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
                  <h3 className="font-display font-black text-2xl text-espresso mb-4 pb-2 border-b-2 border-espresso/15 flex items-center justify-between">
                    <span>4. FINAL ORDER REVIEW</span>
                    <span className="text-xs font-bold text-coral px-2.5 py-0.5 rounded-md border border-coral bg-coral/10">STEP 4 OF 4</span>
                  </h3>

                  <div className="p-4 rounded-2xl border-2 border-dashed border-espresso bg-[#FFF1DF] mb-6 space-y-3 text-xs font-bold text-espresso">
                    <div className="flex justify-between">
                      <span className="text-espresso/60">RECIPIENT:</span>
                      <span>{form.firstName} {form.lastName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-espresso/60">CONTACT:</span>
                      <span>{form.email} • {form.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-espresso/60">DESTINATION:</span>
                      <span className="text-right max-w-xs">{form.address}, {form.city}, {form.pincode}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-espresso/60">PAYMENT METHOD:</span>
                      <span className="uppercase text-coral font-black">{form.paymentMethod}</span>
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
                      className="retro-btn-primary flex-1 !bg-coral text-white flex items-center justify-center gap-2"
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
            <div className="retro-card bg-white p-6 shadow-retro-xl sticky top-28">
              <h4 className="font-display font-black text-lg text-espresso mb-4 pb-2 border-b-2 border-espresso/15">
                PACKAGE CONTENTS ({totalQty})
              </h4>

              <div className="flex flex-col gap-3 mb-6 max-h-60 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.key} className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-14 w-12 rounded-lg border border-espresso object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h5 className="font-display font-bold text-xs text-espresso truncate">
                        {item.name}
                      </h5>
                      <span className="text-[10px] font-bold text-espresso/60 block">
                        Size: {item.selectedSize} • Qty: {item.qty}
                      </span>
                    </div>
                    <span className="font-display font-black text-xs text-espresso">
                      {formatPrice(item.price * item.qty)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t-2 border-dashed border-espresso/20 pt-4 flex flex-col gap-2 text-xs font-bold text-espresso">
                <div className="flex justify-between">
                  <span className="text-espresso/60">Subtotal</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-espresso/60">Shipping</span>
                  <span>{shippingAmount === 0 ? 'FREE' : formatPrice(shippingAmount)}</span>
                </div>
                <div className="flex justify-between text-base font-black pt-3 border-t border-espresso/15">
                  <span className="font-display">TOTAL PAYABLE</span>
                  <span className="font-display text-coral text-xl">
                    {formatPrice(finalTotal)}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-espresso/15 flex items-center justify-center gap-1.5 text-[10px] font-bold text-espresso/60 uppercase">
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
