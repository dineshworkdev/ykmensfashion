import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from '../navigation/Navbar.jsx'
import PageTransition from './PageTransition.jsx'
import Footer from './Footer.jsx'

export default function SiteLayout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden w-full">
      <Navbar />
      <main className="flex-1 min-w-0">
        <PageTransition key={pathname}>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
    </div>
  )
}
