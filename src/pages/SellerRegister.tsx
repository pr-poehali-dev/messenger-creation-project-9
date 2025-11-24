import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Store, Mail, Lock, Phone, Sparkles } from 'lucide-react'

const SELLER_API = 'https://functions.poehali.dev/dc1ea738-7e4f-4794-ae7f-88de590113bd'

export default function SellerRegister() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    shop_name: '',
    phone: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch(`${SELLER_API}?endpoint=register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Ошибка регистрации')
      }

      localStorage.setItem('sellerToken', data.token)
      localStorage.setItem('sellerData', JSON.stringify(data.seller))
      navigate('/seller/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка регистрации')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-400 to-fuchsia-400 rounded-2xl blur-xl"></div>
              <div className="relative bg-gradient-to-br from-violet-600 to-fuchsia-600 p-3 rounded-2xl">
                <Store className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-black text-white">Peeky</h1>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Регистрация продавца</h2>
          <p className="text-violet-200">Создайте свой магазин на маркетплейсе</p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="block text-white font-semibold mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-300 w-5 h-5" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 bg-white/20 border-2 border-white/30 rounded-2xl text-white placeholder-violet-200 focus:outline-none focus:border-violet-400 focus:bg-white/30 transition-all"
                  placeholder="seller@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">Пароль</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-300 w-5 h-5" />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 bg-white/20 border-2 border-white/30 rounded-2xl text-white placeholder-violet-200 focus:outline-none focus:border-violet-400 focus:bg-white/30 transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">Название магазина</label>
              <div className="relative">
                <Store className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-300 w-5 h-5" />
                <input
                  type="text"
                  value={formData.shop_name}
                  onChange={(e) => setFormData({ ...formData, shop_name: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 bg-white/20 border-2 border-white/30 rounded-2xl text-white placeholder-violet-200 focus:outline-none focus:border-violet-400 focus:bg-white/30 transition-all"
                  placeholder="Мой магазин"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">Телефон</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-300 w-5 h-5" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 bg-white/20 border-2 border-white/30 rounded-2xl text-white placeholder-violet-200 focus:outline-none focus:border-violet-400 focus:bg-white/30 transition-all"
                  placeholder="+7 (999) 123-45-67"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/50 text-white px-4 py-3 rounded-2xl">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white font-bold py-4 rounded-2xl transition-all hover:shadow-2xl hover:shadow-violet-500/50 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Регистрация...' : 'Зарегистрироваться'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-violet-200">
              Уже есть аккаунт?{' '}
              <Link to="/seller/login" className="text-white font-bold hover:underline">
                Войти
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}