import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSwipeable } from 'react-swipeable'
import Header from '@/components/Header'
import ProductCard from '@/components/ProductCard'
import Icon from '@/components/ui/icon'

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
  const [products, setProducts] = useState<Product[]>([])
  const [category, setCategory] = useState<Category | null>(null)
  const [showContent, setShowContent] = useState(false)

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

    const mockProducts: Product[] = [
      {
        id: 1,
        name: 'Смартфон Galaxy S24',
        price: 89990,
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
        rating: 4.8,
        category_id: 1
      },
      {
        id: 2,
        name: 'Ноутбук MacBook Pro',
        price: 179990,
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
        rating: 4.9,
        category_id: 1
      },
      {
        id: 3,
        name: 'Беспроводные наушники',
        price: 24990,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
        rating: 4.7,
        category_id: 1
      },
      {
        id: 4,
        name: 'Футболка классическая',
        price: 1990,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
        rating: 4.5,
        category_id: 2
      },
      {
        id: 5,
        name: 'Джинсы slim fit',
        price: 3990,
        image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400',
        rating: 4.6,
        category_id: 2
      },
      {
        id: 6,
        name: 'Куртка зимняя',
        price: 12990,
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400',
        rating: 4.8,
        category_id: 2
      },
      {
        id: 7,
        name: 'Гарри Поттер. Полное собрание',
        price: 4990,
        image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
        rating: 4.9,
        category_id: 3
      },
      {
        id: 8,
        name: 'Атомные привычки',
        price: 899,
        image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400',
        rating: 4.8,
        category_id: 3
      },
      {
        id: 9,
        name: 'Набор кофейных чашек',
        price: 2490,
        image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400',
        rating: 4.6,
        category_id: 4
      },
      {
        id: 10,
        name: 'Комнатное растение',
        price: 1290,
        image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400',
        rating: 4.7,
        category_id: 4
      },
      {
        id: 11,
        name: 'Йога-коврик',
        price: 1990,
        image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400',
        rating: 4.5,
        category_id: 5
      },
      {
        id: 12,
        name: 'Гантели 5кг пара',
        price: 3490,
        image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400',
        rating: 4.7,
        category_id: 5
      },
      {
        id: 13,
        name: 'Набор кистей для макияжа',
        price: 2990,
        image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400',
        rating: 4.6,
        category_id: 6
      },
      {
        id: 14,
        name: 'Увлажняющий крем',
        price: 1790,
        image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400',
        rating: 4.8,
        category_id: 6
      }
    ]

    const filteredProducts = mockProducts.filter(p => p.category_id === Number(categoryId))
    setProducts(filteredProducts)
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
        <button
          onClick={() => navigate('/')}
          className="mb-6 flex items-center gap-2 text-purple-600 hover:text-purple-800 font-semibold transition-colors animate-slide-in-left"
        >
          <Icon name="ArrowLeft" className="h-5 w-5" />
          Назад к категориям
        </button>

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
