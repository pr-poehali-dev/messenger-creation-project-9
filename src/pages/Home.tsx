import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import ProductCard from '@/components/ProductCard';
import { useState, useEffect } from 'react';

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

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Store" size={32} className="text-primary" />
              <h1 className="text-2xl font-bold">Маркетплейс</h1>
            </div>
            <nav className="flex items-center gap-4">
              <Link to="/seller" className="flex items-center gap-2 text-foreground hover:text-primary">
                <Icon name="Package" size={20} />
                Для продавцов
              </Link>
              <Link to="/profile" className="flex items-center gap-2 text-foreground hover:text-primary">
                <Icon name="User" size={20} />
                Профиль
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Все товары</h2>
          <p className="text-muted-foreground">Выбирайте лучшие товары от проверенных продавцов</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Icon name="Loader" size={48} className="animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {!loading && products.length === 0 && (
          <div className="text-center py-12">
            <Icon name="Package" size={48} className="mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">Товары скоро появятся</p>
          </div>
        )}
      </main>
    </div>
  );
}