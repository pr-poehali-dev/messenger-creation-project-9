import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Edit, Trash2, Newspaper } from 'lucide-react'

const NEWS_API = 'https://functions.poehali.dev/44d12235-d9dd-4919-b825-dc7d8db22826'

interface News {
  id: number
  title: string
  slug: string
  content: string
  image_url: string
  author: string
  published_at: string
  is_published: boolean
}

export default function AdminNewsPage() {
  const navigate = useNavigate()
  const [news, setNews] = useState<News[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingNews, setEditingNews] = useState<News | null>(null)

  const adminKey = localStorage.getItem('adminToken')
  const email = localStorage.getItem('adminEmail')

  useEffect(() => {
    if (!adminKey) {
      navigate('/admin')
      return
    }
    loadNews()
  }, [adminKey, navigate])

  const loadNews = async () => {
    setLoading(true)
    try {
      const response = await fetch(NEWS_API)
      if (response.ok) {
        const data = await response.json()
        setNews(data)
      }
    } catch (error) {
      console.error('Failed to load news:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminEmail')
    navigate('/admin')
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Удалить эту новость?')) return

    try {
      const response = await fetch(`${NEWS_API}?id=${id}`, {
        method: 'DELETE',
        headers: { 'X-Admin-Key': adminKey! }
      })

      if (response.ok) {
        loadNews()
      }
    } catch (error) {
      console.error('Failed to delete:', error)
    }
  }

  const handleSave = async (data: any) => {
    try {
      const method = editingNews ? 'PUT' : 'POST'
      const payload = editingNews ? { ...data, id: editingNews.id } : data

      const response = await fetch(NEWS_API, {
        method,
        headers: {
          'X-Admin-Key': adminKey!,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      if (response.ok) {
        setShowModal(false)
        setEditingNews(null)
        loadNews()
      }
    } catch (error) {
      console.error('Failed to save:', error)
    }
  }

  const openModal = (item?: News) => {
    setEditingNews(item || null)
    setShowModal(true)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
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
      <header className="bg-white/80 backdrop-blur-sm shadow-lg sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-2xl">
              <Newspaper className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                Админ-панель новостей
              </h1>
              {email && <p className="text-sm text-slate-600">{email}</p>}
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-colors"
            >
              Маркетплейс
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 font-semibold rounded-xl transition-colors"
            >
              Выйти
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-black text-slate-800">
            Управление новостями ({news.length})
          </h2>
          <button
            onClick={() => openModal()}
            className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white font-bold px-6 py-3 rounded-xl transition-all active:scale-95 shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Добавить новость
          </button>
        </div>

        {news.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-lg">
            <div className="text-6xl mb-4">📰</div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">Нет новостей</h3>
            <p className="text-slate-600 mb-6">Создайте первую новость</p>
            <button
              onClick={() => openModal()}
              className="px-6 py-3 bg-violet-600 text-white rounded-xl font-semibold hover:bg-violet-700 transition-colors"
            >
              Добавить новость
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                {item.image_url && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full ${
                        item.is_published
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {item.is_published ? 'Опубликовано' : 'Черновик'}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-800 mb-2 line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-600 mb-4 line-clamp-3">
                    {item.content}
                  </p>

                  <div className="text-xs text-slate-500 mb-4">
                    {formatDate(item.published_at)}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => openModal(item)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-violet-50 hover:bg-violet-100 text-violet-600 font-semibold rounded-xl transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                      Редактировать
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {showModal && (
        <NewsModal
          news={editingNews}
          onSave={handleSave}
          onClose={() => {
            setShowModal(false)
            setEditingNews(null)
          }}
        />
      )}
    </div>
  )
}

function NewsModal({
  news,
  onSave,
  onClose
}: {
  news: News | null
  onSave: (data: any) => void
  onClose: () => void
}) {
  const [formData, setFormData] = useState(
    news || {
      title: '',
      slug: '',
      content: '',
      image_url: '',
      author: 'Admin',
      is_published: true
    }
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-zа-яё0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: news ? formData.slug : generateSlug(title)
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <h2 className="text-3xl font-black mb-6 bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
          {news ? 'Редактировать новость' : 'Добавить новость'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Заголовок
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-violet-500 transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Slug (URL)
            </label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-violet-500 transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Содержание
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-violet-500 transition-all min-h-[200px]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              URL изображения
            </label>
            <input
              type="url"
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-violet-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Автор
            </label>
            <input
              type="text"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-violet-500 transition-all"
              required
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="is_published"
              checked={formData.is_published}
              onChange={(e) =>
                setFormData({ ...formData, is_published: e.target.checked })
              }
              className="w-5 h-5 text-violet-600 border-2 border-slate-200 rounded focus:ring-violet-500"
            />
            <label htmlFor="is_published" className="text-sm font-semibold text-slate-700">
              Опубликовать
            </label>
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
              className="flex-1 px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white font-bold rounded-xl transition-all"
            >
              {news ? 'Сохранить' : 'Добавить'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
