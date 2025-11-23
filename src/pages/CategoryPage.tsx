import { Link, useParams } from 'react-router-dom'
import { ShoppingCart, Search, User, ChevronLeft, Sparkles } from 'lucide-react'
import { useCart } from '../context/CartContext'

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

const categories: Record<string, { name: string; icon: string; gradient: string }> = {
  '1': { name: 'Электроника', icon: '📱', gradient: 'from-blue-500 to-cyan-500' },
  '2': { name: 'Одежда', icon: '👕', gradient: 'from-purple-500 to-pink-500' },
  '3': { name: 'Дом и сад', icon: '🏡', gradient: 'from-green-500 to-emerald-500' },
  '4': { name: 'Красота', icon: '💄', gradient: 'from-rose-500 to-pink-500' },
  '5': { name: 'Спорт', icon: '⚽', gradient: 'from-orange-500 to-red-500' },
  '6': { name: 'Детские товары', icon: '🧸', gradient: 'from-yellow-500 to-orange-500' },
}

export default function CategoryPage() {
  const { id } = useParams()
  const { addToCart, totalItems } = useCart()
  const category = categories[id || '1']
  const filteredProducts = products.filter(p => p.category === Number(id))

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
        <Link to="/" className="inline-flex items-center text-slate-600 hover:text-violet-600 mb-6 font-semibold transition-colors group">
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Все категории
        </Link>

        <div className="mb-12 flex items-center gap-6">
          <div className="relative">
            <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} rounded-3xl blur-lg opacity-50`}></div>
            <div className={`relative bg-gradient-to-br ${category.gradient} p-6 rounded-3xl`}>
              <span className="text-6xl">{category.icon}</span>
            </div>
          </div>
          <div>
            <h1 className="text-5xl font-black bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent mb-2">
              {category.name}
            </h1>
            <p className="text-slate-600 text-lg">
              {filteredProducts.length} товаров
            </p>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-xl p-12 text-center border border-slate-200/50">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold mb-2 text-slate-800">Товары не найдены</h2>
            <p className="text-slate-600 mb-6">В этой категории пока нет товаров</p>
            <Link
              to="/"
              className="inline-block bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white font-bold px-8 py-4 rounded-2xl transition-all hover:shadow-lg hover:shadow-violet-500/50"
            >
              На главную
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-violet-500/20 transition-all hover:-translate-y-2 border border-slate-200/50"
              >
                <Link to={`/product/${product.id}`} className="block relative overflow-hidden">
                  <div className="aspect-square bg-slate-100 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                    <span className="text-yellow-500">⭐</span>
                    <span className="font-bold text-sm">{product.rating}</span>
                  </div>
                </Link>
                <div className="p-5">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-bold text-lg mb-2 hover:text-violet-600 transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                  </Link>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-2xl font-black bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                      {product.price.toLocaleString()} ₽
                    </div>
                    <span className="text-sm text-slate-500">{product.reviews} отз.</span>
                  </div>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white font-bold py-3 rounded-2xl transition-all hover:shadow-lg hover:shadow-violet-500/50 active:scale-95 flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    В корзину
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
