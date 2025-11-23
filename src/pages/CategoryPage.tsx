import { Link, useParams } from 'react-router-dom'
import { ShoppingCart, Search, User, ChevronLeft } from 'lucide-react'

const products = [
  { id: 1, name: 'iPhone 15 Pro', price: 89990, image: 'https://images.unsplash.com/photo-1592286927505-0ac3b3e76dbb?w=400', category: 1 },
  { id: 2, name: 'Samsung Galaxy S24', price: 79990, image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400', category: 1 },
  { id: 3, name: 'Джинсы Levis', price: 6990, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400', category: 2 },
  { id: 4, name: 'Кроссовки Nike', price: 12990, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', category: 2 },
]

const categories: Record<string, string> = {
  '1': 'Электроника',
  '2': 'Одежда',
  '3': 'Дом и сад',
  '4': 'Красота',
  '5': 'Спорт',
  '6': 'Детские товары',
}

export default function CategoryPage() {
  const { id } = useParams()
  const categoryName = categories[id || '1']
  const filteredProducts = products.filter(p => p.category === Number(id))

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              Маркетплейс
            </Link>
            
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Поиск товаров..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <User className="w-6 h-6" />
              </button>
              <Link to="/cart" className="p-2 hover:bg-gray-100 rounded-lg relative">
                <ShoppingCart className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  0
                </span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
          <ChevronLeft className="w-5 h-5" />
          Назад к категориям
        </Link>

        <h1 className="text-3xl font-bold mb-6">{categoryName}</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="bg-white rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold mb-2">{product.name}</h3>
                <div className="text-2xl font-bold text-blue-600">
                  {product.price.toLocaleString()} ₽
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">В этой категории пока нет товаров</p>
          </div>
        )}
      </main>
    </div>
  )
}
