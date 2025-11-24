import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, Mail, Phone, MapPin, LogOut, Edit2, Save, X, ShoppingBag, Sparkles } from 'lucide-react'
import { useCustomerAuth } from '../context/CustomerAuthContext'

export default function CustomerProfile() {
  const navigate = useNavigate()
  const { customer, logout, updateProfile } = useCustomerAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    full_name: customer?.full_name || '',
    phone: customer?.phone || '',
    address: customer?.address || '',
    city: customer?.city || ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  if (!customer) {
    navigate('/login')
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)
    setLoading(true)

    try {
      await updateProfile(formData)
      setSuccess(true)
      setIsEditing(false)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err: any) {
      setError(err.message || 'Ошибка обновления')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleCancel = () => {
    setFormData({
      full_name: customer?.full_name || '',
      phone: customer?.phone || '',
      address: customer?.address || '',
      city: customer?.city || ''
    })
    setIsEditing(false)
    setError('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-slate-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-2xl blur-sm"></div>
                <div className="relative bg-gradient-to-br from-violet-600 to-fuchsia-600 p-2 rounded-2xl">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
              </div>
              <span className="text-2xl font-black bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
                Peeky
              </span>
            </Link>
            
            <div className="flex items-center gap-3">
              <Link
                to="/cart"
                className="flex items-center gap-2 px-4 py-2 hover:bg-slate-100 rounded-xl transition-all"
              >
                <ShoppingBag className="w-5 h-5 text-slate-700" />
                <span className="font-semibold text-slate-700">Корзина</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl font-semibold transition-all"
              >
                <LogOut className="w-5 h-5" />
                Выйти
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 font-semibold">
            Профиль успешно обновлен!
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600">
            {error}
          </div>
        )}

        <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-200">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gradient-to-br from-violet-100 to-fuchsia-100 rounded-2xl flex items-center justify-center">
                <User className="w-10 h-10 text-violet-600" />
              </div>
              <div>
                <h1 className="text-3xl font-black bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                  Мой профиль
                </h1>
                <p className="text-slate-500">Управление личными данными</p>
              </div>
            </div>

            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-violet-500/50 transition-all"
              >
                <Edit2 className="w-5 h-5" />
                Редактировать
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Полное имя
                </label>
                {isEditing ? (
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition-all"
                      required
                    />
                  </div>
                ) : (
                  <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                    <User className="w-5 h-5 text-slate-400" />
                    <span className="font-semibold text-slate-800">{customer.full_name}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Email
                </label>
                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                  <Mail className="w-5 h-5 text-slate-400" />
                  <span className="font-semibold text-slate-800">{customer.email}</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">Email нельзя изменить</p>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Телефон
                </label>
                {isEditing ? (
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition-all"
                      placeholder="+7 999 123 45 67"
                    />
                  </div>
                ) : (
                  <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                    <Phone className="w-5 h-5 text-slate-400" />
                    <span className="font-semibold text-slate-800">
                      {customer.phone || 'Не указан'}
                    </span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Город
                </label>
                {isEditing ? (
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition-all"
                      placeholder="Москва"
                    />
                  </div>
                ) : (
                  <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                    <MapPin className="w-5 h-5 text-slate-400" />
                    <span className="font-semibold text-slate-800">
                      {customer.city || 'Не указан'}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Адрес доставки
              </label>
              {isEditing ? (
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition-all resize-none"
                  rows={3}
                  placeholder="Улица, дом, квартира"
                />
              ) : (
                <div className="p-4 bg-slate-50 rounded-xl">
                  <span className="font-semibold text-slate-800">
                    {customer.address || 'Не указан'}
                  </span>
                </div>
              )}
            </div>

            {isEditing && (
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-violet-500/50 transition-all disabled:opacity-50"
                >
                  <Save className="w-5 h-5" />
                  {loading ? 'Сохранение...' : 'Сохранить изменения'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex items-center justify-center gap-2 px-6 py-4 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-all"
                >
                  <X className="w-5 h-5" />
                  Отмена
                </button>
              </div>
            )}
          </form>

          <div className="mt-8 pt-8 border-t border-slate-200">
            <div className="text-sm text-slate-500">
              <p>Аккаунт создан: {new Date(customer.created_at).toLocaleDateString('ru-RU')}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}