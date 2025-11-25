import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Truck, MapPin, Clock, Package } from 'lucide-react'

export default function DeliveryPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-violet-600 hover:text-violet-700 mb-8 font-semibold">
          ← Вернуться на главную
        </Link>

        <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12">
          <div className="flex items-center gap-3 mb-6">
            <Truck className="w-10 h-10 text-violet-600" />
            <h1 className="text-4xl font-black bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
              Доставка
            </h1>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-slate-700 leading-relaxed mb-8">
              Мы предлагаем различные способы доставки, чтобы вы могли выбрать наиболее удобный вариант.
            </p>

            <div className="grid gap-6 mb-8">
              <div className="bg-violet-50 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <Package className="w-8 h-8 text-violet-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-black text-xl mb-2">Курьерская доставка</h3>
                    <p className="text-slate-700 mb-3">Доставка до двери в удобное для вас время</p>
                    <ul className="space-y-2 text-slate-600">
                      <li>• По Москве — 1-2 дня, от 300 ₽</li>
                      <li>• По Санкт-Петербургу — 1-2 дня, от 300 ₽</li>
                      <li>• По России — 3-7 дней, от 500 ₽</li>
                      <li>• Бесплатно при заказе от 3000 ₽</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-fuchsia-50 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-8 h-8 text-fuchsia-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-black text-xl mb-2">Пункты выдачи</h3>
                    <p className="text-slate-700 mb-3">Самовывоз из пунктов выдачи наших партнеров</p>
                    <ul className="space-y-2 text-slate-600">
                      <li>• Более 10 000 пунктов по России</li>
                      <li>• Хранение 5 дней бесплатно</li>
                      <li>• Стоимость от 150 ₽</li>
                      <li>• Бесплатно при заказе от 2000 ₽</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <Clock className="w-8 h-8 text-purple-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-black text-xl mb-2">Экспресс-доставка</h3>
                    <p className="text-slate-700 mb-3">Срочная доставка в день заказа</p>
                    <ul className="space-y-2 text-slate-600">
                      <li>• Доступно в крупных городах</li>
                      <li>• Заказ до 12:00 — доставка в тот же день</li>
                      <li>• Стоимость от 600 ₽</li>
                      <li>• Доставка за 3-6 часов</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-black mt-8 mb-4">Как отследить заказ</h2>
            <ol className="space-y-3 text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-violet-600 font-bold">1.</span>
                <span>Войдите в личный кабинет</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-violet-600 font-bold">2.</span>
                <span>Перейдите в раздел "Мои заказы"</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-violet-600 font-bold">3.</span>
                <span>Нажмите на интересующий заказ</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-violet-600 font-bold">4.</span>
                <span>Отслеживайте статус доставки в реальном времени</span>
              </li>
            </ol>

            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6 mt-8">
              <h3 className="font-black text-lg mb-2">Важно знать</h3>
              <ul className="space-y-2 text-slate-700">
                <li>• Проверяйте товар при получении</li>
                <li>• Сохраняйте упаковку до проверки товара</li>
                <li>• При повреждении составьте акт с курьером</li>
                <li>• Сроки доставки могут увеличиться в праздничные дни</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}