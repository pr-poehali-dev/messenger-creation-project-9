import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import ProductCard from '@/components/ProductCard';
import ThemeToggle from '@/components/ThemeToggle';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  seller_name: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const mockProducts: Product[] = [
      {
        id: '1',
        name: 'Беспроводные наушники',
        description: 'Качественные беспроводные наушники с активным шумоподавлением',
        price: 5990,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop',
        seller_name: 'Электроника Про'
      },
      {
        id: '2',
        name: 'Смартфон Pro Max',
        description: 'Флагманский смартфон с отличной камерой и быстрой зарядкой',
        price: 79990,
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=800&fit=crop',
        seller_name: 'Электроника Про'
      },
      {
        id: '3',
        name: 'Умные часы',
        description: 'Фитнес-трекер с мониторингом сердечного ритма',
        price: 12990,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop',
        seller_name: 'Электроника Про'
      },
      {
        id: '4',
        name: 'Кожаная куртка',
        description: 'Стильная кожаная куртка из натуральной кожи',
        price: 24990,
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=800&fit=crop',
        seller_name: 'Модный Стиль'
      },
      {
        id: '5',
        name: 'Джинсы классические',
        description: 'Удобные джинсы классического кроя',
        price: 4990,
        image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&h=800&fit=crop',
        seller_name: 'Модный Стиль'
      },
      {
        id: '6',
        name: 'Кроссовки спортивные',
        description: 'Легкие кроссовки для бега и тренировок',
        price: 7990,
        image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&h=800&fit=crop',
        seller_name: 'Модный Стиль'
      },
      {
        id: '7',
        name: 'Книга "Искусство программирования"',
        description: 'Классический учебник по программированию',
        price: 2990,
        image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=800&fit=crop',
        seller_name: 'Книжный Мир'
      },
      {
        id: '8',
        name: 'Художественный роман',
        description: 'Бестселлер современной литературы',
        price: 990,
        image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&h=800&fit=crop',
        seller_name: 'Книжный Мир'
      }
    ];
    
    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 500);
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-purple-50/30 to-pink-50/20 dark:via-purple-950/20 dark:to-pink-950/10">
      <header className="backdrop-blur-xl bg-white/80 dark:bg-gray-950/80 border-b border-purple-100/50 dark:border-purple-900/30 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent blur-lg opacity-50 group-hover:opacity-70 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-primary to-accent p-2 rounded-2xl shadow-lg">
                  <Icon name="Sparkles" size={28} className="text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-purple-600 to-accent bg-clip-text text-transparent">
                  MarketHub
                </h1>
                <p className="text-xs text-muted-foreground">Стиль и качество</p>
              </div>
            </Link>
            
            <nav className="hidden md:flex items-center gap-2">
              <ThemeToggle />
              <Link 
                to="/seller" 
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-foreground hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
              >
                <Icon name="Store" size={18} />
                Для продавцов
              </Link>
              <Link 
                to="/profile" 
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-accent text-white shadow-lg hover:shadow-xl transition-all"
              >
                <Icon name="User" size={18} />
                Профиль
              </Link>
            </nav>

            <div className="md:hidden flex items-center gap-2">
              <ThemeToggle />
              <Link to="/profile">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-primary to-accent text-white flex items-center justify-center shadow-lg">
                  <Icon name="User" size={20} />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-800/50 dark:to-pink-800/50 rounded-full mb-4 animate-fade-in">
            <Icon name="TrendingUp" size={16} className="text-primary dark:text-purple-300" />
            <span className="text-sm font-medium text-purple-900 dark:text-purple-100">Топ товары сезона</span>
          </div>
          <h2 className="text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Откройте для себя лучшее
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Тщательно отобранные товары от проверенных продавцов
          </p>
          
          <div className="relative max-w-xl mx-auto">
            <Icon name="Search" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Найти товар..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-6 text-base rounded-2xl border-2 border-purple-100 dark:border-purple-900 focus:border-primary shadow-sm dark:bg-gray-900/50"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent blur-xl opacity-50"></div>
              <Icon name="Loader" size={48} className="relative animate-spin text-primary" />
            </div>
            <p className="mt-4 text-muted-foreground">Загружаем товары...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                style={{ animationDelay: `${index * 50}ms` }}
                className="animate-scale-in"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}

        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 mb-6">
              <Icon name="Search" size={40} className="text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Ничего не найдено</h3>
            <p className="text-muted-foreground">Попробуйте изменить запрос</p>
          </div>
        )}
      </main>

      <footer className="border-t border-purple-100 dark:border-purple-900/30 bg-white/50 dark:bg-gray-950/50 backdrop-blur-xl mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Icon name="Sparkles" size={20} className="text-primary" />
              <span className="text-sm text-muted-foreground">© 2024 MarketHub. Все права защищены.</span>
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">О нас</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Помощь</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Контакты</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}