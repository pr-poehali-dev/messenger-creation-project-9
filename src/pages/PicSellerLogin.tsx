import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Camera, Mail, Lock, ArrowRight, Image, TrendingUp, DollarSign } from 'lucide-react'

export default function PicSellerLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Login:', formData)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Stats & Info */}
        <div className="hidden lg:block">
          <Link to="/pic" className="flex items-center gap-2 mb-8">
            <Camera className="w-10 h-10 text-indigo-600" />
            <span className="text-3xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Pic.Peeky
            </span>
          </Link>

          <h1 className="text-5xl font-black text-slate-800 mb-6 leading-tight">
            С возвращением! 👋
          </h1>
          
          <p className="text-xl text-slate-600 mb-12">
            Войдите чтобы управлять своим портфолио и отслеживать продажи
          </p>

          <div className="grid grid-cols-1 gap-6">
            <div className="bg-white rounded-2xl p-6 border-2 border-slate-100">
              <div className="flex items-center gap-4 mb-3">
                <div className="p-3 bg-green-100 rounded-xl">
                  <DollarSign className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <div className="text-3xl font-black text-slate-800">₽127,500</div>
                  <div className="text-sm text-slate-500">средний доход за 3 месяца</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border-2 border-slate-100">
              <div className="flex items-center gap-4 mb-3">
                <div className="p-3 bg-purple-100 rounded-xl">
                  <Image className="w-8 h-8 text-purple-600" />
                </div>
                <div>
                  <div className="text-3xl font-black text-slate-800">2,340</div>
                  <div className="text-sm text-slate-500">изображений загружено сегодня</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border-2 border-slate-100">
              <div className="flex items-center gap-4 mb-3">
                <div className="p-3 bg-indigo-100 rounded-xl">
                  <TrendingUp className="w-8 h-8 text-indigo-600" />
                </div>
                <div>
                  <div className="text-3xl font-black text-slate-800">+24%</div>
                  <div className="text-sm text-slate-500">рост продаж в этом месяце</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            <div className="lg:hidden mb-8 text-center">
              <Link to="/pic" className="inline-flex items-center gap-2 mb-4">
                <Camera className="w-8 h-8 text-indigo-600" />
                <span className="text-2xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Pic.Peeky
                </span>
              </Link>
            </div>

            <h2 className="text-3xl font-black text-slate-800 mb-2">
              Вход для продавцов
            </h2>
            <p className="text-slate-600 mb-8">
              Войдите в свой аккаунт
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-800 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ivan@example.com"
                    className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:border-indigo-600 outline-none transition"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-800 mb-2">
                  Пароль
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Введите пароль"
                    className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:border-indigo-600 outline-none transition"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={formData.remember}
                    onChange={(e) => setFormData({ ...formData, remember: e.target.checked })}
                    className="w-4 h-4 accent-indigo-600"
                  />
                  <label htmlFor="remember" className="text-sm text-slate-600">
                    Запомнить меня
                  </label>
                </div>
                <a href="#" className="text-sm text-indigo-600 font-bold hover:underline">
                  Забыли пароль?
                </a>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-indigo-500/50 transition-all active:scale-95"
              >
                Войти в аккаунт
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-slate-600 mb-4">
                Ещё нет аккаунта?{' '}
                <Link to="/pic/register" className="text-indigo-600 font-bold hover:underline">
                  Зарегистрироваться
                </Link>
              </p>
              
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-slate-500">или</span>
                </div>
              </div>

              <Link
                to="/pic"
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-all"
              >
                Узнать больше о продаже фото
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:hidden mt-6 text-center">
            <Link to="/" className="text-slate-600 hover:text-indigo-600 transition">
              ← Вернуться на главную
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
