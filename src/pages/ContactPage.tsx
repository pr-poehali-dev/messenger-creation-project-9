import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Mail, Phone, Clock } from 'lucide-react'

export default function ContactPage() {
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
            <MapPin className="w-10 h-10 text-violet-600" />
            <h1 className="text-4xl font-black bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
              Контакты
            </h1>
          </div>

          <p className="text-lg text-slate-700 leading-relaxed mb-8">
            Свяжитесь с нами удобным для вас способом. Мы всегда рады помочь!
          </p>

          <div className="grid sm:grid-cols-2 gap-6 mb-8">
            <div className="bg-violet-50 rounded-2xl p-6">
              <Mail className="w-8 h-8 text-violet-600 mb-4" />
              <h3 className="font-black text-xl mb-2">Email</h3>
              <a href="mailto:info@peeky.ru" className="text-violet-600 hover:underline text-lg">
                info@peeky.ru
              </a>
              <p className="text-sm text-slate-600 mt-2">Для общих вопросов</p>
              <a href="mailto:support@peeky.ru" className="text-violet-600 hover:underline text-lg block mt-2">
                support@peeky.ru
              </a>
              <p className="text-sm text-slate-600">Для технической поддержки</p>
            </div>

            <div className="bg-fuchsia-50 rounded-2xl p-6">
              <Phone className="w-8 h-8 text-fuchsia-600 mb-4" />
              <h3 className="font-black text-xl mb-2">Телефон</h3>
              <a href="tel:+78001234567" className="text-fuchsia-600 hover:underline text-lg font-bold block">
                8 (800) 123-45-67
              </a>
              <p className="text-sm text-slate-600 mt-2">Бесплатно по России</p>
              <a href="tel:+74951234567" className="text-fuchsia-600 hover:underline text-lg font-bold block mt-2">
                +7 (495) 123-45-67
              </a>
              <p className="text-sm text-slate-600">Для звонков из-за рубежа</p>
            </div>

            <div className="bg-purple-50 rounded-2xl p-6">
              <MapPin className="w-8 h-8 text-purple-600 mb-4" />
              <h3 className="font-black text-xl mb-2">Адрес офиса</h3>
              <p className="text-slate-700 leading-relaxed">
                г. Москва, ул. Примерная, д. 123<br />
                БЦ "Технопарк", офис 456<br />
                125009, Россия
              </p>
            </div>

            <div className="bg-pink-50 rounded-2xl p-6">
              <Clock className="w-8 h-8 text-pink-600 mb-4" />
              <h3 className="font-black text-xl mb-2">Режим работы</h3>
              <p className="text-slate-700">
                <span className="font-bold">Пн-Пт:</span> 9:00 - 21:00<br />
                <span className="font-bold">Сб-Вс:</span> 10:00 - 18:00<br />
                <span className="text-sm text-slate-600 mt-2 block">Московское время (UTC+3)</span>
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-violet-50 to-fuchsia-50 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-black mb-4">Реквизиты компании</h2>
            <div className="grid sm:grid-cols-2 gap-4 text-slate-700">
              <div>
                <p className="font-bold">Название:</p>
                <p>ООО "Пики Маркетплейс"</p>
              </div>
              <div>
                <p className="font-bold">ИНН:</p>
                <p>7700123456</p>
              </div>
              <div>
                <p className="font-bold">ОГРН:</p>
                <p>1234567890123</p>
              </div>
              <div>
                <p className="font-bold">КПП:</p>
                <p>770001001</p>
              </div>
              <div>
                <p className="font-bold">Юридический адрес:</p>
                <p>125009, г. Москва, ул. Примерная, д. 123</p>
              </div>
              <div>
                <p className="font-bold">Расчетный счет:</p>
                <p>40702810100000000000</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-2xl p-6">
            <h3 className="font-black text-lg mb-3">Социальные сети</h3>
            <div className="flex flex-wrap gap-4">
              <a href="#" className="bg-white px-6 py-3 rounded-xl font-bold text-violet-600 hover:bg-violet-600 hover:text-white transition-colors">
                Telegram
              </a>
              <a href="#" className="bg-white px-6 py-3 rounded-xl font-bold text-violet-600 hover:bg-violet-600 hover:text-white transition-colors">
                VKontakte
              </a>
              <a href="#" className="bg-white px-6 py-3 rounded-xl font-bold text-violet-600 hover:bg-violet-600 hover:text-white transition-colors">
                Instagram
              </a>
              <a href="#" className="bg-white px-6 py-3 rounded-xl font-bold text-violet-600 hover:bg-violet-600 hover:text-white transition-colors">
                YouTube
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}