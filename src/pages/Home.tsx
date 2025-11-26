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
    fetch('https://functions.poehali.dev/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
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
