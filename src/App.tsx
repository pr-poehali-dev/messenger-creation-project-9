import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';

const Home = lazy(() => import('./pages/Home'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Cart = lazy(() => import('./pages/Cart'));
const Profile = lazy(() => import('./pages/Profile'));
const Seller = lazy(() => import('./pages/Seller'));
const About = lazy(() => import('./pages/About'));
const Contacts = lazy(() => import('./pages/Contacts'));
const Help = lazy(() => import('./pages/Help'));
const Delivery = lazy(() => import('./pages/Delivery'));
const Payment = lazy(() => import('./pages/Payment'));
const Return = lazy(() => import('./pages/Return'));
const Test = lazy(() => import('./pages/Test'));

const LoadingScreen = () => (
  <div style={{ 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    minHeight: '100vh',
    background: 'linear-gradient(to bottom right, #faf5ff, #fce7f3, #eff6ff)',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  }}>
    <div style={{ textAlign: 'center' }}>
      <div style={{ 
        width: '48px', 
        height: '48px', 
        margin: '0 auto 16px', 
        border: '3px solid #e9d5ff', 
        borderTopColor: '#9333ea', 
        borderRadius: '50%', 
        animation: 'spin 1s linear infinite' 
      }}></div>
      <p style={{ color: '#7c3aed', fontSize: '16px', fontWeight: 600 }}>Загрузка...</p>
    </div>
  </div>
);

export default function App() {
  console.log('[App] Rendering App component');
  
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<Test />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/seller" element={<Seller />} />
          <Route path="/about" element={<About />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/help" element={<Help />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/return" element={<Return />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}