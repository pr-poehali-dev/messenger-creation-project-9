import { User, Mail, Phone, Store } from 'lucide-react'

interface SellerData {
  shop_name: string
  email: string
  phone?: string
  description?: string
  logo_url?: string
  created_at?: string
}

interface ProfileTabProps {
  sellerData: SellerData
}

export default function ProfileTab({ sellerData }: ProfileTabProps) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
      <h2 className="text-2xl font-black text-slate-800 mb-6">Профиль</h2>
      
      <div className="space-y-6">
        <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
          <div className="p-3 bg-violet-100 rounded-xl">
            <Store className="w-6 h-6 text-violet-600" />
          </div>
          <div>
            <p className="text-sm text-slate-500">Название магазина</p>
            <p className="text-lg font-bold text-slate-800">{sellerData.shop_name}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
          <div className="p-3 bg-blue-100 rounded-xl">
            <Mail className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-slate-500">Email</p>
            <p className="text-lg font-bold text-slate-800">{sellerData.email}</p>
          </div>
        </div>

        {sellerData.phone && (
          <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
            <div className="p-3 bg-green-100 rounded-xl">
              <Phone className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Телефон</p>
              <p className="text-lg font-bold text-slate-800">{sellerData.phone}</p>
            </div>
          </div>
        )}

        {sellerData.created_at && (
          <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
            <div className="p-3 bg-purple-100 rounded-xl">
              <User className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Дата регистрации</p>
              <p className="text-lg font-bold text-slate-800">
                {new Date(sellerData.created_at).toLocaleDateString('ru-RU')}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
