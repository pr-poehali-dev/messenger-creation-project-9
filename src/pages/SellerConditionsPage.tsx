import { Link } from 'react-router-dom'
import { FileText, DollarSign, TrendingUp, Shield } from 'lucide-react'

export default function SellerConditionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-violet-600 hover:text-violet-700 mb-8 font-semibold">
          ← Вернуться на главную
        </Link>

        <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-10 h-10 text-violet-600" />
            <h1 className="text-4xl font-black bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
              Условия для продавцов
            </h1>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-slate-700 leading-relaxed mb-8">
              Peeky предлагает выгодные условия для развития вашего бизнеса. Начните продавать уже сегодня!
            </p>

            <div className="grid gap-6 mb-8">
              <div className="bg-violet-50 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <DollarSign className="w-8 h-8 text-violet-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-black text-xl mb-2">Комиссия всего 5%</h3>
                    <p className="text-slate-700 mb-3">Одна из самых низких комиссий на рынке</p>
                    <ul className="space-y-2 text-slate-600">
                      <li>• Фиксированная ставка 5% от продажи</li>
                      <li>• Без скрытых платежей</li>
                      <li>• Выплаты 2 раза в месяц</li>
                      <li>• Удержание только с реальных продаж</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-fuchsia-50 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <TrendingUp className="w-8 h-8 text-fuchsia-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-black text-xl mb-2">Доступ к аудитории</h3>
                    <p className="text-slate-700 mb-3">Тысячи активных покупателей ежедневно</p>
                    <ul className="space-y-2 text-slate-600">
                      <li>• Готовая база покупателей</li>
                      <li>• Продвижение товаров на платформе</li>
                      <li>• Статистика и аналитика продаж</li>
                      <li>• Рекомендации покупателям</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <Shield className="w-8 h-8 text-purple-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-black text-xl mb-2">Безопасность сделок</h3>
                    <p className="text-slate-700 mb-3">Защита продавца и покупателя</p>
                    <ul className="space-y-2 text-slate-600">
                      <li>• Резервирование средств до получения товара</li>
                      <li>• Защита от мошенничества</li>
                      <li>• Страхование грузов</li>
                      <li>• Поддержка в спорных ситуациях</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-black mt-8 mb-4">Требования к продавцам</h2>
            <ul className="space-y-3 text-slate-700 mb-8">
              <li className="flex items-start gap-2">
                <span className="text-violet-600 font-bold">•</span>
                <span>Юридическое лицо или ИП (для физлиц — самозанятость)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-violet-600 font-bold">•</span>
                <span>Качественные товары с подробным описанием</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-violet-600 font-bold">•</span>
                <span>Фотографии товаров в хорошем качестве</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-violet-600 font-bold">•</span>
                <span>Соблюдение сроков отправки (1-2 дня)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-violet-600 font-bold">•</span>
                <span>Своевременная обработка заказов</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-violet-600 font-bold">•</span>
                <span>Поддержка клиентов через чат</span>
              </li>
            </ul>

            <h2 className="text-2xl font-black mt-8 mb-4">Тарифные планы</h2>
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              <div className="border-2 border-slate-200 rounded-2xl p-6">
                <h3 className="font-black text-xl mb-2">Старт</h3>
                <div className="text-3xl font-black text-violet-600 mb-4">5%</div>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>✓ До 100 товаров</li>
                  <li>✓ Базовая аналитика</li>
                  <li>✓ Email поддержка</li>
                  <li>✓ Стандартные выплаты</li>
                </ul>
              </div>

              <div className="border-2 border-violet-600 rounded-2xl p-6 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-violet-600 text-white px-4 py-1 rounded-full text-xs font-bold">
                  Популярный
                </div>
                <h3 className="font-black text-xl mb-2">Бизнес</h3>
                <div className="text-3xl font-black text-violet-600 mb-4">4%</div>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>✓ До 1000 товаров</li>
                  <li>✓ Расширенная аналитика</li>
                  <li>✓ Приоритетная поддержка</li>
                  <li>✓ Еженедельные выплаты</li>
                  <li>✓ Продвижение товаров</li>
                </ul>
              </div>

              <div className="border-2 border-slate-200 rounded-2xl p-6">
                <h3 className="font-black text-xl mb-2">Премиум</h3>
                <div className="text-3xl font-black text-violet-600 mb-4">3%</div>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>✓ Неограниченно товаров</li>
                  <li>✓ Персональный менеджер</li>
                  <li>✓ Приоритетное размещение</li>
                  <li>✓ Ежедневные выплаты</li>
                  <li>✓ Индивидуальные условия</li>
                </ul>
              </div>
            </div>

            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6">
              <h3 className="font-black text-lg mb-2">Первый месяц бесплатно!</h3>
              <p className="text-slate-700">
                Для новых продавцов действует акция — нулевая комиссия в первый месяц работы. 
                Начните продавать без рисков и оцените все возможности платформы.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
