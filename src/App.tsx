import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { CustomerAuthProvider } from './context/CustomerAuthContext'
import HomePage from './pages/HomePage'
import CategoryPage from './pages/CategoryPage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import SellerRegister from './pages/SellerRegister'
import SellerLogin from './pages/SellerLogin'
import SellerDashboard from './pages/SellerDashboard'
import SellerLanding from './pages/SellerLanding'
import CustomerRegister from './pages/CustomerRegister'
import CustomerLogin from './pages/CustomerLogin'
import CustomerProfile from './pages/CustomerProfile'
import PicSellerLanding from './pages/PicSellerLanding'
import PicSellerRegister from './pages/PicSellerRegister'
import PicSellerLogin from './pages/PicSellerLogin'
import PicSellerDashboard from './pages/PicSellerDashboard'

export default function App() {
  return (
    <CustomerAuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/category/:id" element={<CategoryPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/register" element={<CustomerRegister />} />
            <Route path="/login" element={<CustomerLogin />} />
            <Route path="/profile" element={<CustomerProfile />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/seller" element={<SellerLanding />} />
            <Route path="/seller/register" element={<SellerRegister />} />
            <Route path="/seller/login" element={<SellerLogin />} />
            <Route path="/seller/dashboard" element={<SellerDashboard />} />
            <Route path="/pic" element={<PicSellerLanding />} />
            <Route path="/pic/register" element={<PicSellerRegister />} />
            <Route path="/pic/login" element={<PicSellerLogin />} />
            <Route path="/pic/dashboard" element={<PicSellerDashboard />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </CustomerAuthProvider>
  )
}