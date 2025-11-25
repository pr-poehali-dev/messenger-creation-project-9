import { Package, FolderOpen, ShoppingCart, Users, Sparkles, TrendingUp } from 'lucide-react'

interface AdminStatsProps {
  stats: {
    products: number
    categories: number
    orders: number
    customers: number
    sellers: number
  }
}

export default function AdminStats({ stats }: AdminStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
        <div className="flex items-center justify-between mb-3">
          <div className="p-3 bg-violet-100 rounded-xl">
            <Package className="w-6 h-6 text-violet-600" />
          </div>
          <TrendingUp className="w-5 h-5 text-green-500" />
        </div>
        <p className="text-sm text-slate-600 font-medium mb-1">Товаров</p>
        <p className="text-3xl font-black text-slate-900">{stats.products}</p>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
        <div className="flex items-center justify-between mb-3">
          <div className="p-3 bg-fuchsia-100 rounded-xl">
            <FolderOpen className="w-6 h-6 text-fuchsia-600" />
          </div>
          <TrendingUp className="w-5 h-5 text-green-500" />
        </div>
        <p className="text-sm text-slate-600 font-medium mb-1">Категорий</p>
        <p className="text-3xl font-black text-slate-900">{stats.categories}</p>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
        <div className="flex items-center justify-between mb-3">
          <div className="p-3 bg-blue-100 rounded-xl">
            <ShoppingCart className="w-6 h-6 text-blue-600" />
          </div>
          <TrendingUp className="w-5 h-5 text-green-500" />
        </div>
        <p className="text-sm text-slate-600 font-medium mb-1">Заказов</p>
        <p className="text-3xl font-black text-slate-900">{stats.orders}</p>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
        <div className="flex items-center justify-between mb-3">
          <div className="p-3 bg-orange-100 rounded-xl">
            <Users className="w-6 h-6 text-orange-600" />
          </div>
          <TrendingUp className="w-5 h-5 text-green-500" />
        </div>
        <p className="text-sm text-slate-600 font-medium mb-1">Покупателей</p>
        <p className="text-3xl font-black text-slate-900">{stats.customers}</p>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
        <div className="flex items-center justify-between mb-3">
          <div className="p-3 bg-green-100 rounded-xl">
            <Sparkles className="w-6 h-6 text-green-600" />
          </div>
          <TrendingUp className="w-5 h-5 text-green-500" />
        </div>
        <p className="text-sm text-slate-600 font-medium mb-1">Продавцов</p>
        <p className="text-3xl font-black text-slate-900">{stats.sellers}</p>
      </div>
    </div>
  )
}
