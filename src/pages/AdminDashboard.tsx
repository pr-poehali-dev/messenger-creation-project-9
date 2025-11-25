import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Package, FolderOpen, AlertTriangle } from 'lucide-react'
import AdminHeader from '@/components/admin/AdminHeader'
import AdminStats from '@/components/admin/AdminStats'
import AdminProductsList from '@/components/admin/AdminProductsList'
import AdminCategoriesList from '@/components/admin/AdminCategoriesList'

const ADMIN_API = 'https://functions.poehali.dev/f3d74af2-2b4e-4711-b02e-15d39ab212ef'
const STATS_API = 'https://functions.poehali.dev/37dbef59-9085-4b45-abb6-4370ec000735'

interface Category {
  id: number
  slug: string
  name: string
  image_url: string
  created_at: string
}

interface Product {
  id: number
  name: string
  price: number
  rating: number
  reviews_count: number
  image_url: string
  category_id: number
  category_slug: string
  description: string
  stock: number
  created_at: string
}

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'products' | 'categories'>('products')
  const [categories, setCategories] = useState<Category[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)
  const [stats, setStats] = useState({ products: 0, categories: 0, sellers: 0, customers: 0, orders: 0 })

  const token = localStorage.getItem('adminToken')
  const email = localStorage.getItem('adminEmail')

  useEffect(() => {
    if (!token) {
      navigate('/admin')
      return
    }
    loadData()
  }, [token, navigate])

  const loadData = async () => {
    setLoading(true)
    try {
      const [catsRes, prodsRes, statsRes] = await Promise.all([
        fetch(`${ADMIN_API}?endpoint=categories`, {
          headers: { 'X-Admin-Token': token! }
        }),
        fetch(`${ADMIN_API}?endpoint=products`, {
          headers: { 'X-Admin-Token': token! }
        }),
        fetch(STATS_API)
      ])

      if (!catsRes.ok || !prodsRes.ok) {
        throw new Error('Failed to load data')
      }

      const cats = await catsRes.json()
      const prods = await prodsRes.json()
      
      setCategories(cats)
      setProducts(prods)
      
      if (statsRes.ok) {
        const statsData = await statsRes.json()
        setStats(statsData)
      }
    } catch (error) {
      console.error('Failed to load data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminEmail')
    navigate('/admin')
  }

  const handleDelete = async (type: 'product' | 'category', id: number) => {
    if (!confirm('Удалить этот элемент?')) return

    try {
      const endpoint = type === 'product' ? 'products' : 'categories'
      const response = await fetch(`${ADMIN_API}?endpoint=${endpoint}&id=${id}`, {
        method: 'DELETE',
        headers: { 'X-Admin-Token': token! }
      })

      if (response.ok) {
        loadData()
      }
    } catch (error) {
      console.error('Failed to delete:', error)
    }
  }

  const handleSave = async (data: any) => {
    try {
      const endpoint = activeTab === 'products' ? 'products' : 'categories'
      const method = editingItem ? 'PUT' : 'POST'
      
      const payload = editingItem ? { ...data, id: editingItem.id } : data

      const response = await fetch(`${ADMIN_API}?endpoint=${endpoint}`, {
        method,
        headers: {
          'X-Admin-Token': token!,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      if (response.ok) {
        setShowModal(false)
        setEditingItem(null)
        loadData()
      }
    } catch (error) {
      console.error('Failed to save:', error)
    }
  }

  const openModal = (item?: any) => {
    setEditingItem(item || null)
    setShowModal(true)
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
      <AdminHeader email={email} onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <AdminStats stats={stats} />

        <div className="flex gap-4 mb-6 flex-wrap">
          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
              activeTab === 'products'
                ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg'
                : 'bg-white text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Package className="w-5 h-5" />
            Товары ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
              activeTab === 'categories'
                ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg'
                : 'bg-white text-slate-600 hover:bg-slate-100'
            }`}
          >
            <FolderOpen className="w-5 h-5" />
            Категории ({categories.length})
          </button>
          <button
            onClick={() => navigate('/admin/clear-data')}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all bg-red-50 text-red-600 hover:bg-red-100 ml-auto"
          >
            <AlertTriangle className="w-5 h-5" />
            Очистить данные
          </button>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-black text-slate-800">
            {activeTab === 'products' ? 'Управление товарами' : 'Управление категориями'}
          </h2>
          <button
            onClick={() => openModal()}
            className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white font-bold px-6 py-3 rounded-xl transition-all active:scale-95 shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Добавить
          </button>
        </div>

        {activeTab === 'products' ? (
          <AdminProductsList
            products={products}
            onEdit={openModal}
            onDelete={(id) => handleDelete('product', id)}
          />
        ) : (
          <AdminCategoriesList
            categories={categories}
            onEdit={openModal}
            onDelete={(id) => handleDelete('category', id)}
          />
        )}
      </main>

      {showModal && (
        <Modal
          type={activeTab}
          item={editingItem}
          categories={categories}
          onSave={handleSave}
          onClose={() => {
            setShowModal(false)
            setEditingItem(null)
          }}
        />
      )}
    </div>
  )
}

function Modal({
  type,
  item,
  categories,
  onSave,
  onClose
}: {
  type: 'products' | 'categories'
  item: any
  categories: Category[]
  onSave: (data: any) => void
  onClose: () => void
}) {
  const [formData, setFormData] = useState(
    item || (type === 'products'
      ? { name: '', price: 0, rating: 4.5, reviews_count: 0, image_url: '', category_id: '', description: '', stock: 10 }
      : { slug: '', name: '', image_url: '' })
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <h2 className="text-3xl font-black mb-6 bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
          {item ? 'Редактировать' : 'Добавить'} {type === 'products' ? 'товар' : 'категорию'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {type === 'categories' ? (
            <>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Slug (URL)</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-violet-500 transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Название</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Название</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-violet-500 transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Описание</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-violet-500 transition-all min-h-[100px]"
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Рейтинг</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-violet-500 transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Отзывов</label>
                  <input
                    type="number"
                    value={formData.reviews_count}
                    onChange={(e) => setFormData({ ...formData, reviews_count: Number(e.target.value) })}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-violet-500 transition-all"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Категория</label>
                <select
                  value={formData.category_id}
                  onChange={(e) => setFormData({ ...formData, category_id: Number(e.target.value) })}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-violet-500 transition-all"
                  required
                >
                  <option value="">Выберите категорию</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
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
            </>
          )}

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
              className="flex-1 px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white font-bold rounded-xl transition-all"
            >
              {item ? 'Сохранить' : 'Добавить'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
