import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import App from './App.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { WishlistProvider } from './context/WishlistContext.jsx'
import './styles/index.css'

// ─── Brand loader ────────────────────────────────────────────────────────────
// Displays the approved SVG brand intro animation, perfectly centered and responsive across all viewports.
function Loader({ onDone }) {
  useEffect(() => {
    // Approved SVG animation duration is ~3.6s with a freeze hold; give it 3.75s then transition out
    const t = setTimeout(onDone, 3750)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <motion.div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-[#FEFEFE] overflow-hidden select-none"
      style={{ backgroundColor: '#FEFEFE' }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* SVG container — responsive, centered, seamlessly blends with the #FEFEFE full-screen canvas */}
      <div className="relative w-[85vw] max-w-[460px] sm:max-w-[540px] md:max-w-[600px] max-h-[85vh] aspect-square flex items-center justify-center">
        <img
          src="/videos/animation.svg"
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
