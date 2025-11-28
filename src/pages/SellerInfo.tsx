import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function SellerInfo() {
  const benefits = [
    {
      icon: 'Users',
      title: 'Миллионы покупателей',
      description: 'Доступ к огромной аудитории покупателей по всей стране'
    },
    {
      icon: 'TrendingUp',
      title: 'Рост продаж',
      description: 'Увеличьте объём продаж с помощью наших инструментов маркетинга'
    },
    {
      icon: 'Shield',
      title: 'Безопасность сделок',
      description: 'Надёжная система защиты платежей и данных'
    },
    {
      icon: 'BarChart',
      title: 'Аналитика',
      description: 'Подробная статистика продаж и поведения покупателей'
    },
    {
      icon: 'Truck',
      title: 'Логистика',
      description: 'Быстрая доставка через партнёрские службы'
    },
    {
      icon: 'Headphones',
      title: 'Поддержка 24/7',
      description: 'Круглосуточная помощь в решении любых вопросов'
    }
  ];

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
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-2 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow">
                <Icon name="Sparkles" size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Peeky
                </h1>
                <p className="text-xs text-gray-500">Маркетплейс</p>
              </div>
            </Link>

            <Link to="/seller/auth">
              <Button className="gap-2">
                <Icon name="Store" size={18} />
                Стать продавцом
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Icon name="Sparkles" size={16} />
              Для бизнеса
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Продавайте на <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Peeky</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Присоединяйтесь к тысячам успешных продавцов и развивайте свой бизнес на крупнейшем маркетплейсе
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/seller/auth">
                <Button size="lg" className="gap-2 h-14 px-8 text-lg">
                  <Icon name="Rocket" size={20} />
                  Начать продавать
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="gap-2 h-14 px-8 text-lg">
                <Icon name="Play" size={20} />
                Смотреть видео
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {benefits.map((benefit, idx) => (
              <Card key={idx} className="shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="bg-purple-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                    <Icon name={benefit.icon as any} size={28} className="text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="shadow-2xl mb-16 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-8 text-white">
              <h2 className="text-3xl font-bold mb-4 text-center">Как начать продавать?</h2>
              <p className="text-center text-purple-100">Всего 3 простых шага до первой продажи</p>
            </div>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-3 gap-8">
                {steps.map((step, idx) => (
                  <div key={idx} className="relative">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 shadow-lg">
                        {step.number}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                    {idx < steps.length - 1 && (
                      <div className="hidden md:block absolute top-8 left-[60%] w-[80%] border-t-2 border-dashed border-purple-300" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white">
            <CardContent className="p-12 text-center">
              <Icon name="Store" size={64} className="mx-auto mb-6 opacity-90" />
              <h2 className="text-4xl font-bold mb-4">Готовы начать?</h2>
              <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
                Создайте аккаунт продавца прямо сейчас и получите доступ ко всем инструментам для успешных продаж
              </p>
              <Link to="/seller/auth">
                <Button size="lg" variant="outline" className="gap-2 h-14 px-8 text-lg bg-white text-purple-600 hover:bg-purple-50 border-0">
                  <Icon name="ArrowRight" size={20} />
                  Зарегистрироваться как продавец
                </Button>
              </Link>
            </CardContent>
          </Card>

          <div className="mt-16 text-center">
            <p className="text-gray-600 mb-4">Есть вопросы?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" className="gap-2">
                <Icon name="MessageCircle" size={18} />
                Написать в чат
              </Button>
              <Button variant="outline" className="gap-2">
                <Icon name="Phone" size={18} />
                8 (800) 555-35-35
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}