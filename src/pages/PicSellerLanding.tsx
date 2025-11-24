import { Link } from 'react-router-dom'
import { Camera, TrendingUp, DollarSign, Shield, Upload, BarChart3, Users, Star, CheckCircle, ArrowRight, Image, Palette, Award } from 'lucide-react'

export default function PicSellerLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Camera className="w-8 h-8 text-indigo-600" />
            <span className="text-2xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Pic.Peeky
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              to="/pic/login"
              className="px-4 py-2 text-slate-700 font-medium hover:text-indigo-600 transition"
            >
              Войти
            </Link>
            <Link
              to="/pic/register"
              className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-indigo-500/50 transition-all active:scale-95"
            >
              Начать продавать
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10"></div>
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 rounded-full mb-6">
                <Star className="w-4 h-4 text-indigo-600" />
                <span className="text-sm font-bold text-indigo-600">
                  Маркетплейс для творческих людей
                </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black text-slate-800 mb-6 leading-tight">
                Продавайте свои <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">фотографии</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-slate-600 mb-8">
                Превратите своё творчество в стабильный доход. Загружайте изображения и получайте деньги с каждой продажи.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link
                  to="/pic/register"
                  className="group flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-indigo-500/50 transition-all active:scale-95"
                >
                  Создать аккаунт бесплатно
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/pic/login"
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-700 rounded-2xl font-bold text-lg border-2 border-slate-200 hover:border-indigo-600 hover:text-indigo-600 transition-all active:scale-95"
                >
                  У меня есть аккаунт
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-black text-indigo-600 mb-1">70%</div>
                  <div className="text-sm text-slate-600">вам с продажи</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-indigo-600 mb-1">24/7</div>
                  <div className="text-sm text-slate-600">ваши работы продаются</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-indigo-600 mb-1">∞</div>
                  <div className="text-sm text-slate-600">неограниченных продаж</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-3xl blur-3xl opacity-30 animate-pulse"></div>
              <div className="relative grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="aspect-square bg-gradient-to-br from-indigo-200 to-indigo-300 rounded-2xl flex items-center justify-center">
                    <Image className="w-16 h-16 text-indigo-600" />
                  </div>
                  <div className="aspect-[4/3] bg-gradient-to-br from-purple-200 to-purple-300 rounded-2xl flex items-center justify-center">
                    <Camera className="w-16 h-16 text-purple-600" />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="aspect-[4/3] bg-gradient-to-br from-pink-200 to-pink-300 rounded-2xl flex items-center justify-center">
                    <Palette className="w-16 h-16 text-pink-600" />
                  </div>
                  <div className="aspect-square bg-gradient-to-br from-violet-200 to-violet-300 rounded-2xl flex items-center justify-center">
                    <Award className="w-16 h-16 text-violet-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-4">
              Почему фотографы выбирают нас
            </h2>
            <p className="text-xl text-slate-600">
              Всё что нужно для успешных продаж ваших работ
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <DollarSign className="w-12 h-12 text-green-500" />,
                title: '70% от продажи',
                description: 'Одни из самых высоких выплат на рынке. Вы получаете 70% от каждой продажи.',
              },
              {
                icon: <Upload className="w-12 h-12 text-blue-500" />,
                title: 'Простая загрузка',
                description: 'Загружайте изображения в несколько кликов. Поддержка JPG, PNG, массовой загрузки.',
              },
              {
                icon: <BarChart3 className="w-12 h-12 text-purple-500" />,
                title: 'Детальная аналитика',
                description: 'Отслеживайте просмотры, скачивания, доход. Понимайте что продаётся лучше.',
              },
              {
                icon: <Shield className="w-12 h-12 text-indigo-500" />,
                title: 'Защита контента',
                description: 'Водяные знаки, защита от скачивания превью. Ваши работы защищены.',
              },
              {
                icon: <TrendingUp className="w-12 h-12 text-orange-500" />,
                title: 'Пассивный доход',
                description: 'Загрузите один раз - продавайте бесконечно. Зарабатывайте даже во сне.',
              },
              {
                icon: <Users className="w-12 h-12 text-pink-500" />,
                title: 'Большая аудитория',
                description: 'Тысячи покупателей ищут контент каждый день. Ваши работы увидят.',
              },
            ].map((benefit, index) => (
              <div
                key={index}
                className="group p-8 bg-gradient-to-br from-slate-50 to-white rounded-3xl border-2 border-slate-100 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/10 transition-all"
              >
                <div className="mb-4">{benefit.icon}</div>
                <h3 className="text-2xl font-black text-slate-800 mb-3 group-hover:text-indigo-600 transition">
                  {benefit.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/pic/register"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-indigo-500/50 transition-all active:scale-95"
            >
              Начать зарабатывать сейчас
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-4">
              Как это работает
            </h2>
            <p className="text-xl text-slate-600">
              Всего 3 шага до первого дохода
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Зарегистрируйтесь',
                description: 'Создайте бесплатный аккаунт продавца за 2 минуты. Никаких скрытых платежей.',
              },
              {
                step: '02',
                title: 'Загрузите контент',
                description: 'Добавьте свои фотографии, укажите цены и категории. Массовая загрузка доступна.',
              },
              {
                step: '03',
                title: 'Получайте деньги',
                description: 'Ваши работы видят покупатели. С каждой продажи вам приходит 70% на ваш счёт.',
              },
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="text-7xl font-black text-indigo-100 mb-4">
                  {step.step}
                </div>
                <h3 className="text-2xl font-black text-slate-800 mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-600 text-lg leading-relaxed">
                  {step.description}
                </p>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-indigo-300 to-transparent"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-4xl md:text-5xl font-black text-slate-800 mb-6">
                Присоединяйтесь к сообществу творцов
              </h3>
              <p className="text-xl text-slate-600 mb-8">
                Тысячи фотографов и дизайнеров уже зарабатывают на своём творчестве
              </p>
              
              <div className="space-y-4">
                {[
                  'Полный контроль над ценами и контентом',
                  'Выплаты 2 раза в месяц на любую карту',
                  'Бесплатная поддержка 24/7',
                  'Обучающие материалы для продавцов',
                  'SEO оптимизация ваших работ',
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <p className="text-slate-700 text-lg">{feature}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-3xl blur-3xl opacity-20"></div>
              <div className="relative bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-12 text-white shadow-2xl">
                <Camera className="w-16 h-16 mb-6" />
                <h4 className="text-3xl font-black mb-4">
                  Более 2,000 фотографов уже с нами
                </h4>
                <p className="text-indigo-100 text-lg mb-8">
                  Средний доход продавца составляет 45,000₽ в месяц. 
                  Начните зарабатывать на своём творчестве уже сегодня.
                </p>
                <Link
                  to="/pic/register"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 rounded-xl font-bold hover:shadow-2xl hover:shadow-white/30 transition-all active:scale-95"
                >
                  Создать аккаунт
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-4xl md:text-5xl font-black mb-6">
            Готовы монетизировать своё творчество?
          </h3>
          <p className="text-xl text-indigo-100 mb-10">
            Создайте аккаунт бесплатно и начните продавать свои работы уже сегодня
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/pic/register"
              className="group flex items-center gap-3 px-8 py-4 bg-white text-indigo-600 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-white/30 transition-all active:scale-95"
            >
              Зарегистрироваться бесплатно
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/pic/login"
              className="flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur text-white rounded-2xl font-bold text-lg border-2 border-white/20 hover:bg-white/20 transition-all active:scale-95"
            >
              Войти в аккаунт
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-900 text-slate-300">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Camera className="w-6 h-6 text-indigo-400" />
              <span className="text-xl font-black text-white">Pic.Peeky</span>
            </div>
            <div className="text-center text-sm">
              © 2024 Pic.Peeky. Маркетплейс изображений для творческих людей.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
