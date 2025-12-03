import { useState, useEffect } from 'react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import Icon from './components/ui/icon';
import AuthScreen from './components/AuthScreen';
import ProfileScreen from './components/ProfileScreen';

interface Category {
  id: number;
  name: string;
  slug: string;
  image_url: string;
}

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  old_price: number | null;
  category_id: number;
  image_url: string;
  stock: number;
  rating: number;
  reviews_count: number;
  category_name: string;
}

interface User {
  userId: number;
  username: string;
  email: string;
  sessionToken: string;
}

type Screen = 'marketplace' | 'profile' | 'auth';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [screen, setScreen] = useState<Screen>('marketplace');
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<Map<number, number>>(new Map());

  useEffect(() => {
    const savedUser = localStorage.getItem('marketplace_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    
    loadCategories();
    loadProducts();
  }, []);

  useEffect(() => {
    loadProducts();
  }, [selectedCategory, searchQuery]);

  const handleLogin = (userId: number, username: string, email: string, sessionToken: string) => {
    const userData: User = { userId, username, email, sessionToken };
    setUser(userData);
    localStorage.setItem('marketplace_user', JSON.stringify(userData));
    setScreen('marketplace');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('marketplace_user');
    setScreen('marketplace');
    setCart(new Map());
  };

  const loadCategories = async () => {
    try {
      const response = await fetch(
        'https://functions.poehali.dev/05f9ce70-ff57-408b-b5b1-3a7dd268adc3?action=categories'
      );
      const data = await response.json();
      setCategories(data.categories || []);
    } catch (err) {
      console.error('Error loading categories:', err);
    }
  };

  const loadProducts = async () => {
    setLoading(true);
    try {
      let url = 'https://functions.poehali.dev/05f9ce70-ff57-408b-b5b1-3a7dd268adc3?action=products';
      if (selectedCategory) {
        url += `&category_id=${selectedCategory}`;
      }
      if (searchQuery) {
        url += `&search=${encodeURIComponent(searchQuery)}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      setProducts(data.products || []);
    } catch (err) {
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (productId: number) => {
    if (!user) {
      setScreen('auth');
      return;
    }
    const newCart = new Map(cart);
    newCart.set(productId, (newCart.get(productId) || 0) + 1);
    setCart(newCart);
  };

  const getTotalItems = () => {
    return Array.from(cart.values()).reduce((sum, qty) => sum + qty, 0);
  };

  const getTotalPrice = () => {
    return Array.from(cart.entries()).reduce((sum, [productId, qty]) => {
      const product = products.find(p => p.id === productId);
      return sum + (product ? product.price * qty : 0);
    }, 0);
  };

  if (screen === 'auth') {
    return <AuthScreen onLogin={handleLogin} />;
  }

  if (screen === 'profile' && user) {
    return (
      <ProfileScreen
        sessionToken={user.sessionToken}
        onBack={() => setScreen('marketplace')}
        onLogout={handleLogout}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-800">🛍️ Маркетплейс</h1>
            
            <div className="flex items-center gap-3">
              {user ? (
                <>
                  <Button variant="outline" size="sm" onClick={() => setScreen('profile')}>
                    <Icon name="User" size={18} className="mr-2" />
                    {user.username}
                  </Button>
                  
                  <div className="relative">
                    <Button className="relative">
                      <Icon name="ShoppingCart" size={20} />
                      {getTotalItems() > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {getTotalItems()}
                        </span>
                      )}
                    </Button>
                  </div>
                </>
              ) : (
                <Button onClick={() => setScreen('auth')}>
                  <Icon name="LogIn" size={18} className="mr-2" />
                  Войти
                </Button>
              )}
            </div>
          </div>

          <div className="relative">
            <Input
              type="text"
              placeholder="Поиск товаров..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <div className="container mx-auto px-4 pb-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Button
              variant={selectedCategory === null ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(null)}
            >
              Все
            </Button>
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.name}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {loading ? (
          <div className="text-center py-12">
            <div className="text-lg text-gray-600">Загрузка товаров...</div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="Package" size={64} className="mx-auto text-gray-300 mb-4" />
            <div className="text-lg text-gray-600">Товары не найдены</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="relative h-48 bg-gray-100">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {product.old_price && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                      -{Math.round((1 - product.price / product.old_price) * 100)}%
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <div className="text-xs text-gray-500 mb-1">{product.category_name}</div>
                  <h3 className="font-bold text-gray-800 mb-2 line-clamp-2">{product.name}</h3>
                  
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Icon
                          key={i}
                          name="Star"
                          size={14}
                          className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-600">
                      {product.rating} ({product.reviews_count})
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>

                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="text-2xl font-bold text-gray-800">
                        {product.price.toLocaleString('ru-RU')} ₽
                      </div>
                      {product.old_price && (
                        <div className="text-sm text-gray-400 line-through">
                          {product.old_price.toLocaleString('ru-RU')} ₽
                        </div>
                      )}
                    </div>
                    <div className="text-xs text-gray-500">
                      {product.stock > 0 ? `В наличии: ${product.stock}` : 'Нет в наличии'}
                    </div>
                  </div>

                  <Button
                    className="w-full"
                    onClick={() => addToCart(product.id)}
                    disabled={product.stock === 0}
                  >
                    <Icon name="ShoppingCart" size={18} className="mr-2" />
                    В корзину
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {user && getTotalItems() > 0 && (
        <div className="fixed bottom-4 right-4 bg-white rounded-xl shadow-2xl p-4 min-w-[300px]">
          <h3 className="font-bold text-gray-800 mb-2">Корзина</h3>
          <div className="text-sm text-gray-600 mb-1">Товаров: {getTotalItems()}</div>
          <div className="text-xl font-bold text-gray-800 mb-3">
            {getTotalPrice().toLocaleString('ru-RU')} ₽
          </div>
          <Button className="w-full">
            Оформить заказ
          </Button>
        </div>
      )}
    </div>
  );
}
