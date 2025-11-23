import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PullToRefresh from 'react-simple-pull-to-refresh'
import Header from '@/components/Header'
import SwipeHint from '@/components/SwipeHint'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Icon from '@/components/ui/icon'
import { useCart } from '@/contexts/CartContext'
import { useProducts } from '@/contexts/ProductsContext'
import { toast } from 'sonner'
import { useSwipeable } from 'react-swipeable'

interface Category {
  id: number
  name: string
  slug: string
  image_url: string
}

interface Product {
  id: number
  name: string
  slug: string
  price: number
  old_price: number | null
  category_id: number
  image_url: string
  rating: number
  reviews_count: number
}

const categoryIcons: Record<string, string> = {
  'электроника': 'Laptop',
  'одежда': 'ShoppingBag',
  'дом и сад': 'Home',
  'спорт': 'Dumbbell',
  'красота': 'Sparkles',
  'книги': 'Book'
}

export default function HomePage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [clickedCards, setClickedCards] = useState<Set<number>>(new Set())
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)
  const { addToCart } = useCart()
  const { products } = useProducts()
  const navigate = useNavigate()

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      navigate('/cart')
    },
    onSwipedRight: () => {
      navigate('/profile')
    },
    preventScrollOnSwipe: true,
    trackMouse: false,
    delta: 50,
  })

  const handleAddToCart = (product: { id: number; name: string; price: number; image_url: string }) => {
    addToCart(product)
    setClickedCards(prev => new Set(prev).add(product.id))
    
    toast.success('Товар добавлен в корзину!', {
      description: product.name,
      duration: 2000,
      icon: '🛒',
    })
    
    setTimeout(() => {
      setClickedCards(prev => {
        const next = new Set(prev)
        next.delete(product.id)
        return next
      })
    }, 600)
  }

  const loadCategories = async () => {
    try {
      const res = await fetch('https://functions.poehali.dev/34e0420b-669c-42b4-9c05-40c5e47183fd')
      if (!res.ok) throw new Error('Failed to fetch categories')
      const data = await res.json()
      setCategories(data.categories || [])
    } catch (error) {
      console.error('Error loading categories:', error)
      setCategories([])
    }
  }

  useEffect(() => {
    setIsLoading(true)
    loadCategories()
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false)
          setTimeout(() => setShowContent(true), 50)
        }, 300)
      })
  }, [])

  const handleRefresh = async () => {
    await loadCategories()
    toast.success('Обновлено!', {
      icon: '🔄',
      duration: 1500,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-950 dark:to-gray-900">
      <Header />
      <SwipeHint 
        storageKey="customer-swipe-hint-seen"
        leftText="Корзина"
        rightText="Профиль"
      />

      <PullToRefresh 
        onRefresh={handleRefresh}
        pullingContent={
          <div className="flex justify-center py-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center shadow-lg">
              <Icon name="ArrowDown" className="h-5 w-5 text-white" />
            </div>
          </div>
        }
        refreshingContent={
          <div className="flex justify-center py-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center shadow-lg">
              <Icon name="Loader2" className="h-5 w-5 text-white animate-spin" />
            </div>
          </div>
        }
        resistance={2}
        maxPullDownDistance={80}
      >
        <main {...swipeHandlers} className="container mx-auto px-4 py-8">
        <div className={`transition-opacity duration-500 ${isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none absolute'}`}>
          <section className="mb-12">
            <div className="h-9 w-48 bg-gradient-to-r from-purple-200 to-pink-200 rounded-lg mb-6 skeleton-box skeleton-box-slow"></div>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/80 backdrop-blur-sm">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-200 to-pink-200 skeleton-box"></div>
                  <div className="h-4 w-20 bg-gray-200 rounded skeleton-box skeleton-box-fast"></div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="h-9 w-32 bg-gradient-to-r from-purple-200 to-pink-200 rounded-lg mb-6 skeleton-box skeleton-box-slow"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="rounded-2xl overflow-hidden bg-white/90 backdrop-blur-sm">
                  <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 skeleton-box skeleton-box-slow"></div>
                  <div className="p-5 space-y-3">
                    <div className="h-6 bg-gray-200 rounded w-3/4 skeleton-box"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 skeleton-box skeleton-box-fast"></div>
                    <div className="flex items-baseline gap-2">
                      <div className="h-8 bg-gradient-to-r from-purple-200 to-pink-200 rounded w-24 skeleton-box"></div>
                      <div className="h-4 bg-gray-200 rounded w-16 skeleton-box skeleton-box-fast"></div>
                    </div>
                    <div className="h-10 bg-gradient-to-r from-purple-200 to-pink-200 rounded-xl skeleton-box"></div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className={`transition-opacity duration-700 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent animate-slide-in-left">
            Категории
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {categories.map((cat, index) => {
              const iconName = categoryIcons[cat.name.toLowerCase()] || 'Package'
              return (
                <button
                  key={cat.id}
                  onClick={() => navigate(`/category/${cat.id}`)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  className="group flex flex-col items-center gap-2 p-4 rounded-2xl border-2 border-transparent bg-white/80 backdrop-blur-sm transition-all duration-300 animate-bounce-in active:animate-click-pulse active:scale-95"
                >
                  <div className="w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-200 to-pink-200 ring-2 ring-white shadow-lg transition-all group-hover:rotate-12 group-active:ring-4 group-active:ring-purple-400">
                    <Icon name={iconName} className="h-8 w-8 text-purple-700 group-active:scale-90 transition-transform" />
                  </div>
                  <span className="text-sm font-semibold text-center text-gray-900">{cat.name}</span>
                </button>
              )
            })}
          </div>
        </section>

        <section className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent animate-slide-in-right">
            Товары
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="animate-scale-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <Card className={`group overflow-hidden hover:shadow-2xl transition-all duration-500 border-0 bg-white/90 backdrop-blur-sm hover:scale-105 hover:-translate-y-2 rounded-2xl active:scale-100 ${clickedCards.has(product.id) ? 'animate-card-added' : ''}`}>
                <Link to={`/product/${product.slug}`}>
                  <div className="relative aspect-square bg-gradient-to-br from-purple-100 to-pink-100 overflow-hidden active:opacity-90">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 active:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Link>
                <CardContent className="p-5">
                  <Link to={`/product/${product.slug}`}>
                    <h3 className="font-bold text-lg mb-2 hover:text-purple-600 transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                  </Link>
                  
                  <div className="flex items-center gap-1 mb-3 text-sm bg-yellow-50 rounded-full px-2 py-1 w-fit">
                    <Icon name="Star" className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold text-yellow-700">{product.rating}</span>
                    <span className="text-yellow-600">({product.reviews_count})</span>
                  </div>

                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-2xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{parseFloat(String(product.price)).toLocaleString()} ₽</span>
                    {product.old_price && (
                      <span className="text-sm text-gray-400 line-through">
                        {parseFloat(String(product.old_price)).toLocaleString()} ₽
                      </span>
                    )}
                  </div>

                  <Button
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 active:shadow-inner relative overflow-hidden"
                    onClick={() => handleAddToCart({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image_url: product.image_url
                    })}
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      <Icon name="ShoppingCart" className={`h-4 w-4 mr-2 transition-transform ${clickedCards.has(product.id) ? 'animate-cart-jump' : ''}`} />
                      В корзину
                    </span>
                    {clickedCards.has(product.id) && (
                      <span className="absolute inset-0 bg-white/30 animate-ripple" />
                    )}
                  </Button>
                </CardContent>
              </Card>
              </div>
            ))}
          </div>
        </section>
        </div>
      </main>
      </PullToRefresh>
    </div>
  )
}