import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { CartProvider } from "@/contexts/CartContext";
import { SellerAuthProvider } from "@/contexts/SellerAuthContext";
import { CustomerAuthProvider } from "@/contexts/CustomerAuthContext";
import { ProductsProvider } from "@/contexts/ProductsContext";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import ProfilePage from "./pages/ProfilePage";
import CustomerLoginPage from "./pages/CustomerLoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import SellerLoginPage from "./pages/seller/SellerLoginPage";
import SellerDashboardPage from "./pages/seller/SellerDashboardPage";
import SellerProductsPage from "./pages/seller/SellerProductsPage";
import SellerOrdersPage from "./pages/seller/SellerOrdersPage";
import SellerSettingsPage from "./pages/seller/SellerSettingsPage";
import SellerAnalyticsPage from "./pages/seller/SellerAnalyticsPage";
import SellerProtectedRoute from "./components/SellerProtectedRoute";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  const hostname = window.location.hostname
  const isSeller = hostname.startsWith('seller.')

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <TooltipProvider>
            <SellerAuthProvider>
              <CustomerAuthProvider>
                <ProductsProvider>
                  <CartProvider>
                    <Toaster />
                    <Sonner />
                    <div className="flex flex-col min-h-screen">
                {isSeller ? (
                  <Routes>
                    <Route path="/" element={<Navigate to="/seller/login" replace />} />
                    <Route path="/seller/login" element={<SellerLoginPage />} />
                    <Route 
                      path="/seller/dashboard" 
                      element={
                        <SellerProtectedRoute>
                          <SellerDashboardPage />
                        </SellerProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/seller/products" 
                      element={
                        <SellerProtectedRoute>
                          <SellerProductsPage />
                        </SellerProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/seller/orders" 
                      element={
                        <SellerProtectedRoute>
                          <SellerOrdersPage />
                        </SellerProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/seller/analytics" 
                      element={
                        <SellerProtectedRoute>
                          <SellerAnalyticsPage />
                        </SellerProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/seller/settings" 
                      element={
                        <SellerProtectedRoute>
                          <SellerSettingsPage />
                        </SellerProtectedRoute>
                      } 
                    />
                    <Route path="*" element={<Navigate to="/seller/login" replace />} />
                  </Routes>
                ) : (
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/category/:categoryId" element={<CategoryPage />} />
                    <Route path="/product/:slug" element={<ProductPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/login" element={<CustomerLoginPage />} />
                    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                )}
                  </div>
                </CartProvider>
              </ProductsProvider>
            </CustomerAuthProvider>
          </SellerAuthProvider>
        </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  )
};

export default App;