import { Link } from 'react-router-dom'
import { Eye, Download, DollarSign, ImageIcon, Edit2, Trash2, CheckCircle, BarChart3 } from 'lucide-react'
import { Plus } from 'lucide-react'

interface Image {
  id: number
  title: string
  views: number
  downloads: number
  earnings: number
  price: number
  status: string
}

interface EarningsMonth {
  month: string
  amount: number
  images: number
}

interface OverviewTabProps {
  recentImages: Image[]
  earningsHistory: EarningsMonth[]
  setActiveTab: (tab: 'overview' | 'images' | 'earnings' | 'upload') => void
}

export default function OverviewTab({ recentImages, earningsHistory, setActiveTab }: OverviewTabProps) {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl p-6 border-2 border-slate-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black text-slate-800">
            Последние загрузки
          </h2>
          <button
            onClick={() => setActiveTab('upload')}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold hover:shadow-lg transition-all active:scale-95"
          >
            <Plus className="w-5 h-5" />
            Загрузить новые
          </button>
        </div>

        <div className="space-y-4">
          {recentImages.slice(0, 5).map((image) => (
            <div
              key={image.id}
              className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-200 to-purple-300 rounded-lg flex items-center justify-center flex-shrink-0">
                <ImageIcon className="w-8 h-8 text-indigo-600" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-slate-800">{image.title}</h3>
                  {image.status === 'active' && (
                    <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded">
                      Активно
                    </span>
                  )}
                  {image.status === 'review' && (
                    <span className="text-xs font-bold text-orange-600 bg-orange-100 px-2 py-1 rounded">
                      На модерации
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {image.views}
                  </span>
                  <span className="flex items-center gap-1">
                    <Download className="w-4 h-4" />
                    {image.downloads}
                  </span>
                  <span className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    ₽{image.earnings.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="p-2 text-slate-600 hover:bg-slate-200 rounded-lg transition">
                  <Edit2 className="w-5 h-5" />
                </button>
                <button className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl p-6 border-2 border-slate-100">
          <h3 className="text-xl font-black text-slate-800 mb-4 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-indigo-600" />
            Динамика продаж
          </h3>
          <div className="space-y-3">
            {earningsHistory.map((month, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div>
                  <div className="font-bold text-slate-800">{month.month}</div>
                  <div className="text-sm text-slate-500">{month.images} продаж</div>
                </div>
                <div className="text-xl font-black text-indigo-600">
                  ₽{month.amount.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-6 text-white">
          <h3 className="text-2xl font-black mb-4">Советы для роста продаж</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <span className="text-2xl">📸</span>
              <span>Загружайте изображения высокого качества минимум 4K</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-2xl">🏷️</span>
              <span>Используйте детальные теги и описания для SEO</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-2xl">🎨</span>
              <span>Следите за трендами и популярными категориями</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-2xl">💰</span>
              <span>Устанавливайте конкурентные цены для начала</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
