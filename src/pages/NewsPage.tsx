import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, User, ArrowRight } from 'lucide-react'

interface News {
  id: number
  title: string
  slug: string
  content: string
  image_url: string
  author: string
  published_at: string
}

export default function NewsPage() {
  const [news, setNews] = useState<News[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
    loadNews()
  }, [])

  const loadNews = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/44d12235-d9dd-4919-b825-dc7d8db22826')
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getExcerpt = (content: string, maxLength: number = 200) => {
    if (content.length <= maxLength) return content
    return content.slice(0, maxLength) + '...'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-violet-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-semibold">Загрузка новостей...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-4xl font-black bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
            Новости
          </h1>
          <p className="text-slate-600 mt-2">Последние обновления и события</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        {news.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📰</div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Пока нет новостей</h2>
            <p className="text-slate-600">Скоро здесь появятся интересные материалы</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item) => (
              <Link
                key={item.id}
                to={`/news/${item.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                {item.image_url && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                )}

                <div className="p-6">
                  <h2 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-violet-600 transition-colors line-clamp-2">
                    {item.title}
                  </h2>

                  <p className="text-slate-600 mb-4 line-clamp-3">
                    {getExcerpt(item.content)}
                  </p>

                  <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{item.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(item.published_at)}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-violet-600 font-semibold group-hover:gap-4 transition-all">
                    <span>Читать далее</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
