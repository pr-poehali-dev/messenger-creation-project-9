import { DollarSign } from 'lucide-react'

interface EarningsMonth {
  month: string
  amount: number
  images: number
}

interface Stats {
  totalEarnings: number
  thisMonth: number
  totalImages: number
  activeImages: number
  totalViews: number
  totalDownloads: number
}

interface EarningsTabProps {
  stats: Stats
  earningsHistory: EarningsMonth[]
}

export default function EarningsTab({ stats, earningsHistory }: EarningsTabProps) {
  return (
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
  )
}
