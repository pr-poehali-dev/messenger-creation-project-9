import { Link, useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState, useEffect } from 'react';

interface Product {
  id: string;
  name: string;
  description: string;
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
      const savedProducts = localStorage.getItem(`seller_${sellerData.id}_products`);
      if (savedProducts) {
        setProducts(JSON.parse(savedProducts));
      }
    }
  }, []);

  const handleRegister = () => {
    if (!name) {
      alert('Введите название магазина');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const newSeller = { id: Date.now().toString(), name };
      localStorage.setItem('seller', JSON.stringify(newSeller));
      setSeller(newSeller);
      setLoading(false);
    }, 800);
  };

  const handleAddProduct = () => {
    if (!productName || !productDesc || !productPrice || !productImage) {
      alert('Заполните все поля');
      return;
    }

    const newProduct: Product = {
      id: Date.now().toString(),
      name: productName,
      description: productDesc,
      price: parseFloat(productPrice),
      image: productImage
    };

    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    localStorage.setItem(`seller_${seller.id}_products`, JSON.stringify(updatedProducts));
    
    setShowAddProduct(false);
    setProductName('');
    setProductDesc('');
    setProductPrice('');
    setProductImage('');
  };

  const handleLogout = () => {
    localStorage.removeItem('seller');
    setSeller(null);
    setProducts([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-purple-50/30 to-pink-50/20">
      <header className="backdrop-blur-xl bg-white/80 border-b border-purple-100/50">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors group">
            <Icon name="ArrowLeft" size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">На главную</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {!seller ? (
          <div className="max-w-md mx-auto animate-scale-in">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-2xl"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl border border-purple-100 overflow-hidden">
                <div className="bg-gradient-to-r from-primary to-accent p-8 text-center">
                  <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4">
                    <Icon name="Store" size={40} className="text-white" />
                  </div>
                  <h1 className="text-3xl font-bold text-white mb-2">Станьте продавцом</h1>
                  <p className="text-white/90">Начните продавать свои товары уже сегодня</p>
                </div>
                
                <div className="p-8 space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Icon name="Store" size={16} className="text-primary" />
                      Название магазина
                    </label>
                    <Input
                      type="text"
                      placeholder="Мой магазин"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="h-12 rounded-xl border-2 border-purple-100 focus:border-primary"
                    />
                  </div>

                  <Button 
                    onClick={handleRegister} 
                    disabled={loading} 
                    className="w-full h-12 bg-gradient-to-r from-primary to-accent text-white shadow-lg hover:shadow-xl transition-all"
                  >
                    {loading ? (
                      <Icon name="Loader" className="animate-spin" size={20} />
                    ) : (
                      <>
                        <Icon name="Rocket" size={20} className="mr-2" />
                        Начать продавать
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="animate-fade-in">
            <div className="bg-white rounded-3xl shadow-xl border border-purple-100 p-8 mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                    <Icon name="Store" size={32} className="text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold mb-1">{seller.name}</h1>
                    <p className="text-muted-foreground">Панель управления товарами</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button 
                    onClick={() => setShowAddProduct(true)}
                    className="bg-gradient-to-r from-primary to-accent text-white shadow-lg"
                  >
                    <Icon name="Plus" size={20} className="mr-2" />
                    Добавить товар
                  </Button>
                  <Button 
                    onClick={handleLogout} 
                    variant="outline"
                    className="border-2 border-purple-100"
                  >
                    Выйти
                  </Button>
                </div>
              </div>
            </div>

            {showAddProduct && (
              <div className="bg-white rounded-3xl shadow-xl border border-purple-100 p-8 mb-8 animate-scale-in">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Icon name="Plus" size={24} className="text-primary" />
                  Новый товар
                </h2>
                <div className="space-y-4">
                  <Input
                    placeholder="Название товара"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="h-12 rounded-xl border-2 border-purple-100"
                  />
                  <Textarea
                    placeholder="Описание товара"
                    value={productDesc}
                    onChange={(e) => setProductDesc(e.target.value)}
                    className="rounded-xl border-2 border-purple-100 min-h-24"
                  />
                  <Input
                    type="number"
                    placeholder="Цена в рублях"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    className="h-12 rounded-xl border-2 border-purple-100"
                  />
                  <Input
                    placeholder="URL изображения"
                    value={productImage}
                    onChange={(e) => setProductImage(e.target.value)}
                    className="h-12 rounded-xl border-2 border-purple-100"
                  />
                  <div className="flex gap-3 pt-2">
                    <Button 
                      onClick={handleAddProduct} 
                      disabled={loading}
                      className="flex-1 bg-gradient-to-r from-primary to-accent text-white"
                    >
                      {loading ? <Icon name="Loader" className="animate-spin" /> : 'Добавить'}
                    </Button>
                    <Button 
                      onClick={() => setShowAddProduct(false)} 
                      variant="outline"
                      className="border-2 border-purple-100"
                    >
                      Отмена
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <div key={product.id} className="bg-white rounded-2xl border border-purple-100 overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="aspect-square bg-gradient-to-br from-purple-50 to-pink-50">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold mb-2 line-clamp-1">{product.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>
                      <div className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        {product.price.toLocaleString()} ₽
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : !showAddProduct && (
              <div className="text-center py-20">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center mx-auto mb-6">
                  <Icon name="Package" size={40} className="text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Нет товаров</h3>
                <p className="text-muted-foreground mb-6">Добавьте первый товар в свой магазин</p>
                <Button 
                  onClick={() => setShowAddProduct(true)}
                  className="bg-gradient-to-r from-primary to-accent text-white"
                >
                  <Icon name="Plus" size={20} className="mr-2" />
                  Добавить товар
                </Button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
