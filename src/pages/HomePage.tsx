import { Link } from 'react-router-dom'
import { ShoppingCart, Search, User, Sparkles, TrendingUp } from 'lucide-react'
import { useCart } from '../context/CartContext'

const categories = [
  { id: 1, name: 'Электроника', icon: '📱', gradient: 'from-blue-500 to-cyan-500' },
  { id: 2, name: 'Одежда', icon: '👕', gradient: 'from-purple-500 to-pink-500' },
  { id: 3, name: 'Дом и сад', icon: '🏡', gradient: 'from-green-500 to-emerald-500' },
  { id: 4, name: 'Красота', icon: '💄', gradient: 'from-rose-500 to-pink-500' },
  { id: 5, name: 'Спорт', icon: '⚽', gradient: 'from-orange-500 to-red-500' },
  { id: 6, name: 'Детские товары', icon: '🧸', gradient: 'from-yellow-500 to-orange-500' },
]

const products = [
  { id: 1, name: 'iPhone 15 Pro', price: 89990, image: 'https://images.unsplash.com/photo-1592286927505-0ac3b3e76dbb?w=400', category: 1, rating: 4.9, reviews: 234 },
  { id: 2, name: 'Samsung Galaxy S24', price: 79990, image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400', category: 1, rating: 4.8, reviews: 189 },
  { id: 3, name: 'Джинсы Levis', price: 6990, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400', category: 2, rating: 4.7, reviews: 456 },
  { id: 4, name: 'Кроссовки Nike', price: 12990, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', category: 2, rating: 4.9, reviews: 789 },
  { id: 5, name: 'Кофеварка Delonghi', price: 24990, image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400', category: 3, rating: 4.6, reviews: 123 },
  { id: 6, name: 'Пылесос Dyson', price: 34990, image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400', category: 3, rating: 4.8, reviews: 234 },
  { id: 7, name: 'Помада MAC', price: 2490, image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400', category: 4, rating: 4.5, reviews: 567 },
  { id: 8, name: 'Духи Chanel', price: 8990, image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400', category: 4, rating: 4.9, reviews: 345 },
]

export default function HomePage() {
  const { addToCart, totalItems } = useCart()

  const handleAddToCart = (product: typeof products[0]) => {
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
                ShopFlow
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
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-violet-600" />
            <h2 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
              Категории
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/category/${cat.id}`}
                className="group relative overflow-hidden bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 hover:shadow-2xl hover:shadow-violet-500/20 transition-all active:scale-95 touch-manipulation border border-slate-200/50"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-0 group-active:opacity-5 transition-opacity`}></div>
                <div className="relative text-center">
                  <div className="text-4xl sm:text-5xl mb-2 sm:mb-3 transform group-active:scale-110 transition-transform">{cat.icon}</div>
                  <div className="font-bold text-sm sm:text-base text-slate-700 group-hover:text-violet-600 transition-colors">{cat.name}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <section>
          <div className="flex items-center gap-2 mb-4 sm:mb-6">
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-violet-600" />
            <h2 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
              Хиты продаж
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-2xl sm:rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-violet-500/20 transition-all border border-slate-200/50"
              >
                <Link to={`/product/${product.id}`} className="block relative overflow-hidden active:opacity-90 touch-manipulation">
                  <div className="aspect-square bg-slate-100 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-white/90 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                    <span className="text-yellow-500 text-sm">⭐</span>
                    <span className="font-bold text-xs sm:text-sm">{product.rating}</span>
                  </div>
                </Link>
                <div className="p-4 sm:p-5">
                  <Link to={`/product/${product.id}`} className="touch-manipulation">
                    <h3 className="font-bold text-base sm:text-lg mb-2 hover:text-violet-600 transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                  </Link>
                  
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className="text-xl sm:text-2xl font-black bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                      {product.price.toLocaleString()} ₽
                    </div>
                    <span className="text-xs sm:text-sm text-slate-500">{product.reviews} отз.</span>
                  </div>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white font-bold py-3 sm:py-3 rounded-xl sm:rounded-2xl transition-all hover:shadow-lg hover:shadow-violet-500/50 active:scale-95 touch-manipulation flex items-center justify-center gap-2 text-sm sm:text-base"
                  >
                    <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                    В корзину
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}