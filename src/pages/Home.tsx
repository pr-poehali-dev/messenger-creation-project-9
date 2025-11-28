import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import MobileMenu from '@/components/MobileMenu';
import { getProducts, Product } from '@/lib/products';
import { getAuthState } from '@/lib/auth';
import { getCartCount } from '@/lib/cart';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cartCount, setCartCount] = useState(0);
  const { user, isAuthenticated } = getAuthState();

  useEffect(() => {
    setProducts(getProducts());
    setCartCount(getCartCount());
    
    const handleCartUpdate = () => setCartCount(getCartCount());
    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, []);

  const categories = ['all', 'Смартфоны', 'Наушники', 'Ноутбуки', 'Часы', 'Планшеты', 'Камеры', 'Умный дом'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-2 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow">
                <Icon name="Sparkles" size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Peeky
                </h1>
                <p className="text-xs text-gray-500">Маркетплейс</p>
              </div>
            </Link>

            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <Input
                  type="search"
                  placeholder="Искать товары..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 h-12 rounded-full border-2 border-gray-200 focus:border-purple-500"
                />
                <Icon name="Search" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <nav className="flex items-center gap-2">
              <Link to="/seller-info" className="hidden md:block">
                <Button variant="ghost" className="gap-2">
                  <Icon name="Store" size={18} />
                  Продавцам
                </Button>
              </Link>
              
              <Link to="/cart">
                <Button variant="ghost" size="icon" className="relative">
                  <Icon name="ShoppingCart" size={22} />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                      {cartCount}
                    </span>
                  )}
                </Button>
              </Link>
              
              {isAuthenticated ? (
                <Link to={user?.role === 'seller' ? '/seller/dashboard' : '/profile'}>
                  <Button variant="default" className="gap-2">
                    <Icon name="User" size={18} />
                    <span className="hidden md:inline">{user?.name}</span>
                  </Button>
                </Link>
              ) : (
                <Link to="/auth">
                  <Button variant="default" className="gap-2">
                    <Icon name="LogIn" size={18} />
                    <span className="hidden md:inline">Войти</span>
                  </Button>
                </Link>
              )}
            </nav>
          </div>

          <div className="md:hidden mt-4">
            <div className="relative">
              <Input
                type="search"
                placeholder="Искать товары..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 h-12 rounded-full border-2 border-gray-200"
              />
              <Icon name="Search" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 pb-24 md:pb-6">
        <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide mb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full whitespace-nowrap font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {category === 'all' ? 'Все товары' : category}
            </button>
          ))}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <Icon name="Package" size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Товары не найдены</h3>
            <p className="text-gray-500">Попробуйте изменить поисковый запрос</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
      
      <MobileMenu />
    </div>
  );
}