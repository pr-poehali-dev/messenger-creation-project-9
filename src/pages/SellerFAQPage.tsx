import { Link } from 'react-router-dom'
import { HelpCircle, ChevronDown } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function SellerFAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const faqs = [
    {
      question: 'Как стать продавцом на Peeky?',
      answer: 'Для регистрации перейдите в раздел "Стать продавцом", заполните форму с данными о вашей компании или ИП, загрузите необходимые документы. После проверки (1-2 рабочих дня) вы получите доступ к личному кабинету продавца.'
    },
    {
      question: 'Какие документы нужны для регистрации?',
      answer: 'Для юридических лиц: выписка из ЕГРЮЛ, ИНН, ОГРН. Для ИП: свидетельство о регистрации, ИНН, ОГРНИП. Для самозанятых: справка из налоговой. Также потребуются реквизиты для выплат.'
    },
    {
      question: 'Какая комиссия платформы?',
      answer: 'Стандартная комиссия составляет 5% от стоимости товара. При больших объемах продаж доступны пониженные тарифы: 4% (до 1000 товаров) и 3% (неограниченно). Первый месяц работы — без комиссии.'
    },
    {
      question: 'Когда происходят выплаты?',
      answer: 'Выплаты производятся 2 раза в месяц (1-го и 15-го числа) на тарифе "Старт". На тарифе "Бизнес" — еженедельно, на "Премиум" — ежедневно. Деньги поступают на расчетный счет в течение 2-3 рабочих дней.'
    },
    {
      question: 'Как формируется цена товара?',
      answer: 'Вы устанавливаете цену самостоятельно. Комиссия платформы уже включена в цену, которую видит покупатель. Например, если ваша цена 1000₽, покупатель платит 1000₽, а вы получаете 950₽ (минус 5% комиссии).'
    },
    {
      question: 'Кто отвечает за доставку?',
      answer: 'Вы можете выбрать: организовать доставку самостоятельно или использовать наших партнеров. При использовании наших служб доставки, все вопросы логистики мы берем на себя — вам нужно только передать товар в пункт приема.'
    },
    {
      question: 'Что делать с возвратами?',
      answer: 'Возвраты обрабатываются через платформу. Если покупатель возвращает товар по закону (14 дней), мы координируем логистику. После получения товара обратно, средства возвращаются покупателю, комиссия не взимается.'
    },
    {
      question: 'Сколько товаров можно разместить?',
      answer: 'На тарифе "Старт" — до 100 товаров, "Бизнес" — до 1000, "Премиум" — без ограничений. Один товар может иметь несколько вариантов (размеры, цвета), которые считаются как один товар.'
    },
    {
      question: 'Как продвигать свои товары?',
      answer: 'Доступны инструменты продвижения: размещение в рекомендациях, участие в акциях, спецпредложения. На тарифах "Бизнес" и "Премиум" доступно приоритетное размещение и рекламные блоки.'
    },
    {
      question: 'Можно ли изменить цену после публикации?',
      answer: 'Да, цены можно изменять в любое время в личном кабинете. Изменения вступают в силу мгновенно. Рекомендуем использовать акции и скидки для привлечения покупателей.'
    },
    {
      question: 'Как общаться с покупателями?',
      answer: 'В личном кабинете есть встроенный чат для общения с покупателями. Все сообщения сохраняются, есть уведомления о новых сообщениях. Рекомендуем отвечать в течение 24 часов.'
    },
    {
      question: 'Что если товар поврежден при доставке?',
      answer: 'При использовании наших партнеров по доставке все грузы застрахованы. В случае повреждения оформляется страховой случай, и вы получаете компенсацию. Покупатель также получает возврат средств.'
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
              FAQ для продавцов
            </h1>
          </div>

          <p className="text-lg text-slate-700 leading-relaxed mb-8">
            Ответы на часто задаваемые вопросы о работе с платформой Peeky.
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
              to="/seller-support" 
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