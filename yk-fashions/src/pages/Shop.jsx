import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, X, Shirt, ArrowUpDown } from 'lucide-react'
import ProductCard from '../components/product/ProductCard.jsx'
import { products } from '../data/products.js'
import { DoodleStar, AnimatedWavyUnderline } from '../components/common/Doodles.jsx'

const categoryTabs = [
  { id: 'ALL', label: "ALL MEN'S" },
  { id: 'NEW ARRIVALS', label: 'NEW ARRIVALS' },
  { id: 'OVERSIZED', label: 'OVERSIZED' },
  { id: 'GRAPHIC', label: 'GRAPHIC' },
  { id: 'ESSENTIALS', label: 'ESSENTIALS' },
]

const sortOptions = [
  { id: 'featured', label: 'Featured Drops' },
  { id: 'price-low', label: 'Price: Low to High' },
  { id: 'price-high', label: 'Price: High to Low' },
  { id: 'name-az', label: 'Name A–Z' },
]

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams()
  const filterParam = searchParams.get('filter')

  const [activeCategory, setActiveCategory] = useState(
    filterParam === 'new' ? 'NEW ARRIVALS' : 'ALL'
  )
  const [sortBy, setSortBy] = useState('featured')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (filterParam === 'new') {
      setActiveCategory('NEW ARRIVALS')
    }
  }, [filterParam])

  const filteredProducts = useMemo(() => {
    let list = [...products]

    // Category filter
    if (activeCategory === 'NEW ARRIVALS') {
      list = list.filter((p) => p.badge === 'NEW DROP' || p.badge === 'LIMITED')
    } else if (activeCategory !== 'ALL') {
      list = list.filter(
        (p) =>
          p.collection?.toUpperCase() === activeCategory ||
          p.category?.toUpperCase() === activeCategory
      )
    }

    // Search query filter
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase()
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      )
    }

    // Sort
    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price)
    } else if (sortBy === 'name-az') {
      list.sort((a, b) => a.name.localeCompare(b.name))
    }

    return list
  }, [activeCategory, sortBy, searchTerm])

  return (
    <div className="bg-[#FFF1DF] min-h-screen text-espresso">
      {/* ── 1. High-Contrast Editorial Header (Dark Charcoal: #161311) ── */}
      <section className="border-b border-espresso/20 bg-[#161311] text-white py-12 sm:py-16">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[2px] border border-white/20 bg-white/10 text-[10px] font-bold uppercase tracking-[0.2em] text-[#FFF1DF] mb-3">
              <DoodleStar className="w-3 h-3 text-coral" />
              COMPLETE COLLECTION
            </div>
            <h1 className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl text-white mb-3 tracking-tight">
              ALL MEN'S{' '}
              <span className="font-serif italic font-normal text-coral relative inline-block">
                Streetwear.
                <AnimatedWavyUnderline className="absolute -bottom-1 left-0 w-full h-2 text-coral" />
              </span>
            </h1>
            <p className="font-sans text-xs sm:text-sm text-white/75 font-normal leading-relaxed">
              Explore our complete collection of 240 GSM organic cotton t-shirts, hand-pulled silkscreen
              editions, and daily heavyweight blanks.
            </p>
          </div>
        </div>
      </section>

      {/* ── 2. Sticky Filter & Sort Controls ────────────────── */}
      <div className="sticky top-[3.75rem] sm:top-[4.25rem] z-20 border-b border-espresso/15 bg-[#FFF1DF]/95 backdrop-blur-md py-3 shadow-xs w-full">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 flex flex-col md:flex-row md:items-center md:justify-between gap-3.5">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0">
            {categoryTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveCategory(tab.id)
                  if (tab.id !== 'NEW ARRIVALS' && filterParam) {
                    setSearchParams({})
                  }
                }}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-[2px] font-sans text-xs font-bold uppercase tracking-[0.12em] transition-all ${
                  activeCategory === tab.id
                    ? 'bg-espresso text-cream shadow-xs'
                    : 'bg-white/80 border border-espresso/15 text-espresso/80 hover:text-espresso hover:bg-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Right Controls: Search & Sort Dropdown */}
          <div className="flex items-center gap-2.5 self-end md:self-auto w-full md:w-auto">
            {/* Quick search input */}
            <div className="relative flex-1 md:w-60">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search collection..."
                className="w-full pl-8 pr-7 py-1.5 rounded-[2px] border border-espresso/25 bg-white text-xs font-medium text-espresso placeholder-espresso/45 focus:outline-none focus:border-espresso"
              />
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-espresso/50" />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-2.5 top-2 text-xs text-espresso/50 hover:text-espresso"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 shrink-0">
              <label className="text-[10px] font-bold uppercase tracking-wider text-espresso/60 hidden sm:flex items-center gap-1">
                <ArrowUpDown className="w-3 h-3" />
                SORT:
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-2.5 py-1.5 rounded-[2px] border border-espresso/25 bg-white font-sans text-xs font-medium text-espresso focus:outline-none focus:border-espresso cursor-pointer"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. High-Fashion Gallery Grid (Warm Cream Canvas) ────────────────── */}
      <section className="bg-[#FFF1DF] py-10 sm:py-16">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          {/* Count Bar */}
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-espresso/10">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-espresso/70">
              Showing {filteredProducts.length} pieces in {activeCategory.toLowerCase()}
            </span>
            <span className="text-[10px] font-mono text-espresso/50 uppercase tracking-widest hidden sm:inline">
              100% COMBED ORGANIC COTTON
            </span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center rounded-sm border border-espresso/15 bg-white text-espresso p-8 shadow-sm max-w-lg mx-auto">
              <Shirt className="w-10 h-10 text-espresso/30 mx-auto mb-3" />
              <h3 className="font-display font-bold text-xl text-espresso mb-2">
                No pieces match your selection
              </h3>
              <p className="text-xs font-normal text-espresso/60 mb-6">
                Try adjusting your category filter or search keywords.
              </p>
              <button
                onClick={() => {
                  setActiveCategory('ALL')
                  setSearchTerm('')
                }}
                className="retro-btn-primary"
              >
                RESET FILTERS
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {filteredProducts.map((product, idx) => (
                <ProductCard key={product.id} product={product} index={idx} dark={false} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
