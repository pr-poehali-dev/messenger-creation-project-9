import { Link, useParams } from 'react-router-dom'
import { ShoppingCart, Search, User, ChevronLeft, Star } from 'lucide-react'

const products = [
  { id: 1, name: 'iPhone 15 Pro', price: 89990, image: 'https://images.unsplash.com/photo-1592286927505-0ac3b3e76dbb?w=800', category: 1, description: 'Новейший iPhone с профессиональными возможностями камеры и мощным процессором A17 Pro' },
  { id: 2, name: 'Samsung Galaxy S24', price: 79990, image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800', category: 1, description: 'Флагманский смартфон от Samsung с ИИ и улучшенной камерой' },
  { id: 3, name: 'Джинсы Levis', price: 6990, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800', category: 2, description: 'Классические джинсы Levis 501 из прочного денима' },
  { id: 4, name: 'Кроссовки Nike', price: 12990, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800', category: 2, description: 'Удобные спортивные кроссовки для бега и тренировок' },
]

export default function ProductPage() {
  const { id } = useParams()
  const product = products.find(p => p.id === Number(id))

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Товар не найден</h2>
          <Link to="/" className="text-blue-600 hover:underline">
            Вернуться на главную
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              Маркетплейс
            </Link>
            
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Поиск товаров..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <User className="w-6 h-6" />
              </button>
              <Link to="/cart" className="p-2 hover:bg-gray-100 rounded-lg relative">
                <ShoppingCart className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  0
                </span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <Link to={`/category/${product.category}`} className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
          <ChevronLeft className="w-5 h-5" />
          Назад к категории
        </Link>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            <div>
              <img
                src={product.image}
                alt={product.name}
                className="w-full rounded-lg"
              />
            </div>

            <div>
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">(127 отзывов)</span>
              </div>

              <div className="text-4xl font-bold text-blue-600 mb-6">
                {product.price.toLocaleString()} ₽
              </div>

              <p className="text-gray-700 mb-6">
                {product.description}
              </p>

              <button className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Добавить в корзину
              </button>

              <div className="mt-8 border-t pt-6">
                <h3 className="font-bold mb-4">Характеристики</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex justify-between">
                    <span>Бренд</span>
                    <span className="font-semibold">{product.name.split(' ')[0]}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Гарантия</span>
                    <span className="font-semibold">1 год</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Доставка</span>
                    <span className="font-semibold">2-3 дня</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
