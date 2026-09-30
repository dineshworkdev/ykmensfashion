import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Search, Heart, ShoppingBag, Menu } from 'lucide-react'
import { useCart } from '../../context/CartContext.jsx'
import { useWishlist } from '../../context/WishlistContext.jsx'
import MobileMenu from './MobileMenu.jsx'

export const navLinks = [
  { to: '/shop', label: 'SHOP' },
  { to: '/shop?filter=new', label: 'NEW ARRIVALS' },
  { to: '/collection/oversized', label: 'COLLECTIONS' },
  { to: '/lookbook', label: 'STYLE' },
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

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  return (
    <>
      {/* Main Sticky Navbar — Architectural, clean, high-fashion */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 bg-[#FFF1DF]/95 backdrop-blur-md ${
          scrolled
            ? 'border-b border-espresso/20 py-2.5 sm:py-3 shadow-xs'
            : 'border-b border-espresso/15 py-3 sm:py-4'
        }`}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-10 gap-3">
          {/* Brand Identity */}
          <Link
            to="/"
            className="group flex items-center gap-2.5 transition-opacity hover:opacity-90 min-w-0 shrink"
            aria-label="YK MENS FASHION Home"
          >
            <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-[2px] border border-espresso bg-espresso text-cream font-serif italic text-sm sm:text-base font-bold transition-transform group-hover:scale-105">
              YK
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-sm sm:text-lg tracking-tight text-espresso leading-none">
                YK MENS FASHION
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] font-semibold text-espresso/60 hidden sm:block">
                MEN'S T-SHIRTS
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `relative py-1 font-sans text-xs font-semibold uppercase tracking-[0.14em] transition-colors ${
                    isActive
                      ? 'text-espresso font-bold'
                      : 'text-espresso/70 hover:text-espresso'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-coral rounded-full" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right Action Icons & Bag */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Search */}
            <Link
              to="/search"
              className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-[2px] border border-espresso/20 bg-white/80 text-espresso hover:border-espresso hover:bg-white active:scale-95 transition-all"
              aria-label="Search items"
            >
              <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-espresso/80" strokeWidth={1.8} />
            </Link>

            {/* Wishlist */}
            <Link
              to="/shop"
              className="relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-[2px] border border-espresso/20 bg-white/80 text-espresso hover:border-espresso hover:bg-white active:scale-95 transition-all"
              aria-label="Wishlist"
              title="Saved items"
            >
              <Heart
                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors ${
                  wishlist.length > 0 ? 'fill-coral text-coral' : 'text-espresso/80'
                }`}
                strokeWidth={1.8}
              />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-coral text-[9px] font-bold text-white shadow-xs">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Shopping Bag Button — Refined fashion retail CTA */}
            <Link
              to="/cart"
              className="flex items-center gap-1.5 h-8 sm:h-9 px-2.5 sm:px-3 rounded-[2px] border border-espresso bg-espresso text-cream font-sans font-bold text-xs uppercase tracking-[0.12em] hover:bg-coral hover:border-coral transition-colors"
              aria-label={`Shopping bag with ${totalQty} items`}
            >
              <ShoppingBag className="w-3.5 h-3.5" strokeWidth={2} />
              <span className="hidden sm:inline">BAG</span>
              <span className="ml-0.5 px-1 py-0.2 rounded-full bg-white/20 text-white text-[10px] font-semibold">
                {totalQty}
              </span>
            </Link>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden flex h-8 w-8 items-center justify-center rounded-[2px] border border-espresso/30 bg-white/80 text-espresso hover:bg-white active:scale-95 transition-all"
              aria-label="Open mobile menu"
            >
              <Menu className="w-4 h-4 text-espresso" strokeWidth={2} />
            </button>
          </div>
        </div>
      </header>

      {/* Slide-over Mobile Navigation */}
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}
