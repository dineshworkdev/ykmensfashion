import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import App from './App.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { WishlistProvider } from './context/WishlistContext.jsx'
import './styles/index.css'

// ─── Brand loader ────────────────────────────────────────────────────────────
// A refined retro brand introduction before the site reveals.
function Loader({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1600)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <motion.div
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#FFF1DF] text-[#241B16]"
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Brand wordmark & retro badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center text-center px-4"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border-3 border-espresso bg-butter font-display font-black text-2xl shadow-retro mb-4">
          YK
        </div>
        <h1 className="font-display font-black text-3xl sm:text-4xl tracking-tight text-espresso">
          YK MENS FASHION
        </h1>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-xs font-black uppercase tracking-widest text-terracotta">
            MEN'S STREETWEAR ATELIER
          </span>
          <span className="text-[10px] text-espresso">✦</span>
          <span className="text-xs font-bold uppercase tracking-wider text-espresso/70">
            240 GSM HEAVYWEIGHT
          </span>
        </div>
      </motion.div>

      {/* Progress bar */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-48 sm:w-64 h-2 rounded-full border border-espresso bg-white overflow-hidden">
        <motion.div
          className="h-full bg-coral"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        />
      </div>
    </motion.div>
  )
}

function Root() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      <AnimatePresence mode="wait">
        {!loaded && <Loader key="loader" onDone={() => setLoaded(true)} />}
      </AnimatePresence>

      {loaded && (
        <BrowserRouter>
          <CartProvider>
            <WishlistProvider>
              <App />
            </WishlistProvider>
          </CartProvider>
        </BrowserRouter>
      )}
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
)
