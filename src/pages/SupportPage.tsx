import { Link } from 'react-router-dom'
import { Headphones, Mail, MessageCircle, Phone } from 'lucide-react'
import { useState } from 'react'

export default function SupportPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    orderNumber: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Ваше обращение принято! Мы свяжемся с вами в течение 24 часов.')
    setFormData({ name: '', email: '', orderNumber: '', subject: '', message: '' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-violet-600 hover:text-violet-700 mb-8 font-semibold">
          ← Вернуться на главную
        </Link>

        <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12">
          <div className="flex items-center gap-3 mb-6">
            <Headphones className="w-10 h-10 text-violet-600" />
            <h1 className="text-4xl font-black bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
              Служба поддержки
            </h1>
          </div>

          <p className="text-lg text-slate-700 leading-relaxed mb-8">
            Мы работаем круглосуточно, чтобы помочь вам решить любые вопросы по заказам и покупкам.
          </p>

          <div className="grid sm:grid-cols-3 gap-6 mb-8">
            <div className="bg-violet-50 rounded-2xl p-6 text-center">
              <MessageCircle className="w-8 h-8 text-violet-600 mx-auto mb-3" />
              <h3 className="font-black mb-2">Онлайн-чат</h3>
              <p className="text-sm text-slate-600 mb-3">Быстрый ответ в течение 5 минут</p>
              <button className="bg-violet-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-violet-700 transition-colors">
                Открыть чат
              </button>
            </div>

            <div className="bg-fuchsia-50 rounded-2xl p-6 text-center">
              <Phone className="w-8 h-8 text-fuchsia-600 mx-auto mb-3" />
              <h3 className="font-black mb-2">Телефон</h3>
              <a href="tel:+78001234567" className="text-fuchsia-600 hover:underline font-bold block mb-1">
                8 (800) 123-45-67
              </a>
              <p className="text-sm text-slate-600">24/7 бесплатно</p>
            </div>

            <div className="bg-purple-50 rounded-2xl p-6 text-center">
              <Mail className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-black mb-2">Email</h3>
              <a href="mailto:support@peeky.ru" className="text-purple-600 hover:underline block mb-1">
                support@peeky.ru
              </a>
              <p className="text-sm text-slate-600">Ответ в течение 24 часов</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-violet-50 to-fuchsia-50 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-black mb-4">Форма обращения</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
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
              </div>

              <div>
                <label className="block font-bold mb-2">Номер заказа (если есть)</label>
                <input
                  type="text"
                  value={formData.orderNumber}
                  onChange={(e) => setFormData({...formData, orderNumber: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-violet-600 outline-none transition-colors"
                  placeholder="PKY-123456"
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
                  <option value="order">Вопрос по заказу</option>
                  <option value="delivery">Доставка</option>
                  <option value="payment">Оплата</option>
                  <option value="return">Возврат/обмен</option>
                  <option value="product">Вопрос о товаре</option>
                  <option value="account">Личный кабинет</option>
                  <option value="technical">Технические проблемы</option>
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
                  placeholder="Опишите вашу проблему или вопрос подробно..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-black py-4 rounded-xl hover:from-violet-700 hover:to-fuchsia-700 transition-all hover:shadow-lg"
              >
                Отправить обращение
              </button>
            </form>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-2xl p-6">
              <h3 className="font-black text-lg mb-3">Популярные вопросы</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/faq" className="text-violet-600 hover:underline">
                    → Как отследить заказ?
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="text-violet-600 hover:underline">
                    → Как вернуть товар?
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="text-violet-600 hover:underline">
                    → Способы оплаты
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="text-violet-600 hover:underline">
                    → Сроки доставки
                  </Link>
                </li>
              </ul>
            </div>

            <div className="bg-green-50 rounded-2xl p-6">
              <h3 className="font-black text-lg mb-3">Среднее время ответа</h3>
              <ul className="space-y-3">
                <li className="flex items-center justify-between">
                  <span className="text-slate-700">Онлайн-чат:</span>
                  <span className="font-bold text-green-600">5 минут</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-slate-700">Телефон:</span>
                  <span className="font-bold text-green-600">1 минута</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-slate-700">Email:</span>
                  <span className="font-bold text-green-600">24 часа</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
