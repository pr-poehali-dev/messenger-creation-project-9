import { Link } from 'react-router-dom'
import { Shield } from 'lucide-react'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-violet-600 hover:text-violet-700 mb-8 font-semibold">
          ← Вернуться на главную
        </Link>

        <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-10 h-10 text-violet-600" />
            <h1 className="text-4xl font-black bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
              Политика конфиденциальности
            </h1>
          </div>

          <p className="text-sm text-slate-600 mb-8">Последнее обновление: 25 ноября 2024 г.</p>

          <div className="prose prose-lg max-w-none space-y-6 text-slate-700">
            <section>
              <h2 className="text-2xl font-black mb-3">1. Общие положения</h2>
              <p className="leading-relaxed">
                Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных 
                пользователей маркетплейса Peeky (далее — «Платформа»). Используя наши услуги, вы соглашаетесь 
                с условиями данной Политики.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black mb-3">2. Какие данные мы собираем</h2>
              <p className="mb-3">При регистрации и использовании Платформы мы можем собирать следующую информацию:</p>
              <ul className="space-y-2 ml-6">
                <li>• Личные данные: имя, фамилия, дата рождения</li>
                <li>• Контактные данные: email, номер телефона, адрес доставки</li>
                <li>• Данные платежей: информация о способах оплаты (без сохранения CVV)</li>
                <li>• Техническая информация: IP-адрес, тип браузера, операционная система</li>
                <li>• Информация о заказах и покупках</li>
                <li>• Cookie и данные о поведении на сайте</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-black mb-3">3. Как мы используем ваши данные</h2>
              <p className="mb-3">Мы используем собранную информацию для:</p>
              <ul className="space-y-2 ml-6">
                <li>• Обработки и выполнения заказов</li>
                <li>• Коммуникации с вами по вопросам заказов и поддержки</li>
                <li>• Улучшения качества услуг и персонализации предложений</li>
                <li>• Предотвращения мошенничества и обеспечения безопасности</li>
                <li>• Выполнения требований законодательства</li>
                <li>• Аналитики и статистических исследований (в обезличенном виде)</li>
                <li>• Отправки маркетинговых сообщений (с вашего согласия)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-black mb-3">4. Передача данных третьим лицам</h2>
              <p className="mb-3">
                Мы не продаем ваши персональные данные. Передача данных третьим лицам осуществляется только в следующих случаях:
              </p>
              <ul className="space-y-2 ml-6">
                <li>• Службам доставки — для доставки заказов</li>
                <li>• Платежным системам — для обработки платежей</li>
                <li>• Продавцам — в объеме, необходимом для выполнения заказа</li>
                <li>• Государственным органам — по официальным запросам в соответствии с законом</li>
                <li>• Партнерам по аналитике — в обезличенном виде</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-black mb-3">5. Защита данных</h2>
              <p className="leading-relaxed mb-3">
                Мы применяем современные технические и организационные меры для защиты ваших данных:
              </p>
              <ul className="space-y-2 ml-6">
                <li>• SSL-шифрование для передачи данных</li>
                <li>• Шифрование данных в базах данных</li>
                <li>• Ограниченный доступ сотрудников к персональным данным</li>
                <li>• Регулярные проверки безопасности</li>
                <li>• Резервное копирование данных</li>
                <li>• Соответствие стандартам PCI DSS для платежных данных</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-black mb-3">6. Ваши права</h2>
              <p className="mb-3">В соответствии с законодательством вы имеете право:</p>
              <ul className="space-y-2 ml-6">
                <li>• Получить доступ к своим персональным данным</li>
                <li>• Исправить неточные данные</li>
                <li>• Удалить свои данные (право на забвение)</li>
                <li>• Ограничить обработку данных</li>
                <li>• Возразить против обработки данных</li>
                <li>• Получить копию данных в машиночитаемом формате</li>
                <li>• Отозвать согласие на обработку данных</li>
              </ul>
              <p className="mt-3">
                Для реализации своих прав свяжитесь с нами по адресу: privacy@peeky.ru
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black mb-3">7. Cookies и аналитика</h2>
              <p className="leading-relaxed">
                Мы используем cookies для улучшения работы сайта и персонализации контента. 
                Вы можете управлять cookies в настройках браузера. Мы используем Google Analytics 
                и Яндекс.Метрику для анализа посещаемости (данные обезличены).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black mb-3">8. Хранение данных</h2>
              <p className="leading-relaxed">
                Мы храним ваши персональные данные в течение срока, необходимого для выполнения целей обработки, 
                но не более 5 лет с момента последнего взаимодействия. После этого данные удаляются 
                или обезличиваются, за исключением случаев, когда законом предусмотрены иные сроки хранения.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black mb-3">9. Изменения в Политике</h2>
              <p className="leading-relaxed">
                Мы оставляем за собой право вносить изменения в настоящую Политику. 
                О существенных изменениях мы уведомим вас по email или через уведомления на сайте. 
                Дата последнего обновления указана в начале документа.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black mb-3">10. Контакты</h2>
              <p className="leading-relaxed">
                По вопросам обработки персональных данных обращайтесь:<br />
                Email: privacy@peeky.ru<br />
                Телефон: 8 (800) 123-45-67<br />
                Адрес: 125009, г. Москва, ул. Примерная, д. 123
              </p>
            </section>
          </div>

          <div className="mt-8 bg-violet-50 border-2 border-violet-200 rounded-2xl p-6">
            <p className="text-slate-700">
              <strong>Важно:</strong> Продолжая использовать наши услуги, вы подтверждаете, 
              что прочитали и согласны с условиями данной Политики конфиденциальности.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
