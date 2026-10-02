import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ZoomIn, X, ArrowRight, Sparkles } from 'lucide-react'
import { DoodleStar, AnimatedWavyUnderline, RetroStampBadge, EditorialMark } from '../components/common/Doodles.jsx'

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
  },
  {
    id: 3,
    title: 'Look 03: Mineral Terracotta Wash',
    piece: "Men's Terra Cotta Boxy Pocket Tee",
    slug: 'mens-terra-cotta-boxy-pocket-tee',
    price: '₹1,399',
    note: 'Stone-washed with natural pigment enzymes. Organic color nuances across seams.',
    src: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=1000&auto=format&fit=crop&q=80',
    tag: 'EARTH TONE BLANK',
    span: 'lg:col-span-5',
    aspect: 'aspect-[4/5]',
  },
  {
    id: 4,
    title: 'Look 04: Studio Workshop Process',
    piece: "Men's Classic Boxy Blank in Butter Cream",
    slug: 'mens-classic-boxy-blank-in-butter-cream',
    price: '₹1,199',
    note: 'In the cutting room: inspection of 1.25" reinforced collar bindings.',
    src: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1000&auto=format&fit=crop&q=80',
    tag: 'CRAFT ARCHIVE',
    span: 'lg:col-span-7',
    aspect: 'aspect-[16/11]',
  },
  {
    id: 5,
    title: 'Look 05: Layered Street Silhouette',
    piece: "Men's Washed Charcoal Oversized Raglan",
    slug: 'mens-washed-charcoal-oversized-raglan',
    price: '₹1,699',
    note: 'Raglan seams give unrestricted mobility for daily movement and studio work.',
    src: 'https://images.unsplash.com/photo-1527010154944-f2241763d806?w=1000&auto=format&fit=crop&q=80',
    tag: 'CHARCOAL SERIES',
    span: 'lg:col-span-6',
    aspect: 'aspect-[4/5]',
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
  },
]

export default function Lookbook() {
  const [selectedPhoto, setSelectedPhoto] = useState(null)

  return (
    <div className="bg-[#FFF1DF] min-h-screen text-espresso">
      {/* ── 1. Magazine Burgundy Header ─────────────────────────── */}
      <section className="border-b border-espresso/15 bg-[#6E3D41] text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute top-8 right-[8%] opacity-20 pointer-events-none hidden md:block">
          <RetroStampBadge className="w-44 h-44 text-white" text="100% HEAVY COTTON • YK MENS FASHION • " />
        </div>

        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 relative z-10">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[2px] border border-white/30 bg-white/10 text-[10px] font-bold uppercase tracking-[0.18em] text-[#FFF1DF] mb-4">
              <Sparkles className="w-3 h-3 text-coral" />
              PRINT ISSUE 04 • MEN'S S/S 2026
            </span>

            <h1 className="font-display font-bold text-4xl sm:text-6xl text-white mb-4 leading-tight tracking-tight">
              EDITORIAL{' '}
              <span className="font-serif italic font-normal text-coral relative inline-block">
                Study.
                <AnimatedWavyUnderline className="absolute -bottom-1 left-0 w-full h-2 text-coral" />
              </span>
            </h1>

            <p className="font-sans text-sm sm:text-base text-[#FFF1DF]/80 font-normal leading-relaxed max-w-lg">
              Photographed across natural daylight and raw architecture in Mumbai. An unvarnished
              study of heavyweight drape, mineral pigment wash patina, and everyday menswear.
            </p>
          </div>
        </div>
      </section>

      {/* ── 2. Editorial Study Collage Grid ────────────────────── */}
      <section className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 py-14 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {looks.map((look) => (
            <motion.div
              key={look.id}
              className={`${look.span} relative group`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5 }}
            >
              {/* Refined Look Card */}
              <div className="bg-white rounded-[5px] border border-espresso/15 hover:border-espresso/30 p-3.5 sm:p-4 shadow-[0_4px_20px_rgba(42,32,24,0.05)] hover:shadow-[0_12px_32px_rgba(42,32,24,0.1)] transition-all duration-500">
                {/* Photo frame */}
                <div
                  onClick={() => setSelectedPhoto(look)}
                  className={`relative ${look.aspect} w-full rounded-[4px] overflow-hidden bg-[#F4EDE4] cursor-pointer`}
                >
                  <img
                    src={look.src}
                    alt={look.title}
                    className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                    loading="lazy"
                  />

                  {/* Clean Plate Tag */}
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-[3px] border border-espresso/15 bg-white/95 text-[9px] font-bold uppercase tracking-[0.14em] text-espresso shadow-xs backdrop-blur-xs">
                    {look.tag}
                  </div>

                  {/* Zoom hint */}
                  <div className="absolute bottom-2.5 right-2.5 px-2 py-1 rounded-[3px] border border-espresso/15 bg-white/95 text-[9px] font-bold uppercase tracking-wider text-espresso opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 shadow-xs backdrop-blur-xs">
                    <ZoomIn className="w-3 h-3" />
                    <span>EXPAND</span>
                  </div>
                </div>

                {/* Meta & Shop Link */}
                <div className="mt-4 pt-2 border-t border-espresso/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
                  <div>
                    <h3 className="font-display font-medium text-base text-espresso">
                      {look.title}
                    </h3>
                    <p className="font-sans text-xs text-espresso/60 mt-0.5 leading-relaxed font-normal">
                      {look.note}
                    </p>
                  </div>

                  <Link
                    to={`/product/${look.slug}`}
                    className="retro-btn-primary py-2 px-3.5 text-xs shrink-0 self-start sm:self-auto flex items-center gap-1.5"
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

      {/* ── 3. Bottom Shop Invitation ─────────────────────────── */}
      <section className="border-t border-espresso/15 bg-[#14382F] text-white py-16 sm:py-20 text-center">
        <div className="mx-auto max-w-xl px-4">
          <DoodleStar className="w-6 h-6 text-coral mx-auto mb-3" />
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white mb-2 tracking-tight">
            ALL LOOKS READY FOR DISPATCH
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#FFF1DF]/75 mb-6 font-normal">
            Every garment featured in Lookbook 04 is currently available in limited quantities.
          </p>
          <Link to="/shop" className="retro-btn-primary !bg-[#FFF1DF] !text-espresso hover:!bg-coral hover:!text-white border-none inline-flex items-center gap-2">
            <span>EXPLORE ALL PIECES</span>
            <ArrowRight className="w-4 h-4" />
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
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative z-10 max-w-3xl w-full rounded-[6px] border border-espresso/20 bg-white p-4 sm:p-6 shadow-[0_25px_60px_rgba(42,32,24,0.22)]"
            >
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-espresso/15">
                <span className="font-display font-bold text-sm text-espresso">
                  {selectedPhoto.title}
                </span>
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="h-7 w-7 rounded-[3px] border border-espresso/20 text-espresso flex items-center justify-center hover:bg-espresso hover:text-white transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4 stroke-[2]" />
                </button>
              </div>

              <div className="relative aspect-[16/10] w-full rounded-[4px] overflow-hidden mb-4 bg-[#F4EDE4]">
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.title}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h4 className="font-display font-medium text-sm text-espresso">
                    Featured: {selectedPhoto.piece}
                  </h4>
                  <p className="font-sans text-xs text-espresso/60">
                    {selectedPhoto.note}
                  </p>
                </div>
                <Link
                  to={`/product/${selectedPhoto.slug}`}
                  className="retro-btn-primary py-2 px-4 text-xs shrink-0 flex items-center gap-1.5"
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
