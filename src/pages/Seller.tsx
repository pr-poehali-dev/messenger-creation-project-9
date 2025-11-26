import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/ThemeToggle';

export default function Seller() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-purple-50/30 to-pink-50/20 dark:via-purple-950/20 dark:to-pink-950/10">
      <header className="backdrop-blur-xl bg-white/80 dark:bg-gray-950/80 border-b border-purple-100/50 dark:border-purple-900/30 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors group">
              <Icon name="ArrowLeft" size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">На главную</span>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full mb-6">
            <Icon name="TrendingUp" size={16} className="text-primary" />
            <span className="text-sm font-medium text-purple-900 dark:text-purple-300">Начните зарабатывать сегодня</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-purple-600 dark:via-purple-400 to-foreground bg-clip-text text-transparent">
            Станьте продавцом на Peeky
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Присоединяйтесь к тысячам успешных продавцов и начните продавать свои товары миллионам покупателей по всей России
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Button className="h-14 px-8 bg-gradient-to-r from-primary to-accent text-white shadow-xl hover:shadow-2xl text-lg">
              <Icon name="Rocket" size={22} className="mr-2" />
              Начать продавать
            </Button>
            <Button variant="outline" className="h-14 px-8 border-2 border-purple-200 dark:border-purple-800 text-lg">
              <Icon name="PlayCircle" size={22} className="mr-2" />
              Смотреть видео
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-purple-100 dark:border-purple-900/30 shadow-lg hover:shadow-2xl transition-all animate-scale-in">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-6">
              <Icon name="Users" size={32} className="text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-3">5+ млн покупателей</h3>
            <p className="text-muted-foreground">
              Получите доступ к огромной аудитории активных покупателей, готовых покупать ваши товары каждый день
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-purple-100 dark:border-purple-900/30 shadow-lg hover:shadow-2xl transition-all animate-scale-in" style={{ animationDelay: '100ms' }}>
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-6">
              <Icon name="Percent" size={32} className="text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Низкие комиссии</h3>
            <p className="text-muted-foreground">
              Всего 5% от продаж — одна из самых низких комиссий на рынке. Первые 3 месяца вообще без комиссии
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-purple-100 dark:border-purple-900/30 shadow-lg hover:shadow-2xl transition-all animate-scale-in" style={{ animationDelay: '200ms' }}>
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-6">
              <Icon name="Zap" size={32} className="text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Быстрый старт</h3>
            <p className="text-muted-foreground">
              Начните продавать за 15 минут. Простая регистрация, удобная панель управления и быстрая модерация
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-primary to-accent rounded-3xl p-12 mb-16 text-white shadow-2xl">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center">Что вы получаете</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                  <Icon name="Store" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">Собственный магазин</h4>
                  <p className="text-white/90">Создайте витрину со своим брендом, логотипом и уникальным дизайном</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                  <Icon name="BarChart" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">Аналитика продаж</h4>
                  <p className="text-white/90">Детальная статистика по заказам, доходам и поведению покупателей</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                  <Icon name="ShoppingBag" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">Управление товарами</h4>
                  <p className="text-white/90">Легко добавляйте товары, обновляйте цены и остатки в удобной панели</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                  <Icon name="Truck" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">Логистика и доставка</h4>
                  <p className="text-white/90">Интеграция с популярными службами доставки по всей России</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                  <Icon name="CreditCard" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">Удобные выплаты</h4>
                  <p className="text-white/90">Еженедельные автоматические выплаты на карту или расчетный счет</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                  <Icon name="Headphones" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">Поддержка 24/7</h4>
                  <p className="text-white/90">Персональный менеджер поможет в любое время дня и ночи</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-3xl p-12 mb-16 border border-purple-100 dark:border-purple-900/30 shadow-xl">
          <h2 className="text-4xl font-bold mb-8 text-center">Как начать продавать</h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent text-white text-3xl font-bold flex items-center justify-center mx-auto mb-6 shadow-lg">
                1
              </div>
              <h4 className="font-bold text-xl mb-3">Регистрация</h4>
              <p className="text-muted-foreground">
                Зарегистрируйтесь и заполните информацию о вашем магазине за 5 минут
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent text-white text-3xl font-bold flex items-center justify-center mx-auto mb-6 shadow-lg">
                2
              </div>
              <h4 className="font-bold text-xl mb-3">Добавьте товары</h4>
              <p className="text-muted-foreground">
                Загрузите фото и описания ваших товаров в удобной панели управления
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent text-white text-3xl font-bold flex items-center justify-center mx-auto mb-6 shadow-lg">
                3
              </div>
              <h4 className="font-bold text-xl mb-3">Модерация</h4>
              <p className="text-muted-foreground">
                Мы проверим ваши товары за несколько часов и одобрим для публикации
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent text-white text-3xl font-bold flex items-center justify-center mx-auto mb-6 shadow-lg">
                4
              </div>
              <h4 className="font-bold text-xl mb-3">Начните продавать</h4>
              <p className="text-muted-foreground">
                Ваши товары появятся в каталоге и вы начнете получать заказы
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-3xl p-12 border border-purple-100 dark:border-purple-900/30">
          <h2 className="text-4xl font-bold mb-8 text-center">Условия и тарифы</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border-2 border-primary shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <Icon name="Gift" size={32} className="text-primary" />
                <h3 className="text-2xl font-bold">Стартовый</h3>
              </div>
              <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                0%
              </div>
              <p className="text-muted-foreground mb-6">Первые 3 месяца</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                  <span>До 100 товаров в каталоге</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Базовая аналитика</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Поддержка по email</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Еженедельные выплаты</span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border-2 border-accent shadow-lg relative overflow-hidden">
              <div className="absolute top-4 right-4 px-3 py-1 bg-accent text-white text-xs font-bold rounded-full">
                ПОПУЛЯРНЫЙ
              </div>
              <div className="flex items-center gap-3 mb-6">
                <Icon name="Sparkles" size={32} className="text-accent" />
                <h3 className="text-2xl font-bold">Профессиональный</h3>
              </div>
              <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                5%
              </div>
              <p className="text-muted-foreground mb-6">От продаж</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Неограниченное количество товаров</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Расширенная аналитика и отчеты</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Приоритетная поддержка 24/7</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Продвижение товаров в топе</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Персональный менеджер</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-purple-100 dark:border-purple-900/30">
            <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Icon name="Info" size={20} className="text-primary" />
              Дополнительная информация
            </h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <Icon name="Dot" size={20} className="text-primary flex-shrink-0" />
                <span>Минимальная сумма вывода — 1 000 ₽</span>
              </div>
              <div className="flex items-start gap-2">
                <Icon name="Dot" size={20} className="text-primary flex-shrink-0" />
                <span>Без скрытых платежей и комиссий</span>
              </div>
              <div className="flex items-start gap-2">
                <Icon name="Dot" size={20} className="text-primary flex-shrink-0" />
                <span>Возможность подключения POS-терминала</span>
              </div>
              <div className="flex items-start gap-2">
                <Icon name="Dot" size={20} className="text-primary flex-shrink-0" />
                <span>Бесплатное обучение для новых продавцов</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center bg-white dark:bg-gray-900 rounded-3xl p-12 border border-purple-100 dark:border-purple-900/30 shadow-xl">
          <h2 className="text-4xl font-bold mb-4">Готовы начать?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Присоединяйтесь к Peeky сегодня и откройте новые возможности для вашего бизнеса
          </p>
          <Button className="h-16 px-12 bg-gradient-to-r from-primary to-accent text-white shadow-2xl hover:shadow-3xl text-xl">
            <Icon name="Rocket" size={24} className="mr-3" />
            Начать продавать бесплатно
          </Button>
          <p className="text-sm text-muted-foreground mt-6">
            Нет платы за регистрацию • Первые 3 месяца без комиссии • Запуск за 15 минут
          </p>
        </div>
      </main>

      <footer className="border-t border-purple-100 dark:border-purple-900/30 bg-white/50 dark:bg-gray-950/50 backdrop-blur-xl mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Icon name="Sparkles" size={20} className="text-primary" />
              <span className="text-sm text-muted-foreground">© 2024 Peeky. Все права защищены.</span>
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Поддержка</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Документы</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Контакты</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}