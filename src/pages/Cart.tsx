import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { getCart, updateCartItemQuantity, removeFromCart, getCartTotal, CartItem } from '@/lib/cart';
import { getAuthState } from '@/lib/auth';

export default function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartItem[]>([]);
  const { isAuthenticated } = getAuthState();

  useEffect(() => {
    loadCart();
    const handleCartUpdate = () => loadCart();
    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, []);

  const loadCart = () => {
    setCart(getCart());
  };

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    updateCartItemQuantity(productId, newQuantity);
    loadCart();
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const handleRemove = (productId: string) => {
    removeFromCart(productId);
    loadCart();
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }
    
    alert('Заказ оформлен! В реальном приложении здесь будет оформление заказа.');
  };

  const total = getCartTotal();
  const deliveryFee = total > 3000 ? 0 : 300;
  const finalTotal = total + deliveryFee;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center gap-2">
                <Icon name="ArrowLeft" size={24} />
                <span className="font-medium">На главную</span>
              </Link>
              <h1 className="text-xl font-bold">Корзина</h1>
              <div className="w-10" />
            </div>
          </div>
        </header>
        
        <div className="container mx-auto px-4 py-20 text-center">
          <Icon name="ShoppingCart" size={64} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-gray-700 mb-2">Корзина пуста</h2>
          <p className="text-gray-500 mb-6">Добавьте товары, чтобы продолжить покупки</p>
          <Link to="/">
            <Button className="gap-2">
              <Icon name="ShoppingBag" size={20} />
              Перейти к покупкам
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-700 hover:text-purple-600">
              <Icon name="ArrowLeft" size={24} />
              <span className="font-medium">Назад</span>
            </button>
            <h1 className="text-xl font-bold">Корзина ({cart.length})</h1>
            <div className="w-20" />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.productId} className="bg-white rounded-2xl p-4 shadow-lg">
                <div className="flex gap-4">
                  <Link to={`/product/${item.productId}`} className="flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-xl"
                    />
                  </Link>
                  
                  <div className="flex-grow">
                    <Link to={`/product/${item.productId}`}>
                      <h3 className="font-semibold text-gray-900 mb-2 hover:text-purple-600 transition-colors">
                        {item.name}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <Icon name="Store" size={16} />
                      <span>{item.sellerName}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 bg-gray-100 rounded-xl p-1">
                        <button
                          onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                          className="w-8 h-8 rounded-lg bg-white hover:bg-purple-100 transition-colors flex items-center justify-center"
                        >
                          <Icon name="Minus" size={16} />
                        </button>
                        <span className="font-bold w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                          className="w-8 h-8 rounded-lg bg-white hover:bg-purple-100 transition-colors flex items-center justify-center"
                        >
                          <Icon name="Plus" size={16} />
                        </button>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <span className="text-xl font-bold text-purple-600">
                          {(item.price * item.quantity).toLocaleString('ru-RU')} ₽
                        </span>
                        <button
                          onClick={() => handleRemove(item.productId)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <Icon name="Trash2" size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-24 space-y-4">
              <h2 className="text-xl font-bold mb-4">Итого</h2>
              
              <div className="space-y-3 pb-4 border-b border-gray-200">
                <div className="flex justify-between">
                  <span className="text-gray-600">Товары ({cart.length})</span>
                  <span className="font-medium">{total.toLocaleString('ru-RU')} ₽</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Доставка</span>
                  <span className="font-medium">
                    {deliveryFee === 0 ? (
                      <span className="text-green-600">Бесплатно</span>
                    ) : (
                      `${deliveryFee} ₽`
                    )}
                  </span>
                </div>
              </div>
              
              {total < 3000 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
                  <Icon name="Info" size={16} className="inline mr-2" />
                  Бесплатная доставка от 3000 ₽
                </div>
              )}
              
              <div className="flex justify-between text-xl font-bold pt-2">
                <span>К оплате</span>
                <span className="text-purple-600">{finalTotal.toLocaleString('ru-RU')} ₽</span>
              </div>
              
              <Button onClick={handleCheckout} className="w-full h-12 text-lg font-semibold">
                Оформить заказ
              </Button>
              
              <Link to="/">
                <Button variant="outline" className="w-full h-12">
                  Продолжить покупки
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
