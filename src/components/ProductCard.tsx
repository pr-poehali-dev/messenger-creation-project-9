import { Link } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Icon from '@/components/ui/icon'
import { useCart } from '@/contexts/CartContext'
import { toast } from 'sonner'
import { useState } from 'react'

interface ProductCardProps {
  product: {
    id: number
    name: string
    price: number
    old_price?: number | null
    image: string
    rating: number
    slug?: string
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const [isClicked, setIsClicked] = useState(false)

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image
    })
    
    setIsClicked(true)
    setTimeout(() => setIsClicked(false), 600)

    toast.success('Товар добавлен!', {
      description: product.name,
      icon: '🛒',
      duration: 2000,
    })
  }

  const productSlug = product.slug || `product-${product.id}`

  return (
    <Card className={`group overflow-hidden hover:shadow-2xl transition-all duration-500 border-0 bg-white/90 backdrop-blur-sm hover:scale-105 hover:-translate-y-2 rounded-2xl active:scale-100 ${isClicked ? 'animate-card-added' : ''}`}>
      <Link to={`/product/${productSlug}`}>
        <div className="relative aspect-square bg-gradient-to-br from-purple-100 to-pink-100 overflow-hidden active:opacity-90">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 active:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </Link>
      <CardContent className="p-5">
        <Link to={`/product/${productSlug}`}>
          <h3 className="font-bold text-lg mb-2 hover:text-purple-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center gap-1 mb-3 text-sm bg-yellow-50 rounded-full px-2 py-1 w-fit">
          <Icon name="Star" className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="font-bold text-yellow-700">{product.rating}</span>
        </div>

        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-2xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {parseFloat(String(product.price)).toLocaleString()} ₽
          </span>
          {product.old_price && (
            <span className="text-sm text-gray-400 line-through">
              {parseFloat(String(product.old_price)).toLocaleString()} ₽
            </span>
          )}
        </div>

        <Button
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 active:shadow-inner relative overflow-hidden"
          onClick={handleAddToCart}
        >
          <span className="relative z-10 flex items-center justify-center">
            <Icon name="ShoppingCart" className={`h-4 w-4 mr-2 transition-transform ${isClicked ? 'animate-cart-jump' : ''}`} />
            В корзину
          </span>
          {isClicked && (
            <span className="absolute inset-0 bg-white/30 animate-ripple" />
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
