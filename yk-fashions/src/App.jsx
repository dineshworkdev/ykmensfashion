import { Routes, Route } from 'react-router-dom'
import SiteLayout from './components/layout/SiteLayout.jsx'
import Home from './pages/Home.jsx'
import Shop from './pages/Shop.jsx'
import Product from './pages/Product.jsx'
import Collection from './pages/Collection.jsx'
import Lookbook from './pages/Lookbook.jsx'
import About from './pages/About.jsx'
import Search from './pages/Search.jsx'
import Cart from './pages/Cart.jsx'
import Checkout from './pages/Checkout.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="collection/:slug" element={<Collection />} />
        <Route path="product/:slug" element={<Product />} />
        <Route path="lookbook" element={<Lookbook />} />
        <Route path="about" element={<About />} />
        <Route path="search" element={<Search />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  )
}
