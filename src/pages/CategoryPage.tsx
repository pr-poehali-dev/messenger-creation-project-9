import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSwipeable } from 'react-swipeable'
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
  
  const products = getProductsByCategory(Number(categoryId)).map(p => ({
    id: p.id,
    name: p.name,
    price: p.price,
    old_price: p.old_price,
    image: p.image_url,
    rating: p.rating,
    category_id: p.category_id,
    slug: p.slug
  }))

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

  useEffect(() => {
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
  }, [categoryId])

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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Header />

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
          ) : (
            <div className="text-center py-16">
              <Icon name="Package" className="h-24 w-24 text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Пока нет товаров</h3>
              <p className="text-gray-600">В этой категории скоро появятся товары</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}