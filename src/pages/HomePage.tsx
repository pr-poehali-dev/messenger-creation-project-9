import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '@/components/Header'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Icon from '@/components/ui/icon'
import { useCart } from '@/contexts/CartContext'

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
  const [products, setProducts] = useState<Product[]>([])
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const { addToCart } = useCart()

  useEffect(() => {
    fetch('https://functions.poehali.dev/34e0420b-669c-42b4-9c05-40c5e47183fd')
      .then(res => res.json())
      .then(data => {
        setCategories(data.categories || [])
        setProducts(data.products || [])
      })
      .catch(console.error)
  }, [])

  const filteredProducts = selectedCategory
    ? products.filter(p => p.category_id === selectedCategory)
    : products

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12 animate-fade-in">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent animate-slide-in-left">
            Категории
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {categories.map((cat, index) => {
              const iconName = categoryIcons[cat.name.toLowerCase()] || 'Package'
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id === selectedCategory ? null : cat.id)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  className={`group flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all duration-300 animate-bounce-in hover:animate-wiggle ${
                    selectedCategory === cat.id
                      ? 'border-purple-500 bg-gradient-to-br from-purple-100 to-pink-100 shadow-lg scale-105'
                      : 'border-transparent bg-white/80 backdrop-blur-sm hover:border-purple-300 hover:shadow-md hover:scale-110 active:scale-95'
                  }`}
                >
                  <div className="w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-200 to-pink-200 ring-2 ring-white shadow-lg group-hover:ring-purple-300 transition-all group-hover:rotate-12">
                    <Icon name={iconName} className="h-8 w-8 text-purple-700" />
                  </div>
                  <span className="text-sm font-semibold text-center">{cat.name}</span>
                </button>
              )
            })}
          </div>
          {selectedCategory && (
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() => setSelectedCategory(null)}
            >
              Сбросить фильтр
            </Button>
          )}
        </section>

        <section className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent animate-slide-in-right">
            Товары
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-scale-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 border-0 bg-white/90 backdrop-blur-sm hover:scale-105 hover:-translate-y-2 rounded-2xl">
                <Link to={`/product/${product.slug}`}>
                  <div className="relative aspect-square bg-gradient-to-br from-purple-100 to-pink-100 overflow-hidden">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
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
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    onClick={() => addToCart({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image_url: product.image_url
                    })}
                  >
                    <Icon name="ShoppingCart" className="h-4 w-4 mr-2" />
                    В корзину
                  </Button>
                </CardContent>
              </Card>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}