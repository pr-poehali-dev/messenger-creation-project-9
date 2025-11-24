import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  LogOut, Plus, Edit2, Trash2, Package, ShoppingBag, 
  TrendingUp, DollarSign, Store, User, Settings 
} from 'lucide-react'

const SELLER_API = 'https://functions.poehali.dev/dc1ea738-7e4f-4794-ae7f-88de590113bd'

interface Product {
  id: number
  name: string
  price: number
  rating: number
  reviews_count: number
  image_url: string
  category_id: number
  category_slug: string
  category_name: string
  description: string
  stock: number
  created_at: string
}

interface Order {
  id: number
  product_id: number
  product_name: string
  product_image: string
  quantity: number
  total_price: number
  status: string
  customer_email: string
  customer_phone: string
  created_at: string
}

interface Stats {
  total_products: number
  total_orders: number
  total_revenue: number
}

export default function SellerDashboard() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'profile'>('products')
  const [products, setProducts] = useState<Product[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [stats, setStats] = useState<Stats>({ total_products: 0, total_orders: 0, total_revenue: 0 })
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  const token = localStorage.getItem('sellerToken')
  const sellerData = JSON.parse(localStorage.getItem('sellerData') || '{}')

  useEffect(() => {
    if (!token) {
      navigate('/seller/login')
      return
    }
    loadData()
  }, [token, navigate])

  const loadData = async () => {
    setLoading(true)
    try {
      const headers = { 'X-Seller-Token': token! }

      const [productsRes, ordersRes, statsRes] = await Promise.all([
        fetch(`${SELLER_API}?endpoint=products`, { headers }),
        fetch(`${SELLER_API}?endpoint=orders`, { headers }),
        fetch(`${SELLER_API}?endpoint=stats`, { headers })
      ])

      if (productsRes.ok) {
        const prods = await productsRes.json()
        setProducts(prods)
      }

      if (ordersRes.ok) {
        const ords = await ordersRes.json()
        setOrders(ords)
      }

      if (statsRes.ok) {
        const st = await statsRes.json()
        setStats(st)
      }
    } catch (error) {
      console.error('Failed to load data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('sellerToken')
    localStorage.removeItem('sellerData')
    navigate('/seller/login')
  }

  const handleDeleteProduct = async (id: number) => {
    if (!confirm('Удалить этот товар?')) return

    try {
      const response = await fetch(`${SELLER_API}?endpoint=products`, {
        method: 'DELETE',
        headers: { 
          'X-Seller-Token': token!,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
      })

      if (response.ok) {
        loadData()
      }
    } catch (error) {
      console.error('Failed to delete:', error)
    }
  }

  const handleSaveProduct = async (data: any) => {
    try {
      const method = editingProduct ? 'PUT' : 'POST'
      const payload = editingProduct ? { ...data, id: editingProduct.id } : data

      const response = await fetch(`${SELLER_API}?endpoint=products`, {
        method,
        headers: {
          'X-Seller-Token': token!,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      if (response.ok) {
        setShowModal(false)
        setEditingProduct(null)
        loadData()
      }
    } catch (error) {
      console.error('Failed to save:', error)
    }
  }

  const updateOrderStatus = async (orderId: number, newStatus: string) => {
    try {
      const response = await fetch(`${SELLER_API}?endpoint=orders`, {
        method: 'PUT',
        headers: {
          'X-Seller-Token': token!,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: orderId, status: newStatus })
      })

      if (response.ok) {
        loadData()
      }
    } catch (error) {
      console.error('Failed to update order:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-violet-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-semibold">Загрузка...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-2xl blur-sm"></div>
                <div className="relative bg-gradient-to-br from-violet-600 to-fuchsia-600 p-2 rounded-2xl">
                  <Store className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-black bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                  {sellerData.shop_name}
                </h1>
                <p className="text-sm text-slate-600">{sellerData.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl font-semibold transition-all active:scale-95"
            >
              <LogOut className="w-5 h-5" />
              Выйти
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-violet-100 rounded-xl">
                <Package className="w-8 h-8 text-violet-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Товаров</p>
                <p className="text-3xl font-black text-slate-800">{stats.total_products}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <ShoppingBag className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Заказов</p>
                <p className="text-3xl font-black text-slate-800">{stats.total_orders}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Выручка</p>
                <p className="text-3xl font-black text-slate-800">{stats.total_revenue.toLocaleString()} ₽</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
              activeTab === 'products'
                ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg'
                : 'bg-white text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Package className="w-5 h-5" />
            Товары
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
              activeTab === 'orders'
                ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg'
                : 'bg-white text-slate-600 hover:bg-slate-100'
            }`}
          >
            <ShoppingBag className="w-5 h-5" />
            Заказы
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
              activeTab === 'profile'
                ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg'
                : 'bg-white text-slate-600 hover:bg-slate-100'
            }`}
          >
            <User className="w-5 h-5" />
            Профиль
          </button>
        </div>

        {activeTab === 'products' && (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-black text-slate-800">Мои товары</h2>
              <button
                onClick={() => {
                  setEditingProduct(null)
                  setShowModal(true)
                }}
                className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white font-bold px-6 py-3 rounded-xl transition-all active:scale-95 shadow-lg"
              >
                <Plus className="w-5 h-5" />
                Добавить товар
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all border border-slate-200">
                  <div className="aspect-square bg-slate-100">
                    <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2 line-clamp-2">{product.name}</h3>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl font-black text-violet-600">{product.price.toLocaleString()} ₽</span>
                      <span className="text-sm text-slate-600">Остаток: {product.stock}</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingProduct(product)
                          setShowModal(true)
                        }}
                        className="flex-1 flex items-center justify-center gap-2 bg-slate-100 hover:bg-violet-100 text-slate-700 hover:text-violet-700 font-semibold py-2 rounded-xl transition-all"
                      >
                        <Edit2 className="w-4 h-4" />
                        Изменить
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="flex items-center justify-center bg-red-50 hover:bg-red-100 text-red-600 font-semibold px-4 py-2 rounded-xl transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'orders' && (
          <>
            <h2 className="text-3xl font-black text-slate-800 mb-6">Заказы</h2>
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-100">
                      <img src={order.product_image} alt={order.product_name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2">{order.product_name}</h3>
                      <div className="grid grid-cols-2 gap-2 text-sm text-slate-600 mb-3">
                        <p>Количество: {order.quantity} шт.</p>
                        <p>Сумма: {order.total_price.toLocaleString()} ₽</p>
                        <p>Email: {order.customer_email}</p>
                        <p>Телефон: {order.customer_phone}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                          className="px-4 py-2 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-violet-500 transition-all"
                        >
                          <option value="pending">В обработке</option>
                          <option value="confirmed">Подтвержден</option>
                          <option value="shipped">Отправлен</option>
                          <option value="delivered">Доставлен</option>
                          <option value="cancelled">Отменен</option>
                        </select>
                        <span className="text-sm text-slate-500">
                          {new Date(order.created_at).toLocaleDateString('ru-RU')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'profile' && (
          <div className="max-w-2xl">
            <h2 className="text-3xl font-black text-slate-800 mb-6">Профиль магазина</h2>
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Название магазина</label>
                  <p className="text-lg font-bold text-slate-800">{sellerData.shop_name}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                  <p className="text-lg text-slate-600">{sellerData.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Телефон</label>
                  <p className="text-lg text-slate-600">{sellerData.phone || 'Не указан'}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {showModal && (
        <ProductModal
          product={editingProduct}
          onSave={handleSaveProduct}
          onClose={() => {
            setShowModal(false)
            setEditingProduct(null)
          }}
        />
      )}
    </div>
  )
}

function ProductModal({
  product,
  onSave,
  onClose
}: {
  product: Product | null
  onSave: (data: any) => void
  onClose: () => void
}) {
  const [formData, setFormData] = useState(
    product || { 
      name: '', 
      price: 0, 
      category_id: 1, 
      description: '', 
      stock: 10, 
      image_url: '' 
    }
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <h2 className="text-3xl font-black mb-6 bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
          {product ? 'Редактировать товар' : 'Добавить товар'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Название товара</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-violet-500 transition-all"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Цена (₽)</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-violet-500 transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Остаток</label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-violet-500 transition-all"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Категория ID</label>
            <input
              type="number"
              value={formData.category_id}
              onChange={(e) => setFormData({ ...formData, category_id: Number(e.target.value) })}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-violet-500 transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">URL изображения</label>
            <input
              type="url"
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-violet-500 transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Описание</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-violet-500 transition-all"
              rows={4}
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-all"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white font-bold rounded-xl transition-all shadow-lg"
            >
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
