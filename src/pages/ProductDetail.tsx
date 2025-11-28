import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import MobileMenu from '@/components/MobileMenu';
import { getProductById, Product } from '@/lib/products';
import { addToCart, getCartCount } from '@/lib/cart';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    if (id) {
      const found = getProductById(id);
      if (found) {
        setProduct(found);
      } else {
        navigate('/');
      }
    }
  }, [id, navigate]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Icon name="Loader2" size={48} className="animate-spin text-purple-600" />
      </div>
    );
  }

  const images = product.images || [product.image];
  const discount = product.oldPrice 
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      sellerId: product.sellerId,
      sellerName: product.sellerName
    }, quantity);
    
    window.dispatchEvent(new Event('cartUpdated'));
    
    const notification = document.createElement('div');
    notification.className = 'fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-xl shadow-xl z-50 animate-fade-in';
    notification.textContent = 'Товар добавлен в корзину!';
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-700 hover:text-purple-600 transition-colors">
              <Icon name="ArrowLeft" size={24} />
              <span className="font-medium">Назад</span>
            </button>
            
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-2 rounded-xl">
                <Icon name="Sparkles" size={20} className="text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Peeky
              </span>
            </Link>
            
            <Link to="/cart">
              <Button variant="ghost" size="icon">
                <Icon name="ShoppingCart" size={22} />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-xl">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {discount > 0 && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full text-lg font-bold shadow-lg">
                  -{discount}%
                </div>
              )}
            </div>
            
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === idx ? 'border-purple-600 shadow-lg' : 'border-gray-200'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center gap-1 bg-yellow-100 px-3 py-1 rounded-full">
                  <Icon name="Star" size={18} className="text-yellow-500 fill-yellow-500" />
                  <span className="font-bold text-yellow-900">{product.rating}</span>
                </div>
                <span className="text-gray-600">({product.reviews} отзывов)</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-3 text-sm text-gray-600 mb-6">
                <Icon name="Store" size={18} />
                <span>Продавец: <strong>{product.sellerName}</strong></span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              {product.oldPrice && (
                <div className="text-xl text-gray-400 line-through mb-2">
                  {product.oldPrice.toLocaleString('ru-RU')} ₽
                </div>
              )}
              <div className="text-4xl md:text-5xl font-bold text-purple-600 mb-4">
                {product.price.toLocaleString('ru-RU')} ₽
              </div>
              
              {product.inStock ? (
                <div className="flex items-center gap-2 text-green-600 mb-6">
                  <Icon name="Check" size={20} />
                  <span className="font-medium">В наличии</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-red-600 mb-6">
                  <Icon name="X" size={20} />
                  <span className="font-medium">Нет в наличии</span>
                </div>
              )}

              <div className="flex items-center gap-4 mb-4">
                <span className="font-medium text-gray-700">Количество:</span>
                <div className="flex items-center gap-3 bg-gray-100 rounded-xl p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg bg-white hover:bg-purple-100 transition-colors flex items-center justify-center"
                  >
                    <Icon name="Minus" size={20} />
                  </button>
                  <span className="font-bold text-lg w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-lg bg-white hover:bg-purple-100 transition-colors flex items-center justify-center"
                  >
                    <Icon name="Plus" size={20} />
                  </button>
                </div>
              </div>

              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-full h-14 text-lg font-semibold rounded-xl"
              >
                <Icon name="ShoppingCart" size={22} />
                Добавить в корзину
              </Button>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-4">Описание</h2>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {product.characteristics && product.characteristics.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h2 className="text-xl font-bold mb-4">Характеристики</h2>
                <div className="space-y-3">
                  {product.characteristics.map((char, idx) => (
                    <div key={idx} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                      <span className="text-gray-600">{char.name}</span>
                      <span className="font-medium text-gray-900">{char.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <MobileMenu />
    </div>
  );
}