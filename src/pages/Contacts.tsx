import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import ThemeToggle from '@/components/ThemeToggle';
import Footer from '@/components/Footer';
import MobileNav from '@/components/MobileNav';

export default function Contacts() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-purple-50/30 to-pink-50/20 dark:via-purple-900/40 dark:to-pink-900/40">
      <header className="backdrop-blur-xl bg-white/80 dark:bg-[#1a1a2e]/80 border-b border-purple-100/50 dark:border-purple-800/30 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent blur-lg opacity-50 group-hover:opacity-70 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-primary to-accent p-2 rounded-2xl shadow-lg">
                  <Icon name="Sparkles" size={28} className="text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-purple-600 to-accent bg-clip-text text-transparent">
                  Peeky
                </h1>
                <p className="text-xs text-muted-foreground">Стиль и качество</p>
              </div>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-800/50 dark:to-pink-800/50 rounded-full mb-6">
            <Icon name="MessageCircle" size={16} className="text-primary" />
            <span className="text-sm font-medium text-purple-900 dark:text-purple-100">Свяжитесь с нами</span>
          </div>

          <h1 className="text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Контакты
          </h1>

          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-[#252538] rounded-2xl p-8 shadow-lg border border-purple-100 dark:border-purple-800/30">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6">
                  <Icon name="Phone" size={32} className="text-white" />
                </div>
                <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Телефон</h2>
                <p className="text-2xl font-bold text-primary mb-2">8 (800) 555-35-35</p>
                <p className="text-sm text-muted-foreground">Бесплатный звонок по России</p>
                <p className="text-sm text-muted-foreground">Ежедневно с 9:00 до 21:00</p>
              </div>

              <div className="bg-white dark:bg-[#252538] rounded-2xl p-8 shadow-lg border border-purple-100 dark:border-purple-800/30">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6">
                  <Icon name="Mail" size={32} className="text-white" />
                </div>
                <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Email</h2>
                <p className="text-xl font-bold text-primary mb-2">support@peeky.ru</p>
                <p className="text-sm text-muted-foreground">Ответим в течение 24 часов</p>
              </div>

              <div className="bg-white dark:bg-[#252538] rounded-2xl p-8 shadow-lg border border-purple-100 dark:border-purple-800/30">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6">
                  <Icon name="MapPin" size={32} className="text-white" />
                </div>
                <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Адрес офиса</h2>
                <p className="text-muted-foreground mb-1">г. Москва, ул. Тверская, д. 1</p>
                <p className="text-muted-foreground">БЦ "Центральный", офис 501</p>
                <p className="text-sm text-muted-foreground mt-2">Пн-Пт: 10:00 - 18:00</p>
              </div>

              <div className="bg-white dark:bg-[#252538] rounded-2xl p-8 shadow-lg border border-purple-100 dark:border-purple-800/30">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6">
                  <Icon name="MessageCircle" size={32} className="text-white" />
                </div>
                <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Онлайн-чат</h2>
                <p className="text-muted-foreground mb-4">Быстрые ответы на ваши вопросы</p>
                <button className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-medium hover:scale-105 transition-transform shadow-lg">
                  <Icon name="Send" size={18} />
                  Начать чат
                </button>
              </div>
            </div>

            <div className="bg-white dark:bg-[#252538] rounded-2xl p-8 shadow-lg border border-purple-100 dark:border-purple-800/30">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3">
                <Icon name="Users" size={28} className="text-primary" />
                Отделы компании
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40 flex items-center justify-center flex-shrink-0">
                    <Icon name="ShoppingBag" size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1 text-gray-900 dark:text-white">Поддержка покупателей</h3>
                    <p className="text-sm text-muted-foreground mb-2">Вопросы по заказам и доставке</p>
                    <p className="text-sm text-primary font-medium">buyers@peeky.ru</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40 flex items-center justify-center flex-shrink-0">
                    <Icon name="Store" size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1 text-gray-900 dark:text-white">Поддержка продавцов</h3>
                    <p className="text-sm text-muted-foreground mb-2">Помощь в развитии бизнеса</p>
                    <p className="text-sm text-primary font-medium">sellers@peeky.ru</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40 flex items-center justify-center flex-shrink-0">
                    <Icon name="Briefcase" size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1 text-gray-900 dark:text-white">Партнёрство</h3>
                    <p className="text-sm text-muted-foreground mb-2">Сотрудничество и реклама</p>
                    <p className="text-sm text-primary font-medium">partners@peeky.ru</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40 flex items-center justify-center flex-shrink-0">
                    <Icon name="FileText" size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1 text-gray-900 dark:text-white">Пресс-служба</h3>
                    <p className="text-sm text-muted-foreground mb-2">Для СМИ и журналистов</p>
                    <p className="text-sm text-primary font-medium">press@peeky.ru</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary to-accent rounded-2xl p-8 shadow-lg text-white">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Нужна помощь?</h2>
                  <p className="text-white/90">Наша служба поддержки всегда готова помочь вам!</p>
                </div>
                <Link to="/help" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary rounded-xl font-medium hover:scale-105 transition-transform shadow-lg">
                  <Icon name="HelpCircle" size={20} />
                  Перейти в раздел помощи
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}