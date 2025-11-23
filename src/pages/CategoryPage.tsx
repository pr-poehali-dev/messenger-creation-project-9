import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSwipeable } from 'react-swipeable'
import PullToRefresh from 'react-simple-pull-to-refresh'
import { toast } from 'sonner'
import Header from '@/components/Header'
import Breadcrumbs from '@/components/Breadcrumbs'
import ProductCard from '@/components/ProductCard'
import Icon from '@/components/ui/icon'
import { useProducts } from '@/contexts/ProductsContext'

interface Product {
  id: number
  name: string
  price: number
  image: string
  rating: number
  reviews_count: number
  category_id: number
}

interface Category {
  id: number
  name: string
}

const categoryIcons: Record<string, string> = {
  'электроника': 'Laptop',
  'одежда': 'Shirt',
  'книги': 'BookOpen',
  'дом и сад': 'Home',
  'спорт': 'Dumbbell',
  'красота': 'Sparkles'
}

export default function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>()
  const navigate = useNavigate()
  const { getProductsByCategory } = useProducts()
  const [category, setCategory] = useState<Category | null>(null)
  const [showContent, setShowContent] = useState(false)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200000])
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(200000)
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'rating' | 'popular'>('default')
  
  const allProducts = getProductsByCategory(Number(categoryId)).map(p => ({
    id: p.id,
    name: p.name,
    price: p.price,
    old_price: p.old_price,
    image: p.image_url,
    rating: p.rating,
    reviews_count: p.reviews_count,
    category_id: p.category_id,
    slug: p.slug
  }))
  
  const filteredProducts = allProducts.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])
  
  const products = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price
      case 'price-desc':
        return b.price - a.price
      case 'rating':
        return b.rating - a.rating
      case 'popular':
        return b.reviews_count - a.reviews_count
      default:
        return 0
    }
  })

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      navigate('/cart')
    },
    onSwipedRight: () => {
      navigate('/profile')
    },
    trackMouse: false
  })

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const loadCategory = () => {
    const categories: Category[] = [
      { id: 1, name: 'Электроника' },
      { id: 2, name: 'Одежда' },
      { id: 3, name: 'Книги' },
      { id: 4, name: 'Дом и сад' },
      { id: 5, name: 'Спорт' },
      { id: 6, name: 'Красота' }
    ]

    const currentCategory = categories.find(c => c.id === Number(categoryId))
    setCategory(currentCategory || null)
    
    if (allProducts.length > 0) {
      const prices = allProducts.map(p => p.price)
      const min = Math.min(...prices)
      const max = Math.max(...prices)
      setMinPrice(min)
      setMaxPrice(max)
      setPriceRange([min, max])
    }
  }

  useEffect(() => {
    loadCategory()
  }, [categoryId, allProducts.length])

  const handleRefresh = async () => {
    loadCategory()
    toast.success('Обновлено!', {
      icon: '🔄',
      duration: 1500,
    })
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Icon name="AlertCircle" className="h-16 w-16 text-purple-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800">Категория не найдена</h2>
          <button
            onClick={() => navigate('/')}
            className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:shadow-lg transition-all"
          >
            Вернуться на главную
          </button>
        </div>
      </div>
    )
  }

  const iconName = categoryIcons[category.name.toLowerCase()] || 'Package'

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-950 dark:to-gray-900">
      <Header />

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
        <Breadcrumbs 
          items={[
            { label: category.name }
          ]}
        />

        <div className={`transition-opacity duration-700 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
          <div className="mb-8 flex items-center gap-4 animate-slide-in-left">
            <div className="w-20 h-20 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-200 to-pink-200 ring-4 ring-white shadow-lg">
              <Icon name={iconName} className="h-10 w-10 text-purple-700" />
            </div>
            <div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {category.name}
              </h1>
              <p className="text-gray-600 mt-1">
                {products.length} {products.length === 1 ? 'товар' : products.length < 5 ? 'товара' : 'товаров'}
              </p>
            </div>
          </div>

          {allProducts.length > 0 && (
            <div className="mb-8 space-y-4">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg animate-slide-in-right">
                <div className="flex items-center gap-2 mb-4">
                  <Icon name="ArrowUpDown" className="h-5 w-5 text-purple-600" />
                  <h3 className="text-lg font-bold text-gray-800">Сортировка</h3>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSortBy('default')}
                    className={`px-3 py-2 text-sm md:px-4 md:text-base rounded-xl font-semibold transition-all ${
                      sortBy === 'default'
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    По умолчанию
                  </button>
                  <button
                    onClick={() => setSortBy('price-asc')}
                    className={`px-3 py-2 text-sm md:px-4 md:text-base rounded-xl font-semibold transition-all flex items-center gap-1 ${
                      sortBy === 'price-asc'
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Icon name="ArrowUp" className="h-3 w-3 md:h-4 md:w-4" />
                    <span className="hidden xs:inline">Дешевле</span>
                    <span className="xs:hidden">↑ Цена</span>
                  </button>
                  <button
                    onClick={() => setSortBy('price-desc')}
                    className={`px-3 py-2 text-sm md:px-4 md:text-base rounded-xl font-semibold transition-all flex items-center gap-1 ${
                      sortBy === 'price-desc'
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Icon name="ArrowDown" className="h-3 w-3 md:h-4 md:w-4" />
                    <span className="hidden xs:inline">Дороже</span>
                    <span className="xs:hidden">↓ Цена</span>
                  </button>
                  <button
                    onClick={() => setSortBy('rating')}
                    className={`px-3 py-2 text-sm md:px-4 md:text-base rounded-xl font-semibold transition-all flex items-center gap-1 ${
                      sortBy === 'rating'
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Icon name="Star" className="h-3 w-3 md:h-4 md:w-4" />
                    <span className="hidden xs:inline">По рейтингу</span>
                    <span className="xs:hidden">★</span>
                  </button>
                  <button
                    onClick={() => setSortBy('popular')}
                    className={`px-3 py-2 text-sm md:px-4 md:text-base rounded-xl font-semibold transition-all flex items-center gap-1 ${
                      sortBy === 'popular'
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Icon name="TrendingUp" className="h-3 w-3 md:h-4 md:w-4" />
                    <span className="hidden xs:inline">Популярные</span>
                    <span className="xs:hidden">🔥</span>
                  </button>
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg animate-slide-in-right">
                <div className="flex items-center gap-2 mb-4">
                  <Icon name="SlidersHorizontal" className="h-5 w-5 text-purple-600" />
                  <h3 className="text-lg font-bold text-gray-800">Фильтр по цене</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <label className="text-sm text-gray-600 mb-1 block">От</label>
                      <input
                        type="number"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                        min={minPrice}
                        max={priceRange[1]}
                        className="w-full px-3 py-2 border-2 border-purple-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                        placeholder="0"
                      />
                    </div>
                    <div className="pt-6">
                      <Icon name="Minus" className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <label className="text-sm text-gray-600 mb-1 block">До</label>
                      <input
                        type="number"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                        min={priceRange[0]}
                        max={maxPrice}
                        className="w-full px-3 py-2 border-2 border-purple-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                        placeholder="200000"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">
                      Найдено: <span className="font-bold text-purple-600">{products.length}</span> из {allProducts.length}
                    </span>
                    {(priceRange[0] !== minPrice || priceRange[1] !== maxPrice) && (
                      <button
                        onClick={() => setPriceRange([minPrice, maxPrice])}
                        className="text-purple-600 hover:text-purple-800 font-semibold transition-colors flex items-center gap-1"
                      >
                        <Icon name="X" className="h-4 w-4" />
                        Сбросить
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product, index) => (
                <div
                  key={product.id}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  className="animate-bounce-in"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : allProducts.length > 0 ? (
            <div className="text-center py-16">
              <Icon name="Search" className="h-24 w-24 text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Ничего не найдено</h3>
              <p className="text-gray-600">Попробуйте изменить диапазон цен</p>
              <button
                onClick={() => setPriceRange([minPrice, maxPrice])}
                className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:shadow-lg transition-all"
              >
                Сбросить фильтр
              </button>
            </div>
          ) : (
            <div className="text-center py-16">
              <Icon name="Package" className="h-24 w-24 text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Пока нет товаров</h3>
              <p className="text-gray-600">В этой категории скоро появятся товары</p>
            </div>
          )}
        </div>
      </main>
      </PullToRefresh>
    </div>
  )
}