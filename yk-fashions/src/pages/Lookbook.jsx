import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ZoomIn, X, ArrowRight, Sparkles } from 'lucide-react'
import { DoodleStar, WavyUnderline, AnimatedSketchArrow, RetroStampBadge } from '../components/common/Doodles.jsx'

const looks = [
  {
    id: 1,
    title: "Look 01: Men's Oversized Studio Drape",
    piece: "Men's Heavyweight Studio Oversized Tee",
    slug: 'mens-heavyweight-studio-oversized-tee',
    price: '₹1,499',
    note: 'Cut with 240 GSM combed cotton. Natural drape with dropped shoulder seams for men.',
    src: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=1000&auto=format&fit=crop&q=85',
    tag: "MEN'S OVERSIZED • S/S 2026",
    span: 'lg:col-span-8',
    aspect: 'aspect-[16/10]',
    rotate: 'rotate-[-1deg]',
  },
  {
    id: 2,
    title: 'Look 02: Screenprint Graphic Study',
    piece: "Men's Retro Acid Alien Screenprint Tee",
    slug: 'mens-retro-acid-alien-screenprint-tee',
    price: '₹1,799',
    note: 'Hand-pulled water-based inks on butter blank. Soft touch, zero plastic crust.',
    src: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=1000&auto=format&fit=crop&q=80',
    tag: 'LIMITED 150 PCS',
    span: 'lg:col-span-4',
    aspect: 'aspect-[3/4]',
    rotate: 'rotate-[1.5deg]',
  },
  {
    id: 3,
    title: 'Look 03: Mineral Terracotta Wash',
    piece: "Men's Terra Cotta Boxy Pocket Tee",
    slug: 'mens-terra-cotta-boxy-pocket-tee',
    price: '₹1,399',
    note: 'Stone-washed with natural pigment enzymes. Every garment has slight organic variance.',
    src: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=1000&auto=format&fit=crop&q=80',
    tag: 'EARTH TONE BLANK',
    span: 'lg:col-span-5',
    aspect: 'aspect-[4/5]',
    rotate: 'rotate-[1deg]',
  },
  {
    id: 4,
    title: 'Look 04: Studio Workshop Process',
    piece: "Men's Everyday Atelier Essentials",
    slug: 'mens-classic-boxy-blank-in-butter-cream',
    price: '₹1,199',
    note: 'In the cutting room: inspection of 1.25" reinforced collar bindings.',
    src: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1000&auto=format&fit=crop&q=80',
    tag: 'CRAFT ARCHIVE',
    span: 'lg:col-span-7',
    aspect: 'aspect-[16/11]',
    rotate: 'rotate-[-1.5deg]',
  },
  {
    id: 5,
    title: 'Look 05: Layered Street Silhouette',
    piece: "Men's Washed Charcoal Oversized Raglan",
    slug: 'mens-washed-charcoal-oversized-raglan',
    price: '₹1,699',
    note: 'Raglan seams give unrestricted mobility for city skateboarding and studio work.',
    src: 'https://images.unsplash.com/photo-1527010154944-f2241763d806?w=1000&auto=format&fit=crop&q=80',
    tag: 'CHARCOAL SERIES',
    span: 'lg:col-span-6',
    aspect: 'aspect-[4/5]',
    rotate: 'rotate-[-1deg]',
  },
  {
    id: 6,
    title: 'Look 06: Muted Sage Daily Staple',
    piece: "Men's Soft Sage Relaxed Everyday Blank",
    slug: 'mens-soft-sage-relaxed-everyday-blank',
    price: '₹1,299',
    note: "Gentle green dye inspired by dried eucalyptus and river stone on men's boxy blank.",
    src: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=1000&auto=format&fit=crop&q=80',
    tag: 'ORGANIC COTTON',
    span: 'lg:col-span-6',
    aspect: 'aspect-[4/5]',
    rotate: 'rotate-[1.5deg]',
  },
]

