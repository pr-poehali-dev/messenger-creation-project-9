import { Link } from 'react-router-dom'
import { ShoppingCart, Search, User, ChevronLeft, Minus, Plus, Trash2, Sparkles, Package } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCart()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-slate-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            <Link to="/" className="flex items-center gap-2 sm:gap-3 group active:scale-95 transition-transform">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-2xl blur-sm group-hover:blur-md transition-all"></div>
                <div className="relative bg-gradient-to-br from-violet-600 to-fuchsia-600 p-2 sm:p-2.5 rounded-2xl">
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
              </div>
              <span className="text-xl sm:text-2xl font-black bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
                Peeky
              </span>
            </Link>
            
            <div className="flex-1 max-w-2xl mx-4 sm:mx-8 hidden md:block">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-hover:text-violet-600 transition-colors" />
                <input
                  type="text"
                  placeholder="Найти товары..."
                  className="w-full pl-12 pr-4 py-3 bg-slate-100 border-2 border-transparent rounded-2xl focus:outline-none focus:bg-white focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition-all"
                />
              </div>
            </div>

            <div className="flex items-center gap-1 sm:gap-2">
              <button className="p-2 sm:p-3 hover:bg-slate-100 rounded-2xl transition-all active:scale-95 touch-manipulation">
                <User className="w-5 h-5 sm:w-6 sm:h-6 text-slate-700" />
              </button>
              <Link to="/cart" className="relative p-2 sm:p-3 hover:bg-slate-100 rounded-2xl transition-all group active:scale-95 touch-manipulation">
                <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-slate-700 group-hover:text-violet-600 transition-colors" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white text-xs font-bold w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center shadow-lg">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-12">
        <Link to="/" className="inline-flex items-center text-slate-600 hover:text-violet-600 mb-4 sm:mb-6 font-semibold transition-colors group active:scale-95 touch-manipulation">
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Продолжить покупки
        </Link>

        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-4xl font-black bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
            Корзина
          </h1>
          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="text-red-600 hover:text-red-700 text-sm sm:text-base font-semibold hover:bg-red-50 px-3 sm:px-4 py-2 rounded-xl sm:rounded-2xl transition-all active:scale-95 touch-manipulation"
            >
              Очистить
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-8 sm:p-12 text-center border border-slate-200/50">
            <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 bg-gradient-to-br from-violet-100 to-fuchsia-100 rounded-full flex items-center justify-center">
              <ShoppingCart className="w-10 h-10 sm:w-12 sm:h-12 text-violet-600" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold mb-2 text-slate-800">Корзина пуста</h2>
            <p className="text-sm sm:text-base text-slate-600 mb-6">Добавьте товары, чтобы начать покупки</p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl transition-all hover:shadow-lg hover:shadow-violet-500/50 active:scale-95 touch-manipulation text-sm sm:text-base"
            >
              <Package className="w-4 h-4 sm:w-5 sm:h-5" />
              Перейти к покупкам
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-4 sm:gap-8">
            <div className="lg:col-span-2 space-y-3 sm:space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all border border-slate-200/50"
                >
                  <div className="flex gap-3 sm:gap-6">
                    <div className="w-20 h-20 sm:w-32 sm:h-32 flex-shrink-0 bg-slate-100 rounded-xl sm:rounded-2xl overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-base sm:text-xl mb-1 sm:mb-2 text-slate-800 line-clamp-2">{item.name}</h3>
                      <div className="text-lg sm:text-2xl font-black mb-3 sm:mb-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                        {item.price.toLocaleString()} ₽
                      </div>

                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 sm:gap-3 bg-slate-100 rounded-xl sm:rounded-2xl p-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 sm:w-10 sm:h-10 bg-white hover:bg-violet-600 hover:text-white rounded-lg sm:rounded-xl transition-all active:scale-90 touch-manipulation flex items-center justify-center font-bold shadow-sm"
                          >
                            <Minus className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                          <span className="w-8 sm:w-12 text-center font-bold text-base sm:text-lg">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 sm:w-10 sm:h-10 bg-white hover:bg-violet-600 hover:text-white rounded-lg sm:rounded-xl transition-all active:scale-90 touch-manipulation flex items-center justify-center font-bold shadow-sm"
                          >
                            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-600 hover:text-white hover:bg-red-600 p-2 sm:p-3 rounded-xl sm:rounded-2xl transition-all active:scale-90 touch-manipulation"
                        >
                          <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl p-8 shadow-xl sticky top-24 border border-slate-200/50">
                <h2 className="text-2xl font-black mb-6 bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                  Итого
                </h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-slate-600">
                    <span>Товары ({totalItems}):</span>
                    <span className="font-semibold">{totalPrice.toLocaleString()} ₽</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Доставка:</span>
                    <span className="font-semibold text-green-600">Бесплатно</span>
                  </div>
                  <div className="border-t border-slate-200 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-slate-800">Итого:</span>
                      <span className="text-3xl font-black bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                        {totalPrice.toLocaleString()} ₽
                      </span>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white font-bold py-4 rounded-2xl transition-all hover:shadow-lg hover:shadow-violet-500/50 active:scale-95 mb-4">
                  Оформить заказ
                </button>

                <div className="text-center text-sm text-slate-500">
                  Безопасная оплата
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}