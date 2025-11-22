import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Header from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Icon from '@/components/ui/icon'
import { useCart } from '@/contexts/CartContext'

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
  const { addToCart } = useCart()

  useEffect(() => {
    fetch('https://functions.poehali.dev/34e0420b-669c-42b4-9c05-40c5e47183fd')
      .then(res => res.json())
      .then(data => {
        const found = data.products.find((p: Product) => p.slug === slug)
        setProduct(found || null)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">Загрузка...</div>
        </main>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
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
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <Icon name="ArrowLeft" className="h-4 w-4 mr-2" />
          Назад
        </Button>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="aspect-square bg-muted rounded-lg overflow-hidden">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col">
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                <Icon name="Star" className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="text-lg font-semibold">{product.rating}</span>
              </div>
              <span className="text-muted-foreground">
                {product.reviews_count} отзывов
              </span>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-4xl font-bold">
                {parseFloat(String(product.price)).toLocaleString()} ₽
              </span>
              {product.old_price && (
                <>
                  <span className="text-xl text-muted-foreground line-through">
                    {parseFloat(String(product.old_price)).toLocaleString()} ₽
                  </span>
                  <Badge variant="destructive">
                    -{Math.round((1 - parseFloat(String(product.price)) / parseFloat(String(product.old_price))) * 100)}%
                  </Badge>
                </>
              )}
            </div>

            {product.stock > 0 ? (
              <div className="flex items-center gap-2 mb-6 text-green-600">
                <Icon name="Check" className="h-5 w-5" />
                <span>В наличии: {product.stock} шт</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 mb-6 text-red-600">
                <Icon name="X" className="h-5 w-5" />
                <span>Нет в наличии</span>
              </div>
            )}

            <Button
              size="lg"
              className="w-full md:w-auto mb-6"
              disabled={product.stock === 0}
              onClick={handleAddToCart}
            >
              <Icon name="ShoppingCart" className="h-5 w-5 mr-2" />
              В корзину
            </Button>

            <div className="border-t pt-6">
              <h2 className="text-xl font-semibold mb-3">Описание</h2>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
