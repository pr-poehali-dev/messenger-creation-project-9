import { Package, ShoppingBag, DollarSign } from 'lucide-react'

interface Stats {
  total_products: number
  total_orders: number
  total_revenue: number
}

interface StatsCardsProps {
  stats: Stats
}

export default function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-violet-100 rounded-xl">
            <Package className="w-8 h-8 text-violet-600" />
          </div>
          <div>
            <p className="text-sm text-slate-600">Товаров</p>
            <p className="text-3xl font-black text-slate-800">{stats.total_products}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-100 rounded-xl">
            <ShoppingBag className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-slate-600">Заказов</p>
            <p className="text-3xl font-black text-slate-800">{stats.total_orders}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-green-100 rounded-xl">
            <DollarSign className="w-8 h-8 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-slate-600">Выручка</p>
            <p className="text-3xl font-black text-slate-800">{stats.total_revenue.toLocaleString()} ₽</p>
          </div>
        </div>
      </div>
    </div>
  )
}
