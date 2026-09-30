import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Search as SearchIcon, X, Shirt, Palette, Layers, Sparkles, Feather, HelpCircle, ArrowRight } from 'lucide-react'
import { products } from '../data/products.js'
import ProductCard from '../components/product/ProductCard.jsx'
import { DoodleStar, WavyUnderline, AnimatedSketchArrow } from '../components/common/Doodles.jsx'

const popularKeywords = [
  { label: "Men's Oversized", icon: Shirt, query: 'Oversized' },
  { label: 'Graphic Prints', icon: Palette, query: 'Graphic' },
  { label: 'Essentials', icon: Layers, query: 'Essentials' },
  { label: 'Terracotta', icon: Sparkles, query: 'Terracotta' },
  { label: '240 GSM', icon: Feather, query: 'Heavyweight' },
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
    <div className="bg-[#FFF1DF] min-h-screen py-10 sm:py-16">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        {/* ── Search Hero ─────────────────────────────────── */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <span className="retro-pill bg-butter text-espresso mb-3">
            <DoodleStar className="w-3.5 h-3.5" />
            MEN'S ARCHIVE DISCOVERY
          </span>

          <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-espresso mb-4 leading-tight">
            SEARCH{' '}
            <span className="relative inline-block text-coral">
              YK MENS FASHION.
              <WavyUnderline className="absolute -bottom-2 left-0 w-full h-3 text-butter" />
            </span>
          </h1>

          <p className="font-sans text-sm sm:text-base text-espresso/70 font-medium mb-8">
            Look up heavyweight men's t-shirts by cut, collection, graphic style, or dye tone.
          </p>

          {/* ── Giant Pill Search Input with Lucide SearchIcon ── */}
          <div className="relative max-w-2xl mx-auto">
            <div className="relative flex items-center rounded-full border-3 border-espresso bg-white p-2 sm:p-2.5 shadow-retro-lg transition-all focus-within:shadow-retro-xl">
              <div className="pl-4 pr-1 text-espresso/60 flex items-center justify-center">
                <SearchIcon className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search men's tees, cuts, or colors (e.g. Oversized, Alien)..."
                autoFocus
                className="w-full bg-transparent px-3 py-2 font-display font-bold text-base sm:text-xl text-espresso placeholder-espresso/40 focus:outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="mr-2 flex h-8 w-8 items-center justify-center rounded-full border border-espresso bg-[#FFF1DF] text-espresso font-bold text-xs hover:bg-coral hover:text-white transition-colors"
                  aria-label="Clear query"
                >
                  <X className="w-4 h-4 stroke-[2.5]" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ── Popular Search Tags with Lucide Icons ───────────────────────────── */}
        {!query && (
          <div className="max-w-2xl mx-auto text-center py-6">
            <p className="text-[11px] font-black uppercase tracking-widest text-espresso/60 mb-4">
              POPULAR DISCOVERY TAGS
            </p>
            <div className="flex flex-wrap justify-center gap-2.5">
              {popularKeywords.map((item) => {
                const IconComp = item.icon
                return (
                  <button
                    key={item.label}
                    onClick={() => setQuery(item.query)}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl border-2 border-espresso bg-white text-espresso font-display font-bold text-xs shadow-retro hover:bg-butter hover:-translate-y-0.5 active:translate-y-0 active:shadow-none transition-all"
                  >
                    <IconComp className="w-4 h-4 text-coral" strokeWidth={2.5} />
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
            <div className="flex items-center justify-between mb-8 pb-3 border-b-2 border-dashed border-espresso/20">
              <span className="font-hand text-2xl text-terracotta">
                Found {results.length} men's piece{results.length === 1 ? '' : 's'} matching "{query}"
              </span>
              {results.length > 0 && (
                <button
                  onClick={() => setQuery('')}
                  className="text-xs font-black uppercase tracking-wider text-coral hover:underline"
                >
                  CLEAR SEARCH
                </button>
              )}
            </div>

            {results.length === 0 ? (
              <div className="py-16 text-center max-w-md mx-auto rounded-3xl border-3 border-espresso bg-white p-8 shadow-retro-xl">
                <HelpCircle className="w-12 h-12 text-espresso/40 mx-auto mb-3" />
                <h3 className="font-display font-black text-2xl text-espresso mb-2">
                  No Archive Matches Found
                </h3>
                <p className="text-sm font-medium text-espresso/60 mb-6">
                  Try searching for "Oversized", "Graphic", "Tee", or "Cotton".
                </p>
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => setQuery('Oversized')}
                    className="retro-btn-secondary text-xs py-2 px-4"
                  >
                    SEARCH OVERSIZED
                  </button>
                  <button
                    onClick={() => setQuery('Graphic')}
                    className="retro-btn-outline text-xs py-2 px-4"
                  >
                    SEARCH GRAPHIC
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
