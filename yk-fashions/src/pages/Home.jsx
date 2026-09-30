import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import ProductCard from '../components/product/ProductCard.jsx'
import { products } from '../data/products.js'
import { DoodleStar, AnimatedWavyUnderline } from '../components/common/Doodles.jsx'
import { formatPrice } from '../lib/format.js'

export default function Home() {
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false)

  // Hero parallax container
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const heroImageY = useTransform(scrollYProgress, [0, 1], ['0%', '8%'])
  const heroTextY = useTransform(scrollYProgress, [0, 1], ['0%', '4%'])

  // 4 products for New Arrivals (all men's streetwear)
  const newArrivals = products.slice(0, 4)
  const featuredProduct = products[0]

  const handleNewsletter = (e) => {
    e.preventDefault()
    if (!newsletterEmail) return
    setNewsletterSubmitted(true)
  }

  return (
    <div className="relative bg-[#FFF1DF]">
      {/* ─────────────────────────────────────────────────────────────
          1. CLEAN, ART-DIRECTED RETRO HERO
          Mobile-first, compact, elegant: Strong photograph, clear headline,
          one short sentence, balanced buttons. No cluttered specs or giant blocks.
      ────────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative pt-6 pb-10 sm:pt-12 sm:pb-16 border-b-2 border-espresso bg-[#FFF1DF] overflow-hidden"
      >
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* ── Left Column: Headline & Action ── */}
            <motion.div
              style={{ y: heroTextY }}
              className="lg:col-span-7 flex flex-col items-start z-10"
            >
              {/* Subtle collection badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-espresso bg-butter text-[11px] font-bold uppercase tracking-wider text-espresso mb-3 sm:mb-4 shadow-[1.5px_1.5px_0px_#241B16]">
                <DoodleStar className="w-3 h-3 text-coral" />
                <span>SPRING ARCHIVE 2026</span>
              </div>

              {/* Main Headline */}
              <div className="mb-3 sm:mb-4">
                <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.03] tracking-tight text-espresso">
                  MEN'S STREETWEAR{' '}
                  <span className="relative inline-block text-coral">
                    CRAFTED HEAVY.
                    <AnimatedWavyUnderline className="absolute -bottom-1.5 left-0 w-full h-2.5 sm:h-3.5 text-butter" delay={0.3} />
                  </span>
                  <br />
                  <span className="relative inline-block text-espresso mt-1">
                    WEAR THE ART.
                  </span>
                </h1>
              </div>

              {/* One short fashion sentence (Section 21 & 22) */}
              <p className="font-sans text-sm sm:text-base lg:text-lg text-espresso/80 max-w-lg mb-6 leading-relaxed font-medium">
                Heavyweight essentials made for everyday movement and honest street aesthetic.
              </p>

              {/* CTA Buttons — Compact, comfortable touch targets (Section 11) */}
              <div className="flex flex-row items-center gap-3 w-full sm:w-auto">
                <Link
                  to="/shop"
                  className="retro-btn-primary py-2.5 px-5 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 flex-1 sm:flex-initial"
                >
                  <span>SHOP MEN'S DROP</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/lookbook"
                  className="retro-btn-outline py-2.5 px-4 text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 flex-1 sm:flex-initial"
                >
                  <span>LOOKBOOK</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>

            {/* ── Right Column: Art-Directed Men's Poster Visual ── */}
            <motion.div
              style={{ y: heroImageY }}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5 relative"
            >
              {/* Terracotta backdrop panel */}
              <div className="absolute -inset-2 sm:-inset-3 rounded-2xl sm:rounded-3xl bg-[#B9654E] border-2 border-espresso shadow-retro hidden sm:block rotate-1" />

              {/* Main Card */}
              <div className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none rounded-2xl sm:rounded-3xl border-2 sm:border-3 border-espresso bg-white p-2.5 sm:p-3.5 shadow-retro z-10">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl sm:rounded-2xl border-2 border-espresso bg-[#F7EFE5]">
                  <img
                    src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=1000&auto=format&fit=crop&q=85"
                    alt="Male model wearing YK Mens Fashion heavyweight oversized streetwear tee"
                    className="h-full w-full object-cover object-center"
                    loading="eager"
                  />

                  {/* Clean bottom pill tag */}
                  <div className="absolute inset-x-2.5 bottom-2.5 p-2.5 rounded-xl border border-espresso bg-[#FFF1DF]/95 backdrop-blur-xs shadow-sm flex items-center justify-between">
                    <div>
                      <span className="text-[9px] font-black uppercase tracking-wider text-coral block">
                        FEATURED PIECE
                      </span>
                      <h4 className="font-display font-bold text-xs text-espresso truncate max-w-[150px] sm:max-w-[180px]">
                        {featuredProduct.name}
                      </h4>
                    </div>
                    <Link
                      to={`/product/${featuredProduct.slug}`}
                      className="px-2.5 py-1 rounded-md border border-espresso bg-white font-display font-black text-[11px] text-espresso hover:bg-butter transition-colors"
                    >
                      {formatPrice(featuredProduct.price)}
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. NEW ARRIVALS — COMPACT 2-COLUMN MOBILE GRID
          Immediate transition from Hero to Products (Section 24)
      ────────────────────────────────────────────────────────────── */}
      <section className="py-10 sm:py-16 border-b-2 border-espresso bg-[#FFF1DF]">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <div className="flex items-end justify-between gap-4 mb-6 sm:mb-8">
            <div>
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-coral block mb-1">
                LATEST RELEASES
              </span>
              <h2 className="font-display font-black text-2xl sm:text-4xl text-espresso">
                NEW ARRIVALS
              </h2>
            </div>
            <Link
              to="/shop"
              className="text-xs sm:text-sm font-bold text-espresso hover:text-coral flex items-center gap-1"
            >
              <span>SEE ALL ({products.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Compact 2-column mobile grid, 4-column desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {newArrivals.map((product, idx) => (
              <ProductCard key={product.id} product={product} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. FEATURED COLLECTIONS — 3 CLEAN SILHOUETTES
      ────────────────────────────────────────────────────────────── */}
      <section className="py-10 sm:py-16 border-b-2 border-espresso bg-[#FDF6EE]">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <div className="text-center max-w-lg mx-auto mb-8 sm:mb-12">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-coral block mb-1">
              TAILORED CUTS
            </span>
            <h2 className="font-display font-black text-2xl sm:text-4xl text-espresso mb-2">
              MEN'S SILHOUETTES
            </h2>
            <p className="font-sans text-xs sm:text-sm text-espresso/70 font-medium">
              Three essential cuts designed for relaxed drape and daily wear.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {/* Collection 1: Oversized */}
            <Link
              to="/collection/oversized"
              className="group rounded-2xl border-2 border-espresso bg-white p-3 sm:p-4 shadow-retro hover:-translate-y-1 transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] rounded-xl border border-espresso overflow-hidden bg-[#F7EFE5] mb-3">
                <img
                  src="https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80"
                  alt="Male model in oversized streetwear tee"
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full border border-espresso bg-butter font-bold text-[9px] uppercase">
                  OVERSIZED
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display font-black text-lg text-espresso group-hover:text-coral transition-colors">
                    Oversized Series
                  </h3>
                  <p className="text-xs text-espresso/70 font-medium">
                    Dropped shoulders & relaxed chest
                  </p>
                </div>
                <div className="h-8 w-8 rounded-full border border-espresso bg-butter flex items-center justify-center shrink-0 group-hover:bg-coral group-hover:text-white transition-colors">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>

            {/* Collection 2: Graphic */}
            <Link
              to="/collection/graphic"
              className="group rounded-2xl border-2 border-espresso bg-white p-3 sm:p-4 shadow-retro hover:-translate-y-1 transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] rounded-xl border border-espresso overflow-hidden bg-[#F7EFE5] mb-3">
                <img
                  src="https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=800&auto=format&fit=crop&q=80"
                  alt="Male model in graphic streetwear tee"
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full border border-espresso bg-coral text-white font-bold text-[9px] uppercase">
                  GRAPHIC
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display font-black text-lg text-espresso group-hover:text-coral transition-colors">
                    Graphic Prints
                  </h3>
                  <p className="text-xs text-espresso/70 font-medium">
                    Silkscreen prints in limited batches
                  </p>
                </div>
                <div className="h-8 w-8 rounded-full border border-espresso bg-butter flex items-center justify-center shrink-0 group-hover:bg-coral group-hover:text-white transition-colors">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>

            {/* Collection 3: Essentials */}
            <Link
              to="/collection/essentials"
              className="group rounded-2xl border-2 border-espresso bg-white p-3 sm:p-4 shadow-retro hover:-translate-y-1 transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] rounded-xl border border-espresso overflow-hidden bg-[#F7EFE5] mb-3">
                <img
                  src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80"
                  alt="Male model in essentials boxy tee"
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full border border-espresso bg-teal text-white font-bold text-[9px] uppercase">
                  ESSENTIALS
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display font-black text-lg text-espresso group-hover:text-coral transition-colors">
                    Daily Essentials
                  </h3>
                  <p className="text-xs text-espresso/70 font-medium">
                    Clean, unbranded earth-toned blanks
                  </p>
                </div>
                <div className="h-8 w-8 rounded-full border border-espresso bg-butter flex items-center justify-center shrink-0 group-hover:bg-coral group-hover:text-white transition-colors">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. EDITORIAL STORY SECTION — CLEAN & REFINED
          One strong image, one strong headline, one short description, one CTA (Section 20)
      ────────────────────────────────────────────────────────────── */}
      <section className="py-12 sm:py-18 border-b-2 border-espresso bg-[#C96845] text-white">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <div className="rounded-2xl sm:rounded-3xl border-2 border-espresso bg-[#FFF1DF] text-espresso p-5 sm:p-10 shadow-retro">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-center">
              {/* Text */}
              <div className="lg:col-span-6 flex flex-col items-start">
                <span className="text-[10px] font-black uppercase tracking-widest text-coral mb-2">
                  OUR PHILOSOPHY
                </span>

                <h2 className="font-display font-black text-2xl sm:text-4xl lg:text-5xl text-espresso mb-3 leading-tight">
                  THE NEW EVERYDAY.
                </h2>

                <p className="font-sans text-xs sm:text-base text-espresso/80 font-medium leading-relaxed mb-6">
                  We design fewer garments with greater care. Sourced from certified organic
                  cotton with reinforced collar bindings and double-needle seams that hold
                  their shape wash after wash.
                </p>

                <div className="flex items-center gap-3">
                  <Link to="/about" className="retro-btn-primary py-2 px-4 text-xs font-bold flex items-center gap-1.5">
                    <span>OUR STORY</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link to="/collection/essentials" className="retro-btn-outline py-2 px-4 text-xs font-bold">
                    <span>SHOP ESSENTIALS</span>
                  </Link>
                </div>
              </div>

              {/* Image */}
              <div className="lg:col-span-6">
                <div className="relative aspect-[16/11] rounded-xl sm:rounded-2xl border-2 border-espresso overflow-hidden bg-[#F7EFE5]">
                  <img
                    src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=1000&auto=format&fit=crop&q=80"
                    alt="Male model in relaxed streetwear tee"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. LOOKBOOK MAGAZINE PREVIEW — MUTED BURGUNDY
      ────────────────────────────────────────────────────────────── */}
      <section className="py-12 sm:py-18 border-b-2 border-espresso bg-[#754447] text-white">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <div className="flex items-end justify-between gap-4 mb-6 sm:mb-10">
            <div>
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-butter block mb-1">
                EDITORIAL STUDY
              </span>
              <h2 className="font-display font-black text-2xl sm:text-4xl text-white">
                LOOKBOOK 04
              </h2>
            </div>
            <Link
              to="/lookbook"
              className="text-xs sm:text-sm font-bold text-butter hover:underline flex items-center gap-1"
            >
              <span>VIEW FULL LOOKBOOK</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                look: 'LOOK 01',
                title: 'Oversized Drape Study',
                src: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80',
              },
              {
                look: 'LOOK 02',
                title: 'Street Essentials',
                src: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=800&auto=format&fit=crop&q=80',
              },
              {
                look: 'LOOK 03',
                title: 'Palette Contrast',
                src: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-2xl border-2 border-espresso bg-[#FFF1DF] text-espresso p-2.5 sm:p-3 shadow-retro"
              >
                <div className="relative aspect-[3/4] rounded-xl border border-espresso overflow-hidden mb-2">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-butter border border-espresso text-[9px] font-black uppercase">
                    {item.look}
                  </span>
                </div>
                <p className="font-display font-bold text-xs sm:text-sm text-espresso text-center">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. BRAND STATEMENT — DEEP FOREST (#183D35)
      ────────────────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 border-b-2 border-espresso bg-[#183D35] text-[#FFF1DF] text-center">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <span className="text-[10px] font-black uppercase tracking-widest text-coral block mb-3">
            YK MENS FASHION
          </span>

          <blockquote className="font-display font-black text-xl sm:text-3xl lg:text-4xl leading-tight text-white mb-4">
            "CLOTHING DESIGNED LIKE AN ARTIST'S PRINT — HONEST, WEIGHTY, AND TAILORED FOR MEN WHO VALUE SUBSTANCE."
          </blockquote>

          <p className="font-sans text-xs sm:text-sm text-[#FFF1DF]/75 font-medium max-w-md mx-auto leading-relaxed mb-6">
            Independent men's streetwear atelier. Designed and crafted in Mumbai.
          </p>

          <Link
            to="/shop"
            className="retro-btn-primary py-2.5 px-6 text-xs sm:text-sm font-bold inline-flex items-center gap-2"
          >
            <span>EXPLORE THE COLLECTION</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. NEWSLETTER — CALM & CLEAN
      ────────────────────────────────────────────────────────────── */}
      <section className="py-10 sm:py-16 border-b-2 border-espresso bg-[#FDF6EE]">
        <div className="mx-auto max-w-xl px-4 sm:px-6 text-center">
          <h3 className="font-display font-black text-xl sm:text-2xl text-espresso mb-2">
            STAY IN TOUCH
          </h3>
          <p className="font-sans text-xs sm:text-sm text-espresso/70 font-medium mb-6">
            Get early access to secret drops and editorial lookbooks.
          </p>

          {newsletterSubmitted ? (
            <div className="p-3 rounded-xl border border-espresso bg-sage text-espresso font-bold text-xs flex items-center justify-center gap-1.5">
              <Check className="w-4 h-4 stroke-[2.5]" />
              <span>You're on the list. Welcome to YK.</span>
            </div>
          ) : (
            <form onSubmit={handleNewsletter} className="flex gap-2 max-w-md mx-auto">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email..."
                required
                className="flex-1 px-3.5 py-2 rounded-xl border-2 border-espresso bg-white text-xs font-medium text-espresso placeholder-espresso/40 focus:outline-none"
              />
              <button
                type="submit"
                className="retro-btn-primary py-2 px-4 text-xs font-bold shrink-0 flex items-center gap-1"
              >
                <span>JOIN</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}
