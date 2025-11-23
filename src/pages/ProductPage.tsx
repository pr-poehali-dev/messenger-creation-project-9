import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Header from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Icon from '@/components/ui/icon'
import { useCart } from '@/contexts/CartContext'
import { toast } from 'sonner'

interface Product {
  id: number
  name: string
  slug: string
  description: string
  price: number
  old_price: number | null
  image_url: string
  stock: number
  rating: number
  reviews_count: number
}

export default function ProductPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)
  const { addToCart } = useCart()

  useEffect(() => {
    setLoading(true)
    setShowContent(false)
    fetch('https://functions.poehali.dev/34e0420b-669c-42b4-9c05-40c5e47183fd')
      .then(res => res.json())
      .then(data => {
        const found = data.products.find((p: Product) => p.slug === slug)
        setProduct(found || null)
      })
      .catch(() => setProduct(null))
      .finally(() => {
        setTimeout(() => {
          setLoading(false)
          setTimeout(() => setShowContent(true), 50)
        }, 300)
      })
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-950 dark:to-gray-900">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="h-10 w-24 bg-gray-200 rounded-full mb-6 skeleton-box skeleton-box-fast"></div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl skeleton-box skeleton-box-slow"></div>
            
            <div className="flex flex-col bg-white/80 backdrop-blur-sm rounded-3xl p-8 space-y-6">
              <div className="h-12 bg-gradient-to-r from-purple-200 to-pink-200 rounded-lg w-3/4 skeleton-box skeleton-box-slow"></div>
              
              <div className="flex items-center gap-2">
                <div className="h-9 w-20 bg-yellow-100 rounded-full skeleton-box"></div>
                <div className="h-6 w-32 bg-gray-200 rounded skeleton-box skeleton-box-fast"></div>
              </div>
              
              <div className="flex items-baseline gap-4">
                <div className="h-14 w-40 bg-gradient-to-r from-purple-200 to-pink-200 rounded skeleton-box"></div>
                <div className="h-8 w-24 bg-gray-200 rounded skeleton-box skeleton-box-fast"></div>
                <div className="h-8 w-16 bg-red-200 rounded-full skeleton-box"></div>
              </div>
              
              <div className="h-10 w-48 bg-green-100 rounded-full skeleton-box"></div>
              
              <div className="h-14 w-full md:w-64 bg-gradient-to-r from-purple-200 to-pink-200 rounded-2xl skeleton-box"></div>
              
              <div className="border-t border-purple-200 pt-6 space-y-3">
                <div className="h-8 w-40 bg-gradient-to-r from-purple-200 to-pink-200 rounded skeleton-box"></div>
                <div className="h-4 bg-gray-200 rounded w-full skeleton-box skeleton-box-fast"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 skeleton-box skeleton-box-fast"></div>
                <div className="h-4 bg-gray-200 rounded w-4/5 skeleton-box skeleton-box-fast"></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-950 dark:to-gray-900">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Товар не найден</h1>
            <Button onClick={() => navigate('/')}>На главную</Button>
          </div>
        </main>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: parseFloat(String(product.price)),
      image_url: product.image_url
    })
    
    toast.success('Товар добавлен в корзину!', {
      description: product.name,
      duration: 2000,
      icon: '🛒',
      action: {
        label: 'Перейти в корзину',
        onClick: () => navigate('/cart')
      }
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-950 dark:to-gray-900">
      <Header />

      <main className={`container mx-auto px-4 py-8 transition-opacity duration-700 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6 hover:bg-purple-100 rounded-full">
          <Icon name="ArrowLeft" className="h-4 w-4 mr-2" />
          Назад
        </Button>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl overflow-hidden shadow-2xl">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col bg-white/80 backdrop-blur-sm rounded-3xl p-4 md:p-8 shadow-xl">
            <h1 className="text-2xl md:text-4xl font-black mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{product.name}</h1>

            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-1 bg-yellow-50 rounded-full px-2 py-1 md:px-3 md:py-1.5">
                <Icon name="Star" className="h-4 w-4 md:h-5 md:w-5 fill-yellow-400 text-yellow-400" />
                <span className="text-base md:text-lg font-bold text-yellow-700">{product.rating}</span>
              </div>
              <span className="text-sm md:text-base text-gray-600 font-medium">
                {product.reviews_count} отзывов
              </span>
            </div>

            <div className="flex items-baseline gap-2 md:gap-4 mb-6">
              <span className="text-3xl md:text-5xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {parseFloat(String(product.price)).toLocaleString()} ₽
              </span>
              {product.old_price && (
                <>
                  <span className="text-xl text-gray-400 line-through">
                    {parseFloat(String(product.old_price)).toLocaleString()} ₽
                  </span>
                  <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white border-0 text-lg px-3 py-1">
                    -{Math.round((1 - parseFloat(String(product.price)) / parseFloat(String(product.old_price))) * 100)}%
                  </Badge>
                </>
              )}
            </div>

            {product.stock > 0 ? (
              <div className="flex items-center gap-2 mb-6 bg-green-50 rounded-full px-4 py-2 w-fit">
                <Icon name="Check" className="h-5 w-5 text-green-600" />
                <span className="font-semibold text-green-700">В наличии: {product.stock} шт</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 mb-6 bg-red-50 rounded-full px-4 py-2 w-fit">
                <Icon name="X" className="h-5 w-5 text-red-600" />
                <span className="font-semibold text-red-700">Нет в наличии</span>
              </div>
            )}

            <Button
              size="lg"
              className="w-full md:w-auto mb-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-lg py-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:scale-105"
              disabled={product.stock === 0}
              onClick={handleAddToCart}
            >
              <Icon name="ShoppingCart" className="h-5 w-5 mr-2" />
              В корзину
            </Button>

            <div className="border-t border-purple-200 pt-6">
              <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Описание</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}