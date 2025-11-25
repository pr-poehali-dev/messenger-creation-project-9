import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Scale } from 'lucide-react'

export default function LegalPage() {
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
            <Scale className="w-10 h-10 text-violet-600" />
            <h1 className="text-4xl font-black bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
              Правовая информация
            </h1>
          </div>

          <div className="prose prose-lg max-w-none space-y-6 text-slate-700">
            <section>
              <h2 className="text-2xl font-black mb-3">Сведения о компании</h2>
              <div className="bg-violet-50 rounded-2xl p-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="font-bold mb-1">Полное наименование:</p>
                    <p>Общество с ограниченной ответственностью «Пики Маркетплейс»</p>
                  </div>
                  <div>
                    <p className="font-bold mb-1">Сокращенное наименование:</p>
                    <p>ООО «Пики Маркетплейс»</p>
                  </div>
                  <div>
                    <p className="font-bold mb-1">ИНН:</p>
                    <p>7700123456</p>
                  </div>
                  <div>
                    <p className="font-bold mb-1">КПП:</p>
                    <p>770001001</p>
                  </div>
                  <div>
                    <p className="font-bold mb-1">ОГРН:</p>
                    <p>1234567890123</p>
                  </div>
                  <div>
                    <p className="font-bold mb-1">Дата регистрации:</p>
                    <p>15 января 2023 года</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-black mb-3">Юридический адрес</h2>
              <p className="leading-relaxed">
                125009, Российская Федерация, г. Москва, ул. Примерная, дом 123, офис 456
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black mb-3">Почтовый адрес</h2>
              <p className="leading-relaxed">
                125009, Российская Федерация, г. Москва, ул. Примерная, дом 123, офис 456
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black mb-3">Банковские реквизиты</h2>
              <div className="bg-fuchsia-50 rounded-2xl p-6">
                <div className="space-y-3">
                  <div>
                    <p className="font-bold mb-1">Расчетный счет:</p>
                    <p>40702810100000000000</p>
                  </div>
                  <div>
                    <p className="font-bold mb-1">Банк:</p>
                    <p>ПАО «Сбербанк России»</p>
                  </div>
                  <div>
                    <p className="font-bold mb-1">Корр. счет:</p>
                    <p>30101810400000000225</p>
                  </div>
                  <div>
                    <p className="font-bold mb-1">БИК:</p>
                    <p>044525225</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-black mb-3">Контактная информация</h2>
              <ul className="space-y-2">
                <li><strong>Email для общих вопросов:</strong> info@peeky.ru</li>
                <li><strong>Email для юридических вопросов:</strong> legal@peeky.ru</li>
                <li><strong>Телефон горячей линии:</strong> 8 (800) 123-45-67 (бесплатно по России)</li>
                <li><strong>Телефон офиса:</strong> +7 (495) 123-45-67</li>
                <li><strong>Режим работы:</strong> Пн-Пт 9:00-21:00, Сб-Вс 10:00-18:00 (МСК)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-black mb-3">Руководство</h2>
              <p className="leading-relaxed">
                <strong>Генеральный директор:</strong> Иванов Иван Иванович<br />
                Действует на основании Устава
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black mb-3">Лицензии и сертификаты</h2>
              <ul className="space-y-2">
                <li>• Свидетельство о государственной регистрации юридического лица</li>
                <li>• Сертификат соответствия PCI DSS (Payment Card Industry Data Security Standard)</li>
                <li>• Регистрация в качестве оператора персональных данных (Роскомнадзор)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-black mb-3">Правовые документы</h2>
              <div className="space-y-3">
                <Link to="/terms" className="block bg-violet-50 hover:bg-violet-100 rounded-xl p-4 transition-colors">
                  <p className="font-bold text-violet-600">→ Пользовательское соглашение</p>
                  <p className="text-sm text-slate-600">Условия использования платформы</p>
                </Link>
                <Link to="/privacy" className="block bg-fuchsia-50 hover:bg-fuchsia-100 rounded-xl p-4 transition-colors">
                  <p className="font-bold text-fuchsia-600">→ Политика конфиденциальности</p>
                  <p className="text-sm text-slate-600">Обработка персональных данных</p>
                </Link>
                <Link to="/seller-conditions" className="block bg-purple-50 hover:bg-purple-100 rounded-xl p-4 transition-colors">
                  <p className="font-bold text-purple-600">→ Условия для продавцов</p>
                  <p className="text-sm text-slate-600">Правила работы для продавцов</p>
                </Link>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-black mb-3">Защита прав потребителей</h2>
              <p className="leading-relaxed mb-3">
                Деятельность компании осуществляется в соответствии с Законом РФ «О защите прав потребителей» 
                от 07.02.1992 № 2300-1 и другими нормативными актами Российской Федерации.
              </p>
              <p className="leading-relaxed">
                В случае возникновения претензий по качеству товаров или услуг вы можете обратиться 
                в нашу службу поддержки или в Роспотребнадзор.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black mb-3">Членство в организациях</h2>
              <ul className="space-y-2">
                <li>• Ассоциация компаний интернет-торговли (АКИТ)</li>
                <li>• Российская ассоциация электронных коммуникаций (РАЭК)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-black mb-3">Налогообложение</h2>
              <p className="leading-relaxed">
                Компания применяет общую систему налогообложения. Является плательщиком НДС. 
                По запросу предоставляются счета-фактуры и акты выполненных работ.
              </p>
            </section>

            <div className="bg-blue-50 rounded-2xl p-6 mt-8">
              <h3 className="font-black text-lg mb-3">Обратная связь по правовым вопросам</h3>
              <p className="text-slate-700 mb-4">
                Если у вас есть вопросы юридического характера, направьте их на email: legal@peeky.ru
              </p>
              <p className="text-sm text-slate-600">
                Среднее время ответа: 3 рабочих дня
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}