import { Link, useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import ThemeToggle from '@/components/ThemeToggle';
import { useState, useEffect } from 'react';

interface Seller {
  id: string;
  name: string;
  email: string;
  phone: string;
  shopName: string;
  registeredAt: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export default function Seller() {
  const navigate = useNavigate();
  const [seller, setSeller] = useState<Seller | null>(null);
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showInfo, setShowInfo] = useState(true);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [shopName, setShopName] = useState('');
  const [password, setPassword] = useState('');

  const [products, setProducts] = useState<Product[]>([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [productName, setProductName] = useState('');
  const [productDesc, setProductDesc] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState('');

  useEffect(() => {
    const savedSeller = localStorage.getItem('seller_user');
    if (savedSeller) {
      const sellerData = JSON.parse(savedSeller);
      setSeller(sellerData);
      setShowInfo(false);
      
      const savedProducts = localStorage.getItem(`seller_${sellerData.id}_products`);
      if (savedProducts) {
        setProducts(JSON.parse(savedProducts));
      }
    }
  }, []);

  const handleRegister = () => {
    if (!name || !email || !phone || !shopName || !password) {
      alert('Заполните все поля');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const newSeller: Seller = {
        id: Date.now().toString(),
        name,
        email,
        phone,
        shopName,
        registeredAt: new Date().toISOString()
      };
      
      const sellers = JSON.parse(localStorage.getItem('sellers') || '[]');
      sellers.push({ ...newSeller, password });
      localStorage.setItem('sellers', JSON.stringify(sellers));
      localStorage.setItem('seller_user', JSON.stringify(newSeller));
      
      setSeller(newSeller);
      setShowInfo(false);
      setLoading(false);
      setName('');
      setEmail('');
      setPhone('');
      setShopName('');
      setPassword('');
    }, 800);
  };

  const handleLogin = () => {
    if (!email || !password) {
      alert('Заполните email и пароль');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const sellers = JSON.parse(localStorage.getItem('sellers') || '[]');
      const foundSeller = sellers.find((s: any) => s.email === email && s.password === password);
      
      if (foundSeller) {
        const { password: _, ...sellerWithoutPassword } = foundSeller;
        localStorage.setItem('seller_user', JSON.stringify(sellerWithoutPassword));
        setSeller(sellerWithoutPassword);
        setShowInfo(false);
        
        const savedProducts = localStorage.getItem(`seller_${sellerWithoutPassword.id}_products`);
        if (savedProducts) {
          setProducts(JSON.parse(savedProducts));
        }
      } else {
        alert('Неверный email или пароль');
      }
      
      setLoading(false);
      setEmail('');
      setPassword('');
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
    localStorage.setItem(`seller_${seller!.id}_products`, JSON.stringify(updatedProducts));
    
    setShowAddProduct(false);
    setProductName('');
    setProductDesc('');
    setProductPrice('');
    setProductImage('');
  };

  const handleDeleteProduct = (id: string) => {
    const updatedProducts = products.filter(p => p.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem(`seller_${seller!.id}_products`, JSON.stringify(updatedProducts));
  };

  const handleLogout = () => {
    localStorage.removeItem('seller_user');
    setSeller(null);
    setProducts([]);
    setShowInfo(true);
    navigate('/seller');
  };

  if (showInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-purple-50/30 to-pink-50/20 dark:via-purple-950/20 dark:to-pink-950/10">
        <header className="backdrop-blur-xl bg-white/80 dark:bg-gray-950/80 border-b border-purple-100/50 dark:border-purple-900/30 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors group">
                <Icon name="ArrowLeft" size={20} className="group-hover:-translate-x-1 transition-transform" />
                <span className="font-medium">На главную</span>
              </Link>
              <div className="flex items-center gap-3">
                <ThemeToggle />
                <Button 
                  onClick={() => setShowInfo(false)}
                  className="bg-gradient-to-r from-primary to-accent text-white"
                >
                  <Icon name="LogIn" size={18} className="mr-2" />
                  Войти / Регистрация
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-12 max-w-6xl">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-800/50 dark:to-pink-800/50 rounded-full mb-6">
              <Icon name="TrendingUp" size={16} className="text-primary dark:text-purple-300" />
              <span className="text-sm font-medium text-purple-900 dark:text-purple-100">Начните зарабатывать сегодня</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
              Станьте продавцом на Peeky
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Присоединяйтесь к тысячам успешных продавцов и начните продавать свои товары миллионам покупателей по всей России
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                onClick={() => setShowInfo(false)}
                className="h-14 px-8 bg-gradient-to-r from-primary to-accent text-white shadow-xl hover:shadow-2xl text-lg"
              >
                <Icon name="Rocket" size={22} className="mr-2" />
                Начать продавать
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-purple-100 dark:border-purple-900/30 shadow-lg hover:shadow-2xl transition-all animate-scale-in">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-6">
                <Icon name="Users" size={32} className="text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">5+ млн покупателей</h3>
              <p className="text-muted-foreground">
                Получите доступ к огромной аудитории активных покупателей
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-purple-100 dark:border-purple-900/30 shadow-lg hover:shadow-2xl transition-all animate-scale-in" style={{ animationDelay: '100ms' }}>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-6">
                <Icon name="Percent" size={32} className="text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Низкие комиссии</h3>
              <p className="text-muted-foreground">
                Всего 5% от продаж. Первые 3 месяца без комиссии
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-purple-100 dark:border-purple-900/30 shadow-lg hover:shadow-2xl transition-all animate-scale-in" style={{ animationDelay: '200ms' }}>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-6">
                <Icon name="Zap" size={32} className="text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Быстрый старт</h3>
              <p className="text-muted-foreground">
                Начните продавать за 15 минут. Простая регистрация
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!seller) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-purple-50/30 to-pink-50/20 dark:via-purple-950/20 dark:to-pink-950/10">
        <header className="backdrop-blur-xl bg-white/80 dark:bg-gray-950/80 border-b border-purple-100/50 dark:border-purple-900/30">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowInfo(true)}
                className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors group"
              >
                <Icon name="ArrowLeft" size={20} className="group-hover:-translate-x-1 transition-transform" />
                <span className="font-medium">Назад</span>
              </button>
              <ThemeToggle />
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[calc(100vh-5rem)]">
          <div className="w-full max-w-md animate-scale-in">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-2xl"></div>
              <div className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-purple-100 dark:border-purple-900/30 overflow-hidden">
                <div className="bg-gradient-to-r from-primary to-accent p-8 text-center">
                  <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4">
                    <Icon name="Store" size={40} className="text-white" />
                  </div>
                  <h1 className="text-3xl font-bold text-white mb-2">
                    {isLogin ? 'Вход для продавцов' : 'Регистрация продавца'}
                  </h1>
                  <p className="text-white/90">
                    {isLogin ? 'Войдите в панель управления' : 'Создайте магазин на Peeky'}
                  </p>
                </div>
                
                <div className="p-8 space-y-6">
                  {!isLogin && (
                    <>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground flex items-center gap-2">
                          <Icon name="User" size={16} className="text-primary" />
                          Ваше имя
                        </label>
                        <Input
                          type="text"
                          placeholder="Иван Иванов"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="h-12 rounded-xl border-2 border-purple-100 dark:border-purple-900 focus:border-primary dark:bg-gray-800"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground flex items-center gap-2">
                          <Icon name="Store" size={16} className="text-primary" />
                          Название магазина
                        </label>
                        <Input
                          type="text"
                          placeholder="Мой магазин"
                          value={shopName}
                          onChange={(e) => setShopName(e.target.value)}
                          className="h-12 rounded-xl border-2 border-purple-100 dark:border-purple-900 focus:border-primary dark:bg-gray-800"
                        />
                      </div>
                    </>
                  )}

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Icon name="Mail" size={16} className="text-primary" />
                      Email
                    </label>
                    <Input
                      type="email"
                      placeholder="email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 rounded-xl border-2 border-purple-100 dark:border-purple-900 focus:border-primary dark:bg-gray-800"
                    />
                  </div>

                  {!isLogin && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground flex items-center gap-2">
                        <Icon name="Phone" size={16} className="text-primary" />
                        Телефон
                      </label>
                      <Input
                        type="tel"
                        placeholder="+7 (999) 123-45-67"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="h-12 rounded-xl border-2 border-purple-100 dark:border-purple-900 focus:border-primary dark:bg-gray-800"
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Icon name="Lock" size={16} className="text-primary" />
                      Пароль
                    </label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12 rounded-xl border-2 border-purple-100 dark:border-purple-900 focus:border-primary dark:bg-gray-800"
                    />
                  </div>

                  <Button 
                    onClick={isLogin ? handleLogin : handleRegister} 
                    disabled={loading} 
                    className="w-full h-12 bg-gradient-to-r from-primary to-accent text-white shadow-lg hover:shadow-xl transition-all"
                  >
                    {loading ? (
                      <Icon name="Loader" className="animate-spin" size={20} />
                    ) : (
                      <>
                        <Icon name={isLogin ? "LogIn" : "Rocket"} size={20} className="mr-2" />
                        {isLogin ? 'Войти' : 'Создать магазин'}
                      </>
                    )}
                  </Button>

                  <div className="text-center">
                    <button
                      onClick={() => setIsLogin(!isLogin)}
                      className="text-sm text-primary hover:text-accent transition-colors"
                    >
                      {isLogin ? 'Нет магазина? Зарегистрируйтесь' : 'Уже есть магазин? Войдите'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
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
              <span className="font-medium">На главную</span>
            </Link>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Button 
                onClick={handleLogout} 
                variant="outline"
                className="border-2 border-purple-200 dark:border-purple-800"
              >
                <Icon name="LogOut" size={18} className="mr-2" />
                Выйти
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-purple-100 dark:border-purple-900/30 p-8 mb-8 animate-fade-in">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                <Icon name="Store" size={40} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-1">{seller.shopName}</h1>
                <p className="text-muted-foreground">{seller.name}</p>
                <div className="flex flex-col gap-1 text-sm text-muted-foreground mt-2">
                  <div className="flex items-center gap-2">
                    <Icon name="Mail" size={12} />
                    <span>{seller.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Phone" size={12} />
                    <span>{seller.phone}</span>
                  </div>
                </div>
              </div>
            </div>
            <Button 
              onClick={() => setShowAddProduct(true)}
              className="bg-gradient-to-r from-primary to-accent text-white shadow-lg h-12 px-6"
            >
              <Icon name="Plus" size={20} className="mr-2" />
              Добавить товар
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-purple-100 dark:border-purple-900/30 text-center">
            <Icon name="Package" size={32} className="text-primary mx-auto mb-3" />
            <div className="text-3xl font-bold text-primary mb-1">{products.length}</div>
            <div className="text-sm text-muted-foreground">Товаров</div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-purple-100 dark:border-purple-900/30 text-center">
            <Icon name="ShoppingCart" size={32} className="text-primary mx-auto mb-3" />
            <div className="text-3xl font-bold text-primary mb-1">0</div>
            <div className="text-sm text-muted-foreground">Заказов</div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-purple-100 dark:border-purple-900/30 text-center">
            <Icon name="Eye" size={32} className="text-primary mx-auto mb-3" />
            <div className="text-3xl font-bold text-primary mb-1">0</div>
            <div className="text-sm text-muted-foreground">Просмотров</div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-purple-100 dark:border-purple-900/30 text-center">
            <Icon name="DollarSign" size={32} className="text-primary mx-auto mb-3" />
            <div className="text-3xl font-bold text-primary mb-1">0 ₽</div>
            <div className="text-sm text-muted-foreground">Продаж</div>
          </div>
        </div>

        {showAddProduct && (
          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-purple-100 dark:border-purple-900/30 p-8 mb-8 animate-scale-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Icon name="Plus" size={24} className="text-primary" />
                Новый товар
              </h2>
              <Button
                onClick={() => setShowAddProduct(false)}
                variant="outline"
                size="sm"
              >
                <Icon name="X" size={18} />
              </Button>
            </div>
            <div className="space-y-4">
              <Input
                placeholder="Название товара"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="h-12 rounded-xl border-2 border-purple-100 dark:border-purple-900"
              />
              <Textarea
                placeholder="Описание товара"
                value={productDesc}
                onChange={(e) => setProductDesc(e.target.value)}
                className="rounded-xl border-2 border-purple-100 dark:border-purple-900 min-h-24 dark:bg-gray-800"
              />
              <Input
                type="number"
                placeholder="Цена в рублях"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                className="h-12 rounded-xl border-2 border-purple-100 dark:border-purple-900"
              />
              <Input
                placeholder="URL изображения"
                value={productImage}
                onChange={(e) => setProductImage(e.target.value)}
                className="h-12 rounded-xl border-2 border-purple-100 dark:border-purple-900"
              />
              <Button 
                onClick={handleAddProduct}
                className="w-full h-12 bg-gradient-to-r from-primary to-accent text-white"
              >
                <Icon name="Check" size={20} className="mr-2" />
                Добавить товар
              </Button>
            </div>
          </div>
        )}

        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-purple-100 dark:border-purple-900/30 p-8">
          <h2 className="text-2xl font-bold mb-6">Мои товары</h2>
          
          {products.length === 0 ? (
            <div className="text-center py-12">
              <Icon name="Package" size={64} className="text-muted-foreground mx-auto mb-4 opacity-30" />
              <p className="text-muted-foreground">У вас пока нет товаров</p>
              <Button 
                onClick={() => setShowAddProduct(true)}
                className="mt-4 bg-gradient-to-r from-primary to-accent text-white"
              >
                <Icon name="Plus" size={18} className="mr-2" />
                Добавить первый товар
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="border-2 border-purple-100 dark:border-purple-900/30 rounded-2xl overflow-hidden hover:shadow-lg transition-all group">
                  <div className="aspect-square bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/20 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2 line-clamp-1">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-primary">{product.price.toLocaleString()} ₽</span>
                      <Button
                        onClick={() => handleDeleteProduct(product.id)}
                        variant="outline"
                        size="sm"
                        className="border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900 dark:text-red-400"
                      >
                        <Icon name="Trash2" size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
