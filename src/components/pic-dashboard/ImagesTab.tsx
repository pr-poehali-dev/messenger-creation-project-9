import { Eye, Download, ImageIcon, Trash2, Plus } from 'lucide-react'

interface Image {
  id: number
  title: string
  views: number
  downloads: number
  earnings: number
  price: number
  status: string
}

interface ImagesTabProps {
  recentImages: Image[]
  setActiveTab: (tab: 'overview' | 'images' | 'earnings' | 'upload') => void
}

export default function ImagesTab({ recentImages, setActiveTab }: ImagesTabProps) {
  return (
    <div className="bg-white rounded-2xl p-6 border-2 border-slate-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-black text-slate-800 mb-1">
            Все изображения
          </h2>
          <p className="text-slate-600">
            Управляйте своим портфолио
          </p>
        </div>
        <button
          onClick={() => setActiveTab('upload')}
          className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:shadow-lg transition-all active:scale-95"
        >
          <Plus className="w-5 h-5" />
          Загрузить новые
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recentImages.map((image) => (
          <div
            key={image.id}
            className="group relative bg-slate-50 rounded-2xl overflow-hidden hover:shadow-xl transition-all"
          >
            <div className="aspect-square bg-gradient-to-br from-indigo-200 to-purple-300 flex items-center justify-center">
              <ImageIcon className="w-16 h-16 text-indigo-600" />
            </div>
            
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-slate-800">{image.title}</h3>
                {image.status === 'active' && (
                  <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded">
                    Активно
                  </span>
                )}
                {image.status === 'review' && (
                  <span className="text-xs font-bold text-orange-600 bg-orange-100 px-2 py-1 rounded">
                    Модерация
                  </span>
                )}
              </div>
              
              <div className="flex items-center justify-between text-sm text-slate-600 mb-3">
                <span className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {image.views}
                </span>
                <span className="flex items-center gap-1">
                  <Download className="w-4 h-4" />
                  {image.downloads}
                </span>
                <span className="font-bold text-indigo-600">
                  ₽{image.price}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button className="flex-1 px-4 py-2 bg-indigo-100 text-indigo-600 rounded-lg font-bold hover:bg-indigo-200 transition">
                  Редактировать
                </button>
                <button className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
