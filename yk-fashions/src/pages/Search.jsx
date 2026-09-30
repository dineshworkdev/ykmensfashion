import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Search as SearchIcon, X, Shirt, Palette, Layers, Sparkles, Feather, HelpCircle, ArrowRight } from 'lucide-react'
import { products } from '../data/products.js'
import ProductCard from '../components/product/ProductCard.jsx'
import { DoodleStar, AnimatedWavyUnderline } from '../components/common/Doodles.jsx'

const popularKeywords = [
  { label: "Men's Oversized", icon: Shirt, query: 'Oversized' },
  { label: 'Graphic Editions', icon: Palette, query: 'Graphic' },
  { label: 'Daily Essentials', icon: Layers, query: 'Essentials' },
  { label: 'Mineral Terracotta', icon: Sparkles, query: 'Terracotta' },
  { label: '240 GSM Blanks', icon: Feather, query: 'Heavyweight' },
]

export default function Search() {
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.collection.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.colors.some((c) => c.toLowerCase().includes(q))
    )
  }, [query])

  return (
    <div className="bg-[#FFF1DF] min-h-screen py-10 sm:py-16 text-espresso">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        {/* ── Search Hero ─────────────────────────────────── */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[2px] border border-espresso/20 bg-white text-[10px] font-bold uppercase tracking-[0.16em] text-espresso mb-3 shadow-xs">
            <DoodleStar className="w-3 h-3 text-coral" />
            SEARCH T-SHIRTS
          </div>

          <h1 className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl text-espresso mb-3 leading-tight tracking-tight">
            SEARCH{' '}
            <span className="font-serif italic font-normal text-coral relative inline-block">
              T-Shirts.
              <AnimatedWavyUnderline className="absolute -bottom-1 left-0 w-full h-2 text-coral" />
            </span>
          </h1>

          <p className="font-sans text-xs sm:text-sm text-espresso/70 mb-8 max-w-md mx-auto font-normal">
            Look up men's t-shirts by style, color, or name.
          </p>

          {/* ── Architectural Search Input ── */}
          <div className="relative max-w-xl mx-auto">
            <div className="relative flex items-center rounded-sm border border-espresso/30 bg-white p-2 shadow-sm focus-within:border-espresso transition-all">
              <div className="pl-3 pr-2 text-espresso/50 flex items-center justify-center">
                <SearchIcon className="w-5 h-5" strokeWidth={1.8} />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by style, color, or name (e.g. Oversized, Acid Wash)..."
                autoFocus
                className="w-full bg-transparent px-2 py-1.5 font-sans text-sm sm:text-base text-espresso placeholder-espresso/40 focus:outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="mr-2 flex h-6 w-6 items-center justify-center rounded-[2px] border border-espresso/20 text-espresso hover:bg-espresso hover:text-white transition-colors"
                  aria-label="Clear query"
                >
                  <X className="w-3.5 h-3.5 stroke-[2]" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ── Popular Search Tags ──────────────────────────── */}
        {!query && (
          <div className="max-w-2xl mx-auto text-center py-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-espresso/50 mb-3">
              RECOMMENDED KEYWORDS
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {popularKeywords.map((item) => {
                const IconComp = item.icon
                return (
                  <button
                    key={item.label}
                    onClick={() => setQuery(item.query)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-[2px] border border-espresso/15 bg-white text-espresso font-sans text-xs font-medium hover:border-espresso/40 hover:bg-[#F9F3EA] transition-all"
                  >
                    <IconComp className="w-3.5 h-3.5 text-coral" strokeWidth={1.8} />
                    <span>{item.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* ── Search Results Section ────────────────────────── */}
        {query && (
          <section className="pt-6 pb-16">
            <div className="flex items-center justify-between mb-8 pb-3 border-b border-espresso/10">
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-espresso/70">
                Found {results.length} piece{results.length === 1 ? '' : 's'} matching "{query}"
              </span>
              {results.length > 0 && (
                <button
                  onClick={() => setQuery('')}
                  className="text-xs font-bold uppercase tracking-wider text-coral hover:underline"
                >
                  CLEAR SEARCH
                </button>
              )}
            </div>

            {results.length === 0 ? (
              <div className="py-16 text-center max-w-md mx-auto rounded-sm border border-espresso/15 bg-white p-8 shadow-xs">
                <HelpCircle className="w-10 h-10 text-espresso/30 mx-auto mb-3" />
                <h3 className="font-display font-bold text-lg text-espresso mb-1">
                  No Matching Pieces Found
                </h3>
                <p className="text-xs text-espresso/60 mb-6 font-normal">
                  Try searching for "Oversized", "Graphic", "Tee", or "Cotton".
                </p>
                <div className="flex justify-center gap-2.5">
                  <button
                    onClick={() => setQuery('Oversized')}
                    className="retro-btn-outline text-xs py-2 px-3.5"
                  >
                    SEARCH OVERSIZED
                  </button>
                  <button
                    onClick={() => setQuery('Graphic')}
                    className="retro-btn-primary text-xs py-2 px-3.5"
                  >
                    SEARCH GRAPHIC
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                {results.map((product, idx) => (
                  <ProductCard key={product.id} product={product} index={idx} />
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  )
}
