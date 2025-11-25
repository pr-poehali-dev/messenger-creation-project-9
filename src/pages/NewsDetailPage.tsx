import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Calendar, User, ArrowLeft } from 'lucide-react'

interface News {
  id: number
  title: string
  slug: string
  content: string
  image_url: string
  author: string
  published_at: string
}

export default function NewsDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const [news, setNews] = useState<News | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
    if (slug) {
      loadNews()
    }
  }, [slug])

  const loadNews = async () => {
    try {
      const response = await fetch(
        `https://functions.poehali.dev/44d12235-d9dd-4919-b825-dc7d8db22826?slug=${slug}`
      )
      if (response.ok) {
        const data = await response.json()
        setNews(data)
      } else {
        navigate('/news')
      }
    } catch (error) {
      console.error('Failed to load news:', error)
      navigate('/news')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
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

  if (!news) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Новость не найдена</h2>
          <button
            onClick={() => navigate('/news')}
            className="mt-4 px-6 py-3 bg-violet-600 text-white rounded-xl font-semibold hover:bg-violet-700 transition-colors"
          >
            Вернуться к новостям
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate('/news')}
            className="flex items-center gap-2 text-slate-600 hover:text-violet-600 transition-colors font-semibold"
          >
            <ArrowLeft className="w-5 h-5" />
            Назад к новостям
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <article className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {news.image_url && (
            <div className="relative h-96 overflow-hidden">
              <img
                src={news.image_url}
                alt={news.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
          )}

          <div className="p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-black text-slate-800 mb-6 leading-tight">
              {news.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-slate-600 mb-8 pb-8 border-b-2 border-slate-100">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-violet-600" />
                <span className="font-semibold">{news.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-violet-600" />
                <span>{formatDate(news.published_at)}</span>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <div className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                {news.content}
              </div>
            </div>
          </div>
        </article>

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/news')}
            className="px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-xl font-bold hover:from-violet-700 hover:to-fuchsia-700 transition-all shadow-lg hover:shadow-xl"
          >
            Вернуться к новостям
          </button>
        </div>
      </main>
    </div>
  )
}
