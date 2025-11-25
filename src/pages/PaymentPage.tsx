import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CreditCard, Smartphone, Wallet, Shield } from 'lucide-react'

export default function PaymentPage() {
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
            <CreditCard className="w-10 h-10 text-violet-600" />
            <h1 className="text-4xl font-black bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
              Способы оплаты
            </h1>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-slate-700 leading-relaxed mb-8">
              Мы принимаем различные способы оплаты для вашего удобства. Все платежи защищены современными системами безопасности.
            </p>

            <div className="grid gap-6 mb-8">
              <div className="bg-violet-50 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <CreditCard className="w-8 h-8 text-violet-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-black text-xl mb-2">Банковские карты</h3>
                    <p className="text-slate-700 mb-3">Оплата картами Visa, MasterCard, МИР</p>
                    <ul className="space-y-2 text-slate-600">
                      <li>• Мгновенное зачисление платежа</li>
                      <li>• Защита 3D-Secure</li>
                      <li>• Сохранение карты для быстрых покупок</li>
                      <li>• Возможность оплаты в рассрочку</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-fuchsia-50 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <Smartphone className="w-8 h-8 text-fuchsia-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-black text-xl mb-2">Электронные кошельки</h3>
                    <p className="text-slate-700 mb-3">Быстрая оплата через популярные сервисы</p>
                    <ul className="space-y-2 text-slate-600">
                      <li>• ЮMoney</li>
                      <li>• QIWI</li>
                      <li>• WebMoney</li>
                      <li>• СБП (Система быстрых платежей)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <Wallet className="w-8 h-8 text-purple-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-black text-xl mb-2">Оплата при получении</h3>
                    <p className="text-slate-700 mb-3">Наличными или картой курьеру</p>
                    <ul className="space-y-2 text-slate-600">
                      <li>• Доступно для заказов до 30 000 ₽</li>
                      <li>• Оплата наличными или картой</li>
                      <li>• Проверка товара перед оплатой</li>
                      <li>• Дополнительная комиссия 2%</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 mb-8">
              <div className="flex items-start gap-4">
                <Shield className="w-8 h-8 text-green-600 flex-shrink-0" />
                <div>
                  <h3 className="font-black text-xl mb-2">Безопасность платежей</h3>
                  <p className="text-slate-700 mb-3">
                    Все транзакции проходят через защищенное соединение с использованием SSL-шифрования. 
                    Данные вашей карты не сохраняются на наших серверах и передаются напрямую в банк.
                  </p>
                  <ul className="space-y-2 text-slate-600">
                    <li>• Сертификат PCI DSS</li>
                    <li>• Технология 3D-Secure</li>
                    <li>• Мониторинг подозрительных операций</li>
                    <li>• Возврат средств при возврате товара</li>
                  </ul>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-black mt-8 mb-4">Рассрочка и кредит</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Доступна беспроцентная рассрочка на 3, 6 или 12 месяцев при оплате картой. 
              Рассрочка оформляется автоматически при выборе соответствующего способа оплаты.
            </p>
            <ul className="space-y-2 text-slate-700 mb-8">
              <li className="flex items-start gap-2">
                <span className="text-violet-600 font-bold">•</span>
                <span>Минимальная сумма покупки — 3000 ₽</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-violet-600 font-bold">•</span>
                <span>Без переплат и скрытых комиссий</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-violet-600 font-bold">•</span>
                <span>Мгновенное одобрение</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-violet-600 font-bold">•</span>
                <span>Первый платеж через 30 дней</span>
              </li>
            </ul>

            <div className="bg-blue-50 rounded-2xl p-6">
              <h3 className="font-black text-lg mb-2">Возврат средств</h3>
              <p className="text-slate-700">
                При возврате товара деньги возвращаются тем же способом, которым была произведена оплата. 
                Срок возврата — от 3 до 10 рабочих дней в зависимости от способа оплаты.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}