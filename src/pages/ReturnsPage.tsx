import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { RotateCcw, CheckCircle, XCircle, AlertCircle } from 'lucide-react'

export default function ReturnsPage() {
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
            <RotateCcw className="w-10 h-10 text-violet-600" />
            <h1 className="text-4xl font-black bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
              Возврат и обмен
            </h1>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-slate-700 leading-relaxed mb-8">
              Мы заботимся о вашем комфорте и предлагаем простую процедуру возврата товаров, которые вам не подошли.
            </p>

            <h2 className="text-2xl font-black mb-4">Условия возврата</h2>
            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 mb-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-black text-lg mb-2">Можно вернуть</h3>
                  <ul className="space-y-2 text-slate-700">
                    <li>• Товар надлежащего качества в течение 14 дней</li>
                    <li>• Товар сохранил товарный вид и упаковку</li>
                    <li>• Есть чек или другое подтверждение покупки</li>
                    <li>• Товар не был в употреблении</li>
                    <li>• Сохранены ярлыки и пломбы</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 mb-8">
              <div className="flex items-start gap-3">
                <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-black text-lg mb-2">Нельзя вернуть</h3>
                  <ul className="space-y-2 text-slate-700">
                    <li>• Товары личной гигиены</li>
                    <li>• Нижнее белье и чулочно-носочные изделия</li>
                    <li>• Парфюмерия и косметика (распечатанные)</li>
                    <li>• Цифровые товары и подписки</li>
                    <li>• Товары на заказ</li>
                  </ul>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-black mb-4">Как оформить возврат</h2>
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="bg-violet-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Подайте заявку</h3>
                  <p className="text-slate-600">Войдите в личный кабинет и выберите заказ, который хотите вернуть</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-violet-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Укажите причину</h3>
                  <p className="text-slate-600">Выберите причину возврата и при необходимости добавьте комментарий</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-violet-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Упакуйте товар</h3>
                  <p className="text-slate-600">Упакуйте товар в оригинальную упаковку со всеми комплектующими</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-violet-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">4</div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Передайте курьеру</h3>
                  <p className="text-slate-600">Курьер заберет товар бесплатно в удобное для вас время</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-violet-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">5</div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Получите возврат</h3>
                  <p className="text-slate-600">После проверки товара деньги вернутся в течение 3-10 рабочих дней</p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-black mb-4">Обмен товара</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Если товар не подошел по размеру, цвету или другим параметрам, вы можете обменять его на аналогичный. 
              Обмен происходит бесплатно в течение 14 дней с момента получения.
            </p>

            <div className="bg-blue-50 rounded-2xl p-6 mb-8">
              <h3 className="font-black text-lg mb-2">Порядок обмена</h3>
              <ol className="space-y-2 text-slate-700">
                <li>1. Оформите заявку на обмен в личном кабинете</li>
                <li>2. Выберите новый вариант товара</li>
                <li>3. Курьер заберет старый товар и привезет новый</li>
                <li>4. Доплатите разницу или получите возврат при необходимости</li>
              </ol>
            </div>

            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-black text-lg mb-2">Важная информация</h3>
                  <ul className="space-y-2 text-slate-700">
                    <li>• Проверяйте товар при получении</li>
                    <li>• Сохраняйте упаковку в течение 14 дней</li>
                    <li>• При браке возврат возможен в любое время гарантийного срока</li>
                    <li>• Стоимость доставки не возвращается</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}