export default function Lookbook() {
  const [selectedPhoto, setSelectedPhoto] = useState(null)

  return (
    <div className="bg-[#FFF1DF] min-h-screen">
      {/* ── 1. Magazine Burgundy Header (Sections 6 & 20 Requirement) ────────── */}
      <section className="border-b-3 border-espresso bg-[#754447] text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute top-8 right-[10%] opacity-20 pointer-events-none hidden md:block">
          <RetroStampBadge className="w-48 h-48 text-butter" text="100% HEAVY COTTON • YK MENS FASHION • " />
        </div>

        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 relative z-10">
          <div className="max-w-3xl">
            <span className="retro-pill bg-butter text-white mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              PRINT ISSUE 04 / MEN'S SPRING-SUMMER 2026
            </span>

            <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-white mb-4 leading-[1.04]">
              MEN'S STREETWEAR{' '}
              <span className="relative inline-block text-butter">
                LOOKBOOK.
                <WavyUnderline className="absolute -bottom-2 left-0 w-full h-3 text-coral" />
              </span>
            </h1>

            <p className="font-sans text-base sm:text-lg text-[#FFF1DF]/90 font-medium leading-relaxed max-w-xl">
              Photographed across natural light and raw concrete. An unvarnished
              study of men's boxy drape, mineral wash patina, and everyday movement.
            </p>
          </div>
        </div>
      </section>

      {/* ── 2. Magazine Collage Grid ─────────────────────────── */}
      <section className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 py-14 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {looks.map((look) => (
            <motion.div
              key={look.id}
              className={`${look.span} relative group`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6 }}
            >
              {/* Retro Framed Polaroid / Look Card */}
              <div
                className={`retro-card bg-white p-3 sm:p-4 shadow-retro-lg ${look.rotate} hover:rotate-0 transition-transform duration-300`}
              >
                {/* Photo frame */}
                <div
                  onClick={() => setSelectedPhoto(look)}
                  className={`relative ${look.aspect} w-full rounded-2xl border-2 border-espresso overflow-hidden bg-cream-dark cursor-pointer group-hover:scale-[1.01] transition-transform`}
                >
                  <img
                    src={look.src}
                    alt={look.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />

                  {/* Tape Tag at top */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-md border border-espresso bg-butter font-display font-black text-[10px] text-espresso uppercase shadow-[2px_2px_0px_#241B16]">
                    {look.tag}
                  </div>

                  {/* Zoom hint on hover with Lucide icon */}
                  <div className="absolute bottom-3 right-3 px-2.5 py-1.5 rounded-lg border border-espresso bg-white/95 text-[10px] font-black uppercase text-espresso opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 shadow-retro">
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>CLICK TO EXPAND</span>
                  </div>
                </div>

                {/* Annotation & Product Hook Footer */}
                <div className="mt-4 pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
                  <div>
                    <h3 className="font-display font-black text-lg text-espresso">
                      {look.title}
                    </h3>
                    <p className="font-hand text-xl text-terracotta mt-0.5 leading-snug">
                      "{look.note}"
                    </p>
                  </div>

                  <Link
                    to={`/product/${look.slug}`}
                    className="retro-btn-secondary py-2 px-4 text-xs shrink-0 self-start sm:self-auto flex items-center gap-1.5"
                  >
                    <span>SHOP PIECE</span>
                    <span>•</span>
                    <span>{look.price}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── 3. Bottom Shop Invitation (Muted Teal Section) ─────── */}
      <section className="border-t-3 border-espresso bg-[#4F8F87] text-white py-16 sm:py-20 text-center">
        <div className="mx-auto max-w-2xl px-4">
          <DoodleStar className="w-8 h-8 text-butter mx-auto mb-3" />
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white mb-3">
            ALL MEN'S LOOKS READY TO SHIP
          </h2>
          <p className="font-sans text-sm sm:text-base text-white/90 font-medium mb-6">
            Every garment featured in Lookbook 04 is in stock in our Mumbai atelier.
          </p>
          <Link to="/shop" className="retro-btn-primary inline-flex items-center gap-2">
            <span>SHOP MEN'S ARCHIVE</span>
            <AnimatedSketchArrow className="w-6 h-3 text-white" />
          </Link>
        </div>
      </section>

      {/* ── 4. Photo Lightbox Modal ───────────────────────────── */}
      <AnimatePresence>
        {selectedPhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-espresso/60 backdrop-blur-xs"
              onClick={() => setSelectedPhoto(null)}
            />
            <motion.div
              initial={{ scale: 0.92, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 15 }}
              className="relative z-10 max-w-3xl w-full rounded-3xl border-3 border-espresso bg-white p-4 sm:p-6 shadow-retro-xl"
            >
              <div className="flex items-center justify-between pb-3 mb-3 border-b-2 border-espresso">
                <span className="font-display font-black text-sm text-espresso">
                  {selectedPhoto.title}
                </span>
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="h-8 w-8 rounded-lg border-2 border-espresso bg-butter font-black text-sm flex items-center justify-center hover:bg-coral hover:text-white transition-colors"
                  aria-label="Close image modal"
                >
                  <X className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>

              <div className="relative aspect-[16/10] w-full rounded-xl border-2 border-espresso overflow-hidden mb-4 bg-cream-dark">
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.title}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h4 className="font-display font-bold text-base text-espresso">
                    Featured: {selectedPhoto.piece}
                  </h4>
                  <p className="font-hand text-xl text-terracotta">
                    {selectedPhoto.note}
                  </p>
                </div>
                <Link
                  to={`/product/${selectedPhoto.slug}`}
                  className="retro-btn-primary py-2 px-5 text-xs shrink-0 flex items-center gap-1.5"
                >
                  <span>VIEW PRODUCT DETAIL</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
