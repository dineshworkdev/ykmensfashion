import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, X, Shirt, SlidersHorizontal, ArrowUpDown } from 'lucide-react'
import ProductCard from '../components/product/ProductCard.jsx'
import { products } from '../data/products.js'
import { DoodleStar, WavyUnderline } from '../components/common/Doodles.jsx'

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
    <div className="bg-[#FFF1DF] min-h-screen">
      {/* ── 1. Editorial Header (Warm Cream) ───────────────────────────── */}
      <section className="border-b-3 border-espresso bg-[#FFF1DF] py-12 sm:py-16">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-espresso bg-butter text-[11px] font-black uppercase tracking-wider text-espresso mb-3 shadow-[2px_2px_0px_#241B16]">
              <DoodleStar className="w-3.5 h-3.5" />
              MEN'S ATELIER CATALOGUE
            </div>
            <h1 className="font-display font-black text-4xl sm:text-6xl text-espresso mb-4">
              SHOP{' '}
              <span className="relative inline-block text-coral">
                ALL.
                <WavyUnderline className="absolute -bottom-2 left-0 w-full h-3 text-butter" />
              </span>
            </h1>
            <p className="font-sans text-sm sm:text-base text-espresso/80 font-medium leading-relaxed">
              Explore our complete collection of 240 GSM organic men's tees, silk-screened
              limited editions, and daily heavy blanks.
            </p>
          </div>
        </div>
      </section>

      {/* ── 2. Sticky Filter & Sort Controls ────────────────── */}
      <div className="sticky top-[4.5rem] z-20 border-b-2 border-espresso bg-[#FFF1DF]/95 backdrop-blur-md py-3.5 shadow-sm w-full">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0">
            {categoryTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveCategory(tab.id)
                  if (tab.id !== 'NEW ARRIVALS' && filterParam) {
                    setSearchParams({})
                  }
                }}
                className={`whitespace-nowrap px-4 py-2 rounded-xl border-2 border-espresso font-display font-black text-xs uppercase tracking-wider transition-all ${
                  activeCategory === tab.id
                    ? 'bg-butter text-white shadow-[2px_2px_0px_#241B16]'
                    : 'bg-white text-espresso hover:bg-cream-dark shadow-none'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Right Controls: Instant Search & Sort Dropdown */}
          <div className="flex items-center gap-3 self-end md:self-auto w-full md:w-auto">
            {/* Quick search input with proper Lucide icon */}
            <div className="relative flex-1 md:w-56">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Filter by keyword..."
                className="w-full pl-8 pr-7 py-1.5 rounded-xl border-2 border-espresso bg-white text-xs font-bold text-espresso placeholder-espresso/40 focus:outline-none focus:bg-cream-card shadow-[2px_2px_0px_#241B16]"
              />
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-espresso/60" />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-2.5 top-2 text-xs font-bold text-espresso/60 hover:text-espresso"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 shrink-0">
              <label className="text-[11px] font-black uppercase text-espresso/70 hidden sm:flex items-center gap-1">
                <ArrowUpDown className="w-3 h-3" />
                SORT:
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1.5 rounded-xl border-2 border-espresso bg-white font-bold text-xs text-espresso shadow-[2px_2px_0px_#241B16] focus:outline-none cursor-pointer"
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

      {/* ── 3. Teal Product Area (Section 6: "Editorial cream + teal product area") ── */}
      <section className="bg-[#4F8F87] py-10 sm:py-16 border-b-3 border-espresso">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          {/* Count Bar */}
          <div className="flex items-center justify-between mb-8 pb-3 border-b-2 border-dashed border-white/30">
            <span className="font-hand text-2xl text-butter">
              Showing {filteredProducts.length} pieces in {activeCategory.toLowerCase()}
            </span>
            <span className="text-xs font-bold text-white/80 uppercase tracking-widest">
              MEN'S 240 GSM ARCHIVE
            </span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center rounded-3xl border-3 border-espresso bg-[#FFF1DF] text-espresso p-8 shadow-retro-xl">
              <Shirt className="w-12 h-12 text-espresso/40 mx-auto mb-3" />
              <h3 className="font-display font-black text-2xl text-espresso mb-2">
                No men's pieces match your selection.
              </h3>
              <p className="text-sm font-medium text-espresso/60 mb-6">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product, idx) => (
                <ProductCard key={product.id} product={product} index={idx} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
