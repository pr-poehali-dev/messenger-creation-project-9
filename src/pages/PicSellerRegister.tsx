import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Camera, User, Mail, Lock, ArrowRight, CheckCircle } from 'lucide-react'

export default function PicSellerRegister() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Registration:', formData)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Benefits */}
        <div className="hidden lg:block">
          <Link to="/pic" className="flex items-center gap-2 mb-8">
            <Camera className="w-10 h-10 text-indigo-600" />
            <span className="text-3xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Pic.Peeky
            </span>
          </Link>

          <h1 className="text-5xl font-black text-slate-800 mb-6 leading-tight">
            Начните зарабатывать на своих фото
          </h1>
          
          <p className="text-xl text-slate-600 mb-8">
            Присоединяйтесь к 2,000+ фотографов которые уже монетизируют своё творчество
          </p>

          <div className="space-y-4">
            {[
              'Получайте 70% от каждой продажи',
              'Загружайте неограниченное количество фото',
              'Выплаты 2 раза в месяц',
              'Полная защита авторских прав',
              'Поддержка 24/7',
            ].map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-slate-700 text-lg">{benefit}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl text-white">
            <div className="text-4xl font-black mb-2">₽45,000</div>
            <div className="text-indigo-100">средний доход продавца в месяц</div>
          </div>
        </div>

        {/* Right Side - Registration Form */}
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
              Создать аккаунт продавца
            </h2>
            <p className="text-slate-600 mb-8">
              Заполните форму чтобы начать продавать
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-800 mb-2">
                  Ваше имя
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Иван Петров"
                    className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:border-indigo-600 outline-none transition"
                    required
                  />
                </div>
              </div>

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
                    placeholder="Минимум 8 символов"
                    className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:border-indigo-600 outline-none transition"
                    required
                    minLength={8}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-800 mb-2">
                  Подтвердите пароль
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder="Повторите пароль"
                    className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:border-indigo-600 outline-none transition"
                    required
                    minLength={8}
                  />
                </div>
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  checked={formData.acceptTerms}
                  onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                  className="w-5 h-5 mt-0.5 accent-indigo-600"
                  required
                />
                <label htmlFor="terms" className="text-sm text-slate-600">
                  Я принимаю{' '}
                  <a href="#" className="text-indigo-600 font-bold hover:underline">
                    условия использования
                  </a>{' '}
                  и{' '}
                  <a href="#" className="text-indigo-600 font-bold hover:underline">
                    политику конфиденциальности
                  </a>
                </label>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-indigo-500/50 transition-all active:scale-95"
              >
                Создать аккаунт
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-slate-600">
                Уже есть аккаунт?{' '}
                <Link to="/pic/login" className="text-indigo-600 font-bold hover:underline">
                  Войти
                </Link>
              </p>
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
