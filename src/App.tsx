import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { CustomerAuthProvider } from './context/CustomerAuthContext'
import HomePage from './pages/HomePage'
import CategoryPage from './pages/CategoryPage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import AdminClearData from './pages/AdminClearData'
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
import AboutPage from './pages/AboutPage'
import DeliveryPage from './pages/DeliveryPage'
import PaymentPage from './pages/PaymentPage'
import ReturnsPage from './pages/ReturnsPage'
import SellerConditionsPage from './pages/SellerConditionsPage'
import SellerFAQPage from './pages/SellerFAQPage'
import SellerSupportPage from './pages/SellerSupportPage'
import FAQPage from './pages/FAQPage'
import ContactPage from './pages/ContactPage'
import SupportPage from './pages/SupportPage'
import FeedbackPage from './pages/FeedbackPage'
import PrivacyPage from './pages/PrivacyPage'
import TermsPage from './pages/TermsPage'
import LegalPage from './pages/LegalPage'
import CareersPage from './pages/CareersPage'

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
            <Route path="/admin/clear-data" element={<AdminClearData />} />
            <Route path="/seller" element={<SellerLanding />} />
            <Route path="/seller/register" element={<SellerRegister />} />
            <Route path="/seller/login" element={<SellerLogin />} />
            <Route path="/seller/dashboard" element={<SellerDashboard />} />
            <Route path="/pic" element={<PicSellerLanding />} />
            <Route path="/pic/register" element={<PicSellerRegister />} />
            <Route path="/pic/login" element={<PicSellerLogin />} />
            <Route path="/pic/dashboard" element={<PicSellerDashboard />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/delivery" element={<DeliveryPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/returns" element={<ReturnsPage />} />
            <Route path="/seller-conditions" element={<SellerConditionsPage />} />
            <Route path="/seller-faq" element={<SellerFAQPage />} />
            <Route path="/seller-support" element={<SellerSupportPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/feedback" element={<FeedbackPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/legal" element={<LegalPage />} />
            <Route path="/careers" element={<CareersPage />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </CustomerAuthProvider>
  )
}