import { Link } from 'react-router-dom'
import { HelpCircle, ChevronDown } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const faqs = [
    {
      question: 'Как сделать заказ?',
      answer: 'Выберите товар, нажмите "В корзину", перейдите в корзину, заполните данные доставки и оплатите удобным способом. После оплаты вы получите подтверждение на email.'
    },
    {
      question: 'Какие способы оплаты доступны?',
      answer: 'Принимаем банковские карты (Visa, MasterCard, МИР), электронные кошельки (ЮMoney, QIWI), СБП и оплату при получении для заказов до 30 000 ₽.'
    },
    {
      question: 'Сколько стоит доставка?',
      answer: 'Курьерская доставка от 300 ₽, пункты выдачи от 150 ₽. Бесплатная доставка при заказе от 2000 ₽ в пункты выдачи и от 3000 ₽ курьером.'
    },
    {
      question: 'Как отследить заказ?',
      answer: 'После отправки товара вы получите трек-номер на email и SMS. Отследить посылку можно в личном кабинете в разделе "Мои заказы".'
    },
    {
      question: 'Можно ли вернуть товар?',
      answer: 'Да, товар можно вернуть в течение 14 дней, если он сохранил товарный вид, упаковку и не был в употреблении. Подробнее в разделе "Возврат и обмен".'
    },
    {
      question: 'Как связаться с продавцом?',
      answer: 'В карточке товара и в деталях заказа есть кнопка "Написать продавцу". Все сообщения сохраняются в чате в личном кабинете.'
    },
    {
      question: 'Что делать, если товар не подошел?',
      answer: 'Оформите возврат или обмен в личном кабинете. Курьер заберет товар бесплатно, после проверки мы вернем деньги или отправим замену.'
    },
    {
      question: 'Есть ли гарантия на товары?',
      answer: 'Да, на все товары действует гарантия от производителя. Срок гарантии указан в описании товара. Гарантийное обслуживание осуществляется через продавца.'
    },
    {
      question: 'Можно ли изменить или отменить заказ?',
      answer: 'Да, до отправки товара можно изменить адрес доставки или отменить заказ в личном кабинете. После отправки можно оформить возврат.'
    },
    {
      question: 'Что такое программа лояльности?',
      answer: 'За каждую покупку вы получаете бонусные баллы (1% от суммы), которые можно использовать для оплаты следующих заказов. 1 балл = 1 рубль.'
    },
    {
      question: 'Как использовать промокод?',
      answer: 'При оформлении заказа введите промокод в специальное поле. Скидка применится автоматически. Один заказ — один промокод.'
    },
    {
      question: 'Безопасно ли покупать на Peeky?',
      answer: 'Да, все платежи защищены SSL-шифрованием и 3D-Secure. Мы не храним данные карт. Все продавцы проверены. Гарантируем возврат денег при проблемах.'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-violet-600 hover:text-violet-700 mb-8 font-semibold">
          ← Вернуться на главную
        </Link>

        <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12">
          <div className="flex items-center gap-3 mb-6">
            <HelpCircle className="w-10 h-10 text-violet-600" />
            <h1 className="text-4xl font-black bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
              Частые вопросы
            </h1>
          </div>

          <p className="text-lg text-slate-700 leading-relaxed mb-8">
            Ответы на самые популярные вопросы о покупках на Peeky.
          </p>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-2 border-slate-200 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
                >
                  <span className="font-bold text-lg pr-4">{faq.question}</span>
                  <ChevronDown 
                    className={`w-6 h-6 text-violet-600 flex-shrink-0 transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-6 text-slate-700 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 bg-violet-50 rounded-2xl p-6">
            <h3 className="font-black text-lg mb-2">Не нашли ответ?</h3>
            <p className="text-slate-700 mb-4">
              Свяжитесь с нашей службой поддержки, и мы поможем решить ваш вопрос.
            </p>
            <Link 
              to="/support" 
              className="inline-flex items-center gap-2 bg-violet-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-violet-700 transition-colors"
            >
              Связаться с поддержкой
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}