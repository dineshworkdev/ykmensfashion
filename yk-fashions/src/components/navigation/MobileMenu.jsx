import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, ArrowUpRight } from 'lucide-react'
import { navLinks } from './Navbar.jsx'

export default function MobileMenu({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-espresso/60 backdrop-blur-xs lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Slide-out Editorial Drawer */}
          <motion.div
            id="mobile-menu"
            className="fixed inset-y-0 right-0 z-50 w-full max-w-xs sm:max-w-sm bg-[#163730] text-[#FFF1DF] border-l border-white/15 shadow-2xl flex flex-col justify-between overflow-y-auto lg:hidden"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
          >
            {/* Top Bar */}
            <div className="p-5 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-[2px] border border-white/30 bg-white/10 text-white font-serif italic text-sm font-bold">
                  YK
                </div>
                <span className="font-display font-bold text-sm tracking-tight text-white">
                  YK MENS FASHION
                </span>
              </div>
              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-[2px] border border-white/20 text-white hover:bg-white/10 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-4 h-4 stroke-[2]" />
              </button>
            </div>

            {/* Nav Links */}
            <div className="p-6 flex flex-col justify-center flex-1">
              <nav className="flex flex-col space-y-1">
                <motion.div
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0, duration: 0.25 }}
                >
                  <NavLink
                    to="/"
                    end
                    onClick={onClose}
                    className={({ isActive }) =>
                      `group flex items-center justify-between py-3 border-b border-white/10 transition-colors ${
                        isActive
                          ? 'text-coral font-bold'
                          : 'text-[#FFF1DF]/80 hover:text-white'
                      }`
                    }
                  >
                    <span className="font-display font-medium text-xl tracking-tight">
                      HOME
                    </span>
                    <ArrowRight className="w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </NavLink>
                </motion.div>

                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * (idx + 1), duration: 0.25 }}
                  >
                    <NavLink
                      to={link.to}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `group flex items-center justify-between py-3 border-b border-white/10 transition-colors ${
                          isActive
                            ? 'text-coral font-bold'
                            : 'text-[#FFF1DF]/80 hover:text-white'
                        }`
                      }
                    >
                      <span className="font-display font-medium text-xl tracking-tight">
                        {link.label}
                      </span>
                      <ArrowRight className="w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </NavLink>
                  </motion.div>
                ))}
              </nav>

              {/* Collections Sub-menu */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-coral mb-3">
                  MEN'S SILHOUETTES
                </p>
                <div className="flex flex-col gap-2">
                  <Link
                    to="/collection/oversized"
                    onClick={onClose}
                    className="text-xs font-medium text-[#FFF1DF]/70 hover:text-white transition-colors flex items-center justify-between py-1"
                  >
                    <span>Oversized Series</span>
                    <ArrowUpRight className="w-3 h-3 opacity-40" />
                  </Link>
                  <Link
                    to="/collection/graphic"
                    onClick={onClose}
                    className="text-xs font-medium text-[#FFF1DF]/70 hover:text-white transition-colors flex items-center justify-between py-1"
                  >
                    <span>Graphic Prints</span>
                    <ArrowUpRight className="w-3 h-3 opacity-40" />
                  </Link>
                  <Link
                    to="/collection/essentials"
                    onClick={onClose}
                    className="text-xs font-medium text-[#FFF1DF]/70 hover:text-white transition-colors flex items-center justify-between py-1"
                  >
                    <span>Daily Essentials</span>
                    <ArrowUpRight className="w-3 h-3 opacity-40" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Bottom Footer */}
            <div className="p-5 border-t border-white/10 bg-black/15 flex items-center justify-between text-xs text-[#FFF1DF]/60">
              <Link to="/search" onClick={onClose} className="hover:text-white transition-colors">
                Search
              </Link>
              <span>•</span>
              <Link to="/about" onClick={onClose} className="hover:text-white transition-colors">
                Atelier Story
              </Link>
              <span>•</span>
              <span className="text-[10px] font-medium">YK © 2026</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
