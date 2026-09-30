import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, Shirt, Palette, Sparkles, Search, Layers } from 'lucide-react'
import { navLinks } from './Navbar.jsx'
import { DoodleStar } from '../common/Doodles.jsx'

export default function MobileMenu({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-espresso/50 backdrop-blur-xs lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Slide-out Drawer Panel */}
          <motion.div
            id="mobile-menu"
            className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-[#FFF1DF] border-l-3 border-espresso shadow-retro-xl flex flex-col justify-between overflow-y-auto lg:hidden"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          >
            {/* Header */}
            <div>
              <div className="flex items-center justify-between p-5 border-b-2 border-espresso bg-butter">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border-2 border-espresso bg-white font-display font-black text-sm shadow-[2px_2px_0px_#241B16]">
                    YK
                  </div>
                  <div>
                    <span className="font-display font-black text-lg tracking-tight text-espresso block leading-none">
                      YK MENS FASHION
                    </span>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-burnt-orange">
                      MEN'S STREETWEAR
                    </span>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border-2 border-espresso bg-white text-espresso hover:bg-coral hover:text-white transition-colors shadow-[2px_2px_0px_#241B16]"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5 stroke-[2.5]" />
                </button>
              </div>

              {/* Main Links */}
              <nav className="p-6 flex flex-col gap-3">
                <p className="text-[11px] font-black uppercase tracking-widest text-espresso/70 flex items-center gap-1.5 mb-1">
                  <span>ATELIER DIRECTORY</span>
                  <DoodleStar className="w-3.5 h-3.5 text-coral" />
                </p>

                {navLinks.map((link, idx) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-4 py-3.5 rounded-2xl border-2 border-espresso font-display font-black text-lg tracking-tight shadow-[3px_3px_0px_#241B16] transition-transform active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ${
                        isActive
                          ? 'bg-coral text-white'
                          : idx % 2 === 0
                          ? 'bg-white text-espresso'
                          : 'bg-[#FDF6EE] text-espresso'
                      }`
                    }
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </NavLink>
                ))}
              </nav>

              {/* Quick Category Chips */}
              <div className="px-6 py-2">
                <p className="text-[11px] font-black uppercase tracking-widest text-espresso/70 mb-2.5">
                  MEN'S SILHOUETTES
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/collection/oversized"
                    onClick={onClose}
                    className="flex items-center gap-2 p-2.5 rounded-xl border-2 border-espresso bg-white shadow-[2px_2px_0px_#241B16] text-xs font-bold text-espresso hover:bg-butter transition-colors"
                  >
                    <span className="h-7 w-7 rounded-full bg-butter border border-espresso flex items-center justify-center text-espresso">
                      <Shirt className="w-3.5 h-3.5" />
                    </span>
                    <span>Oversized</span>
                  </Link>
                  <Link
                    to="/collection/graphic"
                    onClick={onClose}
                    className="flex items-center gap-2 p-2.5 rounded-xl border-2 border-espresso bg-white shadow-[2px_2px_0px_#241B16] text-xs font-bold text-espresso hover:bg-coral hover:text-white transition-colors"
                  >
                    <span className="h-7 w-7 rounded-full bg-coral text-white border border-espresso flex items-center justify-center">
                      <Palette className="w-3.5 h-3.5" />
                    </span>
                    <span>Graphic</span>
                  </Link>
                  <Link
                    to="/collection/essentials"
                    onClick={onClose}
                    className="flex items-center gap-2 p-2.5 rounded-xl border-2 border-espresso bg-white shadow-[2px_2px_0px_#241B16] text-xs font-bold text-espresso hover:bg-teal hover:text-white transition-colors"
                  >
                    <span className="h-7 w-7 rounded-full bg-teal text-white border border-espresso flex items-center justify-center">
                      <Layers className="w-3.5 h-3.5" />
                    </span>
                    <span>Essentials</span>
                  </Link>
                  <Link
                    to="/search"
                    onClick={onClose}
                    className="flex items-center gap-2 p-2.5 rounded-xl border-2 border-espresso bg-white shadow-[2px_2px_0px_#241B16] text-xs font-bold text-espresso hover:bg-dusty-blue hover:text-white transition-colors"
                  >
                    <span className="h-7 w-7 rounded-full bg-sage border border-espresso flex items-center justify-center text-espresso">
                      <Search className="w-3.5 h-3.5" />
                    </span>
                    <span>Search</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Bottom Footer Info */}
            <div className="p-6 border-t-2 border-espresso bg-[#FDF6EE] mt-6">
              <div className="p-3.5 rounded-xl border-2 border-dashed border-espresso bg-butter/40 mb-4 text-center">
                <span className="font-hand text-lg text-espresso block">
                  Men's Limited Drop 04
                </span>
                <span className="text-[11px] font-bold text-espresso/80 uppercase">
                  Hand-printed in numbered runs
                </span>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-espresso/50 text-center">
                © YK MENS FASHION 2026 • ALL RIGHTS RESERVED
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
