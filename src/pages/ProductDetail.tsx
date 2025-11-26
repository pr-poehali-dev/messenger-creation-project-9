import { useParams, Link, useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/ThemeToggle';
import { useState, useEffect } from 'react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  seller_name: string;
}

const mockProducts = [
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

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setTimeout(() => {
      const foundProduct = mockProducts.find(p => p.id === id);
      setProduct(foundProduct || null);
      setLoading(false);
    }, 300);
  }, [id]);

  const handleBuy = () => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/profile');
      return;
    }
    alert('Товар добавлен в корзину!');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-purple-50/30 to-pink-50/20 dark:via-purple-950/20 dark:to-pink-950/10 flex items-center justify-center">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent blur-xl opacity-50"></div>
          <Icon name="Loader" size={48} className="relative animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-purple-50/30 to-pink-50/20 dark:via-purple-950/20 dark:to-pink-950/10 flex flex-col items-center justify-center gap-6">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 flex items-center justify-center">
          <Icon name="PackageX" size={40} className="text-primary" />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Товар не найден</h2>
          <p className="text-muted-foreground mb-6">Этот товар больше не доступен</p>
          <Link to="/">
            <Button className="bg-gradient-to-r from-primary to-accent">
              <Icon name="Home" size={18} className="mr-2" />
              Вернуться на главную
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-purple-50/30 to-pink-50/20 dark:via-purple-950/20 dark:to-pink-950/10">
      <header className="backdrop-blur-xl bg-white/80 dark:bg-gray-950/80 border-b border-purple-100/50 dark:border-purple-900/30 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors group">
            <Icon name="ArrowLeft" size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Назад к каталогу</span>
          </Link>
          <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/20 shadow-2xl">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
            </div>
            
            <div className="absolute top-4 right-4 p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-lg">
              <Icon name="Heart" size={24} className="text-accent" />
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full">
                <Icon name="Store" size={16} className="text-primary" />
                <span className="text-sm font-medium text-purple-900 dark:text-purple-300">{product.seller_name}</span>
              </div>
              
              <h1 className="text-5xl font-bold leading-tight bg-gradient-to-r from-foreground via-purple-600 dark:via-purple-400 to-foreground bg-clip-text text-transparent">
                {product.name}
              </h1>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="flex items-center gap-4 p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl">
              <Icon name="CheckCircle" size={24} className="text-green-500" />
              <div>
                <div className="font-semibold text-foreground">В наличии</div>
                <div className="text-sm text-muted-foreground">Быстрая доставка</div>
              </div>
            </div>

            <div className="space-y-6 p-8 bg-white dark:bg-gray-900 rounded-3xl shadow-lg border border-purple-100 dark:border-purple-900/30">
              <div className="flex items-baseline gap-3">
                <span className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {(product.price * quantity).toLocaleString()} ₽
                </span>
                {quantity > 1 && (
                  <span className="text-lg text-muted-foreground">
                    {product.price.toLocaleString()} ₽ × {quantity}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-foreground">Количество:</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 flex items-center justify-center transition-colors"
                  >
                    <Icon name="Minus" size={18} />
                  </button>
                  <span className="w-12 text-center font-semibold text-lg">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 flex items-center justify-center transition-colors"
                  >
                    <Icon name="Plus" size={18} />
                  </button>
                </div>
              </div>

              <Button 
                onClick={handleBuy} 
                size="lg" 
                className="w-full bg-gradient-to-r from-primary to-accent text-white shadow-xl hover:shadow-2xl transition-all py-6 text-lg"
              >
                <Icon name="ShoppingCart" size={22} className="mr-2" />
                Добавить в корзину
              </Button>

              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-purple-100 dark:border-purple-900/30">
                <div className="text-center">
                  <Icon name="Truck" size={24} className="text-primary mx-auto mb-2" />
                  <div className="text-xs text-muted-foreground">Доставка</div>
                </div>
                <div className="text-center">
                  <Icon name="Shield" size={24} className="text-primary mx-auto mb-2" />
                  <div className="text-xs text-muted-foreground">Гарантия</div>
                </div>
                <div className="text-center">
                  <Icon name="RotateCcw" size={24} className="text-primary mx-auto mb-2" />
                  <div className="text-xs text-muted-foreground">Возврат</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}