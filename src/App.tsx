import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import PageTransition from './components/PageTransition';
import { AdminProvider } from './contexts/AdminContext';

const Home = lazy(() => import('./pages/Home'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Cart = lazy(() => import('./pages/Cart'));
const BuyerAuth = lazy(() => import('./pages/BuyerAuth'));
const SellerAuth = lazy(() => import('./pages/SellerAuth'));
const Profile = lazy(() => import('./pages/Profile'));
const SellerDashboard = lazy(() => import('./pages/SellerDashboard'));
const SellerInfo = lazy(() => import('./pages/SellerInfo'));
const AdminAuth = lazy(() => import('./pages/AdminAuth'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-purple-600 font-semibold text-lg">Загрузка...</p>
      </div>
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/product/:id" element={<PageTransition><ProductDetail /></PageTransition>} />
        <Route path="/cart" element={<PageTransition><Cart /></PageTransition>} />
        <Route path="/buyer/auth" element={<PageTransition><BuyerAuth /></PageTransition>} />
        <Route path="/seller/auth" element={<PageTransition><SellerAuth /></PageTransition>} />
        <Route path="/profile" element={<PageTransition><Profile /></PageTransition>} />
        <Route path="/seller/dashboard" element={<PageTransition><SellerDashboard /></PageTransition>} />
        <Route path="/seller-info" element={<PageTransition><SellerInfo /></PageTransition>} />
        <Route path="/admin/auth" element={<PageTransition><AdminAuth /></PageTransition>} />
        <Route path="/admin/dashboard" element={<PageTransition><AdminDashboard /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <AdminProvider>
      <BrowserRouter>
        <Suspense fallback={<LoadingScreen />}>
          <AnimatedRoutes />
        </Suspense>
      </BrowserRouter>
    </AdminProvider>
  );
}