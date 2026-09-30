import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Package } from 'lucide-react'
import ProductCard from '../components/product/ProductCard.jsx'
import { getProductsByCollection, collectionsData } from '../data/products.js'
import { DoodleStar, AnimatedWavyUnderline } from '../components/common/Doodles.jsx'

// Color atmosphere for each collection campaign hero
const collectionThemes = {
  oversized: {
    heroBg: 'bg-[#BA664F]',
    heroText: 'text-white',
    accentText: 'text-[#FFF1DF]',
    badgeBg: 'bg-white text-espresso',
    subText: 'text-white/80',
  },
  graphic: {
    heroBg: 'bg-[#6E3D41]',
    heroText: 'text-white',
    accentText: 'text-[#FFF1DF]',
    badgeBg: 'bg-white text-espresso',
    subText: 'text-white/80',
  },
  essentials: {
    heroBg: 'bg-[#14382F]',
    heroText: 'text-white',
    accentText: 'text-coral',
    badgeBg: 'bg-white text-espresso',
    subText: 'text-white/80',
  },
}

export default function Collection() {
  const { slug } = useParams()
  const colData = collectionsData.find((c) => c.slug.toLowerCase() === slug?.toLowerCase())
  const colProducts = getProductsByCollection(colData?.name || '')
  const otherCollections = collectionsData.filter((c) => c.slug.toLowerCase() !== slug?.toLowerCase())

  if (!colData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center bg-[#FFF1DF] text-espresso">
        <Package className="w-12 h-12 text-espresso/30 mb-4" />
        <h2 className="font-display font-bold text-2xl text-espresso mb-2">
          Collection Not Found
        </h2>
        <p className="text-xs font-normal text-espresso/60 mb-6">
          This series may have ended or the link has changed.
        </p>
        <Link to="/shop" className="retro-btn-primary flex items-center gap-2">
          <span>EXPLORE ALL COLLECTIONS</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    )
  }

  const theme = collectionThemes[slug?.toLowerCase()] || collectionThemes.oversized

  return (
    <div className="bg-[#FFF1DF] min-h-screen text-espresso">
      {/* ── 1. Refined Campaign Hero ────────────────────────── */}
      <section className={`border-b border-espresso/15 ${theme.heroBg} ${theme.heroText} py-14 sm:py-20 relative overflow-hidden`}>
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Left text & metadata */}
            <div className="lg:col-span-7 flex flex-col items-start">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[2px] border border-white/20 bg-white/10 text-white text-[10px] font-bold uppercase tracking-[0.18em] mb-4">
                <DoodleStar className="w-3 h-3 text-coral" />
                <span>{colData.badge || 'ATELIER SERIES'}</span>
              </div>

              {/* Title */}
              <h1 className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl mb-3 leading-tight tracking-tight">
                {colData.name}{' '}
                <span className="font-serif italic font-normal text-coral relative inline-block">
                  Series.
                  <AnimatedWavyUnderline className="absolute -bottom-1 left-0 w-full h-2 text-coral" />
                </span>
              </h1>

              {/* Tagline & description */}
              <p className="font-sans text-sm sm:text-base text-white/90 font-medium mb-3">
                "{colData.tagline}"
              </p>
              <p className={`font-sans text-xs sm:text-sm ${theme.subText} font-normal max-w-lg mb-6 leading-relaxed`}>
                {colData.description}
              </p>

              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded-[2px] bg-white/10 border border-white/20 text-[10px] font-bold uppercase tracking-wider text-white">
                  {colProducts.length} PIECES AVAILABLE
                </span>
                <span className="px-2.5 py-1 rounded-[2px] bg-white/10 border border-white/20 text-[10px] font-bold uppercase tracking-wider text-white">
                  240 GSM COMBD COTTON
                </span>
                <span className="px-2.5 py-1 rounded-[2px] bg-white/10 border border-white/20 text-[10px] font-bold uppercase tracking-wider text-white">
                  100% ORGANIC
                </span>
              </div>
            </div>

            {/* Right Campaign Poster */}
            <div className="lg:col-span-5 relative">
              <div className="bg-white p-2.5 sm:p-3 rounded-sm border border-white/20 shadow-lg">
                <div className="relative aspect-[4/3] rounded-[2px] overflow-hidden bg-[#F4EDE4]">
                  <img
                    src={colData.image}
                    alt={colData.name}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-[2px] bg-white/95 border border-espresso/15 text-[9px] font-mono uppercase tracking-wider text-espresso">
                    STUDIO CUT
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Product Grid ─────────────────────────────────── */}
      <section className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 py-12 sm:py-16">
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-espresso/10">
          <span className="text-xs font-bold uppercase tracking-[0.14em] text-espresso/70">
            {colData.name} ARCHIVE ({colProducts.length} PIECES)
          </span>
          <Link
            to="/shop"
            className="text-xs font-bold uppercase tracking-wider text-espresso hover:text-coral flex items-center gap-1.5 transition-colors"
          >
            <span>ALL SILHOUETTES</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {colProducts.length === 0 ? (
          <div className="py-16 text-center rounded-sm border border-espresso/15 bg-white p-8 max-w-md mx-auto">
            <h3 className="font-display font-bold text-xl text-espresso mb-2">
              All items in {colData.name} sold out
            </h3>
            <p className="text-xs font-normal text-espresso/60 mb-6">
              Check out our other seasonal drops below.
            </p>
            <Link to="/shop" className="retro-btn-primary">
              EXPLORE ALL PIECES
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {colProducts.map((product, idx) => (
              <ProductCard key={product.id} product={product} index={idx} />
            ))}
          </div>
        )}
      </section>

      {/* ── 3. Other Collections Navigation Strip ───────────── */}
      <section className="border-t border-espresso/15 bg-[#F9F3EA] py-14 sm:py-20">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-coral block mb-1">
              DISCOVER MORE
            </span>
            <h3 className="font-display font-bold text-xl sm:text-3xl text-espresso">
              EXPLORE OTHER SILHOUETTES
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {otherCollections.map((other) => (
              <Link
                key={other.slug}
                to={`/collection/${other.slug}`}
                className="bg-white rounded-sm border border-espresso/15 hover:border-espresso/35 p-5 flex items-center justify-between group shadow-xs hover:shadow-md transition-all duration-300"
              >
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-coral block mb-1">
                    {other.badge}
                  </span>
                  <h4 className="font-display font-bold text-lg text-espresso group-hover:text-coral transition-colors">
                    {other.name}
                  </h4>
                  <p className="text-xs text-espresso/60 mt-0.5 font-normal">
                    {other.tagline}
                  </p>
                </div>
                <div className="h-9 w-9 rounded-full border border-espresso/20 flex items-center justify-center group-hover:bg-espresso group-hover:text-white transition-colors shrink-0">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
