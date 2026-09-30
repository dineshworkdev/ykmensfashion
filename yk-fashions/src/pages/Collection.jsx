import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Package, Sparkles } from 'lucide-react'
import ProductCard from '../components/product/ProductCard.jsx'
import { getProductsByCollection, collectionsData } from '../data/products.js'
import { DoodleStar, WavyUnderline, RetroStampBadge } from '../components/common/Doodles.jsx'

// Color atmosphere for each collection campaign hero
const collectionThemes = {
  oversized: {
    heroBg: 'bg-[#C96845]',
    heroText: 'text-white',
    accentText: 'text-butter',
    badgeBg: 'bg-butter text-espresso',
    subText: 'text-white/85',
  },
  graphic: {
    heroBg: 'bg-[#754447]',
    heroText: 'text-white',
    accentText: 'text-butter',
    badgeBg: 'bg-coral text-white',
    subText: 'text-white/85',
  },
  essentials: {
    heroBg: 'bg-[#183D35]',
    heroText: 'text-white',
    accentText: 'text-coral',
    badgeBg: 'bg-teal text-white',
    subText: 'text-white/85',
  },
}

export default function Collection() {
  const { slug } = useParams()
  const colData = collectionsData.find((c) => c.slug.toLowerCase() === slug?.toLowerCase())
  const colProducts = getProductsByCollection(colData?.name || '')
  const otherCollections = collectionsData.filter((c) => c.slug.toLowerCase() !== slug?.toLowerCase())

  if (!colData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center bg-[#FFF1DF]">
        <Package className="w-16 h-16 text-espresso/40 mb-4" />
        <h2 className="font-display font-black text-3xl text-espresso mb-2">
          Collection Not Found
        </h2>
        <p className="text-sm font-medium text-espresso/70 mb-6">
          This series might be archived or under development.
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
    <div className="bg-[#FFF1DF] min-h-screen">
      {/* ── 1. Strong Colored Campaign Hero (Section 6 Requirement) ────────────────────────── */}
      <section className={`border-b-3 border-espresso ${theme.heroBg} ${theme.heroText} py-14 sm:py-20 relative overflow-hidden`}>
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left text & metadata */}
            <div className="lg:col-span-7 flex flex-col items-start">
              {/* Badge */}
              <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border-2 border-espresso ${theme.badgeBg} shadow-[2px_2px_0px_#241B16] mb-4`}>
                <DoodleStar className="w-3.5 h-3.5" />
                <span className="text-xs font-black uppercase tracking-wider">
                  {colData.badge || 'ATELIER SERIES'}
                </span>
              </div>

              {/* Title */}
              <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl mb-4 leading-[1.05]">
                {colData.name}{' '}
                <span className={`relative inline-block ${theme.accentText}`}>
                  SERIES.
                  <WavyUnderline className="absolute -bottom-2 left-0 w-full h-3 text-white" />
                </span>
              </h1>

              {/* Tagline & description */}
              <p className={`font-hand text-2xl sm:text-3xl ${theme.accentText} mb-3`}>
                "{colData.tagline}"
              </p>
              <p className={`font-sans text-base sm:text-lg ${theme.subText} font-medium max-w-lg mb-8 leading-relaxed`}>
                {colData.description}
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <span className="retro-pill bg-white text-espresso">
                  {colProducts.length} PIECES IN DROP
                </span>
                <span className="retro-pill bg-white text-espresso">
                  240 GSM HEAVYWEIGHT
                </span>
                <span className="retro-pill bg-white text-espresso">
                  100% ORGANIC COTTON
                </span>
              </div>
            </div>

            {/* Right Campaign Poster */}
            <div className="lg:col-span-5 relative">
              <div className="retro-card bg-white p-3 shadow-retro-xl rotate-[1.5deg]">
                <div className="relative aspect-[4/3] rounded-2xl border-2 border-espresso overflow-hidden bg-cream-dark">
                  <img
                    src={colData.image}
                    alt={colData.name}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <RetroStampBadge className="w-16 h-16 bg-white/95 rounded-full border-2 border-espresso shadow-retro" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Product Grid ─────────────────────────────────── */}
      <section className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 py-12 sm:py-16">
        <div className="flex items-center justify-between mb-8 pb-3 border-b-2 border-dashed border-espresso/20">
          <span className="font-display font-black text-xl text-espresso uppercase">
            {colData.name} CATALOGUE ({colProducts.length})
          </span>
          <Link
            to="/shop"
            className="text-xs font-black uppercase tracking-wider text-coral hover:underline flex items-center gap-1.5"
          >
            <span>VIEW ALL SILHOUETTES</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {colProducts.length === 0 ? (
          <div className="py-20 text-center rounded-3xl border-3 border-espresso bg-white p-8 shadow-retro-lg">
            <h3 className="font-display font-black text-2xl text-espresso mb-2">
              All items in {colData.name} currently sold out.
            </h3>
            <p className="text-sm font-medium text-espresso/60 mb-6">
              Check out our other seasonal drops below.
            </p>
            <Link to="/shop" className="retro-btn-primary">
              EXPLORE ALL PIECES
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {colProducts.map((product, idx) => (
              <ProductCard key={product.id} product={product} index={idx} />
            ))}
          </div>
        )}
      </section>

      {/* ── 3. Other Collections Navigation Strip (Butter) ─────────────── */}
      <section className="border-t-3 border-espresso bg-butter py-14 sm:py-20">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-[10px] font-black uppercase tracking-widest text-espresso/70">
              DISCOVER MORE
            </span>
            <h3 className="font-display font-black text-2xl sm:text-3xl text-espresso">
              EXPLORE OTHER SERIES
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {otherCollections.map((other) => (
              <Link
                key={other.slug}
                to={`/collection/${other.slug}`}
                className="retro-card bg-white p-5 flex items-center justify-between group hover:-translate-y-1 transition-all shadow-retro"
              >
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-coral block mb-1">
                    {other.badge}
                  </span>
                  <h4 className="font-display font-black text-2xl text-espresso group-hover:text-coral transition-colors">
                    {other.name}
                  </h4>
                  <p className="text-xs text-espresso/70 mt-1 font-medium">
                    {other.tagline}
                  </p>
                </div>
                <div className="h-10 w-10 rounded-full border-2 border-espresso bg-butter flex items-center justify-center font-black group-hover:bg-coral group-hover:text-white transition-colors shrink-0 shadow-[2px_2px_0px_#241B16]">
                  <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
