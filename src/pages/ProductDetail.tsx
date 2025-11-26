import { useParams, Link, useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  seller_name: string;
  seller_id: string;
}

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://functions.poehali.dev/products?id=${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data.product);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleBuy = () => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/profile');
      return;
    }
    alert('Функция покупки будет добавлена позже');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Icon name="Loader" size={48} className="animate-spin text-primary" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <Icon name="PackageX" size={64} className="text-muted-foreground" />
        <p className="text-muted-foreground">Товар не найден</p>
        <Link to="/">
          <Button>Вернуться на главную</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="flex items-center gap-2 text-foreground hover:text-primary">
            <Icon name="ArrowLeft" size={24} />
            <span>Назад</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="aspect-square rounded-lg overflow-hidden bg-muted">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
              <p className="text-muted-foreground text-lg">{product.description}</p>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <Icon name="Store" size={20} />
              <span>Продавец: {product.seller_name}</span>
            </div>

            <div className="border-t pt-6">
              <div className="text-4xl font-bold text-primary mb-6">{product.price} ₽</div>
              <Button onClick={handleBuy} size="lg" className="w-full md:w-auto">
                <Icon name="ShoppingCart" size={20} className="mr-2" />
                Купить
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
