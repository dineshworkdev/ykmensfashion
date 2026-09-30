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
      setScrolled(window.scrollY > 15)
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
      {/* Main Sticky Navbar — Slim, elegant, calm */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 bg-[#FFF1DF] ${
          scrolled
            ? 'border-b-2 border-espresso shadow-retro py-1.5 sm:py-2.5'
            : 'border-b-2 border-espresso py-2 sm:py-3.5'
        }`}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-3 sm:px-6 lg:px-10 gap-2">
          {/* Brand Logo — Compact and clean */}
          <Link
            to="/"
            className="group flex items-center gap-1.5 sm:gap-2.5 transition-transform active:scale-95 min-w-0 shrink"
            aria-label="YK MENS FASHION Home"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg sm:rounded-xl border-2 border-espresso bg-[#F2C94C] text-espresso font-display font-black text-sm shadow-[2px_2px_0px_#241B16] group-hover:bg-coral group-hover:text-white transition-colors">
              YK
            </div>
            <span className="font-display font-black text-[13px] sm:text-xl tracking-tight text-espresso">
              YK MENS FASHION
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-full font-sans text-xs font-bold uppercase tracking-wider transition-all ${
                    isActive
                      ? 'bg-butter text-white border-2 border-espresso shadow-[2px_2px_0px_#241B16]'
                      : 'text-espresso/80 hover:text-espresso hover:bg-cream-dark'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right Action Icons & Bag */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {/* Search Button */}
            <Link
              to="/search"
              className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg sm:rounded-xl border-2 border-espresso bg-white text-espresso shadow-[2px_2px_0px_#241B16] hover:bg-cream-dark transition-all"
              aria-label="Search items"
            >
              <Search className="w-4 h-4 text-espresso" />
            </Link>

            {/* Wishlist Button */}
            <Link
              to="/shop"
              className="relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg sm:rounded-xl border-2 border-espresso bg-white text-espresso shadow-[2px_2px_0px_#241B16] hover:bg-cream-dark transition-all"
              aria-label="Wishlist"
              title="Saved items"
            >
              <Heart
                className={`w-4 h-4 transition-colors ${
                  wishlist.length > 0 ? 'fill-coral text-coral' : 'text-espresso'
                }`}
              />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-coral border border-espresso text-[8px] font-black text-white">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Bag Button — Compact, not a giant brick */}
            <Link
              to="/cart"
              className="flex items-center gap-1 sm:gap-1.5 h-8 sm:h-9 px-2 sm:px-3 rounded-lg sm:rounded-xl border-2 border-espresso bg-coral text-white font-bold text-xs uppercase tracking-wider shadow-[2px_2px_0px_#241B16] hover:shadow-[3px_3px_0px_#241B16] active:shadow-none transition-all"
              aria-label={`Shopping bag with ${totalQty} items`}
            >
              <ShoppingBag className="w-3.5 h-3.5 text-white" />
              <span className="text-[11px] sm:text-xs hidden sm:inline">BAG</span>
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white text-espresso text-[10px] font-black border border-espresso">
                {totalQty}
              </span>
            </Link>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden flex h-8 w-8 items-center justify-center rounded-lg border-2 border-espresso bg-butter text-white shadow-[2px_2px_0px_#241B16] active:translate-x-[1px] active:translate-y-[1px] transition-all"
              aria-label="Open mobile menu"
            >
              <Menu className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen Mobile Menu */}
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}
