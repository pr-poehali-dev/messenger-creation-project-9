import { Link, useParams } from 'react-router-dom'
import { ShoppingCart, Search, User, ChevronLeft, Sparkles } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useState, useEffect } from 'react'
import { api, Product, Category } from '../services/api'

export default function CategoryPage() {
  const { id } = useParams()
  const { addToCart, totalItems } = useCart()
  const [products, setProducts] = useState<Product[]>([])
  const [category, setCategory] = useState<Category | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const [cats, prods] = await Promise.all([
          api.getCategories(),
          api.getProducts(id)
        ])
        const currentCat = cats.find(c => c.id === id)
        setCategory(currentCat || null)
        setProducts(prods)
      } catch (error) {
        console.error('Failed to load data:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [id])

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-violet-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-semibold">Загрузка...</p>
        </div>
      </div>
    )
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Категория не найдена</h2>
          <Link to="/" className="text-violet-600 font-semibold hover:underline">Вернуться на главную</Link>
        </div>
      </div>
    )
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
        <Link to="/" className="inline-flex items-center text-slate-600 hover:text-violet-600 mb-4 sm:mb-6 font-semibold transition-colors group active:scale-95 touch-manipulation">
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Все категории
        </Link>

        <div className="mb-6 sm:mb-12 flex items-center gap-4 sm:gap-6">
          <div className="relative flex-shrink-0">
            <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} rounded-2xl sm:rounded-3xl blur-lg opacity-50`}></div>
            <div className={`relative bg-gradient-to-br ${category.gradient} p-4 sm:p-6 rounded-2xl sm:rounded-3xl overflow-hidden`}>
              <img src={category.icon} alt={category.name} className="w-16 h-16 sm:w-24 sm:h-24 object-cover" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl sm:text-5xl font-black bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent mb-1 sm:mb-2">
              {category.name}
            </h1>
            <p className="text-slate-600 text-sm sm:text-lg">
              {products.length} товаров
            </p>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-8 sm:p-12 text-center border border-slate-200/50">
            <div className="text-5xl sm:text-6xl mb-4">🔍</div>
            <h2 className="text-xl sm:text-2xl font-bold mb-2 text-slate-800">Товары не найдены</h2>
            <p className="text-slate-600 mb-6">В этой категории пока нет товаров</p>
            <Link
              to="/"
              className="inline-block bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl transition-all hover:shadow-lg hover:shadow-violet-500/50 active:scale-95 touch-manipulation"
            >
              На главную
            </Link>
          </div>
        ) : (
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
                    className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white font-bold py-3 rounded-xl sm:rounded-2xl transition-all hover:shadow-lg hover:shadow-violet-500/50 active:scale-95 touch-manipulation flex items-center justify-center gap-2 text-sm sm:text-base"
                  >
                    <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
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