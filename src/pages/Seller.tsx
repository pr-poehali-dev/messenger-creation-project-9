import { Link, useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState, useEffect } from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

export default function Seller() {
  const navigate = useNavigate();
  const [seller, setSeller] = useState<any>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [productName, setProductName] = useState('');
  const [productDesc, setProductDesc] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState('');

  useEffect(() => {
    const savedSeller = localStorage.getItem('seller');
    if (savedSeller) {
      const sellerData = JSON.parse(savedSeller);
      setSeller(sellerData);
      loadProducts(sellerData.id);
    }
  }, []);

  const loadProducts = async (sellerId: string) => {
    try {
      const response = await fetch(`https://functions.poehali.dev/seller?seller_id=${sellerId}`);
      const data = await response.json();
      setProducts(data.products || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRegister = async () => {
    if (!name) {
      alert('Введите название магазина');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://functions.poehali.dev/seller', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      });

      const data = await response.json();
      localStorage.setItem('seller', JSON.stringify(data.seller));
      setSeller(data.seller);
    } catch (err) {
      console.error(err);
      alert('Ошибка регистрации');
    }
    setLoading(false);
  };

  const handleAddProduct = async () => {
    if (!productName || !productDesc || !productPrice || !productImage) {
      alert('Заполните все поля');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://functions.poehali.dev/seller', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          seller_id: seller.id,
          action: 'add_product',
          product: {
            name: productName,
            description: productDesc,
            price: parseFloat(productPrice),
            image: productImage
          }
        })
      });

      await response.json();
      setShowAddProduct(false);
      setProductName('');
      setProductDesc('');
      setProductPrice('');
      setProductImage('');
      loadProducts(seller.id);
    } catch (err) {
      console.error(err);
      alert('Ошибка добавления товара');
    }
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('seller');
    setSeller(null);
    setProducts([]);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="flex items-center gap-2 text-foreground hover:text-primary">
            <Icon name="ArrowLeft" size={24} />
            <span>На главную</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {!seller ? (
          <div className="max-w-md mx-auto bg-card p-8 rounded-lg border">
            <h1 className="text-3xl font-bold mb-6 text-center">Регистрация продавца</h1>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Название магазина</label>
                <Input
                  type="text"
                  placeholder="Мой магазин"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <Button onClick={handleRegister} disabled={loading} className="w-full">
                {loading ? <Icon name="Loader" className="animate-spin" /> : 'Зарегистрироваться'}
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold mb-2">{seller.name}</h1>
                <p className="text-muted-foreground">Управление товарами</p>
              </div>
              <div className="flex gap-2">
                <Button onClick={() => setShowAddProduct(true)}>
                  <Icon name="Plus" size={20} className="mr-2" />
                  Добавить товар
                </Button>
                <Button onClick={handleLogout} variant="outline">
                  Выйти
                </Button>
              </div>
            </div>

            {showAddProduct && (
              <div className="bg-card p-6 rounded-lg border mb-8">
                <h2 className="text-2xl font-bold mb-4">Новый товар</h2>
                <div className="space-y-4">
                  <Input
                    placeholder="Название товара"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                  <Textarea
                    placeholder="Описание товара"
                    value={productDesc}
                    onChange={(e) => setProductDesc(e.target.value)}
                  />
                  <Input
                    type="number"
                    placeholder="Цена"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                  />
                  <Input
                    placeholder="URL изображения"
                    value={productImage}
                    onChange={(e) => setProductImage(e.target.value)}
                  />
                  <div className="flex gap-2">
                    <Button onClick={handleAddProduct} disabled={loading}>
                      {loading ? <Icon name="Loader" className="animate-spin" /> : 'Добавить'}
                    </Button>
                    <Button onClick={() => setShowAddProduct(false)} variant="outline">
                      Отмена
                    </Button>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map(product => (
                <div key={product.id} className="bg-card rounded-lg border overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="font-bold mb-2">{product.name}</h3>
                    <p className="text-primary font-bold">{product.price} ₽</p>
                  </div>
                </div>
              ))}
            </div>

            {products.length === 0 && !showAddProduct && (
              <div className="text-center py-12">
                <Icon name="Package" size={48} className="mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">Добавьте первый товар</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
