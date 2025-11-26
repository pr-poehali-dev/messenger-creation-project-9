import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Profile from './pages/Profile';
import Seller from './pages/Seller';
import About from './pages/About';
import Contacts from './pages/Contacts';
import Help from './pages/Help';
import Delivery from './pages/Delivery';
import Payment from './pages/Payment';
import Return from './pages/Return';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/seller" element={<Seller />} />
        <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/help" element={<Help />} />
        <Route path="/delivery" element={<Delivery />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/return" element={<Return />} />
      </Routes>
    </BrowserRouter>
  );
}