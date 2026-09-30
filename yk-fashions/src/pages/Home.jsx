import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Check, Sparkles, Heart } from 'lucide-react'
import ProductCard from '../components/product/ProductCard.jsx'
import { products, collectionsData } from '../data/products.js'
import { DoodleStar, AnimatedWavyUnderline, RetroStampBadge, EditorialMark } from '../components/common/Doodles.jsx'
import { formatPrice } from '../lib/format.js'
import { useCart } from '../context/CartContext.jsx'

export default function Home() {
  const navigate = useNavigate()
  const { addToCart } = useCart()

  // Featured product spotlight state
  const featuredProduct = products[0]
  const [spotlightSize, setSpotlightSize] = useState('M')
  const [spotlightAdded, setSpotlightAdded] = useState(false)

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false)

  // Hero subtle parallax
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroImageY = useTransform(scrollYProgress, [0, 1], ['0%', '4%'])

  // Curated product slices
  const newArrivals = products.slice(0, 4)
  const essentialsProducts = products.filter((p) => p.collection === 'ESSENTIALS').slice(0, 4)
  const graphicFeatured = products.find((p) => p.slug === 'mens-retro-acid-alien-screenprint-tee') || products[1]

  const handleSpotlightAddToCart = () => {
    addToCart({
      id: featuredProduct.id,
      name: featuredProduct.name,
      price: featuredProduct.price,
      slug: featuredProduct.slug,
      image: featuredProduct.images[0],
      selectedSize: spotlightSize,
      selectedColor: featuredProduct.colors[0],
    })
    setSpotlightAdded(true)
    setTimeout(() => setSpotlightAdded(false), 2000)
  }

  const handleNewsletter = (e) => {
    e.preventDefault()
    if (!newsletterEmail) return
    setNewsletterSubmitted(true)
  }

  return (
    <div className="relative w-full overflow-x-hidden bg-[#FFF1DF] text-espresso">
      {/* ─────────────────────────────────────────────────────────────
          1. HERO CAMPAIGN (Warm Ivory / Cream Canvas: #FFF1DF)
          Mobile: Brand + Image + Clear Message + Shop CTA in first view
          Desktop: Asymmetric high-fashion editorial campaign
      ────────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative pt-4 pb-12 sm:pt-10 sm:pb-20 border-b border-espresso/15 bg-[#FFF1DF] overflow-hidden"
      >
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
            {/* ── Right Column: Large Male Fashion Image ── (shown FIRST on mobile via order) */}
            <motion.div
              style={{ y: heroImageY }}
              className="lg:col-span-5 relative order-first lg:order-last"
            >
              <div className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none bg-white p-2 sm:p-2.5 rounded-sm border border-espresso/20 shadow-[0_16px_36px_-8px_rgba(36,27,22,0.12)]">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2px] bg-[#F4EDE4]">
                  <img
                    src="https://plus.unsplash.com/premium_photo-1727942419945-1908baae3c8e?q=80&w=900&auto=format&fit=crop"
                    alt="Male model wearing YK Mens Fashion heavyweight tee"
                    className="h-full w-full object-cover object-center"
                    loading="eager"
                  />
                </div>
              </div>
            </motion.div>

            {/* ── Left Column: Headline & Actions ── (shown SECOND on mobile) */}
            <div className="lg:col-span-7 flex flex-col items-start z-10 order-last lg:order-first">
              {/* Main Headline */}
              <div className="mb-4 sm:mb-6 mt-2 sm:mt-0">
                <h1 className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.04] tracking-tight text-espresso">
                  MEN'S T-SHIRTS
                  <br />
                  <span className="font-serif italic font-normal text-coral relative inline-block">
                    Built for Everyday.
                    <AnimatedWavyUnderline className="absolute -bottom-1.5 left-0 w-full h-2 sm:h-3 text-coral" delay={0.2} />
                  </span>
                </h1>
              </div>

              {/* Simple supporting text */}
              <p className="font-sans text-xs sm:text-base lg:text-lg text-espresso/75 max-w-xl mb-6 sm:mb-8 leading-relaxed font-normal">
                Heavy 240 GSM organic cotton. Boxy fit. Comfortable all day.
              </p>

              {/* Single primary CTA */}
              <div className="flex flex-row items-center gap-3 w-full sm:w-auto">
                <Link
                  to="/shop"
                  className="retro-btn-primary flex-1 sm:flex-initial"
                >
                  <span>SHOP T-SHIRTS</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/shop?filter=new"
                  className="retro-btn-outline flex-1 sm:flex-initial"
                >
                  <span>NEW ARRIVALS</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. NEW ARRIVALS (Dark Charcoal Canvas: #161311)
          Visual Rhythm: Light Ivory -> Dark Charcoal
          The products pop with high-impact clarity on dark.
      ────────────────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 border-b border-espresso/30 bg-[#161311] text-white">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <div className="flex items-end justify-between gap-4 mb-8 sm:mb-12 pb-3 border-b border-white/15">
            <div>
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-coral block mb-1">
                FRESH IN
              </span>
              <h2 className="font-display font-bold text-2xl sm:text-4xl text-white">
                NEW ARRIVALS
              </h2>
            </div>
            <Link
              to="/shop?filter=new"
              className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white/80 hover:text-coral flex items-center gap-1.5 transition-colors"
            >
              <span>VIEW ALL ({products.length})</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 4-Column Product Grid in Dark Theme */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {newArrivals.map((product, idx) => (
              <ProductCard key={product.id} product={product} index={idx} dark={true} />
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. CATEGORY / SHOP BY STYLE (Warm Terracotta: #B9654E)
          Visual Rhythm: Dark Charcoal -> Rich Terracotta
          Asymmetric editorial layout that also functions as navigation
      ────────────────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 border-b border-espresso/15 bg-[#B9654E] text-white">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <div className="flex items-end justify-between gap-4 mb-8 sm:mb-12 pb-3 border-b border-white/20">
            <div>
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-[#FFF1DF]/75 block mb-1">
                FIND YOUR STYLE
              </span>
              <h2 className="font-display font-bold text-2xl sm:text-4xl text-white">
                SHOP BY STYLE
              </h2>
            </div>
            <Link
              to="/shop"
              className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#FFF1DF] hover:underline flex items-center gap-1"
            >
              <span>ALL COLLECTIONS</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Asymmetric Category Composition */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left Dominant Feature: Oversized Series (7 cols) */}
            <Link
              to="/collection/oversized"
              className="lg:col-span-7 group relative rounded-sm overflow-hidden bg-[#241B16] border border-white/20 min-h-[380px] sm:min-h-[460px] flex flex-col justify-end p-6 sm:p-10 shadow-lg"
            >
              <img
                src="https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=1200&auto=format&fit=crop&q=80"
                alt="Male model wearing oversized streetwear tee"
                className="absolute inset-0 h-full w-full object-cover object-center opacity-80 group-hover:scale-[1.03] transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

              <div className="relative z-10">
                <span className="inline-block px-2.5 py-0.5 rounded-[2px] bg-white text-espresso text-[9px] font-bold uppercase tracking-[0.16em] mb-3 shadow-xs">
                  BESTSELLER
                </span>
                <h3 className="font-display font-bold text-2xl sm:text-4xl text-white mb-2 leading-tight">
                  OVERSIZED SERIES
                </h3>
                <p className="font-sans text-xs sm:text-sm text-white/80 max-w-md mb-4 font-normal">
                  Dropped shoulders, wide reinforced collar, and 240 GSM organic drape engineered for men.
                </p>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-coral group-hover:translate-x-1 transition-transform">
                  <span>EXPLORE OVERSIZED</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>

            {/* Right Stack: Graphic Prints & Essentials (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Graphic Series */}
              <Link
                to="/collection/graphic"
                className="group relative rounded-sm overflow-hidden bg-[#241B16] border border-white/20 flex-1 min-h-[200px] sm:min-h-[220px] flex flex-col justify-end p-5 sm:p-6 shadow-md"
              >
                <img
                  src="https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=900&auto=format&fit=crop&q=80"
                  alt="Male model wearing graphic streetwear tee"
                  className="absolute inset-0 h-full w-full object-cover object-center opacity-75 group-hover:scale-[1.03] transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                <div className="relative z-10">
                  <span className="inline-block px-2 py-0.5 rounded-[2px] bg-coral text-white text-[9px] font-bold uppercase tracking-[0.16em] mb-2">
                    LIMITED EDITIONS
                  </span>
                  <h4 className="font-display font-bold text-xl sm:text-2xl text-white mb-1">
                    GRAPHIC PRINTS
                  </h4>
                  <p className="font-sans text-xs text-white/80 mb-2">
                    Hand-pulled silkscreen artwork in limited batch runs.
                  </p>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#FFF1DF]">
                    <span>VIEW GRAPHICS</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>

              {/* Essentials Series */}
              <Link
                to="/collection/essentials"
                className="group relative rounded-sm overflow-hidden bg-[#241B16] border border-white/20 flex-1 min-h-[200px] sm:min-h-[220px] flex flex-col justify-end p-5 sm:p-6 shadow-md"
              >
                <img
                  src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=900&auto=format&fit=crop&q=80"
                  alt="Male model wearing daily essential tee"
                  className="absolute inset-0 h-full w-full object-cover object-center opacity-75 group-hover:scale-[1.03] transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                <div className="relative z-10">
                  <span className="inline-block px-2 py-0.5 rounded-[2px] bg-white text-espresso text-[9px] font-bold uppercase tracking-[0.16em] mb-2">
                    DAILY ROTATION
                  </span>
                  <h4 className="font-display font-bold text-xl sm:text-2xl text-white mb-1">
                    DAILY ESSENTIALS
                  </h4>
                  <p className="font-sans text-xs text-white/80 mb-2">
                    Unbranded pigment-dyed earth blanks for everyday wear.
                  </p>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#FFF1DF]">
                    <span>VIEW ESSENTIALS</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. FEATURED PRODUCT SPOTLIGHT (Deep Forest Green: #14382F)
          Visual Rhythm: Terracotta -> Deep Forest Green
          Editorial storytelling + full e-commerce utility right on the page
      ────────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 border-b border-espresso/20 bg-[#14382F] text-white">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <div className="bg-[#1C4239] rounded-sm border border-white/15 p-6 sm:p-12 lg:p-16 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
              {/* Left: Full Male Model Spotlight Imagery */}
              <div className="lg:col-span-6 relative">
                <div className="relative aspect-[4/5] rounded-[2px] overflow-hidden bg-black/40 border border-white/20 shadow-md">
                  <img
                    src={featuredProduct.images[0]}
                    alt={featuredProduct.name}
                    className="h-full w-full object-cover object-center"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-[2px] bg-black/75 border border-white/20 text-[9px] font-mono uppercase tracking-wider text-white">
                    SIGNATURE HEAVYWEIGHT
                  </div>
                </div>
              </div>

              {/* Right: Product Buy Box on Forest */}
              <div className="lg:col-span-6 flex flex-col items-start">
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-[2px] border border-coral/40 bg-coral/10 text-coral text-[10px] font-bold uppercase tracking-[0.18em] mb-3">
                  <Sparkles className="w-3 h-3" />
                  FEATURED TEE
                </div>

                <h2 className="font-display font-bold text-2xl sm:text-4xl lg:text-5xl text-white mb-3 leading-tight tracking-tight">
                  THE HEAVYWEIGHT TEE
                </h2>

                <div className="flex items-baseline gap-3 mb-5">
                  <span className="font-sans font-bold text-2xl sm:text-3xl text-white">
                    {formatPrice(featuredProduct.price)}
                  </span>
                  <span className="text-xs font-normal text-white/50 line-through">
                    {formatPrice(Math.round(featuredProduct.price * 1.35))}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal px-2 py-0.5 rounded-[2px] border border-teal/40 bg-teal/10">
                    IN STOCK
                  </span>
                </div>

                <p className="font-sans text-xs sm:text-sm text-white/80 leading-relaxed font-normal mb-6">
                  {featuredProduct.description}
                </p>

                {/* Interactive Size Selector */}
                <div className="w-full mb-6">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-white/70 block mb-2">
                    SELECT SIZE (MEN'S BOXY FIT):
                  </span>
                  <div className="grid grid-cols-6 gap-2">
                    {featuredProduct.sizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSpotlightSize(sz)}
                        className={`py-2 rounded-[2px] font-sans font-bold text-xs uppercase tracking-wider transition-all ${
                          spotlightSize === sz
                            ? 'bg-white text-espresso border border-white shadow-sm'
                            : 'bg-white/10 text-white border border-white/20 hover:border-white/40'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Direct Add to Bag CTA */}
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
                  <button
                    onClick={handleSpotlightAddToCart}
                    className={`retro-btn-primary flex-1 w-full sm:w-auto !bg-white !text-espresso hover:!bg-coral hover:!text-white border-none flex items-center justify-center gap-2 ${
                      spotlightAdded ? '!bg-sage !text-espresso' : ''
                    }`}
                  >
                    {spotlightAdded ? (
                      <>
                        <Check className="w-4 h-4 stroke-[2.5]" />
                        <span>ADDED TO BAG!</span>
                      </>
                    ) : (
                      <>
                        <span>ADD TO BAG</span>
                        <span>•</span>
                        <span>{formatPrice(featuredProduct.price)}</span>
                      </>
                    )}
                  </button>

                  <Link
                    to={`/product/${featuredProduct.slug}`}
                    className="w-full sm:w-auto px-5 py-3 rounded-[2px] border border-white/30 text-white font-sans font-bold text-xs uppercase tracking-wider hover:bg-white/10 text-center transition-colors"
                  >
                    VIEW PRODUCT DETAILS
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. ARTISAN GRAPHIC DROP (Muted Teal: #386E66)
          Visual Rhythm: Forest Green -> Muted Teal
          Silk-screen print art direction showcase
      ────────────────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 border-b border-espresso/20 bg-[#386E66] text-white">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Story & Details */}
            <div className="lg:col-span-6 flex flex-col items-start">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FFF1DF]/75 block mb-2">
                GRAPHIC TEES
              </span>

              <h2 className="font-display font-bold text-3xl sm:text-5xl text-white mb-4 leading-tight tracking-tight">
                HAND-PULLED
                <br />
                <span className="font-serif italic font-normal text-coral">
                  Graphic Tees.
                </span>
              </h2>

              <p className="font-sans text-xs sm:text-sm text-white/80 leading-relaxed font-normal mb-6">
                Original graphics created in limited numbered runs. We mix custom water-based pigments
                that soak directly into the cotton fibers rather than sitting like plastic film.
                Soft to the touch from day one.
              </p>

              <div className="flex items-center gap-4">
                <Link
                  to="/collection/graphic"
                  className="retro-btn-primary !bg-white !text-espresso hover:!bg-coral hover:!text-white border-none flex items-center gap-1.5"
                >
                  <span>SHOP GRAPHIC TEES</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Featured Graphic Photography */}
            <div className="lg:col-span-6">
              <div className="relative aspect-[16/11] rounded-sm overflow-hidden bg-black/30 border border-white/20 shadow-lg">
                <img
                  src={graphicFeatured.images[0]}
                  alt="Graphic Streetwear Tee"
                  className="h-full w-full object-cover object-center"
                  loading="lazy"
                />
                <div className="absolute bottom-3 left-3 px-3 py-1 rounded-[2px] bg-black/80 border border-white/20 text-xs font-bold text-white flex items-center gap-2">
                  <span>{graphicFeatured.name}</span>
                  <span className="text-coral">•</span>
                  <span>{formatPrice(graphicFeatured.price)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. CURATED PRODUCT GRID (Warm Light Cream Canvas: #FFF1DF)
          Visual Rhythm: Muted Teal -> Warm Cream
          Dominant, effortless e-commerce browsing of daily blanks
      ────────────────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 border-b border-espresso/15 bg-[#FFF1DF]">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <div className="flex items-end justify-between gap-4 mb-8 sm:mb-12 pb-3 border-b border-espresso/10">
            <div>
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] text-coral block mb-1">
                DAILY UNIFORM
              </span>
              <h2 className="font-display font-bold text-2xl sm:text-4xl text-espresso">
                DAILY ESSENTIALS
              </h2>
            </div>
            <Link
              to="/collection/essentials"
              className="text-xs sm:text-sm font-bold uppercase tracking-wider text-espresso hover:text-coral flex items-center gap-1.5 transition-colors"
            >
              <span>VIEW ALL ESSENTIALS</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {essentialsProducts.map((product, idx) => (
              <ProductCard key={product.id} product={product} index={idx} dark={false} />
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. LOOKBOOK / FASHION EDITORIAL (Muted Burgundy: #633337)
          Visual Rhythm: Warm Cream -> Muted Burgundy
          Magazine inspired spread with overlapping images and look numbers
      ────────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 border-b border-espresso/20 bg-[#633337] text-white">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <div className="flex items-end justify-between gap-4 mb-10 sm:mb-14 pb-3 border-b border-white/20">
            <div>
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-[#FFF1DF]/75 block mb-1">
                STYLE INSPIRATION
              </span>
              <h2 className="font-display font-bold text-2xl sm:text-4xl text-white">
                STYLE INSPIRATION
              </h2>
            </div>
            <Link
              to="/lookbook"
              className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#FFF1DF] hover:underline flex items-center gap-1"
            >
              <span>VIEW ALL STYLES</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Editorial 3-Look Visual Composition */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                look: 'LOOK 01',
                title: 'Oversized Style',
                piece: "Men's Heavyweight Studio Oversized Tee",
                slug: 'mens-heavyweight-studio-oversized-tee',
                src: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=900&auto=format&fit=crop&q=80',
              },
              {
                look: 'LOOK 02',
                title: 'Mineral Pigment Dye',
                piece: "Men's Terra Cotta Boxy Pocket Tee",
                slug: 'mens-terra-cotta-boxy-pocket-tee',
                src: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=900&auto=format&fit=crop&q=80',
              },
              {
                look: 'LOOK 03',
                title: 'Street Layering',
                piece: "Men's Washed Charcoal Oversized Raglan",
                slug: 'mens-washed-charcoal-oversized-raglan',
                src: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=900&auto=format&fit=crop&q=80',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-sm border border-white/20 p-3 sm:p-4 text-espresso shadow-lg flex flex-col justify-between"
              >
                <div className="relative aspect-[3/4] rounded-[2px] overflow-hidden bg-[#F4EDE4] mb-3">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="h-full w-full object-cover hover:scale-[1.03] transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-[2px] bg-white/95 border border-espresso/15 text-[9px] font-bold uppercase tracking-wider text-espresso">
                    {item.look}
                  </span>
                </div>

                <div className="px-1 pt-1 flex items-center justify-between">
                  <div>
                    <h4 className="font-display font-medium text-sm text-espresso">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-espresso/60 font-medium">
                      {item.piece}
                    </p>
                  </div>
                  <Link
                    to={`/product/${item.slug}`}
                    className="h-8 w-8 rounded-full border border-espresso/20 flex items-center justify-center hover:bg-espresso hover:text-white transition-colors shrink-0"
                    aria-label={`Shop ${item.piece}`}
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          8. BRAND STORY / CRAFT ETHOS (Deep Espresso Charcoal: #1C1613)
          Visual Rhythm: Muted Burgundy -> Deep Espresso
          Authoritative, confident fashion manifesto
      ────────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 border-b border-espresso/20 bg-[#1C1613] text-[#FFF1DF] text-center">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="flex justify-center mb-6">
            <RetroStampBadge className="w-20 h-20 text-[#FFF1DF]" centerText="YK" />
          </div>

          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-coral block mb-3">
            ABOUT YK
          </span>

          <blockquote className="font-serif italic text-2xl sm:text-4xl lg:text-5xl leading-tight text-white mb-6">
            "Clothing designed like an artist's print — honest, weighty, and tailored for men who value substance."
          </blockquote>

          <p className="font-sans text-xs sm:text-sm text-[#FFF1DF]/75 font-normal max-w-md mx-auto leading-relaxed mb-8">
            Independent men's fashion brand from Mumbai. Made with combed long-staple cotton
            and reinforced collar bindings that hold their shape wash after wash.
          </p>

          <Link
            to="/about"
            className="retro-btn-outline !border-white/30 !text-white hover:!bg-white hover:!text-espresso inline-flex items-center gap-2"
          >
            <span>ABOUT OUR BRAND</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          9. FINAL SHOP CTA BANNER (High-Energy Coral: #D96B5F)
          Visual Rhythm: Deep Espresso -> Rich Coral
          Compelling, energetic entry into the full shopping experience
      ────────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 border-b border-espresso/20 bg-[#D96B5F] text-white text-center">
        <div className="mx-auto max-w-2xl px-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/80 block mb-2">
            READY TO SHOP?
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white mb-4 tracking-tight">
            SHOP ALL MEN'S T-SHIRTS
          </h2>
          <p className="font-sans text-xs sm:text-sm text-white/90 font-normal max-w-md mx-auto mb-8 leading-relaxed">
            All our t-shirts and graphic editions are in stock. Fast delivery across India.
          </p>
          <Link
            to="/shop"
            className="retro-btn-primary !bg-[#161311] !text-white hover:!bg-white hover:!text-espresso border-none inline-flex items-center gap-2 px-8 py-3.5 text-xs font-bold"
          >
            <span>SHOP ALL T-SHIRTS</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          10. NEWSLETTER STRIP (Warm Ivory: #FFF1DF)
          Clean, honest subscription before the footer
      ────────────────────────────────────────────────────────────── */}
      <section className="py-12 sm:py-16 border-b border-espresso/15 bg-[#FFF1DF]">
        <div className="mx-auto max-w-xl px-4 sm:px-6 text-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-coral block mb-2">
            STAY UPDATED
          </span>
          <h3 className="font-display font-bold text-xl sm:text-3xl text-espresso mb-2">
            GET NEW ARRIVALS FIRST
          </h3>
          <p className="font-sans text-xs sm:text-sm text-espresso/70 mb-6 font-normal">
            Be first to know about new arrivals, restocks, and exclusive offers.
          </p>

          {newsletterSubmitted ? (
            <div className="p-3.5 rounded-[2px] border border-sage bg-sage/20 text-espresso font-bold text-xs flex items-center justify-center gap-2">
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
