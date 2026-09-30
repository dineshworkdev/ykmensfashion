import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Sparkles, Check, Shirt, Palette, Layers, Flame, ShieldCheck } from 'lucide-react'
import ProductCard from '../components/product/ProductCard.jsx'
import { products } from '../data/products.js'
import {
  AnimatedSketchArrow,
  AnimatedCurvedDoodleArrow,
  DoodleStar,
  WavyUnderline,
  AnimatedWavyUnderline,
  RetroStampBadge,
} from '../components/common/Doodles.jsx'
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

  const heroImageY = useTransform(scrollYProgress, [0, 1], ['0%', '10%'])
  const heroTextY = useTransform(scrollYProgress, [0, 1], ['0%', '5%'])

  // 4 products for New Arrivals (all men's streetwear)
  const newArrivals = products.slice(0, 4)
  // Featured hero product
  const featuredProduct = products[0]

  const handleNewsletter = (e) => {
    e.preventDefault()
    if (!newsletterEmail) return
    setNewsletterSubmitted(true)
  }

  return (
    <div className="relative overflow-hidden bg-[#FFF1DF]">
      {/* ─────────────────────────────────────────────────────────────
          1. ART-DIRECTED RETRO HERO: "A MOVING MEN'S FASHION POSTER"
          Layered color composition: Warm cream base, terracotta backing block,
          teal graphic accents, butter yellow badges, dark typography.
      ────────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative pt-8 pb-14 sm:pt-12 sm:pb-20 border-b-3 border-espresso bg-[#FFF1DF] overflow-hidden"
      >
        {/* Subtle decorative background floating doodles */}
        <div className="absolute top-12 left-[5%] opacity-40 pointer-events-none hidden sm:block">
          <DoodleStar className="w-8 h-8 text-butter" />
        </div>
        <div className="absolute top-36 right-[4%] opacity-40 pointer-events-none hidden md:block">
          <DoodleStar className="w-10 h-10 text-coral" />
        </div>
        <div className="absolute bottom-12 left-[3%] opacity-35 pointer-events-none hidden lg:block">
          <DoodleStar className="w-7 h-7 text-burnt-orange" />
        </div>

        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* ── Left Column: Editorial Headline & Copy ── */}
            <motion.div
              style={{ y: heroTextY }}
              className="lg:col-span-7 flex flex-col items-start z-10"
            >
              {/* Drop Tag Pill with Live Pulse */}
              <motion.div
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border-2 border-espresso bg-butter shadow-[2px_2px_0px_#241B16] mb-5"
              >
                <span className="h-2 w-2 rounded-full bg-coral animate-ping" />
                <span className="text-xs font-black uppercase tracking-wider text-espresso">
                  MEN'S DROP 04 • SPRING ARCHIVE 2026
                </span>
                <Sparkles className="w-3.5 h-3.5 text-espresso" />
              </motion.div>

              {/* Main Headline — Line-by-line staggered reveal */}
              <div className="overflow-hidden mb-4">
                <motion.h1
                  initial={{ opacity: 0, y: 35 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="font-display font-black text-4xl sm:text-6xl xl:text-7xl leading-[1.01] tracking-tight text-espresso"
                >
                  MEN'S STREETWEAR{' '}
                  <span className="relative inline-block text-coral">
                    CRAFTED HEAVY.
                    <AnimatedWavyUnderline className="absolute -bottom-2 left-0 w-full h-3 sm:h-4 text-butter" delay={0.4} />
                  </span>
                  <br />
                  <span className="relative inline-block text-espresso mt-1">
                    WEAR THE ART.
                    <span className="absolute -top-3 -right-6 hidden sm:block">
                      <DoodleStar className="w-7 h-7 text-butter" />
                    </span>
                  </span>
                </motion.h1>
              </div>

              {/* Supporting Editorial Paragraph */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="font-sans text-base sm:text-lg text-espresso/85 max-w-xl mb-8 leading-relaxed font-medium"
              >
                Dense 240 GSM organic tees engineered with dropped shoulders and
                architectural boxy drape. Hand-pulled silkscreens and mineral wash
                patinas built for men who appreciate authentic craft.
              </motion.p>

              {/* CTA Buttons with Retro Hard Shadows */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-wrap items-center gap-4 mb-8 w-full sm:w-auto"
              >
                <Link
                  to="/shop"
                  className="retro-btn-primary group w-full sm:w-auto text-center flex items-center justify-center gap-2"
                >
                  <span>SHOP MEN'S DROP</span>
                  <AnimatedSketchArrow className="w-7 h-4 text-white group-hover:translate-x-1.5 transition-transform" delay={0.6} />
                </Link>

                <Link
                  to="/lookbook"
                  className="retro-btn-outline group w-full sm:w-auto text-center flex items-center justify-center gap-2"
                >
                  <span>EXPLORE LOOKBOOK</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>

              {/* Feature Bullet Badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.45 }}
                className="flex flex-wrap items-center gap-2 sm:gap-3 pt-4 border-t-2 border-dashed border-espresso/25 w-full"
              >
                <span className="retro-pill bg-white">
                  <span className="h-2 w-2 rounded-full bg-sage" />
                  240 GSM HEAVYWEIGHT
                </span>
                <span className="retro-pill bg-white">
                  <span className="h-2 w-2 rounded-full bg-butter" />
                  MEN'S BOXY DRAPE
                </span>
                <span className="retro-pill bg-white">
                  <span className="h-2 w-2 rounded-full bg-coral" />
                  HAND-PULLED INKS
                </span>
                <span className="retro-pill bg-white">
                  <span className="h-2 w-2 rounded-full bg-burnt-orange" />
                  PRE-SHRUNK
                </span>
              </motion.div>
            </motion.div>

            {/* ── Right Column: Art-Directed Men's Poster Card with Layered Depth ── */}
            <motion.div
              style={{ y: heroImageY }}
              initial={{ opacity: 0, scale: 0.94, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5 relative"
            >
              {/* Layer 1: Terracotta Colored Editorial Backdrop Block (Adds Poster Depth) */}
              <div className="absolute -inset-3 sm:-inset-4 rounded-3xl bg-[#B9654E] border-3 border-espresso shadow-retro-xl rotate-1 hidden sm:block" />

              {/* Layer 2: Muted Teal Accent Graphic Strip Behind Card */}
              <div className="absolute -top-5 -right-3 w-28 h-10 rounded-xl bg-[#4F8F87] border-2 border-espresso shadow-[2px_2px_0px_#241B16] -rotate-3 z-0 hidden md:flex items-center justify-center">
                <span className="font-display font-black text-[10px] text-white uppercase tracking-widest">
                  EDITION 150
                </span>
              </div>

              {/* Layer 3: Main White Framed Poster Frame */}
              <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl border-3 border-espresso bg-white p-3 sm:p-4 shadow-retro-xl z-10">
                {/* Top Card Bar */}
                <div className="flex items-center justify-between pb-3 px-2 border-b-2 border-espresso/15 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="h-3.5 w-3.5 rounded-full border-2 border-espresso bg-coral" />
                    <span className="h-3.5 w-3.5 rounded-full border-2 border-espresso bg-butter" />
                    <span className="h-3.5 w-3.5 rounded-full border-2 border-espresso bg-teal" />
                  </div>
                  <span className="font-sans text-[11px] font-black uppercase tracking-wider text-espresso/70">
                    MEN'S CAMPAIGN PLATE #01
                  </span>
                </div>

                {/* Hero Men's Fashion Image (100% Male Streetwear Model) */}
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border-2 border-espresso bg-cream-dark">
                  <motion.img
                    src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=1200&auto=format&fit=crop&q=85"
                    alt="Male model wearing YK Mens Fashion heavyweight oversized streetwear tee"
                    className="h-full w-full object-cover object-center"
                    loading="eager"
                    initial={{ scale: 1.05 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  />

                  {/* Top-Right Floating Stamp */}
                  <div className="absolute top-3 right-3 z-10 hidden sm:block">
                    <RetroStampBadge className="w-20 h-20 bg-cream/95 backdrop-blur-xs rounded-full border-2 border-espresso shadow-retro" />
                  </div>

                  {/* Top-Left Streetwear Tag */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-2.5 py-1 rounded-md border-2 border-espresso bg-butter font-display font-black text-[10px] text-espresso uppercase shadow-[2px_2px_0px_#241B16]">
                      MEN'S FIT: BOXY OVERSIZED
                    </span>
                  </div>

                  {/* Bottom Floating Interactive Product Info Bar */}
                  <div className="absolute inset-x-3 bottom-3 p-3.5 rounded-xl border-2 border-espresso bg-[#FFF1DF]/95 backdrop-blur-sm shadow-retro">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-coral block">
                          BESTSELLER DROP
                        </span>
                        <h4 className="font-display font-extrabold text-sm text-espresso line-clamp-1">
                          {featuredProduct.name}
                        </h4>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="font-display font-black text-base text-espresso block">
                          {formatPrice(featuredProduct.price)}
                        </span>
                        <Link
                          to={`/product/${featuredProduct.slug}`}
                          className="text-[10px] font-black uppercase tracking-wider text-espresso underline hover:text-coral flex items-center gap-0.5 justify-end"
                        >
                          <span>EXPLORE</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Sub-Banner with sketch arrow */}
                <div className="mt-3 pt-2 flex items-center justify-between text-xs px-2">
                  <span className="font-hand text-xl text-terracotta flex items-center gap-1.5">
                    <span>1.25" Reinforced collar & dropped seams</span>
                    <AnimatedSketchArrow className="w-6 h-3 text-terracotta inline" delay={0.8} />
                  </span>
                  <span className="text-[11px] font-bold text-espresso/60">
                    Numbered 150 pcs
                  </span>
                </div>
              </div>

              {/* Floating Sketch Annotation */}
              <div className="absolute -bottom-6 -left-6 hidden xl:block z-20">
                <div className="p-3.5 rounded-2xl border-2 border-espresso bg-butter shadow-retro text-center">
                  <span className="font-hand text-xl text-espresso block leading-tight">
                    "The holy grail of men's heavy tees."
                  </span>
                  <span className="text-[9px] font-black tracking-widest text-espresso/70 uppercase">
                    — Men's Streetwear Review
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. COLOR BLOCK 1: DEEP MUTED TEAL SECTION — "CURATED MEN'S SILHOUETTES"
          (Provides strong color contrast and zero emojis, using Lucide icons)
      ────────────────────────────────────────────────────────────── */}
      <section className="py-12 sm:py-16 bg-[#4F8F87] border-b-3 border-espresso text-white relative">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/40 bg-white/10 text-[10px] font-black uppercase tracking-widest text-butter mb-2">
                <Sparkles className="w-3 h-3" />
                <span>CURATED MEN'S ARCHIVE</span>
              </div>
              <h2 className="font-display font-black text-2xl sm:text-4xl text-white">
                Browse Men's Cuts & Silhouettes
              </h2>
            </div>
            <Link
              to="/shop"
              className="text-xs font-black uppercase tracking-wider text-butter hover:underline self-start md:self-auto flex items-center gap-1.5"
            >
              <span>VIEW ALL {products.length} PIECES</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Grid of category pill cards with circular colorful Lucide icons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {[
              {
                title: "Men's Oversized",
                count: '5 Styles',
                icon: Shirt,
                color: 'bg-butter text-espresso',
                link: '/collection/oversized',
              },
              {
                title: 'Graphic Drops',
                count: '4 Prints',
                icon: Palette,
                color: 'bg-coral text-white',
                link: '/collection/graphic',
              },
              {
                title: 'Daily Essentials',
                count: '4 Blanks',
                icon: Layers,
                color: 'bg-[#FFF1DF] text-espresso',
                link: '/collection/essentials',
              },
              {
                title: 'Washed Patina',
                count: 'Mineral Dye',
                icon: Flame,
                color: 'bg-burnt-orange text-white',
                link: '/shop',
              },
              {
                title: 'Complete Drop',
                count: 'All Men’s Pieces',
                icon: Sparkles,
                color: 'bg-dusty-blue text-white',
                link: '/shop',
              },
            ].map((cat, i) => {
              const IconComp = cat.icon
              return (
                <Link
                  key={i}
                  to={cat.link}
                  className="group flex items-center gap-3 p-3.5 rounded-2xl border-2 border-espresso bg-white text-espresso shadow-retro hover:-translate-y-1 hover:shadow-retro-md transition-all"
                >
                  <div
                    className={`flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full border-2 border-espresso ${cat.color} shadow-[1px_1px_0px_#241B16] group-hover:scale-105 transition-transform`}
                  >
                    <IconComp className="w-5 h-5" strokeWidth={2.5} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-display font-bold text-sm text-espresso leading-tight truncate group-hover:text-coral transition-colors">
                      {cat.title}
                    </h4>
                    <p className="text-[11px] font-medium text-espresso/60 mt-0.5 truncate">
                      {cat.count}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. NEW ARRIVALS — 4 MEN'S STREETWEAR PRODUCTS
      ────────────────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 border-b-3 border-espresso bg-[#FFF1DF]">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-espresso bg-coral text-white text-[10px] font-black uppercase tracking-wider mb-2">
                <DoodleStar className="w-3 h-3 text-butter" />
                MEN'S DROP 04 • FRESH OFF THE PRESS
              </div>
              <h2 className="font-display font-black text-3xl sm:text-5xl text-espresso">
                NEW ARRIVALS
              </h2>
            </div>
            <Link
              to="/shop"
              className="retro-btn-outline text-xs self-start sm:self-auto flex items-center gap-2"
            >
              <span>SEE FULL CATALOGUE</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 4 Men's Products Grid with staggered entry */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product, idx) => (
              <ProductCard key={product.id} product={product} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. COLOR BLOCK 2: BURNT ORANGE EDITORIAL — "THE NEW EVERYDAY"
          (Bold burnt orange section with clean cream inner panel)
      ────────────────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 border-b-3 border-espresso bg-[#C96845] text-white">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <div className="rounded-3xl border-3 border-espresso bg-[#FFF1DF] text-espresso p-6 sm:p-10 lg:p-14 shadow-retro-xl relative overflow-hidden">
            {/* Background Stamp */}
            <div className="absolute -top-12 -right-12 opacity-15 pointer-events-none hidden sm:block">
              <RetroStampBadge className="w-56 h-56" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Big typography & story */}
              <div className="lg:col-span-6 flex flex-col items-start z-10">
                <span className="retro-pill bg-butter text-espresso mb-4">
                  <span className="h-2 w-2 rounded-full bg-coral" />
                  MEN'S CRAFT MANIFESTO
                </span>

                <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-espresso leading-[1.05] mb-6">
                  THE NEW{' '}
                  <span className="relative inline-block text-burnt-orange">
                    EVERYDAY.
                    <WavyUnderline className="absolute -bottom-2 left-0 w-full h-3 text-butter" />
                  </span>
                </h2>

                <p className="font-sans text-base sm:text-lg text-espresso/80 font-medium leading-relaxed mb-6">
                  We refused to make flimsy disposable men's t-shirts. Each piece is milled
                  from sustainably cultivated long-staple organic cotton, stone-washed
                  for tactile softness, and built with double-needle hems that
                  refuse to curl or twist in the wash.
                </p>

                {/* Hand-drawn editorial annotations */}
                <div className="p-4 rounded-2xl border-2 border-dashed border-espresso bg-white/80 mb-8 w-full max-w-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="font-hand text-2xl text-coral block">
                        240 GSM
                      </span>
                      <span className="text-xs font-bold text-espresso/70 uppercase">
                        Heavyweight drape that stays structured
                      </span>
                    </div>
                    <div>
                      <span className="font-hand text-2xl text-teal block">
                        Zero Shrink
                      </span>
                      <span className="text-xs font-bold text-espresso/70 uppercase">
                        Pre-washed with organic enzymes
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <Link to="/about" className="retro-btn-primary flex items-center gap-2">
                    <span>OUR CRAFT STORY</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link to="/collection/essentials" className="retro-btn-outline">
                    <span>SHOP ESSENTIALS</span>
                  </Link>
                </div>
              </div>

              {/* Right Column: Male model in street setting */}
              <div className="lg:col-span-6 relative">
                <div className="relative rounded-2xl border-3 border-espresso bg-white p-3 shadow-retro-lg overflow-hidden">
                  <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-xl border-2 border-espresso overflow-hidden bg-cream-dark">
                    <img
                      src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=1000&auto=format&fit=crop&q=80"
                      alt="Male model in relaxed streetwear tee"
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-lg border-2 border-espresso bg-butter font-display font-black text-xs text-espresso shadow-[2px_2px_0px_#241B16]">
                      YK MENS FASHION • STUDIO DROP 04
                    </div>
                  </div>
                </div>

                {/* Animated Curved Arrow Pointing to image */}
                <div className="absolute -bottom-8 -left-6 hidden sm:block">
                  <AnimatedCurvedDoodleArrow className="w-16 h-14 text-coral" delay={0.4} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. THREE DISTINCT MEN'S COLLECTIONS (Varied proportions & styles)
      ────────────────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 border-b-3 border-espresso bg-[#FFF1DF]">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="retro-pill bg-butter mb-3">
              ✦ THREE DISTINCT ENVIRONMENTS ✦
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-espresso mb-3">
              THE COLLECTIONS
            </h2>
            <p className="font-sans text-sm sm:text-base text-espresso/70 font-medium">
              Three tailored men's silhouettes designed for street, studio, and daily rotation.
            </p>
          </div>

          {/* 3 Asymmetric Collection Cards */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            {/* Card 1: OVERSIZED (Tall / 5 cols) — Butter Theme */}
            <div className="md:col-span-5">
              <Link
                to="/collection/oversized"
                className="group retro-card bg-[#FDF6EE] p-4 sm:p-5 flex flex-col justify-between h-full overflow-hidden hover:bg-butter/20 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 rounded-full border-2 border-espresso bg-butter font-bold text-[11px] text-espresso uppercase shadow-[2px_2px_0px_#241B16]">
                      OVERSIZED
                    </span>
                    <span className="text-xs font-bold text-espresso/60">
                      5 PIECES
                    </span>
                  </div>
                  <h3 className="font-display font-black text-2xl sm:text-3xl text-espresso mb-2 group-hover:text-coral transition-colors">
                    ROOM TO BREATHE.
                  </h3>
                  <p className="text-xs sm:text-sm text-espresso/70 mb-4 font-medium">
                    Dropped shoulders, relaxed chest, heavy drape that hangs clean on male frames.
                  </p>
                </div>

                <div className="relative aspect-[3/4] w-full rounded-2xl border-2 border-espresso overflow-hidden bg-cream-dark mt-2">
                  <img
                    src="https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80"
                    alt="Male model in oversized streetwear tee"
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl border-2 border-espresso bg-white font-bold text-xs text-espresso shadow-[2px_2px_0px_#241B16] flex items-center gap-1.5">
                    <span>EXPLORE OVERSIZED</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            </div>

            {/* Right Side: 2 stacked cards (7 cols) */}
            <div className="md:col-span-7 flex flex-col gap-6">
              {/* Card 2: GRAPHIC (Horizontal) — Dusty Blue Theme */}
              <Link
                to="/collection/graphic"
                className="group retro-card bg-[#EBF1F5] p-4 sm:p-5 flex flex-col sm:flex-row gap-5 items-center justify-between overflow-hidden hover:bg-[#E0EBF2] transition-colors"
              >
                <div className="flex-1">
                  <span className="px-3 py-1 rounded-full border-2 border-espresso bg-coral text-white font-bold text-[11px] uppercase shadow-[2px_2px_0px_#241B16] inline-block mb-3">
                    GRAPHIC
                  </span>
                  <h3 className="font-display font-black text-2xl text-espresso mb-2 group-hover:text-coral transition-colors">
                    HAND-PULLED INKS.
                  </h3>
                  <p className="text-xs sm:text-sm text-espresso/70 mb-4 font-medium">
                    Vibrant silkscreen prints made in numbered runs with water-based inks on men's heavyweight blanks.
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-xs font-black text-espresso group-hover:translate-x-1 transition-transform">
                    <span>VIEW GRAPHIC DROPS</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>

                <div className="relative w-full sm:w-56 aspect-[4/3] rounded-2xl border-2 border-espresso overflow-hidden bg-cream-dark shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=600&auto=format&fit=crop&q=80"
                    alt="Male model in graphic streetwear tee"
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              </Link>

              {/* Card 3: ESSENTIALS (Horizontal) — Soft Sage Theme */}
              <Link
                to="/collection/essentials"
                className="group retro-card bg-[#F0F5EE] p-4 sm:p-5 flex flex-col sm:flex-row gap-5 items-center justify-between overflow-hidden hover:bg-[#E5ECE2] transition-colors"
              >
                <div className="flex-1">
                  <span className="px-3 py-1 rounded-full border-2 border-espresso bg-teal text-white font-bold text-[11px] uppercase shadow-[2px_2px_0px_#241B16] inline-block mb-3">
                    ESSENTIALS
                  </span>
                  <h3 className="font-display font-black text-2xl text-espresso mb-2 group-hover:text-coral transition-colors">
                    THE DAILY UNIFORM.
                  </h3>
                  <p className="text-xs sm:text-sm text-espresso/70 mb-4 font-medium">
                    Clean, unbranded earth-toned blanks crafted for men's daily rotation and heavy wear.
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-xs font-black text-espresso group-hover:translate-x-1 transition-transform">
                    <span>VIEW ESSENTIAL BLANKS</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>

                <div className="relative w-full sm:w-56 aspect-[4/3] rounded-2xl border-2 border-espresso overflow-hidden bg-cream-dark shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&auto=format&fit=crop&q=80"
                    alt="Male model in essentials boxy tee"
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. COLOR BLOCK 3: DEEP FOREST BRAND STATEMENT (#183D35)
          (High-contrast deep forest green block with warm cream typography)
      ────────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 border-b-3 border-espresso bg-[#183D35] text-[#FFF1DF] text-center relative overflow-hidden">
        {/* Subtle background stars */}
        <div className="absolute top-8 left-[10%] opacity-20 pointer-events-none">
          <DoodleStar className="w-12 h-12 text-butter" />
        </div>
        <div className="absolute bottom-8 right-[10%] opacity-20 pointer-events-none">
          <DoodleStar className="w-10 h-10 text-coral" />
        </div>

        <div className="mx-auto max-w-4xl px-4 sm:px-6 relative z-10">
          <div className="inline-block mb-4">
            <DoodleStar className="w-8 h-8 text-butter mx-auto" />
          </div>

          <p className="text-xs font-black uppercase tracking-widest text-coral mb-4">
            YK MENS FASHION ATELIER PHILOSOPHY
          </p>

          <blockquote className="font-display font-black text-2xl sm:text-4xl md:text-5xl leading-tight text-white mb-8">
            "CLOTHING DESIGNED LIKE AN ARTIST'S PRINT — HONEST, WEIGHTY, AND TAILORED FOR MEN WHO VALUE SUBSTANCE."
          </blockquote>

          <p className="font-sans text-sm sm:text-base text-[#FFF1DF]/80 font-medium max-w-xl mx-auto leading-relaxed mb-6">
            We don't do seasonal clearances or disposable blanks. We design
            fewer garments with greater care, so you can wear them with confidence
            every single day of the year.
          </p>

          <div className="inline-flex items-center gap-2">
            <span className="font-hand text-2xl text-butter">
              Crafted in Mumbai • Worldwide Express Dispatch
            </span>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. COLOR BLOCK 4: MUTED BURGUNDY LOOKBOOK (#754447)
          (Provides the fashion magazine editorial lookbook requested)
      ────────────────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 border-b-3 border-espresso bg-[#754447] text-white">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="retro-pill bg-butter text-espresso mb-2">
                EDITORIAL ARCHIVE
              </span>
              <h2 className="font-display font-black text-3xl sm:text-5xl text-white">
                MEN'S LOOKBOOK 04
              </h2>
            </div>
            <Link to="/lookbook" className="retro-btn-primary self-start sm:self-auto flex items-center gap-2">
              <span>VIEW FULL LOOKBOOK</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Physical magazine collage with 100% male models & cream cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 items-center">
            {/* Image 1: Tall vertical */}
            <div className="lg:col-span-4">
              <div className="retro-card bg-[#FFF1DF] text-espresso p-3 rotate-[-1.5deg] hover:rotate-0 transition-transform shadow-retro-xl">
                <div className="relative aspect-[3/4] rounded-xl border-2 border-espresso overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80"
                    alt="Male model in Look 01"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded bg-butter border border-espresso text-[10px] font-black uppercase text-espresso">
                    LOOK 01
                  </div>
                </div>
                <p className="mt-2.5 font-hand text-xl text-espresso/90 text-center">
                  Oversized Washed Tee in Terracotta
                </p>
              </div>
            </div>

            {/* Image 2: Wide Horizontal Center */}
            <div className="lg:col-span-5">
              <div className="retro-card bg-[#FFF1DF] text-espresso p-3 rotate-[1.5deg] hover:rotate-0 transition-transform shadow-retro-xl">
                <div className="relative aspect-[16/11] rounded-xl border-2 border-espresso overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=900&auto=format&fit=crop&q=80"
                    alt="Male model in Look 02"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded bg-coral border border-espresso text-[10px] font-black uppercase text-white">
                    LOOK 02
                  </div>
                </div>
                <p className="mt-2.5 font-hand text-xl text-espresso/90 text-center">
                  Layered Heavyweight Studio Essentials
                </p>
              </div>
            </div>

            {/* Image 3: Square with annotation stamp */}
            <div className="lg:col-span-3">
              <div className="retro-card bg-[#FFF1DF] text-espresso p-3 rotate-[-2deg] hover:rotate-0 transition-transform shadow-retro-xl">
                <div className="relative aspect-square rounded-xl border-2 border-espresso overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80"
                    alt="Male model in Look 03"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded bg-teal border border-espresso text-[10px] font-black uppercase text-white">
                    LOOK 03
                  </div>
                </div>
                <p className="mt-2.5 font-hand text-xl text-espresso/90 text-center">
                  Boxy Drop 04 Palette Study
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          8. COLOR BLOCK 5: BUTTER YELLOW NEWSLETTER SECTION
      ────────────────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 border-b-3 border-espresso bg-[#F2C94C]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="retro-card bg-white p-6 sm:p-10 text-center relative overflow-hidden shadow-retro-xl">
            <div className="inline-block mb-3">
              <span className="retro-pill bg-coral text-white">
                ✦ INSIDER CLUB ✦
              </span>
            </div>

            <h2 className="font-display font-black text-3xl sm:text-4xl text-espresso mb-3">
              STAY IN THE LOOP
            </h2>

            <p className="font-sans text-sm sm:text-base text-espresso/70 font-medium max-w-md mx-auto mb-6">
              Get early access to secret men's graphic drops, lookbooks, and private studio
              launches before they sell out.
            </p>

            {newsletterSubmitted ? (
              <div className="p-4 rounded-xl border-2 border-espresso bg-sage text-espresso font-bold flex items-center justify-center gap-2">
                <Check className="w-5 h-5 stroke-[2.5]" />
                <span>YOU'RE ON THE LIST! WELCOME TO YK MENS FASHION.</span>
              </div>
            ) : (
              <form
                onSubmit={handleNewsletter}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  required
                  className="flex-1 px-4 py-3 rounded-xl border-2 border-espresso bg-[#FFF1DF] text-espresso placeholder-espresso/50 font-medium text-sm focus:bg-white focus:outline-none"
                />
                <button type="submit" className="retro-btn-primary shrink-0 flex items-center justify-center gap-1.5">
                  <span>JOIN</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            <p className="text-[11px] font-bold text-espresso/50 uppercase tracking-widest mt-4">
              NO SPAM. JUST PURE MEN'S STREETWEAR ARTISTRY.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
