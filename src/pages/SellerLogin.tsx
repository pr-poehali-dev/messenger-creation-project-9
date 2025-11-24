import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Store, Mail, Lock } from 'lucide-react'

const SELLER_API = 'https://functions.poehali.dev/dc1ea738-7e4f-4794-ae7f-88de590113bd'

export default function SellerLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch(`${SELLER_API}?endpoint=login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Неверный email или пароль')
      }

      localStorage.setItem('sellerToken', data.token)
      localStorage.setItem('sellerData', JSON.stringify(data.seller))
      navigate('/seller/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка входа')
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
          <h2 className="text-2xl font-bold text-white mb-2">Вход для продавцов</h2>
          <p className="text-violet-200">Войдите для управления магазином</p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-white font-semibold mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-300 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/20 border-2 border-white/30 rounded-2xl text-white placeholder-violet-200 focus:outline-none focus:border-violet-400 focus:bg-white/30 transition-all"
                  placeholder="••••••••"
                  required
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
              {loading ? 'Вход...' : 'Войти'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-violet-200">
              Нет аккаунта?{' '}
              <Link to="/seller/register" className="text-white font-bold hover:underline">
                Зарегистрироваться
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}