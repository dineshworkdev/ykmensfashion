import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import App from './App.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { WishlistProvider } from './context/WishlistContext.jsx'
import './styles/index.css'

// ─── Brand loader ────────────────────────────────────────────────────────────
// Displays the brand intro animation video for its full duration before transitioning out.
function Loader({ onDone }) {
  const videoRef = useRef(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true
      const playPromise = videoRef.current.play()
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Autoplay prevented:', err)
          setTimeout(onDone, 4000)
        })
      }
    }
  }, [onDone])

  return (
    <motion.div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-[#FFF1DF] overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <video
        ref={videoRef}
        src="/videos/animation.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        disableRemotePlayback
        onEnded={onDone}
        onError={onDone}
        className="w-full h-full object-contain pointer-events-none"
      />
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
