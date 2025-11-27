import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import ThemeToggle from '@/components/ThemeToggle';
import Footer from '@/components/Footer';
import MobileNav from '@/components/MobileNav';

export default function Delivery() {
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
            <Icon name="Truck" size={16} className="text-primary" />
            <span className="text-sm font-medium text-purple-900 dark:text-purple-100">Информация о доставке</span>
          </div>

          <h1 className="text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Доставка
          </h1>

          <div className="space-y-6">
            <div className="bg-white dark:bg-[#252538] rounded-3xl p-8 shadow-lg border border-purple-100 dark:border-purple-800/30">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3">
                <Icon name="Package" size={28} className="text-primary" />
                Способы доставки
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-800/30 dark:to-pink-800/30 border border-purple-100 dark:border-purple-800/30">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white dark:bg-[#2a2a40] flex items-center justify-center">
                      <Icon name="Home" size={24} className="text-primary" />
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">Курьером</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Доставим прямо до двери вашего дома или офиса
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Icon name="Clock" size={16} className="text-primary" />
                      <span className="text-muted-foreground">Срок: 1-3 дня</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Icon name="DollarSign" size={16} className="text-primary" />
                      <span className="text-muted-foreground">От 200 ₽</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-800/30 dark:to-pink-800/30 border border-purple-100 dark:border-purple-800/30">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white dark:bg-[#2a2a40] flex items-center justify-center">
                      <Icon name="MapPin" size={24} className="text-primary" />
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">Пункт выдачи</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Заберите заказ в удобном пункте выдачи
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Icon name="Clock" size={16} className="text-primary" />
                      <span className="text-muted-foreground">Срок: 2-5 дней</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Icon name="DollarSign" size={16} className="text-primary" />
                      <span className="text-muted-foreground">От 150 ₽</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-800/30 dark:to-pink-800/30 border border-purple-100 dark:border-purple-800/30">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white dark:bg-[#2a2a40] flex items-center justify-center">
                      <Icon name="Package" size={24} className="text-primary" />
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">Почта России</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Доставка почтой в любую точку России
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Icon name="Clock" size={16} className="text-primary" />
                      <span className="text-muted-foreground">Срок: 5-14 дней</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Icon name="DollarSign" size={16} className="text-primary" />
                      <span className="text-muted-foreground">От 300 ₽</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-800/30 dark:to-pink-800/30 border border-purple-100 dark:border-purple-800/30">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white dark:bg-[#2a2a40] flex items-center justify-center">
                      <Icon name="Zap" size={24} className="text-primary" />
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">Экспресс</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Срочная доставка в день заказа
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Icon name="Clock" size={16} className="text-primary" />
                      <span className="text-muted-foreground">Срок: в день заказа</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Icon name="DollarSign" size={16} className="text-primary" />
                      <span className="text-muted-foreground">От 500 ₽</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-[#252538] rounded-3xl p-8 shadow-lg border border-purple-100 dark:border-purple-800/30">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3">
                <Icon name="Gift" size={28} className="text-primary" />
                Бесплатная доставка
              </h2>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-800">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                    <Icon name="CheckCircle" size={32} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                      Бесплатно при заказе от 3000 ₽
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Оформите заказ на сумму от 3000 рублей и получите бесплатную доставку курьером или в пункт выдачи
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-gray-800 rounded-lg text-sm">
                        <Icon name="Truck" size={16} className="text-green-600" />
                        <span className="text-muted-foreground">Курьер</span>
                      </div>
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-gray-800 rounded-lg text-sm">
                        <Icon name="MapPin" size={16} className="text-green-600" />
                        <span className="text-muted-foreground">Пункт выдачи</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-[#252538] rounded-3xl p-8 shadow-lg border border-purple-100 dark:border-purple-800/30">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3">
                <Icon name="Info" size={28} className="text-primary" />
                Важная информация
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 flex items-center justify-center flex-shrink-0">
                    <Icon name="Clock" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1 text-gray-900 dark:text-white">Сроки доставки</h3>
                    <p className="text-sm text-muted-foreground">
                      Срок доставки зависит от региона и выбранного способа. Точный срок будет указан при оформлении заказа.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 flex items-center justify-center flex-shrink-0">
                    <Icon name="Package" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1 text-gray-900 dark:text-white">Упаковка</h3>
                    <p className="text-sm text-muted-foreground">
                      Все товары тщательно упаковываются для безопасной транспортировки. Хрупкие предметы получают дополнительную защиту.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 flex items-center justify-center flex-shrink-0">
                    <Icon name="Bell" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1 text-gray-900 dark:text-white">Уведомления</h3>
                    <p className="text-sm text-muted-foreground">
                      Мы будем держать вас в курсе на каждом этапе: отправка, передача курьеру, прибытие в пункт выдачи.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 flex items-center justify-center flex-shrink-0">
                    <Icon name="Shield" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1 text-gray-900 dark:text-white">Страхование</h3>
                    <p className="text-sm text-muted-foreground">
                      Все посылки автоматически застрахованы. В случае повреждения при доставке мы полностью компенсируем стоимость товара.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary to-accent rounded-2xl p-8 shadow-lg text-white">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Есть вопросы по доставке?</h2>
                  <p className="text-white/90">Свяжитесь с нашей службой поддержки — мы всегда рады помочь!</p>
                </div>
                <Link to="/help" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary rounded-xl font-medium hover:scale-105 transition-transform shadow-lg">
                  <Icon name="HelpCircle" size={20} />
                  Связаться с поддержкой
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