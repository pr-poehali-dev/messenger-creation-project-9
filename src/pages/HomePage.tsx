import { Link } from 'react-router-dom'
import { ShoppingCart, Search, User } from 'lucide-react'

const categories = [
  { id: 1, name: 'Электроника', icon: '📱' },
  { id: 2, name: 'Одежда', icon: '👕' },
  { id: 3, name: 'Дом и сад', icon: '🏡' },
  { id: 4, name: 'Красота', icon: '💄' },
  { id: 5, name: 'Спорт', icon: '⚽' },
  { id: 6, name: 'Детские товары', icon: '🧸' },
]

const products = [
  { id: 1, name: 'iPhone 15 Pro', price: 89990, image: 'https://images.unsplash.com/photo-1592286927505-0ac3b3e76dbb?w=400', category: 1 },
  { id: 2, name: 'Samsung Galaxy S24', price: 79990, image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400', category: 1 },
  { id: 3, name: 'Джинсы Levis', price: 6990, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400', category: 2 },
  { id: 4, name: 'Кроссовки Nike', price: 12990, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', category: 2 },
  { id: 5, name: 'Кофеварка Delonghi', price: 24990, image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400', category: 3 },
  { id: 6, name: 'Пылесос Dyson', price: 34990, image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400', category: 3 },
  { id: 7, name: 'Помада MAC', price: 2490, image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400', category: 4 },
  { id: 8, name: 'Духи Chanel', price: 8990, image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400', category: 4 },
]

export default function HomePage() {
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
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Категории</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/category/${cat.id}`}
                className="bg-white p-6 rounded-xl hover:shadow-lg transition-shadow text-center"
              >
                <div className="text-4xl mb-2">{cat.icon}</div>
                <div className="font-medium">{cat.name}</div>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Популярные товары</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
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
        </section>
      </main>
    </div>
  )
}
