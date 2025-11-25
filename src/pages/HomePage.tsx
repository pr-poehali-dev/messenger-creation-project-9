import { Link } from 'react-router-dom'
import { ShoppingCart, Search, User, Sparkles, TrendingUp, Smartphone, Shirt, BookOpen, Home, Dumbbell, Sparkle } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useCustomerAuth } from '../context/CustomerAuthContext'
import { useState, useEffect, useRef } from 'react'
import { api, Category, Product } from '../services/api'

const categoryIcons: Record<string, any> = {
  'electronics': Smartphone,
  'clothes': Shirt,
  'books': BookOpen,
  'home': Home,
  'sport': Dumbbell,
  'beauty': Sparkle
}

interface Stats {
  products: number
  categories: number
  sellers: number
  customers: number
  orders: number
}

function AnimatedCounter({ value }: { value: number }) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current || hasAnimated) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          const duration = 1500
          const steps = 60
          const increment = value / steps
          let current = 0

          const timer = setInterval(() => {
            current += increment
            if (current >= value) {
              setCount(value)
              clearInterval(timer)
            } else {
              setCount(Math.floor(current))
            }
          }, duration / steps)

          return () => clearInterval(timer)
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value, hasAnimated])

  return (
    <div ref={ref} className="text-3xl lg:text-4xl font-black text-white mb-2">
      {count}
    </div>
  )
}

export default function HomePage() {
  const { addToCart, totalItems } = useCart()
  const { isAuthenticated, customer } = useCustomerAuth()
  const [categories, setCategories] = useState<Category[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

useEffect(() => {
    async function loadData() {
      try {
        const [cats, prods, statsRes] = await Promise.all([
          api.getCategories(),
          api.getProducts(),
          fetch('https://functions.poehali.dev/37dbef59-9085-4b45-abb6-4370ec000735')
        ])
        const statsData = await statsRes.json()
        setCategories(cats)
        setProducts(prods)
        setStats(statsData)
      } catch (error) {
        console.error('Failed to load data:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])



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
              {isAuthenticated ? (
                <Link to="/profile" className="flex items-center gap-2 p-2 sm:px-4 sm:py-3 hover:bg-slate-100 rounded-2xl transition-all active:scale-95 touch-manipulation">
                  <User className="w-5 h-5 sm:w-6 sm:h-6 text-slate-700" />
                  <span className="hidden sm:block text-sm font-semibold text-slate-700">{customer?.full_name}</span>
                </Link>
              ) : (
                <Link to="/login" className="p-2 sm:p-3 hover:bg-slate-100 rounded-2xl transition-all active:scale-95 touch-manipulation">
                  <User className="w-5 h-5 sm:w-6 sm:h-6 text-slate-700" />
                </Link>
              )}
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
        <div className="relative mb-8 sm:mb-12">
          <div className="relative overflow-hidden rounded-3xl">
            <Link 
                to="/seller"
                className="min-w-full group relative overflow-hidden bg-gradient-to-br from-violet-600 via-fuchsia-600 to-purple-700 rounded-3xl p-6 sm:p-10 shadow-2xl hover:shadow-violet-500/50 transition-all active:scale-[0.98] touch-manipulation"
              >
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoLTEydjEyaDEyVjMwem0wIDI0aC0xMnYxMmgxMlY1NHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
                
                <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex-1 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                      <Sparkles className="w-4 h-4 text-yellow-300" />
                      <span className="text-white font-bold text-sm">Для бизнеса</span>
                    </div>
                    
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-3 sm:mb-4">
                      Станьте продавцом на Peeky!
                    </h2>
                    <p className="text-base sm:text-lg text-white/90 mb-4 sm:mb-6 max-w-2xl">
                      Начните продавать прямо сейчас • Комиссия всего 5% • Доступ к тысячам покупателей • Простое управление товарами
                    </p>
                    
                    <div className="inline-flex items-center gap-2 bg-white text-violet-600 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-black text-base sm:text-lg group-hover:bg-yellow-300 group-hover:scale-105 transition-all shadow-lg">
                      Узнать больше
                      <TrendingUp className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                  
                  {stats && (
                    <div className="hidden md:flex items-center justify-center">
                      <div className="relative">
                        <div className="absolute inset-0 bg-white/20 rounded-3xl blur-2xl"></div>
                        <div className="relative bg-white/10 backdrop-blur-sm p-8 rounded-3xl border-2 border-white/30">
                          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6">
                            <div className="text-center">
                              <AnimatedCounter value={stats.products} />
                              <div className="text-xs lg:text-sm text-white/80 font-semibold">Товаров</div>
                            </div>
                            <div className="text-center">
                              <AnimatedCounter value={stats.categories} />
                              <div className="text-xs lg:text-sm text-white/80 font-semibold">Категорий</div>
                            </div>
                            <div className="text-center">
                              <AnimatedCounter value={stats.sellers} />
                              <div className="text-xs lg:text-sm text-white/80 font-semibold">Продавцов</div>
                            </div>
                            <div className="text-center">
                              <AnimatedCounter value={stats.customers} />
                              <div className="text-xs lg:text-sm text-white/80 font-semibold">Покупателей</div>
                            </div>
                            <div className="text-center">
                              <AnimatedCounter value={stats.orders} />
                              <div className="text-xs lg:text-sm text-white/80 font-semibold">Заказов</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </Link>


          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            <button
              onClick={() => setCurrentBanner(0)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentBanner === 0 ? 'bg-white w-8' : 'bg-white/50'
              }`}
            />
            <button
              onClick={() => setCurrentBanner(1)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentBanner === 1 ? 'bg-white w-8' : 'bg-white/50'
              }`}
            />
          </div>
        </div>

        <div className="mb-12">
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-violet-600" />
            <h2 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
              Категории
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {categories.map((cat) => {
              const IconComponent = categoryIcons[cat.id] || Sparkles
              return (
                <Link
                  key={cat.id}
                  to={`/category/${cat.id}`}
                  className="group relative overflow-hidden bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 hover:shadow-2xl hover:shadow-violet-500/20 transition-all active:scale-95 touch-manipulation border border-slate-200/50"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-0 group-active:opacity-5 transition-opacity`}></div>
                  <div className="relative text-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 sm:mb-3 rounded-2xl bg-gradient-to-br from-violet-100 to-fuchsia-100 flex items-center justify-center">
                      <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-violet-600" />
                    </div>
                    <div className="font-bold text-sm sm:text-base text-slate-700 group-hover:text-violet-600 transition-colors">{cat.name}</div>
                  </div>
                </Link>
              )
            })}
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