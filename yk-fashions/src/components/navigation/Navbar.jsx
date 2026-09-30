import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Heart, ShoppingBag, Menu, Sparkles } from 'lucide-react'
import { useCart } from '../../context/CartContext.jsx'
import { useWishlist } from '../../context/WishlistContext.jsx'
import MobileMenu from './MobileMenu.jsx'

export const navLinks = [
  { to: '/shop', label: 'SHOP' },
  { to: '/shop?filter=new', label: 'NEW ARRIVALS' },
  { to: '/collection/oversized', label: 'COLLECTIONS' },
  { to: '/lookbook', label: 'LOOKBOOK' },
  { to: '/about', label: 'ABOUT' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { totalQty } = useCart()
  const { wishlist } = useWishlist()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on navigation
  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  return (
    <>
      {/* Top Retro Announcement Bar */}
      <div className="bg-butter border-b-2 border-espresso py-1.5 px-4 text-center font-sans text-xs font-bold uppercase tracking-wider text-espresso overflow-hidden select-none">
        <div className="flex items-center justify-center gap-3">
          <Sparkles className="w-3.5 h-3.5 text-espresso hidden sm:inline" />
          <span>FREE SHIPPING OVER ₹1,999</span>
          <span className="hidden sm:inline">•</span>
          <span className="font-extrabold bg-coral text-white px-2 py-0.5 rounded-full border border-espresso text-[10px]">
            MEN'S DROP 04 LIVE
          </span>
          <span className="hidden md:inline">•</span>
          <span className="hidden md:inline">240 GSM HEAVYWEIGHT STREETWEAR</span>
          <Sparkles className="w-3.5 h-3.5 text-espresso hidden sm:inline" />
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 bg-[#FFF1DF] ${
          scrolled
            ? 'border-b-2 border-espresso shadow-retro py-2.5'
            : 'border-b-2 border-espresso py-3.5'
        }`}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-10">
          {/* Brand Logo */}
          <Link
            to="/"
            className="group flex items-center gap-2.5 transition-transform active:scale-95"
            aria-label="YK MENS FASHION Home"
          >
            <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl border-2 border-espresso bg-butter text-espresso font-display font-black text-lg sm:text-xl shadow-[2px_2px_0px_#241B16] group-hover:bg-coral group-hover:text-white transition-colors">
              YK
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-lg sm:text-2xl tracking-tight leading-none text-espresso">
                YK MENS FASHION
              </span>
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-burnt-orange leading-tight flex items-center gap-1 mt-0.5">
                <span>EST. 2026</span>
                <span className="text-[7px]">✦</span>
                <span>MEN'S STREETWEAR ATELIER</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `relative px-3.5 py-1.5 rounded-full font-sans text-xs font-bold uppercase tracking-wider transition-all ${
                    isActive
                      ? 'bg-butter text-espresso border-2 border-espresso shadow-[2px_2px_0px_#241B16]'
                      : 'text-espresso/80 hover:text-espresso hover:bg-cream-dark'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right Action Icons & Bag */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Pill Button */}
            <Link
              to="/search"
              className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full border-2 border-espresso bg-white text-espresso/80 hover:text-espresso hover:border-espresso shadow-[2px_2px_0px_#241B16] transition-all text-xs font-semibold"
              aria-label="Search items"
            >
              <Search className="w-3.5 h-3.5 text-espresso" />
              <span className="hidden md:inline text-xs font-bold text-espresso/70">
                Search men's tees...
              </span>
            </Link>

            {/* Wishlist Button */}
            <Link
              to="/shop"
              className="relative flex h-9 w-9 items-center justify-center rounded-xl border-2 border-espresso bg-white text-espresso shadow-[2px_2px_0px_#241B16] hover:bg-cream-dark transition-all"
              aria-label="Wishlist"
              title="Saved items"
            >
              <Heart
                className={`w-4 h-4 transition-colors ${
                  wishlist.length > 0 ? 'fill-coral text-coral' : 'text-espresso'
                }`}
              />
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-coral border border-espresso text-[9px] font-black text-white">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Bag Pill Button */}
            <Link
              to="/cart"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl border-2 border-espresso bg-coral text-white font-bold text-xs uppercase tracking-wider shadow-[2px_2px_0px_#241B16] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_#241B16] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
              aria-label={`Shopping bag with ${totalQty} items`}
            >
              <ShoppingBag className="w-4 h-4 text-white" />
              <span>BAG</span>
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-espresso text-[11px] font-black border border-espresso">
                {totalQty}
              </span>
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden flex h-9 w-9 items-center justify-center rounded-xl border-2 border-espresso bg-butter text-espresso shadow-[2px_2px_0px_#241B16] active:translate-x-[1px] active:translate-y-[1px] transition-all"
              aria-label="Open mobile menu"
            >
              <Menu className="w-5 h-5 text-espresso" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen Mobile Menu */}
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}
