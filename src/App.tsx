import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { SellerAuthProvider } from "@/contexts/SellerAuthContext";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import ProfilePage from "./pages/ProfilePage";
import SellerLoginPage from "./pages/seller/SellerLoginPage";
import SellerDashboardPage from "./pages/seller/SellerDashboardPage";
import SellerProductsPage from "./pages/seller/SellerProductsPage";
import SellerOrdersPage from "./pages/seller/SellerOrdersPage";
import { useEffect, useState } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  const [isSeller, setIsSeller] = useState(false)

  useEffect(() => {
    const hostname = window.location.hostname
    setIsSeller(hostname.startsWith('seller.'))
  }, [])

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <SellerAuthProvider>
            <CartProvider>
              <Toaster />
              <Sonner />
              {isSeller ? (
                <Routes>
                  <Route path="/" element={<Navigate to="/seller/login" replace />} />
                  <Route path="/seller/login" element={<SellerLoginPage />} />
                  <Route path="/seller/dashboard" element={<SellerDashboardPage />} />
                  <Route path="/seller/products" element={<SellerProductsPage />} />
                  <Route path="/seller/orders" element={<SellerOrdersPage />} />
                  <Route path="*" element={<Navigate to="/seller/login" replace />} />
                </Routes>
              ) : (
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/product/:slug" element={<ProductPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              )}
            </CartProvider>
          </SellerAuthProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </BrowserRouter>
  )
};

export default App;