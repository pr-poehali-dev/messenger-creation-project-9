import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Camera, DollarSign, Eye, TrendingUp, Image as ImageIcon, Settings, LogOut, Home } from 'lucide-react'
import OverviewTab from '@/components/pic-dashboard/OverviewTab'
import ImagesTab from '@/components/pic-dashboard/ImagesTab'
import EarningsTab from '@/components/pic-dashboard/EarningsTab'
import UploadTab from '@/components/pic-dashboard/UploadTab'

export default function PicSellerDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'images' | 'earnings' | 'upload'>('overview')

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
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 text-white mb-8">
          <h1 className="text-3xl md:text-4xl font-black mb-2">
            Добро пожаловать назад! 👋
          </h1>
          <p className="text-indigo-100 text-lg">
            Ваш портфель растёт. Продолжайте создавать прекрасное!
          </p>
        </div>

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

        {activeTab === 'overview' && (
          <OverviewTab 
            recentImages={recentImages} 
            earningsHistory={earningsHistory}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'images' && (
          <ImagesTab 
            recentImages={recentImages}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'earnings' && (
          <EarningsTab 
            stats={stats}
            earningsHistory={earningsHistory}
          />
        )}

        {activeTab === 'upload' && <UploadTab />}
      </div>
    </div>
  )
}
