import { Link } from 'react-router-dom'
import { 
  Store, TrendingUp, DollarSign, BarChart3, 
  Shield, Zap, Users, Package, ArrowRight,
  CheckCircle, Sparkles
} from 'lucide-react'

export default function SellerLanding() {
  const benefits = [
    {
      icon: DollarSign,
      title: 'Низкая комиссия',
      description: 'Всего 5% от продаж - одни из лучших условий на рынке'
    },
    {
      icon: TrendingUp,
      title: 'Быстрый рост',
      description: 'Получайте доступ к тысячам покупателей с первого дня'
    },
    {
      icon: Package,
      title: 'Простое управление',
      description: 'Интуитивный кабинет для управления товарами и заказами'
    },
    {
      icon: Shield,
      title: 'Безопасные платежи',
      description: 'Гарантированная защита всех финансовых операций'
    },
    {
      icon: BarChart3,
      title: 'Аналитика продаж',
      description: 'Детальная статистика для роста вашего бизнеса'
    },
    {
      icon: Zap,
      title: 'Быстрый старт',
      description: 'Начните продавать уже через 5 минут после регистрации'
    }
  ]

  const steps = [
    {
      number: '1',
      title: 'Регистрация',
      description: 'Создайте аккаунт продавца за 2 минуты'
    },
    {
      number: '2',
      title: 'Добавьте товары',
      description: 'Загрузите фото и описания ваших товаров'
    },
    {
      number: '3',
      title: 'Начните продавать',
      description: 'Получайте заказы и зарабатывайте'
    }
  ]

  const stats = [
    { value: '10K+', label: 'Активных покупателей' },
    { value: '500+', label: 'Продавцов на платформе' },
    { value: '50K+', label: 'Заказов в месяц' },
    { value: '4.8/5', label: 'Средний рейтинг' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Hero Section */}
      <header className="bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900 text-white">
        <nav className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-400 to-fuchsia-400 rounded-2xl blur-xl opacity-50"></div>
              <div className="relative bg-gradient-to-br from-violet-600 to-fuchsia-600 p-2 rounded-2xl">
                <Store className="w-6 h-6 text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-black">Peeky</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/seller/login"
              className="px-6 py-2 text-white font-semibold hover:text-violet-200 transition-all"
            >
              Войти
            </Link>
            <Link
              to="/seller/register"
              className="px-6 py-3 bg-white text-violet-600 rounded-xl font-bold hover:shadow-2xl hover:shadow-white/30 transition-all active:scale-95"
            >
              Начать продавать
            </Link>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 mb-6">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span className="text-sm font-semibold text-violet-100">Присоединяйтесь к лидерам рынка</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
            Продавайте больше<br />
            с <span className="bg-gradient-to-r from-violet-300 to-fuchsia-300 bg-clip-text text-transparent">Peeky</span>
          </h2>
          
          <p className="text-xl text-violet-100 mb-10 max-w-2xl mx-auto">
            Маркетплейс нового поколения для амбициозных продавцов. 
            Начните зарабатывать онлайн уже сегодня.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/seller/register"
              className="group flex items-center gap-3 px-8 py-4 bg-white text-violet-600 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-white/30 transition-all active:scale-95"
            >
              Создать магазин бесплатно
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#benefits"
              className="px-8 py-4 bg-white/10 backdrop-blur-xl text-white rounded-2xl font-bold text-lg border border-white/20 hover:bg-white/20 transition-all active:scale-95"
            >
              Узнать больше
            </a>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-4xl md:text-5xl font-black bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </p>
                <p className="text-slate-600 font-semibold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-black text-slate-800 mb-4">
              Почему выбирают Peeky?
            </h3>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Мы создали идеальные условия для роста вашего бизнеса
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 hover:shadow-2xl hover:border-violet-300 transition-all group"
              >
                <div className="inline-flex p-4 bg-gradient-to-br from-violet-100 to-fuchsia-100 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                  <benefit.icon className="w-8 h-8 text-violet-600" />
                </div>
                <h4 className="text-2xl font-black text-slate-800 mb-3">
                  {benefit.title}
                </h4>
                <p className="text-slate-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section className="py-20 bg-gradient-to-br from-violet-50 to-fuchsia-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-black text-slate-800 mb-4">
              Как начать продавать?
            </h3>
            <p className="text-xl text-slate-600">
              Всего 3 простых шага до первой продажи
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 hover:shadow-2xl transition-all">
                  <div className="absolute -top-6 -left-6 w-16 h-16 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-2xl flex items-center justify-center shadow-xl">
                    <span className="text-3xl font-black text-white">{step.number}</span>
                  </div>
                  <div className="pt-6">
                    <h4 className="text-2xl font-black text-slate-800 mb-3">
                      {step.title}
                    </h4>
                    <p className="text-slate-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-violet-300" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/seller/register"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-violet-500/50 transition-all active:scale-95"
            >
              Начать продавать сейчас
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features List */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-4xl md:text-5xl font-black text-slate-800 mb-6">
                Всё необходимое для успешных продаж
              </h3>
              <p className="text-xl text-slate-600 mb-8">
                Профессиональные инструменты для управления вашим бизнесом
              </p>
              
              <div className="space-y-4">
                {[
                  'Личный кабинет продавца с полной аналитикой',
                  'Управление товарами и заказами в одном месте',
                  'Автоматические уведомления о новых заказах',
                  'Гибкие настройки доставки и оплаты',
                  'Поддержка 24/7 для решения любых вопросов',
                  'Инструменты для продвижения товаров'
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <p className="text-slate-700 text-lg">{feature}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-400 to-fuchsia-400 rounded-3xl blur-3xl opacity-20"></div>
              <div className="relative bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-3xl p-12 text-white shadow-2xl">
                <Users className="w-16 h-16 mb-6" />
                <h4 className="text-3xl font-black mb-4">
                  Присоединяйтесь к сообществу успешных продавцов
                </h4>
                <p className="text-violet-100 text-lg mb-8">
                  Более 500 продавцов уже зарабатывают на Peeky. 
                  Станьте частью растущей экосистемы электронной коммерции.
                </p>
                <Link
                  to="/seller/register"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-violet-600 rounded-xl font-bold hover:shadow-2xl hover:shadow-white/30 transition-all active:scale-95"
                >
                  Создать магазин
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-4xl md:text-5xl font-black mb-6">
            Готовы начать зарабатывать?
          </h3>
          <p className="text-xl text-violet-100 mb-10">
            Создайте магазин бесплатно и получите первые заказы уже сегодня
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/seller/register"
              className="group flex items-center gap-3 px-8 py-4 bg-white text-violet-600 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-white/30 transition-all active:scale-95"
            >
              Зарегистрироваться бесплатно
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/seller/login"
              className="px-8 py-4 bg-white/10 backdrop-blur-xl text-white rounded-2xl font-bold text-lg border border-white/20 hover:bg-white/20 transition-all active:scale-95"
            >
              Уже есть аккаунт
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-gradient-to-br from-violet-600 to-fuchsia-600 p-2 rounded-xl">
              <Store className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black text-white">ShopFlow</span>
          </div>
          <p className="text-sm">
            © 2024 ShopFlow. Маркетплейс для амбициозных продавцов.
          </p>
        </div>
      </footer>
    </div>
  )
}