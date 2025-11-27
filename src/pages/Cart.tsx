import { Link, useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/ThemeToggle';
import Footer from '@/components/Footer';
import MobileNav from '@/components/MobileNav';
import { useState, useEffect } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  seller_name: string;
}

const mockProducts = [
  {
    id: '1',
    name: 'Беспроводные наушники',
    price: 5990,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop',
    seller_name: 'Электроника Про'
  },
  {
    id: '2',
    name: 'Смартфон Pro Max',
    price: 79990,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=800&fit=crop',
    seller_name: 'Электроника Про'
  }
];

export default function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const updateCart = (newCart: CartItem[]) => {
    setCartItems(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    const newCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    updateCart(newCart);
  };

  const removeItem = (id: string) => {
    const newCart = cartItems.filter(item => item.id !== id);
    updateCart(newCart);
  };

  const applyPromo = () => {
    if (promoCode.toLowerCase() === 'peeky10') {
      setDiscount(10);
      alert('Промокод применен! Скидка 10%');
    } else if (promoCode.toLowerCase() === 'peeky20') {
      setDiscount(20);
      alert('Промокод применен! Скидка 20%');
    } else {
      alert('Неверный промокод');
      setDiscount(0);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = Math.round(subtotal * discount / 100);
  const deliveryFee = subtotal >= 3000 ? 0 : 300;
  const total = subtotal - discountAmount + deliveryFee;

  const handleCheckout = () => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/profile');
      return;
    }
    alert('Заказ оформлен! Спасибо за покупку!');
    updateCart([]);
    navigate('/');
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-purple-50/30 to-pink-50/20 dark:via-purple-900/40 dark:to-pink-900/40 flex flex-col">
        <header className="backdrop-blur-xl bg-white/80 dark:bg-[#1a1a2e]/80 border-b border-purple-100/50 dark:border-purple-800/30 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors group">
                <Icon name="ArrowLeft" size={20} className="group-hover:-translate-x-1 transition-transform" />
                <span className="font-medium">На главную</span>
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-800/30 dark:to-pink-800/30 flex items-center justify-center">
              <Icon name="ShoppingCart" size={64} className="text-primary" />
            </div>
            <h2 className="text-3xl font-bold mb-3 text-gray-900 dark:text-white">Корзина пуста</h2>
            <p className="text-muted-foreground mb-8">Добавьте товары в корзину, чтобы оформить заказ</p>
            <Link to="/">
              <Button className="bg-gradient-to-r from-primary to-accent px-8 py-6 text-lg">
                <Icon name="ShoppingBag" size={20} className="mr-2" />
                Перейти к покупкам
              </Button>
            </Link>
          </div>
        </main>

        <Footer />
        <MobileNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-purple-50/30 to-pink-50/20 dark:via-purple-900/40 dark:to-pink-900/40">
      <header className="backdrop-blur-xl bg-white/80 dark:bg-[#1a1a2e]/80 border-b border-purple-100/50 dark:border-purple-800/30 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors group">
              <Icon name="ArrowLeft" size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Продолжить покупки</span>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 pb-24 md:pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Icon name="ShoppingCart" size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Корзина</h1>
              <p className="text-sm text-muted-foreground">{cartItems.length} {cartItems.length === 1 ? 'товар' : 'товаров'}</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white dark:bg-[#252538] rounded-2xl p-4 md:p-6 shadow-lg border border-purple-100 dark:border-purple-800/30">
                  <div className="flex gap-4">
                    <Link to={`/product/${item.id}`} className="flex-shrink-0">
                      <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/20">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover hover:scale-110 transition-transform" />
                      </div>
                    </Link>

                    <div className="flex-1 min-w-0">
                      <Link to={`/product/${item.id}`}>
                        <h3 className="text-lg md:text-xl font-bold mb-1 text-gray-900 dark:text-white hover:text-primary transition-colors line-clamp-2">
                          {item.name}
                        </h3>
                      </Link>
                      <div className="flex items-center gap-2 mb-3">
                        <Icon name="Store" size={14} className="text-primary" />
                        <span className="text-xs md:text-sm text-muted-foreground">{item.seller_name}</span>
                      </div>

                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2 md:gap-3">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 flex items-center justify-center transition-colors"
                          >
                            <Icon name="Minus" size={16} />
                          </button>
                          <span className="w-8 md:w-10 text-center font-semibold text-base md:text-lg">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 flex items-center justify-center transition-colors"
                          >
                            <Icon name="Plus" size={16} />
                          </button>
                        </div>

                        <div className="text-right">
                          <div className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            {(item.price * item.quantity).toLocaleString()} ₽
                          </div>
                          {item.quantity > 1 && (
                            <div className="text-xs text-muted-foreground">
                              {item.price.toLocaleString()} ₽ × {item.quantity}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="flex-shrink-0 w-10 h-10 rounded-xl bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 flex items-center justify-center transition-colors text-red-500"
                    >
                      <Icon name="Trash2" size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-4">
                <div className="bg-white dark:bg-[#252538] rounded-2xl p-6 shadow-lg border border-purple-100 dark:border-purple-800/30">
                  <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                    <Icon name="Tag" size={20} className="text-primary" />
                    Промокод
                  </h2>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Введите промокод"
                      className="flex-1 px-4 py-2 rounded-xl border border-purple-100 dark:border-purple-800/30 bg-white dark:bg-[#1a1a2e] text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <Button onClick={applyPromo} className="bg-gradient-to-r from-primary to-accent">
                      Применить
                    </Button>
                  </div>
                  {discount > 0 && (
                    <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800/30 flex items-center gap-2">
                      <Icon name="CheckCircle" size={18} className="text-green-500" />
                      <span className="text-sm text-green-700 dark:text-green-400 font-medium">
                        Скидка {discount}% применена
                      </span>
                    </div>
                  )}
                </div>

                <div className="bg-white dark:bg-[#252538] rounded-2xl p-6 shadow-lg border border-purple-100 dark:border-purple-800/30 space-y-4">
                  <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Итого</h2>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-muted-foreground">
                      <span>Товары ({cartItems.length})</span>
                      <span>{subtotal.toLocaleString()} ₽</span>
                    </div>
                    
                    {discount > 0 && (
                      <div className="flex items-center justify-between text-green-600 dark:text-green-400">
                        <span>Скидка {discount}%</span>
                        <span>-{discountAmount.toLocaleString()} ₽</span>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between text-muted-foreground">
                      <span>Доставка</span>
                      {deliveryFee === 0 ? (
                        <span className="text-green-600 dark:text-green-400 font-medium">Бесплатно</span>
                      ) : (
                        <span>{deliveryFee} ₽</span>
                      )}
                    </div>
                    
                    {subtotal < 3000 && (
                      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800/30">
                        <p className="text-xs text-blue-700 dark:text-blue-400">
                          <Icon name="Info" size={14} className="inline mr-1" />
                          Добавьте товаров на {(3000 - subtotal).toLocaleString()} ₽ для бесплатной доставки
                        </p>
                      </div>
                    )}
                    
                    <div className="pt-3 border-t border-purple-100 dark:border-purple-800/30">
                      <div className="flex items-baseline justify-between">
                        <span className="text-lg font-bold text-gray-900 dark:text-white">К оплате</span>
                        <span className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                          {total.toLocaleString()} ₽
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleCheckout} 
                    size="lg" 
                    className="w-full bg-gradient-to-r from-primary to-accent text-white shadow-xl hover:shadow-2xl transition-all py-6 text-lg"
                  >
                    <Icon name="CreditCard" size={22} className="mr-2" />
                    Оформить заказ
                  </Button>
                  
                  <div className="grid grid-cols-3 gap-2 pt-4">
                    <div className="text-center">
                      <Icon name="Shield" size={20} className="text-primary mx-auto mb-1" />
                      <div className="text-xs text-muted-foreground">Защита</div>
                    </div>
                    <div className="text-center">
                      <Icon name="Truck" size={20} className="text-primary mx-auto mb-1" />
                      <div className="text-xs text-muted-foreground">Доставка</div>
                    </div>
                    <div className="text-center">
                      <Icon name="RotateCcw" size={20} className="text-primary mx-auto mb-1" />
                      <div className="text-xs text-muted-foreground">Возврат</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
