import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogOut, Store } from 'lucide-react'
import StatsCards from '@/components/seller/StatsCards'
import ProductsTab from '@/components/seller/ProductsTab'
import OrdersTab from '@/components/seller/OrdersTab'
import ProfileTab from '@/components/seller/ProfileTab'
import ProductModal from '@/components/seller/ProductModal'

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

  const handleAddProduct = () => {
    setEditingProduct(null)
    setShowModal(true)
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingProduct(null)
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
        <StatsCards stats={stats} />

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
              activeTab === 'products'
                ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/50'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Товары
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
              activeTab === 'orders'
                ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/50'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Заказы
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
              activeTab === 'profile'
                ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/50'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Профиль
          </button>
        </div>

        {activeTab === 'products' && (
          <ProductsTab
            products={products}
            onAddProduct={handleAddProduct}
            onEditProduct={handleEditProduct}
            onDeleteProduct={handleDeleteProduct}
          />
        )}

        {activeTab === 'orders' && (
          <OrdersTab
            orders={orders}
            onUpdateOrderStatus={updateOrderStatus}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileTab sellerData={sellerData} />
        )}
      </main>

      <ProductModal
        isOpen={showModal}
        editingProduct={editingProduct}
        onClose={handleCloseModal}
        onSave={handleSaveProduct}
      />
    </div>
  )
}
