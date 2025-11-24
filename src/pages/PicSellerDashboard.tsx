import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Camera, Upload, DollarSign, Eye, Download, TrendingUp, Image as ImageIcon, Plus, X, Edit2, Trash2, BarChart3, Settings, LogOut, Home } from 'lucide-react'

export default function PicSellerDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'images' | 'earnings' | 'upload'>('overview')
  const [uploadModalOpen, setUploadModalOpen] = useState(false)

  const stats = {
    totalEarnings: 127500,
    thisMonth: 45200,
    totalImages: 234,
    activeImages: 189,
    totalViews: 45632,
    totalDownloads: 1247,
  }

  const recentImages = [
    { id: 1, title: 'Закат в горах', views: 432, downloads: 23, earnings: 6900, price: 300, status: 'active' },
    { id: 2, title: 'Городской пейзаж', views: 821, downloads: 45, earnings: 13500, price: 300, status: 'active' },
    { id: 3, title: 'Абстракция', views: 234, downloads: 12, earnings: 6000, price: 500, status: 'active' },
    { id: 4, title: 'Природа', views: 567, downloads: 31, earnings: 9300, price: 300, status: 'active' },
    { id: 5, title: 'Портрет', views: 312, downloads: 18, earnings: 9000, price: 500, status: 'review' },
  ]

  const earningsHistory = [
    { month: 'Ноябрь 2024', amount: 45200, images: 23 },
    { month: 'Октябрь 2024', amount: 38900, images: 19 },
    { month: 'Сентябрь 2024', amount: 29100, images: 15 },
    { month: 'Август 2024', amount: 14300, images: 8 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/pic" className="flex items-center gap-2">
            <Camera className="w-8 h-8 text-indigo-600" />
            <span className="text-2xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Pic.Peeky
            </span>
          </Link>
          
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-indigo-600 transition"
            >
              <Home className="w-5 h-5" />
              <span className="hidden md:inline font-medium">На главную</span>
            </Link>
            <button className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-indigo-600 transition">
              <Settings className="w-5 h-5" />
              <span className="hidden md:inline font-medium">Настройки</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-700 transition">
              <LogOut className="w-5 h-5" />
              <span className="hidden md:inline font-medium">Выйти</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 text-white mb-8">
          <h1 className="text-3xl md:text-4xl font-black mb-2">
            Добро пожаловать назад! 👋
          </h1>
          <p className="text-indigo-100 text-lg">
            Ваш портфель растёт. Продолжайте создавать прекрасное!
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 border-2 border-slate-100 hover:border-indigo-200 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-lg">
                +12.5%
              </span>
            </div>
            <div className="text-3xl font-black text-slate-800 mb-1">
              ₽{stats.totalEarnings.toLocaleString()}
            </div>
            <div className="text-sm text-slate-500">Всего заработано</div>
          </div>

          <div className="bg-white rounded-2xl p-6 border-2 border-slate-100 hover:border-purple-200 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-xs font-bold text-purple-600 bg-purple-100 px-2 py-1 rounded-lg">
                Этот месяц
              </span>
            </div>
            <div className="text-3xl font-black text-slate-800 mb-1">
              ₽{stats.thisMonth.toLocaleString()}
            </div>
            <div className="text-sm text-slate-500">Доход за ноябрь</div>
          </div>

          <div className="bg-white rounded-2xl p-6 border-2 border-slate-100 hover:border-blue-200 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <ImageIcon className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded-lg">
                {stats.activeImages} активных
              </span>
            </div>
            <div className="text-3xl font-black text-slate-800 mb-1">
              {stats.totalImages}
            </div>
            <div className="text-sm text-slate-500">Изображений загружено</div>
          </div>

          <div className="bg-white rounded-2xl p-6 border-2 border-slate-100 hover:border-orange-200 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-orange-100 rounded-xl">
                <Eye className="w-6 h-6 text-orange-600" />
              </div>
              <span className="text-xs font-bold text-orange-600 bg-orange-100 px-2 py-1 rounded-lg">
                {stats.totalDownloads} загрузок
              </span>
            </div>
            <div className="text-3xl font-black text-slate-800 mb-1">
              {stats.totalViews.toLocaleString()}
            </div>
            <div className="text-sm text-slate-500">Просмотров</div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white rounded-2xl p-2 mb-8 inline-flex gap-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${
              activeTab === 'overview'
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Обзор
          </button>
          <button
            onClick={() => setActiveTab('images')}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${
              activeTab === 'images'
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Мои изображения
          </button>
          <button
            onClick={() => setActiveTab('earnings')}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${
              activeTab === 'earnings'
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Выплаты
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${
              activeTab === 'upload'
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Загрузить
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
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
        )}

        {/* Images Tab */}
        {activeTab === 'images' && (
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
        )}

        {/* Earnings Tab */}
        {activeTab === 'earnings' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white">
              <div className="flex items-center gap-3 mb-4">
                <DollarSign className="w-12 h-12" />
                <div>
                  <div className="text-sm text-green-100 mb-1">Доступно для вывода</div>
                  <div className="text-4xl font-black">₽{stats.thisMonth.toLocaleString()}</div>
                </div>
              </div>
              <button className="px-6 py-3 bg-white text-green-600 rounded-xl font-bold hover:shadow-lg transition-all active:scale-95">
                Вывести средства
              </button>
            </div>

            <div className="bg-white rounded-2xl p-6 border-2 border-slate-100">
              <h2 className="text-2xl font-black text-slate-800 mb-6">
                История выплат
              </h2>
              <div className="space-y-4">
                {earningsHistory.map((month, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition"
                  >
                    <div>
                      <div className="font-bold text-slate-800 mb-1">{month.month}</div>
                      <div className="text-sm text-slate-500">
                        {month.images} продаж изображений
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black text-slate-800">
                        ₽{month.amount.toLocaleString()}
                      </div>
                      <div className="text-sm text-green-600 font-bold">Выплачено</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Upload Tab */}
        {activeTab === 'upload' && (
          <div className="bg-white rounded-2xl p-6 border-2 border-slate-100">
            <h2 className="text-2xl font-black text-slate-800 mb-6">
              Загрузить новые изображения
            </h2>

            <div className="border-2 border-dashed border-slate-300 rounded-2xl p-12 text-center hover:border-indigo-400 hover:bg-indigo-50/50 transition-all cursor-pointer">
              <Upload className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-800 mb-2">
                Перетащите файлы сюда
              </h3>
              <p className="text-slate-600 mb-4">
                или нажмите для выбора файлов
              </p>
              <p className="text-sm text-slate-500">
                Поддерживаемые форматы: JPG, PNG, WEBP. Минимальное разрешение: 4K
              </p>
            </div>

            <div className="mt-8 space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-800 mb-2">
                  Название изображения
                </label>
                <input
                  type="text"
                  placeholder="Например: Закат в горах"
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-indigo-600 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-800 mb-2">
                  Описание
                </label>
                <textarea
                  placeholder="Опишите ваше изображение для лучшего SEO"
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-indigo-600 outline-none transition resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-2">
                    Категория
                  </label>
                  <select className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-indigo-600 outline-none transition">
                    <option>Природа</option>
                    <option>Город</option>
                    <option>Люди</option>
                    <option>Абстракция</option>
                    <option>Еда</option>
                    <option>Животные</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-2">
                    Цена (₽)
                  </label>
                  <input
                    type="number"
                    placeholder="300"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-indigo-600 outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-800 mb-2">
                  Теги (через запятую)
                </label>
                <input
                  type="text"
                  placeholder="закат, горы, природа, пейзаж"
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-indigo-600 outline-none transition"
                />
              </div>

              <button className="w-full px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-indigo-500/50 transition-all active:scale-95">
                Загрузить изображение
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
