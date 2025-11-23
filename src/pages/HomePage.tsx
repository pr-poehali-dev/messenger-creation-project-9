import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
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
  const categoriesRef = useRef(null)
  const productsRef = useRef(null)
  const categoriesInView = useInView(categoriesRef, { once: true, margin: '-100px' })
  const productsInView = useInView(productsRef, { once: true, margin: '-100px' })

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
        <section className="mb-12" ref={categoriesRef}>
          <motion.h2 
            initial={{ opacity: 0, x: -100, rotate: -10 }}
            animate={categoriesInView ? { opacity: 1, x: 0, rotate: 0 } : { opacity: 0, x: -100, rotate: -10 }}
            transition={{ 
              duration: 0.8, 
              type: "spring",
              stiffness: 100,
              damping: 10
            }}
            className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
          >
            Категории
          </motion.h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {categories.map((cat, index) => {
              const iconName = categoryIcons[cat.name.toLowerCase()] || 'Package'
              return (
                <motion.button
                  key={cat.id}
                  initial={{ opacity: 0, scale: 0, rotate: 180 }}
                  animate={categoriesInView ? { 
                    opacity: 1, 
                    scale: 1, 
                    rotate: 0
                  } : { 
                    opacity: 0, 
                    scale: 0, 
                    rotate: 180 
                  }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 200,
                    damping: 12
                  }}
                  whileHover={{ 
                    scale: 1.15, 
                    rotate: [0, -5, 5, 0],
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(cat.id === selectedCategory ? null : cat.id)}
                  className={`group flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all duration-300 ${
                    selectedCategory === cat.id
                      ? 'border-purple-500 bg-gradient-to-br from-purple-100 to-pink-100 shadow-lg scale-105'
                      : 'border-transparent bg-white/80 backdrop-blur-sm hover:border-purple-300 hover:shadow-md'
                  }`}
                >
                  <div className="w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-200 to-pink-200 ring-2 ring-white shadow-lg group-hover:ring-purple-300 transition-all">
                    <Icon name={iconName} className="h-8 w-8 text-purple-700" />
                  </div>
                  <span className="text-sm font-semibold text-center">{cat.name}</span>
                </motion.button>
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

        <section ref={productsRef}>
          <motion.h2 
            initial={{ opacity: 0, x: 100, rotate: 10 }}
            animate={productsInView ? { opacity: 1, x: 0, rotate: 0 } : { opacity: 0, x: 100, rotate: 10 }}
            transition={{ 
              duration: 0.8, 
              type: "spring",
              stiffness: 100,
              damping: 10
            }}
            className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
          >
            Товары
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50, scale: 0.8, rotateX: 45 }}
                animate={productsInView ? { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1, 
                  rotateX: 0 
                } : { 
                  opacity: 0, 
                  y: 50, 
                  scale: 0.8, 
                  rotateX: 45 
                }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.05,
                  type: "spring",
                  stiffness: 150,
                  damping: 12
                }}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.2 }
                }}
              >
                <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border-0 bg-white/90 backdrop-blur-sm hover:scale-105 rounded-2xl">
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
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}