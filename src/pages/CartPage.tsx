import { useNavigate } from 'react-router-dom'
import Header from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Icon from '@/components/ui/icon'
import { useCart } from '@/contexts/CartContext'

export default function CartPage() {
  const navigate = useNavigate()
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-xl">
            <Icon name="ShoppingCart" className="h-24 w-24 mx-auto mb-4 text-purple-300" />
            <h1 className="text-3xl font-black mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Корзина пуста</h1>
            <p className="text-gray-600 mb-6 text-lg">
              Добавьте товары из каталога
            </p>
            <Button onClick={() => navigate('/')} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105">
              Перейти к покупкам
            </Button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Корзина</h1>
            <Button variant="ghost" onClick={clearCart} className="hover:bg-red-100 text-red-600 font-semibold rounded-xl">
              Очистить всё
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              {items.map(item => (
                <Card key={item.id} className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all rounded-2xl">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="w-24 h-24 flex-shrink-0 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl overflow-hidden shadow-md">
                        <img
                          src={item.image_url}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-2 text-gray-900">{item.name}</h3>
                        <p className="text-xl font-black mb-3 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                          {item.price.toLocaleString()} ₽
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              className="bg-purple-100 hover:bg-purple-200 text-purple-700 border-0 rounded-lg"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Icon name="Minus" className="h-4 w-4" />
                            </Button>
                            <span className="w-12 text-center font-bold text-lg">
                              {item.quantity}
                            </span>
                            <Button
                              size="sm"
                              className="bg-purple-100 hover:bg-purple-200 text-purple-700 border-0 rounded-lg"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Icon name="Plus" className="h-4 w-4" />
                            </Button>
                          </div>

                          <Button
                            size="sm"
                            className="hover:bg-red-100 text-red-600 rounded-lg"
                            variant="ghost"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Icon name="Trash2" className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div>
              <Card className="sticky top-20 bg-white/90 backdrop-blur-sm border-0 shadow-2xl rounded-3xl">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-black mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Итого</h2>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-gray-700 font-medium">
                      <span>Товары ({items.reduce((sum, item) => sum + item.quantity, 0)})</span>
                      <span>{totalPrice.toLocaleString()} ₽</span>
                    </div>
                    <div className="flex justify-between text-gray-700 font-medium">
                      <span>Доставка</span>
                      <span className="text-green-600 font-bold">Бесплатно</span>
                    </div>
                  </div>

                  <div className="border-t border-purple-200 pt-6 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-gray-900">К оплате</span>
                      <span className="text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        {totalPrice.toLocaleString()} ₽
                      </span>
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-lg py-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:scale-105" size="lg">
                    Оформить заказ
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}