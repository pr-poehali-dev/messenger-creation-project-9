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
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-6">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Категории</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id === selectedCategory ? null : cat.id)}
                className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                  selectedCategory === cat.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="w-16 h-16 rounded-full overflow-hidden bg-muted">
                  <img src={cat.image_url} alt={cat.name} className="w-full h-full object-cover" />
                </div>
                <span className="text-sm font-medium text-center">{cat.name}</span>
              </button>
            ))}
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

        <section>
          <h2 className="text-2xl font-bold mb-4">Товары</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map(product => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <Link to={`/product/${product.slug}`}>
                  <div className="aspect-square bg-muted overflow-hidden">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                </Link>
                <CardContent className="p-4">
                  <Link to={`/product/${product.slug}`}>
                    <h3 className="font-semibold mb-2 hover:text-primary transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                  </Link>
                  
                  <div className="flex items-center gap-1 mb-2 text-sm">
                    <Icon name="Star" className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{product.rating}</span>
                    <span className="text-muted-foreground">({product.reviews_count})</span>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl font-bold">{parseFloat(String(product.price)).toLocaleString()} ₽</span>
                    {product.old_price && (
                      <span className="text-sm text-muted-foreground line-through">
                        {parseFloat(String(product.old_price)).toLocaleString()} ₽
                      </span>
                    )}
                  </div>

                  <Button
                    className="w-full"
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
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}