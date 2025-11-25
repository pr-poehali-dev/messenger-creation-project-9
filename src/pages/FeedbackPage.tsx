import { Link } from 'react-router-dom'
import { MessageSquare, Star } from 'lucide-react'
import { useState } from 'react'

export default function FeedbackPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 5,
    category: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Спасибо за ваш отзыв! Мы ценим ваше мнение.')
    setFormData({ name: '', email: '', rating: 5, category: '', message: '' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-violet-600 hover:text-violet-700 mb-8 font-semibold">
          ← Вернуться на главную
        </Link>

        <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12">
          <div className="flex items-center gap-3 mb-6">
            <MessageSquare className="w-10 h-10 text-violet-600" />
            <h1 className="text-4xl font-black bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
              Обратная связь
            </h1>
          </div>

          <p className="text-lg text-slate-700 leading-relaxed mb-8">
            Ваше мнение очень важно для нас! Поделитесь впечатлениями о работе маркетплейса, 
            предложите улучшения или расскажите о проблемах.
          </p>

          <div className="bg-gradient-to-r from-violet-50 to-fuchsia-50 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-black mb-6">Оставить отзыв</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
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
                <label className="block font-bold mb-3">Оцените нашу работу *</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({...formData, rating: star})}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`w-10 h-10 transition-colors ${
                          star <= formData.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-4 text-2xl font-black text-violet-600">
                    {formData.rating}/5
                  </span>
                </div>
              </div>

              <div>
                <label className="block font-bold mb-2">Категория отзыва *</label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-violet-600 outline-none transition-colors"
                >
                  <option value="">Выберите категорию</option>
                  <option value="service">Качество сервиса</option>
                  <option value="delivery">Доставка</option>
                  <option value="products">Ассортимент товаров</option>
                  <option value="interface">Удобство сайта</option>
                  <option value="support">Служба поддержки</option>
                  <option value="prices">Цены</option>
                  <option value="suggestion">Предложение по улучшению</option>
                  <option value="complaint">Жалоба</option>
                  <option value="other">Другое</option>
                </select>
              </div>

              <div>
                <label className="block font-bold mb-2">Ваш отзыв *</label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows={8}
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-violet-600 outline-none transition-colors resize-none"
                  placeholder="Расскажите подробнее о вашем опыте использования Peeky..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-black py-4 rounded-xl hover:from-violet-700 hover:to-fuchsia-700 transition-all hover:shadow-lg"
              >
                Отправить отзыв
              </button>
            </form>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-green-50 rounded-2xl p-6">
              <h3 className="font-black text-lg mb-3">Нам важно каждое мнение</h3>
              <p className="text-slate-700 leading-relaxed">
                Мы внимательно читаем все отзывы и учитываем ваши предложения 
                при развитии платформы. Благодаря вашей обратной связи Peeky становится лучше!
              </p>
            </div>

            <div className="bg-blue-50 rounded-2xl p-6">
              <h3 className="font-black text-lg mb-3">Что дальше?</h3>
              <ul className="space-y-2 text-slate-700">
                <li>✓ Мы рассмотрим ваш отзыв в течение 3 рабочих дней</li>
                <li>✓ При необходимости свяжемся с вами для уточнений</li>
                <li>✓ Лучшие предложения будут реализованы</li>
                <li>✓ За ценные идеи — бонусы на счет!</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
