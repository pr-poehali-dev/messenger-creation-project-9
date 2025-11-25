import { Link } from 'react-router-dom'
import { MessageCircle, Mail, Phone, Clock } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function SellerSupportPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Ваше сообщение отправлено! Мы свяжемся с вами в ближайшее время.')
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-violet-600 hover:text-violet-700 mb-8 font-semibold">
          ← Вернуться на главную
        </Link>

        <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12">
          <div className="flex items-center gap-3 mb-6">
            <MessageCircle className="w-10 h-10 text-violet-600" />
            <h1 className="text-4xl font-black bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
              Поддержка продавцов
            </h1>
          </div>

          <p className="text-lg text-slate-700 leading-relaxed mb-8">
            Наша команда готова помочь вам с любыми вопросами, связанными с продажами на платформе.
          </p>

          <div className="grid sm:grid-cols-3 gap-6 mb-8">
            <div className="bg-violet-50 rounded-2xl p-6 text-center">
              <Mail className="w-8 h-8 text-violet-600 mx-auto mb-3" />
              <h3 className="font-black mb-2">Email</h3>
              <a href="mailto:seller@peeky.ru" className="text-violet-600 hover:underline">
                seller@peeky.ru
              </a>
              <p className="text-sm text-slate-600 mt-2">Ответ в течение 24 часов</p>
            </div>

            <div className="bg-fuchsia-50 rounded-2xl p-6 text-center">
              <Phone className="w-8 h-8 text-fuchsia-600 mx-auto mb-3" />
              <h3 className="font-black mb-2">Телефон</h3>
              <a href="tel:+78001234567" className="text-fuchsia-600 hover:underline font-bold">
                8 (800) 123-45-67
              </a>
              <p className="text-sm text-slate-600 mt-2">Бесплатно по России</p>
            </div>

            <div className="bg-purple-50 rounded-2xl p-6 text-center">
              <Clock className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-black mb-2">Режим работы</h3>
              <p className="text-purple-600 font-bold">Пн-Пт: 9:00-21:00</p>
              <p className="text-sm text-slate-600 mt-2">Сб-Вс: 10:00-18:00</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-violet-50 to-fuchsia-50 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-black mb-4">Форма обращения</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-bold mb-2">Ваше имя *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-violet-600 outline-none transition-colors"
                  placeholder="Иван Иванов"
                />
              </div>

              <div>
                <label className="block font-bold mb-2">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-violet-600 outline-none transition-colors"
                  placeholder="ivan@example.com"
                />
              </div>

              <div>
                <label className="block font-bold mb-2">Тема обращения *</label>
                <select
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-violet-600 outline-none transition-colors"
                >
                  <option value="">Выберите тему</option>
                  <option value="registration">Регистрация и документы</option>
                  <option value="payments">Выплаты и финансы</option>
                  <option value="products">Управление товарами</option>
                  <option value="delivery">Доставка</option>
                  <option value="returns">Возвраты</option>
                  <option value="technical">Технические вопросы</option>
                  <option value="other">Другое</option>
                </select>
              </div>

              <div>
                <label className="block font-bold mb-2">Сообщение *</label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-violet-600 outline-none transition-colors resize-none"
                  placeholder="Опишите ваш вопрос подробно..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-black py-4 rounded-xl hover:from-violet-700 hover:to-fuchsia-700 transition-all hover:shadow-lg"
              >
                Отправить сообщение
              </button>
            </form>
          </div>

          <div className="bg-blue-50 rounded-2xl p-6">
            <h3 className="font-black text-lg mb-3">Полезные ресурсы</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/seller-faq" className="text-violet-600 hover:underline font-semibold">
                  → FAQ для продавцов
                </Link>
              </li>
              <li>
                <Link to="/seller-conditions" className="text-violet-600 hover:underline font-semibold">
                  → Условия работы
                </Link>
              </li>
              <li>
                <a href="#" className="text-violet-600 hover:underline font-semibold">
                  → База знаний
                </a>
              </li>
              <li>
                <a href="#" className="text-violet-600 hover:underline font-semibold">
                  → Видеоуроки
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}