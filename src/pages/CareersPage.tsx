import { Link } from 'react-router-dom'
import { Briefcase, Users, TrendingUp, Heart } from 'lucide-react'

export default function CareersPage() {
  const vacancies = [
    {
      title: 'Frontend разработчик',
      department: 'Разработка',
      location: 'Москва / Удаленно',
      type: 'Полная занятость',
      salary: '150 000 - 250 000 ₽'
    },
    {
      title: 'Backend разработчик',
      department: 'Разработка',
      location: 'Москва / Удаленно',
      type: 'Полная занятость',
      salary: '180 000 - 300 000 ₽'
    },
    {
      title: 'Менеджер по продажам',
      department: 'Продажи',
      location: 'Москва',
      type: 'Полная занятость',
      salary: '80 000 - 150 000 ₽ + %'
    },
    {
      title: 'Маркетолог',
      department: 'Маркетинг',
      location: 'Москва / Удаленно',
      type: 'Полная занятость',
      salary: '100 000 - 180 000 ₽'
    },
    {
      title: 'Специалист службы поддержки',
      department: 'Клиентский сервис',
      location: 'Москва',
      type: 'Полная / Частичная',
      salary: '60 000 - 90 000 ₽'
    },
    {
      title: 'UX/UI дизайнер',
      department: 'Дизайн',
      location: 'Москва / Удаленно',
      type: 'Полная занятость',
      salary: '120 000 - 200 000 ₽'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-violet-600 hover:text-violet-700 mb-8 font-semibold">
          ← Вернуться на главную
        </Link>

        <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Briefcase className="w-10 h-10 text-violet-600" />
            <h1 className="text-4xl font-black bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
              Карьера в Peeky
            </h1>
          </div>

          <p className="text-lg text-slate-700 leading-relaxed mb-8">
            Присоединяйтесь к команде инновационного маркетплейса! Мы ищем талантливых специалистов, 
            которые хотят изменить рынок электронной коммерции в России.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-violet-50 rounded-2xl p-6">
              <Users className="w-8 h-8 text-violet-600 mb-3" />
              <h3 className="font-black text-xl mb-2">Команда</h3>
              <p className="text-slate-600">Работайте с профессионалами своего дела</p>
            </div>

            <div className="bg-fuchsia-50 rounded-2xl p-6">
              <TrendingUp className="w-8 h-8 text-fuchsia-600 mb-3" />
              <h3 className="font-black text-xl mb-2">Рост</h3>
              <p className="text-slate-600">Развивайтесь вместе с быстрорастущей компанией</p>
            </div>

            <div className="bg-purple-50 rounded-2xl p-6">
              <Heart className="w-8 h-8 text-purple-600 mb-3" />
              <h3 className="font-black text-xl mb-2">Забота</h3>
              <p className="text-slate-600">ДМС, бонусы и комфортный офис</p>
            </div>

            <div className="bg-pink-50 rounded-2xl p-6">
              <Briefcase className="w-8 h-8 text-pink-600 mb-3" />
              <h3 className="font-black text-xl mb-2">Гибкость</h3>
              <p className="text-slate-600">Удаленка и гибкий график работы</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-violet-50 to-fuchsia-50 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-black mb-4">Что мы предлагаем</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-violet-600 font-bold">•</span>
                  <span>Конкурентная заработная плата</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-violet-600 font-bold">•</span>
                  <span>Официальное оформление по ТК РФ</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-violet-600 font-bold">•</span>
                  <span>ДМС для сотрудников</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-violet-600 font-bold">•</span>
                  <span>Возможность удаленной работы</span>
                </li>
              </ul>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-violet-600 font-bold">•</span>
                  <span>Современный офис в центре Москвы</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-violet-600 font-bold">•</span>
                  <span>Корпоративное обучение и развитие</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-violet-600 font-bold">•</span>
                  <span>Компенсация спорта и образования</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-violet-600 font-bold">•</span>
                  <span>Корпоративные мероприятия</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12">
          <h2 className="text-3xl font-black mb-8">Открытые вакансии</h2>
          
          <div className="space-y-4">
            {vacancies.map((vacancy, index) => (
              <div key={index} className="border-2 border-slate-200 hover:border-violet-600 rounded-2xl p-6 transition-all hover:shadow-lg">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-black text-xl mb-2">{vacancy.title}</h3>
                    <div className="flex flex-wrap gap-3 text-sm text-slate-600">
                      <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full font-semibold">
                        {vacancy.department}
                      </span>
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold">
                        {vacancy.location}
                      </span>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
                        {vacancy.type}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col sm:items-end gap-2">
                    <div className="text-xl font-black text-violet-600">{vacancy.salary}</div>
                    <a 
                      href={`mailto:hr@peeky.ru?subject=Отклик на вакансию: ${vacancy.title}`}
                      className="inline-flex items-center justify-center bg-violet-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-violet-700 transition-colors"
                    >
                      Откликнуться
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-blue-50 rounded-2xl p-6">
            <h3 className="font-black text-lg mb-3">Не нашли подходящую вакансию?</h3>
            <p className="text-slate-700 mb-4">
              Отправьте нам свое резюме на email hr@peeky.ru с темой "Инициативный отклик". 
              Мы обязательно рассмотрим вашу кандидатуру и свяжемся при появлении подходящих позиций.
            </p>
            <a 
              href="mailto:hr@peeky.ru?subject=Инициативный отклик"
              className="inline-flex items-center gap-2 bg-violet-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-violet-700 transition-colors"
            >
              Отправить резюме
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
