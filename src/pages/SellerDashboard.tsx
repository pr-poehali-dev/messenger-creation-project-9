import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import MobileMenu from '@/components/MobileMenu';
import { getAuthState } from '@/lib/auth';
import { getProductsBySeller, addProduct, updateProduct, deleteProduct, Product } from '@/lib/products';
import { getSellerStoryPromotions, createStoryPromotion, payForStoryPromotion, deleteStoryPromotion, STORY_PRICES, StoryPromotion } from '@/lib/stories';
import DashboardStats from '@/components/seller/DashboardStats';
import ProductsTab from '@/components/seller/ProductsTab';
import StoriesTab from '@/components/seller/StoriesTab';

export default function SellerDashboard() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = getAuthState();
  const [products, setProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState<'products' | 'stories'>('products');
  const [storyPromotions, setStoryPromotions] = useState<StoryPromotion[]>([]);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'seller') {
      navigate('/auth');
      return;
    }
    loadProducts();
  }, [isAuthenticated, user, navigate]);

  const loadProducts = () => {
    if (user) {
      setProducts(getProductsBySeller(user.id));
      setStoryPromotions(getSellerStoryPromotions(user.id));
    }
  };

  const handleAddProduct = (productData: any) => {
    if (!user) return;

    addProduct({
      ...productData,
      rating: 4.5,
      reviews: 0,
      sellerId: user.id,
      sellerName: user.name
    });
    loadProducts();
  };

  const handleUpdateProduct = (id: string, productData: any) => {
    updateProduct(id, productData);
    loadProducts();
  };

  const handleDeleteProduct = (id: string) => {
    deleteProduct(id);
    loadProducts();
  };

  const handleCreateStoryPromotion = (productId: string, duration: keyof typeof STORY_PRICES) => {
    if (!user) return;

    const product = products.find(p => p.id === productId);
    if (!product) return;

    const daysMap = {
      '1day': 1,
      '3days': 3,
      '7days': 7,
      '14days': 14,
      '30days': 30
    };

    const days = daysMap[duration];
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + days);

    createStoryPromotion({
      sellerId: user.id,
      sellerName: user.name,
      productId: product.id,
      productName: product.name,
      productImage: product.image,
      productPrice: product.price,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      paid: false,
      price: STORY_PRICES[duration]
    });

    loadProducts();
  };

  const handlePayStory = (promotionId: string) => {
    payForStoryPromotion(promotionId);
    loadProducts();
  };

  const handleDeleteStory = (promotionId: string) => {
    deleteStoryPromotion(promotionId);
    loadProducts();
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/profile" className="flex items-center gap-2 text-gray-700 hover:text-purple-600">
              <Icon name="ArrowLeft" size={24} />
              <span className="font-medium">Профиль</span>
            </Link>
            <div className="flex items-center gap-2">
              <Icon name="Store" size={24} className="text-purple-600" />
              <h1 className="text-xl font-bold">Кабинет продавца</h1>
            </div>
            <Link to="/">
              <Button variant="ghost" size="icon">
                <Icon name="Home" size={22} />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <DashboardStats products={products} />

        <div className="flex gap-2 mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-6 py-3 font-semibold transition-all ${
              activeTab === 'products'
                ? 'text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <Icon name="Package" size={20} />
              Товары
            </div>
          </button>
          <button
            onClick={() => setActiveTab('stories')}
            className={`px-6 py-3 font-semibold transition-all ${
              activeTab === 'stories'
                ? 'text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <Icon name="Sparkles" size={20} />
              Stories
            </div>
          </button>
        </div>

        {activeTab === 'products' && (
          <ProductsTab
            products={products}
            onAddProduct={handleAddProduct}
            onUpdateProduct={handleUpdateProduct}
            onDeleteProduct={handleDeleteProduct}
          />
        )}

        {activeTab === 'stories' && (
          <StoriesTab
            products={products}
            storyPromotions={storyPromotions}
            onCreatePromotion={handleCreateStoryPromotion}
            onPayStory={handlePayStory}
            onDeleteStory={handleDeleteStory}
          />
        )}
      </div>
      
      <MobileMenu />
    </div>
  );
}
