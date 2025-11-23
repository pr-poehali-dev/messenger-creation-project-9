import { Link, useParams } from 'react-router-dom'
import { ShoppingCart, Search, User, ChevronLeft, Star, Sparkles, Package, TruckIcon, Shield } from 'lucide-react'
import { useCart } from '../context/CartContext'

const products = [
  { id: 1, name: 'iPhone 15 Pro', price: 89990, image: 'https://images.unsplash.com/photo-1592286927505-0ac3b3e76dbb?w=800', category: 1, description: 'Новейший iPhone с профессиональными возможностями камеры и мощным процессором A17 Pro', rating: 4.9, reviews: 234, inStock: true },
  { id: 2, name: 'Samsung Galaxy S24', price: 79990, image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800', category: 1, description: 'Флагманский смартфон от Samsung с ИИ и улучшенной камерой', rating: 4.8, reviews: 189, inStock: true },
  { id: 3, name: 'Джинсы Levis', price: 6990, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800', category: 2, description: 'Классические джинсы Levis 501 из прочного денима', rating: 4.7, reviews: 456, inStock: true },
  { id: 4, name: 'Кроссовки Nike', price: 12990, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800', category: 2, description: 'Удобные спортивные кроссовки для бега и тренировок', rating: 4.9, reviews: 789, inStock: true },
]

export default function ProductPage() {
  const { id } = useParams()
  const { addToCart, totalItems } = useCart()
  const product = products.find(p => p.id === Number(id))

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
        <div className="text-center bg-white rounded-3xl p-12 shadow-xl border border-slate-200/50">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold mb-4 text-slate-800">Товар не найден</h2>
          <Link to="/" className="inline-block bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white font-bold px-8 py-4 rounded-2xl transition-all hover:shadow-lg hover:shadow-violet-500/50">
            Вернуться на главную
          </Link>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-slate-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-2xl blur-sm group-hover:blur-md transition-all"></div>
                <div className="relative bg-gradient-to-br from-violet-600 to-fuchsia-600 p-2.5 rounded-2xl">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
              </div>
              <span className="text-2xl font-black bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
                ShopFlow
              </span>
            </Link>
            
            <div className="flex-1 max-w-2xl mx-8 hidden md:block">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-hover:text-violet-600 transition-colors" />
                <input
                  type="text"
                  placeholder="Найти товары..."
                  className="w-full pl-12 pr-4 py-3 bg-slate-100 border-2 border-transparent rounded-2xl focus:outline-none focus:bg-white focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition-all"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-3 hover:bg-slate-100 rounded-2xl transition-all">
                <User className="w-6 h-6 text-slate-700" />
              </button>
              <Link to="/cart" className="relative p-3 hover:bg-slate-100 rounded-2xl transition-all group">
                <ShoppingCart className="w-6 h-6 text-slate-700 group-hover:text-violet-600 transition-colors" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-lg">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <Link to={`/category/${product.category}`} className="inline-flex items-center text-slate-600 hover:text-violet-600 mb-8 font-semibold transition-colors group">
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Назад к категории
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="bg-white rounded-3xl p-8 border border-slate-200/50 shadow-xl">
            <div className="aspect-square bg-slate-100 rounded-2xl overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div>
            <div className="bg-white rounded-3xl p-8 border border-slate-200/50 shadow-xl mb-6">
              <h1 className="text-4xl font-black mb-4 text-slate-800">{product.name}</h1>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center bg-yellow-50 px-4 py-2 rounded-2xl">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'}`}
                    />
                  ))}
                  <span className="ml-2 font-bold text-slate-800">{product.rating}</span>
                </div>
                <span className="text-slate-600">({product.reviews} отзывов)</span>
              </div>

              <div className="text-5xl font-black mb-6 bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                {product.price.toLocaleString()} ₽
              </div>

              {product.inStock && (
                <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-2xl mb-6 font-semibold">
                  <Package className="w-5 h-5" />
                  В наличии
                </div>
              )}

              <p className="text-slate-700 text-lg mb-8 leading-relaxed">
                {product.description}
              </p>

              <button
                onClick={handleAddToCart}
                className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white font-bold py-5 rounded-2xl transition-all hover:shadow-2xl hover:shadow-violet-500/50 active:scale-95 flex items-center justify-center gap-3 text-lg mb-6"
              >
                <ShoppingCart className="w-6 h-6" />
                Добавить в корзину
              </button>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-slate-50 rounded-2xl">
                  <TruckIcon className="w-8 h-8 mx-auto mb-2 text-violet-600" />
                  <div className="text-sm font-semibold text-slate-700">Доставка</div>
                  <div className="text-xs text-slate-500">2-3 дня</div>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-2xl">
                  <Shield className="w-8 h-8 mx-auto mb-2 text-violet-600" />
                  <div className="text-sm font-semibold text-slate-700">Гарантия</div>
                  <div className="text-xs text-slate-500">1 год</div>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-2xl">
                  <Package className="w-8 h-8 mx-auto mb-2 text-violet-600" />
                  <div className="text-sm font-semibold text-slate-700">Возврат</div>
                  <div className="text-xs text-slate-500">14 дней</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-200/50 shadow-xl">
              <h2 className="text-2xl font-black mb-6 bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                Характеристики
              </h2>
              <ul className="space-y-4">
                <li className="flex justify-between py-3 border-b border-slate-100">
                  <span className="text-slate-600">Бренд</span>
                  <span className="font-bold text-slate-800">{product.name.split(' ')[0]}</span>
                </li>
                <li className="flex justify-between py-3 border-b border-slate-100">
                  <span className="text-slate-600">Гарантия</span>
                  <span className="font-bold text-slate-800">1 год</span>
                </li>
                <li className="flex justify-between py-3 border-b border-slate-100">
                  <span className="text-slate-600">Доставка</span>
                  <span className="font-bold text-slate-800">2-3 дня</span>
                </li>
                <li className="flex justify-between py-3">
                  <span className="text-slate-600">Наличие</span>
                  <span className="font-bold text-green-600">В наличии</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
