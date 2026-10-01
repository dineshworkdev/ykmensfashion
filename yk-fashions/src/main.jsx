import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import App from './App.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { WishlistProvider } from './context/WishlistContext.jsx'
import './styles/index.css'

// ─── Brand loader ────────────────────────────────────────────────────────────
// Displays the SVG brand intro animation, perfectly centered on screen.
function Loader({ onDone }) {
  useEffect(() => {
    // SVG animation duration is ~3s; give it 3.1s then transition out
    const t = setTimeout(onDone, 3100)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <motion.div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-[#FFF1DF] overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* SVG container — responsive, centered, preserves native proportions */}
      <div className="relative w-full h-full max-w-[600px] max-h-[85vh] flex items-center justify-center p-4">
        <img
          src="/videos/yk-animation.svg"
          alt="YK Mens Fashion"
          className="w-full h-full object-contain pointer-events-none select-none"
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
