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
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Slide-out Editorial Drawer — Deep Forest (#183D35) */}
          <motion.div
            id="mobile-menu"
            className="fixed inset-y-0 right-0 z-50 w-full max-w-xs sm:max-w-sm bg-[#183D35] text-[#FFF1DF] border-l-2 border-white/20 shadow-2xl flex flex-col justify-between overflow-y-auto lg:hidden"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
          >
            {/* Top Bar */}
            <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/30 bg-[#F2C94C] text-espresso font-display font-black text-xs">
                  YK
                </div>
                <span className="font-display font-black text-sm tracking-tight text-white">
                  YK MENS FASHION
                </span>
              </div>
              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/20 text-white hover:bg-white/10 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>

            {/* Main Editorial Nav Links — Typography-first, no giant boxes */}
            <div className="p-6 flex flex-col justify-center flex-1">
            <nav className="flex flex-col space-y-1">
                {/* HOME always first */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0, duration: 0.3 }}
                >
                  <NavLink
                    to="/"
                    end
                    onClick={onClose}
                    className={({ isActive }) =>
                      `group flex items-center justify-between py-3 border-b border-white/10 transition-colors ${
                        isActive
                          ? 'text-butter font-black'
                          : 'text-[#FFF1DF]/90 hover:text-white'
                      }`
                    }
                  >
                    <span className="font-display font-black text-2xl tracking-tight">
                      HOME
                    </span>
                    <ArrowRight className="w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </NavLink>
                </motion.div>

                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * (idx + 1), duration: 0.3 }}
                  >
                    <NavLink
                      to={link.to}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `group flex items-center justify-between py-3 border-b border-white/10 transition-colors ${
                          isActive
                            ? 'text-butter font-black'
                            : 'text-[#FFF1DF]/90 hover:text-white'
                        }`
                      }
                    >
                      <span className="font-display font-black text-2xl tracking-tight">
                        {link.label}
                      </span>
                      <ArrowRight className="w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </NavLink>
                  </motion.div>
                ))}
              </nav>

              {/* Men's Collections Minimal Sub-menu */}
              <div className="mt-8 pt-6 border-t border-white/15">
                <p className="text-[10px] font-black uppercase tracking-widest text-coral mb-3">
                  MEN'S SILHOUETTES
                </p>
                <div className="flex flex-col gap-2">
                  <Link
                    to="/collection/oversized"
                    onClick={onClose}
                    className="text-sm font-medium text-[#FFF1DF]/75 hover:text-butter transition-colors flex items-center justify-between"
                  >
                    <span>Oversized Series</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-40" />
                  </Link>
                  <Link
                    to="/collection/graphic"
                    onClick={onClose}
                    className="text-sm font-medium text-[#FFF1DF]/75 hover:text-butter transition-colors flex items-center justify-between"
                  >
                    <span>Graphic Prints</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-40" />
                  </Link>
                  <Link
                    to="/collection/essentials"
                    onClick={onClose}
                    className="text-sm font-medium text-[#FFF1DF]/75 hover:text-butter transition-colors flex items-center justify-between"
                  >
                    <span>Daily Essentials</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-40" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Bottom Minimal Footer Strip */}
            <div className="p-5 border-t border-white/10 bg-black/20 flex items-center justify-between text-xs text-[#FFF1DF]/60">
              <Link to="/search" onClick={onClose} className="hover:text-butter transition-colors">
                Search Archive
              </Link>
              <span>•</span>
              <Link to="/about" onClick={onClose} className="hover:text-butter transition-colors">
                About
              </Link>
              <span>•</span>
              <span className="text-[10px]">YK © 2026</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
