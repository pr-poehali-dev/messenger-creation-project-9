import { Link } from 'react-router-dom'
import { Sparkles, ShoppingCart, Users, TrendingUp, Award } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-violet-600 hover:text-violet-700 mb-8 font-semibold">
          ← Вернуться на главную
        </Link>

        <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-10 h-10 text-violet-600" />
            <h1 className="text-4xl font-black bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
              О нас
            </h1>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              Peeky — современный маркетплейс, созданный для удобных и выгодных покупок. Мы объединяем тысячи продавцов и покупателей, предлагая широкий ассортимент товаров по лучшим ценам.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-8">
              <div className="bg-violet-50 rounded-2xl p-6">
                <ShoppingCart className="w-8 h-8 text-violet-600 mb-3" />
                <h3 className="font-black text-xl mb-2">Широкий выбор</h3>
                <p className="text-slate-600">Тысячи товаров из разных категорий от проверенных продавцов</p>
              </div>

              <div className="bg-fuchsia-50 rounded-2xl p-6">
                <Users className="w-8 h-8 text-fuchsia-600 mb-3" />
                <h3 className="font-black text-xl mb-2">Надежность</h3>
                <p className="text-slate-600">Защита покупателей и гарантия возврата средств</p>
              </div>

              <div className="bg-purple-50 rounded-2xl p-6">
                <TrendingUp className="w-8 h-8 text-purple-600 mb-3" />
                <h3 className="font-black text-xl mb-2">Выгодные цены</h3>
                <p className="text-slate-600">Конкурентные цены и регулярные акции</p>
              </div>

              <div className="bg-pink-50 rounded-2xl p-6">
                <Award className="w-8 h-8 text-pink-600 mb-3" />
                <h3 className="font-black text-xl mb-2">Качество</h3>
                <p className="text-slate-600">Проверка продавцов и контроль качества товаров</p>
              </div>
            </div>

            <h2 className="text-2xl font-black mt-8 mb-4">Наша миссия</h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              Мы стремимся сделать онлайн-шопинг простым, безопасным и приятным для каждого пользователя. Наша цель — создать экосистему, где покупатели находят нужные товары по лучшим ценам, а продавцы получают удобную платформу для развития своего бизнеса.
            </p>

            <h2 className="text-2xl font-black mt-8 mb-4">Наши преимущества</h2>
            <ul className="space-y-3 text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-violet-600 font-bold">•</span>
                <span>Быстрая доставка по всей России</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-violet-600 font-bold">•</span>
                <span>Удобные способы оплаты</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-violet-600 font-bold">•</span>
                <span>Круглосуточная служба поддержки</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-violet-600 font-bold">•</span>
                <span>Программа лояльности и бонусы</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-violet-600 font-bold">•</span>
                <span>Простой возврат и обмен товаров</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
