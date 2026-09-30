import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import ProductCard from '../components/product/ProductCard.jsx'
import { products } from '../data/products.js'
import { DoodleStar, AnimatedWavyUnderline, RetroStampBadge, EditorialMark } from '../components/common/Doodles.jsx'
import { formatPrice } from '../lib/format.js'

export default function Home() {
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false)

  // Hero subtle parallax
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const heroImageY = useTransform(scrollYProgress, [0, 1], ['0%', '5%'])

  // 4 products for New Arrivals (men's streetwear)
  const newArrivals = products.slice(0, 4)
  const featuredProduct = products[0]

  const handleNewsletter = (e) => {
    e.preventDefault()
    if (!newsletterEmail) return
    setNewsletterSubmitted(true)
  }

  return (
    <div className="relative bg-[#FFF1DF] text-espresso">
      {/* ─────────────────────────────────────────────────────────────
          1. HERO CAMPAIGN — ART-DIRECTED FASHION EDITORIAL
          High-fashion composition: Strong male imagery, authoritative
          editorial typography, clear product focus, and deliberate whitespace.
      ────────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative pt-8 pb-14 sm:pt-16 sm:pb-20 border-b border-espresso/15 bg-[#FFF1DF] overflow-hidden"
      >
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* ── Left Column: Editorial Statement & Actions ── */}
            <div className="lg:col-span-7 flex flex-col items-start z-10">
              {/* Archival Season Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[2px] border border-espresso/25 bg-white text-[10px] font-bold uppercase tracking-[0.18em] text-espresso mb-5 shadow-xs">
                <DoodleStar className="w-3 h-3 text-coral" />
                <span>S/S 2026 ARCHIVE • EDITION 04</span>
              </div>

              {/* Main Campaign Headline */}
              <div className="mb-5">
                <h1 className="font-display font-bold text-4xl sm:text-6xl xl:text-7xl leading-[1.04] tracking-tight text-espresso">
                  MEN'S STREETWEAR
                  <br />
                  <span className="font-serif italic font-normal text-coral relative inline-block">
                    Crafted Heavy.
                    <AnimatedWavyUnderline className="absolute -bottom-1.5 left-0 w-full h-2 text-coral" delay={0.2} />
                  </span>
                </h1>
              </div>

              {/* Supporting Editorial Description */}
              <p className="font-sans text-sm sm:text-base lg:text-lg text-espresso/75 max-w-xl mb-8 leading-relaxed font-normal">
                Engineered from dense 240 GSM organic combed cotton. Featuring dropped-shoulder
                boxy cuts, reinforced 1.25" ribbing, and artisanal silk-screen graphics tailored for men.
              </p>

              {/* Confident CTAs */}
              <div className="flex flex-row items-center gap-3.5 w-full sm:w-auto mb-10">
                <Link
                  to="/shop"
                  className="retro-btn-primary flex-1 sm:flex-initial"
                >
                  <span>SHOP THE DROP</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/lookbook"
                  className="retro-btn-outline flex-1 sm:flex-initial"
                >
                  <span>VIEW LOOKBOOK</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Archival Specs Strip */}
              <div className="pt-6 border-t border-espresso/15 w-full max-w-lg grid grid-cols-3 gap-4 text-left">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-espresso/50 block mb-0.5">
                    FABRIC
                  </span>
                  <p className="font-sans font-bold text-xs text-espresso">
                    240 GSM Heavy Cotton
                  </p>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-espresso/50 block mb-0.5">
                    SILHOUETTE
                  </span>
                  <p className="font-sans font-bold text-xs text-espresso">
                    Relaxed Boxy Cut
                  </p>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-espresso/50 block mb-0.5">
                    PROVENANCE
                  </span>
                  <p className="font-sans font-bold text-xs text-espresso">
                    Mumbai Atelier
                  </p>
                </div>
              </div>
            </div>

            {/* ── Right Column: Large Fashion Imagery Composition ── */}
            <motion.div
              style={{ y: heroImageY }}
              className="lg:col-span-5 relative"
            >
              {/* Outer Architectural Frame */}
              <div className="relative mx-auto max-w-md lg:max-w-none bg-white p-2.5 sm:p-3 rounded-sm border border-espresso/20 shadow-[0_16px_36px_-8px_rgba(36,27,22,0.12)]">
                {/* Image Container with Subtle Registration Marks */}
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2px] bg-[#F4EDE4]">
                  <img
                    src="https://plus.unsplash.com/premium_photo-1727942419945-1908baae3c8e?q=80&w=900&auto=format&fit=crop"
                    alt="Male model wearing YK Mens Fashion heavyweight oversized streetwear tee"
                    className="h-full w-full object-cover object-center"
                    loading="eager"
                  />

                  {/* Corner Atelier Registration Crosshairs */}
                  <div className="absolute top-2.5 left-2.5 pointer-events-none opacity-40">
                    <EditorialMark className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="absolute top-2.5 right-2.5 pointer-events-none opacity-40">
                    <EditorialMark className="w-3.5 h-3.5 text-white" />
                  </div>

                  {/* Exhibition Plate Tag */}
                  <div className="absolute inset-x-3 bottom-3 p-3 rounded-[2px] border border-espresso/15 bg-white/95 backdrop-blur-md shadow-sm flex items-center justify-between">
                    <div>
                      <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-coral block">
                        FEATURED PIECE
                      </span>
                      <h4 className="font-display font-medium text-xs sm:text-sm text-espresso truncate max-w-[160px] sm:max-w-[200px]">
                        {featuredProduct.name}
                      </h4>
                    </div>
                    <Link
                      to={`/product/${featuredProduct.slug}`}
                      className="px-3 py-1.5 rounded-[2px] border border-espresso bg-espresso text-cream font-sans font-bold text-xs uppercase tracking-wider hover:bg-coral hover:border-coral hover:text-white transition-colors"
                    >
                      {formatPrice(featuredProduct.price)}
                    </Link>
                  </div>
                </div>

                {/* Subtle Archival Plate Caption */}
                <div className="mt-2.5 px-1 flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-espresso/50">
                  <span>PLATE 01 • STUDIO FIT STUDY</span>
                  <span>YK ATELIER</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. NEW ARRIVALS — ELEGANT PRODUCT SHOWCASE
          The products are the stars. Clean, balanced, spacious grid.
      ────────────────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 border-b border-espresso/15 bg-[#FFF1DF]">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          {/* Section Header */}
          <div className="flex items-end justify-between gap-4 mb-8 sm:mb-12 pb-3 border-b border-espresso/10">
            <div>
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] text-coral block mb-1">
                SPRING / SUMMER ARCHIVE
              </span>
              <h2 className="font-display font-bold text-2xl sm:text-4xl text-espresso">
                NEW ARRIVALS
              </h2>
            </div>
            <Link
              to="/shop"
              className="text-xs sm:text-sm font-bold uppercase tracking-wider text-espresso hover:text-coral flex items-center gap-1.5 transition-colors"
            >
              <span>VIEW ALL PIECES ({products.length})</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 4-Column Product Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {newArrivals.map((product, idx) => (
              <ProductCard key={product.id} product={product} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. MEN'S SILHOUETTES — 3 CLEAN ARCHITECTURAL CUTS
      ────────────────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 border-b border-espresso/15 bg-[#F9F3EA]">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <div className="text-center max-w-xl mx-auto mb-10 sm:mb-14">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] text-coral block mb-1">
              TAILORED CUTS
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-4xl text-espresso mb-3">
              MEN'S SILHOUETTES
            </h2>
            <p className="font-sans text-xs sm:text-sm text-espresso/70 leading-relaxed font-normal">
              Three signature streetwear silhouettes, engineered with deliberate fabric weight and drape.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Cut 1: Oversized */}
            <Link
              to="/collection/oversized"
              className="group bg-white rounded-sm border border-espresso/15 hover:border-espresso/35 p-3.5 transition-all duration-300 shadow-[0_2px_8px_-2px_rgba(36,27,22,0.04)] hover:shadow-[0_12px_24px_-6px_rgba(36,27,22,0.08)] flex flex-col justify-between"
            >
              <div className="relative aspect-[4/5] rounded-[2px] overflow-hidden bg-[#F4EDE4] mb-4">
                <img
                  src="https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80"
                  alt="Male model in oversized streetwear tee"
                  className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  loading="lazy"
                />
                <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-[2px] bg-white/95 border border-espresso/20 font-bold text-[9px] uppercase tracking-[0.14em] text-espresso shadow-xs">
                  OVERSIZED
                </span>
              </div>
              <div className="flex items-center justify-between px-1">
                <div>
                  <h3 className="font-display font-bold text-base text-espresso group-hover:text-coral transition-colors">
                    Oversized Series
                  </h3>
                  <p className="text-xs text-espresso/60 font-medium">
                    Dropped shoulders & 240 GSM boxy drape
                  </p>
                </div>
                <div className="h-8 w-8 rounded-full border border-espresso/20 flex items-center justify-center shrink-0 group-hover:bg-espresso group-hover:text-white transition-colors">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>

            {/* Cut 2: Graphic */}
            <Link
              to="/collection/graphic"
              className="group bg-white rounded-sm border border-espresso/15 hover:border-espresso/35 p-3.5 transition-all duration-300 shadow-[0_2px_8px_-2px_rgba(36,27,22,0.04)] hover:shadow-[0_12px_24px_-6px_rgba(36,27,22,0.08)] flex flex-col justify-between"
            >
              <div className="relative aspect-[4/5] rounded-[2px] overflow-hidden bg-[#F4EDE4] mb-4">
                <img
                  src="https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=800&auto=format&fit=crop&q=80"
                  alt="Male model in graphic streetwear tee"
                  className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  loading="lazy"
                />
                <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-[2px] bg-white/95 border border-espresso/20 font-bold text-[9px] uppercase tracking-[0.14em] text-espresso shadow-xs">
                  GRAPHIC
                </span>
              </div>
              <div className="flex items-center justify-between px-1">
                <div>
                  <h3 className="font-display font-bold text-base text-espresso group-hover:text-coral transition-colors">
                    Graphic Editions
                  </h3>
                  <p className="text-xs text-espresso/60 font-medium">
                    Hand-pulled silkscreen in numbered runs
                  </p>
                </div>
                <div className="h-8 w-8 rounded-full border border-espresso/20 flex items-center justify-center shrink-0 group-hover:bg-espresso group-hover:text-white transition-colors">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>

            {/* Cut 3: Essentials */}
            <Link
              to="/collection/essentials"
              className="group bg-white rounded-sm border border-espresso/15 hover:border-espresso/35 p-3.5 transition-all duration-300 shadow-[0_2px_8px_-2px_rgba(36,27,22,0.04)] hover:shadow-[0_12px_24px_-6px_rgba(36,27,22,0.08)] flex flex-col justify-between"
            >
              <div className="relative aspect-[4/5] rounded-[2px] overflow-hidden bg-[#F4EDE4] mb-4">
                <img
                  src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80"
                  alt="Male model in essentials boxy tee"
                  className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  loading="lazy"
                />
                <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-[2px] bg-white/95 border border-espresso/20 font-bold text-[9px] uppercase tracking-[0.14em] text-espresso shadow-xs">
                  ESSENTIALS
                </span>
              </div>
              <div className="flex items-center justify-between px-1">
                <div>
                  <h3 className="font-display font-bold text-base text-espresso group-hover:text-coral transition-colors">
                    Daily Essentials
                  </h3>
                  <p className="text-xs text-espresso/60 font-medium">
                    Unbranded pigment-dyed earth blanks
                  </p>
                </div>
                <div className="h-8 w-8 rounded-full border border-espresso/20 flex items-center justify-center shrink-0 group-hover:bg-espresso group-hover:text-white transition-colors">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. EDITORIAL PHILOSOPHY — REFINED TONAL SPREAD
      ────────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 border-b border-espresso/15 bg-[#BA664F] text-white">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <div className="bg-white rounded-sm border border-espresso/20 text-espresso p-6 sm:p-12 lg:p-16 shadow-[0_20px_40px_-15px_rgba(36,27,22,0.14)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
              {/* Text */}
              <div className="lg:col-span-6 flex flex-col items-start">
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-coral mb-3">
                  ATELIER PHILOSOPHY
                </span>

                <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-espresso mb-4 leading-tight">
                  THE NEW EVERYDAY.
                </h2>

                <p className="font-sans text-sm sm:text-base text-espresso/80 font-normal leading-relaxed mb-8">
                  We design fewer garments with greater care. Sourced from certified long-staple
                  organic cotton with reinforced collar bindings and double-needle seams that hold
                  their shape wash after wash. Made for men who value substance over logos.
                </p>

                <div className="flex items-center gap-4">
                  <Link to="/about" className="retro-btn-primary">
                    <span>ATELIER STORY</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link to="/collection/essentials" className="retro-btn-outline">
                    <span>SHOP ESSENTIALS</span>
                  </Link>
                </div>
              </div>

              {/* Editorial Male Photo */}
              <div className="lg:col-span-6">
                <div className="relative aspect-[16/11] rounded-[2px] border border-espresso/20 overflow-hidden bg-[#F4EDE4]">
                  <img
                    src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=1000&auto=format&fit=crop&q=80"
                    alt="Male model in relaxed streetwear tee"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-[2px] bg-white/95 border border-espresso/15 text-[10px] font-mono uppercase tracking-wider text-espresso">
                    MUMBAI WORKSHOP
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. LOOKBOOK STUDY PREVIEW — MUTED BURGUNDY
      ────────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 border-b border-espresso/15 bg-[#6E3D41] text-white">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <div className="flex items-end justify-between gap-4 mb-8 sm:mb-12 pb-3 border-b border-white/20">
            <div>
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] text-[#FFF1DF]/70 block mb-1">
                EDITORIAL STUDY
              </span>
              <h2 className="font-display font-bold text-2xl sm:text-4xl text-white">
                LOOKBOOK 04
              </h2>
            </div>
            <Link
              to="/lookbook"
              className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#FFF1DF] hover:underline flex items-center gap-1.5"
            >
              <span>EXPLORE ALL LOOKS</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
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
                src: 'https://plus.unsplash.com/premium_photo-1727942419945-1908baae3c8e?q=80&w=735&auto=format&fit=crop',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-sm border border-white/20 text-espresso p-3 shadow-md"
              >
                <div className="relative aspect-[3/4] rounded-[2px] overflow-hidden mb-3 bg-[#F4EDE4]">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="h-full w-full object-cover hover:scale-[1.03] transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-[2px] bg-white/95 border border-espresso/15 text-[9px] font-bold uppercase tracking-[0.14em] text-espresso">
                    {item.look}
                  </span>
                </div>
                <p className="font-display font-bold text-sm text-espresso text-center">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. BRAND STATEMENT — DEEP FOREST (#14382F)
      ────────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 border-b border-espresso/15 bg-[#14382F] text-[#FFF1DF] text-center">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="flex justify-center mb-6">
            <RetroStampBadge className="w-20 h-20 text-[#FFF1DF]/90" centerText="YK" />
          </div>

          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-coral block mb-3">
            YK MENS FASHION ATELIER
          </span>

          <blockquote className="font-serif italic text-2xl sm:text-4xl lg:text-5xl leading-tight text-white mb-6">
            "Clothing designed like an artist's print — honest, weighty, and tailored for men who value substance."
          </blockquote>

          <p className="font-sans text-xs sm:text-sm text-[#FFF1DF]/70 font-normal max-w-md mx-auto leading-relaxed mb-8">
            Independent men's streetwear atelier. Designed and crafted in Mumbai.
          </p>

          <Link
            to="/shop"
            className="retro-btn-primary inline-flex items-center gap-2 !bg-[#FFF1DF] !text-espresso hover:!bg-coral hover:!text-white border-none"
          >
            <span>EXPLORE THE COLLECTION</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. NEWSLETTER — RESTRAINED & COMMERCIAL
      ────────────────────────────────────────────────────────────── */}
      <section className="py-12 sm:py-16 border-b border-espresso/15 bg-[#FFF1DF]">
        <div className="mx-auto max-w-xl px-4 sm:px-6 text-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-coral block mb-2">
            DISPATCH ARCHIVE
          </span>
          <h3 className="font-display font-bold text-2xl sm:text-3xl text-espresso mb-2">
            JOIN THE ATELIER LIST
          </h3>
          <p className="font-sans text-xs sm:text-sm text-espresso/70 mb-6 font-normal">
            Receive private release dates, secret drops, and seasonal lookbook releases.
          </p>

          {newsletterSubmitted ? (
            <div className="p-3.5 rounded-[2px] border border-sage bg-sage/20 text-espresso font-bold text-xs flex items-center justify-center gap-2">
              <Check className="w-4 h-4 stroke-[2.5]" />
              <span>You have joined the Atelier list. Welcome to YK.</span>
            </div>
          ) : (
            <form onSubmit={handleNewsletter} className="flex gap-2 max-w-md mx-auto">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address..."
                required
                className="flex-1 px-4 py-2.5 rounded-[2px] border border-espresso/30 bg-white text-xs font-medium text-espresso placeholder-espresso/40 focus:outline-none focus:border-espresso"
              />
              <button
                type="submit"
                className="retro-btn-primary py-2.5 px-5 text-xs font-bold shrink-0"
              >
                <span>JOIN</span>
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}
